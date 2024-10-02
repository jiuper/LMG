import cnBind from "classnames/bind";
import Link from "next/link";

import { items } from "@/components/NavBar/constants";

import styles from "./Navbar.module.scss";

const cx = cnBind.bind(styles);
export const Navbar = ({
    className,
    classNameItems,
    onClick,
}: {
    className?: string;
    classNameItems?: string;
    onClick?: () => void;
}) => {
    return (
        <div className={cx("navbar", className)}>
            <div className={cx("items", classNameItems)}>
                {items.map((item) => (
                    <div key={item.label} className={cx("item")}>
                        {item.url ? (
                            <Link className={cx("link")} onClick={onClick} href={item.url} key={item.label}>
                                {item.label}
                            </Link>
                        ) : (
                            <div className={cx("link", "submenu")} onClick={onClick}>
                                {item.label}
                                <span className={cx("count")}>{item.items?.length}</span>
                            </div>
                        )}
                        {item.items && (
                            <div className={cx("subitems-wrapper")}>
                                <div className={cx("subitems-container")}>
                                    <div className={cx("subitems", "active-sub")}>
                                        {item.items?.map((subitem) => (
                                            <Link
                                                className={cx("link")}
                                                onClick={onClick}
                                                href={subitem.url}
                                                key={subitem.label}
                                            >
                                                {subitem.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
