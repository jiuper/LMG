import { useState } from "react";
import cnBind from "classnames/bind";
import { Carousel } from "primereact/carousel";

import { ModalFeedBackBlock } from "@/components/_Modals/ModalFeedbackBlock";
import { SwipeableWrapper } from "@/components/SwipeableWrapper";
import { useBooleanState } from "@/shared/hooks";
import { CustomImage } from "@/shared/ui/CustomImage";
import { items } from "@/view/Main/component/FeedBackSlide/const";

import styles from "./FeedBackSlide.module.scss";

const cx = cnBind.bind(styles);
type Props = {};
const FeedbackCard = (
    item: { title: string; description: string; image: string; type?: string },
    onClick: () => void,
) => {
    return (
        <div onClick={onClick} className={cx("card", { video: item.type === "video" })}>
            <CustomImage className={cx("image")} width={182} height={182} src={item.image} alt={item.image} />
            <div className={cx("info")}>
                <span className={cx("post")}>{item.description}</span>
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
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: "430px",
            numVisible: 2,
            numScroll: 1,
        },
    ];
    const [page, setPage] = useState(0);

    const onPageChange = (e: number) => setPage(e);
    const [isOpen, onOpen, onClose] = useBooleanState(false);
    const [current, setCurrent] = useState<{ title: string; description: string; image: string; type?: string } | null>(
        null,
    );
    const handleOnModal = (i: { title: string; description: string; image: string; type?: string }) => {
        setCurrent(i);
        onOpen();
    };
    const handleOnClose = () => {
        onClose();
        setCurrent(null);
    };

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
                                itemTemplate={(item: {
                                    title: string;
                                    description: string;
                                    image: string;
                                    type?: string;
                                }) => FeedbackCard(item, () => handleOnModal(item))}
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
            <ModalFeedBackBlock
                isOpen={isOpen}
                onClose={handleOnClose}
                item={
                    current !== null
                        ? current
                        : ({} as { title: string; description: string; image: string; type?: string })
                }
            />
        </div>
    );
};
