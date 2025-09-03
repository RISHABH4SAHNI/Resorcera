/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        resorcera: {
          brown: '#8B4513',
          ochre: '#CC7722',
          cream: '#F5E6D3',
          mustard: '#FFDB58',
          'light-brown': '#D2B48C',
          'dark-brown': '#654321',
        },
        primary: {
          50: '#FEF7ED',
          100: '#FDECD1', 
          200: '#F9D5A3',
          300: '#F5BE74',
          400: '#F1A745',
          500: '#CC7722',
          600: '#A35F1B',
          700: '#7A4714',
          800: '#512F0D',
          900: '#281706',
        }
      },
    },
  },
  plugins: [],
}