import "./styles/jogo-da-lua.css";
import { useIsMobile } from "./hooks/useIsMobile";
import Header from "./components/Header";
import MobileHub from "./screens/MobileHub";
import DesktopHub from "./screens/DesktopHub";
import BonusPanel from "./components/BonusPanel";
import AudioControls from "./components/AudioControls";

/**
 * Este componente não guarda nenhuma regra do jogo — só decide, pela
 * largura da tela, qual "hub" mostrar:
 *  - mobile  -> MobileHub    (alterna solo / entrar em sala)
 *  - desktop -> DesktopHub   (alterna clássico local / criar sala online)
 *
 * Cada hub decide por conta própria o que renderizar dali pra baixo.
 * Toda a lógica de jogo (local ou via Firebase) mora nos hooks
 * (useJogoDaLua, useJogoMobile, useHostRoom, usePlayerRoom).
 */
export default function JogoDaLua() {
  const isMobile = useIsMobile();

  return (
    <div className="jdl-root">
      <AudioControls />
      <Header />

      {isMobile ? (
        <div className="jdl-mobile-layout">
          <MobileHub />
          <BonusPanel />
        </div>
      ) : (
        <DesktopHub />
      )}
    </div>
  );
}
