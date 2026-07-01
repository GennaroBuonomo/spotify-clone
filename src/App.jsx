import { useState, useRef, useEffect } from 'react';
import { songsData } from './songsData';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  
  const audioRef = useRef(null);

  // Gestione Autoplay e Pausa
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Errore autoplay:", err));
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentSong, isPlaying]);

  // Gestione Volume in tempo reale
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleNextSong = () => {
    if (!currentSong) return;
    const currentIndex = songsData.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songsData.length;
    setCurrentSong(songsData[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    if (!currentSong) return;
    const currentIndex = songsData.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songsData.length) % songsData.length;
    setCurrentSong(songsData[prevIndex]);
    setIsPlaying(true);
  };

  // Aggiorna il volume dal range slider
  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value));
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="spotify-layout">
      
      {/* --- SIDEBAR COMPLETATA --- */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>🎧 SpotiClone</h2>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li className="active">🏠 Home</li>
            <li>🔍 Cerca</li>
            <li>📚 La tua libreria</li>
          </ul>
        </nav>

        <div className="sidebar-playlists">
          <button className="create-playlist-btn">➕ Crea playlist</button>
          <ul>
            <li>Mix Rock Anni '90</li>
            <li>Coding Session 💻</li>
            <li>Relax & Focus</li>
            <li>Le mie Hit</li>
          </ul>
        </div>
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

      <footer className="player-bar">
        {currentSong ? (
          <div className="player-content">
            
            <div className="now-playing">
              <img src={currentSong.cover} alt="cover" className="now-playing-cover" />
              <div className="now-playing-info">
                <h4>{currentSong.title}</h4>
                <p>{currentSong.artist}</p>
              </div>
            </div>

            <div className="player-controls">
              <div className="player-buttons">
                <button className="control-btn skip-btn" onClick={handlePrevSong}>⏮</button>
                <button className="control-btn play-pause-btn" onClick={togglePlayPause}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button className="control-btn skip-btn" onClick={handleNextSong}>⏭</button>
              </div>
              
              <div className="playback-bar">
                <span className="time-text">{formatTime(currentTime)}</span>
                <input 
                  type="range" 
                  className="progress-slider" 
                  min="0" 
                  max={duration || 0} 
                  value={currentTime} 
                  onChange={handleSeek} 
                />
                <span className="time-text">{formatTime(duration)}</span>
              </div>
            </div>

            {/* --- CONTROLLO DEL VOLUME --- */}
            <div className="player-volume">
               <span className="volume-icon">{volume === 0 ? '🔇' : '🔊'}</span>
               <input 
                  type="range" 
                  className="progress-slider volume-slider" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={volume} 
                  onChange={handleVolumeChange} 
                />
            </div>
          </div>
        ) : (
          <div className="player-placeholder">
            Seleziona un brano per iniziare
          </div>
        )}

        {/* Hidden HTML5 Audio Instance - Managed via React useRef */}
        <audio
          ref={audioRef}
          src={currentSong?.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleNextSong}
        />
      </footer>

    </div>
  );
}

export default App;