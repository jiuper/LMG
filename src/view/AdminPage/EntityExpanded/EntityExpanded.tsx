import { memo, useCallback, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import cnBind from "classnames/bind";
import { Column } from "primereact/column";
import type { DataTableRowData, DataTableValue } from "primereact/datatable";

import { entityDeleteApi } from "@/api/entityDeleteApi";
import { entityUpdateApi } from "@/api/entityUpdateApi";
import type { entityUpdateApiParams } from "@/api/entityUpdateApi/entityUpdateApi";
import { getEntityListApi } from "@/api/getEntityListApi";
import type { GetEntityListApiRawResponse } from "@/api/getEntityListApi/types";
import { ConfirmModal } from "@/components/_Modals/ConfirmModal";
import { useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import type {
    ModalAdministeredEntityModel,
    ModalAdministeredEntityRef,
} from "@/components/_Modals/ModalAdministeredEntity";
import { ModalAdministeredEntity } from "@/components/_Modals/ModalAdministeredEntity";
import { SmartTable } from "@/components/SmartTable";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import type { GetBuildDto, GetCategoryAreaDto } from "@/entities/types/entities";
import { ContentSatus } from "@/entities/types/entities";
import { useToast } from "@/shared/context";
import { useBooleanState } from "@/shared/hooks";
import { ActionButton } from "@/shared/ui/ActionButton";

import styles from "./EntityExpanded.module.scss";

const cx = cnBind.bind(styles);

export type TableDistrictExpandedProps = DataTableRowData<GetCategoryAreaDto[]>;
export const EntityExpanded = memo(({ id }: TableDistrictExpandedProps) => {
    const modalRef = useRef<ModalAdministeredEntityRef>(null);
    const toast = useToast();
    const [createModalIsOpen, openCreateModal, closeCreateModal] = useBooleanState(false);
    const [, setCreateModalType] = useState<"create" | "edit">("create");
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();
    const structure: SmartTableStructureItem<DataTableValue>[] = [
        { field: "", header: "Юнит", minWidth: 30 },
        { field: "number", header: "№(id)", sortable: true },
        { field: "name", header: "Наименование" },
        { field: "status", header: "Статус" },
    ];
    const { data, fetchStatus, refetch } = useQuery<GetEntityListApiRawResponse>({
        queryKey: ["entity", id],
        queryFn: () => getEntityListApi(id),
    });

    const { mutate: deleteEntityMutation } = useMutation({ mutationFn: entityDeleteApi });
    const { mutate: updateEntityMutation, isPending: updateEntityIsLoading } = useMutation({
        mutationFn: entityUpdateApi,
    });

    const handleEditRow = (data: GetBuildDto) => () => {
        openCreateModal();
        setCreateModalType("edit");
        modalRef.current?.setFormValues(data);
    };

    const handleDeleteEntity = (rowData: GetBuildDto) => () => {
        withConfirm({
            header: "Удалить?",
            message: `Удаление этого юнита"${rowData.name}" может привести к необратимой потере данных`,
            onSubmit: () => deleteEntityMutation({ id: rowData.id, status: ContentSatus.ARCHIVE }),
            onClose: () => undefined,
        });
    };

    const handleEntityModalSubmit = useCallback(
        (data: ModalAdministeredEntityModel) => {
            console.log(data);
            const updatePayload: entityUpdateApiParams = {
                categoryAreaId: data.categoryAreaId,
                name: data.name,
                status: data.status,
                coordinates: data.coordinates,
                gTitle: data.gTitle,
                list: data.list,
                gSubTitle: data.gSubTitle,
                number: data.number,
                id: data.id,
                wDescription: data.wDescription,
                file: data.file,
            };

            const onSuccess = () => {
                closeCreateModal();
                void refetch();
                setCreateModalType("create");
                modalRef?.current?.clearValues();
                toast?.({
                    severity: "success",
                    summary: "Успех",
                    detail: `Юнит ${data.name} был создан`,
                });
            };
            const onError = () => {
                toast?.({
                    severity: "error",
                    summary: "Ошибка",
                    detail: `При редактировании юнита ${data.name} возникла ошибка`,
                });
            };
            updateEntityMutation(updatePayload, { onSuccess, onError });
        },
        [closeCreateModal, toast],
    );

    const rowEditorTemplate = (data: GetBuildDto) => {
        return (
            <ActionButton
                menuItems={[
                    { label: "Редактировать", icon: "pi pi-trash", callback: handleEditRow(data) },
                    { label: "Архив", icon: "pi pi-trash", callback: handleDeleteEntity(data) },
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
                onSubmit={handleEntityModalSubmit}
                isLoading={updateEntityIsLoading}
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
