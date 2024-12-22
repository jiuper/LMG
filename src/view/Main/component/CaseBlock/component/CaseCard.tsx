import cnBind from "classnames/bind";

import type { ContentSatus } from "@/entities/types/entities";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./CaseCard.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    id: string;
    number?: number;
    title?: string;
    description?: string;
    categoryName?: string;
    status: ContentSatus;
    image: string;
    onClick: () => void;
    className?: string;
};
export const CaseCard = ({ description, title, image, onClick, className }: Props) => {
    return (
        <div onClick={onClick} className={cx("case-card", className)}>
            <CustomImage className={cx("image")} width={382} height={250} src={image} alt={image} />
            <div className={cx("text")}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};
