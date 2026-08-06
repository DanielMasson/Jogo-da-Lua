import { useState } from "react";
import { Wifi, WifiOff } from "lucide-react";
import DesktopClassic from "./DesktopClassic";
import HostLobby from "./HostLobby";
import HostGame from "./HostGame";
import { useHostRoom } from "../hooks/useHostRoom";

/**
 * Espelha o MobileHub: por padrão abre no modo clássico (comportamento
 * de sempre, sem Firebase). Ao alternar pra "online", usa useHostRoom
 * pra criar/gerenciar a sala; HostLobby cuida da etapa de configuração
 * e HostGame assume assim que sala.status === "jogando".
 */
export default function DesktopHub() {
  const [modo, setModo] = useState("classico");
  const host = useHostRoom();

  function alternarModo() {
    if (modo === "online" && host.codigo) host.encerrar();
    setModo((m) => (m === "classico" ? "online" : "classico"));
  }

  return (
    <div>
      <button className="jdl-mode-toggle jdl-mode-toggle-desktop" onClick={alternarModo}>
        {modo === "classico" ? (
          <>
            <Wifi size={15} /> Criar sala online (jogadores no celular)
          </>
        ) : (
          <>
            <WifiOff size={15} /> Voltar ao modo clássico (local)
          </>
        )}
      </button>

      {modo === "classico" && <DesktopClassic />}

      {modo === "online" && host.sala?.status === "jogando" && <HostGame host={host} />}
      {modo === "online" && host.sala?.status !== "jogando" && <HostLobby host={host} />}
    </div>
  );
}
