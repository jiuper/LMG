import cnBind from "classnames/bind";
import Link from "next/link";
import { Sidebar } from "primereact/sidebar";

import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/NavBar";
import { NavBarMob } from "@/components/NavBar/NavBarMob";
import { IcDots } from "@/shared/assests/svg";
import { LMGIcon } from "@/shared/assests/svg/svg";
import { useResizeContext } from "@/shared/context/WindowResizeProvider";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";

import styles from "./Header.module.scss";

const cx = cnBind.bind(styles);

export const Header = () => {
    const { windowScreen } = useResizeContext();
    const [isOpen, open, close] = useBooleanState(false);

    return (
        <header className={cx("header")}>
            <div className={cx("wrapper", "container")}>
                {windowScreen <= 1100 && <IcDots onClick={open} />}
                <div className={cx("menu")}>
                    <Logo />
                    {windowScreen >= 1100 && (
                        <div className={cx("nav")}>
                            <Navbar className={cx("navbar-header")} />
                        </div>
                    )}
                    {windowScreen <= 1100 && (
                        <div className={cx("nav-sidebar")}>
                            <Sidebar
                                onHide={close}
                                className={cx("sidebar")}
                                visible={isOpen}
                                content={
                                    <div className={cx("sidebar-content")}>
                                        <div className={cx("logo")}>
                                            <LMGIcon />
                                        </div>

                                        <div className={cx("navbar")}>
                                            <NavBarMob className={cx("navbar-header")} />
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    )}
                </div>
                <div className={cx("connect")}>
                    <Button label="Заказать звонок" className={cx("button")} />
                    {windowScreen >= 1100 && (
                        <div className={cx("contacts")}>
                            <Link className={cx("email")} href="mailto:sales@liftmg.ru" target="_blank">
                                sales@liftmg.ru
                            </Link>
                            <Link className={cx("phone")} href="tel:+78129820058" target="_blank">
                                +7 (812) 982-00-58
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
