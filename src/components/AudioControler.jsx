// components/AudioController.jsx
import React, { useState, useEffect, useRef } from 'react';

const AudioController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    // Inicializa o áudio de fundo
    audioRef.current = new Audio('/sounds/bg-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Os navegadores bloqueiam autoplay, então o play precisa vir de uma ação do usuário
      audioRef.current.play().catch((err) => {
        console.error("Erro ao reproduzir áudio:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div style={styles.container}>
      <button onClick={togglePlay} style={styles.button}>
        {isPlaying ? '🔊 Música ON' : '🔇 Música OFF'}
      </button>
      
      {isPlaying && (
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={handleVolumeChange}
          style={styles.slider}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '10px',
    borderRadius: '8px',
    zIndex: 9999, // Garante que fique acima de outros elementos do jogo
  },
  button: {
    padding: '8px 12px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold'
  },
  slider: {
    width: '100px',
    cursor: 'pointer'
  }
};

export default AudioController;