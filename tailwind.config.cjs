/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'comfortaa': ['Comfortaa', 'cursive']
      },
      colors: {
        primary:"#292E82",
        secondary:  "#6D6AC1"
      },
      width: {
        "80vw": "80vw",
      },
      spacing: {
        "10vw": "10vw",
      },
      gridTemplateColumns: {
        "30-60": "30% 60%",
      },
      dropShadow: {
        "project-image": "4px 4px 6px rgba(0, 0, 0, 0.4)"
      },
      container: {
        screens: {
          DEFAULT: "365px",
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px"
        }
      }
      },
  },
  plugins: [],
}
