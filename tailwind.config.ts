import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FAFAFA",
        ink: "#1D1D1F",
        muted: "#5C6778",
        line: "#E3E7EE",
        accent: {
          DEFAULT: "#0071E3",
          hover: "#1858C4",
          soft: "#EAF2FF",
        },
      },
      boxShadow: {
        card: "0 2px 12px rgba(28, 36, 48, 0.025)",
        pop: "0 16px 48px rgba(28, 36, 48, 0.16)",
      },
      borderRadius: {
        card: "20px",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
