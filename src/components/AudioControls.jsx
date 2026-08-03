import { Volume2, VolumeX } from "lucide-react";
import { useAudioSettings } from "../context/AudioProvider";

/**
 * Botão flutuante fixo (funciona em desktop e mobile via CSS) com:
 *  - botão de mudo/ativar (desliga música + efeitos sonoros dos botões)
 *  - controle deslizante de volume da música de fundo
 */
export default function AudioControls() {
  const { musicVolume, setMusicVolume, muted, toggleMuted } = useAudioSettings();

  return (
    <div className="jdl-audio-controls" role="group" aria-label="Controle de som">
      <button
        className="jdl-audio-btn"
        onClick={toggleMuted}
        aria-label={muted ? "Ativar som" : "Desativar som"}
        aria-pressed={muted}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <input
        className="jdl-audio-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={musicVolume}
        disabled={muted}
        onChange={(e) => setMusicVolume(Number(e.target.value))}
        aria-label="Volume da música"
      />
    </div>
  );
}
