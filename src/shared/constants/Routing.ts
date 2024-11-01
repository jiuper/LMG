export interface IRouting {
    path: string;
    name: string;
    mode: boolean;
}
export const Routes = {
    HOME: "/",
    ARTICLES: "/articles",
    CONTACTS: "/contacts",
    ABOUTUS: "/aboutus",
    POLICY: "/policy",
    BUILDING: "/building",
    LIFTMEDIA: "/liftmedia",
    POSTERPVZ: "/posterpvz",
    POSTERFITNES: "/posterfitnes",
    POSTERTC: "/postertc",
    POSTERBC: "/posterbc",
    NEWS: "/news",
    PORTFOLIO: "/portfolio",
    HISTORY: "/historycompany",
};

export const Routing = {
    ADMIN_DEFAULT: "/admin",
    NEWS: "/admin/news",
    PORTFOLIO: "/admin/portfolio",
    SECTION: "/admin/sections",
    SETTINGS: "/account/settings/[selectedTab]",
    SETTINGS_DEFAULT: "/account/settings/userData",
};

export const ROUTING_IS_HEADER = [
    { href: Routing.ADMIN_DEFAULT, title: "Главная", isUser: false },
    { href: Routing.NEWS, title: "Новости", isUser: false },
    { href: Routing.PORTFOLIO, title: "Портфолио", isUser: false },
    { href: Routing.SECTION, title: "Разделы", isUser: false },
];
