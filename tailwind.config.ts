import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cerulean blue palette (true cerulean #007BA7 as the primary accent)
        outpost: {
          navy: "#0A2E3D",
          deep: "#00688C",
          blue: "#007BA7",
          sky: "#3AAAD1",
          light: "#8FD8ED",
          cream: "#FBF8F1",
          sand: "#F1EAD9",
          gold: "#C9A24B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "outpost-gradient":
          "linear-gradient(135deg, #0A2E3D 0%, #007BA7 45%, #8FD8ED 100%)",
        "outpost-radiance":
          "radial-gradient(circle at 50% 0%, rgba(143,216,237,0.35) 0%, rgba(251,248,241,0) 60%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(10, 46, 61, 0.15)",
        "glass-lg": "0 20px 60px -12px rgba(10, 46, 61, 0.25)",
      },
      borderRadius: {
        xl2: "1.75rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
