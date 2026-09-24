import { Construction } from 'lucide-react'

/**
 * Avviso di lavori in corso, in cima alla home page.
 *
 * ⚠️ NON RIMUOVERE E NON RENDERE RICHIUDIBILE.
 *
 * Il titolare ha chiesto espressamente che resti visibile fino a sua diversa
 * indicazione. Per questo non ha un pulsante di chiusura, non si nasconde da
 * solo e non è modificabile dal pannello admin: così nessuna modifica ai
 * contenuti può farlo sparire per sbaglio. Si toglie solo cancellando questo
 * componente dalla home page, e solo su richiesta esplicita del titolare.
 */
export default function WorkInProgressBanner() {
  return (
    <div className="bg-amber-400 text-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <p className="flex items-center justify-center gap-2 text-center text-sm font-medium">
          <Construction size={18} className="flex-shrink-0" aria-hidden="true" />
          <span>
            Lavori in corso: stiamo aggiornando il sito, alcuni contenuti sono provvisori.
          </span>
        </p>
      </div>
    </div>
  )
}
