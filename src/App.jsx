import { songsData } from './songsData';
import './App.css';

function App() {
  return (
    <div className="spotify-layout">
      
      {/* 1. SIDEBAR */}
      <aside className="sidebar">
        <h2>Libreria</h2>
        <ul>
          <li>Le tue playlist</li>
        </ul>
      </aside>

      {/* 2. MAIN VIEW */}
      <main className="main-view">
        <header className="main-header">
          <h1>Buongiorno</h1>
        </header>
        
        {/* GRIGLIA DELLE CANZONI */}
        <section className="songs-container">
          <div className="songs-grid">
            {songsData.map((song) => (
              <div className="song-card" key={song.id}>
                <div className="card-image-container">
                  <img src={song.cover} alt={song.title} className="song-cover" />
                  {/* Pulsante Play nascosto (appare in hover tramite CSS) */}
                  <button className="play-btn">▶</button>
                </div>
                <div className="card-info">
                  <h3 className="song-title">{song.title}</h3>
                  <p className="song-artist">{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 3. PLAYER BAR */}
      <footer className="player-bar">
        <div className="player-placeholder">
          🎵 Il Player Audio andrà qui
        </div>
      </footer>

    </div>
  );
}

export default App;
