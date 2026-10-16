export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: {
      bg: '#070b0a', surface: '#0d1412', raised: '#131c19', line: '#1f2b27',
      accent: { DEFAULT: '#1ed760', dark: '#169c46' },
      muted: '#8a9a94'
    },
    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
  } },
  plugins: []
};
