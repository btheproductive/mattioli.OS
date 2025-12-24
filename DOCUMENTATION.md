# DOCUMENTATION

## Logica delle Metriche (Reading Tracker)

### Gestione dei giorni non segnati (Empty States)

Nel sistema di tracciamento (es. `useReadingTracker`), i giorni per i quali non viene inserito alcun log (né "done" né "missed") vengono trattati nel seguente modo:

1.  **Statistiche Generali (Frequenza/Percentuale):**
    -   I giorni non segnati vengono **IGNORATI** nel calcolo della percentuale di successo.
    -   La formula per la percentuale è: `Giorni Completati / (Giorni Completati + Giorni Mancini)`.
    -   Esempio: Se completi 1 giorno e ne manchi 1, ma lasci 28 giorni vuoti, la tua percentuale sarà 50% (1/2), non 3% (1/30).

### Gestione dei giorni non segnati (Empty States)

Nel sistema di tracciamento, la logica per i giorni non segnati è stata aggiornata per supportare il concetto di "giorni di riposo" o flessibilità:

1.  **Statistiche Generali (Percentuale):**
    -   I giorni non segnati continuano ad essere **IGNORATI** nel calcolo della percentuale di successo.
    -   Formula: `Giorni Fatti / (Giorni Fatti + Giorni Mancati)`.

2.  **Streak (Serie Consecutiva):**
    -   **Nuova Logica**: Un giorno non segnato (vuoto) **NON INTERROMPE** la serie. Viene considerato come un giorno di "riposo" o un giorno in cui l'attività non era prevista.
    -   La serie si mantiene "congelata" attraverso i giorni vuoti.
    -   **Interruzione**: La serie si azzera **SOLO** se viene registrato esplicitamente uno stato "Mancato" (rosso).
    -   *Esempio*: Fatto (Lun) -> Vuoto (Mar) -> Fatto (Mer). La streak sarà di 2 giorni.
    -   *Esempio*: Fatto (Lun) -> Mancato (Mar) -> Fatto (Mer). La streak si rompe martedì. All'atto di Mercoledì la streak riparte da 1.
