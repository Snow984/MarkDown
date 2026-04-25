/** @type {import('tailwindcss').Config} */
import tailwindTypography from '@tailwindcss/typography'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindTypography()],
  corePlugins: {
    preflight: false,
  },
}