import type { FetchStatus } from "@tanstack/query-core";
import cnBind from "classnames/bind";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import type { DataTableProps, DataTableValueArray } from "primereact/datatable";
import { DataTable } from "primereact/datatable";

import type { SmartTableStructureItem } from "@/components/SmartTable/types";

import { SmartTableFooter } from "./SmartTableFooter";

import styles from "./SmartTable.module.scss";

const cx = cnBind.bind(styles);

export type SmartTableProps<T extends DataTableValueArray> = DataTableProps<T> & {
    status?: FetchStatus;
    structure: SmartTableStructureItem<T[number]>[];
    isLoading?: boolean;
    isError?: boolean;
    isFulfilled?: boolean;
    widthFooter?: boolean;
    totalPages?: number;
    page?: number;
    totalItems?: number;
    onNextClick?: () => void;
    onPrevClick?: () => void;
};
export const SmartTable = <T extends DataTableValueArray>({
    status,
    isLoading,
    className,
    structure,
    isError,
    children,
    widthFooter,
    totalItems,
    totalPages,
    onNextClick,
    onPrevClick,
    page,
    ...props
}: SmartTableProps<T>) => {
    return (
        <div className={cx("smart-table")}>
            <DataTable
                {...props}
                footer={
                    widthFooter ? (
                        <SmartTableFooter
                            page={page}
                            totalItems={totalItems}
                            totalPages={totalPages}
                            onNextClick={onNextClick}
                            onPrevClick={onPrevClick}
                        />
                    ) : undefined
                }
                className={cx("table", className)}
                loading={status === "fetching" || isLoading}
            >
                {structure.map(({ width, minWidth, maxWidth, className, ...props }, index) => (
                    <Column
                        {...props}
                        className={cx("column", className)}
                        key={`${String(props.field)} + ${index}`}
                        style={{ width, minWidth, maxWidth }}
                    />
                ))}
                {children}
            </DataTable>
            {isError && (
                <div className={cx("message-loading")}>
                    <div>Ошибка</div>
                    <Button outlined label="Рефетч" />
                </div>
            )}
        </div>
    );
};
