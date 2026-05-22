/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wedding: {
          ivory: '#F7F4EF',
          ink: '#2B2B2B',
          accent: '#AFA49B',
          white: '#FFFCF7',
          mist: '#ECEFF0',
          frost: '#E7ECEE',
        },
      },
      fontFamily: {
        display: ['Noto Sans KR', 'sans-serif'],
        body: ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
