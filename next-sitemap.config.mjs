/** @type {import('next-sitemap').IConfig} */

export default {
  siteUrl: process.env.SITE_URL || 'http://localhost:8080',
  changefreq: 'daily',
  generateRobotsTxt: true,
  outDir: './out',
  sitemapSize: 7000,
  robotsTxtOptions: {
    transformRobotsTxt: async (config, robotsTxt) => {
      return robotsTxt.replace('sitemap', 'sitemap-0');
    },
    // additionalSitemaps: [`${process.env.SITE_URL || 'http://localhost:8080'}/sitemap-0.xml`],
  },
}
