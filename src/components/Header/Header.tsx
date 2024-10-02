import { useState } from "react";
import cnBind from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";

import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/NavBar";

import styles from "./Header.module.scss";

const cx = cnBind.bind(styles);

export const Header = () => {
    const [visibleRight, setVisibleRight] = useState(false);
    const router = useRouter();

    return (
        <header className={cx("header")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("left")}>
                    <Button
                        className={cx("phone-link")}
                        onClick={() => router.push("tel:+79217951988")}
                        icon="pi pi-phone"
                    />
                    <Logo />
                    <div className={cx("nav")}>
                        <Navbar className={cx("navbar-header")} />
                        <Button
                            className={cx("sidebar-button")}
                            icon="pi pi-pause"
                            onClick={() => setVisibleRight(true)}
                        />
                        <Sidebar
                            className={cx("sidebar")}
                            position="right"
                            visible={visibleRight}
                            onHide={() => setVisibleRight(false)}
                        >
                            <div className={cx("sidebar-header")}>
                                <Button
                                    className={cx("phone-link")}
                                    icon="pi pi-times"
                                    onClick={() => setVisibleRight(false)}
                                />
                                <Logo />
                                <Button
                                    onClick={() => router.push("tel:+79217951988")}
                                    className={cx("phone-link")}
                                    icon="pi pi-phone"
                                />
                            </div>
                            <div className={cx("nav")}>
                                <div className={cx("navbar-container")}>
                                    <Navbar
                                        onClick={() => setVisibleRight(false)}
                                        classNameItems={cx("navbar-items")}
                                    />
                                </div>
                            </div>
                            <div className={cx("sidebar-right")}>
                                <div className={cx("contacts")}>
                                    <Link className={cx("email")} href="mailto:dellamorra5@gmail.com" target="_blank">
                                        dellamorra5@gmail.com
                                    </Link>
                                    <Link className={cx("email")} href="mailto:dellamorra5@gmail.com" target="_blank">
                                        dellamorra5@gmail.com
                                    </Link>
                                </div>
                            </div>
                        </Sidebar>
                    </div>
                </div>
            </div>
        </header>
    );
};
