import { useState } from "react";
import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import { ModalCaseBlock } from "@/components/_Modals/ModalCaseBlock";
import type { GetPortfolioDto } from "@/entities/types/entities";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";
import { CaseCard } from "@/view/Main/component/CaseBlock/component";

import styles from "./CaseBlock.module.scss";

const cx = cnBind.bind(styles);

type Props = {
    listItem: GetPortfolioDto[];
    className?: string;
};
export const CaseBlock = ({ listItem, className }: Props) => {
    const href = useRouter();
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
        <div className={cx("case-block", className)}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("title")}>
                    <h2>Портфолио</h2>
                    <Button className={cx("btn")} onClick={() => href.push(Routes.PORTFOLIO)} label="Посмотреть все" />
                </div>

                <div className={cx("cards")}>
                    {listItem.slice(-7).map((el, index) => (
                        <CaseCard
                            image={`${API_BASE}/picture/${el.pictureId}`}
                            onClick={() => handleOnModal(el)}
                            key={index}
                            className={cx(listItem.length === 1 && "active")}
                            {...el}
                        />
                    ))}
                </div>
            </div>
            <ModalCaseBlock
                isOpen={isOpen}
                onClose={handleOnClose}
                item={current !== null ? current : ({} as GetPortfolioDto)}
            />
        </div>
    );
};
