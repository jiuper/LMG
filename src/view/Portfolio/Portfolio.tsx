import { useState } from "react";
import cnBind from "classnames/bind";
import { Paginator } from "primereact/paginator";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalCaseBlock } from "@/components/_Modals/ModalCaseBlock";
import type { GetPortfolioDto } from "@/entities/types/entities";
import { API_BASE } from "@/shared/constants/private";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";
import { CaseCard } from "@/view/Main/component/CaseBlock/component";

import styles from "./Portfolio.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    port: GetPortfolioDto[];
};
const categories = [
    "Все проекты",
    "Лифты",
    "Бизнес-центры",
    "Жилые комплексы",
    "Торговые центры",
    "ПВЗ",
    "Фитнес центры",
];
export const PortfolioPage = ({ port }: Props) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(12);

    const [filter, setFilter] = useState("Все проекты");

    const filtered = filter === "Все проекты" ? port : port.filter((el) => el.categoryName === filter);
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
                        {categories.map((el, index) => (
                            <Button onClick={() => setFilter(el)} className={cx("category")} label={el} key={index} />
                        ))}
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
