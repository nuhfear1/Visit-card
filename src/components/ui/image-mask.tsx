import React from "react";

const services = [
  ["01", "STRATÉGIE & CROISSANCE", "#F44A22", "#D1C4E9"],
  ["02", "AGENTS IA & AUTOMATISATION", "#00F2FE", "#4FACFE"],
  ["03", "WEB & EXPÉRIENCES DIGITALES", "#9B51E0", "#E94057"],
  ["04", "MARKETING DIGITAL & COMMUNICATION", "#FFAD29", "#F44A22"],
];

export default function ImageMaskGrid() {
  return (
    <div className="w-full px-4 md:px-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {services.map(([num, label, primary, secondary], index) => (
          <article
            key={num}
            className={`group relative aspect-[4/3] min-h-[320px] overflow-hidden border-2 border-[#161616] bg-[#161616] ${
              index % 2 === 0 ? "rounded-tl-[5rem] rounded-br-[2rem]" : "rounded-tr-[5rem] rounded-bl-[2rem]"
            }`}
          >
            <div className="absolute -left-[20%] -top-[15%] h-[75%] w-[90%] rounded-full blur-[45px] transition-transform duration-700 group-hover:scale-110" style={{ backgroundColor: primary }} />
            <div className="absolute -right-[18%] top-[20%] h-[75%] w-[90%] rounded-full blur-[45px] transition-transform duration-700 group-hover:-translate-x-3 group-hover:translate-y-4" style={{ backgroundColor: secondary }} />
            <div className="absolute -bottom-[25%] left-0 h-[65%] w-full rounded-full bg-[#161616] blur-[35px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,.8),transparent_20%)] opacity-70" />
            <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/0" />

            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8 text-[#FEF8E8]">
              <div className="flex items-start justify-between">
                <span className="font-cormorant text-5xl md:text-6xl font-bold opacity-45 transition-opacity group-hover:opacity-100">{num}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/15 text-xl backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#F44A22]">↗</span>
              </div>
              <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] opacity-60">PÔLE</div>
                <h2 className="font-oswald text-3xl md:text-5xl font-black uppercase tracking-tight leading-none max-w-3xl">{label}</h2>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-4 overflow-hidden rounded-[3rem] border-2 border-[#161616] bg-[#161616]">
        <div className="relative aspect-[16/6] min-h-72 overflow-hidden">
          <div className="absolute -left-[10%] -top-[35%] h-[120%] w-[70%] rounded-full bg-[#4A00E0] blur-[55px]" />
          <div className="absolute -right-[10%] top-[5%] h-[110%] w-[70%] rounded-full bg-[#8E2DE2] blur-[55px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.75),transparent_26%)]" />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-[#FEF8E8]">
            <span className="font-cormorant text-7xl font-bold opacity-35">GWB</span>
            <h2 className="mt-2 font-oswald text-4xl font-black uppercase tracking-tight md:text-6xl">UN SYSTÈME DIGITAL COHÉRENT</h2>
            <p className="mt-4 max-w-2xl text-xs uppercase tracking-[0.18em] text-white/65">Stratégie → IA → Web → Marketing → Croissance</p>
          </div>
        </div>
      </section>
    </div>
  );
}
