import React from "react";

const projects = [
  ["01", "SEO", "#F44A22", "#D1C4E9"],
  ["02", "SEA", "#00F2FE", "#4FACFE"],
  ["03", "SOCIAL ADS", "#9B51E0", "#E94057"],
  ["04", "COPYWRITING", "#FFAD29", "#F44A22"],
  ["05", "EMAILING", "#38EF7D", "#11998E"],
  ["06", "WEB", "#8A2387", "#E94057"],
  ["07", "STRATEGY", "#6A11CB", "#2575FC"],
  ["08", "CONTENT", "#E65C00", "#F9D423"],
  ["09", "ANALYTICS", "#3A7BD5", "#3A6073"],
];

export default function ImageMaskGrid() {
  return (
    <div className="w-full px-4 md:px-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(([num, label, primary, secondary], index) => (
          <article
            key={num}
            className={`group relative aspect-[4/5] overflow-hidden border-2 border-[#161616] bg-[#161616] ${
              index % 3 === 0 ? "rounded-tl-[5rem] rounded-br-[2rem]" : index % 3 === 1 ? "rounded-[2.5rem]" : "rounded-tr-[6rem] rounded-bl-[3rem]"
            }`}
          >
            <div
              className="absolute -left-[20%] -top-[15%] h-[75%] w-[90%] rounded-full blur-[45px] transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundColor: primary }}
            />
            <div
              className="absolute -right-[18%] top-[20%] h-[75%] w-[90%] rounded-full blur-[45px] transition-transform duration-700 group-hover:-translate-x-3 group-hover:translate-y-4"
              style={{ backgroundColor: secondary }}
            />
            <div className="absolute -bottom-[25%] left-0 h-[65%] w-full rounded-full bg-[#161616] blur-[35px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,.8),transparent_20%)] opacity-70" />
            <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/0" />

            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 text-[#FEF8E8]">
              <div className="flex items-start justify-between">
                <span className="font-cormorant text-5xl font-bold opacity-45 transition-opacity group-hover:opacity-100">{num}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/15 text-xl backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#F44A22]">↗</span>
              </div>
              <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] opacity-60">CAPABILITY</div>
                <h2 className="font-oswald text-3xl font-black uppercase tracking-tight md:text-4xl">{label}</h2>
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
            <span className="font-cormorant text-7xl font-bold opacity-35">10</span>
            <h2 className="mt-2 font-oswald text-4xl font-black uppercase tracking-tight md:text-6xl">FULL DIGITAL SYSTEM</h2>
            <p className="mt-4 max-w-xl text-xs uppercase tracking-[0.18em] text-white/65">Strategy → acquisition → content → web → optimization</p>
          </div>
        </div>
      </section>
    </div>
  );
}
