import cnBind from "classnames/bind";

import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./Card.module.scss";

const cx = cnBind.bind(styles);

type Props = {
    title: string;
    description: string;
    image: string;
    onClick?: () => void;
};
export const Card = ({ description, title, image, onClick }: Props) => {
    return (
        <div onClick={onClick} className={cx("card")}>
            <CustomImage className={cx("image")} width={382} height={250} src={image} alt={image} />
            <div className={cx("text")}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};
