const production = process.env.NODE_ENV === "production"

const host = production ? process.env.SITE_HOST : "http://localhost:8080"

const baseurl = production ? "/prison-vaccines" : ""

// TODO: Update metadata
module.exports = {
  name: "South Side Weekly",
  title:
    "Inmates at Stateville Correctional Center describe COVID-19 behind bars: ‘Everything that was done felt like a punishment’ | South Side Weekly",
  description:
    "“I fear more of us will perish due to incompetence, neglect and apathy,” said Williams La’Roy Peeples Jr.",
  type: "article",
  publisher: "http://facebook.com/southsideweekly",
  facebookPageId: "622453664466624",
  twitterAuthor: "@southsideweekly",
  articleAuthor: "Madison Muller and Cheyanne M. Daniels",
  baseurl,
  host,
  url: `${host}${baseurl}`,
  production,
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  locale: "en-US",
}
