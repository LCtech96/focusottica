# Setup Repository GitHub

## Collegare il progetto al repository GitHub

1. **Inizializza Git (se non già fatto):**
```bash
git init
```

2. **Aggiungi tutti i file:**
```bash
git add .
```

3. **Crea il primo commit:**
```bash
git commit -m "Initial commit: Focus Ottica website"
```

4. **Collega al repository remoto:**
```bash
git remote add origin https://github.com/LCtech96/focusottica.git
```

5. **Verifica il remote:**
```bash
git remote -v
```

6. **Push del codice:**
```bash
git branch -M main
git push -u origin main
```

## Comandi Git Utili

```bash
# Aggiungere modifiche
git add .

# Commit
git commit -m "Descrizione delle modifiche"

# Push
git push

# Pull (per aggiornare da remoto)
git pull
```

## Note

- Assicurati di avere i permessi sul repository GitHub
- Se il repository è privato, potresti dover autenticarti
- Per problemi di autenticazione, considera l'uso di SSH keys o GitHub CLI



