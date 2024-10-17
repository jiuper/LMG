import cnBind from "classnames/bind";
import Link from "next/link";

import { Button } from "@/shared/ui/Button";

import styles from "./HistoryCard.module.scss";

const cx = cnBind.bind(styles);
type HistoryCardProps = {
    image: string;
    title: string;
    description?: string;
    listHref?: { title: string; href: string }[];
};
export const HistoryCard = ({ listHref, description, image, title }: HistoryCardProps) => {
    return (
        <div className={cx("history-card")} style={{ backgroundImage: `url(${image})` }}>
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
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Button className={cx("button")} mode="empty" label="Смотреть" />
        </div>
    );
};
