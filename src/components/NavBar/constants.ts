import { Routes } from "@/shared/constants/Routing";

type NavbarTypeProps = { label: string; url?: string; items?: { label: string; url: string }[] }[];
export const items: NavbarTypeProps = [
    {
        label: "Виды съёмок",
        url: Routes.FILMIMG,
    },

    {
        label: "Услуги",
        items: [
            {
                label: "Платья в аренду",
                url: `${`${Routes.EQUIPMENTS}/${1}`}`,
            },
            {
                label: "Аренда оборудования",
                url: `${`${Routes.EQUIPMENTS}/${1}`}`,
            },
            {
                label: "Аренда реквизита",
                url: `${`${Routes.EQUIPMENTS}/${1}`}`,
            },
            {
                label: "Аренда фотостудии",
                url: Routes.FAVOR,
            },
        ],
    },
    {
        label: "Акции",

        url: Routes.PROMOTION,
    },
    {
        label: "Наши работы",
        url: Routes.WORKS,
    },
    {
        label: "О нас",
        url: Routes.ABOUTUS,
    },
    {
        label: "Контакты",
        url: Routes.CONTACTS,
    },
];
