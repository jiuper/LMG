import {
    IcAccountBalanceWallet,
    IcHome,
    IcLeadCart,
    IcManageAccounts,
    IcSettings,
    IcShoppingCart,
} from "@/shared/assests/svg";

const ROUTES = {
    ADMIN_DEFAULT: () => "/admin",
    NEWS: () => "/admin/news",
    SECTION: () => "/admin/sections",
    PORTFOLIO: () => "/admin/portfolio",
    SETTINGS: (selectedTab: string) => `/account/settings/${selectedTab}`,
};

enum Belong {
    MOBILE_BOTTOM_NAVIGATION = "MOBILE_BOTTOM_NAVIGATION",
    MOBILE_MENU = "MOBILE_MENU",
    DESKTOP_SIDE_BAR_NAVIGATION = "DESKTOP_SIDE_BAR_NAVIGATION",
}

const ROUTING_MAP: {
    label: string;
    link: string;
    belong: { name: Belong; sortId: number }[];
    Icon?: React.FC<React.SVGAttributes<SVGElement>>;
}[] = [
    {
        label: "Статьти",
        link: ROUTES.ADMIN_DEFAULT(),
        belong: [
            { name: Belong.MOBILE_MENU, sortId: 1 },
            { name: Belong.DESKTOP_SIDE_BAR_NAVIGATION, sortId: 1 },
        ],
        Icon: IcHome,
    },
    {
        label: "Новости",
        link: ROUTES.NEWS(),
        belong: [
            { name: Belong.MOBILE_BOTTOM_NAVIGATION, sortId: 2 },
            { name: Belong.DESKTOP_SIDE_BAR_NAVIGATION, sortId: 2 },
            { name: Belong.MOBILE_MENU, sortId: 1 },
        ],
        Icon: IcHome,
    },
    {
        label: "Портфолио",
        link: ROUTES.PORTFOLIO(),
        belong: [
            { name: Belong.MOBILE_BOTTOM_NAVIGATION, sortId: 3 },
            { name: Belong.DESKTOP_SIDE_BAR_NAVIGATION, sortId: 3 },
            { name: Belong.MOBILE_MENU, sortId: 2 },
        ],
        Icon: IcHome,
    },
    {
        label: "Разделы",
        link: ROUTES.SECTION(),
        belong: [
            { name: Belong.MOBILE_BOTTOM_NAVIGATION, sortId: 3 },
            { name: Belong.DESKTOP_SIDE_BAR_NAVIGATION, sortId: 3 },
            { name: Belong.MOBILE_MENU, sortId: 2 },
        ],
        Icon: IcHome,
    },

    {
        label: "Настройки",
        link: ROUTES.SETTINGS("userData"),
        belong: [
            { name: Belong.MOBILE_MENU, sortId: 5 },
            { name: Belong.DESKTOP_SIDE_BAR_NAVIGATION, sortId: 5 },
        ],
        Icon: IcSettings,
    },
];

export { Belong, ROUTES, ROUTING_MAP };
