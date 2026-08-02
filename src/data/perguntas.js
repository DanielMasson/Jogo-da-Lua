/**
 * Perguntas de Verdadeiro/Falso, uma lista por setor da roleta.
 * Cada item: [texto, verdadeiro(bool), correcao(string)]
 * Transcrito de perguntas_lua.py
 */
export const FRASES_POR_SETOR = [
  // 0 - Setor C: Geologia, Formações, fenômenos e curiosidades
  [
    ["1)- A Lua possui cavernas e túneis subterrâneos formados por antigas atividades vulcânicas, conhecidos como túneis de lava.", true, ""],
    ["2)- Não há evidências de água líquida nas cavernas lunares, mas indícios de gelo de água.", true, ""],
    ["3)- A Bacia Polo Sul–Aitken é a maior cratera de impacto da Lua e do Sistema Solar, com mais de 2.500 km de diâmetro e até 10 km de profundidade, localizada no lado oculto lunar.", true, ""],
    ["4)- A Lua possui túneis de lava subterrâneos criados por fluxos de lava há bilhões de anos, porém são pequenas, com alguns metros de extensão e diâmetro.", false, "A Lua possui túneis de lava subterrâneos criados por fluxos de lava há bilhões de anos, que podem ter vários quilômetros de extensão e centenas de metros de diâmetro podendo abrigar futuras bases humanas."],
    ["5)- A luz cinérea é o brilho que ilumina a Lua devido à luz emitida por todas as lâmpadas ligadas durante a noite na Terra", false, "A luz cinérea é um brilho tênue que ilumina a Lua devido à luz solar refletida pela Terra. Pode ser observada nos dias que precedem e sucedem a Lua Nova."],
    ["6)- A NASA descobriu cavernas na Lua em 1969.", false, "Cientistas da NASA identificaram entradas subterrâneas, essas entradas de tubos de lava (skylights) foram de fato evidenciadas a partir de 2009 (missões Kaguya/LRO)"],
    ["7)- Os impactos de meteoritos são os responsáveis pela formação de crateras e cavernas.", false, "Os impactos formam crateras e montanhas, não diretamente as cavernas."],
    ["8)- Não há crateras lunares com nomes de brasileiros reconhecidas oficialmente pela União Astronômica Internacional (IAU).", false, "A IAU reconheceu crateras com nomes brasileiros, como Campos e Santos-Dumont."],
    ["9)- Moonquakes são os nomes atribuidos as manchas esbranquiçadas na superfície da Lua", false, "Tremores lunares, os moonquakes, rasos podem atingir magnitude de até 5,5 na escala Richter e podem vibrar por mais de 10 minutos"],
    ["10)- A cratera Tycho é a maior e mais visível da Lua, com 85 km.", false, "A cratera Tycho não é a maior, mas uma das mais visíveis da Lua, com longos raios de material que se espalham por centenas de quilômetros."],
  ],
  // 1 - Setor B: História, Exploração, telescópios e missões Apollo
  [
    ["1)- Inventores da luneta foram Hans Lippershey, Jacob Metius e, possivelmente, Sacharias Janssen (Holanda, 1608). Galileu a aprimorou, com lentes de diferentes ampliações para observações científicas(1609).", true, ""],
    ["2)- A Apollo 11 foi a primeira missão a pousar astronautas na Lua. Já a Apollo 17 foi a última missão tripulada do programa Apollo à Lua.", true, ""],
    ["3)- O homem pisou na Lua pela primeira vez em 20 de julho de 1969, durante uma missão Apollo 11 da NASA.", true, ""],
    ["4)- Isaac Newton foi o primeiro a observar a Lua com um telescópio refrator.", false, "Galileu Galilei é considerado o primeiro."],
    ["5)- A principal teoria de formação da Lua é de 1975, a qual considera que ela foi capturada pela gravidade da Terra.", false, "A teoria envolve a colisão de Theia (tamanho de Marte) com a Terra."],
    ["6)- O telescópio foi criado por Galileu Galilei para observar somente a Lua.", false, "O telescópio aprimorado por Galileu, que o utilizou para descobertas significativas além da Lua."],
    ["7)- Os babilônios, contemporâneos de Galileu, auxiliaram nas observações lunares feitas por ele.", false, "Os babilônios registravam observações da Lua muito antes de Galileu."],
    ["8)- Uma pegada na Lua pode durar entre 100 e 1000 anos.", false, "Uma pegada na Lua pode durar milhões de anos devido a ausência de atmosfera."],
    ["9)- A primeira pegada na lua foi feita há 46 anos.", false, "A primeira pegada na Lua foi feita em 1969."],
    ["10)- A NASA já pousou 12 naves tripuladas por astronautas na Lua.", false, "A NASA já visitou a Lua 6 vezes com missões tripuladas, e 12 astronautas caminharam nela."],
  ],
  // 2 - Setor A: Propriedades, fenômenos físicos, órbita
  [
    ["1)- Se você pesa 686 N (70 kg) na Terra, pesaria aproximadamente 113,4 N (11,6 kg) na Lua.", true, ""],
    ["2)- Astronautas conseguem pular mais alto na Lua por causa da baixa gravidade.", true, ""],
    ["3)- As missões Apollo 11, 14 e 15 deixaram retrorrefletores na superfície da Lua, projetados para permitir que cientistas medissem a distância entre a Terra e a Lua com alta precisão.", true, ""],
    ["4)- A Lua tem oceanos congelados profundos escondidos sob sua crosta.", false, "A Lua não tem oceanos líquidos."],
    ["5)- A Lua tem uma ínfima quantidade de água líquida em sua superfície.", false, "Não há água líquida na Lua."],
    ["6)- A Lua se aproxima da Terra 3,8 cm por ano.", false, "A Lua está se afastando da Terra 3,8 cm por ano."],
    ["7)- A Lua não pode ser vista de dia.", false, "A Lua pode ser vista durante o dia em algumas fases."],
    ["8)- A órbita da Lua é perfeitamente circular.", false, "A órbita da Lua é elíptica."],
    ["9)- A Lua tem clima e estações como a Terra.", false, "Não há clima na Lua, pois não há atmosfera."],
    ["10)- A Lua é classificada como um planetoide.", false, "Embora a Lua seja um objeto celeste significativo, sua órbita ao redor da Terra a distingue dos planetoides, que orbitam o Sol."],
  ],
  // 3 - Setor G: Origem, brilho e condições físicas
  [
    ["1)- Atualmente, a Lua é o único satélite natural da Terra, formada há cerca de 4,5 bilhões de anos (provavelmente após um grande impacto).", true, ""],
    ["2)- Por sua proximidade com o planeta Terra, a Lua é o maior e mais brilhante objeto no céu noturno terrestre.", true, ""],
    ["3)- A temperatura na superfície da Lua pode atingir cerca de 127 ºC quando iluminada pelo Sol e - 173 ºC quando está sem iluminação.", true, ""],
    ["4)- Atualmente, depois de acontecimentos com a formação da Terra, a Lua não é o único satélite natural da Terra.", false, "A Lua é o único satélite natural da Terra."],
    ["5)- A Lua não é o mais brilhante objeto no céu noturno, e sim a estrela Sírius.", false, "A Lua é o maior e mais brilhante objeto no céu noturno e não produz luz própria."],
    ["6)- A distância média entre a Lua e a Terra é de 384.400 km, sendo 3 vezes maior que o diâmetro da Terra.", false, "O diâmetro da Terra é que é cerca de 3,67 vezes maior que o da Lua (12.742 km vs 3.474 km)."],
    ["7)- A temperatura na superfície da Lua é a mesma que a da Terra por conta da atmosfera, sendo 35,7 ºC quando iluminado pelo sol e -12,2 ºC quando está sem iluminação.", false, "A Lua não possui atmosfera significativa e as temperaturas variam drasticamente."],
    ["8)- Durante a Lua Cheia, a magnitude aparente da Lua é de cerca de +10, indicando ser muito brilhante.", false, "Durante a Lua Cheia, a magnitude aparente da Lua é de cerca de -12,7."],
    ["9)- Os eclipses lunares ocorrem somente durante a Lua nova.", false, "Eclipses lunares ocorrem durante a Lua cheia."],
    ["10)- A Lua tem placas tectônicas como a Terra.", false, "A Lua não tem atividade tectônica significativa."],
  ],
  // 4 - Setor F: Movimentos, dinâmica orbital e eclipses
  [
    ["1)- O eclipse lunar só acontece na fase Lua cheia e o eclipse solar só acontece na fase da Lua nova.", true, ""],
    ["2)- Os eclipses ocorrem quando a Lua está próxima dos nodos de sua órbita, que são os pontos onde a órbita da Lua cruza o plano da eclíptica.", true, ""],
    ["3)- O Apogeu é o ponto mais distante da órbita da Lua em relação à Terra.", true, ""],
    ["4)- No eclipse solar, a Terra se posiciona entre o Sol e a Lua.", false, "No eclipse lunar, a Terra se posiciona entre o Sol e a Lua, projetando sua sombra sobre a Lua."],
    ["5)- A Lua gira em torno do Sol numa órbita elíptica.", false, "A Lua faz uma órbita conjunta com a Terra em torno do Sol, formando uma trajetória ondulada (tipo um laço espiralado), mas sempre com a Terra como centro da sua órbita local."],
    ["6)- A Lua tem gás oxigênio em pouca quantidade, que não escapa da sua rarefeita atmosfera", false, "A Lua tem uma vasta reserva de oxigênio aprisionado em seu solo, quimicamente ligado nos óxidos do regolito. A gravidade da Lua é muito fraca para reter gases leves por muito tempo."],
    ["7)- A distância entre a Terra e a Lua possui valores fixos e inauterados, bem definidos.", false, "A distância entre a Terra e a Lua varia constantemente dentro de um intervalo, aumentando a cada ano."],
    ["8)- O Perigeu é o ponto da órbita da Lua em que ela está mais distante da Terra.", false, "O Perigeu é o ponto mais próximo, não o mais distante."],
    ["9)- Durante o Perigeu, a distância entre a Lua e a Terra é maior de 400.000 km.", false, "A distância no Perigeu é de aproximadamente 356.000 km a 370.000 km."],
    ["10)- O ciclo de Saros é um período de aproximadamente 8 anos que permite prever a ocorrência de eclipses solares e lunares.", false, "O ciclo de Saros é um período de aproximadamente 18 anos e 11 dias (ou 223 meses sinódicos) que permite prever a ocorrência de eclipses solares e lunares."],
  ],
  // 5 - Setor E: Ciclo lunar e suas fases
  [
    ["1)- Na lua nova, a face iluminada da Lua não está voltada para Terra, tornando-a praticamente invisível.", true, ""],
    ["2)- Na Lua crescente, do ponto de vista da Terra apenas uma pequena fração lunar é iluminada.", true, ""],
    ["3)- Durante a lua cheia, toda a face visível da lua está iluminada pelo Sol.", true, ""],
    ["4)- Na lua nova, a face iluminada da Lua está voltada para a Terra, tornando-a totalmente visível.", false, "Na Lua nova, a face iluminada está para o Sol, não para a Terra, tornando-a invisível."],
    ["5)- A Lua nova ocorre quando a Terra está entre a Lua e o Sol.", false, "A Lua nova ocorre quando a Lua está entre a Terra e o Sol."],
    ["6)- A Lua Gibosa é uma fase que surge logo após a fase de Lua nova.", false, "A Lua Gibosa é uma fase intermediária entre a Lua Crescente e a Lua Cheia, ou entre a Lua Cheia e a Lua Minguante."],
    ["7)- A Lua Gibosa crescente ocorre após a fase cheia.", false, "A Lua Gibosa crescente ocorre antes da fase cheia."],
    ["8)- Durante a Lua Cheia, apenas metade da face visível da Lua está iluminada.", false, "Durante a Lua cheia, toda a face visível está iluminada."],
    ["9)- No quarto minguante, a face visível da Lua está completamente escura.", false, "No quarto minguante, metade da face visível da Lua está iluminada."],
    ["10)- A fase minguante é a primeira fase do ciclo lunar.", false, "A fase minguante é a última fase visível antes da Lua nova."],
  ],
  // 6 - Setor D: Estrutura, composição, atmosfera e dinâmica
  [
    ["1)- A Lua tem uma fina atmosfera, sendo encontrado silício, magnésio, e quantidades ínfimas de gases como oxigênio e hidrogênio.", true, ""],
    ["2)- Na Lua existem áreas mais escuras chamadas de mares lunares (maria), que são grandes piscinas de lava que esfriaram há muito tempo.", true, ""],
    ["3)- Houve uma descoberta por sondas que, nos polos lunares, há a existência de água em sua forma sólida.", true, ""],
    ["4)- A libração lunar é o nome dado ao fato dela estar presa gravitacionalmente, sempre com o mesmo lado virado para Terra", false, "A libração lunar é um \u201cbalanço\u201d aparente da Lua, é como se a Lua \u201cmexesse a cabeça\u201d para os lados e para cima/baixo, revelando pedaços extras do que está além da borda visível."],
    ["5)- A Lua era feita de lava no passado, mas hoje já esfriou completamente e, por isso, não está mais encolhendo.", false, "A Lua ainda está perdendo calor e encolhendo."],
    ["6)- Houve uma descoberta por astronaves que, nos polos lunares, há a existência de água em sua forma líquida e gasosa.", false, "A água nos polos lunares foi encontrada em forma sólida (gelo)."],
    ["7)- A poeira lunar, ou regolito, é composta de partículas extremamente grossas, não causando desgastes em trajes espaciais e equipamentos.", false, "A poeira lunar é composta de partículas finas e afiadas que causam desgaste."],
    ["8)- A Lua emite sons captáveis por rádio na Terra.", false, "Não há som na Lua por falta de ar."],
    ["9)- A Lua tem montanhas mais altas que o Everest.", false, "A Lua tem montanhas, mas não tão altas."],
    ["10)- A superfície da Lua não sofre com tremores lunares.", false, "Existem quatro tipos principais registrados de moonquakes (tremores lunares): profundos (causados por forças de maré), rasos (origem tectônica), por impactos de meteoritos e por expansão térmica/contração."],
  ],
];
