'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Camera, Loader2, RotateCcw, ShieldCheck, X } from 'lucide-react'

/**
 * Prova virtuale degli occhiali.
 *
 * Il riconoscimento del viso gira interamente nel browser (MediaPipe Face
 * Landmarker, compilato in WebAssembly). Il flusso video non viene inviato
 * a nessun server: né al nostro, né a terzi. Anche il motore e il modello
 * sono ospitati sul nostro dominio, quindi aprire la prova non genera
 * richieste verso servizi esterni.
 */

const WASM_PATH = '/mediapipe/wasm'
const MODEL_PATH = '/mediapipe/models/face_landmarker.task'

/** Punti della topologia a 468 punti di MediaPipe. */
const RIGHT_EYE_OUTER = 33
const LEFT_EYE_OUTER = 263
const RIGHT_FACE_EDGE = 234
const LEFT_FACE_EDGE = 454

/**
 * La montatura si dimensiona sulla larghezza del viso, non sulla distanza fra
 * gli occhi: un occhiale da sole arriva alle tempie, e commisurarlo agli occhi
 * lo faceva uscire troppo stretto. I punti 234/454 stanno sul contorno del viso
 * all'altezza degli zigomi, di poco più larghi della montatura.
 */
const FACE_WIDTH_RATIO = 0.95

/**
 * Quanto la lente scurisce ciò che ha dietro: 1 = tinta piena della foto,
 * 0 = lente invisibile. Si schiarisce un po' la tinta originale perché nella
 * foto di catalogo la lente è fotografata su fondo bianco e risulta più densa
 * di come appare indossata.
 */
const LENS_STRENGTH = 0.82

/* ------------------------------------------------------------------ */
/* Lenti semitrasparenti                                               */
/* ------------------------------------------------------------------ */

/**
 * Erosione con finestra quadrata, separata in due passate da O(n).
 * Fuori dall'immagine si considera sfondo, così l'erosione stringe anche
 * dai bordi e la montatura che li tocca resta opaca.
 */
function erode(mask: Uint8Array, w: number, h: number, r: number): Uint8Array {
  const horizontal = new Uint8Array(w * h)

  for (let y = 0; y < h; y++) {
    const row = y * w
    const isBg = (x: number) => x < 0 || x >= w || mask[row + x] === 0
    let background = 0
    for (let x = -r; x <= r; x++) if (isBg(x)) background++
    for (let x = 0; x < w; x++) {
      horizontal[row + x] = background === 0 ? 1 : 0
      if (isBg(x - r)) background--
      if (isBg(x + r + 1)) background++
    }
  }

  const result = new Uint8Array(w * h)
  for (let x = 0; x < w; x++) {
    const isBg = (y: number) => y < 0 || y >= h || horizontal[y * w + x] === 0
    let background = 0
    for (let y = -r; y <= r; y++) if (isBg(y)) background++
    for (let y = 0; y < h; y++) {
      result[y * w + x] = background === 0 ? 1 : 0
      if (isBg(y - r)) background--
      if (isBg(y + r + 1)) background++
    }
  }

  return result
}

/** Sfocatura a media mobile, per ammorbidire il passaggio montatura/lente. */
function boxBlur(src: Uint8Array, w: number, h: number, r: number): Uint8Array {
  const horizontal = new Uint8Array(w * h)

  for (let y = 0; y < h; y++) {
    const row = y * w
    const at = (x: number) => src[row + Math.min(w - 1, Math.max(0, x))]
    let sum = 0
    for (let x = -r; x <= r; x++) sum += at(x)
    const span = 2 * r + 1
    for (let x = 0; x < w; x++) {
      horizontal[row + x] = sum / span
      sum += at(x + r + 1) - at(x - r)
    }
  }

  const result = new Uint8Array(w * h)
  for (let x = 0; x < w; x++) {
    const at = (y: number) => horizontal[Math.min(h - 1, Math.max(0, y)) * w + x]
    let sum = 0
    for (let y = -r; y <= r; y++) sum += at(y)
    const span = 2 * r + 1
    for (let y = 0; y < h; y++) {
      result[y * w + x] = sum / span
      sum += at(y + r + 1) - at(y - r)
    }
  }

  return result
}

export interface FramePieces {
  /** Le lenti, da disegnare in fusione "multiply": scuriscono senza coprire. */
  lens: HTMLCanvasElement
  /** Profilo, ponte e aste: si disegnano sopra, pieni. */
  rim: HTMLCanvasElement
}

/**
 * Separa la montatura in due strati: lenti e profilo.
 *
 * Le lenti vengono poi fuse in "multiply", che scurisce l'immagine sotto
 * lasciandone i dettagli — è quello che fa una lente colorata vera, mentre
 * una semplice semitrasparenza appiattisce tutto in un velo uniforme. Dietro
 * si continuano quindi a intravedere gli occhi.
 *
 * Non serve riconoscere la lente: basta erodere la sagoma. Le parti sottili
 * — profilo, ponte, terminali delle aste — spariscono con l'erosione e
 * finiscono nello strato pieno; le superfici larghe, cioè le lenti,
 * sopravvivono. Funziona quindi anche sulle foto caricate dal negozio, senza
 * che nessuno debba ritagliare le lenti a mano.
 */
function prepareFrame(image: HTMLImageElement): FramePieces | null {
  const w = image.naturalWidth
  const h = image.naturalHeight
  if (!w || !h) return null

  const source = document.createElement('canvas')
  source.width = w
  source.height = h
  const sourceCtx = source.getContext('2d', { willReadFrequently: true })
  if (!sourceCtx) return null
  sourceCtx.drawImage(image, 0, 0)

  let picture: ImageData
  try {
    picture = sourceCtx.getImageData(0, 0, w, h)
  } catch {
    // Immagine di altra origine: il canvas non è leggibile. Si rinuncia alla
    // separazione e la prova continua con la montatura piena.
    return null
  }

  const pixels = picture.data
  const shape = new Uint8Array(w * h)
  for (let i = 0; i < shape.length; i++) shape[i] = pixels[i * 4 + 3] > 128 ? 1 : 0

  const radius = Math.max(4, Math.round(w * 0.028))
  const inside = erode(shape, w, h, radius)
  // Il confine fra i due strati va sfumato, altrimenti si vede lo scalino.
  const weight = boxBlur(
    Uint8Array.from(inside, (v) => (v ? 255 : 0)),
    w,
    h,
    Math.max(2, Math.round(radius * 0.4))
  )

  const lensData = new ImageData(w, h)
  const rimData = new ImageData(w, h)

  for (let i = 0; i < shape.length; i++) {
    const o = i * 4
    const alpha = pixels[o + 3]
    const share = weight[i] / 255

    // Strato lente: tinta schiarita, tanto più presente quanto si è "dentro"
    for (let c = 0; c < 3; c++) {
      lensData.data[o + c] = 255 - (255 - pixels[o + c]) * LENS_STRENGTH
    }
    lensData.data[o + 3] = alpha * share

    // Strato profilo: il resto
    for (let c = 0; c < 3; c++) rimData.data[o + c] = pixels[o + c]
    rimData.data[o + 3] = alpha * (1 - share)
  }

  const lens = document.createElement('canvas')
  lens.width = w
  lens.height = h
  lens.getContext('2d')?.putImageData(lensData, 0, 0)

  const rim = document.createElement('canvas')
  rim.width = w
  rim.height = h
  rim.getContext('2d')?.putImageData(rimData, 0, 0)

  return { lens, rim }
}

type Phase = 'consenso' | 'avvio' | 'attiva' | 'errore'

interface Props {
  imageUrl: string
  productName: string
  brand?: string
  onClose: () => void
}

export default function TryOnModal({ imageUrl, productName, brand, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<HTMLImageElement | null>(null)
  /** Montatura divisa in lenti e profilo: si prepara una volta sola. */
  const preparedRef = useRef<FramePieces | null>(null)
  const landmarkerRef = useRef<{ detectForVideo: (v: HTMLVideoElement, t: number) => any; close: () => void } | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastVideoTimeRef = useRef(-1)

  const [phase, setPhase] = useState<Phase>('consenso')
  const [error, setError] = useState('')
  const [faceFound, setFaceFound] = useState(false)
  const [scale, setScale] = useState(1)
  const [offsetY, setOffsetY] = useState(0)
  const [taintFallback, setTaintFallback] = useState(false)
  const [snapshotError, setSnapshotError] = useState('')

  // I cursori sono letti dentro il loop di disegno: li tengo anche in ref
  // per non dover ricreare il loop a ogni spostamento.
  const scaleRef = useRef(1)
  const offsetYRef = useRef(0)
  useEffect(() => {
    scaleRef.current = scale
    offsetYRef.current = offsetY
  }, [scale, offsetY])

  /* --------------------------------------------------------------- */
  /* Pulizia                                                          */
  /* --------------------------------------------------------------- */

  const stopEverything = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    landmarkerRef.current?.close()
    landmarkerRef.current = null
  }, [])

  useEffect(() => stopEverything, [stopEverything])

  // Chiusura con il tasto Esc
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Niente scorrimento della pagina sotto al modale
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  /* --------------------------------------------------------------- */
  /* Loop di disegno                                                  */
  /* --------------------------------------------------------------- */

  const renderLoop = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const landmarker = landmarkerRef.current
    const frame = frameRef.current

    if (!video || !canvas || !landmarker || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(renderLoop)
      return
    }

    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Immagine speculare, come in uno specchio
    ctx.save()
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    ctx.restore()

    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime
      try {
        const result = landmarker.detectForVideo(video, performance.now())
        const landmarks = result?.faceLandmarks?.[0]

        if (landmarks && frame?.complete && frame.naturalWidth) {
          setFaceFound(true)

          // Alla prima passata utile si separano lenti e profilo; se non è
          // possibile si ripiega sull'immagine originale, lente piena.
          if (!preparedRef.current) preparedRef.current = prepareFrame(frame)
          const pieces = preparedRef.current

          // Le coordinate sono normalizzate 0..1 sul video non specchiato:
          // rifletto la x perché il canvas è specchiato.
          const point = (index: number) => ({
            x: (1 - landmarks[index].x) * canvas.width,
            y: landmarks[index].y * canvas.height,
          })

          const right = point(RIGHT_EYE_OUTER)
          const left = point(LEFT_EYE_OUTER)
          const faceRight = point(RIGHT_FACE_EDGE)
          const faceLeft = point(LEFT_FACE_EDGE)

          // L'inclinazione va misurata su un vettore che punta verso destra
          // dello schermo. Il canvas è specchiato, quindi l'occhio destro del
          // viso finisce a destra dell'immagine: prendendo i punti nell'ordine
          // sbagliato l'angolo vale ~180° e la montatura si disegna capovolta.
          const [eyeStart, eyeEnd] = left.x <= right.x ? [left, right] : [right, left]

          const eyeDistance = Math.hypot(eyeEnd.x - eyeStart.x, eyeEnd.y - eyeStart.y)
          const faceWidth = Math.hypot(faceLeft.x - faceRight.x, faceLeft.y - faceRight.y)
          const angle = Math.atan2(eyeEnd.y - eyeStart.y, eyeEnd.x - eyeStart.x)
          const width = faceWidth * FACE_WIDTH_RATIO * scaleRef.current
          const height = width * (frame.naturalHeight / frame.naturalWidth)

          const centerX = (eyeStart.x + eyeEnd.x) / 2
          const centerY = (eyeStart.y + eyeEnd.y) / 2 + offsetYRef.current * eyeDistance

          ctx.save()
          ctx.translate(centerX, centerY)
          ctx.rotate(angle)
          if (pieces) {
            ctx.globalCompositeOperation = 'multiply'
            ctx.drawImage(pieces.lens, -width / 2, -height / 2, width, height)
            ctx.globalCompositeOperation = 'source-over'
            ctx.drawImage(pieces.rim, -width / 2, -height / 2, width, height)
          } else {
            ctx.drawImage(frame, -width / 2, -height / 2, width, height)
          }
          ctx.restore()
        } else {
          setFaceFound(false)
        }
      } catch {
        // Un frame perso non deve interrompere la sessione.
      }
    }

    rafRef.current = requestAnimationFrame(renderLoop)
  }, [])

  /* --------------------------------------------------------------- */
  /* Avvio                                                            */
  /* --------------------------------------------------------------- */

  async function start() {
    setPhase('avvio')
    setError('')

    try {
      // Il modello pesa alcuni MB: si scarica solo ora, non all'apertura del sito.
      const { FilesetResolver, FaceLandmarker } = await import('@mediapipe/tasks-vision')

      const [fileset, stream] = await Promise.all([
        FilesetResolver.forVisionTasks(WASM_PATH),
        navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        }),
      ])

      streamRef.current = stream

      // Su alcuni dispositivi il delegato GPU non è disponibile: si ripiega su CPU.
      const createLandmarker = (delegate: 'GPU' | 'CPU') =>
        FaceLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: MODEL_PATH, delegate },
          runningMode: 'VIDEO',
          numFaces: 1,
        })

      landmarkerRef.current = (await createLandmarker('GPU').catch(() =>
        createLandmarker('CPU')
      )) as any

      const video = videoRef.current
      if (!video) throw new Error('video non disponibile')
      video.srcObject = stream
      await video.play()

      setPhase('attiva')
      rafRef.current = requestAnimationFrame(renderLoop)
    } catch (err) {
      stopEverything()
      setPhase('errore')
      setError(messaggioErrore(err))
    }
  }

  function snapshot() {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const link = document.createElement('a')
      link.download = `focus-ottica-${productName.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      setSnapshotError('')
    } catch {
      setSnapshotError('Non possiamo salvare la foto su questo dispositivo, ma puoi fare uno screenshot.')
    }
  }

  /* --------------------------------------------------------------- */

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Prova virtuale: ${productName}`}
    >
      <div className="relative w-full h-full sm:h-auto sm:max-w-2xl bg-black sm:rounded-2xl overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          aria-label="Chiudi la prova virtuale"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center transition-colors"
        >
          <X size={20} />
        </button>

        {/* Schermata di consenso */}
        {phase === 'consenso' && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-md text-center text-white">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/10 flex items-center justify-center">
                <ShieldCheck size={26} />
              </div>
              <h2 className="mt-5 text-2xl font-semibold">Prova virtuale</h2>
              <p className="mt-3 text-white/80 leading-relaxed">
                Per mostrarti come ti stanno gli occhiali dobbiamo accendere la fotocamera
                del tuo dispositivo.
              </p>
              <div className="mt-5 text-left bg-white/10 rounded-xl p-4 text-sm text-white/85 space-y-2">
                <p>
                  <strong className="text-white">Le immagini restano sul tuo dispositivo.</strong>{' '}
                  L’elaborazione avviene dentro il browser: non inviamo né registriamo nulla,
                  né noi né terze parti.
                </p>
                <p>Puoi chiudere quando vuoi: la fotocamera si spegne subito.</p>
              </div>
              <button
                onClick={start}
                className="mt-6 w-full bg-white text-gray-950 py-3.5 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Attiva la fotocamera
              </button>
              <button
                onClick={onClose}
                className="mt-3 w-full text-white/70 hover:text-white py-2 text-sm transition-colors"
              >
                Annulla
              </button>
            </div>
          </div>
        )}

        {/* Caricamento */}
        {phase === 'avvio' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-white">
            <Loader2 size={32} className="animate-spin" />
            <p className="mt-4 text-white/80">Preparazione della prova virtuale…</p>
            <p className="mt-1 text-white/50 text-sm">Il primo avvio può richiedere qualche secondo.</p>
          </div>
        )}

        {/* Errore */}
        {phase === 'errore' && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-md text-center text-white">
              <h2 className="text-xl font-semibold">Non riusciamo ad avviare la prova</h2>
              <p className="mt-3 text-white/80">{error}</p>
              <button
                onClick={() => setPhase('consenso')}
                className="mt-6 inline-flex items-center gap-2 bg-white text-gray-950 px-6 py-3 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                <RotateCcw size={18} />
                Riprova
              </button>
            </div>
          </div>
        )}

        {/* Sessione attiva */}
        <div className={phase === 'attiva' ? 'flex-1 flex flex-col' : 'hidden'}>
          <div className="relative flex-1 bg-black flex items-center justify-center">
            <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
            {!faceFound && (
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-full">
                Inquadra il viso di fronte alla fotocamera
              </p>
            )}
          </div>

          <div className="bg-gray-950 text-white p-4 space-y-4">
            <div>
              {brand && (
                <p className="text-xs uppercase tracking-[0.15em] text-white/50">{brand}</p>
              )}
              <p className="font-medium">{productName}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs text-white/60">Dimensione</span>
                <input
                  type="range"
                  min="0.7"
                  max="1.4"
                  step="0.01"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </label>
              <label className="block">
                <span className="text-xs text-white/60">Altezza</span>
                <input
                  type="range"
                  min="-0.4"
                  max="0.4"
                  step="0.01"
                  value={offsetY}
                  onChange={(e) => setOffsetY(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </label>
            </div>

            {snapshotError && <p className="text-sm text-amber-300">{snapshotError}</p>}

            <div className="flex gap-3">
              <button
                onClick={snapshot}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-950 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                <Camera size={18} />
                Scatta foto
              </button>
              <a
                href="https://wa.me/393342590448"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-medium hover:bg-[#128C7E] transition-colors"
              >
                Chiedi disponibilità
              </a>
            </div>
          </div>
        </div>

        {/*
          Sorgente video e montatura: servono al riconoscimento e al disegno,
          ma non vanno mostrati. Niente `display:none` sul video: su iOS
          smetterebbe di produrre fotogrammi. Lo teniamo fuori campo.
        */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none opacity-0"
          style={{ width: 1, height: 1, left: -9999, top: -9999, overflow: 'hidden' }}
        >
          <video ref={videoRef} playsInline muted />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={frameRef}
            src={imageUrl}
            alt=""
            {...(taintFallback ? {} : { crossOrigin: 'anonymous' as const })}
            onError={() => {
              // Se l'immagine è su un CDN che non manda gli header CORS, la
              // richiesta con crossOrigin fallisce: si riprova senza. In quel
              // caso il canvas risulta "sporco" e lo scatto non è possibile,
              // ma la prova continua a funzionare.
              if (!taintFallback) {
                preparedRef.current = null
                setTaintFallback(true)
              }
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

function messaggioErrore(err: unknown): string {
  const name = (err as { name?: string })?.name

  if (name === 'NotAllowedError' || name === 'SecurityError') {
    return 'Permesso della fotocamera negato. Autorizzalo dalle impostazioni del browser e riprova.'
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return 'Non abbiamo trovato nessuna fotocamera su questo dispositivo.'
  }
  if (name === 'NotReadableError') {
    return 'La fotocamera è già usata da un’altra applicazione. Chiudila e riprova.'
  }
  if (typeof navigator !== 'undefined' && !navigator.mediaDevices) {
    return 'Il tuo browser non consente l’accesso alla fotocamera. Prova con Chrome o Safari aggiornati.'
  }
  return 'Il tuo browser potrebbe non supportare questa funzione. Prova ad aggiornarlo o usa un altro dispositivo.'
}
