import { songsData } from './songsData';
import './App.css'

function App() {

  return (
    <div className="spotify-layout">

      {/* SideBar (sinistra)*/}
      <aside className="sidebar">
        <h2>Libreria</h2>
        <ul>
          <li>Playlist 1</li>
          <li>Playlist 2</li>
        </ul>
      </aside>

      {/* 2. MAIN VIEW (Centro/Destra) */}
      <main className="main-view">
        <header className="main-header">
          <h1>Buongiorno</h1>
        </header>
        <section className="content">
          <p>Qui andranno le canzoni e gli album in griglia</p>
        </section>
      </main>

      {/* 3. PLAYER BAR (Basso) */}
      <footer className="player-bar">
        <div className="player-placeholder">
          Il Player Audio andrà qui
        </div>
      </footer>
    </div>
  )
}

export default App
