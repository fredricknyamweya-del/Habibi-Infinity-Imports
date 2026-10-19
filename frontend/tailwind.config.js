export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0B0D',
        charcoal: '#16161A',
        gold: {
          DEFAULT: '#D4B978',
          soft: '#F1E3BC',
        },
        ivory: '#F7F3EA',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
