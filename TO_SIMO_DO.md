### 3. Verifica Default Switch AI (16 Gennaio 2026)
Testa che lo switch AI sia in posizione OFF di default:
- [ ] Cancella localStorage del browser (o apri in incognito)
- [ ] Avvia l'applicazione
- [ ] Naviga alla pagina principale (Index)
- [ ] Verifica che lo switch "AI" nella sezione "Protocollo" sia in posizione **OFF**
- [ ] Verifica che il link "AI Coach" NON sia visibile nel menu laterale
- [ ] Verifica che il card "AI Coach" NON sia visibile nella pagina Stats
- [ ] Attiva lo switch AI manualmente
- [ ] Verifica che ora il link e il card AI Coach siano visibili
- [ ] Ricarica la pagina e verifica che lo stato ON sia persistito

### 4. Test Drag & Drop Riordino Abitudini (16 Gennaio 2026)

#### Step 2: Test Desktop (Mouse)
- [ ] Ricarica l'app (già in esecuzione con npm run dev)
- [ ] Apri il pannello "Gestisci Abitudini" (icona Settings ⚙️)
- [ ] Verifica che ogni abitudine abbia l'icona grip (⋮⋮) a sinistra
- [ ] Passa il mouse su un'abitudine → verifica che il cursore diventi "grab" 🖐️
- [ ] Click e trascina un'abitudine verso l'alto
- [ ] Durante il drag, verifica che:
  - L'abitudine diventi semi-trasparente (opacità 50%)
  - Il cursore diventi "grabbing" ✊
  - Gli altri items si spostino per fare spazio
- [ ] Rilascia il mouse
- [ ] Verifica toast "Ordine salvato" appaia
- [ ] Chiudi e riapri il pannello → verifica ordine mantenuto
- [ ] Ricarica la pagina (F5) → verifica persistenza database

#### Step 3: Test Mobile/Touch
- [ ] Apri DevTools → Device Emulation (iPhone/Android) OPPURE usa device reale
- [ ] Apri "Gestisci Abitudini"
- [ ] Tocca e tieni premuto un'abitudine per ~500ms
- [ ] Trascina verticalmente con il dito
- [ ] Rilascia
- [ ] Verifica toast "Ordine salvato"
- [ ] Verifica persistenza chiudendo/riaprendo pannello

#### Step 4: Test Keyboard Accessibility
- [ ] Usa solo la tastiera (no mouse)
- [ ] Tab fino a raggiungere il pannello "Gestisci Abitudini"
- [ ] Tab fino a un'abitudine
- [ ] Premi **Space** o **Enter** → deve "prendere" l'abitudine
- [ ] Usa **Freccia ↑↓** per muoverla
- [ ] Premi **Space/Enter** per "rilasciarla"
- [ ] Verifica ordine aggiornato
- [ ] Test Escape: Premi **Space**, muovi con frecce, premi **Escape** → annulla operazione

#### Step 5: Test Aggiungi Nuova Abitudine
- [ ] Riordina alcune abitudini esistenti in modo custom
- [ ] Aggiungi una nuova abitudine
- [ ] Verifica che la nuova abitudine appaia **in fondo** alla lista
- [ ] Verifica che sia trascinabile immediatamente
- [ ] Spostala in cima
- [ ] Ricarica → verifica che rimanga in cima

#### Step 6: Test Eliminazione Abitudine
- [ ] Riordina abitudini in modo custom
- [ ] Elimina un'abitudine nel **mezzo** della lista
- [ ] Verifica che le rimanenti mantengano l'ordine relativo
- [ ] Ricarica → verifica ordine ancora corretto

#### Step 7: Test Edit Mode Durante Drag
- [ ] Apri edit mode di un'abitudine (click icona matita)
- [ ] Verifica che durante edit NON puoi trascinare (grip disabilitato)
- [ ] Salva edit
- [ ] Verifica che ora puoi trascinare di nuovo

#### Step 8: Privacy Mode Interaction
- [ ] Abilita Privacy Mode (switch nella pagina Index)
- [ ] Apri "Gestisci Abitudini"
- [ ] Verifica che i nomi delle abitudini siano **blurred**
- [ ] Verifica che il drag & drop funzioni comunque
- [ ] Disabilita Privacy → verifica nomi tornino visibili

#### Step 9: Test con Molte Abitudini
- [ ] Crea almeno 10-15 abitudini
- [ ] Prova a trascinare dalla cima al fondo
- [ ] Prova a trascinare dal fondo alla cima
- [ ] Verifica smooth scroll durante drag
- [ ] Verifica performance (no lag)

#### Step 10: Browser Compatibility
- [ ] Testa su Chrome
- [ ] Testa su Firefox
- [ ] Testa su Safari (se su Mac)
- [ ] Verifica funzionamento identico

### 5. README.md Links (Da Verificare)
Controlla che i seguenti link nel README.md siano corretti:
- [ ] `YOUR_YOUTUBE_VIDEO_LINK_HERE` → Inserisci link tutorial se disponibile



Voglio che aggiungi ai tab delle visualizzazioni nella home page oltre alle visualizzazioni "mese", "settimana", "anno" anche la visualizzazione "vita" nella quale rappresenti nel miglior modo che credi ( ad esempio con dei pallini ) tutta la mia vita "produttiva" dal 2003 ( quando sono nato ) fino a quando avrò 85 anni. Tutti gli anni precedenti da quando ho iniziato a tracciare i miei goals devono essere segnati con un colore azzurrino in modo tale da far capire che non sono anni che sono immagazzinati nel sistema.
Le altre visualizzazioni sono già perfettamente responsive ed adatte secondo i miei standard quindi prendi ad esempio spunto dal una visualizzazione per partire con il piede corretto.
Considera che non voglio dover "scrollare" ma voglio visualizzare tutto sempre con lo spazio che ho a disposizione sia da desktop che da mobile quindi deve essere responsive al massimo.