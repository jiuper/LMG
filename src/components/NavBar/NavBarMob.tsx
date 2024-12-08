import { useEffect, useRef, useState } from "react";
import cnBind from "classnames/bind";
import Link from "next/link";

import type { NavbarTypeProps } from "@/components/NavBar/constants";
import { ArrowDownIcon } from "@/shared/assests/svg/svg";

import styles from "./Navbar.module.scss";

const cx = cnBind.bind(styles);
export const NavBarMob = ({
    className,
    classNameItems,
    onClick,
    data,
}: {
    className?: string;
    classNameItems?: string;
    onClick?: () => void;
    data: NavbarTypeProps;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [index, setIndex] = useState<number | null>(null);
    const handleClick = (i: number) => {
        setIndex(i === index ? null : i);
        onClick?.();
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIndex(null);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={cx("navbar-mob", className)} ref={ref}>
            <div className={cx("items-mob", classNameItems)}>
                {data.map((item, i) => (
                    <div key={item.label} className={cx("item-mob")}>
                        {item.url ? (
                            <Link
                                className={cx("link-mob", "link-icon-mob")}
                                onClick={onClick}
                                href={item.url}
                                key={item.label}
                            >
                                {item.label}
                                <ArrowDownIcon className={cx("icon-mob")} />
                            </Link>
                        ) : (
                            <div className={cx("link-mob", "submenu-mob")} onClick={() => handleClick(i)}>
                                {item.label}
                                <ArrowDownIcon className={cx("icon-mob")} />
                            </div>
                        )}
                        {item.items && (
                            <div className={cx("subitems-wrapper-mob", index === i && "open-mob")}>
                                <div className={cx("subitems-mob", "active-sub-mob")}>
                                    {item.items?.map((subitem) => (
                                        <div key={subitem.label} className={cx("subitem-mob")}>
                                            <Link className={cx("link-mob")} onClick={onClick} href={subitem.url}>
                                                {subitem.label}
                                            </Link>
                                            <ArrowDownIcon className={cx("icon-mob")} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
