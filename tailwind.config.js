/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: { 
        'playfair-display': '"Playfair Display", sans-serif',
        'montserrat': '"Montserrat", sans-serif',
        'inter': '"Inter", sans-serif'
      },
      animation: {
        themeUp: "themeUp 0.5s ease-out 1 forwards",
        themeDown: "themeDown 0.5s ease-out 1 forwards",
        theme2Up: "theme2Up 0.5s ease-out 1 forwards",
        theme2Down: "theme2Down 0.5s ease-out 1 forwards",
      }
    },
  },
  plugins: [],
}
