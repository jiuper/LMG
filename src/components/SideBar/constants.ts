import type { FC, SVGAttributes } from "react";

import {
    AccountBalanceWalletIcon,
    AssigmentIcon,
    ContactPageIcon,
    LogoutIcon,
    ManageAccountsIcon,
    SettingsIcon,
    SvgDashboard,
} from "@/shared/assets/icons/svgs";
import { Routing } from "@/shared/constants/routing";

type LinkType = {
    label: string;
    href: string;
    icon: FC<SVGAttributes<SVGElement>>;
    query?: Record<string, string>;
}[];
export const ROUTES_SIDEBAR: LinkType = [
    { label: "Управление", href: Routing.ADMIN, icon: ManageAccountsIcon, query: { entityType: "users" } },
    { label: "Недвижимость", href: Routing.REALTY, icon: SvgDashboard },
    { label: "Лиды", href: Routing.LEAD, icon: ContactPageIcon },
    { label: "Сделки", href: Routing.DEALS, icon: AssigmentIcon },
    { label: "Кошелек", href: Routing.PAYMENT_METHODS, icon: AccountBalanceWalletIcon },
    { label: "Настройки", href: Routing.SETTINGS, icon: SettingsIcon, query: { selectedTab: "userData" } },
];

export const ROUTES_SIDEBAR_FOOTER = [{ label: "Выйти", href: "#", icon: LogoutIcon }];
