# Azioni Manuali da Completare

## Priorità: Testing

### 1. Testare Statistiche Mood & Energia
- [ ] Apri l'applicazione habit tracker
- [ ] Vai alla pagina **Stats**
- [ ] Seleziona **"Tutti i Goals"** dal dropdown
- [ ] Naviga al tab **"Analisi"**
- [ ] Verifica che appaiano i nuovi pannelli:
  - Pannello "Abitudini Sensibili al Mood"
  - Pannello "Abitudini Sensibili all'Energia"  
  - Pannello "Abitudini Resilienti"
  - Matrice "Abitudini vs Mood & Energia"

### 2. Testare Vista Singola Abitudine
- [ ] Seleziona una specifica abitudine dal dropdown nella pagina Stats
- [ ] Verifica che apparisca un 5° tab chiamato **"Mood & Energia"** (con icona sparkles ✨)
- [ ] Clicca sul tab "Mood & Energia"
- [ ] Verifica che vengano mostrati:
  - 4 card KPI (Correlazione Mood, Correlazione Energia, Mood Medio, Energia Media)
  - Badge di classificazione (Sensibile al Mood / Energia / Resiliente / Neutrale)
  - Grafico "Mood & Energia: Completato vs Mancato"
  - Grafico "Tasso di Completamento per Livello"
  - Info sui giorni analizzati

### 3. Testare con Dati Insufficienti
- [ ] Se hai abitudini con meno di 5 giorni di dati mood/energia, selezionale
- [ ] Verifica che venga mostrato un messaggio appropriato invece dei grafici

### 4. Registrare Mood ed Energia
Per ottenere statistiche accurate:
- [ ] Registra il tuo mood (1-10) ed energia (1-10) quotidianamente
- [ ] Dopo almeno 5-7 giorni, le statistiche diventeranno più significative
- [ ] Più dati accumuli, più accurate saranno le correlazioni

### 5. Verificare Responsiveness
- [ ] Testa tutte le nuove visualizzazioni su:
  - Desktop
  - Tablet
  - Mobile
- [ ] Verifica che i grafici si ridimensionino correttamente
- [ ] Controlla che il tab "M&E" (abbreviato) sia visibile su mobile

### 6. Testare Dark Mode
- [ ] Attiva la modalità scura
- [ ] Verifica che tutti i nuovi componenti siano ben visibili
- [ ] Controlla colori e contrasti dei grafici

## Note
Se trovi problemi o comportamenti inaspettati, annota i dettagli per la correzione.