import cnBind from "classnames/bind";

import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./CardArticle.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    onClick?: (id: string) => void;
    className?: string;
    src: string;
    title?: string;
    description?: string;
};
export const CardArticle = ({ src, title, description, onClick, className }: Props) => {
    return (
        <div className={cx("card", className)}>
            <CustomImage className={cx("image")} width={293} height={240} src={src} alt="article" />
            <div className={cx("body")}>
                <div className={cx("info")}>
                    <h3>{title}</h3>
                    <span>{description}</span>
                </div>

                <Button onClick={() => onClick}>Перейти</Button>
            </div>
        </div>
    );
};
