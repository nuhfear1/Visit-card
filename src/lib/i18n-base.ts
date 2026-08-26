export type Locale = "fr" | "en" | "es" | "pt" | "ar" | "ja" | "zh" | "ko";

export const localizedLocales: Locale[] = ["en", "es", "pt", "ar", "ja", "zh", "ko"];
export const allLocales: Locale[] = ["fr", ...localizedLocales];

export const localeOptions: { code: Locale; label: string }[] = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "es", label: "Español (Latam)" },
  { code: "pt", label: "Português" },
  { code: "ar", label: "العربية" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
];

export const isLocale = (value: string): value is Locale => allLocales.includes(value as Locale);

export const getLocaleFromPathname = (pathname: string): Locale => {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) && first !== "fr" ? first : "fr";
};

export const stripLocaleFromPathname = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && localizedLocales.includes(parts[0] as Locale)) parts.shift();
  return parts.length ? `/${parts.join("/")}` : "/";
};

export const localizedPath = (locale: Locale, pathname: string) => {
  const base = stripLocaleFromPathname(pathname);
  if (locale === "fr") return base;
  return base === "/" ? `/${locale}` : `/${locale}${base}`;
};

type ServiceCopy = {
  title: string;
  signal: string;
  text: string;
  outcome: string;
};

type ProjectCopy = {
  title: string;
  tags: string;
  facts: [string, string][];
};

export type SiteCopy = {
  nav: {
    home: string;
    services: string;
    projects: string;
    contact: string;
    homeDesc: string;
    servicesDesc: string;
    projectsDesc: string;
    contactDesc: string;
    mobileEyebrow: string;
    mobileIntro: string;
    available: string;
    language: string;
  };
  hero: {
    available: string;
    intro: string;
    cta: string;
    lead: string;
    phrases: string[];
    stats: [string, string][];
    marquee: string[];
  };
  servicesPage: {
    pageLabel: string;
    eyebrow: string;
    headline: [string, string, string];
    intro: string;
    activateWhen: string;
    outcomeLabel: string;
    services: ServiceCopy[];
    ctaEyebrow: string;
    ctaHeadline: string;
    ctaText: string;
    cta: string;
  };
  projectsPage: {
    eyebrow: string;
    headline: string;
    intro: string;
    situation: string;
    projects: ProjectCopy[];
    ctaEyebrow: string;
    ctaHeadline: string;
    ctaText: string;
    cta: string;
  };
  contactPage: {
    eyebrow: string;
    headline: [string, string];
    intro: string;
    email: string;
    phone: string;
    whatsapp: string;
  };
};

const fr: SiteCopy = {
  nav: {
    home: "Accueil", services: "Services", projects: "Projets", contact: "Parler du projet",
    homeDesc: "Partir du problème", servicesDesc: "Choisir le bon levier", projectsDesc: "Voir les preuves", contactDesc: "Me dire ce qui bloque",
    mobileEyebrow: "OÙ EN ÊTES-VOUS ?", mobileIntro: "Comprendre. Choisir. Vérifier. Puis parler du projet.", available: "Disponible pour de nouveaux projets", language: "Langue",
  },
  hero: {
    available: "DISPONIBLE POUR DE NOUVEAUX PROJETS",
    intro: "Pas besoin d’avoir déjà choisi la solution. Dites-moi ce qui bloque et où vous voulez aller. J’identifie le levier utile — stratégie, IA, web ou acquisition.",
    cta: "ME DIRE CE QUI BLOQUE ↗", lead: "LE PROBLÈME D’ABORD.",
    phrases: ["ACQUISITION QUI PLAFONNE", "TÂCHES TROP MANUELLES", "SITE QUI NE CONVERTIT PAS", "OUTILS DÉCONNECTÉS"],
    stats: [["8+", "ANNÉES D’EXPÉRIENCE"], ["150+", "PROJETS & MISSIONS"], ["96 %", "SATISFACTION CLIENT"], ["21 JOURS", "DÉLAI MOYEN DE LIVRAISON"]],
    marquee: ["STRATÉGIE QUAND LA DIRECTION MANQUE", "IA QUAND LE MANUEL PREND TROP DE TEMPS", "WEB QUAND L’EXPÉRIENCE FREINE", "ACQUISITION QUAND LA CROISSANCE PLAFONNE"],
  },
  servicesPage: {
    pageLabel: "SERVICES", eyebrow: "Avant de choisir un service, il faut savoir ce qui freine le projet.", headline: ["VOIR CLAIR.", "CHOISIR JUSTE.", "AGIR."],
    intro: "Un projet n’a pas besoin de tout. Parfois un seul levier suffit. Parfois plusieurs doivent travailler ensemble. Le point de départ reste le même : identifier ce qui bloque vraiment avant de décider quoi activer.",
    activateWhen: "À ACTIVER QUAND", outcomeLabel: "CE QUE ÇA DÉBLOQUE",
    services: [
      { title: "STRATÉGIE & CROISSANCE", signal: "Les idées s’accumulent, les priorités bougent et il devient difficile de savoir quoi traiter en premier.", text: "Je clarifie le problème, les objectifs et les leviers réellement utiles : positionnement, acquisition, conversion, arbitrages et feuille de route.", outcome: "Une direction claire et des décisions qui peuvent être exécutées." },
      { title: "AGENTS IA & AUTOMATISATION", signal: "Des messages, relances, saisies ou tâches répétitives consomment encore du temps humain chaque semaine.", text: "Je transforme ces flux en systèmes capables d’agir : agents IA, assistants métier, automatisations et intégrations avec vos outils existants.", outcome: "Moins d’exécution manuelle, moins d’oubli et plus de temps pour les tâches qui demandent réellement un humain." },
      { title: "WEB & EXPÉRIENCES DIGITALES", signal: "Le site existe, mais il explique mal, oriente peu ou laisse trop de visiteurs sans comprendre quoi faire ensuite.", text: "Je retravaille l’architecture, l’expérience, les messages et les parcours pour rendre l’offre plus évidente et l’action plus naturelle.", outcome: "Une expérience plus claire, plus crédible et mieux orientée vers la conversion." },
      { title: "MARKETING DIGITAL & COMMUNICATION", signal: "Vous investissez pour être visible ou acquérir, mais la croissance plafonne, les campagnes manquent de précision ou le message se dilue.", text: "J’interviens sur le SEA, les Social Ads, les campagnes, le copywriting, l’emailing et le contenu en fonction de l’objectif à atteindre.", outcome: "Des actions mieux ciblées, pilotées par les bons indicateurs et reliées à un objectif business clair." },
    ],
    ctaEyebrow: "VOUS N’AVEZ PAS À CHOISIR LE SERVICE.", ctaHeadline: "DITES-MOI CE QUI BLOQUE. JE VOUS DIRAI OÙ INTERVENIR.", ctaText: "Un problème, un objectif, quelques éléments de contexte suffisent pour commencer.", cta: "ME DIRE CE QUI BLOQUE ↗",
  },
  projectsPage: {
    eyebrow: "PROJETS / PREUVES", headline: "UN PROJET BLOQUÉ N’A PAS BESOIN D’UNE LISTE DE SERVICES. IL A BESOIN DU BON LEVIER.", intro: "Acquisition, expérience web, data, automatisation, IA : voici six situations où le travail a commencé par le problème — pas par une solution à vendre.", situation: "SITUATION",
    projects: [
      { title: "CABINET MÉDICAL INTELLIGENT", tags: "WEB · EXPÉRIENCE DIGITALE · IA", facts: [["ENJEU", "Des patients qui doivent comprendre rapidement où consulter, quoi préparer et comment avancer sans friction."], ["MISSION", "Concevoir une expérience digitale claire pour deux cabinets de cardiologie."], ["MISE EN PLACE", "Architecture, parcours patient, conception web et fonctionnalités intelligentes autour des besoins réels du cabinet."], ["IMPACT", "Une présence digitale plus claire, plus crédible et plus simple à utiliser avant même la consultation."], ["POUR QUI", "Cabinet de cardiologie."]] },
      { title: "CLUB DE FOOTBALL", tags: "MARKETING · COMMUNICATION · DÉVELOPPEMENT", facts: [["ENJEU", "Faire émerger une marque sportive dans un marché en expansion sans diluer son identité."], ["MISSION", "Soutenir la visibilité et la communication autour du développement de PSG Academy USA."], ["MISE EN PLACE", "Communication autour du réseau, de la PSG US Development Academy et des Pro Summer Camps."], ["IMPACT", "Une présence de marque portée par l’expansion du réseau américain et des programmes à dimension internationale."], ["POUR QUI", "PSG Academy USA."]] },
      { title: "AGENCE IMMOBILIÈRE", tags: "MARKETING DIGITAL · ACQUISITION · CONTENU", facts: [["ENJEU", "Être visible ne suffit pas si la présence digitale ne transforme pas l’attention en demandes qualifiées."], ["MISSION", "Développer la visibilité et l’acquisition d’une agence immobilière."], ["MISE EN PLACE", "Contenus, landing pages, stratégie éditoriale, réseaux sociaux, analyse des recherches et tracking."], ["IMPACT", "Un dispositif digital structuré pour mieux capter la demande, suivre la performance et générer des leads qualifiés."], ["POUR QUI", "Egila, agence immobilière."]] },
      { title: "GRANDE DISTRIBUTION", tags: "DATA · AUTOMATISATION · SEGMENTATION", facts: [["ENJEU", "Une base clients devient vite inutilisable quand les doublons, les données manquantes et les segments flous s’accumulent."], ["MISSION", "Transformer un fichier clients en outil commercial exploitable."], ["MISE EN PLACE", "Nettoyage, classement, formulaire relié au fichier, tableau de suivi et segmentation par ville, profil ou type de client."], ["IMPACT", "Une base structurée et prête pour des campagnes WhatsApp ou email plus ciblées, avec moins de temps perdu à retraiter les données."], ["POUR QUI", "Promocash."]] },
      { title: "AGENCE DE MARKETING DIGITAL", tags: "SEA · SOCIAL ADS · PERFORMANCE", facts: [["ENJEU", "Quand les budgets montent, chaque décision doit être lisible dans les chiffres : coût, qualité du trafic et rentabilité."], ["MISSION", "Piloter et optimiser des campagnes d’acquisition sur un portefeuille multilingue."], ["MISE EN PLACE", "SEA, Social Ads, A/B tests, gestion des CPC et budgets, Quality Score, tracking, analyse des recherches et reporting."], ["IMPACT", "Une expérience menée sur plus de 100 comptes multilingues avec suivi continu des ROI, CA et CPA."], ["POUR QUI", "Yateo, agence partenaire en croissance digitale."]] },
      { title: "AGENTS & MODÈLES IA", tags: "IA · AUTOMATISATION · OPÉRATIONS", facts: [["ENJEU", "Les messages, relances et tâches répétitives finissent par coûter du temps, de l’attention et des opportunités."], ["MISSION", "Concevoir des agents et automatisations capables de prendre en charge une partie de cette exécution."], ["MISE EN PLACE", "Connexions à WhatsApp, Instagram, email, Shopify, Klaviyo, Brevo, n8n et WooCommerce."], ["IMPACT", "94 % des messages traités sans intervention et plus de 12 000 conversations prises en charge chaque mois."], ["POUR QUI", "Dayloom."]] },
    ],
    ctaEyebrow: "VOUS RECONNAISSEZ UN DE CES PROBLÈMES ?", ctaHeadline: "PARLEZ-MOI DU VÔTRE.", ctaText: "Pas besoin d’avoir déjà choisi la solution. Expliquez-moi ce qui bloque, ce que vous voulez obtenir et ce que vous avez déjà essayé.", cta: "PARLER DE MON PROJET ↗",
  },
  contactPage: { eyebrow: "CONTACT / VOTRE PROJET", headline: ["PARLEZ-MOI", "DU PROBLÈME."], intro: "Vous n’avez pas besoin d’avoir déjà défini la solution. Dites-moi simplement ce que vous cherchez à faire, ce qui bloque et où vous voulez arriver.", email: "EMAIL", phone: "TÉLÉPHONE", whatsapp: "WHATSAPP" },
};

const en: SiteCopy = {
  nav: { home: "Home", services: "Services", projects: "Projects", contact: "Talk about your project", homeDesc: "Start with the problem", servicesDesc: "Choose the right lever", projectsDesc: "See the proof", contactDesc: "Tell me what’s stuck", mobileEyebrow: "WHERE ARE YOU NOW?", mobileIntro: "Understand. Choose. Verify. Then talk about the project.", available: "Available for new projects", language: "Language" },
  hero: {
    available: "AVAILABLE FOR NEW PROJECTS",
    intro: "You don’t need to know the solution yet. Tell me what’s getting in the way and where you need to go. I’ll identify the lever that matters — strategy, AI, web, or acquisition.",
    cta: "TELL ME WHAT’S STUCK ↗", lead: "THE PROBLEM COMES FIRST.",
    phrases: ["GROWTH HAS STALLED", "TOO MUCH MANUAL WORK", "A SITE THAT DOESN’T CONVERT", "TOOLS THAT DON’T TALK"],
    stats: [["8+", "YEARS OF EXPERIENCE"], ["150+", "PROJECTS & ENGAGEMENTS"], ["96%", "CLIENT SATISFACTION"], ["21 DAYS", "AVG. DELIVERY TIME"]],
    marquee: ["STRATEGY WHEN DIRECTION IS MISSING", "AI WHEN MANUAL WORK EATS THE DAY", "WEB WHEN THE EXPERIENCE GETS IN THE WAY", "ACQUISITION WHEN GROWTH STALLS"],
  },
  servicesPage: {
    pageLabel: "SERVICES", eyebrow: "Before choosing a service, find what is actually slowing the project down.", headline: ["SEE CLEARLY.", "CHOOSE WELL.", "MOVE."],
    intro: "A project rarely needs everything. Sometimes one lever is enough. Sometimes several need to work together. The starting point is always the same: find the real bottleneck before deciding what to activate.", activateWhen: "USE THIS WHEN", outcomeLabel: "WHAT IT UNLOCKS",
    services: [
      { title: "STRATEGY & GROWTH", signal: "Ideas keep piling up, priorities keep shifting, and it’s hard to know what deserves attention first.", text: "I clarify the problem, the outcome, and the levers that can actually move it: positioning, acquisition, conversion, trade-offs, and roadmap.", outcome: "A clear direction and decisions your team can execute." },
      { title: "AI AGENTS & AUTOMATION", signal: "Messages, follow-ups, data entry, or repetitive tasks still consume human time every week.", text: "I turn those workflows into systems that can act: AI agents, business assistants, automations, and integrations with the tools you already use.", outcome: "Less manual execution, fewer dropped tasks, and more time for work that genuinely needs a person." },
      { title: "WEB & DIGITAL EXPERIENCES", signal: "The site is live, but it doesn’t explain enough, guide enough, or make the next step obvious.", text: "I reshape the architecture, experience, messaging, and journeys so the offer is easier to understand and action feels natural.", outcome: "A clearer, more credible experience built to move people toward conversion." },
      { title: "DIGITAL MARKETING & COMMUNICATION", signal: "You’re investing in visibility or acquisition, but growth has stalled, campaigns lack precision, or the message gets diluted.", text: "I work across paid search, Social Ads, campaigns, copywriting, email, and content based on the outcome that matters.", outcome: "Sharper actions, better measurement, and marketing tied to a clear business objective." },
    ],
    ctaEyebrow: "YOU DON’T HAVE TO PICK THE SERVICE.", ctaHeadline: "TELL ME WHAT’S STUCK. I’LL TELL YOU WHERE TO INTERVENE.", ctaText: "A problem, an objective, and a little context are enough to start.", cta: "TELL ME WHAT’S STUCK ↗",
  },
  projectsPage: {
    eyebrow: "PROJECTS / PROOF", headline: "A STUCK PROJECT DOESN’T NEED A MENU OF SERVICES. IT NEEDS THE RIGHT LEVER.", intro: "Acquisition, web experience, data, automation, AI: six situations where the work started with the problem — not with a solution to sell.", situation: "SITUATION",
    projects: [
      { title: "SMART MEDICAL PRACTICE", tags: "WEB · DIGITAL EXPERIENCE · AI", facts: [["CHALLENGE", "Patients need to understand where to go, what to prepare, and what happens next — quickly and without friction."], ["MISSION", "Design a clear digital experience for two cardiology practices."], ["BUILD", "Information architecture, patient journeys, web design, and intelligent features shaped around real practice needs."], ["IMPACT", "A clearer, more credible digital presence that is easier to use before the appointment even begins."], ["FOR", "Cardiology practice."]] },
      { title: "FOOTBALL CLUB", tags: "MARKETING · COMMUNICATION · GROWTH", facts: [["CHALLENGE", "Grow a sports brand in an expanding market without watering down what makes it recognizable."], ["MISSION", "Support visibility and communication around the growth of PSG Academy USA."], ["BUILD", "Communication around the network, the PSG US Development Academy, and Pro Summer Camps."], ["IMPACT", "A brand presence strengthened by the growth of the U.S. network and internationally oriented programs."], ["FOR", "PSG Academy USA."]] },
      { title: "REAL ESTATE AGENCY", tags: "DIGITAL MARKETING · ACQUISITION · CONTENT", facts: [["CHALLENGE", "Visibility means little if digital attention never turns into qualified inquiries."], ["MISSION", "Grow visibility and acquisition for a real estate agency."], ["BUILD", "Content, landing pages, editorial strategy, social media, search analysis, and tracking."], ["IMPACT", "A structured digital setup designed to capture demand, measure performance, and generate qualified leads."], ["FOR", "Egila, real estate agency."]] },
      { title: "WHOLESALE RETAIL", tags: "DATA · AUTOMATION · SEGMENTATION", facts: [["CHALLENGE", "A customer database becomes unusable fast when duplicates, missing data, and vague segments pile up."], ["MISSION", "Turn a customer file into a usable commercial tool."], ["BUILD", "Cleanup, classification, connected form, monitoring dashboard, and segmentation by city, profile, or customer type."], ["IMPACT", "A structured database ready for more targeted WhatsApp or email campaigns, with less time lost reworking data."], ["FOR", "Promocash."]] },
      { title: "DIGITAL MARKETING AGENCY", tags: "PAID SEARCH · SOCIAL ADS · PERFORMANCE", facts: [["CHALLENGE", "As budgets grow, every decision needs to show up in the numbers: cost, traffic quality, and profitability."], ["MISSION", "Manage and optimize acquisition campaigns across a multilingual portfolio."], ["BUILD", "Paid search, Social Ads, A/B testing, CPC and budget management, Quality Score, tracking, search analysis, and reporting."], ["IMPACT", "Hands-on work across 100+ multilingual accounts with ongoing ROI, revenue, and CPA monitoring."], ["FOR", "Yateo, digital growth agency."]] },
      { title: "AI AGENTS & MODELS", tags: "AI · AUTOMATION · OPERATIONS", facts: [["CHALLENGE", "Messages, follow-ups, and repetitive tasks quietly drain time, attention, and opportunities."], ["MISSION", "Design agents and automations that can take over part of that execution."], ["BUILD", "Connections to WhatsApp, Instagram, email, Shopify, Klaviyo, Brevo, n8n, and WooCommerce."], ["IMPACT", "94% of messages handled without intervention and 12,000+ conversations managed every month."], ["FOR", "Dayloom."]] },
    ],
    ctaEyebrow: "RECOGNIZE ONE OF THESE PROBLEMS?", ctaHeadline: "TELL ME ABOUT YOURS.", ctaText: "You don’t need to know the solution yet. Tell me what’s stuck, what you need to achieve, and what you’ve already tried.", cta: "TALK ABOUT MY PROJECT ↗",
  },
  contactPage: { eyebrow: "CONTACT / YOUR PROJECT", headline: ["TELL ME", "WHAT’S STUCK."], intro: "You don’t need to arrive with the solution figured out. Tell me what you’re trying to achieve, what’s in the way, and where you need to get.", email: "EMAIL", phone: "PHONE", whatsapp: "WHATSAPP" },
};

const es: SiteCopy = {
  nav: { home: "Inicio", services: "Servicios", projects: "Proyectos", contact: "Hablemos del proyecto", homeDesc: "Empezar por el problema", servicesDesc: "Elegir la palanca correcta", projectsDesc: "Ver las pruebas", contactDesc: "Contarme qué está frenando", mobileEyebrow: "¿EN QUÉ PUNTO ESTÁS?", mobileIntro: "Entender. Elegir. Comprobar. Y después, hablar del proyecto.", available: "Disponible para nuevos proyectos", language: "Idioma" },
  hero: {
    available: "DISPONIBLE PARA NUEVOS PROYECTOS", intro: "No necesitas llegar con la solución definida. Cuéntame qué está frenando el proyecto y adónde quieres llegar. Yo identifico la palanca que realmente hace falta: estrategia, IA, web o adquisición.", cta: "CUÉNTAME QUÉ TE FRENA ↗", lead: "PRIMERO, EL PROBLEMA.",
    phrases: ["LA ADQUISICIÓN SE ESTANCÓ", "DEMASIADO TRABAJO MANUAL", "UN SITIO QUE NO CONVIERTE", "HERRAMIENTAS DESCONECTADAS"],
    stats: [["8+", "AÑOS DE EXPERIENCIA"], ["150+", "PROYECTOS Y MISIONES"], ["96 %", "SATISFACCIÓN DE CLIENTES"], ["21 DÍAS", "PLAZO PROMEDIO DE ENTREGA"]],
    marquee: ["ESTRATEGIA CUANDO FALTA DIRECCIÓN", "IA CUANDO LO MANUAL ROBA DEMASIADO TIEMPO", "WEB CUANDO LA EXPERIENCIA FRENA", "ADQUISICIÓN CUANDO EL CRECIMIENTO SE ESTANCA"],
  },
  servicesPage: {
    pageLabel: "SERVICIOS", eyebrow: "Antes de elegir un servicio, hay que entender qué está frenando realmente el proyecto.", headline: ["VER CLARO.", "ELEGIR BIEN.", "ACTUAR."], intro: "Un proyecto no necesita todo. A veces basta una sola palanca; otras veces hay que combinar varias. El punto de partida es el mismo: detectar el verdadero bloqueo antes de decidir qué activar.", activateWhen: "ACTIVAR CUANDO", outcomeLabel: "LO QUE DESBLOQUEA",
    services: [
      { title: "ESTRATEGIA Y CRECIMIENTO", signal: "Se acumulan ideas, cambian las prioridades y cada vez cuesta más decidir qué mover primero.", text: "Aclaro el problema, el objetivo y las palancas que sí pueden generar movimiento: posicionamiento, adquisición, conversión, prioridades y hoja de ruta.", outcome: "Una dirección clara y decisiones que se pueden ejecutar." },
      { title: "AGENTES IA Y AUTOMATIZACIÓN", signal: "Mensajes, seguimientos, carga de datos o tareas repetitivas siguen consumiendo horas humanas cada semana.", text: "Convierto esos flujos en sistemas capaces de actuar: agentes IA, asistentes de negocio, automatizaciones e integraciones con las herramientas que ya usas.", outcome: "Menos trabajo manual, menos olvidos y más tiempo para lo que sí necesita criterio humano." },
      { title: "WEB Y EXPERIENCIAS DIGITALES", signal: "El sitio existe, pero no explica bien, no guía lo suficiente o deja a demasiadas personas sin saber cuál es el siguiente paso.", text: "Trabajo la arquitectura, la experiencia, los mensajes y los recorridos para que la propuesta se entienda mejor y avanzar resulte natural.", outcome: "Una experiencia más clara, más creíble y mejor orientada a convertir." },
      { title: "MARKETING DIGITAL Y COMUNICACIÓN", signal: "Estás invirtiendo en visibilidad o adquisición, pero el crecimiento se frena, las campañas pierden precisión o el mensaje se diluye.", text: "Intervengo en SEA, Social Ads, campañas, copywriting, email y contenido según el objetivo que haya que mover.", outcome: "Acciones más precisas, mejores indicadores y marketing conectado a un objetivo de negocio claro." },
    ],
    ctaEyebrow: "NO TIENES QUE ELEGIR EL SERVICIO.", ctaHeadline: "CUÉNTAME QUÉ ESTÁ FRENANDO EL PROYECTO. YO TE DIRÉ DÓNDE INTERVENIR.", ctaText: "Un problema, un objetivo y un poco de contexto son suficientes para empezar.", cta: "CUÉNTAME QUÉ TE FRENA ↗",
  },
  projectsPage: {
    eyebrow: "PROYECTOS / PRUEBAS", headline: "UN PROYECTO BLOQUEADO NO NECESITA UN CATÁLOGO DE SERVICIOS. NECESITA LA PALANCA CORRECTA.", intro: "Adquisición, experiencia web, datos, automatización, IA: seis situaciones donde el trabajo empezó por el problema, no por una solución que vender.", situation: "SITUACIÓN",
    projects: [
      { title: "CONSULTORIO MÉDICO INTELIGENTE", tags: "WEB · EXPERIENCIA DIGITAL · IA", facts: [["RETO", "Pacientes que necesitan entender rápido dónde atenderse, qué preparar y cómo avanzar sin fricción."], ["MISIÓN", "Diseñar una experiencia digital clara para dos consultorios de cardiología."], ["IMPLEMENTACIÓN", "Arquitectura, recorrido del paciente, diseño web y funciones inteligentes alineadas con las necesidades reales del consultorio."], ["IMPACTO", "Una presencia digital más clara, más confiable y más fácil de usar incluso antes de la consulta."], ["PARA", "Consultorio de cardiología."]] },
      { title: "CLUB DE FÚTBOL", tags: "MARKETING · COMUNICACIÓN · DESARROLLO", facts: [["RETO", "Hacer crecer una marca deportiva en un mercado en expansión sin diluir su identidad."], ["MISIÓN", "Apoyar la visibilidad y la comunicación del desarrollo de PSG Academy USA."], ["IMPLEMENTACIÓN", "Comunicación alrededor de la red, PSG US Development Academy y Pro Summer Camps."], ["IMPACTO", "Una presencia de marca impulsada por la expansión de la red en Estados Unidos y programas de alcance internacional."], ["PARA", "PSG Academy USA."]] },
      { title: "AGENCIA INMOBILIARIA", tags: "MARKETING DIGITAL · ADQUISICIÓN · CONTENIDO", facts: [["RETO", "Tener visibilidad no alcanza si la atención digital no termina en consultas calificadas."], ["MISIÓN", "Desarrollar la visibilidad y la adquisición de una agencia inmobiliaria."], ["IMPLEMENTACIÓN", "Contenido, landing pages, estrategia editorial, redes sociales, análisis de búsquedas y tracking."], ["IMPACTO", "Un sistema digital estructurado para captar mejor la demanda, medir rendimiento y generar leads calificados."], ["PARA", "Egila, agencia inmobiliaria."]] },
      { title: "GRAN DISTRIBUCIÓN", tags: "DATOS · AUTOMATIZACIÓN · SEGMENTACIÓN", facts: [["RETO", "Una base de clientes pierde valor rápido cuando se acumulan duplicados, datos incompletos y segmentos poco claros."], ["MISIÓN", "Convertir un archivo de clientes en una herramienta comercial utilizable."], ["IMPLEMENTACIÓN", "Limpieza, clasificación, formulario conectado, tablero de seguimiento y segmentación por ciudad, perfil o tipo de cliente."], ["IMPACTO", "Una base estructurada y lista para campañas de WhatsApp o email más precisas, con menos tiempo perdido reprocesando datos."], ["PARA", "Promocash."]] },
      { title: "AGENCIA DE MARKETING DIGITAL", tags: "SEA · SOCIAL ADS · PERFORMANCE", facts: [["RETO", "Cuando suben los presupuestos, cada decisión tiene que verse en los números: costo, calidad del tráfico y rentabilidad."], ["MISIÓN", "Gestionar y optimizar campañas de adquisición en un portafolio multilingüe."], ["IMPLEMENTACIÓN", "SEA, Social Ads, A/B tests, gestión de CPC y presupuestos, Quality Score, tracking, análisis de búsquedas y reporting."], ["IMPACTO", "Experiencia sobre más de 100 cuentas multilingües con seguimiento continuo de ROI, facturación y CPA."], ["PARA", "Yateo, agencia de crecimiento digital."]] },
      { title: "AGENTES Y MODELOS IA", tags: "IA · AUTOMATIZACIÓN · OPERACIONES", facts: [["RETO", "Mensajes, seguimientos y tareas repetitivas terminan consumiendo tiempo, atención y oportunidades."], ["MISIÓN", "Diseñar agentes y automatizaciones capaces de asumir una parte de esa ejecución."], ["IMPLEMENTACIÓN", "Conexiones con WhatsApp, Instagram, email, Shopify, Klaviyo, Brevo, n8n y WooCommerce."], ["IMPACTO", "94 % de los mensajes gestionados sin intervención y más de 12.000 conversaciones atendidas cada mes."], ["PARA", "Dayloom."]] },
    ],
    ctaEyebrow: "¿TE SUENA ALGUNO DE ESTOS PROBLEMAS?", ctaHeadline: "CUÉNTAME EL TUYO.", ctaText: "No necesitas tener la solución definida. Cuéntame qué está frenando el proyecto, qué quieres conseguir y qué ya intentaste.", cta: "HABLAR DE MI PROYECTO ↗",
  },
  contactPage: { eyebrow: "CONTACTO / TU PROYECTO", headline: ["CUÉNTAME", "QUÉ ESTÁ FRENANDO."], intro: "No necesitas llegar con la solución definida. Cuéntame qué quieres lograr, qué está bloqueando el avance y adónde necesitas llegar.", email: "EMAIL", phone: "TELÉFONO", whatsapp: "WHATSAPP" },
};

const pt: SiteCopy = {
  nav: { home: "Início", services: "Serviços", projects: "Projetos", contact: "Falar sobre o projeto", homeDesc: "Começar pelo problema", servicesDesc: "Escolher a alavanca certa", projectsDesc: "Ver as provas", contactDesc: "Me contar o que está travando", mobileEyebrow: "EM QUE PONTO VOCÊ ESTÁ?", mobileIntro: "Entender. Escolher. Validar. Depois, falar do projeto.", available: "Disponível para novos projetos", language: "Idioma" },
  hero: {
    available: "DISPONÍVEL PARA NOVOS PROJETOS",
    intro: "Você não precisa chegar com a solução pronta. Me conte o que está travando o projeto e onde quer chegar. Eu identifico a alavanca que realmente faz sentido — estratégia, IA, web ou aquisição.",
    cta: "ME CONTE O QUE ESTÁ TRAVANDO ↗", lead: "PRIMEIRO, O PROBLEMA.",
    phrases: ["A AQUISIÇÃO PAROU DE CRESCER", "TRABALHO MANUAL DEMAIS", "UM SITE QUE NÃO CONVERTE", "FERRAMENTAS DESCONECTADAS"],
    stats: [["8+", "ANOS DE EXPERIÊNCIA"], ["150+", "PROJETOS & MISSÕES"], ["96%", "SATISFAÇÃO DOS CLIENTES"], ["21 DIAS", "PRAZO MÉDIO DE ENTREGA"]],
    marquee: ["ESTRATÉGIA QUANDO FALTA DIREÇÃO", "IA QUANDO O MANUAL CONSOME TEMPO DEMAIS", "WEB QUANDO A EXPERIÊNCIA ATRAPALHA", "AQUISIÇÃO QUANDO O CRESCIMENTO ESTAGNA"],
  },
  servicesPage: {
    pageLabel: "SERVIÇOS", eyebrow: "Antes de escolher um serviço, é preciso entender o que realmente está travando o projeto.", headline: ["VER COM CLAREZA.", "ESCOLHER CERTO.", "AGIR."],
    intro: "Um projeto não precisa de tudo. Às vezes, uma única alavanca resolve. Em outros casos, várias precisam trabalhar juntas. O ponto de partida é sempre o mesmo: encontrar o gargalo real antes de decidir o que ativar.", activateWhen: "ATIVAR QUANDO", outcomeLabel: "O QUE ISSO DESTRAVA",
    services: [
      { title: "ESTRATÉGIA & CRESCIMENTO", signal: "As ideias se acumulam, as prioridades mudam e fica cada vez mais difícil decidir o que deve vir primeiro.", text: "Eu organizo o problema, o objetivo e as alavancas que realmente podem gerar movimento: posicionamento, aquisição, conversão, prioridades e roadmap.", outcome: "Uma direção clara e decisões que podem ser executadas." },
      { title: "AGENTES DE IA & AUTOMAÇÃO", signal: "Mensagens, follow-ups, lançamentos de dados ou tarefas repetitivas ainda consomem horas humanas toda semana.", text: "Transformo esses fluxos em sistemas capazes de agir: agentes de IA, assistentes de negócio, automações e integrações com as ferramentas que você já usa.", outcome: "Menos trabalho manual, menos esquecimentos e mais tempo para o que realmente exige julgamento humano." },
      { title: "WEB & EXPERIÊNCIAS DIGITAIS", signal: "O site existe, mas explica pouco, orienta mal ou deixa gente demais sem saber qual é o próximo passo.", text: "Reestruturo arquitetura, experiência, mensagens e jornadas para deixar a proposta mais fácil de entender e a ação mais natural.", outcome: "Uma experiência mais clara, mais confiável e melhor orientada para conversão." },
      { title: "MARKETING DIGITAL & COMUNICAÇÃO", signal: "Você investe em visibilidade ou aquisição, mas o crescimento trava, as campanhas perdem precisão ou a mensagem se dilui.", text: "Atuo em SEA, Social Ads, campanhas, copywriting, e-mail e conteúdo de acordo com o resultado que precisa ser movido.", outcome: "Ações mais precisas, indicadores mais úteis e marketing conectado a um objetivo de negócio claro." },
    ],
    ctaEyebrow: "VOCÊ NÃO PRECISA ESCOLHER O SERVIÇO.", ctaHeadline: "ME CONTE O QUE ESTÁ TRAVANDO. EU TE DIGO ONDE INTERVIR.", ctaText: "Um problema, um objetivo e um pouco de contexto já são suficientes para começar.", cta: "ME CONTE O QUE ESTÁ TRAVANDO ↗",
  },
  projectsPage: {
    eyebrow: "PROJETOS / PROVAS", headline: "UM PROJETO TRAVADO NÃO PRECISA DE UM CATÁLOGO DE SERVIÇOS. PRECISA DA ALAVANCA CERTA.", intro: "Aquisição, experiência web, dados, automação, IA: seis situações em que o trabalho começou pelo problema — não por uma solução que precisava ser vendida.", situation: "SITUAÇÃO",
    projects: [
      { title: "CLÍNICA MÉDICA INTELIGENTE", tags: "WEB · EXPERIÊNCIA DIGITAL · IA", facts: [["DESAFIO", "Pacientes precisam entender rapidamente onde serão atendidos, o que preparar e qual é o próximo passo, sem atrito."], ["MISSÃO", "Criar uma experiência digital clara para duas clínicas de cardiologia."], ["IMPLEMENTAÇÃO", "Arquitetura de informação, jornada do paciente, design web e recursos inteligentes construídos em torno das necessidades reais da clínica."], ["IMPACTO", "Uma presença digital mais clara, mais confiável e mais simples de usar antes mesmo da consulta."], ["PARA QUEM", "Clínica de cardiologia."]] },
      { title: "CLUBE DE FUTEBOL", tags: "MARKETING · COMUNICAÇÃO · DESENVOLVIMENTO", facts: [["DESAFIO", "Fazer uma marca esportiva crescer em um mercado em expansão sem perder sua identidade."], ["MISSÃO", "Apoiar a visibilidade e a comunicação em torno do crescimento da PSG Academy USA."], ["IMPLEMENTAÇÃO", "Comunicação sobre a rede, a PSG US Development Academy e os Pro Summer Camps."], ["IMPACTO", "Uma presença de marca fortalecida pela expansão da rede nos Estados Unidos e por programas com alcance internacional."], ["PARA QUEM", "PSG Academy USA."]] },
      { title: "IMOBILIÁRIA", tags: "MARKETING DIGITAL · AQUISIÇÃO · CONTEÚDO", facts: [["DESAFIO", "Visibilidade sozinha não basta quando a atenção digital não vira contatos realmente qualificados."], ["MISSÃO", "Aumentar a visibilidade e a aquisição de uma imobiliária."], ["IMPLEMENTAÇÃO", "Conteúdo, landing pages, estratégia editorial, redes sociais, análise de buscas e tracking."], ["IMPACTO", "Uma estrutura digital pensada para captar melhor a demanda, medir performance e gerar leads qualificados."], ["PARA QUEM", "Egila, imobiliária."]] },
      { title: "ATACADO & DISTRIBUIÇÃO", tags: "DADOS · AUTOMAÇÃO · SEGMENTAÇÃO", facts: [["DESAFIO", "Uma base de clientes perde valor rápido quando duplicidades, dados faltantes e segmentos pouco claros começam a se acumular."], ["MISSÃO", "Transformar um arquivo de clientes em uma ferramenta comercial realmente utilizável."], ["IMPLEMENTAÇÃO", "Limpeza, classificação, formulário conectado, painel de acompanhamento e segmentação por cidade, perfil ou tipo de cliente."], ["IMPACTO", "Uma base estruturada e pronta para campanhas de WhatsApp ou e-mail mais direcionadas, com menos tempo perdido retrabalhando dados."], ["PARA QUEM", "Promocash."]] },
      { title: "AGÊNCIA DE MARKETING DIGITAL", tags: "SEA · SOCIAL ADS · PERFORMANCE", facts: [["DESAFIO", "Quando o orçamento cresce, cada decisão precisa aparecer nos números: custo, qualidade do tráfego e rentabilidade."], ["MISSÃO", "Gerenciar e otimizar campanhas de aquisição em um portfólio multilíngue."], ["IMPLEMENTAÇÃO", "SEA, Social Ads, testes A/B, gestão de CPC e orçamento, Quality Score, tracking, análise de buscas e reporting."], ["IMPACTO", "Experiência prática em mais de 100 contas multilíngues, com acompanhamento contínuo de ROI, faturamento e CPA."], ["PARA QUEM", "Yateo, agência de crescimento digital."]] },
      { title: "AGENTES & MODELOS DE IA", tags: "IA · AUTOMAÇÃO · OPERAÇÕES", facts: [["DESAFIO", "Mensagens, follow-ups e tarefas repetitivas acabam consumindo tempo, atenção e oportunidades."], ["MISSÃO", "Criar agentes e automações capazes de assumir parte dessa execução."], ["IMPLEMENTAÇÃO", "Integrações com WhatsApp, Instagram, e-mail, Shopify, Klaviyo, Brevo, n8n e WooCommerce."], ["IMPACTO", "94% das mensagens tratadas sem intervenção e mais de 12.000 conversas gerenciadas por mês."], ["PARA QUEM", "Dayloom."]] },
    ],
    ctaEyebrow: "ALGUM DESSES PROBLEMAS PARECE FAMILIAR?", ctaHeadline: "ME CONTE O SEU.", ctaText: "Você não precisa ter a solução pronta. Me conte o que está travando, o que quer alcançar e o que já tentou até aqui.", cta: "FALAR SOBRE MEU PROJETO ↗",
  },
  contactPage: { eyebrow: "CONTATO / SEU PROJETO", headline: ["ME CONTE", "O QUE ESTÁ TRAVANDO."], intro: "Você não precisa chegar com a solução definida. Me conte o que quer alcançar, o que está impedindo o avanço e onde precisa chegar.", email: "E-MAIL", phone: "TELEFONE", whatsapp: "WHATSAPP" },
};

const ar: SiteCopy = {
  nav: { home: "الرئيسية", services: "الخدمات", projects: "المشاريع", contact: "لنتحدث عن مشروعك", homeDesc: "نبدأ من المشكلة", servicesDesc: "نختار الرافعة المناسبة", projectsDesc: "نرى الدليل", contactDesc: "أخبرني بما يعيق المشروع", mobileEyebrow: "أين يقف مشروعك الآن؟", mobileIntro: "نفهم. نختار. نتحقق. ثم نبدأ الحديث عن المشروع.", available: "متاح لمشاريع جديدة", language: "اللغة" },
  hero: {
    available: "متاح لمشاريع جديدة", intro: "لا تحتاج إلى تحديد الحل مسبقاً. أخبرني بما يعيق المشروع والنتيجة التي تريد الوصول إليها، وسأحدد الرافعة الأنسب — الاستراتيجية أو الذكاء الاصطناعي أو الويب أو الاستحواذ.", cta: "أخبرني بما يعيق المشروع ↗", lead: "المشكلة أولاً.",
    phrases: ["النمو لا يتقدم", "الكثير من العمل اليدوي", "موقع لا يحقق التحويل", "أدوات لا تتكامل"],
    stats: [["8+", "سنوات من الخبرة"], ["150+", "مشروع ومهمة"], ["96%", "رضا العملاء"], ["21 يوماً", "متوسط مدة التسليم"]],
    marquee: ["استراتيجية عندما تغيب الوجهة", "ذكاء اصطناعي عندما يستهلك العمل اليدوي الوقت", "ويب عندما تعيق التجربة التحويل", "استحواذ عندما يتوقف النمو"],
  },
  servicesPage: {
    pageLabel: "الخدمات", eyebrow: "قبل اختيار الخدمة، يجب تحديد ما الذي يبطئ المشروع فعلاً.", headline: ["رؤية أوضح.", "اختيار أدق.", "تنفيذ."], intro: "المشروع لا يحتاج إلى كل شيء. أحياناً تكفي رافعة واحدة، وأحياناً يجب أن تعمل عدة روافع معاً. البداية واحدة دائماً: تحديد العائق الحقيقي قبل تقرير ما الذي ينبغي تفعيله.", activateWhen: "تُستخدم عندما", outcomeLabel: "ما الذي تفتحه",
    services: [
      { title: "الاستراتيجية والنمو", signal: "تتراكم الأفكار، وتتغير الأولويات، ويصبح من الصعب معرفة ما الذي يجب معالجته أولاً.", text: "أوضح المشكلة والهدف والروافع التي يمكن أن تحدث فرقاً فعلياً: التموضع، الاستحواذ، التحويل، المفاضلات وخارطة الطريق.", outcome: "اتجاه واضح وقرارات قابلة للتنفيذ." },
      { title: "وكلاء الذكاء الاصطناعي والأتمتة", signal: "الرسائل والمتابعات وإدخال البيانات والمهام المتكررة ما زالت تستهلك وقتاً بشرياً كل أسبوع.", text: "أحوّل هذه التدفقات إلى أنظمة قادرة على العمل: وكلاء ذكاء اصطناعي، مساعدين للأعمال، أتمتة وتكاملات مع أدواتكم الحالية.", outcome: "تنفيذ يدوي أقل، نسيان أقل، ووقت أكبر للمهام التي تحتاج فعلاً إلى حكم بشري." },
      { title: "الويب والتجارب الرقمية", signal: "الموقع موجود، لكنه لا يشرح بما يكفي، ولا يوجه الزائر جيداً، أو يترك الخطوة التالية غير واضحة.", text: "أعيد صياغة البنية والتجربة والرسائل ومسارات الاستخدام حتى يصبح العرض أوضح ويصبح اتخاذ الخطوة التالية أكثر طبيعية.", outcome: "تجربة أوضح وأكثر مصداقية ومصممة بصورة أفضل لدعم التحويل." },
      { title: "التسويق الرقمي والاتصال", signal: "تستثمرون في الظهور أو الاستحواذ، لكن النمو يتباطأ، أو الحملات تفتقد الدقة، أو الرسالة تفقد قوتها.", text: "أتدخل في البحث المدفوع وSocial Ads والحملات وكتابة المحتوى التسويقي والبريد والمحتوى وفقاً للنتيجة المطلوبة.", outcome: "إجراءات أدق، قياس أفضل، وتسويق مرتبط بهدف أعمال واضح." },
    ],
    ctaEyebrow: "لا تحتاج إلى اختيار الخدمة بنفسك.", ctaHeadline: "أخبرني بما يعيق المشروع، وسأحدد أين يجب التدخل.", ctaText: "مشكلة واضحة، هدف، وقليل من السياق تكفي لبدء الحديث.", cta: "أخبرني بما يعيق المشروع ↗",
  },
  projectsPage: {
    eyebrow: "مشاريع / أدلة", headline: "المشروع المتعثر لا يحتاج إلى قائمة خدمات. بل إلى الرافعة المناسبة.", intro: "الاستحواذ، تجربة الويب، البيانات، الأتمتة، الذكاء الاصطناعي: ست حالات بدأ فيها العمل من المشكلة نفسها، لا من حل نريد بيعه.", situation: "الحالة",
    projects: [
      { title: "عيادة طبية ذكية", tags: "ويب · تجربة رقمية · ذكاء اصطناعي", facts: [["التحدي", "يحتاج المرضى إلى فهم مكان الاستشارة وما يجب تحضيره والخطوة التالية بسرعة ومن دون احتكاك."], ["المهمة", "تصميم تجربة رقمية واضحة لعيادتي قلب."], ["التنفيذ", "بنية المعلومات، مسار المريض، تصميم الويب وخصائص ذكية مرتبطة بالاحتياجات الفعلية للعيادة."], ["الأثر", "حضور رقمي أوضح وأكثر مصداقية وأسهل استخداماً حتى قبل موعد الاستشارة."], ["لمن", "عيادة قلب."]] },
      { title: "نادي كرة قدم", tags: "تسويق · اتصال · نمو", facts: [["التحدي", "تنمية علامة رياضية داخل سوق متوسع من دون إضعاف هويتها."], ["المهمة", "دعم الظهور والاتصال المرتبطين بتوسع PSG Academy USA."], ["التنفيذ", "اتصال حول الشبكة وPSG US Development Academy وPro Summer Camps."], ["الأثر", "حضور أقوى للعلامة مدفوع بتوسع الشبكة الأمريكية وبرامج ذات بعد دولي."], ["لمن", "PSG Academy USA."]] },
      { title: "وكالة عقارية", tags: "تسويق رقمي · استحواذ · محتوى", facts: [["التحدي", "الظهور وحده لا يكفي إذا لم يتحول الاهتمام الرقمي إلى طلبات مؤهلة."], ["المهمة", "تطوير الظهور والاستحواذ لوكالة عقارية."], ["التنفيذ", "محتوى، صفحات هبوط، استراتيجية تحريرية، شبكات اجتماعية، تحليل البحث وتتبع الأداء."], ["الأثر", "منظومة رقمية منظمة لالتقاط الطلب بصورة أفضل وقياس الأداء وتوليد عملاء محتملين مؤهلين."], ["لمن", "Egila، وكالة عقارية."]] },
      { title: "التوزيع الكبير", tags: "بيانات · أتمتة · تجزئة", facts: [["التحدي", "تفقد قاعدة العملاء قيمتها بسرعة عندما تتراكم السجلات المكررة والبيانات الناقصة والتجزئة غير الواضحة."], ["المهمة", "تحويل ملف العملاء إلى أداة تجارية قابلة للاستخدام."], ["التنفيذ", "تنظيف وتصنيف ونموذج متصل ولوحة متابعة وتجزئة حسب المدينة أو الملف أو نوع العميل."], ["الأثر", "قاعدة منظمة وجاهزة لحملات WhatsApp أو البريد الأكثر استهدافاً، مع وقت أقل لإعادة معالجة البيانات."], ["لمن", "Promocash."]] },
      { title: "وكالة تسويق رقمي", tags: "بحث مدفوع · Social Ads · أداء", facts: [["التحدي", "كلما ارتفعت الميزانيات، يجب أن يظهر أثر كل قرار في الأرقام: التكلفة وجودة الزيارات والربحية."], ["المهمة", "إدارة وتحسين حملات استحواذ ضمن محفظة متعددة اللغات."], ["التنفيذ", "بحث مدفوع، Social Ads، اختبارات A/B، إدارة CPC والميزانيات، Quality Score، التتبع وتحليل البحث والتقارير."], ["الأثر", "خبرة عملية على أكثر من 100 حساب متعدد اللغات مع متابعة مستمرة للعائد والإيرادات وCPA."], ["لمن", "Yateo، وكالة نمو رقمي."]] },
      { title: "وكلاء ونماذج ذكاء اصطناعي", tags: "ذكاء اصطناعي · أتمتة · عمليات", facts: [["التحدي", "الرسائل والمتابعات والمهام المتكررة تستنزف الوقت والانتباه والفرص تدريجياً."], ["المهمة", "تصميم وكلاء وأتمتة تتولى جزءاً من هذا التنفيذ."], ["التنفيذ", "تكاملات مع WhatsApp وInstagram والبريد وShopify وKlaviyo وBrevo وn8n وWooCommerce."], ["الأثر", "معالجة 94% من الرسائل دون تدخل، وأكثر من 12,000 محادثة شهرياً."], ["لمن", "Dayloom."]] },
    ],
    ctaEyebrow: "هل ترى مشكلة تشبه مشكلتك هنا؟", ctaHeadline: "حدثني عن مشكلتك.", ctaText: "لا تحتاج إلى معرفة الحل مسبقاً. أخبرني بما يعيق المشروع، وما الذي تريد تحقيقه، وما الذي جربته حتى الآن.", cta: "لنتحدث عن مشروعي ↗",
  },
  contactPage: { eyebrow: "تواصل / مشروعك", headline: ["حدثني", "عما يعيق المشروع."], intro: "لا تحتاج إلى تحديد الحل مسبقاً. أخبرني بما تريد تحقيقه، وما الذي يمنع التقدم، وإلى أين تريد الوصول.", email: "البريد الإلكتروني", phone: "الهاتف", whatsapp: "واتساب" },
};

const ja: SiteCopy = {
  nav: { home: "ホーム", services: "サービス", projects: "プロジェクト", contact: "プロジェクト相談", homeDesc: "課題から考える", servicesDesc: "必要な打ち手を選ぶ", projectsDesc: "実績を見る", contactDesc: "ボトルネックを相談する", mobileEyebrow: "今、どの段階ですか？", mobileIntro: "理解する。選ぶ。確かめる。そして、プロジェクトを相談する。", available: "新規プロジェクト対応可", language: "言語" },
  hero: {
    available: "新規プロジェクト対応可", intro: "解決策が決まっていなくても構いません。何がボトルネックなのか、どこを目指したいのかをお聞かせください。戦略、AI、Web、集客の中から必要な打ち手を見極めます。", cta: "課題を相談する ↗", lead: "まず、課題から。",
    phrases: ["集客が伸び悩んでいる", "手作業が多すぎる", "サイトが成果につながらない", "ツールが分断されている"],
    stats: [["8+", "実務経験"], ["150+", "プロジェクト・案件"], ["96%", "顧客満足度"], ["21日", "平均納期"]],
    marquee: ["方向性が曖昧なら戦略から", "手作業が重いならAIから", "体験が妨げているならWebから", "成長が止まったら集客から"],
  },
  servicesPage: {
    pageLabel: "サービス", eyebrow: "サービスを選ぶ前に、まず何がプロジェクトを止めているのかを見極めます。", headline: ["整理する。", "見極める。", "動かす。"], intro: "すべてを導入する必要はありません。ひとつの打ち手で十分なこともあれば、複数を組み合わせるべきこともあります。大切なのは、先に本当のボトルネックを特定することです。", activateWhen: "こんな時に", outcomeLabel: "得られる変化",
    services: [
      { title: "戦略・グロース", signal: "アイデアは増える一方で優先順位が揺れ、何から着手すべきか判断しにくくなっている。", text: "課題、目標、そして本当に効く打ち手を整理します。ポジショニング、集客、コンバージョン、優先順位、ロードマップまで一貫して設計します。", outcome: "進む方向が明確になり、実行できる意思決定に変わります。" },
      { title: "AIエージェント・自動化", signal: "メッセージ対応、フォロー、入力作業などの反復業務に毎週多くの時間を使っている。", text: "既存ツールとつながるAIエージェント、業務アシスタント、自動化フローへ置き換えます。", outcome: "手作業と抜け漏れを減らし、人にしかできない仕事へ時間を戻します。" },
      { title: "Web・デジタル体験", signal: "サイトはあるものの、価値が伝わりにくく、次に何をすべきかがユーザーに伝わっていない。", text: "構造、体験、メッセージ、導線を見直し、理解しやすく行動しやすい状態に整えます。", outcome: "分かりやすさと信頼性が高まり、コンバージョンへつながる体験になります。" },
      { title: "デジタルマーケティング・コミュニケーション", signal: "広告や集客に投資しているのに成長が伸びない、施策の精度が低い、メッセージがぼやけている。", text: "検索広告、Social Ads、キャンペーン、コピー、メール、コンテンツを、必要な成果から逆算して設計します。", outcome: "施策の精度と計測性が上がり、ビジネス目標に直結したマーケティングになります。" },
    ],
    ctaEyebrow: "サービスを先に選ぶ必要はありません。", ctaHeadline: "何が止まっているのかを教えてください。介入すべき場所を見極めます。", ctaText: "課題、目標、少しの背景があれば十分です。", cta: "課題を相談する ↗",
  },
  projectsPage: {
    eyebrow: "プロジェクト / 実績", headline: "止まっているプロジェクトに必要なのは、サービス一覧ではなく、適切な打ち手です。", intro: "集客、Web体験、データ、自動化、AI。ここでは、売りたいソリューションではなく、実際の課題から始めた6つの事例を紹介します。", situation: "ケース",
    projects: [
      { title: "スマート医療クリニック", tags: "WEB · デジタル体験 · AI", facts: [["課題", "患者が受診場所、準備内容、次のステップを迷わず理解できる状態が必要でした。"], ["ミッション", "2つの循環器クリニックに分かりやすいデジタル体験を設計。"], ["実装", "情報設計、患者導線、Web設計、クリニックの実務に沿ったスマート機能。"], ["成果", "受診前から使いやすく、情報が明確で信頼感のあるデジタル接点を実現。"], ["対象", "循環器クリニック。"]] },
      { title: "サッカークラブ", tags: "マーケティング · コミュニケーション · 成長", facts: [["課題", "拡大する市場でブランドらしさを保ちながら認知を広げる。"], ["ミッション", "PSG Academy USAの拡大に伴う認知とコミュニケーションを支援。"], ["実装", "ネットワーク、PSG US Development Academy、Pro Summer Campsに関するコミュニケーション。"], ["成果", "米国ネットワークの拡大と国際的なプログラムを通じてブランド接点を強化。"], ["対象", "PSG Academy USA。"]] },
      { title: "不動産会社", tags: "デジタルマーケティング · 集客 · コンテンツ", facts: [["課題", "見られるだけでは意味がなく、デジタル上の関心を質の高い問い合わせにつなげる必要がありました。"], ["ミッション", "不動産会社の認知と集客を強化。"], ["実装", "コンテンツ、ランディングページ、編集戦略、SNS、検索分析、トラッキング。"], ["成果", "需要を捉え、成果を計測し、質の高いリードを獲得するためのデジタル基盤を整備。"], ["対象", "Egila。"]] },
      { title: "流通・卸売", tags: "データ · 自動化 · セグメンテーション", facts: [["課題", "重複、欠損、曖昧な分類が増えると顧客データはすぐに使えなくなります。"], ["ミッション", "顧客ファイルを営業で使える資産へ変換。"], ["実装", "データ整理、分類、連携フォーム、管理ダッシュボード、地域・属性・顧客タイプ別のセグメント。"], ["成果", "WhatsAppやメール施策にすぐ使える構造化データとなり、再加工の手間も削減。"], ["対象", "Promocash。"]] },
      { title: "デジタルマーケティング会社", tags: "検索広告 · SOCIAL ADS · パフォーマンス", facts: [["課題", "予算が大きくなるほど、コスト、流入の質、収益性を数字で判断する必要があります。"], ["ミッション", "多言語ポートフォリオの獲得施策を運用・最適化。"], ["実装", "検索広告、Social Ads、A/Bテスト、CPC・予算管理、Quality Score、トラッキング、検索分析、レポーティング。"], ["成果", "100以上の多言語アカウントでROI、売上、CPAを継続的にモニタリング。"], ["対象", "Yateo。"]] },
      { title: "AIエージェント・モデル", tags: "AI · 自動化 · オペレーション", facts: [["課題", "メッセージ対応、フォロー、反復業務は時間だけでなく注意力と機会も奪います。"], ["ミッション", "その実行の一部を担えるAIエージェントと自動化を設計。"], ["実装", "WhatsApp、Instagram、メール、Shopify、Klaviyo、Brevo、n8n、WooCommerceとの連携。"], ["成果", "メッセージの94%を人手なしで処理し、月12,000件以上の会話を対応。"], ["対象", "Dayloom。"]] },
    ],
    ctaEyebrow: "似た課題はありませんか？", ctaHeadline: "あなたの課題を聞かせてください。", ctaText: "解決策が決まっていなくても構いません。何が止まっているのか、何を実現したいのか、これまで何を試したのかをお聞かせください。", cta: "プロジェクトを相談する ↗",
  },
  contactPage: { eyebrow: "お問い合わせ / プロジェクト", headline: ["まずは", "課題をお聞かせください。"], intro: "解決策が決まっていなくても大丈夫です。実現したいこと、止まっている理由、目指す状態をお聞かせください。", email: "メール", phone: "電話", whatsapp: "WHATSAPP" },
};

const zh: SiteCopy = {
  nav: { home: "首页", services: "服务", projects: "项目", contact: "聊聊项目", homeDesc: "先看问题", servicesDesc: "选对解决杠杆", projectsDesc: "看实际成果", contactDesc: "说说哪里卡住了", mobileEyebrow: "你的项目现在卡在哪一步？", mobileIntro: "先理解，再选择，再验证，然后聊项目。", available: "可承接新项目", language: "语言" },
  hero: {
    available: "可承接新项目", intro: "你不需要先想好解决方案。告诉我哪里卡住、目标是什么，我会判断真正该动用的杠杆——策略、AI、网站还是获客。", cta: "说说哪里卡住了 ↗", lead: "先看问题，再谈方案。",
    phrases: ["获客增长停滞", "手工作业过多", "网站有流量却不转化", "工具彼此割裂"],
    stats: [["8+", "年实战经验"], ["150+", "项目与任务"], ["96%", "客户满意度"], ["21天", "平均交付周期"]],
    marquee: ["方向不清时先做策略", "手工太重时用AI", "体验阻碍转化时改网站", "增长停滞时重做获客"],
  },
  servicesPage: {
    pageLabel: "服务", eyebrow: "选服务之前，先找出真正拖慢项目的地方。", headline: ["看清。", "选对。", "行动。"], intro: "一个项目并不需要所有东西。有时一个杠杆就够，有时需要多个环节协同。起点始终一样：先找出真正的瓶颈，再决定该动哪里。", activateWhen: "适合这种情况", outcomeLabel: "能解决什么",
    services: [
      { title: "策略与增长", signal: "想法越来越多、优先级不断变化，团队开始难以判断什么最值得先做。", text: "我会把问题、目标和真正有效的增长杠杆梳理清楚，包括定位、获客、转化、取舍与路线图。", outcome: "方向更清楚，决策更容易真正落地。" },
      { title: "AI智能体与自动化", signal: "消息回复、跟进、录入或重复任务每周仍在大量消耗人工时间。", text: "我把这些流程改造成能自动执行的系统：AI智能体、业务助手、自动化，以及和现有工具的集成。", outcome: "减少手工操作和遗漏，把人的时间留给真正需要判断的工作。" },
      { title: "网站与数字体验", signal: "网站已经上线，但价值说不清、路径不明确，用户看完仍不知道下一步该做什么。", text: "我会重构信息架构、体验、文案和用户路径，让价值更容易理解，让行动更自然。", outcome: "体验更清晰、更可信，也更有利于转化。" },
      { title: "数字营销与传播", signal: "你在投入曝光或获客，但增长停滞、投放不够精准，或者信息越来越没有穿透力。", text: "我会根据业务目标介入搜索广告、Social Ads、活动、文案、邮件和内容。", outcome: "动作更精准，指标更清楚，营销真正连接到业务结果。" },
    ],
    ctaEyebrow: "你不需要先选服务。", ctaHeadline: "告诉我哪里卡住了，我来判断应该从哪里动手。", ctaText: "一个问题、一个目标，再加一点背景，就足够开始。", cta: "说说哪里卡住了 ↗",
  },
  projectsPage: {
    eyebrow: "项目 / 证明", headline: "卡住的项目不需要一张服务清单，而需要找对真正的杠杆。", intro: "获客、网站体验、数据、自动化、AI：这里是六个从实际问题出发，而不是从“要卖什么方案”出发的项目。", situation: "场景",
    projects: [
      { title: "智能医疗诊所", tags: "网站 · 数字体验 · AI", facts: [["问题", "患者需要快速看懂在哪里就诊、要准备什么，以及下一步怎么走。"], ["任务", "为两家心脏科诊所设计清晰的数字体验。"], ["实施", "信息架构、患者路径、网站设计，以及围绕诊所真实需求设计的智能功能。"], ["影响", "就诊前就能获得更清晰、更可信、更易用的数字体验。"], ["客户", "心脏科诊所。"]] },
      { title: "足球俱乐部", tags: "营销 · 传播 · 增长", facts: [["问题", "在快速扩张的市场中提升体育品牌影响力，同时保持品牌识别度。"], ["任务", "支持PSG Academy USA扩张过程中的曝光与传播。"], ["实施", "围绕网络扩张、PSG US Development Academy和Pro Summer Camps进行传播。"], ["影响", "随着美国网络扩张及国际化项目推进，品牌触点得到强化。"], ["客户", "PSG Academy USA。"]] },
      { title: "房地产公司", tags: "数字营销 · 获客 · 内容", facts: [["问题", "只有曝光没有意义，关键是把线上关注转成高质量咨询。"], ["任务", "提升房地产公司的线上可见度与获客能力。"], ["实施", "内容、落地页、编辑策略、社交媒体、搜索分析与跟踪。"], ["影响", "建立更系统的数字获客体系，用来承接需求、衡量表现并获得更高质量线索。"], ["客户", "Egila房地产公司。"]] },
      { title: "大型流通", tags: "数据 · 自动化 · 分群", facts: [["问题", "重复记录、缺失数据和模糊分群一旦堆积，客户数据库很快就失去使用价值。"], ["任务", "把客户文件变成真正可用的商业工具。"], ["实施", "数据清理、分类、联动表单、监控面板，以及按城市、画像或客户类型分群。"], ["影响", "形成可直接用于更精准WhatsApp或邮件活动的结构化数据库，也减少重复整理时间。"], ["客户", "Promocash。"]] },
      { title: "数字营销公司", tags: "搜索广告 · SOCIAL ADS · 效果", facts: [["问题", "预算越大，每个决策越需要在数字里体现：成本、流量质量和盈利能力。"], ["任务", "管理并优化多语言账户组合中的获客活动。"], ["实施", "搜索广告、Social Ads、A/B测试、CPC与预算管理、Quality Score、跟踪、搜索分析和报告。"], ["影响", "实战管理100多个多语言账户，持续跟踪ROI、营收与CPA。"], ["客户", "Yateo数字增长公司。"]] },
      { title: "AI智能体与模型", tags: "AI · 自动化 · 运营", facts: [["问题", "消息、跟进和重复任务会持续消耗时间、注意力和商业机会。"], ["任务", "设计能够接管部分执行工作的AI智能体和自动化。"], ["实施", "连接WhatsApp、Instagram、邮件、Shopify、Klaviyo、Brevo、n8n和WooCommerce。"], ["影响", "94%的消息无需人工介入，每月处理超过12,000次对话。"], ["客户", "Dayloom。"]] },
    ],
    ctaEyebrow: "这些问题里，有你正在面对的吗？", ctaHeadline: "聊聊你的情况。", ctaText: "你不需要先想好解决方案。告诉我哪里卡住、想达到什么结果，以及之前已经尝试过什么。", cta: "聊聊我的项目 ↗",
  },
  contactPage: { eyebrow: "联系 / 你的项目", headline: ["先告诉我", "哪里卡住了。"], intro: "你不需要先想好解决方案。告诉我你想实现什么、哪里阻碍了进展，以及你希望最终到达什么状态。", email: "邮箱", phone: "电话", whatsapp: "WHATSAPP" },
};

const ko: SiteCopy = {
  nav: { home: "홈", services: "서비스", projects: "프로젝트", contact: "프로젝트 상담", homeDesc: "문제부터 보기", servicesDesc: "맞는 해법 선택", projectsDesc: "실제 사례 확인", contactDesc: "막힌 지점 이야기하기", mobileEyebrow: "지금 프로젝트는 어디에 있나요?", mobileIntro: "이해하고, 선택하고, 확인한 뒤 프로젝트를 이야기합니다.", available: "신규 프로젝트 진행 가능", language: "언어" },
  hero: {
    available: "신규 프로젝트 진행 가능", intro: "해결책을 미리 정해 오실 필요는 없습니다. 무엇이 막혀 있는지, 어디까지 가고 싶은지 알려주세요. 전략, AI, 웹, 고객 획득 중 어디에 개입해야 하는지 판단하겠습니다.", cta: "막힌 지점 상담하기 ↗", lead: "문제부터 봅니다.",
    phrases: ["유입 성장이 정체됨", "반복되는 수작업", "전환되지 않는 웹사이트", "서로 연결되지 않은 도구"],
    stats: [["8+", "년 실무 경험"], ["150+", "프로젝트·업무"], ["96%", "고객 만족도"], ["21일", "평균 납기"]],
    marquee: ["방향이 흐리면 전략부터", "수작업이 많으면 AI부터", "경험이 전환을 막으면 웹부터", "성장이 멈추면 획득부터"],
  },
  servicesPage: {
    pageLabel: "서비스", eyebrow: "서비스를 고르기 전에, 무엇이 프로젝트를 늦추는지 먼저 확인합니다.", headline: ["명확히 보고.", "정확히 선택하고.", "실행합니다."], intro: "모든 프로젝트에 모든 서비스가 필요한 것은 아닙니다. 하나의 개입으로 충분할 때도 있고 여러 영역이 함께 움직여야 할 때도 있습니다. 시작은 늘 같습니다. 무엇이 실제 병목인지 먼저 찾습니다.", activateWhen: "이럴 때", outcomeLabel: "이렇게 달라집니다",
    services: [
      { title: "전략 & 성장", signal: "아이디어는 쌓이고 우선순위는 계속 바뀌어 무엇부터 해야 할지 판단하기 어려운 상황.", text: "문제, 목표, 실제로 움직일 수 있는 레버를 정리합니다. 포지셔닝, 고객 획득, 전환, 우선순위, 로드맵까지 연결합니다.", outcome: "방향이 명확해지고 실행 가능한 의사결정이 남습니다." },
      { title: "AI 에이전트 & 자동화", signal: "메시지 응대, 후속 연락, 입력, 반복 업무에 매주 사람의 시간이 계속 들어가는 상황.", text: "기존 도구와 연결되는 AI 에이전트, 업무 보조, 자동화, 통합 시스템으로 바꿉니다.", outcome: "수작업과 누락을 줄이고, 사람이 판단해야 하는 일에 시간을 돌려줍니다." },
      { title: "웹 & 디지털 경험", signal: "사이트는 있지만 가치가 잘 전달되지 않거나, 다음 행동이 명확하지 않아 사용자가 중간에 멈추는 상황.", text: "정보 구조, 경험, 메시지, 사용자 흐름을 다시 설계해 이해와 행동이 자연스럽게 이어지도록 만듭니다.", outcome: "더 명확하고 신뢰할 수 있으며 전환에 가까운 경험이 됩니다." },
      { title: "디지털 마케팅 & 커뮤니케이션", signal: "노출과 획득에 투자하고 있지만 성장이 멈췄거나, 캠페인이 정교하지 않거나, 메시지가 힘을 잃은 상황.", text: "검색 광고, Social Ads, 캠페인, 카피, 이메일, 콘텐츠를 필요한 비즈니스 결과에 맞춰 설계합니다.", outcome: "더 정교한 실행, 더 나은 측정, 명확한 비즈니스 목표와 연결된 마케팅이 됩니다." },
    ],
    ctaEyebrow: "서비스를 먼저 고르실 필요 없습니다.", ctaHeadline: "무엇이 막혀 있는지 알려주세요. 어디에 개입해야 할지 판단하겠습니다.", ctaText: "문제, 목표, 약간의 배경만 있으면 시작할 수 있습니다.", cta: "막힌 지점 상담하기 ↗",
  },
  projectsPage: {
    eyebrow: "프로젝트 / 근거", headline: "막힌 프로젝트에 필요한 건 서비스 목록이 아니라 정확한 개입 지점입니다.", intro: "고객 획득, 웹 경험, 데이터, 자동화, AI. 아래 여섯 사례는 팔고 싶은 솔루션이 아니라 실제 문제에서 시작했습니다.", situation: "상황",
    projects: [
      { title: "스마트 의료 클리닉", tags: "웹 · 디지털 경험 · AI", facts: [["과제", "환자가 어디로 가야 하는지, 무엇을 준비해야 하는지, 다음 단계가 무엇인지 빠르게 이해해야 했습니다."], ["미션", "두 곳의 심장 전문 클리닉에 명확한 디지털 경험을 설계했습니다."], ["구현", "정보 구조, 환자 여정, 웹 설계, 실제 진료 환경에 맞춘 스마트 기능을 구성했습니다."], ["효과", "진료 전부터 더 명확하고 신뢰할 수 있으며 사용하기 쉬운 디지털 접점을 만들었습니다."], ["대상", "심장 전문 클리닉."]] },
      { title: "축구 클럽", tags: "마케팅 · 커뮤니케이션 · 성장", facts: [["과제", "확장 중인 시장에서 브랜드 정체성을 유지하면서 인지도를 키워야 했습니다."], ["미션", "PSG Academy USA의 성장 과정에서 노출과 커뮤니케이션을 지원했습니다."], ["구현", "네트워크, PSG US Development Academy, Pro Summer Camps 관련 커뮤니케이션을 진행했습니다."], ["효과", "미국 네트워크 확장과 국제 프로그램을 통해 브랜드 접점을 강화했습니다."], ["대상", "PSG Academy USA."]] },
      { title: "부동산 회사", tags: "디지털 마케팅 · 획득 · 콘텐츠", facts: [["과제", "온라인 노출이 실제로 질 높은 문의로 이어지지 않으면 의미가 없습니다."], ["미션", "부동산 회사의 가시성과 고객 획득을 강화했습니다."], ["구현", "콘텐츠, 랜딩 페이지, 에디토리얼 전략, 소셜 미디어, 검색 분석, 트래킹을 구성했습니다."], ["효과", "수요를 포착하고 성과를 측정하며 질 높은 리드를 만들 수 있는 디지털 구조를 갖췄습니다."], ["대상", "Egila 부동산 회사."]] },
      { title: "대형 유통", tags: "데이터 · 자동화 · 세분화", facts: [["과제", "중복, 누락 데이터, 모호한 세그먼트가 쌓이면 고객 데이터베이스는 빠르게 활용 가치를 잃습니다."], ["미션", "고객 파일을 실제 영업에 쓸 수 있는 도구로 바꿨습니다."], ["구현", "데이터 정리, 분류, 연결 폼, 모니터링 대시보드, 지역·프로필·고객 유형별 세분화를 구성했습니다."], ["효과", "WhatsApp 및 이메일 캠페인에 바로 활용할 수 있는 구조화된 데이터가 되었고 재가공 시간도 줄였습니다."], ["대상", "Promocash."]] },
      { title: "디지털 마케팅 에이전시", tags: "검색 광고 · SOCIAL ADS · 성과", facts: [["과제", "예산이 커질수록 비용, 유입 품질, 수익성이 모든 의사결정에 숫자로 보여야 합니다."], ["미션", "다국어 포트폴리오의 고객 획득 캠페인을 운영하고 최적화했습니다."], ["구현", "검색 광고, Social Ads, A/B 테스트, CPC·예산 관리, Quality Score, 트래킹, 검색 분석, 리포팅을 수행했습니다."], ["효과", "100개 이상의 다국어 계정을 다루며 ROI, 매출, CPA를 지속적으로 모니터링했습니다."], ["대상", "Yateo 디지털 성장 에이전시."]] },
      { title: "AI 에이전트 & 모델", tags: "AI · 자동화 · 운영", facts: [["과제", "메시지, 후속 연락, 반복 업무는 시간뿐 아니라 집중력과 기회까지 소모합니다."], ["미션", "그 실행의 일부를 맡을 수 있는 AI 에이전트와 자동화를 설계했습니다."], ["구현", "WhatsApp, Instagram, 이메일, Shopify, Klaviyo, Brevo, n8n, WooCommerce와 연결했습니다."], ["효과", "메시지의 94%를 사람의 개입 없이 처리하고 매월 12,000건 이상의 대화를 관리합니다."], ["대상", "Dayloom."]] },
    ],
    ctaEyebrow: "비슷한 문제가 있으신가요?", ctaHeadline: "당신의 상황을 들려주세요.", ctaText: "해결책을 미리 정해 둘 필요는 없습니다. 무엇이 막혀 있는지, 무엇을 이루고 싶은지, 지금까지 무엇을 시도했는지 알려주세요.", cta: "프로젝트 상담하기 ↗",
  },
  contactPage: { eyebrow: "문의 / 프로젝트", headline: ["먼저", "막힌 지점을 알려주세요."], intro: "해결책을 정해 오실 필요는 없습니다. 무엇을 이루고 싶은지, 무엇이 진행을 막고 있는지, 어디까지 가고 싶은지 알려주세요.", email: "이메일", phone: "전화", whatsapp: "WHATSAPP" },
};

export const copyByLocale: Record<Locale, SiteCopy> = { fr, en, es, pt, ar, ja, zh, ko };
export const getCopy = (locale: Locale = "fr") => copyByLocale[locale] || fr;
