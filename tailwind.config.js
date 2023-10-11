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
          100: "#634c00",
          200: "#c69800",
          300: "#ffcd2a",
          400: "#ffe48d",
          500: "#fffcf2",
          600: "#fffcf3",
          700: "#fffdf6",
          800: "#fffef9",
          900: "#fffefc",
        },
        timberwolf: {
          DEFAULT: "#ccc5b9",
          100: "#2d2821",
          200: "#5a5141",
          300: "#877962",
          400: "#ab9f8b",
          500: "#ccc5b9",
          600: "#d6d0c6",
          700: "#e0dcd4",
          800: "#eae8e3",
          900: "#f5f3f1",
        },
        black_olive: {
          DEFAULT: "#403d39",
          100: "#0d0c0c",
          200: "#1a1917",
          300: "#272523",
          400: "#34312e",
          500: "#403d39",
          600: "#6a655e",
          700: "#928c84",
          800: "#b6b2ad",
          900: "#dbd9d6",
        },
        eerie_black: {
          DEFAULT: "#252422",
          100: "#070707",
          200: "#0f0e0e",
          300: "#161615",
          400: "#1e1d1b",
          500: "#252422",
          600: "#53514c",
          700: "#807d76",
          800: "#aba8a4",
          900: "#d5d4d1",
        },
        flame: {
          DEFAULT: "#eb5e28",
          100: "#321205",
          200: "#652309",
          300: "#97350e",
          400: "#ca4713",
          500: "#eb5e28",
          600: "#ef7f53",
          700: "#f39f7e",
          800: "#f7bfa9",
          900: "#fbdfd4",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
});
