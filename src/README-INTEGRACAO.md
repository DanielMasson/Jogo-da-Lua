# Como integrar

1. Copie os arquivos deste pacote para dentro do seu projeto, mantendo os
   mesmos caminhos (`src/...`, `public/...`).
2. No arquivo `src/styles/jogo-da-lua.css` do seu projeto, cole o conteúdo
   de `src/styles/audio-controls.css` no final (é só o CSS novo do botão
   flutuante de volume).
3. Os arquivos abaixo foram **substituídos por completo** (é só sobrescrever):
   - src/App.jsx
   - src/JogoDaLua.jsx
   - src/hooks/useJogoDaLua.js
   - src/hooks/useSorteioAleatorio.js
   - src/components/BonusPanel.jsx
4. Os arquivos abaixo são **novos**:
   - src/utils/sfx.js
   - src/hooks/useSfx.js
   - src/context/AudioProvider.jsx
   - src/components/AudioControls.jsx
5. Nenhum outro arquivo do jogo precisa mudar — Roleta, QuizPanel, Scoreboard
   e MobileQuiz já recebem as funções (girar, selecionarPergunta,
   revelarResposta, escolherResposta, ajustarPontos, marcarTodosComo) que
   agora tocam som internamente, então continuam funcionando sem alteração.

## Onde colocar os arquivos MP3

- `public/sounds/` → efeitos dos botões (click.mp3, select.mp3, reveal.mp3,
  correct.mp3, wrong.mp3, spin.mp3, spin-stop.mp3, score.mp3, toggle.mp3).
  Se um nome não existir, o site usa um beep sintetizado automaticamente —
  nada quebra, e dá pra ir trocando aos poucos.
- `public/music/trilha.mp3` → música de fundo em loop. Se esse arquivo não
  existir, o site simplesmente fica sem música (os efeitos dos botões
  continuam funcionando normalmente, pois não dependem desse arquivo).

## Botão de som

O botão flutuante (canto superior direito no PC, canto inferior direito no
celular) tem:
- um ícone de alto-falante que ativa/desativa TODO o som do site (música +
  efeitos dos botões);
- um controle deslizante que ajusta o volume da música de fundo.

A preferência de volume/mudo fica salva no navegador (localStorage), então
persiste entre visitas.
