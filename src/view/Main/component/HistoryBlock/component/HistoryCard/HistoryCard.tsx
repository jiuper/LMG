import cnBind from "classnames/bind";
import Link from "next/link";

import { LinkIcon } from "@/shared/assests/svg/svg";
import { Button } from "@/shared/ui/Button";

import styles from "./HistoryCard.module.scss";

const cx = cnBind.bind(styles);
type HistoryCardProps = {
    image: string;
    title: string;
    description?: string;
    listHref?: { title: string; href: string }[];
    onClick?: () => void;
    className?: string;
};
export const HistoryCard = ({ listHref, description, image, title, onClick, className }: HistoryCardProps) => {
    return (
        <div className={cx("history-card", className)} style={{ backgroundImage: `url(${image})` }}>
            <div className={cx("content")}>
                <h3 className={cx("title")}>{title}</h3>
                {description && <p className={cx("description")}>{description}</p>}
                {listHref && (
                    <ul className={cx("list")}>
                        {listHref.map((item, i) => (
                            <li key={i} className={cx("list-item")}>
                                <Link className={cx("list-link")} href={item.href}>
                                    {item.title}
                                </Link>
                                <LinkIcon />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Button onClick={onClick} className={cx("button")} mode="empty" label="Смотреть" />
        </div>
    );
};
