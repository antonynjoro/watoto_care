/** @type {import('tailwindcss').Config} */
import { withUt } from "uploadthing/tw";


// the withUt is a wrapper around the tailwindcss function that
// adds the uploadthing plugin to the tailwind config.
//

module.exports = withUt({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['Nunito', "sans-serif"],
      },
      colors: {
        floral_white: {
          DEFAULT: "#fffcf2",
          50: "#FFFCF2",
          100: "#FFF4D1",
          200: "#FFEDB2",
          300: "#FFE694",
          400: "#FFDF75",
          500: "#FFD857",
          600: "#FFD138",
          700: "#FFCA1A",
          800: "#FAC000",
          900: "#DBA900",
          950: "#BD9100",
        },
        timberwolf: {
          DEFAULT: "#ccc5b9",
          50: "#f7f6f5",
          100: "#edebe7",
          200: "#dbd6cd",
          300: "#ccc5b9",
          400: "#ab9e8c",
          500: "#9a8875",
          600: "#8d7969",
          700: "#766558",
          800: "#61544b",
          900: "#50453e",
          950: "#2a2320",
        },
        black_olive: {
          DEFAULT: "#403d39",
          50: "#f6f5f5",
          100: "#e9e6e4",
          200: "#d4cfcd",
          300: "#b7afa9",
          400: "#91867f",
          500: "#766b64",
          600: "#655d55",
          700: "#555049",
          800: "#494541",
          900: "#403d39",
          950: "#292723",
        },
        charcoal: {
          DEFAULT: "#252422",
          50: "#f6f5f5",
          100: "#e8e6e5",
          200: "#d3d1ce",
          300: "#b4b0ac",
          400: "#8d8883",
          500: "#736e67",
          600: "#625e58",
          700: "#524f4c",
          800: "#484642",
          900: "#3f3e3a",
          950: "#252422",
        },
        flame: {
          DEFAULT: "#ffca99",
          50: "#fff6ed",
          100: "#ffebd5",
          200: "#ffca99",
          300: "#ffb272",
          400: "#fd873a",
          500: "#fc6613",
          600: "#ed4a09",
          700: "#c4360a",
          800: "#9c2b10",
          900: "#7d2611",
          950: "#441106",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
});
