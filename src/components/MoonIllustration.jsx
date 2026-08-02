import RoletaSvg from "./RoletaSvg";

/**
 * No mobile a roleta não é clicável (não há sorteio por setor — ver
 * MobileQuiz), mas o pedido foi manter o mesmo desenho da versão desktop
 * como elemento ilustrativo no topo da tela. É literalmente o mesmo
 * componente RoletaSvg, só que sem nenhum setor aceso/selecionado e
 * envolto por um brilho suave (puramente decorativo).
 */
export default function MoonIllustration() {
  return (
    <div className="jdl-moon-hero" aria-hidden="true">
      <div className="jdl-moon-hero-glow">
        <RoletaSvg />
      </div>
    </div>
  );
}
