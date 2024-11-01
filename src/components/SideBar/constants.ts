import type { FC, SVGAttributes } from "react";

type LinkType = {
    label: string;
    href: string;
    icon?: FC<SVGAttributes<SVGElement>>;
    query?: Record<string, string>;
}[];
export const ROUTES_SIDEBAR: LinkType = [
    { label: "Управление", href: "Routing.ADMIN", query: { entityType: "users" } },
    { label: "Недвижимость", href: "Routing.REALTY" },
    { label: "Лиды", href: "Routing.LEAD" },
    { label: "Сделки", href: "Routing.DEALS" },
    { label: "Кошелек", href: "Routing.PAYMENT_METHODS" },
    { label: "Настройки", href: "Routing.SETTINGS", query: { selectedTab: "userData" } },
];

export const ROUTES_SIDEBAR_FOOTER = [{ label: "Выйти", href: "#" }];
