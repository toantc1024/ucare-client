/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      animation: {
        piing: "piing 1.5s linear infinite",
        piingg: "piingg 1.5s linear infinite",
      },
      keyframes: {
        piing: {
          "0%": {
            transform: "scale(1.2)",
          },
          "50%": {
            transform: "scale(1.8)",
            opacity: 0.5,
          },
          "100%": {
            transform: "scale(2.4)",
            opacity: 0,
          },
        },
        piingg: {
          "0%": {
            transform: "scale(1.2)",
            opacity: 0.6,
          },
          "50%": {
            transform: "scale(1.6)",
            opacity: 0.5,
          },
          "100%": {
            transform: "scale(2)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [require("./src/assets/animationDelay")],
};
