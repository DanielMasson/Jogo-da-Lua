import { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioSettingsContext = createContext(null);

const LS_VOLUME = "jdl-music-volume";
const LS_MUTED = "jdl-audio-muted";

/**
 * Controla a música de fundo (public/music/trilha.mp3) e o estado global
 * de volume/mudo do site — usado tanto pela música quanto pelos efeitos
 * sonoros dos botões (ver src/hooks/useSfx.js).
 *
 * Para trocar a trilha, basta substituir o arquivo em `public/music/trilha.mp3`.
 * Se o arquivo não existir, o site continua funcionando normalmente, só sem
 * música (os efeitos sonoros dos botões não dependem desse arquivo).
 */
export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const startedRef = useRef(false);

  const [musicVolume, setMusicVolume] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(LS_VOLUME) : null;
    return saved !== null ? Number(saved) : 0.4;
  });
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(LS_MUTED) === "1";
  });

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = musicVolume;
    el.muted = muted;
    localStorage.setItem(LS_VOLUME, String(musicVolume));
    localStorage.setItem(LS_MUTED, muted ? "1" : "0");
    if (muted) {
      el.pause();
    } else if (startedRef.current) {
      el.play().catch(() => {});
    }
  }, [musicVolume, muted]);

  // Navegadores bloqueiam autoplay com som — a música só começa a tocar
  // no primeiro toque/clique/tecla do usuário em qualquer lugar da página.
  useEffect(() => {
    function tentarIniciar() {
      if (startedRef.current) return;
      const el = audioRef.current;
      if (!el) return;
      startedRef.current = true;
      if (!muted) {
        el.play().catch(() => {
          startedRef.current = false;
        });
      }
    }
    window.addEventListener("pointerdown", tentarIniciar);
    window.addEventListener("keydown", tentarIniciar);
    return () => {
      window.removeEventListener("pointerdown", tentarIniciar);
      window.removeEventListener("keydown", tentarIniciar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleMuted() {
    setMuted((m) => !m);
  }

  return (
    <AudioSettingsContext.Provider
      value={{
        musicVolume,
        setMusicVolume,
        muted,
        toggleMuted,
        // volume usado pelos efeitos sonoros dos botões (0 quando mudo)
        sfxVolume: muted ? 0 : 0.6,
      }}
    >
      <audio ref={audioRef} src="/music/trilha.mp3" loop preload="auto" />
      {children}
    </AudioSettingsContext.Provider>
  );
}

export function useAudioSettings() {
  const ctx = useContext(AudioSettingsContext);
  if (!ctx) throw new Error("useAudioSettings precisa ser usado dentro de <AudioProvider>");
  return ctx;
}
