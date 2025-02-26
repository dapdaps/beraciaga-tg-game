import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat'],
        cherryBomb: ['Cherry Bomb'],
      },
      colors: {
        primary: '#4B371F',
      },
      backgroundColor: {
        primary: '#F7F9EA', 
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      padding: {
        "tabbar": "4.25rem",
      },
      boxShadow: {
        shadow1: "10px 10px 0 0 rgba(0, 0, 0, 0.25);",
        shadow2: "6px 6px 0px 0px rgba(0, 0, 0, 0.25)"
      }
    },
  },
  plugins: [],
};
export default config;
