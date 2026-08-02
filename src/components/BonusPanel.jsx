import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { BONUS } from "../data/bonus";
import BonusModal from "./BonusModal";

/**
 * Este painel não depende do estado do jogo principal — ele só lê a
 * lista de perguntas bônus e cuida da própria UI (qual pergunta está
 * exibida, qual modal de resposta está aberto, instruções visíveis).
 */
export default function BonusPanel() {
  const [bonusIdx, setBonusIdx] = useState(null);
  const [bonusModal, setBonusModal] = useState(null);
  const [instrucoesAbertas, setInstrucoesAbertas] = useState(false);

  const perguntaSelecionada = BONUS.find((b) => b.id === bonusIdx);

  return (
    <section className="jdl-panel">
      <h2>Desafio Bônus</h2>

      {BONUS.map((b) => (
        <div className="jdl-bonus-row" key={b.id}>
          <button
            className={`jdl-btn jdl-btn-pergunta ${bonusIdx === b.id ? "is-active" : ""}`}
            onClick={() => setBonusIdx(b.id)}
          >
            Pergunta {b.id}
          </button>
          <button className="jdl-btn jdl-btn-resposta" onClick={() => setBonusModal(b.id)}>
            Resposta
          </button>
        </div>
      ))}

      <div className="jdl-bonus-display">
        {perguntaSelecionada ? perguntaSelecionada.pergunta : "Clique em uma das perguntas acima para exibi-la aqui."}
      </div>

      <button className="jdl-btn jdl-instructions-toggle" onClick={() => setInstrucoesAbertas((v) => !v)}>
        <HelpCircle size={15} />
        {instrucoesAbertas ? "Ocultar instruções" : "Como jogar"}
      </button>

      {instrucoesAbertas && (
        <p className="jdl-instructions-text">
          Clique em <strong>Girar</strong> para sortear um setor da Lua. Cada grupo escolhe V ou F no placar antes da
          resposta ser revelada. Escolha uma das 10 perguntas do setor e clique em <strong>Resposta</strong> — quem
          acertou ganha 1 ponto automaticamente. No Desafio Bônus, clique em "Pergunta" para lê-la e em "Resposta"
          para ver a explicação ilustrada.
        </p>
      )}

      {bonusModal && <BonusModal id={bonusModal} onClose={() => setBonusModal(null)} />}
    </section>
  );
}
