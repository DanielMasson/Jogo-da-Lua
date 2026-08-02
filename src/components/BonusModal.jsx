import { X, Sparkles } from "lucide-react";
import { DIAGRAMAS } from "./diagrams";

export default function BonusModal({ id, onClose }) {
  const item = DIAGRAMAS[id];
  if (!item) return null;
  const { Componente, legenda } = item;

  return (
    <div className="jdl-modal-backdrop" onClick={onClose}>
      <div className="jdl-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="jdl-modal-close" onClick={onClose} aria-label="Fechar">
          <X size={18} />
        </button>
        <h3>
          <Sparkles size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
          Resposta — Pergunta {id}
        </h3>
        <Componente />
        {legenda && <p className="jdl-diagram-caption">{legenda}</p>}
      </div>
    </div>
  );
}
