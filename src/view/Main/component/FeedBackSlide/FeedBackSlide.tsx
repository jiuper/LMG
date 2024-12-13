import { useState } from "react";
import cnBind from "classnames/bind";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ModalFeedBackBlock } from "@/components/_Modals/ModalFeedbackBlock";
import type { GetFeedbackDto } from "@/entities/types/entities";
import { API_BASE } from "@/shared/constants/private";
import { useBooleanState } from "@/shared/hooks";
import { CustomImage } from "@/shared/ui/CustomImage";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css";

import styles from "./FeedBackSlide.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    feedback?: GetFeedbackDto[];
};
type FeedbackCardProps = {
    item: GetFeedbackDto;
    onClick: () => void;
};
const FeedbackCard = ({ item, onClick }: FeedbackCardProps) => {
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
                    <div className={cx("title-wrapper")}>
                        <h2 className={cx("title")}>Отзывы ({feedback?.length})</h2>
                    </div>

                    <div className={cx("slide")}>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={10}
                            slidesPerView={1}
                            loop
                            autoplay={{ delay: 3000 }}
                            breakpoints={{
                                1920: { slidesPerView: 8, spaceBetween: 20 },
                                1600: { slidesPerView: 7, spaceBetween: 20 },
                                1440: { slidesPerView: 6, spaceBetween: 20 },
                                1280: { slidesPerView: 5, spaceBetween: 20 },
                                1080: { slidesPerView: 4, spaceBetween: 20 },
                                720: { slidesPerView: 3, spaceBetween: 10 },
                                520: { slidesPerView: 2, spaceBetween: 10 },
                            }}
                        >
                            {feedback?.map((el, i) => (
                                <SwiperSlide className={cx("slide-item")} key={i}>
                                    <FeedbackCard item={el} onClick={() => handleOnModal(el)} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
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
