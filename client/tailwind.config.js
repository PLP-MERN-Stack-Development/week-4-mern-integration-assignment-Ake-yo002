module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#4f46e5',
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}