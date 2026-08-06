import { useState } from "react";
import { Wifi, WifiOff, LogOut } from "lucide-react";
import MobileQuiz from "../components/MobileQuiz";
import PlayerJoin from "./PlayerJoin";
import PlayerVote from "./PlayerVote";
import { usePlayerRoom } from "../hooks/usePlayerRoom";

/**
 * Ponto de entrada do celular. O jogo sozinho (MobileQuiz, roleta +
 * pergunta aleatória) continua funcionando exatamente como antes, sem
 * depender de sala nem de conexão com outros jogadores — é só um dos
 * dois modos possíveis agora.
 *
 * Se o jogador já tinha uma sessão de sala salva (localStorage, ver
 * usePlayerRoom), abre direto no modo online; senão começa no solo.
 */
export default function MobileHub() {
  const player = usePlayerRoom();
  const [modo, setModo] = useState(() => (player.sessao ? "online" : "solo"));

  function alternarModo() {
    // Ao voltar pro solo enquanto está numa sala, sai dela de verdade —
    // evita ficar "preso" numa sala antiga se o jogador voltar pro online depois.
    if (modo === "online" && player.sessao) player.sair();
    setModo((m) => (m === "solo" ? "online" : "solo"));
  }

  return (
    <div className="jdl-mobile-hub">
      <button className="jdl-mode-toggle" onClick={alternarModo}>
        {modo === "solo" ? (
          <>
            <Wifi size={15} /> Jogar em sala (online)
          </>
        ) : (
          <>
            <WifiOff size={15} /> Jogar sozinho
          </>
        )}
      </button>

      {modo === "solo" && <MobileQuiz />}

      {modo === "online" && (!player.sessao || !player.sala) && (
        <PlayerJoin onEntrar={player.entrar} erro={player.erro} />
      )}

      {modo === "online" && player.sessao && player.sala && (
        <>
          <PlayerVote
            sala={player.sala}
            rodada={player.rodada}
            meuGrupoNome={player.meuGrupoNome}
            meuVoto={player.meuVoto}
            meuResultado={player.meuResultado}
            onVotar={player.votar}
          />
          <button className="jdl-leave-room" onClick={player.sair}>
            <LogOut size={13} /> Sair da sala
          </button>
        </>
      )}
    </div>
  );
}
