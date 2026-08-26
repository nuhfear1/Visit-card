import React from "react";

const projects = [
  {
    num: "01",
    title: "CABINET MÉDICAL INTELLIGENT",
    tags: "WEB · EXPÉRIENCE DIGITALE · IA",
    primary: "#F44A22",
    secondary: "#D1C4E9",
    facts: [
      ["QUOI", "Conception d’une présence digitale pour deux cabinets médicaux."],
      ["POUR QUI", "Cabinet de cardiologie."],
      ["POURQUOI", "Rendre les informations, les lieux de consultation et les parcours patients plus simples à comprendre."],
      ["COMMENT", "Architecture, expérience utilisateur, conception web et intégration de fonctionnalités intelligentes."],
      ["RÉSULTAT", "Une expérience plus claire, plus professionnelle et pensée autour des besoins du patient."],
    ],
  },
  {
    num: "02",
    title: "PSG ACADEMY",
    tags: "PROJET SÉLECTIONNÉ",
    primary: "#00F2FE",
    secondary: "#4FACFE",
    facts: [
      ["QUOI", "Mission réalisée pour PSG Academy."],
      ["POUR QUI", "PSG Academy."],
      ["POURQUOI", "À préciser."],
      ["COMMENT", "À préciser."],
      ["RÉSULTAT", "À préciser."],
    ],
  },
  {
    num: "03",
    title: "AGENCE IMMOBILIÈRE",
    tags: "PROJET SÉLECTIONNÉ",
    primary: "#9B51E0",
    secondary: "#E94057",
    facts: [
      ["QUOI", "Mission réalisée pour une agence immobilière."],
      ["POUR QUI", "Agence immobilière."],
      ["POURQUOI", "À préciser."],
      ["COMMENT", "À préciser."],
      ["RÉSULTAT", "À préciser."],
    ],
  },
  {
    num: "04",
    title: "PROMOCASH",
    tags: "DATA · AUTOMATISATION · SEGMENTATION",
    primary: "#FFAD29",
    secondary: "#F44A22",
    facts: [
      ["QUOI", "Structuration et automatisation du fichier clients pour le transformer en outil commercial exploitable."],
      ["POUR QUI", "Promocash."],
      ["POURQUOI", "Mieux connaître les clients, éviter les messages génériques et rendre les actions commerciales plus précises."],
      ["COMMENT", "Nettoyage des doublons, classement des données, formulaire relié au fichier, tableau de suivi et segmentation par ville, type de client, etc."],
      ["RÉSULTAT", "Une base clients structurée, segmentable et prête pour des campagnes WhatsApp ou email plus ciblées."],
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
                : index === 3
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
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">PROJET</div>
                  <h2 className="max-w-4xl font-oswald text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl lg:text-7xl">{project.title}</h2>
                </div>

                <ul className="space-y-3 border-t border-white/20 pt-4">
                  {project.facts.map(([label, value]) => (
                    <li key={label} className="grid grid-cols-[88px_1fr] gap-3 border-b border-white/10 pb-3 text-xs leading-relaxed md:text-sm">
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
        <div className="relative min-h-72 overflow-hidden">
          <div className="absolute -left-[10%] -top-[35%] h-[120%] w-[70%] rounded-full bg-[#4A00E0] blur-[55px]" />
          <div className="absolute -right-[10%] top-[5%] h-[110%] w-[70%] rounded-full bg-[#8E2DE2] blur-[55px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.75),transparent_26%)]" />
          <div className="relative z-10 flex min-h-72 flex-col items-center justify-center px-6 text-center text-[#FEF8E8]">
            <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/55">ENVIE D’EN SAVOIR PLUS ?</div>
            <h2 className="mt-3 font-oswald text-4xl font-black uppercase tracking-tight md:text-6xl">PARLONS DU PROJET.</h2>
            <a href="/Visit-card/contact/" className="mt-6 rounded-full border border-white/35 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:bg-white hover:text-[#161616]">
              ME CONTACTER ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
