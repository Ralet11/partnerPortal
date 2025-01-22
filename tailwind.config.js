// tailwind.config.js (o tailwind.config.mjs)

import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FF8852",
          DEFAULT: "#F15A24",
          dark: "#C04415",
        },
        secondary: {
          light: "#FFD5C2",
          DEFAULT: "#FFC4AD",
          dark: "#E6AE96",
        },
        background: {
          light: "#E2E8F0",
          DEFAULT: "#E2E8F0",
          dark: "#0F1117",
        },
        card: {
          light: "#FFFFFF",
          DEFAULT: "#FFFFFF",
          dark: "#171923",
        },
        text: {
          primary: "#1E293B",
          secondary: "#64748B",
          light: "#94A3B8",
        },
        danger: {
          DEFAULT: "#FF5A60",
        },
        success: {
          DEFAULT: "#4FD1C5",
        },
      },
    },
  },
  plugins: [
    tailwindScrollbar({ nocompatible: true }), 
  ],
};
