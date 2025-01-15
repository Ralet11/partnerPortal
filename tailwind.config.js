/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7E67CA',
          DEFAULT: '#5A3FA8',
          dark: '#47348D',
        },
        secondary: {
          light: '#F5AFC4',
          DEFAULT: '#F07EA9',
          dark: '#D6718F',
        },
        background: {
          light: '#F7F9FC',
          DEFAULT: '#EBEFF4',
          dark: '#1C2237',
        },
        card: {
          light: '#FFFFFF',
          DEFAULT: '#FFFFFF',
          dark: '#0F172A',
        },
        text: {
          primary: '#2F3A4F',
          secondary: '#697184',
          light: '#A4AEC4',
        },
        danger: {
          DEFAULT: '#FF5A60',
        },
        success: {
          DEFAULT: '#4FD1C5',
        },
      },
    },
  },
  plugins: [],
}
