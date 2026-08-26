import type { Locale } from "@/lib/i18n";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = {
  label: string;
  items: FaqItem[];
};

export type FaqCopy = {
  navLabel: string;
  navDesc: string;
  eyebrow: string;
  headline: [string, string];
  intro: string;
  indexLabel: string;
  sections: FaqSection[];
  ctaEyebrow: string;
  ctaHeadline: string;
  ctaText: string;
  cta: string;
  seoTitle: string;
  seoDescription: string;
};

const faq: Record<Locale, FaqCopy> = {
  fr: {
    navLabel: "FAQ",
    navDesc: "Lever les derniers freins",
    eyebrow: "FAQ / AVANT DE COMMENCER",
    headline: ["LES BONNES QUESTIONS.", "AVANT LES MAUVAISES DÉCISIONS."],
    intro: "Vous n’avez pas besoin d’arriver avec un brief parfait ni une solution déjà choisie. Voici ce qu’il faut savoir pour comprendre comment je travaille, ce que l’on peut construire ensemble et dans quels cas je vous dirai simplement qu’un autre chemin est préférable.",
    indexLabel: "12 RÉPONSES POUR SAVOIR SI NOUS DEVONS TRAVAILLER ENSEMBLE",
    sections: [
      {
        label: "AVANT DE COMMENCER",
        items: [
          { question: "Dois-je déjà savoir quelle solution il me faut ?", answer: "Non. C’est même souvent préférable de partir du problème plutôt que d’une solution présupposée. Vous m’expliquez ce qui bloque, l’objectif, le contexte et ce qui a déjà été tenté. Je vous aide ensuite à identifier le levier réellement utile — stratégie, IA, web, acquisition, automatisation ou combinaison de plusieurs." },
          { question: "Quels types de projets acceptez-vous ?", answer: "J’interviens surtout lorsqu’un enjeu business rencontre un problème digital concret : acquisition qui plafonne, expérience web qui freine, opérations trop manuelles, données mal exploitées, outils déconnectés, positionnement flou ou besoin d’un système IA réellement utile. Le secteur importe moins que la clarté du problème à résoudre." },
          { question: "Que dois-je préparer avant de vous contacter ?", answer: "Très peu de choses. Un objectif, le problème principal, quelques éléments de contexte et, si vous en avez, les chiffres ou outils concernés suffisent pour démarrer. Vous n’avez pas besoin d’un cahier des charges complet : il peut justement faire partie du travail de clarification." },
        ],
      },
      {
        label: "FAÇON DE TRAVAILLER",
        items: [
          { question: "Pouvez-vous intervenir sur une partie du projet ou tout prendre en charge ?", answer: "Les deux. Je peux intervenir sur un point précis — audit, stratégie, acquisition, automatisation, UX, architecture ou agent IA — ou piloter un dispositif plus complet. La bonne profondeur d’intervention dépend du problème, pas d’un package imposé." },
          { question: "Quelle différence faites-vous entre stratégie, web, IA et acquisition ?", answer: "Ce ne sont pas quatre produits séparés, mais quatre leviers. La stratégie clarifie la direction et les arbitrages. Le web structure l’expérience et la conversion. L’IA et l’automatisation réduisent la friction opérationnelle. L’acquisition crée et optimise la demande. Un projet peut n’en nécessiter qu’un ou avoir besoin de les faire travailler ensemble." },
          { question: "Pouvez-vous reprendre un projet existant, mal engagé ou déjà cassé ?", answer: "Oui. Je peux auditer l’existant, comprendre ce qui fonctionne encore, isoler ce qui crée la friction et proposer une reprise ciblée plutôt qu’une reconstruction automatique. Quand conserver une partie du système est plus intelligent que tout refaire, je le recommande." },
        ],
      },
      {
        label: "BUDGET & DÉLAIS",
        items: [
          { question: "Comment se déroule un projet avec vous ?", answer: "Le déroulé reste simple : comprendre le problème, cadrer l’objectif, choisir les leviers, définir ce qui doit être livré, exécuter puis vérifier l’impact. Selon la mission, cela peut prendre la forme d’un audit suivi d’un plan d’action, d’un sprint ciblé ou d’une réalisation complète avec points de validation intermédiaires." },
          { question: "Quels sont vos délais habituels ?", answer: "Ils dépendent surtout de la complexité, des dépendances et de la vitesse de validation. Certaines interventions ciblées se règlent en quelques jours ; un dispositif plus complet demande plusieurs semaines. Je préfère annoncer un calendrier réaliste après cadrage plutôt que vendre une vitesse artificielle avant d’avoir vu le problème." },
          { question: "Combien coûte une mission ?", answer: "Il n’y a pas de tarif unique parce qu’un audit, une campagne d’acquisition, un site, une automatisation ou un agent IA n’ont ni le même périmètre ni le même niveau de risque. Le prix est défini à partir du problème, des livrables, du niveau d’implication et du délai. Le cadrage sert aussi à éviter de vous faire payer pour des briques dont vous n’avez pas besoin." },
        ],
      },
      {
        label: "COLLABORATION & PÉRIMÈTRE",
        items: [
          { question: "Travaillez-vous seul ou avec d’autres spécialistes ?", answer: "Je reste votre point de contact et je garde la cohérence du projet. Quand une compétence très spécifique est nécessaire, je peux travailler avec des spécialistes adaptés au besoin. L’objectif n’est pas de grossir artificiellement l’équipe, mais de réunir exactement les compétences nécessaires." },
          { question: "Travaillez-vous uniquement à distance ou dans une zone géographique précise ?", answer: "Je peux travailler à distance avec des clients et équipes situés dans différents marchés. Les échanges, validations et livrables sont organisés pour fonctionner sans dépendre d’une présence physique permanente. Quand un contexte local compte, il est intégré au cadrage, au message et aux décisions." },
          { question: "Et si vos services ne sont finalement pas ce dont j’ai besoin ?", answer: "Je vous le dirai. Le but du premier cadrage n’est pas de faire entrer chaque problème dans mes services. Si le bon choix est de ne rien construire, de corriger un point interne, de garder votre solution actuelle ou de faire appel à un autre profil, c’est la recommandation que vous recevrez." },
        ],
      },
    ],
    ctaEyebrow: "VOTRE QUESTION N’EST PAS ICI ?",
    ctaHeadline: "PARLEZ-MOI DU PROBLÈME, PAS DU SERVICE.",
    ctaText: "Quelques lignes suffisent. Je vous dirai rapidement si je peux être utile et quelle serait la prochaine étape logique.",
    cta: "PARLER DE MON PROJET ↗",
    seoTitle: "FAQ",
    seoDescription: "Questions fréquentes sur la façon de travailler avec Gary WILFRED-BORILLA : projets, méthode, stratégie, web, IA, acquisition, budget, délais et collaboration.",
  },
  en: {
    navLabel: "FAQ",
    navDesc: "Remove the last blockers",
    eyebrow: "FAQ / BEFORE WE START",
    headline: ["THE RIGHT QUESTIONS.", "BEFORE THE WRONG DECISIONS."],
    intro: "You do not need a perfect brief or a solution already picked. Here is what you should know about how I work, what we can build together, and the situations where I will simply tell you another route makes more sense.",
    indexLabel: "12 ANSWERS TO KNOW WHETHER WE SHOULD WORK TOGETHER",
    sections: [
      { label: "BEFORE WE START", items: [
        { question: "Do I need to know which solution I need already?", answer: "No. Starting from the problem is usually better than starting from a presumed solution. Tell me what is stuck, the goal, the context, and what has already been tried. I can then identify the lever that actually matters — strategy, AI, web, acquisition, automation, or a combination." },
        { question: "What kinds of projects do you take on?", answer: "I focus on situations where a business challenge meets a concrete digital problem: stalled acquisition, a web experience that gets in the way, overly manual operations, underused data, disconnected tools, unclear positioning, or the need for an AI system that is genuinely useful. The industry matters less than the problem we need to solve." },
        { question: "What should I prepare before contacting you?", answer: "Very little. A goal, the main problem, a bit of context and, when available, the relevant numbers or tools are enough to start. You do not need a finished specification — defining the right one can be part of the work." },
      ]},
      { label: "HOW I WORK", items: [
        { question: "Can you handle one part of a project or the whole thing?", answer: "Both. I can step into a focused area — audit, strategy, acquisition, automation, UX, architecture or AI agent — or lead a broader delivery. The right level of involvement comes from the problem, not from a fixed package." },
        { question: "How do strategy, web, AI and acquisition differ?", answer: "They are not four separate products; they are four levers. Strategy clarifies direction and trade-offs. Web shapes the experience and conversion path. AI and automation reduce operational friction. Acquisition creates and optimizes demand. A project may need only one, or several working together." },
        { question: "Can you take over an existing, troubled or broken project?", answer: "Yes. I can audit what already exists, identify what still works, isolate the friction, and recommend a targeted recovery instead of automatically rebuilding everything. If keeping part of the current system is the smarter choice, that is what I will recommend." },
      ]},
      { label: "BUDGET & TIMING", items: [
        { question: "What does a project with you look like?", answer: "The flow is straightforward: understand the problem, frame the goal, choose the right levers, define the deliverables, execute, then verify the impact. Depending on the mission, that may be an audit and action plan, a focused sprint, or a complete delivery with validation points along the way." },
        { question: "What are your usual timelines?", answer: "It depends on complexity, dependencies and how quickly decisions can be validated. Some focused interventions take days; broader systems take several weeks. I would rather give you a realistic schedule after framing the work than sell artificial speed before seeing the problem." },
        { question: "How much does an engagement cost?", answer: "There is no single fee because an audit, an acquisition program, a website, an automation and an AI agent have different scopes and risks. Pricing is based on the problem, deliverables, involvement and timeline. Framing also prevents you from paying for pieces you do not need." },
      ]},
      { label: "COLLABORATION & SCOPE", items: [
        { question: "Do you work alone or with other specialists?", answer: "I remain your main point of contact and keep the project coherent. When a highly specific skill is needed, I can work with the right specialists. The goal is not to inflate the team; it is to bring in exactly the expertise the project needs." },
        { question: "Do you only work remotely or in a specific region?", answer: "I can work remotely with clients and teams across different markets. Communication, validation and delivery are structured to work without permanent on-site presence. When local context matters, it is built into the framing, messaging and decisions." },
        { question: "What if your services are not actually what I need?", answer: "I will tell you. The first framing conversation is not about forcing every problem into my services. If the right move is to build nothing, fix an internal issue, keep your current solution, or hire a different profile, that is the recommendation you will get." },
      ]},
    ],
    ctaEyebrow: "YOUR QUESTION IS NOT HERE?",
    ctaHeadline: "TELL ME ABOUT THE PROBLEM, NOT THE SERVICE.",
    ctaText: "A few lines are enough. I will tell you quickly whether I can help and what the logical next step would be.",
    cta: "TALK ABOUT MY PROJECT ↗",
    seoTitle: "FAQ",
    seoDescription: "Frequently asked questions about working with Gary WILFRED-BORILLA: projects, process, strategy, web, AI, acquisition, budgets, timelines and collaboration.",
  },
  es: {
    navLabel: "FAQ", navDesc: "Resolver las últimas dudas", eyebrow: "FAQ / ANTES DE EMPEZAR", headline: ["LAS PREGUNTAS CORRECTAS.", "ANTES DE TOMAR MALAS DECISIONES."],
    intro: "No necesitas llegar con un brief perfecto ni con la solución ya elegida. Aquí tienes lo esencial para entender cómo trabajo, qué podemos construir juntos y en qué casos te diré directamente que otro camino tiene más sentido.", indexLabel: "12 RESPUESTAS PARA SABER SI TIENE SENTIDO TRABAJAR JUNTOS",
    sections: [
      { label: "ANTES DE EMPEZAR", items: [
        { question: "¿Tengo que saber ya qué solución necesito?", answer: "No. Normalmente es mejor partir del problema que de una solución asumida. Cuéntame qué está bloqueando el avance, cuál es el objetivo, el contexto y qué se ha intentado. A partir de ahí identifico el palanca útil: estrategia, IA, web, adquisición, automatización o una combinación." },
        { question: "¿Qué tipo de proyectos aceptas?", answer: "Trabajo sobre todo cuando un reto de negocio se cruza con un problema digital concreto: adquisición estancada, experiencia web que frena, operaciones demasiado manuales, datos desaprovechados, herramientas desconectadas, posicionamiento poco claro o necesidad de un sistema de IA realmente útil." },
        { question: "¿Qué debería preparar antes de contactarte?", answer: "Muy poco. Un objetivo, el problema principal, algo de contexto y, si los tienes, datos o herramientas implicadas. No hace falta un pliego completo: definir bien el alcance también puede formar parte del trabajo." },
      ]},
      { label: "FORMA DE TRABAJAR", items: [
        { question: "¿Puedes intervenir solo en una parte o encargarte de todo?", answer: "Ambas cosas. Puedo entrar en un punto concreto — auditoría, estrategia, adquisición, automatización, UX, arquitectura o agente IA — o dirigir un dispositivo más amplio. La profundidad depende del problema, no de un paquete impuesto." },
        { question: "¿Qué diferencia hay entre estrategia, web, IA y adquisición?", answer: "No son cuatro productos aislados, sino cuatro palancas. La estrategia aclara dirección y prioridades. La web estructura experiencia y conversión. La IA y la automatización reducen fricción operativa. La adquisición genera y optimiza demanda. Un proyecto puede necesitar una sola o varias trabajando juntas." },
        { question: "¿Puedes retomar un proyecto existente, mal encaminado o roto?", answer: "Sí. Puedo auditar lo que ya existe, conservar lo que funciona, aislar la fricción y plantear una recuperación focalizada en vez de reconstruir todo por defecto. Si mantener parte del sistema es la decisión más inteligente, eso recomendaré." },
      ]},
      { label: "PRESUPUESTO Y PLAZOS", items: [
        { question: "¿Cómo se desarrolla un proyecto contigo?", answer: "El proceso es simple: entender el problema, definir el objetivo, elegir las palancas, concretar entregables, ejecutar y comprobar el impacto. Según la misión puede ser una auditoría con plan de acción, un sprint focalizado o una realización completa con validaciones intermedias." },
        { question: "¿Cuáles son tus plazos habituales?", answer: "Dependen de la complejidad, las dependencias y la velocidad de validación. Algunas intervenciones se resuelven en días; sistemas más completos requieren semanas. Prefiero dar un calendario realista después del encuadre que prometer rapidez antes de entender el problema." },
        { question: "¿Cuánto cuesta una misión?", answer: "No hay una tarifa única: una auditoría, una campaña de adquisición, una web, una automatización y un agente IA tienen alcances y riesgos distintos. El precio se define según el problema, los entregables, el nivel de implicación y el plazo, evitando hacerte pagar por piezas innecesarias." },
      ]},
      { label: "COLABORACIÓN Y ALCANCE", items: [
        { question: "¿Trabajas solo o con otros especialistas?", answer: "Sigo siendo tu punto de contacto y mantengo la coherencia del proyecto. Cuando hace falta una competencia muy específica, puedo trabajar con especialistas adecuados. No se trata de inflar el equipo, sino de reunir exactamente las capacidades necesarias." },
        { question: "¿Trabajas solo a distancia o en una zona concreta?", answer: "Puedo trabajar a distancia con clientes y equipos de distintos mercados. La comunicación, las validaciones y las entregas se organizan para no depender de presencia física permanente. Cuando el contexto local importa, se integra en las decisiones y el mensaje." },
        { question: "¿Y si al final tus servicios no son lo que necesito?", answer: "Te lo diré. El primer encuadre no sirve para meter cada problema dentro de mis servicios. Si lo correcto es no construir nada, resolver un punto interno, mantener tu solución actual o acudir a otro perfil, esa será mi recomendación." },
      ]},
    ],
    ctaEyebrow: "¿TU PREGUNTA NO ESTÁ AQUÍ?", ctaHeadline: "CUÉNTAME EL PROBLEMA, NO EL SERVICIO.", ctaText: "Unas líneas bastan. Te diré rápidamente si puedo ayudarte y cuál sería el siguiente paso lógico.", cta: "HABLAR DE MI PROYECTO ↗", seoTitle: "FAQ", seoDescription: "Preguntas frecuentes sobre trabajar con Gary WILFRED-BORILLA: proyectos, metodología, estrategia, web, IA, adquisición, presupuesto, plazos y colaboración.",
  },
  pt: {
    navLabel: "FAQ", navDesc: "Eliminar as últimas dúvidas", eyebrow: "FAQ / ANTES DE COMEÇAR", headline: ["AS PERGUNTAS CERTAS.", "ANTES DAS DECISÕES ERRADAS."], intro: "Você não precisa chegar com um briefing perfeito nem com a solução já escolhida. Aqui está o essencial para entender como eu trabalho, o que podemos construir juntos e quando vou dizer com clareza que outro caminho faz mais sentido.", indexLabel: "12 RESPOSTAS PARA SABER SE FAZ SENTIDO TRABALHARMOS JUNTOS",
    sections: [
      { label: "ANTES DE COMEÇAR", items: [
        { question: "Preciso já saber qual solução eu preciso?", answer: "Não. Em geral, é melhor começar pelo problema do que por uma solução presumida. Conte o que está travando, o objetivo, o contexto e o que já foi tentado. A partir daí identifico a alavanca útil — estratégia, IA, web, aquisição, automação ou uma combinação." },
        { question: "Que tipos de projeto você aceita?", answer: "Atuo principalmente quando um desafio de negócio encontra um problema digital concreto: aquisição estagnada, experiência web que atrapalha, operação manual demais, dados pouco explorados, ferramentas desconectadas, posicionamento pouco claro ou necessidade de um sistema de IA realmente útil." },
        { question: "O que devo preparar antes de entrar em contato?", answer: "Muito pouco. Um objetivo, o principal problema, algum contexto e, se houver, números ou ferramentas envolvidas. Você não precisa de um escopo fechado: defini-lo corretamente também pode fazer parte do trabalho." },
      ]},
      { label: "FORMA DE TRABALHAR", items: [
        { question: "Você pode atuar em uma parte ou cuidar do projeto inteiro?", answer: "Os dois. Posso entrar em um ponto específico — auditoria, estratégia, aquisição, automação, UX, arquitetura ou agente de IA — ou conduzir uma entrega mais ampla. O nível de envolvimento vem do problema, não de um pacote fixo." },
        { question: "Qual a diferença entre estratégia, web, IA e aquisição?", answer: "Não são quatro produtos separados, mas quatro alavancas. Estratégia define direção e prioridades. Web estrutura experiência e conversão. IA e automação reduzem atrito operacional. Aquisição cria e otimiza demanda. Um projeto pode precisar de uma só ou de várias em conjunto." },
        { question: "Você consegue assumir um projeto existente, problemático ou quebrado?", answer: "Sim. Posso auditar o que existe, preservar o que funciona, isolar o atrito e propor uma recuperação focada em vez de reconstruir tudo automaticamente. Se manter parte do sistema for a escolha mais inteligente, é isso que vou recomendar." },
      ]},
      { label: "ORÇAMENTO E PRAZOS", items: [
        { question: "Como funciona um projeto com você?", answer: "O fluxo é direto: entender o problema, enquadrar o objetivo, escolher as alavancas, definir entregáveis, executar e verificar impacto. Dependendo da missão, pode ser uma auditoria com plano de ação, um sprint focado ou uma entrega completa com validações intermediárias." },
        { question: "Quais são os prazos mais comuns?", answer: "Dependem da complexidade, das dependências e da velocidade das validações. Algumas intervenções levam dias; sistemas mais amplos exigem semanas. Prefiro definir um cronograma realista depois do enquadramento a vender velocidade artificial antes de entender o problema." },
        { question: "Quanto custa uma missão?", answer: "Não existe uma tarifa única porque auditoria, aquisição, site, automação e agente de IA têm escopos e riscos diferentes. O preço é definido pelo problema, entregáveis, nível de envolvimento e prazo, evitando que você pague por peças de que não precisa." },
      ]},
      { label: "COLABORAÇÃO E ESCOPO", items: [
        { question: "Você trabalha sozinho ou com outros especialistas?", answer: "Continuo sendo seu ponto de contato e mantenho a coerência do projeto. Quando uma competência muito específica é necessária, posso trabalhar com especialistas adequados. O objetivo não é aumentar a equipe, mas reunir exatamente as capacidades necessárias." },
        { question: "Você trabalha apenas remotamente ou em uma região específica?", answer: "Posso trabalhar remotamente com clientes e equipes em diferentes mercados. Comunicação, validações e entregas são organizadas para não depender de presença física constante. Quando o contexto local importa, ele entra no enquadramento, na mensagem e nas decisões." },
        { question: "E se seus serviços não forem o que eu realmente preciso?", answer: "Eu vou dizer. A primeira conversa não existe para encaixar todo problema nos meus serviços. Se a melhor decisão for não construir nada, corrigir algo internamente, manter sua solução atual ou procurar outro perfil, essa será a recomendação." },
      ]},
    ],
    ctaEyebrow: "SUA PERGUNTA NÃO ESTÁ AQUI?", ctaHeadline: "FALE DO PROBLEMA, NÃO DO SERVIÇO.", ctaText: "Algumas linhas bastam. Eu digo rapidamente se posso ajudar e qual seria o próximo passo mais lógico.", cta: "FALAR SOBRE MEU PROJETO ↗", seoTitle: "FAQ", seoDescription: "Perguntas frequentes sobre trabalhar com Gary WILFRED-BORILLA: projetos, processo, estratégia, web, IA, aquisição, orçamento, prazos e colaboração.",
  },
  gcf: {
    navLabel: "FAQ", navDesc: "Lévé dènyé dout-la", eyebrow: "FAQ / AVAN NOU KOUMANSÉ", headline: ["BON KÈSYON-LA.", "AVAN MOVÉ DÉSYON-LA."], intro: "Ou pa bizwen rivé èvè on brief pawfé ni èvè solisyon-la ja chwazi. Mi sa ki enpòtan pou konprann kijan an ka travay, sa nou pé konstwi ansanm, é lè an ké di'w franchman on dot chimen pli bon.", indexLabel: "12 RÉPONS POU SAV SI NOU DWÈ TRAVAY ANSANM",
    sections: [
      { label: "AVAN NOU KOUMANSÉ", items: [
        { question: "Ès fò mwen ja sav ki solisyon mwen bizwen?", answer: "Non. Pli souvan, miyò nou pati asi pwoblèm-la olyé nou pati asi on solisyon nou ja imajiné. Di mwen sa ki ka bloké, koté ou vlé rivé, kontèks-la é sa ou ja éséyé. Apré sa, an ka idantifyé bon lévyé-la: stratéji, IA, web, acquisition, otomatik oben plizyè ansanm." },
        { question: "Ki kalité pwojé ou ka pran?", answer: "An ka travay sitou lè on pwoblèm biznis ka jwenn on pwoblèm dijital konkrè: acquisition ka plafonné, sit-la ka frenné moun, twòp travay manyèl, doné pa byen sèvi, zouti pa konekté, pozisyonman pa klè oben bezwen on sistèm IA ki itil vréman." },
        { question: "Ka mwen dwèt préparé avan mwen kontakté'w?", answer: "Pa gran bagay. On objektif, pwoblèm prensipal-la, déotwa éléman kontèks é, si ou ni yo, chif oben zouti ki konsèné. Ou pa bizwen on cahier des charges fini: mété bon kad-la pé fè pati travay-la." },
      ]},
      { label: "KIJAN AN KA TRAVAY", items: [
        { question: "Ou pé travay asi on pati sèlman oben pran tout pwojé-la?", answer: "Toulédé. An pé vini asi on pwen prési — audit, stratéji, acquisition, otomatik, UX, architecture oben agent IA — oben piloté on travay pli laj. Sé pwoblèm-la ki ka désidé nivo entèvansyon-la, pa on paké ja préparé." },
        { question: "Ki diférans ni ant stratéji, web, IA é acquisition?", answer: "Sé pa kat pwodwi séparé, sé kat lévyé. Stratéji ka kléré direksyon-la. Web ka òganizé èkspéryans é conversion. IA é otomatik ka tiré friksyon adan travay touléjou. Acquisition ka kréyé é optimizé demann-la. On pwojé pé bizwen yonn sèlman oben plizyè ansanm." },
        { question: "Ou pé reprann on pwojé ki ja la, ki mal pati oben ki kasé?", answer: "Wi. An pé fè audit sa ki la, gadé sa ki ka maché toujou, trouvé sa ki ka bloké é pwopozé on repriz prési san fò tout bagay fèt ankò. Si gardé on pati sistèm-la pli entélijan, sé sa an ké konséyé." },
      ]},
      { label: "BIDJÉ & DÉLÈ", items: [
        { question: "Kijan on pwojé ka pasé èvè'w?", answer: "Nou ka konprann pwoblèm-la, kadé objektif-la, chwazi bon lévyé-la, défini sa pou livwé, fè travay-la é vérifyé léfè-la. Sa pé on audit èvè plan aksyon, on sprint prési oben on réalisasyon konplèt èvè pwen validation." },
        { question: "Ki délè ou ka travay èvè yo an jénéral?", answer: "Sa ka dépann dè konplèksité, dépendans é vitès validation. Déotwa entèvansyon pé fèt an kèk jou; on sistèm pli laj pé mandé plizyè simenn. An préféré ba'w on kalandriyé réyalis apré cadrage-la olyé pwomèt vitès avan an konprann pwoblèm-la." },
        { question: "Konbyen on misyon ka kouté?", answer: "Pa ni on sèl pri paskè audit, acquisition, sit web, otomatik é agent IA pa ni menm périmèt ni menm risk. Pri-la ka soti adan pwoblèm-la, livrables, nivo enplikasyon é délè. Cadrage-la ka évité ou péyé bagay ou pa bizwen." },
      ]},
      { label: "KOLABORASYON & PÉRIMÈT", items: [
        { question: "Ou ka travay tousèl oben èvè dòt espesyalis?", answer: "Mwen ka rété kontak prensipal-la é an ka gadé cohérence pwojé-la. Lè on konpétans byen prési nesésè, an pé travay èvè bon espesyalis-la. Objektif-la sé pa mété plis moun, sé mété moun ki bizwen vréman." },
        { question: "Ou ka travay sèlman a distans oben adan on zòn prési?", answer: "An pé travay a distans èvè kliyan é ekip adan plizyè maché. Échanj, validation é livrables ka òganizé pou sa maché san prezans fizik tout tan. Lè kontèks lokal-la enpòtan, nou ka mété'y adan cadrage, message é désyon." },
        { question: "É si an final sèvis a'w pa sa mwen bizwen?", answer: "An ké di'w sa. Premyé cadrage-la pa la pou fòsé chak pwoblèm rantré adan sèvis an mwen. Si miyò pa konstwi ayen, korijé on bagay anndan, gardé solisyon-la oben pran on dòt pwofil, sé sa an ké konséyé." },
      ]},
    ],
    ctaEyebrow: "KÈSYON A'W PA LA?", ctaHeadline: "PALÉ BAN MWEN DÈ PWOBLÈM-LA, PA DÈ SÈVIS-LA.", ctaText: "Déotwa liy sifi. An ké di'w vit si an pé itil é ki pwochen pa ki pli lojik.", cta: "PALÉ DÈ PWOJÉ AN MWEN ↗", seoTitle: "FAQ", seoDescription: "Kèstyon moun ka pozé sou travay èvè Gary WILFRED-BORILLA : pwojé, méthode, stratéji, web, IA, acquisition, bidjé, délè é kolaborasyon.",
  },
  ar: {
    navLabel: "الأسئلة", navDesc: "إزالة آخر نقاط التردد", eyebrow: "الأسئلة الشائعة / قبل أن نبدأ", headline: ["الأسئلة الصحيحة.", "قبل القرارات الخاطئة."], intro: "لا تحتاج إلى موجز مثالي أو إلى اختيار الحل مسبقاً. هنا ما تحتاج إلى معرفته عن طريقة عملي، وما يمكننا بناؤه معاً، ومتى سأخبرك بوضوح أن مساراً آخر هو الأنسب.", indexLabel: "12 إجابة لمعرفة ما إذا كان من المنطقي أن نعمل معاً",
    sections: [
      { label: "قبل أن نبدأ", items: [
        { question: "هل يجب أن أعرف مسبقاً ما الحل الذي أحتاجه؟", answer: "لا. غالباً من الأفضل أن نبدأ بالمشكلة لا بحل مفترض. أخبرني بما يعرقل التقدم، والهدف، والسياق، وما جُرّب من قبل. بعدها أحدد الرافعة المناسبة: استراتيجية، ذكاء اصطناعي، ويب، اكتساب، أتمتة أو مزيج بينها." },
        { question: "ما أنواع المشاريع التي تعمل عليها؟", answer: "أركز على الحالات التي يلتقي فيها تحدٍ تجاري بمشكلة رقمية واضحة: اكتساب متوقف، تجربة ويب تعيق التحويل، عمليات يدوية أكثر من اللازم، بيانات غير مستغلة، أدوات غير مترابطة، تموضع غير واضح أو حاجة إلى نظام ذكاء اصطناعي مفيد فعلاً." },
        { question: "ماذا أجهز قبل التواصل معك؟", answer: "القليل يكفي: هدف، المشكلة الأساسية، بعض السياق، وأي أرقام أو أدوات ذات صلة إن وُجدت. لا تحتاج إلى وثيقة متطلبات كاملة؛ تحديد النطاق الصحيح قد يكون جزءاً من العمل نفسه." },
      ]},
      { label: "طريقة العمل", items: [
        { question: "هل يمكنك العمل على جزء من المشروع أم تولي المشروع كاملاً؟", answer: "كلاهما. يمكنني التدخل في نقطة محددة — تدقيق، استراتيجية، اكتساب، أتمتة، UX، بنية أو وكيل ذكاء اصطناعي — أو قيادة تنفيذ أوسع. مستوى التدخل تحدده المشكلة، لا باقة ثابتة." },
        { question: "ما الفرق بين الاستراتيجية والويب والذكاء الاصطناعي والاكتساب؟", answer: "ليست أربعة منتجات منفصلة، بل أربع روافع. الاستراتيجية توضح الاتجاه والمفاضلات. الويب ينظم التجربة والتحويل. الذكاء الاصطناعي والأتمتة يقللان الاحتكاك التشغيلي. الاكتساب يولد الطلب ويحسنه. قد يحتاج المشروع إلى واحدة فقط أو إلى عدة روافع معاً." },
        { question: "هل يمكنك استلام مشروع قائم أو متعثر أو مكسور؟", answer: "نعم. أستطيع تدقيق الموجود، والحفاظ على ما يعمل، وعزل مصادر الاحتكاك، واقتراح استعادة مستهدفة بدلاً من إعادة البناء تلقائياً. إذا كان الاحتفاظ بجزء من النظام هو القرار الأذكى فسأوصي بذلك." },
      ]},
      { label: "الميزانية والمدة", items: [
        { question: "كيف يسير المشروع معك؟", answer: "المسار بسيط: فهم المشكلة، تأطير الهدف، اختيار الروافع، تحديد المخرجات، التنفيذ ثم قياس الأثر. قد تكون المهمة تدقيقاً مع خطة عمل، أو سباقاً مركزاً، أو تنفيذاً كاملاً مع نقاط تحقق مرحلية." },
        { question: "ما المدد المعتادة؟", answer: "تعتمد على التعقيد والاعتماديات وسرعة الاعتماد. بعض التدخلات المركزة تستغرق أياماً، والأنظمة الأوسع عدة أسابيع. أفضل إعطاء جدول واقعي بعد التأطير بدلاً من بيع سرعة وهمية قبل فهم المشكلة." },
        { question: "كم تبلغ تكلفة المهمة؟", answer: "لا يوجد سعر واحد لأن التدقيق، وبرامج الاكتساب، والمواقع، والأتمتة، ووكلاء الذكاء الاصطناعي تختلف في النطاق والمخاطر. يتحدد السعر وفق المشكلة والمخرجات ومستوى المشاركة والمدة، مع تجنب دفعك مقابل أجزاء لا تحتاجها." },
      ]},
      { label: "التعاون والنطاق", items: [
        { question: "هل تعمل بمفردك أم مع متخصصين آخرين؟", answer: "أبقى نقطة الاتصال الرئيسية وأحافظ على اتساق المشروع. عندما نحتاج إلى مهارة دقيقة جداً يمكنني العمل مع متخصصين مناسبين. الهدف ليس تضخيم الفريق، بل جمع الخبرات الضرورية فقط." },
        { question: "هل تعمل عن بُعد فقط أم في منطقة محددة؟", answer: "يمكنني العمل عن بُعد مع عملاء وفرق في أسواق مختلفة. تُنظم الاتصالات والاعتمادات والتسليمات بحيث لا تعتمد على حضور ميداني دائم. وعندما يكون السياق المحلي مهماً، يدخل في التأطير والرسالة والقرارات." },
        { question: "ماذا لو لم تكن خدماتك هي ما أحتاجه فعلاً؟", answer: "سأخبرك. المحادثة الأولى ليست لإجبار كل مشكلة على الدخول في خدماتي. إذا كان الأفضل ألا نبني شيئاً، أو نصلح نقطة داخلية، أو نحافظ على الحل الحالي، أو نستعين بملف آخر، فهذه ستكون توصياتي." },
      ]},
    ],
    ctaEyebrow: "سؤالك غير موجود هنا؟", ctaHeadline: "حدثني عن المشكلة، لا عن الخدمة.", ctaText: "بضعة أسطر تكفي. سأخبرك سريعاً إن كان بإمكاني المساعدة وما هي الخطوة المنطقية التالية.", cta: "لنتحدث عن مشروعي ↗", seoTitle: "الأسئلة الشائعة", seoDescription: "أسئلة شائعة حول العمل مع Gary WILFRED-BORILLA: المشاريع، المنهجية، الاستراتيجية، الويب، الذكاء الاصطناعي، الاكتساب، الميزانية، المدة والتعاون.",
  },
  ja: {
    navLabel: "FAQ", navDesc: "最後の疑問を解消", eyebrow: "FAQ / 始める前に", headline: ["正しい問いを。", "間違った決断の前に。"], intro: "完璧な要件書も、すでに決めた解決策も必要ありません。私の進め方、一緒に構築できること、そして別の選択肢の方が適切だと率直にお伝えするケースをまとめました。", indexLabel: "一緒に取り組むべきかを判断するための12の回答",
    sections: [
      { label: "始める前に", items: [
        { question: "必要な解決策を先に決めておく必要はありますか？", answer: "いいえ。多くの場合、想定した解決策ではなく問題から始める方が適切です。何が止まっているのか、目標、背景、これまで試したことを教えてください。そこから戦略、AI、Web、集客、自動化、あるいは複数の組み合わせから本当に必要なレバーを見極めます。" },
        { question: "どのようなプロジェクトに対応していますか？", answer: "事業課題と具体的なデジタル課題が交差する案件を中心に扱います。集客の停滞、Web体験の摩擦、手作業の多さ、活用されていないデータ、分断されたツール、不明確なポジショニング、実用的なAIシステムの必要性などです。" },
        { question: "問い合わせ前に何を準備すればいいですか？", answer: "多くは必要ありません。目標、主な問題、少しの背景、あれば関連する数字やツールで十分です。完成した仕様書は不要で、適切な要件を定義すること自体が仕事の一部になる場合もあります。" },
      ]},
      { label: "進め方", items: [
        { question: "一部分だけでも、プロジェクト全体でも依頼できますか？", answer: "どちらも可能です。監査、戦略、集客、自動化、UX、設計、AIエージェントなど一点に絞った支援も、より広い実行全体のリードもできます。関与範囲は固定パッケージではなく問題に合わせて決めます。" },
        { question: "戦略・Web・AI・集客はどう違いますか？", answer: "4つの別商品ではなく4つのレバーです。戦略は方向性と優先順位を明確にし、Webは体験とコンバージョンを整え、AIと自動化は業務上の摩擦を減らし、集客は需要を生み最適化します。1つだけ必要な場合も、複数を連動させる場合もあります。" },
        { question: "既存の、うまくいっていないプロジェクトも引き継げますか？", answer: "はい。現状を監査し、機能している部分を残し、摩擦の原因を切り分け、全面再構築ではなく必要な箇所だけを立て直す提案ができます。既存システムを部分的に残す方が賢明なら、その選択を勧めます。" },
      ]},
      { label: "予算と期間", items: [
        { question: "プロジェクトはどのように進みますか？", answer: "問題を理解し、目標を定義し、必要なレバーを選び、成果物を決め、実行し、効果を確認します。案件によって、監査とアクションプラン、短期集中スプリント、途中確認を含むフル実装などに変わります。" },
        { question: "通常どのくらいの期間がかかりますか？", answer: "複雑さ、依存関係、意思決定の速さで変わります。数日で完了する集中的な支援もあれば、数週間必要な仕組みもあります。問題を見る前に速さを約束するより、整理した後に現実的なスケジュールを提示します。" },
        { question: "費用はいくらですか？", answer: "一律料金ではありません。監査、集客、Webサイト、自動化、AIエージェントでは範囲もリスクも異なります。問題、成果物、関与度、期間をもとに設定し、不要な要素に費用を払わない設計を重視します。" },
      ]},
      { label: "協業と範囲", items: [
        { question: "一人で対応しますか？他の専門家とも組みますか？", answer: "私は窓口として全体の整合性を保ちます。非常に専門的なスキルが必要な場合は、適切な専門家と連携できます。チームを大きく見せることではなく、必要な能力だけを揃えることが目的です。" },
        { question: "リモートのみですか？地域は限定されていますか？", answer: "異なる市場のクライアントやチームとリモートで進められます。常時対面を前提にせず、連絡、確認、納品が機能する形に設計します。地域特有の文脈が重要な場合は、要件、メッセージ、判断に反映します。" },
        { question: "実はあなたのサービスが必要ではなかった場合は？", answer: "そのままお伝えします。最初の整理は、すべての問題を私のサービスに当てはめるためではありません。何も作らない、内部課題を直す、現行ソリューションを維持する、別の専門家に依頼する方が正しければ、そう提案します。" },
      ]},
    ],
    ctaEyebrow: "ここにない質問がありますか？", ctaHeadline: "サービスではなく、問題を教えてください。", ctaText: "数行で十分です。お役に立てるか、次に何をするのが合理的かをすぐにお伝えします。", cta: "プロジェクトについて相談する ↗", seoTitle: "FAQ", seoDescription: "Gary WILFRED-BORILLAとの仕事に関するよくある質問：プロジェクト、進め方、戦略、Web、AI、集客、予算、期間、協業について。",
  },
  zh: {
    navLabel: "FAQ", navDesc: "解决最后的顾虑", eyebrow: "FAQ / 开始之前", headline: ["先问对问题。", "再避免错误决定。"], intro: "你不需要带着完美的需求文档，也不需要先选好解决方案。这里说明我的工作方式、我们可以一起搭建什么，以及哪些情况下我会直接告诉你：另一条路更合适。", indexLabel: "12个回答，帮你判断我们是否适合合作",
    sections: [
      { label: "开始之前", items: [
        { question: "我需要提前知道自己要什么解决方案吗？", answer: "不需要。大多数时候，从问题出发比从预设方案出发更有效。告诉我卡在哪里、目标是什么、背景如何、已经试过什么。我会据此判断真正需要的杠杆：战略、AI、网站、获客、自动化，或它们的组合。" },
        { question: "你通常接什么类型的项目？", answer: "我主要处理商业挑战与具体数字问题交叉的项目：获客停滞、网站体验阻碍转化、人工流程过多、数据没有被充分利用、工具彼此割裂、定位不清，或需要真正实用的AI系统。" },
        { question: "联系你之前需要准备什么？", answer: "不需要很多。一个目标、主要问题、一些背景，以及有的话相关数据或工具就足够开始。你不需要完整需求文档；把范围定义正确，本身也可以是工作的一部分。" },
      ]},
      { label: "工作方式", items: [
        { question: "你可以只负责一部分，也可以负责整个项目吗？", answer: "都可以。我可以聚焦一个具体环节——审计、战略、获客、自动化、UX、架构或AI Agent——也可以负责更完整的交付。介入深度由问题决定，而不是由固定套餐决定。" },
        { question: "战略、网站、AI和获客之间有什么区别？", answer: "它们不是四个分开的产品，而是四种杠杆。战略澄清方向和取舍；网站优化体验与转化；AI和自动化减少运营摩擦；获客创造并优化需求。一个项目可能只需要一种，也可能需要多种协同。" },
        { question: "你能接手已经存在、进展不顺甚至出问题的项目吗？", answer: "可以。我会先审计现状，保留仍然有效的部分，定位摩擦点，再提出针对性的修复，而不是默认全部重做。如果保留部分现有系统更明智，我会明确这样建议。" },
      ]},
      { label: "预算与时间", items: [
        { question: "项目通常怎么推进？", answer: "流程很清晰：理解问题、明确目标、选择杠杆、定义交付物、执行，然后验证影响。根据任务不同，可以是审计加行动计划、一次聚焦冲刺，或带阶段验收的完整交付。" },
        { question: "通常需要多长时间？", answer: "取决于复杂度、依赖关系和确认速度。有些聚焦任务几天即可完成，更完整的系统可能需要数周。我更愿意在理解问题后给出现实时间表，而不是在看清问题前承诺虚假的速度。" },
        { question: "项目费用是多少？", answer: "没有统一价格，因为审计、获客、网站、自动化和AI Agent的范围与风险都不同。价格取决于问题、交付物、参与深度和时间要求，同时会避免让你为不需要的模块买单。" },
      ]},
      { label: "协作与范围", items: [
        { question: "你是独立工作还是会和其他专家合作？", answer: "我会一直作为主要联系人，并保持项目整体一致性。如果确实需要非常专业的能力，我可以与合适的专家协作。目标不是把团队做大，而是只引入项目真正需要的能力。" },
        { question: "你只做远程项目吗？有地域限制吗？", answer: "我可以远程与不同市场的客户和团队合作。沟通、确认和交付会被设计成不依赖持续现场办公。当地语境重要时，会进入项目框架、信息表达和决策。" },
        { question: "如果最后发现你的服务并不是我真正需要的呢？", answer: "我会直接告诉你。第一次沟通不是为了把所有问题硬塞进我的服务里。如果正确选择是什么都不做、先修复内部问题、保留当前方案，或找另一类专家，我会这样建议。" },
      ]},
    ],
    ctaEyebrow: "这里没有你的问题？", ctaHeadline: "告诉我问题，而不是服务名称。", ctaText: "几句话就够了。我会很快告诉你我是否能提供帮助，以及下一步最合理的行动是什么。", cta: "聊聊我的项目 ↗", seoTitle: "FAQ", seoDescription: "关于与Gary WILFRED-BORILLA合作的常见问题：项目、方法、战略、网站、AI、获客、预算、时间和协作。",
  },
  ko: {
    navLabel: "FAQ", navDesc: "마지막 고민까지 해결", eyebrow: "FAQ / 시작하기 전에", headline: ["좋은 질문부터.", "잘못된 결정은 그다음에 막습니다."], intro: "완벽한 브리프도, 이미 정해 둔 솔루션도 필요하지 않습니다. 제가 어떻게 일하는지, 함께 무엇을 만들 수 있는지, 그리고 다른 선택이 더 낫다면 언제 그렇게 말씀드리는지를 정리했습니다.", indexLabel: "함께 일할지 판단하기 위한 12가지 답변",
    sections: [
      { label: "시작하기 전에", items: [
        { question: "필요한 솔루션을 미리 정해 와야 하나요?", answer: "아닙니다. 대부분은 가정한 솔루션보다 문제에서 시작하는 편이 좋습니다. 무엇이 막혀 있는지, 목표, 맥락, 이미 시도한 것을 알려 주세요. 그다음 전략, AI, 웹, 획득, 자동화 또는 그 조합 중 실제로 필요한 레버를 찾습니다." },
        { question: "어떤 프로젝트를 맡나요?", answer: "비즈니스 과제와 구체적인 디지털 문제가 만나는 프로젝트를 주로 맡습니다. 획득 정체, 전환을 막는 웹 경험, 과도한 수작업, 활용되지 않는 데이터, 단절된 도구, 불명확한 포지셔닝, 실질적으로 유용한 AI 시스템이 필요한 경우 등이 해당합니다." },
        { question: "문의 전에 무엇을 준비하면 되나요?", answer: "많지 않아도 됩니다. 목표, 핵심 문제, 약간의 배경, 있다면 관련 수치나 사용 중인 도구면 충분합니다. 완성된 요구사항 문서는 필요 없으며, 올바른 범위를 정의하는 것 자체가 업무의 일부가 될 수 있습니다." },
      ]},
      { label: "일하는 방식", items: [
        { question: "프로젝트 일부만 또는 전체를 맡길 수 있나요?", answer: "둘 다 가능합니다. 감사, 전략, 획득, 자동화, UX, 아키텍처, AI 에이전트처럼 한 부분에 집중할 수도 있고 더 넓은 실행 전체를 이끌 수도 있습니다. 개입 범위는 고정 패키지가 아니라 문제에 맞춰 정합니다." },
        { question: "전략, 웹, AI, 획득은 어떻게 다른가요?", answer: "네 개의 별도 상품이 아니라 네 가지 레버입니다. 전략은 방향과 우선순위를 선명하게 하고, 웹은 경험과 전환을 설계하며, AI와 자동화는 운영 마찰을 줄이고, 획득은 수요를 만들고 최적화합니다. 하나만 필요할 수도, 여러 개가 함께 필요할 수도 있습니다." },
        { question: "이미 진행 중이거나 꼬인 프로젝트도 인수할 수 있나요?", answer: "네. 기존 상태를 감사하고, 여전히 작동하는 것은 유지하며, 마찰 원인을 분리해 전체 재구축 대신 필요한 부분만 복구할 수 있습니다. 기존 시스템 일부를 남기는 편이 더 합리적이라면 그렇게 권합니다." },
      ]},
      { label: "예산과 일정", items: [
        { question: "프로젝트는 어떤 순서로 진행되나요?", answer: "문제 이해, 목표 정의, 레버 선택, 산출물 확정, 실행, 영향 확인의 순서로 진행합니다. 프로젝트에 따라 감사와 실행 계획, 집중 스프린트, 중간 검증이 포함된 전체 구축 형태가 될 수 있습니다." },
        { question: "보통 얼마나 걸리나요?", answer: "복잡도, 의존성, 의사결정 속도에 따라 달라집니다. 며칠 안에 끝나는 집중 작업도 있고, 더 큰 시스템은 몇 주가 필요합니다. 문제를 보기 전에 빠르다고 약속하기보다 범위를 잡은 뒤 현실적인 일정을 제시합니다." },
        { question: "비용은 어떻게 책정되나요?", answer: "단일 요금은 없습니다. 감사, 획득, 웹사이트, 자동화, AI 에이전트는 범위와 리스크가 다릅니다. 문제, 산출물, 참여 수준, 일정에 따라 가격을 정하며 필요하지 않은 요소에 비용을 지불하지 않도록 범위를 설계합니다." },
      ]},
      { label: "협업과 범위", items: [
        { question: "혼자 일하나요, 다른 전문가와도 협업하나요?", answer: "저는 계속 주요 연락 창구로 남고 프로젝트의 일관성을 유지합니다. 매우 전문적인 역량이 필요하면 해당 분야 전문가와 협업할 수 있습니다. 팀을 크게 보이게 하는 것이 아니라 꼭 필요한 역량만 모으는 것이 목적입니다." },
        { question: "원격으로만 일하나요? 지역 제한이 있나요?", answer: "여러 시장의 고객과 팀과 원격으로 협업할 수 있습니다. 소통, 검증, 납품은 상시 현장 근무에 의존하지 않도록 구성합니다. 현지 맥락이 중요하면 프로젝트 범위, 메시지, 의사결정에 반영합니다." },
        { question: "결국 제게 당신의 서비스가 필요하지 않다면요?", answer: "그대로 말씀드립니다. 첫 대화의 목적은 모든 문제를 제 서비스에 끼워 넣는 것이 아닙니다. 아무것도 만들지 않는 것, 내부 문제를 먼저 고치는 것, 기존 솔루션을 유지하는 것, 다른 전문가를 찾는 것이 맞다면 그렇게 권합니다." },
      ]},
    ],
    ctaEyebrow: "여기에 없는 질문이 있나요?", ctaHeadline: "서비스명이 아니라 문제를 말해 주세요.", ctaText: "몇 줄이면 충분합니다. 제가 도움이 될 수 있는지, 다음으로 무엇을 하는 것이 합리적인지 빠르게 말씀드리겠습니다.", cta: "프로젝트 이야기하기 ↗", seoTitle: "FAQ", seoDescription: "Gary WILFRED-BORILLA와의 협업에 관한 자주 묻는 질문: 프로젝트, 프로세스, 전략, 웹, AI, 획득, 예산, 일정, 협업.",
  },
};

export const getFaqCopy = (locale: Locale): FaqCopy => faq[locale] ?? faq.fr;
