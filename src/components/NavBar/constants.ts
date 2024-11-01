import { Routes } from "@/shared/constants/Routing";

type NavbarTypeProps = { label: string; url?: string; items?: { label: string; url: string }[] }[];
export const items: NavbarTypeProps = [
    {
        label: "Реклама",
        items: [
            {
                label: "Реклама ПВЗ",
                url: `${`${Routes.BUILDING}/${1}`}`,
            },
            {
                label: "Реклама в фитнес клубах",
                url: `${`${Routes.BUILDING}/${1}`}`,
            },
            {
                label: "Реклама в торговых центрах",
                url: `${`${Routes.BUILDING}/${1}`}`,
            },
            {
                label: "Реклама в бизнес центрах",
                url: Routes.BUILDING,
            },
            {
                label: "Реклама в жилых домах",
                url: Routes.BUILDING,
            },
        ],
    },

    {
        label: "Полезное",
        items: [
            {
                label: "Статьи",
                url: Routes.ARTICLES,
            },
            {
                label: "Новости",
                url: Routes.NEWS,
            },
            {
                label: "Закон о рекламе",
                url: Routes.ADVERTISING,
            },
        ],
    },
    {
        label: "О компании",
        items: [
            {
                label: "История компании",
                url: Routes.ABOUTUS,
            },
            {
                label: "Доркументы",
                url: Routes.NEWS,
            },
            {
                label: "Наша команда",
                url: Routes.NEWS,
            },
        ],
    },
    {
        label: "Портфолио",
        url: Routes.PORTFOLIO,
    },
    {
        label: "Контакты",
        url: Routes.CONTACTS,
    },
];
