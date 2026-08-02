# Jogo da Lua

Versão em React do jogo original em Python/Tkinter — uma roleta com 7 setores
temáticos sobre a Lua, perguntas de Verdadeiro/Falso, placar de 6 grupos e um
desafio bônus com diagramas ilustrados.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## Estrutura do projeto

```
src/
├── data/                 # dados estáticos do jogo (nenhuma lógica aqui)
│   ├── perguntas.js       # as 70 perguntas de V/F, por setor
│   ├── setores.js         # letra + título de cada um dos 7 setores
│   └── bonus.js           # as 4 perguntas do desafio bônus
│
├── hooks/
│   └── useJogoDaLua.js    # todo o estado e as regras do jogo
│
├── utils/
│   └── geometry.js        # helpers de SVG usados pela roleta
│
├── components/
│   ├── Header.jsx
│   ├── BonusPanel.jsx     # autocontido: pergunta bônus + modal de resposta
│   ├── BonusModal.jsx
│   ├── Roleta.jsx         # a roleta em SVG
│   ├── QuizPanel.jsx      # grade de perguntas + pergunta/correção
│   ├── Scoreboard.jsx     # placar dos 6 grupos
│   └── diagrams/          # os 4 diagramas de resposta do bônus
│       ├── FaseLua.jsx
│       ├── DiagramaEscala.jsx
│       ├── DiagramaInclinacao.jsx
│       ├── DiagramaPosicoes.jsx
│       ├── DiagramaFases.jsx
│       └── index.js       # mapa id -> componente
│
├── styles/
│   └── jogo-da-lua.css
│
├── JogoDaLua.jsx          # junta o hook com os componentes visuais
├── App.jsx
└── main.jsx                # entrada do Vite
```

## Por que essa separação

- **`data/`** guarda só conteúdo (o que originalmente estava em `perguntas_lua.py`),
  sem nenhuma função — trocar uma pergunta não exige tocar em nenhum componente.
- **`hooks/useJogoDaLua.js`** concentra toda a regra do jogo (sorteio, pontuação,
  travas de V/F). Os componentes de tela não têm `useState` de regra de negócio,
  só de UI local (ex.: qual pergunta bônus está aberta).
- **`components/`** cada seção da tela é um arquivo pequeno e testável
  isoladamente, recebendo dados por props.
- **`styles/`** um `.css` normal, importado uma vez — sem CSS-in-JS gigante.
