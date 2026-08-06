import { useState, useMemo } from "react";
import { Users, Play, Shuffle, Hand } from "lucide-react";

/**
 * Fica visível do momento em que o host clica em "Criar sala online" até
 * o jogo efetivamente começar (sala.status vira "jogando"). O componente
 * pai (DesktopHub) troca pra <HostGame /> quando isso acontece.
 */
export default function HostLobby({ host }) {
  const { codigo, sala, criarSala, formarGruposAleatorio, criarGruposVazios, moverJogador, iniciarJogo } = host;

  const [numGrupos, setNumGrupos] = useState(4);
  const [modoFormacao, setModoFormacao] = useState("aleatorio");
  const [duracaoRodadaSeg, setDuracaoRodadaSeg] = useState(30);

  const jogadoresLista = useMemo(
    () => Object.entries(sala?.jogadores || {}).map(([id, j]) => ({ id, ...j })),
    [sala]
  );
  const gruposLista = useMemo(() => Object.entries(sala?.grupos || {}).map(([id, g]) => ({ id, ...g })), [sala]);
  const gruposFormados = gruposLista.length > 0;

  // --- Etapa 1: ainda não criou a sala ---
  if (!codigo) {
    return (
      <section className="jdl-panel" style={{ maxWidth: 420, margin: "24px auto" }}>
        <h2>Criar sala online</h2>
        <div className="jdl-host-form">
          <label>
            Quantidade de grupos
            <input
              className="jdl-input"
              type="number"
              min={2}
              max={12}
              value={numGrupos}
              onChange={(e) => setNumGrupos(Number(e.target.value))}
            />
          </label>

          <label>
            Formação dos grupos
            <select className="jdl-input" value={modoFormacao} onChange={(e) => setModoFormacao(e.target.value)}>
              <option value="aleatorio">Aleatória (embaralha quem entrar)</option>
              <option value="manual">Manual (eu escolho cada jogador)</option>
            </select>
          </label>

          <label>
            Tempo por pergunta (segundos)
            <input
              className="jdl-input"
              type="number"
              min={10}
              max={120}
              value={duracaoRodadaSeg}
              onChange={(e) => setDuracaoRodadaSeg(Number(e.target.value))}
            />
          </label>

          <button
            className="jdl-btn jdl-btn-resposta"
            onClick={() => criarSala({ numGrupos, modoFormacao, duracaoRodadaSeg })}
          >
            Criar sala
          </button>
        </div>
      </section>
    );
  }

  // --- Etapa 2: sala criada, aguardando jogadores entrarem ---
  return (
    <section className="jdl-panel" style={{ maxWidth: 520, margin: "24px auto" }}>
      <h2>Sala criada</h2>

      <div className="jdl-room-code">
        <span className="jdl-room-code-label">Código para os jogadores digitarem no celular</span>
        <span className="jdl-room-code-value">{codigo}</span>
      </div>

      <div className="jdl-lobby-players">
        <span className="jdl-scoreboard-title">
          <Users size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
          Jogadores na sala ({jogadoresLista.length})
        </span>
        {jogadoresLista.length === 0 && <p className="jdl-placeholder">Ninguém entrou ainda…</p>}
        <ul className="jdl-lobby-player-list">
          {jogadoresLista.map((j) => (
            <li key={j.id} className={j.online ? "" : "is-offline"}>
              {j.nome}
              {gruposFormados && (
                <select
                  className="jdl-input jdl-input-inline"
                  value={j.grupoId || ""}
                  onChange={(e) => moverJogador(j.id, e.target.value || null)}
                >
                  <option value="">sem grupo</option>
                  {gruposLista.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.nome}
                    </option>
                  ))}
                </select>
              )}
            </li>
          ))}
        </ul>
      </div>

      {!gruposFormados ? (
        <div className="jdl-lobby-actions">
          <button
            className="jdl-btn"
            onClick={() =>
              sala.config.modoFormacao === "aleatorio"
                ? formarGruposAleatorio(sala.config.numGrupos)
                : criarGruposVazios(sala.config.numGrupos)
            }
          >
            {sala.config.modoFormacao === "aleatorio" ? (
              <>
                <Shuffle size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
                Formar {sala.config.numGrupos} grupos aleatoriamente
              </>
            ) : (
              <>
                <Hand size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
                Criar {sala.config.numGrupos} grupos vazios (escolher manualmente)
              </>
            )}
          </button>
        </div>
      ) : (
        <button className="jdl-btn jdl-btn-resposta" style={{ width: "100%" }} onClick={iniciarJogo}>
          <Play size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
          Iniciar jogo
        </button>
      )}
    </section>
  );
}
