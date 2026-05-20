/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}" // <- Esta línea es la que le dice a Tailwind dónde buscar tus clases
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}