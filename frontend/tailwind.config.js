/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        jersey: ['"Jersey 25"', "sans-serif"],
      },
      keyframes: {
        fill: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        fill: "fill 4s linear forwards",
      },
    },
  },
  plugins: [],
};
