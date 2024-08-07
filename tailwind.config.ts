import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        primary: "#5E2BFF",
        secondary: "#50D8D7",
        accent: "#F0A202",
        offWhite: "#EFE9F4",
        dark: "#282828",
      },
    },
  },
  plugins: [],
};
export default config;
