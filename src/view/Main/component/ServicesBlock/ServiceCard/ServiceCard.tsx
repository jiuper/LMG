import cnBind from "classnames/bind";

import { Button } from "@/shared/ui/Button";

import styles from "./ServiceCard.module.scss";

const cx = cnBind.bind(styles);

type ServiceCardProps = {
    title: string;
    description: string;
    image: string;
    onClick?: () => void;
};
export const ServiceCard = ({ description, title, image, onClick }: ServiceCardProps) => {
    return (
        <div onClick={onClick} className={cx("service-card")} style={{ backgroundImage: `url(${image})` }}>
            <div className={cx("text")}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <Button onClick={onClick} className={cx("button")} mode="empty" label="Смотреть" />
        </div>
    );
};
