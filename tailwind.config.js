/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Path to all React components
    "./public/index.html"          // Path to HTML file
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors (optional)
        'crypto-blue': '#3b82f6',
        'crypto-green': '#10b981',
        'crypto-red': '#ef4444',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite', // Custom animation
      }
    },
  },
  plugins: [],
}