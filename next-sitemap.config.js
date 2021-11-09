module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/secret" },
      { userAgent: "*", disallow: "/en/*" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/server-sitemap.xml`,
    ],
  },
  exclude: ["/secret", "/en/*"],
};
