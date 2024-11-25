import { memo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import cnBind from "classnames/bind";
import { Column } from "primereact/column";
import type { DataTableRowData, DataTableValue } from "primereact/datatable";

import { getEntityListApi } from "@/api/getEntityListApi";
import type { GetEntityListApiRawResponse } from "@/api/getEntityListApi/types";
import { ConfirmModal } from "@/components/_Modals/ConfirmModal";
import { useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import { ModalAdministeredEntity } from "@/components/_Modals/ModalAdministeredEntity";
import { SmartTable } from "@/components/SmartTable";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import type { GetBuildDto, GetCategoryAreaDto } from "@/entities/types/entities";
import { useBooleanState } from "@/shared/hooks";
import { ActionButton } from "@/shared/ui/ActionButton";

import styles from "./EntityExpanded.module.scss";

const cx = cnBind.bind(styles);

export type TableDistrictExpandedProps = DataTableRowData<GetCategoryAreaDto[]>;
export const EntityExpanded = memo(({ areaId }: TableDistrictExpandedProps) => {
    const modalRef = useRef(null);
    const [createModalIsOpen, openCreateModal, closeCreateModal] = useBooleanState(false);
    const [, setCreateModalType] = useState<"create" | "edit">("create");
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();
    const structure: SmartTableStructureItem<DataTableValue>[] = [
        { field: "", header: "Юнит", minWidth: 30 },
        { field: "number", header: "№(id)", sortable: true },
        { field: "name", header: "Наименование" },
        { field: "status", header: "Статус" },
    ];
    const { data, fetchStatus } = useQuery<GetEntityListApiRawResponse>({
        queryKey: ["entity", areaId],
        queryFn: () => getEntityListApi(areaId),
    });
    const handleDeletePaymentMethod = (rowData: GetBuildDto) => () => {
        withConfirm({
            header: "Удалить?",
            message: `Удаление этого метода оплаты "${rowData.name}" может привести к необратимой потере данных`,
            onSubmit: () => () => {},
            onClose: () => undefined,
        });
    };

    const rowEditorTemplate = (data: GetBuildDto) => {
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

    return (
        <>
            <SmartTable<GetBuildDto[]>
                className={cx("table")}
                structure={structure}
                value={data || []}
                status={fetchStatus}
                scrollHeight="flex"
                responsiveLayout="scroll"
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
