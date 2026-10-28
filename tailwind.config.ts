import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F5F6F8",
        ink: "#1C2430",
        muted: "#5C6778",
        line: "#E3E7EE",
        accent: {
          DEFAULT: "#1F6FEB",
          hover: "#1858C4",
          soft: "#EAF2FF",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(28, 36, 48, 0.04), 0 8px 24px rgba(28, 36, 48, 0.06)",
        pop: "0 16px 48px rgba(28, 36, 48, 0.16)",
      },
      borderRadius: {
        card: "16px",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
