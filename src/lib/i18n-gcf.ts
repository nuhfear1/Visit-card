import {
  allLocales,
  copyByLocale,
  localeOptions,
  localizedLocales,
  type Locale,
  type SiteCopy,
} from "@/lib/i18n";

const gcfCopy: SiteCopy = {
  nav: {
    home: "Akèy",
    services: "Sèvis",
    projects: "Pwojé",
    contact: "Palé dè pwojé a-w",
    homeDesc: "Koumansé èvè pwoblèm-la",
    servicesDesc: "Chwazi bon zouti-la",
    projectsDesc: "Vwè sa ki ja fèt",
    contactDesc: "Di-mwen ka ki ka frenné pwojé-la",
    mobileEyebrow: "OLA PWOJÉ A-W YÉ KONYÉLA ?",
    mobileIntro: "Konprann. Chwazi. Gadé sa ki fèt. Aprésa, annou palé dè pwojé-la.",
    available: "An pé pran nouvo pwojé",
    language: "Lang",
  },
  hero: {
    available: "AN PÉ PRAN NOUVO PWOJÉ",
    intro: "Ou pa bizwen ja sav ki solisyon ou vlé. Di-mwen ka ki ka frenné pwojé a-w é ola ou vlé rivé. An ké gadé ki koté fo nou aji — stratéji, IA, wèb oben akizisyon.",
    cta: "DI-MWEN KA KI KA FRENNÉ PWOJÉ A-W ↗",
    lead: "PWOBLÈM-LA DABÒ.",
    phrases: [
      "KLIYAN PA KA RIVÉ KON AVAN",
      "TWÒP TRAVAY KA FÈT A LA MEN",
      "SIT-LA PA KA MENNÉ KLIYAN",
      "ZOUTI-LA PA KA MACHÉ ANSANM",
    ],
    stats: [
      ["8+", "LANNÉ ÈKSPÉRYANS"],
      ["150+", "PWOJÉ É MISYON"],
      ["96%", "KLIYAN SATISFÈ"],
      ["21 JOU", "MWAYENN POU FINI ON PWOJÉ"],
    ],
    marquee: [
      "STRATÉJI LÈ CHIMEN-LA PA KLÈ",
      "IA LÈ TWÒP BITEN KA FÈT A LA MEN",
      "WÈB LÈ SIT-LA KA FRENNÉ MOUN",
      "AKIZISYON LÈ KLIYAN PA KA RIVÉ",
    ],
  },
  servicesPage: {
    pageLabel: "SÈVIS",
    eyebrow: "Avan ou chwazi on sèvis, fò ou sav ka ki ka frenné pwojé-la.",
    headline: ["VWÈ KLÈ.", "CHWAZI BYEN.", "AJI."],
    intro: "On pwojé pa bizwen tout biten. Délè, on sèl zouti sifi. Délè, fò plizyè biten travay ansanm. Men dabòpouyonn, fò nou touvé ka ki ka frenné pwojé-la avan nou désidé ka pou fè.",
    activateWhen: "SÈVI ÈVÈ-Y LÈ",
    outcomeLabel: "SA I KA CHANJÉ",
    services: [
      {
        title: "STRATÉJI & DÉVLÒPMAN",
        signal: "Lidé ka antré yonn dèyè lòt, priyorité ka chanjé, é ou pa sav ka pou fè dabò.",
        text: "An ka mété pwoblèm-la, òbjèktif-la é chimen-la annòd : pozisyònman, akizisyon, konvèsyon, sa ki priyoritè é plan travay.",
        outcome: "On chimen ki klè é désizyon ou pé mété an pratik.",
      },
      {
        title: "AJAN IA & OTOMATIZASYON",
        signal: "Mésaj, rapèl, rantré enfòmasyon é menm travay-la ka wouvin chak simenn é ka manjé tan.",
        text: "An ka transfòmé sé travay-lasa an sistenm ki pé aji tousèl : ajan IA, asistan travay, otomatik é lyannaj èvè zouti ou ja ka sèvi.",
        outcome: "Mwens travay a la men, mwens oubli, é plis tan ba travay ki bizwen on moun vréman.",
      },
      {
        title: "WÈB & ÈKSPÉRYANS DIJITAL",
        signal: "Sit-la la, men i pa ka èspliké byen, i pa ka menné moun byen, oben moun ka rété san sav ka pou fè apré.",
        text: "An ka wouvwè jan sit-la fèt, pawòl-la é chimen a moun adan-y pou yo konprann pli vit é sav ka pou fè.",
        outcome: "On èkspéryans pli klè, pli seryé, é ki ka menné moun pli fasil jis o kontak.",
      },
      {
        title: "MAWKÉTING DIJITAL & KOMINIKASYON",
        signal: "Ou ka mété lajan pou moun vwè-w oben pou trapé nouvo kliyan, men balan-la ka frenné, kanpay-la pa asé prési oben mésaj-la ka pèd fòs a-y.",
        text: "An ka travay asi SEA, Social Ads, kanpay, copywriting, imèl é kontni silon òbjèktif-la.",
        outcome: "Aksyon pli prési, bon chif pou suiv sa, é makéting ki ka travay pou on òbjèktif biznis ki klè.",
      },
    ],
    ctaEyebrow: "OU PA BIZWEN SAV KI SÈVIS POU PRAN.",
    ctaHeadline: "DI-MWEN KA KI KA FRENNÉ PWOJÉ A-W. AN KÉ DI-W KI KOTÉ FO NOU AJI.",
    ctaText: "On pwoblèm, on òbjèktif é tibwen kontèks sifi pou koumansé.",
    cta: "DI-MWEN KA KI KA FRENNÉ PWOJÉ A-W ↗",
  },
  projectsPage: {
    eyebrow: "PWOJÉ / SA KI JA FÈT",
    headline: "ON PWOJÉ KI RÉTÉ PRI PA BIZWEN ON LIS SÈVIS. I BIZWEN BON ZOUTI-LA.",
    intro: "Akizisyon, èkspéryans wèb, doné, otomatik, IA : mi sis sitiyasyon otila travay-la koumansé èvè pwoblèm-la, pa èvè on solisyon pou vann.",
    situation: "SITIYASYON",
    projects: [
      {
        title: "KABINÈ MÉDSIN ENTÉLIJAN",
        tags: "WÈB · ÈKSPÉRYANS DIJITAL · IA",
        facts: [
          ["PWOBLÈM", "Pasyan-la bizwen sav vit ola pou ay, ka pou paré é kijan pou kontinyé san pèdtan."],
          ["MISYON", "Fè on èkspéryans dijital ki klè pou dé kabinè kadyoloji."],
          ["SA KI FÈT", "Mété enfòmasyon annòd, paré chimen a pasyan-la, fè sit-la é mété fonksyon entélijan dapré vré bezwen a kabinè-la."],
          ["RÉZILTA", "On prézans dijital pli klè, pli seryé é pli fasil pou sèvi avan menm pasyan-la rivé an konsiltasyon."],
          ["POU KIMOUN", "Kabinè kadyoloji."],
        ],
      },
      {
        title: "KLIB FOUTBÒL",
        tags: "MAWKÉTING · KOMINIKASYON · DÉVLÒPMAN",
        facts: [
          ["PWOBLÈM", "Fè on mak espòtif pran balan adan on maché ka grandi san pèd lidantité a-y."],
          ["MISYON", "Ranfòsé vizibilité é kominikasyon alantou dévlòpman a PSG Academy USA."],
          ["SA KI FÈT", "Kominikasyon asi rézo-la, PSG US Development Academy é Pro Summer Camps."],
          ["RÉZILTA", "Mak-la pran plis fòs èvè dévlòpman a rézo ameriken-la é pwogram ki té ka touché moun plizyè péyi."],
          ["POU KIMOUN", "PSG Academy USA."],
        ],
      },
      {
        title: "AJANS IMOBILYÉ",
        tags: "MAWKÉTING DIJITAL · AKIZISYON · KONTNI",
        facts: [
          ["PWOBLÈM", "Moun pé vwè-w onlo, men sa pa ni valè si sa pa ka menné bon kontak."],
          ["MISYON", "Fè vizibilité é akizisyon a on ajans imobilyé vansé."],
          ["SA KI FÈT", "Kontni, landing pages, stratéji éditoryal, rézososyal, analiz a sa moun ka chèché é tracking."],
          ["RÉZILTA", "On sistenm dijital pli annòd pou trapé demann, suiv pèfòwmans é menné kliyan ki kalifyé."],
          ["POU KIMOUN", "Egila, ajans imobilyé."],
        ],
      },
      {
        title: "GRAN DISTRIBISYON",
        tags: "DONÉ · OTOMATIZASYON · SÉGMANTASYON",
        facts: [
          ["PWOBLÈM", "On baz kliyan ka pèd valè vit lè doublon, enfòmasyon ki manké é gwoup ki pa klè ka anmasé."],
          ["MISYON", "Chanjé on fichyé kliyan an on zouti komèsyal ou pé sèvi vréman."],
          ["SA KI FÈT", "Netwayaj, klasman, fòm lyanné, tablo pou suiv, é séparasyon pa komin, profil oben tip kliyan."],
          ["RÉZILTA", "On baz annòd, paré pou kanpay WhatsApp oben imèl pli prési, èvè mwens tan pèd ka woufè doné-la."],
          ["POU KIMOUN", "Promocash."],
        ],
      },
      {
        title: "AJANS MAWKÉTING DIJITAL",
        tags: "SEA · SOCIAL ADS · PÈFÒWMANS",
        facts: [
          ["PWOBLÈM", "Lè bidjé-la ka monté, fò chak désizyon parèt adan chif-la : pri, kalité a trafik-la é rentabilité."],
          ["MISYON", "Menné é optimizé kanpay akizisyon asi on pòtfolyo an plizyè lang."],
          ["SA KI FÈT", "SEA, Social Ads, A/B tests, jèsyon a CPC é bidjé, Quality Score, tracking, analiz a rechèch é reporting."],
          ["RÉZILTA", "Travay asi plis ki 100 kont an plizyè lang, èvè suiv a ROI, CA é CPA ajékontinyé."],
          ["POU KIMOUN", "Yateo, ajans dévlòpman dijital."],
        ],
      },
      {
        title: "AJAN & MODÈL IA",
        tags: "IA · OTOMATIZASYON · ÒWGANIZASYON",
        facts: [
          ["PWOBLÈM", "Mésaj, rapèl é travay ki ka wouvin touttan ka manjé tan, atansyon é opòtinité."],
          ["MISYON", "Fè ajan é otomatik ki pé fè on pawti a travay-lasa tousèl."],
          ["SA KI FÈT", "Lyannaj èvè WhatsApp, Instagram, imèl, Shopify, Klaviyo, Brevo, n8n é WooCommerce."],
          ["RÉZILTA", "94% a mésaj-la trété san entèvansyon, é plis ki 12 000 konvèsasyon jéré chak mwa."],
          ["POU KIMOUN", "Dayloom."],
        ],
      },
    ],
    ctaEyebrow: "ÈS YONN ADAN SÉ PWOBLÈM-LASA KA SANM SA OU NI ?",
    ctaHeadline: "PALÉ-MWEN DÈ PWOBLÈM A-W.",
    ctaText: "Ou pa bizwen ja sav solisyon-la. Di-mwen ka ki ka frenné, ka ou vlé rivé fè é ka ou ja éséyé.",
    cta: "PALÉ-MWEN DÈ PWOJÉ A-W ↗",
  },
  contactPage: {
    eyebrow: "KONTAK / PWOJÉ A-W",
    headline: ["DI-MWEN", "KA KI KA FRENNÉ PWOJÉ-LA."],
    intro: "Ou pa bizwen ja ni solisyon-la. Di-mwen ka ou vlé fè, ka ki ka frenné pwojé-la é ola ou vlé rivé.",
    email: "IMÈL",
    phone: "TÉLÉFÒN",
    whatsapp: "WHATSAPP",
  },
};

const gcfCode = "gcf" as Locale;

if (!localizedLocales.some((code) => String(code) === "gcf")) {
  const afterPt = localizedLocales.findIndex((code) => code === "pt");
  localizedLocales.splice(afterPt >= 0 ? afterPt + 1 : 0, 0, gcfCode);
}

if (!allLocales.some((code) => String(code) === "gcf")) {
  const afterPt = allLocales.findIndex((code) => code === "pt");
  allLocales.splice(afterPt >= 0 ? afterPt + 1 : allLocales.length, 0, gcfCode);
}

if (!localeOptions.some((option) => String(option.code) === "gcf")) {
  const afterPt = localeOptions.findIndex((option) => option.code === "pt");
  localeOptions.splice(afterPt >= 0 ? afterPt + 1 : localeOptions.length, 0, {
    code: gcfCode,
    label: "Kréyòl",
  });
}

(copyByLocale as unknown as Record<string, SiteCopy>).gcf = gcfCopy;

export { gcfCopy };
