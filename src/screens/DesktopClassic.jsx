import { useJogoDaLua } from "../hooks/useJogoDaLua";
import BonusPanel from "../components/BonusPanel";
import Roleta from "../components/Roleta";
import QuizPanel from "../components/QuizPanel";
import Scoreboard from "../components/Scoreboard";

/**
 * Modo original do jogo: um único PC, grupos físicos ao redor da tela,
 * cada grupo escolhe V/F no placar e o host revela manualmente qual das
 * 10 perguntas do setor sorteado. Zero dependência de Firebase/sala —
 * continua funcionando offline, exatamente como antes desta feature.
 */
export default function DesktopClassic() {
  const jogo = useJogoDaLua();

  return (
    <>
      <div className="jdl-layout">
        <BonusPanel />

        <Roleta destaque={jogo.destaque} setorAtual={jogo.setorAtual} girando={jogo.girando} onGirar={jogo.girar} />

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
  );
}
