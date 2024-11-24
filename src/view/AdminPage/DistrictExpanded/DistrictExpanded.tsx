import { memo, useRef, useState } from "react";
import cnBind from "classnames/bind";
import { Column } from "primereact/column";
import type { DataTableRowData, DataTableRowToggleEvent, DataTableValue } from "primereact/datatable";

import { ConfirmModal } from "@/components/_Modals/ConfirmModal";
import { useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import { ModalAdministeredEntity } from "@/components/_Modals/ModalAdministeredEntity";
import { SmartTable } from "@/components/SmartTable";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import type { Area, GetSectionDto, SectionArea } from "@/entities/types/entities";
import { useBooleanState } from "@/shared/hooks";
import { ActionButton } from "@/shared/ui/ActionButton";

import styles from "./DistrictExpanded.module.scss";

const cx = cnBind.bind(styles);

export type TableDistrictExpandedProps = DataTableRowData<SectionArea[]>;
export const DistrictExpanded = memo(({ area }: TableDistrictExpandedProps) => {
    const modalRef = useRef(null);
    const [createModalIsOpen, openCreateModal, closeCreateModal] = useBooleanState(false);
    const [, setCreateModalType] = useState<"create" | "edit">("create");
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();
    const [expandedRows, setExpandedRows] = useState<GetSectionDto[]>([]);
    const structure: SmartTableStructureItem<DataTableValue>[] = [
        { field: "", header: "", minWidth: 30, expander: true },
        { field: "number", header: "№(id)", sortable: true },
        { field: "name", header: "title" },
        { field: "status", header: "status" },
    ];
    const handleRowExpand = (event: DataTableRowToggleEvent) => {
        setExpandedRows(event.data as Area[]);
    };
    const handleDeletePaymentMethod = (rowData: Area) => () => {
        withConfirm({
            header: "Удалить?",
            message: `Удаление этого метода оплаты "${rowData.title}" может привести к необратимой потере данных`,
            onSubmit: () => () => {},
            onClose: () => undefined,
        });
    };

    // const rowExpandTemplate = (data: SectionArea) => {
    //     return <EntityExpanded {...({ area } as SectionArea)} />;
    // };

    const rowEditorTemplate = (data: Area) => {
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
        // modalRef.current?.clearValues();
    };
    const areaArray: Area[] = [area];

    return (
        <>
            <SmartTable<Area[]>
                className={cx("table")}
                structure={structure}
                value={areaArray || []}
                scrollHeight="flex"
                responsiveLayout="scroll"
                expandedRows={expandedRows}
                rows={0}
                sortField="id"
                onRowToggle={handleRowExpand}
                sortOrder={-1}
                scrollable
                removableSort
            >
                <Column header="Действия" frozen alignFrozen="right" body={rowEditorTemplate} />
            </SmartTable>
            <ModalAdministeredEntity
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
