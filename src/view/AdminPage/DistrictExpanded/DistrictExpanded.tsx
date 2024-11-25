import { memo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import cnBind from "classnames/bind";
import { Column } from "primereact/column";
import type { DataTableRowData, DataTableRowToggleEvent, DataTableValue } from "primereact/datatable";

import { getDistrictListApi } from "@/api/getDistrictListApi";
import type { GetDistrictListApiRawResponse } from "@/api/getDistrictListApi/types";
import { ConfirmModal } from "@/components/_Modals/ConfirmModal";
import { useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import type { ModalAdministeredPagesRef } from "@/components/_Modals/ModalAdministeredPages";
import { ModalAdministeredPages } from "@/components/_Modals/ModalAdministeredPages";
import { SmartTable } from "@/components/SmartTable";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import type { GetCategoryAreaDto, GetCategoryDto } from "@/entities/types/entities";
import { useBooleanState } from "@/shared/hooks";
import { ActionButton } from "@/shared/ui/ActionButton";
import { EntityExpanded } from "@/view/AdminPage/EntityExpanded";

import styles from "./DistrictExpanded.module.scss";

const cx = cnBind.bind(styles);

export type TableDistrictExpandedProps = DataTableRowData<GetCategoryDto[]>;
export const DistrictExpanded = memo(({ id }: TableDistrictExpandedProps) => {
    const modalRef = useRef<ModalAdministeredPagesRef>(null);
    const [createModalIsOpen, openCreateModal, closeCreateModal] = useBooleanState(false);
    const [, setCreateModalType] = useState<"create" | "edit">("create");
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();
    const [expandedRows, setExpandedRows] = useState<GetCategoryDto[]>([]);
    const structure: SmartTableStructureItem<DataTableValue>[] = [
        { field: "", header: "Район", minWidth: 30, expander: true },
        { field: "area.number", header: "№(id)", width: 50, sortable: true },
        { field: "area.name", header: "Наименование" },
        { field: "area.status", header: "Статус" },
    ];
    const { data, fetchStatus } = useQuery<GetDistrictListApiRawResponse>({
        queryKey: ["district", id],
        queryFn: () => getDistrictListApi(id),
    });
    const handleRowExpand = (event: DataTableRowToggleEvent) => {
        setExpandedRows(event.data as GetCategoryDto[]);
    };
    const handleDeletePaymentMethod = (rowData: GetCategoryAreaDto) => () => {
        withConfirm({
            header: "Удалить?",
            message: `Удаление этого метода оплаты "${rowData.title}" может привести к необратимой потере данных`,
            onSubmit: () => () => {},
            onClose: () => undefined,
        });
    };

    const rowExpandTemplate = (data: GetCategoryAreaDto) => {
        return <EntityExpanded {...data} />;
    };

    const rowEditorTemplate = (data: GetCategoryAreaDto) => {
        return (
            <ActionButton
                menuItems={[
                    { label: "Редактировать", icon: "pi pi-trash", callback: handleDeletePaymentMethod(data) },
                    { label: "Добавить юнит", icon: "pi pi-trash", callback: openCreateModal },
                    { label: "Архив", icon: "pi pi-trash", callback: handleDeletePaymentMethod(data) },
                ]}
            />
        );
    };

    const handleCloseCreateModal = () => {
        closeCreateModal();
        setCreateModalType("create");
        modalRef.current?.clearValues();
    };

    return (
        <>
            <SmartTable<GetCategoryAreaDto[]>
                className={cx("table")}
                structure={structure}
                value={data || []}
                status={fetchStatus}
                scrollHeight="flex"
                responsiveLayout="scroll"
                expandedRows={expandedRows}
                rowExpansionTemplate={rowExpandTemplate}
                rows={0}
                sortField="id"
                onRowToggle={handleRowExpand}
                sortOrder={-1}
                scrollable
                removableSort
            >
                <Column header="Действия" frozen alignFrozen="right" body={rowEditorTemplate} />
            </SmartTable>
            <ModalAdministeredPages
                ref={modalRef}
                isOpen={createModalIsOpen}
                onClose={handleCloseCreateModal}
                type="edit"
                onSubmit={() => {}}
                isLoading={false}
            />

            <ConfirmModal
                {...confirmModalProps}
                submitBtnParams={{
                    severity: "danger",
                    iconPos: "left",
                    label: "Удалить",
                }}
            />
        </>
    );
});
