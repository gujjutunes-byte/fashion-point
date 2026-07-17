/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        charcoal: '#161513',
        slate: '#231f1a',
        gold: '#c9a04a',
        goldlight: '#e8d4a0',
        bone: '#f3efe6',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      backgroundImage: {
        'gold-grad': 'linear-gradient(120deg, #8a6a26, #e8d4a0 45%, #c9a04a 65%, #8a6a26)',
      },
    },
  },
  plugins: [],
};
