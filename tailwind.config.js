/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        violet: "#5B2C98",         // Deep Violet (primary brand)
        lavender: "#C8A2FF",       // Light Lavender (secondary brand)
        purpleAccent: "#8E44EC",   // Bright Purple (CTA highlights)
        charcoal: "#2D2D2D",       // Neutral text
        mutedBlue: "#6C8AE4",      // Analytics & buttons
        success: "#27AE60",        // Progress success
        warning: "#F1C40F",        // Alerts
        error: "#E74C3C",          // Errors
        offWhite: "#F9F9FB"        // Backgrounds
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    }
  },
  plugins: [],
};