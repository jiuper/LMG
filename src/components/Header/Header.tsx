import cnBind from "classnames/bind";
import Link from "next/link";
import { Sidebar } from "primereact/sidebar";

import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/NavBar";
import type { NavbarItem } from "@/components/NavBar/constants";
import { NavBarMob } from "@/components/NavBar/NavBarMob";
import { IcDots } from "@/shared/assests/svg";
import { LMGIcon } from "@/shared/assests/svg/svg";
import { useResizeContext } from "@/shared/context/WindowResizeProvider";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";

import styles from "./Header.module.scss";

const cx = cnBind.bind(styles);
type HeaderProps = {
    data: NavbarItem[];
};
export const Header = ({ data }: HeaderProps) => {
    const { windowScreen } = useResizeContext();
    const [isOpen, open, close] = useBooleanState(false);
    const [isOpenModal, openModal, closeModal] = useBooleanState(false);

    return (
        <header className={cx("header")}>
            <div className={cx("wrapper", "container")}>
                {windowScreen <= 1100 && <IcDots className={cx("icon")} onClick={open} />}
                <div className={cx("menu")}>
                    <Logo />
                    {windowScreen >= 1100 && (
                        <div className={cx("nav")}>
                            <Navbar data={data} className={cx("navbar-header")} />
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
                                            <NavBarMob data={data} className={cx("navbar-header")} />
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    )}
                </div>
                <div className={cx("connect")}>
                    <Button onClick={openModal} label="Заказать звонок" className={cx("button")} />
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
            <ModalFeedBack isOpen={isOpenModal} onClose={closeModal} />
        </header>
    );
};
