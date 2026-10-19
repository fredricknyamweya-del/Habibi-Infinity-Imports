export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: 'rgb(var(--color-obsidian) / <alpha-value>)',
        charcoal: 'rgb(var(--color-charcoal) / <alpha-value>)',
        gold: {
          DEFAULT: 'rgb(var(--color-gold) / <alpha-value>)',
          soft: 'rgb(var(--color-gold-soft) / <alpha-value>)',
        },
        ivory: 'rgb(var(--color-ivory) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-border) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        glow: '0 0 28px rgb(var(--color-gold) / 0.14)',
      },
    },
  },
  plugins: [],
};
