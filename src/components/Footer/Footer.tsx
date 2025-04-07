import cnBind from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";

import { Logo } from "@/components/Logo";
import type { NavbarItem } from "@/components/NavBar/constants";
import { Routes } from "@/shared/constants";

import styles from "./Footer.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    data: NavbarItem[];
};
export const Footer = ({ data }: Props) => {
    const router = useRouter();
    const list = [
        { title: "Реклама на видеоэкранах", href: data[0]?.items?.[1].url || "" },
        { title: "Реклама в жилых домах", href: Routes.BUILDING },
        { title: "Реклама в бизнес центрах", href: Routes.POSTERBC },
        { title: "Реклама в ПВЗ", href: Routes.POSTERPVZ },
        { title: "Реклама в фитнес клубах", href: Routes.POSTERFITNES },
        { title: "Реклама в торговых центрах", href: Routes.POSTERTC },
    ];
    const listContact = [
        { title: "Контакты", href: Routes.CONTACTS },
        { title: "Отзывы", href: "/#feedback" },
        { title: "Сотрудничество", href: "/#cooperation" },
        { title: "О нас", href: Routes.ABOUTUS },
        { title: "Портфолио", href: Routes.PORTFOLIO },
    ];

    return (
        <footer className={cx("footer")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("body")}>
                    <div className={cx("short-info")}>
                        <Logo isFooter />
                        <div className={cx("contacts")}>
                            <Link className={cx("phone")} href="tel:+78129820058" target="_blank">
                                +7 (812) 982-00-58
                            </Link>
                            <Link className={cx("email")} href="mailto:sales@liftmg.ru" target="_blank">
                                sales@liftmg.ru
                            </Link>
                            <h3 className={cx("address")}>Ленинский проспект, 153, Санкт-Петербург</h3>
                        </div>
                    </div>
                    <div className={cx("menu-wrapper")}>
                        <div className={cx("menu")}>
                            <h3 onClick={() => router.push(data[0].items?.[0].url || "")}>Реклама в лифтах</h3>
                            <div className={cx("items")}>
                                {list.map((item, i) => (
                                    <Link className={cx("item")} href={item.href} key={i}>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className={cx("menu")}>
                            <div className={cx("items")}>
                                {listContact.map((item, i) => (
                                    <Link className={cx("item")} href={item.href} key={i}>
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("line")} />
                <div className={cx("copyright")}>
                    <span>levsha-web.ru © Все права защищены. 2024</span>
                    <Link href={Routes.POLICY}>Политика конфиденциальности</Link>
                </div>
            </div>
        </footer>
    );
};
