const production = process.env.NODE_ENV === "production"

const host = production
  ? "https://projects.southsideweekly.com"
  : "http://localhost:8080"

const baseurl = production ? "/prison-vaccines" : ""

// TODO: Update metadata
module.exports = {
  name: "Stateville Prison Vaccines | South Side Weekly",
  title: "Stateville Prison Vaccines | South Side Weekly",
  description: "",
  type: "website",
  baseurl,
  url: `${host}${baseurl}`,
  production,
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  locale: "en-us",
}
