/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',   // Tailwind blue-600
        secondary: '#1e3a8a', // Tailwind blue-900
      },
    },
  },
  plugins: [],
};


