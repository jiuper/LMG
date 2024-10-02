import cnBind from "classnames/bind";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { useResizeContext } from "@/shared/context/WindowResizeProvider";

import styles from "./Footer.module.scss";

const cx = cnBind.bind(styles);

export const Footer = () => {
    const { isMobile } = useResizeContext();
    const list = [
        { title: "Реклама в фитнес клубах", href: "/" },
        { title: "Реклама в торговых центрах", href: "/" },
        { title: "Реклама в бизнес центрах", href: "/" },
        { title: "Реклама в жилых домах", href: "/" },
    ];
    const listContact = [
        { title: "Контакты", href: "/" },
        { title: "Отзывы", href: "/" },
        { title: "Сотрудничество", href: "/" },
        { title: "О нас", href: "/" },
        { title: "Портфолио", href: "/" },
    ];

    return (
        <footer className={cx("footer")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("body")}>
                    <div className={cx("short-info")}>
                        <Logo />
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
                            <h3>Реклама ПВЗ</h3>
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
                    <Link href="/">Политика конфиденциальности</Link>
                </div>
            </div>
        </footer>
    );
};
