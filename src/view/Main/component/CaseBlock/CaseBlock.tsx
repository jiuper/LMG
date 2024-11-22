import { useState } from "react";
import cnBind from "classnames/bind";

import { ModalCaseBlock } from "@/components/_Modals/ModalCaseBlock";
import type { GetPortfolioDto } from "@/entities/types/entities";
import { API_BASE } from "@/shared/constants/private";
import { useBooleanState } from "@/shared/hooks";
import { CaseCard } from "@/view/Main/component/CaseBlock/component";

import styles from "./CaseBlock.module.scss";

const cx = cnBind.bind(styles);

type Props = {
    listItem: GetPortfolioDto[];
    className?: string;
};
export const CaseBlock = ({ listItem, className }: Props) => {
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
                <h2>Портфолио</h2>
                <div className={cx("cards")}>
                    {listItem.slice(-7).map((el, index) => (
                        <CaseCard
                            image={`${API_BASE}/picture/${el.pictureId}`}
                            onClick={() => handleOnModal(el)}
                            key={index}
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
