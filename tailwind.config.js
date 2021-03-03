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
    enabled: process.env.NODE_ENV === "production",
    layers: ["base", "components", "utilities"],
    content: ["./src/**/*.js", "./site/**/*.njk", "./site/**/*.11ty.js"],
  },
  theme: {
    fontFamily: {
      sans: ["news-gothic-std", ...sansSerifBaseFonts],
      serif: ["adobe-caslon-pro", ...serifBaseFonts],
    },
  },
  plugins: [],
}
