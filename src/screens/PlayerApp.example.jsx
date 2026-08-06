import { usePlayerRoom } from "../hooks/usePlayerRoom";
import PlayerJoin from "./PlayerJoin";
import PlayerVote from "./PlayerVote";

/**
 * EXEMPLO de como plugar os hooks — cole essa lógica dentro do componente
 * que hoje é renderizado no celular (ex.: dentro do bloco isMobile do
 * JogoDaLua.jsx, substituindo <MobileQuiz />).
 */
export default function PlayerApp() {
  const { sessao, sala, erro, entrar, votar, meuGrupoId, meuGrupoNome, rodada, meuVoto, meuResultado } =
    usePlayerRoom();

  if (!sessao || !sala) {
    return <PlayerJoin onEntrar={entrar} erro={erro} />;
  }

  return (
    <PlayerVote
      sala={sala}
      rodada={rodada}
      meuGrupoNome={meuGrupoNome}
      meuVoto={meuVoto}
      meuResultado={meuResultado}
      onVotar={votar}
    />
  );
}
