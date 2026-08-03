import { useAudioSettings } from "../context/AudioProvider";
import { playSfx } from "../utils/sfx";

/**
 * Hook de conveniência: devolve uma função `sfx(nome)` que já aplica o
 * volume/mudo globais definidos no botão de som (AudioControls).
 */
export function useSfx() {
  const { sfxVolume, muted } = useAudioSettings();
  return (name) => playSfx(name, { volume: sfxVolume, enabled: !muted });
}
