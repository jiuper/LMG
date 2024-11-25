import { useState } from "react";
import cnBind from "classnames/bind";
import { Carousel } from "primereact/carousel";

import { ModalFeedBackBlock } from "@/components/_Modals/ModalFeedbackBlock";
import { SwipeableWrapper } from "@/components/SwipeableWrapper";
import type { GetFeedbackDto } from "@/entities/types/entities";
import { API_BASE } from "@/shared/constants/private";
import { useBooleanState } from "@/shared/hooks";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./FeedBackSlide.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    feedback?: GetFeedbackDto[];
};
const FeedbackCard = (item: GetFeedbackDto, onClick: () => void) => {
    return (
        <div onClick={onClick} className={cx("card", { video: item.videoId !== null })}>
            <CustomImage
                className={cx("image")}
                width={182}
                height={182}
                src={`${API_BASE}/picture/${item.pictureId}`}
                alt={item.title || "def"}
            />
            <div className={cx("info")}>
                <span className={cx("post")}>{item.description}</span>
            </div>
        </div>
    );
};
export const FeedBackSlide = ({ feedback }: Props) => {
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
    const [current, setCurrent] = useState<GetFeedbackDto | null>(null);
    const handleOnModal = (i: GetFeedbackDto) => {
        setCurrent(i);
        onOpen();
    };
    const handleOnClose = () => {
        onClose();
        setCurrent(null);
    };

    return (
        <div id="feedback" className={cx("feedbacks")}>
            <div className={cx("wrapper")}>
                <div className={cx("block")}>
                    <h2 className={cx("title")}>Отзывы ({[].length})</h2>
                    <div className={cx("slide")}>
                        <SwipeableWrapper
                            onSwipedLeft={() => setPage((prevPage) => (prevPage + 1) % [].length)}
                            onSwipedRight={() => setPage((prevPage) => (prevPage - 1 + [].length) % [].length)}
                        >
                            <Carousel
                                itemTemplate={(item: GetFeedbackDto) => FeedbackCard(item, () => handleOnModal(item))}
                                value={feedback}
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
                item={current !== null ? current : ({} as GetFeedbackDto)}
            />
        </div>
    );
};
