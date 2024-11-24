import { memo, useRef, useState } from "react";
import cnBind from "classnames/bind";
import { Column } from "primereact/column";
import type { DataTableRowData, DataTableValue } from "primereact/datatable";

import { ConfirmModal } from "@/components/_Modals/ConfirmModal";
import { useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import { ModalAdministeredEntity } from "@/components/_Modals/ModalAdministeredEntity";
import { SmartTable } from "@/components/SmartTable";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import type { Area, GetSectionDto, SectionArea } from "@/entities/types/entities";
import { useBooleanState } from "@/shared/hooks";
import { ActionButton } from "@/shared/ui/ActionButton";

import styles from "./EntityExpanded.module.scss";

const cx = cnBind.bind(styles);

export type TableDistrictExpandedProps = DataTableRowData<Area[]>;
export const EntityExpanded = memo((data: TableDistrictExpandedProps) => {
    const modalRef = useRef(null);
    const [createModalIsOpen, openCreateModal, closeCreateModal] = useBooleanState(false);
    const [, setCreateModalType] = useState<"create" | "edit">("create");
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();
    const [expandedRows, setExpandedRows] = useState<GetSectionDto[]>([]);
    const structure: SmartTableStructureItem<DataTableValue>[] = [
        { field: "", header: "", minWidth: 30, expander: true },
        { field: "number", header: "№(id)", sortable: true },
        { field: "sectionId", header: "sectionId" },
        { field: "areaId", header: "areaId" },
    ];
    const handleDeletePaymentMethod = (rowData: SectionArea) => () => {
        withConfirm({
            header: "Удалить?",
            message: `Удаление этого метода оплаты "${rowData.sectionId}" может привести к необратимой потере данных`,
            onSubmit: () => () => {},
            onClose: () => undefined,
        });
    };

    const rowEditorTemplate = (data: SectionArea) => {
        return (
            <ActionButton
                menuItems={[
                    { label: "Редактировать", icon: "pi pi-trash", callback: handleDeletePaymentMethod(data) },
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
    const areaArray: Area[] = [data];

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
