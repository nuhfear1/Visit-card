import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        palette: {
          orange: "#F44A22",
          midnight: "#161616",
          silver: "#FEF8E8",
          grey: "#E4E2E3",
          stone: "#A8AAAC",
        }
      },
    },
  },
  plugins: [],
};
export default config;
