# 🎵 Spotify Clone - React Audio Player & Dashboard

Una Single Page Application (SPA) sviluppata in React che replica l'interfaccia utente e le funzionalità di riproduzione audio della celebre piattaforma di streaming musicale.

Progettata per dimostrare competenze avanzate nella gestione di stati globali complessi e nell'ingegnerizzazione di layout web moderni, questa Web App unisce un design pixel-perfect a un motore di riproduzione multimediale custom.

## 🎯 Obiettivi del Progetto & Architettura

La sfida principale di questo progetto è la realizzazione del classico layout a 3 macro-aree di Spotify (Sidebar, Main View scrollabile, Player Bar fissa) utilizzando esclusivamente **puro CSS** (sfruttando le potenzialità di Grid e Flexbox). Nessuna libreria UI o framework CSS pre-costruito è stato utilizzato, garantendo un controllo totale sul rendering visivo e sulle performance.

L'architettura dei componenti è studiata per permettere la navigazione tra le varie viste centrali senza mai interrompere o resettare la barra di riproduzione audio posizionata in basso, dimostrando una solida gestione del ciclo di vita dei componenti React.

## 🚀 Funzionalità Principali

- **Custom Audio Player:** Gestione completa della riproduzione multimediale tramite API HTML5 Audio e React Hooks (`useRef`, `useState`). Include controlli Play/Pausa, skip delle tracce, gestione del volume e barra di avanzamento del brano in tempo reale.
- **Layout Infrangibile (CSS Grid):** Struttura della pagina bloccata in viewport con l'area centrale indipendente per lo scroll, replicando l'esatta User Experience dell'app desktop nativa.
- **State Management Complesso:** Gestione del brano "attivo" in modo globale, permettendo l'aggiornamento simultaneo dei dettagli nella barra di riproduzione e degli indicatori visivi all'interno delle liste delle canzoni.
- **Dark Mode UI Premium:** Palette colori, tipografia e spaziature curate al millimetro per ricreare il tipico "look and feel" premium e immersivo del settore music-streaming.

## 💻 Tech Stack

- **Frontend Library:** React (v18+) con Vite
- **Linguaggio:** JavaScript (ES6+)
- **Styling:** Custom CSS3 (CSS Grid, Flexbox, CSS Variables, Media Queries)
- **Audio API:** HTML5 `<audio>` integrato con React `useRef`
- **Data Management:** Array di oggetti locali per simulare una REST API (Mock Data)
