/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F1EFEC',
          100: '#E8E3DE',
          200: '#D4C9BE',
          300: '#C0AFA3',
          400: '#AC9588',
          500: '#98806D',
          600: '#7A6452',
          700: '#5C4837',
          800: '#3E2C1C',
          900: '#030303',
        },
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '44px'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 30px rgba(59, 130, 246, 0.15)',
      },
    },
  },
  plugins: [],
}
