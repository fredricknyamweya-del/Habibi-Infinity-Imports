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
        muted: '#A0A0A6',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        glow: '0 0 28px rgba(212, 185, 120, 0.12)',
      },
    },
  },
  plugins: [],
};
