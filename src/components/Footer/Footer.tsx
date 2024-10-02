import cnBind from "classnames/bind";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/NavBar";
import { Routes } from "@/shared/constants/Routing";
import { useResizeContext } from "@/shared/context/WindowResizeProvider";

import styles from "./Footer.module.scss";

const cx = cnBind.bind(styles);

export const Footer = () => {
    const { isMobile } = useResizeContext();

    return (
        <footer className={cx("footer")}>
            <div className={cx("wrapper", "container")}>
                <Logo />
                {!isMobile && <Navbar />}
                <div className={cx("footer-content")}>
                    <div className={cx("bottom")}>
                        <div className={cx("contacts")}>
                            <Link className={cx("phone")} href="tel:+79217951988" target="_blank">
                                +7 921 795 19 88
                            </Link>
                            <Link className={cx("email")} href="mailto:dellamorra5@gmail.com" target="_blank">
                                dellamorra5@gmail.com
                            </Link>
                        </div>
                        <div className={cx("address")}>
                            <h3>Кадетская линия В.О., 5 к.2, лит. Д</h3>
                            <span>Della Morra Loft</span>
                        </div>
                        {!isMobile && (
                            <div className={cx("links")}>
                                <Link className={cx("privacy")} href={Routes.POLICY}>
                                    Политика конфиденциальности
                                </Link>
                                <Link className={cx("link")} href={Routes.POLICY}>
                                    Условия использования
                                </Link>
                                <span>© Della Morra 2024</span>
                            </div>
                        )}
                    </div>
                    <div className={cx("footer-social")}>
                        {isMobile && (
                            <div className={cx("links")}>
                                <Link className={cx("privacy")} href={Routes.POLICY}>
                                    Политика конфиденциальности
                                </Link>
                                <Link className={cx("link")} href={Routes.POLICY}>
                                    Условия использования
                                </Link>
                                <span>© Della Morra 2024</span>
                            </div>
                        )}
                        {!isMobile && (
                            <div className={cx("copyright")}>
                                Created by{"\u00A0"}
                                <Link className={cx("link")} href="https://levsha-web.ru/" target="_blank">
                                    Levsha
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                {isMobile && (
                    <div className={cx("copyright")}>
                        Created by{"\u00A0"}
                        <Link className={cx("link")} href="https://levsha-web.ru/" target="_blank">
                            Levsha
                        </Link>
                    </div>
                )}
            </div>
        </footer>
    );
};
