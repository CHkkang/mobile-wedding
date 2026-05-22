const withOpacity = (variableName) => ({ opacityValue }) => {
  if (opacityValue === undefined) {
    return `rgb(var(${variableName}))`;
  }

  return `rgb(var(${variableName}) / ${opacityValue})`;
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wedding: {
          ivory: withOpacity('--color-wedding-ivory'),
          ink: withOpacity('--color-wedding-ink'),
          accent: withOpacity('--color-wedding-accent'),
          white: withOpacity('--color-wedding-white'),
          mist: withOpacity('--color-wedding-mist'),
          frost: withOpacity('--color-wedding-frost'),
          blush: withOpacity('--color-wedding-blush'),
          sage: withOpacity('--color-wedding-sage'),
          champagne: withOpacity('--color-wedding-champagne'),
          petal: withOpacity('--color-wedding-petal'),
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
