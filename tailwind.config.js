/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // For Next.js 'pages' directory
    "./components/**/*.{js,ts,jsx,tsx}", // For 'components' directory
    "./app/**/*.{js,ts,jsx,tsx}", // For 'app' directory (Next.js app router)
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')], // Add forms plugin if needed
};
 