import { LogOut } from "lucide-react";
import Roleta from "../components/Roleta";
import HostQuestionPanel from "../components/HostQuestionPanel";
import HostScoreboard from "../components/HostScoreboard";
import BonusPanel from "../components/BonusPanel";

export default function HostGame({ host }) {
  const { sala, girar, girando, destaque, setorAtual, revelar, ajustarPontos, encerrar } = host;

  return (
    <div>
      <div className="jdl-host-topbar">
        <span className="jdl-room-code-value jdl-room-code-value-sm">Sala {host.codigo}</span>
        <button className="jdl-leave-room" onClick={encerrar}>
          <LogOut size={13} /> Encerrar sala
        </button>
      </div>

      <div className="jdl-layout">
        <BonusPanel />

        <Roleta destaque={destaque} setorAtual={setorAtual} girando={girando} onGirar={girar} />

        <HostQuestionPanel sala={sala} girando={girando} onRevelar={revelar} />
      </div>

      <HostScoreboard sala={sala} onAjustarPontos={ajustarPontos} />
    </div>
  );
}
