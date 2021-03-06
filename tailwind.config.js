const serifBaseFonts = [
  "Iowan Old Style",
  "Apple Garamond",
  "Baskerville",
  "Times New Roman",
  "Droid Serif",
  "Times",
  "Source Serif Pro",
  "serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
]
const sansSerifBaseFonts = [
  "-apple-system",
  "BlinkMacSystemFont",
  "avenir next",
  "avenir",
  "Helvetica Neue",
  "Segoe UI",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Fira Sans",
  "Droid Sans",
  "Helvetica",
  "Arial",
  "sans-serif",
]

module.exports = {
  important: false,
  purge: {
    enabled: true,
    layers: ["base", "components", "utilities"],
    content: [
      "./src/**/*.js",
      "./site/*.njk",
      "./site/**/*.njk",
      "./site/**/*.11ty.js",
    ],
  },
  theme: {
    fontFamily: {
      sans: ["news-gothic-std", ...sansSerifBaseFonts],
      serif: ["adobe-caslon-pro", ...serifBaseFonts],
    },
    extend: {
      fontSize: {
        "2xl": "22px",
      },
      colors: {
        brown: {
          bg: "#ede4cb",
          "bg-light": "#eae7de",
        },
        red: {
          default: "#bf3000",
        },
        blue: {
          link: "#539fbb",
        },
        gray: {
          paper: "#f0f0f0",
        },
        yellow: {
          paper: "#f3f5a7",
        },
        orange: {
          bg: "#fbb21b",
        },
      },
    },
  },
  plugins: [],
}
