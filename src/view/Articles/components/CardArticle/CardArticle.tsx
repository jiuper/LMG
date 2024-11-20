import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import type { CreateNewsDto } from "@/entities/types/entities";
import { API_BASE } from "@/shared/constants/private";
import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./CardArticle.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    className?: string;
    item: CreateNewsDto;
    url: string;
};
export const CardArticle = ({ item, className, url }: Props) => {
    const href = useRouter();

    return (
        <div className={cx("card", className)}>
            <CustomImage
                className={cx("image")}
                width={293}
                height={240}
                src={`${API_BASE}/picture/${item.pictureId}`}
                alt="article"
            />
            <div className={cx("body")}>
                <div className={cx("info")}>
                    <h3>{item.title}</h3>
                    <span>{item.subtitle}</span>
                </div>

                <Button onClick={() => href.push(`${url}/${item.id}`)}>Перейти</Button>
            </div>
        </div>
    );
};
