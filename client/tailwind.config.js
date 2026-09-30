/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#292525',
        cream: '#fbf7f1',
        butter: '#f4d889',
        coral: '#dd765d',
        sage: '#a7b79d',
        blush: '#f8e5dd'
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif']
      },
      boxShadow: {
        soft: '0 12px 35px rgba(51, 39, 33, 0.09)'
      }
    }
  },
  plugins: []
};
