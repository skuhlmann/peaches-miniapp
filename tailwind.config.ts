import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Work Sans"', "sans-serif"],
        heading: ["auster", "serif"],
      },
      colors: {
        brand: {
          orange: "#E46C1E",
          darkOrange: "rgba(228, 108, 30, 0.3)",
          black: "#0E1418",
          red: "#F5253D",
          green: "#419361",
          white: "#ffffff",
          gray: "#1f1f1f",
          blue: "#9EB4C7",
        },
      },
      backgroundColor: {
        DEFAULT: "#0E1418",
      },
    },
  },
  plugins: [],
};
export default config;
