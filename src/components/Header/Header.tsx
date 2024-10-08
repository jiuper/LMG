import cnBind from "classnames/bind";
import Link from "next/link";

import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/NavBar";
import { Button } from "@/shared/ui/Button";

import styles from "./Header.module.scss";

const cx = cnBind.bind(styles);

export const Header = () => {
    return (
        <header className={cx("header")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("menu")}>
                    <Logo />
                    <div className={cx("nav")}>
                        <Navbar className={cx("navbar-header")} />
                    </div>
                </div>
                <div className={cx("connect")}>
                    <Button label="Заказать звонок" />
                    <div className={cx("contacts")}>
                        <Link className={cx("email")} href="mailto:sales@liftmg.ru" target="_blank">
                            sales@liftmg.ru
                        </Link>
                        <Link className={cx("phone")} href="tel:+78129820058" target="_blank">
                            +7 (812) 982-00-58
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
