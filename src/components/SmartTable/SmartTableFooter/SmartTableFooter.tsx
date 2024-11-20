import React from "react";
import cnBind from "classnames/bind";
import { Button } from "primereact/button";

import styles from "./SmartTableFooter.module.scss";

export interface Props {
    totalPages?: number;
    page?: number;
    totalItems?: number;
    onNextClick?: () => void;
    onPrevClick?: () => void;
}

const cx = cnBind.bind(styles);

export const SmartTableFooter = ({ totalItems, totalPages, page, onNextClick, onPrevClick }: Props) => {
    return (
        <div className={cx("table-footer")}>
            <div className={cx("total")}>{`Количество: ${totalItems ?? ""}`}</div>
            <div className={cx("actions")}>
                <Button
                    className={cx("button")}
                    text
                    size="small"
                    severity="secondary"
                    type="button"
                    disabled={Number(page) <= 1}
                    onClick={onPrevClick}
                >
                    <i className={cx("pi pi-arrow-left")} />
                </Button>
                <div>{`${page ?? 0} из ${totalPages ?? 0}`}</div>
                <Button
                    className={cx("button")}
                    text
                    size="small"
                    severity="secondary"
                    type="button"
                    disabled={Number(page) >= Number(totalPages)}
                    onClick={onNextClick}
                >
                    <i className={cx("pi pi-arrow-right")} />
                </Button>
            </div>
        </div>
    );
};
1;
