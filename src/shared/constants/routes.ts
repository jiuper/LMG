import { IcHome } from "@/shared/assests/svg";

const ROUTES = {
    NEWS: () => "/admin/news",
    ARTICLES: () => "/admin/articles",
    SECTION: () => "/admin/sections",
    PORTFOLIO: () => "/admin/portfolio",
    FEEDBACK: () => "/admin/feedback",
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
        link: ROUTES.ARTICLES(),
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
        label: "Отзывы",
        link: ROUTES.FEEDBACK(),
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
];

export { Belong, ROUTES, ROUTING_MAP };
