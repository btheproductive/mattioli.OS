# Test Manuali - Soft-Delete Abitudini

## Test 2: Visibilità nelle Statistiche
1. [ ] Navigare alla pagina `/stats` (cliccare sulla tab Statistiche)
2. [ ] Aprire il selettore delle abitudini (dropdown in alto)
3. [ ] **Verifica**:
   - [ ] "Test Soft Delete" appare nella lista con dicitura "(archiviato)"
4. [ ] Selezionare "Test Soft Delete" dal dropdown
5. [ ] **Verifica statistiche**:
   - [ ] Vedo le statistiche calcolate fino ad oggi
   - [ ] Il calendario annuale mostra i giorni completati (verde)
   - [ ] I trend riflettono i dati storici
   - [ ] Current streak, best streak, ecc. sono calcolati correttamente

## Test 3: Range di Editing - Oggi
1. [ ] Tornare alla vista calendario (tab Mese nel Protocollo)
2. [ ] **Verifica per OGGI**:
   - [ ] Posso ancora vedere il log di oggi per "Test Soft Delete"
   - [ ] Posso modificare lo stato di oggi (click su oggi)
   - [ ] Il toggle funziona correttamente (done → missed → null → done)

## Test 4: Range di Editing - Domani (test futuro)
⚠️ **NOTA**: Questo test può essere fatto solo domani o modificando la data di sistema

**Opzione A - Aspettare domani**:
1. [ ] Domani, aprire l'applicazione
2. [ ] Verificare che "Test Soft Delete" NON appaia nelle viste giornaliere
3. [ ] Verificare che non posso aggiungere log per domani per questa abitudine

**Opzione B - Modificare data di sistema** (sconsigliato, può causare problemi):
1. [ ] Cambiare la data di sistema a domani
2. [ ] Ricaricare l'applicazione
3. [ ] Verificare comportamento come Opzione A
4. [ ] ⚠️ Ricordarsi di ripristinare la data corretta

## Test 5: Database Verification
1. [ ] Aprire Supabase Dashboard
2. [ ] Navigare a Table Editor → goals
3. [ ] Cercare il record con title = "Test Soft Delete"
4. [ ] **Verifica**:
   - [ ] Il record esiste ancora (non è stato eliminato fisicamente)
   - [ ] `end_date` è uguale alla data odierna nel formato 'YYYY-MM-DD'
   - [ ] `start_date` e tutti gli altri campi sono invariati

## Test 6: Cleanup
1. [ ] Eliminare definitivamente "Test Soft Delete" dal database (opzionale)
2. [ ] Oppure lasciarlo come esempio di abitudine archiviata

---

## Test Riordino Abitudini (test esistenti)

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
