import { useEffect, useRef, useState } from "react";
import cnBind from "classnames/bind";
import Link from "next/link";

import type { NavbarTypeProps } from "@/components/NavBar/constants";
import { ArrowDownIcon } from "@/shared/assests/svg/svg";

import styles from "./Navbar.module.scss";

const cx = cnBind.bind(styles);
export const Navbar = ({
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
        <div className={cx("navbar", className)} ref={ref}>
            <div className={cx("items", classNameItems)}>
                {data.map((item, i) => (
                    <div key={item.label} className={cx("item")}>
                        {item.url ? (
                            <Link
                                className={cx("link", "link-icon")}
                                onClick={onClick}
                                href={item.url}
                                key={item.label}
                            >
                                {item.label}
                                <ArrowDownIcon className={cx("icon")} />
                            </Link>
                        ) : (
                            <div className={cx("link", "submenu")} onClick={() => handleClick(i)}>
                                {item.label}
                                <ArrowDownIcon className={cx("icon")} />
                            </div>
                        )}
                        {item.items && (
                            <div className={cx("subitems-wrapper", index === i && "open")}>
                                <div className={cx("subitems", "active-sub")}>
                                    {item.items?.map((subitem) => (
                                        <div key={subitem.label} className={cx("subitem")}>
                                            <Link className={cx("link")} onClick={onClick} href={subitem.url}>
                                                {subitem.label}
                                            </Link>
                                            <ArrowDownIcon className={cx("icon")} />
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
