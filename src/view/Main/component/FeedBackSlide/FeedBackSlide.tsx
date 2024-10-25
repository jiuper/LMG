import { useState } from "react";
import cnBind from "classnames/bind";
import { Carousel } from "primereact/carousel";

import { SwipeableWrapper } from "@/components/SwipeableWrapper";
import { CustomImage } from "@/shared/ui/CustomImage";
import { items } from "@/view/Main/component/FeedBackSlide/const";

import styles from "./FeedBackSlide.module.scss";

const cx = cnBind.bind(styles);
type Props = {};
const FeedbackCard = (item: { type: string; src: string }) => {
    return (
        <div className={cx("card", { video: item.type === "video" })}>
            <CustomImage className={cx("image")} width={182} height={182} src={item.src} alt={item.src} />
            <div className={cx("info")}>
                <span className={cx("post")}>Менеджер</span>
            </div>
        </div>
    );
};
export const FeedBackSlide = ({}: Props) => {
    const responsiveOptions = [
        {
            breakpoint: "1920px",
            numVisible: 10,
            numScroll: 1,
        },
        {
            breakpoint: "1600",
            numVisible: 9,
            numScroll: 1,
        },
        {
            breakpoint: "1440",
            numVisible: 7,
            numScroll: 1,
        },
        {
            breakpoint: "1100",
            numVisible: 6,
            numScroll: 1,
        },
        {
            breakpoint: "767px",
            numVisible: 5,
            numScroll: 1,
        },
        {
            breakpoint: "575px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "430px",
            numVisible: 1,
            numScroll: 1,
        },
    ];
    const [page, setPage] = useState(0);

    const onPageChange = (e: number) => setPage(e);

    return (
        <div className={cx("feedbacks")}>
            <div className={cx("wrapper")}>
                <div className={cx("block")}>
                    <h2 className={cx("title")}>Отзывы ({items.length})</h2>
                    <div className={cx("slide")}>
                        <SwipeableWrapper
                            onSwipedLeft={() => setPage((prevPage) => (prevPage + 1) % items.length)}
                            onSwipedRight={() => setPage((prevPage) => (prevPage - 1 + items.length) % items.length)}
                        >
                            <Carousel
                                itemTemplate={(item: { type: string; src: string }) => FeedbackCard(item)}
                                value={items}
                                showIndicators={false}
                                showNavigators={false}
                                numVisible={10}
                                responsiveOptions={responsiveOptions}
                                className={cx("carousel")}
                                page={page}
                                onPageChange={(e) => onPageChange(e.page)}
                            />
                        </SwipeableWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
};
