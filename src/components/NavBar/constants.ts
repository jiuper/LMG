import { Routes } from "@/shared/constants/Routing";

type NavbarTypeProps = { label: string; url?: string; items?: { label: string; url: string }[] }[];
export const items: NavbarTypeProps = [
    {
        label: "Реклама",
        items: [
            {
                label: "Реклама ПВЗ",
                url: `${`${Routes.EQUIPMENTS}/${1}`}`,
            },
            {
                label: "Реклама в фитнес клубах",
                url: `${`${Routes.EQUIPMENTS}/${1}`}`,
            },
            {
                label: "Реклама в торговых центрах",
                url: `${`${Routes.EQUIPMENTS}/${1}`}`,
            },
            {
                label: "Реклама в бизнес центрах",
                url: Routes.FAVOR,
            },
            {
                label: "Реклама в жилых домах",
                url: Routes.FAVOR,
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
                url: `${`${Routes.EQUIPMENTS}/${1}`}`,
            },
            {
                label: "Закон о рекламе",
                url: `${`${Routes.EQUIPMENTS}/${1}`}`,
            },
        ],
    },
    {
        label: "О компании",
        items: [
            {
                label: "История компании",
                url: `${`${Routes.EQUIPMENTS}/${1}`}`,
            },
            {
                label: "Доркументы",
                url: `${`${Routes.EQUIPMENTS}/${1}`}`,
            },
            {
                label: "Наша команда",
                url: `${`${Routes.EQUIPMENTS}/${1}`}`,
            },
        ],
    },
    {
        label: "Портфолио",
        url: Routes.WORKS,
    },
    {
        label: "Контакты",
        url: Routes.ABOUTUS,
    },
];
