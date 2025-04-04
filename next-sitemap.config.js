/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://www.liftmg.ru",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: "weekly",
    priority: 0.7,
    exclude: [
        "/fsjfnsdklflsdkfdferkg",
        "/stati/9asd23crecsw123",
        "/politika-konfidentsialnosti",
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/fsjfnsdklflsdkfdferkg", "/stati/9asd23crecsw123", "/politika-konfidentsialnosti"],
            },
        ],
        additionalSitemaps: [
            "https://www.liftmg.ru/sitemap_index.xml",
        ],
    },
};
