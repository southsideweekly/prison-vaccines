require("dotenv").config()

const fs = require("fs")
const path = require("path")
const Image = require("@11ty/eleventy-img")
const { baseurl } = require("./site/_data/site")

async function resizeImage(src, sizes, outputFormat = "jpeg") {
  const stats = await Image(src, {
    widths: [+sizes.split("x")[0]],
    formats: [outputFormat],
    outputDir: "./site/img",
    urlPath: `${baseurl}/img/`,
    useCache: false,
  })

  const props = stats[outputFormat].slice(-1)[0]
  return props.url
}

module.exports = function (eleventyConfig) {
  const markdownIt = require("markdown-it")
  const markdownItLinkAttributes = require("markdown-it-link-attributes")

  // Set target="_blank" and rel="noopener noreferrer" on external links
  const markdownLib = markdownIt({
    html: true,
  }).use(markdownItLinkAttributes, {
    pattern: /^https?:/,
    attrs: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  })
  eleventyConfig.setLibrary("md", markdownLib)
  eleventyConfig.addFilter("markdown", (value) => markdownLib.render(value))
  eleventyConfig.addPairedShortcode("mdBlock", (content) =>
    markdownLib.render(content)
  )

  // This allows Eleventy to watch for file changes during local development.
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addNunjucksAsyncShortcode("resizeImage", resizeImage)

  // Used to avoid nunjucks escaping includes of imported CSS
  // cssnano was converting media queries with ID values to "{#"
  // Can also be used for nunjucks-style import within 11ty.js files
  eleventyConfig.addShortcode("includefile", function (filename) {
    return fs.readFileSync(
      path.join(__dirname, "site", "_includes", filename),
      "utf8"
    )
  })

  // Create a collection of items without permalinks so that we can reference them
  // in a separate shortcode to pull in partial content directly
  eleventyConfig.addCollection("partials", (collectionApi) =>
    collectionApi.getAll().filter(({ data: { permalink } }) => !permalink)
  )

  eleventyConfig.addFilter(
    "dtformat",
    (dt) => `${dt.toISOString().split(".")[0]}+00:00`
  )

  eleventyConfig.addPassthroughCopy({
    "site/img": "img",
  })

  return {
    dir: {
      input: "site/",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,
  }
}
