/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        code: "'Fira Code', monospace",
      },
      colors: {
        ebony: '#010C15',
        midnight: '#011627',
        blueGrey: '#607B96',
        lavender: '#E5E9F0',
        aquamarine: '#43D9AD',
        gunmetal: '#1E2D3D',
        apricot: '#FEA55F',
        ulrtramarine: '#5565E8',
        plantation: '#175553',
      },
      backgroundImage: {
        'gradient-150deg': 'linear-gradient(150deg, var(--tw-gradient-stops))',
      },
      content: {
        mapPin: 'url("/src/assets/map-pin.svg")',
      },
    },
  },
  plugins: [],
};
