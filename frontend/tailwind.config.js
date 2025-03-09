/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        viga: ["Viga", "sans-serif"],
        alatsi: ["Alatsi", "sans-serif"],
      },
      animation: {
        reveal: "reveal 0.7s forwards",
        float: "float 1s infinite ease-in-out",
        shimmer: "shimmer 2s infinite linear",
        fadeIn: "fadeIn 0.5s ease-in",
        successPulse: "successPulse 2s ease-in-out",
        "success-pulse": "success-pulse 2s ease-out forwards",
        "success-ring": "success-ring 2s ease-out forwards",
        "success-check": "success-check 0.5s ease-out forwards 0.4s",
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
      keyframes: {
        reveal: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        successPulse: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "success-pulse": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(2)",
            opacity: "0",
          },
        },
        "success-ring": {
          "0%": {
            transform: "scale(0.7)",
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "success-check": {
          "0%": {
            transform: "scale(0)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
