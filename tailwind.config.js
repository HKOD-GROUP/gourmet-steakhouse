/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Palette « blanc & bordeaux » du Gourmet Steakhouse
        blanc: '#FFFFFF',
        lin: '#F6F1EC',
        bordeaux: {
          DEFAULT: '#5E1623',
          fonce: '#3F0E18',
          clair: '#7A2232',
        },
        encre: '#1E1618',
        gris: '#6E6164',
        filet: '#E4DBD6',
        cuivre: '#B8743F',
      },
      fontFamily: {
        display: ['"Big Shoulders Display Variable"', 'Impact', 'sans-serif'],
        body: ['"Newsreader Variable"', 'Georgia', 'serif'],
      },
      maxWidth: {
        site: '1200px',
        prose: '38rem',
      },
    },
  },
  plugins: [],
};
