import { memo, useRef, useState } from "react";
import cnBind from "classnames/bind";
import { Column } from "primereact/column";
import type { DataTableRowData, DataTableRowToggleEvent, DataTableValue } from "primereact/datatable";

import { ConfirmModal } from "@/components/_Modals/ConfirmModal";
import { useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import { ModalAdministeredPages } from "@/components/_Modals/ModalAdministeredPages";
import { SmartTable } from "@/components/SmartTable";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import type { GetSectionDto, SectionArea } from "@/entities/types/entities";
import { useBooleanState } from "@/shared/hooks";
import { ActionButton } from "@/shared/ui/ActionButton";
import { DistrictExpanded } from "@/view/AdminPage/DistrictExpanded";

import styles from "./CategoryExpanded.module.scss";

const cx = cnBind.bind(styles);

export type TableCategoryExpandedProps = DataTableRowData<GetSectionDto[]>;
export const CategoryExpanded = memo(({ sectionArea }: TableCategoryExpandedProps) => {
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
    const handleRowExpand = (event: DataTableRowToggleEvent) => {
        setExpandedRows(event.data as GetSectionDto[]);
    };
    const handleDeletePaymentMethod = (rowData: GetSectionDto) => () => {
        withConfirm({
            header: "Удалить?",
            message: `Удаление этого метода оплаты "${rowData.title}" может привести к необратимой потере данных`,
            onSubmit: () => () => {},
            onClose: () => undefined,
        });
    };

    const rowExpandTemplate = (data: SectionArea) => {
        return <DistrictExpanded {...data} />;
    };

    const rowEditorTemplate = (data: GetSectionDto) => {
        return (
            <ActionButton
                menuItems={[
                    { label: "Редактировать", icon: "pi pi-trash", callback: handleDeletePaymentMethod(data) },
                    { label: "Добавить район", icon: "pi pi-trash", callback: openCreateModal },
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

    return (
        <>
            <SmartTable<SectionArea[]>
                className={cx("table")}
                structure={structure}
                value={sectionArea || []}
                scrollHeight="flex"
                responsiveLayout="scroll"
                expandedRows={expandedRows}
                rows={0}
                sortField="id"
                onRowToggle={handleRowExpand}
                rowExpansionTemplate={rowExpandTemplate}
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
