import cnBind from "classnames/bind";
import { Carousel } from "primereact/carousel";

import { CustomImage } from "@/shared/ui/CustomImage";
import { items } from "@/view/Main/component/FeedBackSlide/const";

import styles from "./FeedBackSlide.module.scss";

const cx = cnBind.bind(styles);
type Props = {};
const FeedbackCard = (item: { type: string; src: string }) => {
    return (
        <div className={cx("card", { item: item.type })}>
            <CustomImage width={182} height={182} src={item.src} alt={item.src} />
            <div className={cx("info")}>
                <div className={cx("post")}>Менеджер</div>
            </div>
        </div>
    );
};
export const FeedBackSlide = ({}: Props) => {
    return (
        <div className={cx("feedbacks")}>
            <div className={cx("wrapper")}>
                <div className={cx("block")}>
                    <h2 className={cx("title")}>Отзывы ({items.length})</h2>
                    <div className={cx("slide")}>
                        <Carousel
                            itemTemplate={(item: { type: string; src: string }) => FeedbackCard(item)}
                            value={items}
                            showIndicators={false}
                            showNavigators={false}
                            numVisible={10}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
