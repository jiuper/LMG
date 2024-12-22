import { useMemo, useState } from "react";
import cnBind from "classnames/bind";
import { Paginator } from "primereact/paginator";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalCaseBlock } from "@/components/_Modals/ModalCaseBlock";
import type { GetCategoryDto, GetPortfolioDto } from "@/entities/types/entities";
import { API_BASE } from "@/shared/constants/private";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";
import { CaseCard } from "@/view/Main/component/CaseBlock/component";

import styles from "./Portfolio.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    port: GetPortfolioDto[];
    categoryList: GetCategoryDto[];
};
export const PortfolioPage = ({ port, categoryList }: Props) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(12);

    const [filter, setFilter] = useState("1");
    const listCategories = [
        { title: "Все проекты", id: "1" },
        ...categoryList
            .filter((cat) => port.some((el) => el.categoryId === cat.id))
            .map((cat) => ({ title: cat.title, id: cat.id })),
    ];

    const filtered = useMemo(
        () => (filter === "1" ? port : port.filter((el) => el.categoryId === filter)),
        [filter, port],
    );
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
                        {listCategories?.map((el, index) => (
                            <Button
                                onClick={() => setFilter(el.id)}
                                className={cx("category")}
                                label={el.title}
                                key={index}
                            />
                        ))}
                    </div>
                    <div className={cx("articles")}>
                        {paginated.length !== 0 ? (
                            paginated.map((el, index) => (
                                <CaseCard
                                    image={`${API_BASE}/picture/${el.pictureId}`}
                                    className={cx(paginated.length === 1 && "active")}
                                    onClick={() => handleOnModal(el)}
                                    key={index}
                                    {...el}
                                />
                            ))
                        ) : (
                            <span>В данной категории нет портфолио</span>
                        )}
                    </div>

                    <Paginator
                        className={cx("paginator")}
                        first={first}
                        rows={rows}
                        totalRecords={filtered.length}
                        onPageChange={onPageChange}
                    />
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
