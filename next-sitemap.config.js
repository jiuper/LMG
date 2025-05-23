const axios = require("axios");

const API_BASE = process.env.NEXT_PUBLIC_ROUTES_URL_BACK || "http://localhost:3000";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://www.liftmg.ru",
    generateRobotsTxt: true,
    changefreq: "weekly",
    priority: 0.7,
    exclude: [
        "/admin",
        "/admin/*",
        "/stati/zakon-o-reklame",
        "/politika-konfidentsialnosti",
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin",
                    "/admin/*",
                    "/stati/zakon-o-reklame",
                    "/politika-konfidentsialnosti",
                ],
            },
        ],
    },

    additionalPaths: async (config) => {
        const paths = [];

        try {
            const { data: sections } = await axios.get(`${API_BASE}/section`);

            for (const section of sections) {
                const sectionPath = `/${section.urlTitle}`;
                paths.push({ loc: sectionPath });

                const resCat = await axios.get(`${API_BASE}/category`);
                const categories = resCat.data.filter(cat => cat.sectionId === section.id);

                for (const category of categories) {
                    const categoryPath = `${sectionPath}/${category.urlTitle}`;
                    paths.push({ loc: categoryPath });

                    const resArea = await axios.get(`${API_BASE}/category-area`, {
                        params: { categoryId: category.id },
                    });

                    for (const area of resArea.data) {
                        const areaPath = `${categoryPath}/${area.urlTitle}`;
                        paths.push({ loc: areaPath });

                        const resBuild = await axios.get(`${API_BASE}/build`, {
                            params: { categoryAreaId: area.id },
                        });

                        for (const build of resBuild.data) {
                            const buildPath = `${areaPath}/${build.urlTitle}`;
                            paths.push({ loc: buildPath });

                            // 🔍 Лог добавленных путей
                            console.log("[SITEMAP PATH ADDED]:", buildPath);
                        }
                    }
                }
            }

        } catch (error) {
            console.error("[SITEMAP ERROR]:", error?.response?.data || error.message || error);
        }

        return paths;
    },
};
