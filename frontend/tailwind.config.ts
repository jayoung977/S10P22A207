const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/src/components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        "small-1": "#0597FF",
        "small-2": "#7100C7",
        "small-3": "#F65742",
        "small-4": "#86BF15",
        "small-5": "#8A86CC",
        "small-6": "#E6A1C9",
        "small-7": "#4E00C7",
        "small-8": "#7CB576",
        "small-9": "#14A3A1",
        "small-10": "#FBB938",
        "small-11": "#326AF3",
        "small-12": "#4CA951",
        "small-13": "#65146A",
        "small-14": "#E2E5EE",
        "small-15": "#005955",
        "button-1": "#1454FF",
        "button-2": "#DFE3EB",
        "textColor-1": "#343643",
        "textColor-2": "#FFFFFF",
        "big-1": "#FFFFFF",
        "background-1": "#F1F3F8",
      },
      keyframes: {
        rainbow: {
          "0%": { backgroundColor: "red" },
          "14%": { backgroundColor: "orange" },
          "28%": { backgroundColor: "yellow" },
          "42%": { backgroundColor: "green" },
          "57%": { backgroundColor: "blue" },
          "71%": { backgroundColor: "indigo" },
          "85%": { backgroundColor: "violet" },
          "100%": { backgroundColor: "red" },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
