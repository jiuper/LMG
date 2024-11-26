import { useState } from "react";
import cnBind from "classnames/bind";
import { Paginator } from "primereact/paginator";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalCaseBlock } from "@/components/_Modals/ModalCaseBlock";
import type { GetCategoryDto, GetPortfolioDto } from "@/entities/types/entities";
import { API_BASE } from "@/shared/constants/private";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";
import { CaseCard } from "@/view/Main/component/CaseBlock/component";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css";

import styles from "./Portfolio.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    port: GetPortfolioDto[];
    categoryList: GetCategoryDto[];
};
export const PortfolioPage = ({ port, categoryList }: Props) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(12);

    const [filter, setFilter] = useState("Все проекты");
    const listCategories = ["Все проекты", ...categoryList?.map((el) => el.title)];
    const filtered = filter === "Все проекты" ? port : port.filter((el) => el.title === filter);
    const paginated = filtered.slice(first, first + rows);
    const onPageChange = (event: { first: number; rows: number }) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const [isOpen, onOpen, onClose] = useBooleanState(false);
    const [current, setCurrent] = useState<GetPortfolioDto | null>(null);
    const handleOnModal = (i: GetPortfolioDto) => {
        setCurrent(i);
        onOpen();
    };
    const handleOnClose = () => {
        onClose();
        setCurrent(null);
    };

    return (
        <div className={cx("portfolio")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("title")}>
                    <h2>Портфолио</h2>
                </div>
                <div className={cx("articles-wrapper")}>
                    <div className={cx("categories")}>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={20}
                            slidesPerView={7}
                            loop
                            breakpoints={{
                                1920: { slidesPerView: 7 },
                                1600: { slidesPerView: 7 },
                                1440: { slidesPerView: 7 },
                                1280: { slidesPerView: 5 },
                                1080: { slidesPerView: 4 },
                                720: { slidesPerView: 3 },
                                520: { slidesPerView: 2 },
                                430: { slidesPerView: 1 },
                            }}
                        >
                            {listCategories?.map((el, index) => (
                                <SwiperSlide className={cx("category-item")} key={index}>
                                    <Button
                                        onClick={() => setFilter(el)}
                                        className={cx("category")}
                                        label={el}
                                        key={index}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className={cx("articles")}>
                        {paginated.map((el, index) => (
                            <CaseCard
                                image={`${API_BASE}/picture/${el.pictureId}`}
                                onClick={() => handleOnModal(el)}
                                key={index}
                                {...el}
                            />
                        ))}
                    </div>

                    {filtered.length <= rows ? null : (
                        <Paginator
                            className={cx("paginator")}
                            first={first}
                            rows={rows}
                            totalRecords={filtered.length}
                            onPageChange={onPageChange}
                        />
                    )}
                </div>
            </div>
            <div className={cx("form")}>
                <FormFeedback />
            </div>
            <ModalCaseBlock
                isOpen={isOpen}
                onClose={handleOnClose}
                item={current !== null ? current : ({} as GetPortfolioDto)}
            />
        </div>
    );
};
