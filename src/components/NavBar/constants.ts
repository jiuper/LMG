import { Routes } from "@/shared/constants/Routing";

type NavbarTypeProps = { label: string; url?: string; items?: { label: string; url: string }[] }[];
export const items: NavbarTypeProps = [
    {
        label: "Реклама",
        items: [
            {
                label: "Реклама в лифтах",
                url: `${Routes.BUILDING}/dcfe5b93-b13d-46a9-b0be-37a1b69025d6 `,
            },
            {
                label: "Реклама на видео экранах",
                url: `${Routes.BUILDING}/18e9084d-dad9-4be0-bd6b-3a88b4ceca58 `,
            },
            {
                label: "Реклама в жилых домах",
                url: Routes.BUILDING,
            },
            {
                label: "Реклама ПВЗ",
                url: Routes.POSTERPVZ,
            },
            {
                label: "Реклама в фитнес клубах",
                url: Routes.POSTERFITNES,
            },
            {
                label: "Реклама в торговых центрах",
                url: Routes.POSTERTC,
            },
            {
                label: "Реклама в бизнес центрах",
                url: Routes.POSTERBC,
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
                url: `${Routes.ARTICLES}/9asd23crecsw123`,
            },
        ],
    },
    {
        label: "О компании",
        items: [
            {
                label: "История компании",
                url: Routes.HISTORY,
            },
            {
                label: "Доркументы",
                url: Routes.ABOUTUS,
            },
            {
                label: "Наша команда",
                url: Routes.ABOUTUS,
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
