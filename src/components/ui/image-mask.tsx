import React from "react";

const projects = [
  {
    num: "01",
    title: "CABINET MÉDICAL INTELLIGENT",
    tags: "WEB · EXPÉRIENCE DIGITALE · IA",
    primary: "#F44A22",
    secondary: "#D1C4E9",
    facts: [
      ["ENJEU", "Des patients qui doivent comprendre rapidement où consulter, quoi préparer et comment avancer sans friction."],
      ["MISSION", "Concevoir une expérience digitale claire pour deux cabinets de cardiologie."],
      ["MISE EN PLACE", "Architecture, parcours patient, conception web et fonctionnalités intelligentes autour des besoins réels du cabinet."],
      ["IMPACT", "Une présence digitale plus claire, plus crédible et plus simple à utiliser avant même la consultation."],
      ["POUR QUI", "Cabinet de cardiologie."],
    ],
  },
  {
    num: "02",
    title: "CLUB DE FOOTBALL",
    tags: "MARKETING · COMMUNICATION · DÉVELOPPEMENT",
    primary: "#00F2FE",
    secondary: "#4FACFE",
    facts: [
      ["ENJEU", "Faire émerger une marque sportive dans un marché en expansion sans diluer son identité."],
      ["MISSION", "Soutenir la visibilité et la communication autour du développement de PSG Academy USA."],
      ["MISE EN PLACE", "Communication autour du réseau, de la PSG US Development Academy et des Pro Summer Camps."],
      ["IMPACT", "Une présence de marque portée par l’expansion du réseau américain et des programmes à dimension internationale."],
      ["POUR QUI", "PSG Academy USA."],
    ],
  },
  {
    num: "03",
    title: "AGENCE IMMOBILIÈRE",
    tags: "MARKETING DIGITAL · ACQUISITION · CONTENU",
    primary: "#9B51E0",
    secondary: "#E94057",
    facts: [
      ["ENJEU", "Être visible ne suffit pas si la présence digitale ne transforme pas l’attention en demandes qualifiées."],
      ["MISSION", "Développer la visibilité et l’acquisition d’une agence immobilière."],
      ["MISE EN PLACE", "Contenus, landing pages, stratégie éditoriale, réseaux sociaux, analyse des recherches et tracking."],
      ["IMPACT", "Un dispositif digital structuré pour mieux capter la demande, suivre la performance et générer des leads qualifiés."],
      ["POUR QUI", "Egila, agence immobilière."],
    ],
  },
  {
    num: "04",
    title: "GRANDE DISTRIBUTION",
    tags: "DATA · AUTOMATISATION · SEGMENTATION",
    primary: "#FFAD29",
    secondary: "#F44A22",
    facts: [
      ["ENJEU", "Une base clients devient vite inutilisable quand les doublons, les données manquantes et les segments flous s’accumulent."],
      ["MISSION", "Transformer un fichier clients en outil commercial exploitable."],
      ["MISE EN PLACE", "Nettoyage, classement, formulaire relié au fichier, tableau de suivi et segmentation par ville, profil ou type de client."],
      ["IMPACT", "Une base structurée et prête pour des campagnes WhatsApp ou email plus ciblées, avec moins de temps perdu à retraiter les données."],
      ["POUR QUI", "Promocash."],
    ],
  },
  {
    num: "05",
    title: "AGENCE DE MARKETING DIGITAL",
    tags: "SEA · SOCIAL ADS · PERFORMANCE",
    primary: "#12B886",
    secondary: "#0B7285",
    facts: [
      ["ENJEU", "Quand les budgets montent, chaque décision doit être lisible dans les chiffres : coût, qualité du trafic et rentabilité."],
      ["MISSION", "Piloter et optimiser des campagnes d’acquisition sur un portefeuille multilingue."],
      ["MISE EN PLACE", "SEA, Social Ads, A/B tests, gestion des CPC et budgets, Quality Score, tracking, analyse des recherches et reporting."],
      ["IMPACT", "Une expérience menée sur plus de 100 comptes multilingues avec suivi continu des ROI, CA et CPA."],
      ["POUR QUI", "Yateo, agence partenaire en croissance digitale."],
    ],
  },
  {
    num: "06",
    title: "AGENTS & MODÈLES IA",
    tags: "IA · AUTOMATISATION · OPÉRATIONS",
    primary: "#2563EB",
    secondary: "#A3E635",
    facts: [
      ["ENJEU", "Les messages, relances et tâches répétitives finissent par coûter du temps, de l’attention et des opportunités."],
      ["MISSION", "Concevoir des agents et automatisations capables de prendre en charge une partie de cette exécution."],
      ["MISE EN PLACE", "Connexions à WhatsApp, Instagram, email, Shopify, Klaviyo, Brevo, n8n et WooCommerce."],
      ["IMPACT", "94 % des messages traités sans intervention et plus de 12 000 conversations prises en charge chaque mois."],
      ["POUR QUI", "Dayloom."],
    ],
  },
];

export default function ImageMaskGrid() {
  return (
    <div className="w-full px-4 md:px-6">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.num}
            className={`group relative min-h-[520px] overflow-hidden border-2 border-[#161616] bg-[#161616] ${
              index === 0
                ? "lg:col-span-2 rounded-tl-[5rem] rounded-br-[2rem]"
                : index === 5
                  ? "lg:col-span-2 rounded-tr-[5rem] rounded-bl-[2rem]"
                  : index % 2 === 0
                    ? "rounded-tl-[5rem] rounded-br-[2rem]"
                    : "rounded-tr-[5rem] rounded-bl-[2rem]"
            }`}
          >
            <div className="absolute -left-[20%] -top-[15%] h-[75%] w-[90%] rounded-full blur-[55px] transition-transform duration-700 group-hover:scale-110" style={{ backgroundColor: project.primary }} />
            <div className="absolute -right-[18%] top-[20%] h-[75%] w-[90%] rounded-full blur-[55px] transition-transform duration-700 group-hover:-translate-x-3 group-hover:translate-y-4" style={{ backgroundColor: project.secondary }} />
            <div className="absolute -bottom-[25%] left-0 h-[65%] w-full rounded-full bg-[#161616] blur-[35px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,.8),transparent_20%)] opacity-70" />
            <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/5" />

            <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-6 text-[#FEF8E8] md:p-8 lg:p-10">
              <div className="flex items-start justify-between gap-6">
                <span className="font-cormorant text-5xl font-bold opacity-45 transition-opacity group-hover:opacity-100 md:text-6xl">{project.num}</span>
                <div className="text-right text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{project.tags}</div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,.95fr)] lg:items-end">
                <div>
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">SITUATION</div>
                  <h2 className="max-w-4xl font-oswald text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl lg:text-7xl">{project.title}</h2>
                </div>

                <ul className="space-y-3 border-t border-white/20 pt-4">
                  {project.facts.map(([label, value]) => (
                    <li key={label} className="grid grid-cols-[96px_1fr] gap-3 border-b border-white/10 pb-3 text-xs leading-relaxed md:text-sm">
                      <span className="font-bold uppercase tracking-[0.14em] text-white/45">{label}</span>
                      <span className="text-white/85">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-4 overflow-hidden rounded-[3rem] border-2 border-[#161616] bg-[#161616]">
        <div className="relative min-h-80 overflow-hidden">
          <div className="absolute -left-[10%] -top-[35%] h-[120%] w-[70%] rounded-full bg-[#4A00E0] blur-[55px]" />
          <div className="absolute -right-[10%] top-[5%] h-[110%] w-[70%] rounded-full bg-[#8E2DE2] blur-[55px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.75),transparent_26%)]" />
          <div className="relative z-10 flex min-h-80 flex-col items-center justify-center px-6 text-center text-[#FEF8E8]">
            <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/55">VOUS RECONNAISSEZ UN DE CES PROBLÈMES ?</div>
            <h2 className="mt-3 max-w-4xl font-oswald text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">PARLEZ-MOI DU VÔTRE.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/72 md:text-base">
              Pas besoin d’avoir déjà choisi la solution. Expliquez-moi ce qui bloque, ce que vous voulez obtenir et ce que vous avez déjà essayé.
            </p>
            <a href="/Visit-card/contact/" className="mt-7 rounded-full border border-white/35 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:bg-white hover:text-[#161616]">
              PARLER DE MON PROJET ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
