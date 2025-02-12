const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        appDir: true,
    },
    productionBrowserSourceMaps: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        prependData: `@import "@/shared/styles/breakpoints.scss"; @import "@/shared/styles/mixins.scss"; @import "@/shared/styles/variables.scss"; `,
    },
    pageExtensions: ["page.tsx", "page.ts"],
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_PROTOCOL_API,
                hostname: "**",
                port: "",
                pathname: "**",
            },
        ],
        unoptimized: true,
    },
    
    webpack(config) {
          config.resolve.alias = {
              ...config.resolve.alias,
              "@": path.resolve(__dirname, "./src"), // Алиас для src
              "@components": path.resolve(__dirname, "./src/components"), // Алиас для компонентов
              "@styles": path.resolve(__dirname, "./src/shared/styles"), // Алиас для стилей
              "@assets": path.resolve(__dirname, "./src/shared/assests"), // Алиас для ассетов
          };
        config.module.rules.push(
            {
                test: /\.(mp4|webm|ogg|mp3)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "static/media/",
                                publicPath: "/_next/static/media/",
                            },
                        },
                    },
                ],
          },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            prettier: false,
                            svgo: true,
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: "preset-default",
                                        params: {
                                            overrides: { removeViewBox: false },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    "url-loader",
                ],
            },
        );

        return config;
    },
};

module.exports = nextConfig;