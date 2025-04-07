import cnBind from "classnames/bind";
import Link from "next/link";
import type { UrlObject } from "node:url";

import { LinkIcon } from "@/shared/assests/svg/svg";
import { Button } from "@/shared/ui/Button";

import styles from "./HistoryCard.module.scss";

const cx = cnBind.bind(styles);
type HistoryCardProps = {
    image: string;
    title: string;
    description?: string;
    listHref?: {
        title: string;
        href: UrlObject;
        as?: string;
        typeOnClick?: () => void;
    }[];
    onClick?: () => void;
    className?: string;
    type?: boolean;
    link?: boolean;
};
export const HistoryCard = ({
    listHref,
    description,
    image,
    title,
    onClick,
    className,
    type = true,
    link,
}: HistoryCardProps) => {
    return (
        <div className={cx("history-card", className)} style={{ backgroundImage: `url(${image})` }}>
            <div className={cx("content")}>
                <h3 className={cx("title")}>{title}</h3>
                {description && (
                    <p onClick={onClick} className={cx("description")}>
                        {description}
                    </p>
                )}
                {listHref && (
                    <ul className={cx("list")}>
                        {listHref.map((item, i) => (
                            <li key={i} className={cx("list-item")}>
                                {type ? (
                                    <Link
                                        href={item.href}
                                        as={item.as}
                                        className={cx("list-link")}
                                        onClick={item.typeOnClick}
                                    >
                                        {item.title}
                                    </Link>
                                ) : (
                                    <Link
                                        target={link ? "_blank" : "_self"}
                                        className={cx("list-link")}
                                        href={item.href}
                                        as={item.as}
                                    />
                                )}
                                <LinkIcon className={cx("list-icon")} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Button onClick={onClick} className={cx("button")} mode="empty" label="Смотреть" />
        </div>
    );
};
