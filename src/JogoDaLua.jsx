import "./styles/jogo-da-lua.css";
import { useJogoDaLua } from "./hooks/useJogoDaLua";
import { useIsMobile } from "./hooks/useIsMobile";
import Header from "./components/Header";
import BonusPanel from "./components/BonusPanel";
import Roleta from "./components/Roleta";
import QuizPanel from "./components/QuizPanel";
import Scoreboard from "./components/Scoreboard";
import MobileQuiz from "./components/MobileQuiz";
import MoonIllustration from "./components/MoonIllustration";
import AudioControls from "./components/AudioControls";
import Footer from "./components/Footer";

/**
 * Este componente não guarda nenhuma regra do jogo — ele só busca o
 * estado e as ações em useJogoDaLua() e repassa como props para cada
 * seção visual. Toda a lógica fica isolada em src/hooks/useJogoDaLua.js.
 *
 * Em telas de celular (<=768px), a roleta, a grade de 10 perguntas por
 * setor e o placar de grupos somem — em vez disso, uma única caixa
 * sorteia uma pergunta direto do conjunto todo (ver MobileQuiz). O hook
 * do jogo completo continua sendo chamado sempre (regra dos hooks), só
 * não é usado quando isMobile é true.
 *
 * <AudioControls /> é o botão flutuante de volume/mudo da música de fundo
 * (funciona em desktop e mobile). Precisa estar dentro de <AudioProvider>,
 * que agora envolve o jogo lá no App.jsx.
 */
export default function JogoDaLua() {
  const jogo = useJogoDaLua();
  const isMobile = useIsMobile();

  return (
    <div className="jdl-root">
      <AudioControls />
      <Header />

      {isMobile ? (
        <div className="jdl-mobile-layout">
          <MobileQuiz />
          <BonusPanel />
        </div>
      ) : (
        <>
          <div className="jdl-layout">
            <BonusPanel />

            <Roleta
              destaque={jogo.destaque}
              setorAtual={jogo.setorAtual}
              girando={jogo.girando}
              onGirar={jogo.girar}
            />

            <QuizPanel
              setorAtual={jogo.setorAtual}
              estados={jogo.estados}
              perguntaAtiva={jogo.perguntaAtiva}
              revelada={jogo.revelada}
              girando={jogo.girando}
              onSelecionar={jogo.selecionarPergunta}
              onRevelar={jogo.revelarResposta}
            />
          </div>

          <Scoreboard
            grupos={jogo.grupos}
            travado={jogo.travado}
            onEscolherResposta={jogo.escolherResposta}
            onAjustarPontos={jogo.ajustarPontos}
            onMarcarTodos={jogo.marcarTodosComo}
          />
        </>
      )}
      <Footer />
    </div>
  );
}
