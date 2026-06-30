import { useState, useRef, useEffect } from 'react';
import { songsData } from './songsData';
import './App.css';

function App() {
  // --- STATI DEL PLAYER ---
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); 

  // --- LOGICA DI RIPRODUZIONE ---

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Errore autoplay:", err));
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentSong, isPlaying]);

  
  const handlePlaySong = (song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="spotify-layout">
      
      <aside className="sidebar">
        <h2>Libreria</h2>
        <ul>
          <li>Le tue playlist</li>
        </ul>
      </aside>

      <main className="main-view">
        <header className="main-header">
          <h1>Buongiorno</h1>
        </header>
        
        <section className="songs-container">
          <div className="songs-grid">
            {songsData.map((song) => (
              <div 
                className={`song-card ${currentSong?.id === song.id ? 'active' : ''}`} 
                key={song.id}
                onClick={() => handlePlaySong(song)} 
              >
                <div className="card-image-container">
                  <img src={song.cover} alt={song.title} className="song-cover" />
                  <button className="play-btn">
                    {/* Se la canzone cliccata è quella attiva ed è in play, mostra Pausa, altrimenti Play */}
                    {currentSong?.id === song.id && isPlaying ? '⏸' : '▶'}
                  </button>
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

      {/* --- 3. PLAYER BAR AGGIORNATA --- */}
      <footer className="player-bar">
        {currentSong ? (
          <div className="player-content">
            
            {/* Sinistra: Info Canzone */}
            <div className="now-playing">
              <img src={currentSong.cover} alt="cover" className="now-playing-cover" />
              <div className="now-playing-info">
                <h4>{currentSong.title}</h4>
                <p>{currentSong.artist}</p>
              </div>
            </div>

            {/* Centro: Controlli di riproduzione */}
            <div className="player-controls">
              <button className="control-btn play-pause-btn" onClick={togglePlayPause}>
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>

            {/* Destra: Spazio per il volume (placeholder per ora) */}
            <div className="player-volume">
               🔊 --
            </div>
          </div>
        ) : (
          <div className="player-placeholder">
            Seleziona un brano per iniziare
          </div>
        )}

        {/* Motore Audio HTML5 nativo (Controllato dinamicamente tramite useRef) */}
        <audio
          ref={audioRef}
          src={currentSong?.audioUrl}
        />
      </footer>

    </div>
  );
}

export default App;
