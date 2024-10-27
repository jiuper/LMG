import { memo, useCallback, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import cnBind from "classnames/bind";
import { format } from "date-fns";
import { Column } from "primereact/column";
import type { DataTableRowData, DataTableValue } from "primereact/datatable";

import { unitDeleteApi } from "@/api/admin/unitDeleteApi/unitDeleteApi";
import type { UnitUpdateApiParams } from "@/api/admin/unitUpdateApi/unitUpdateApi";
import { unitUpdateApi } from "@/api/admin/unitUpdateApi/unitUpdateApi";
import { getApartmentsListApi } from "@/api/getApartmentsListApi";
import { ConfirmModal, useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import { ModalAdministeredUnit } from "@/components/_Modals/ModalAdministeredUnit";
import type {
    ModalAdministeredUnitModel,
    ModalAdministeredUnitRef,
} from "@/components/_Modals/ModalAdministeredUnit/ModalAdministeredUnit";
import { SmartTable } from "@/components/SmartTable";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import type { ApartmentsEntity, PropertyEntity } from "@/entities/types/entities";
import { IcTrash } from "@/shared/assets/icons";
import { useToast } from "@/shared/context";
import { useBooleanState } from "@/shared/hooks";
import { ActionButton } from "@/shared/ui/ActionButton";
import { TableStatusCrossBadge } from "@/shared/ui/TableStatusCrossBadge";
import { prepareUnitUpdateData } from "@/view/AdminPage/utils";

import styles from "./TablePropertyExpanded.module.scss";

const cx = cnBind.bind(styles);

export type TableUserExpandedProps = DataTableRowData<PropertyEntity[]>;
export const TablePropertyExpanded = memo(({ id }: TableUserExpandedProps) => {
    const toast = useToast();
    const modalRef = useRef<ModalAdministeredUnitRef>(null);
    const [createModalIsOpen, openCreateModal, closeCreateModal] = useBooleanState(false);
    const [_, setCreateModalType] = useState<"create" | "edit">("create");
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();
    const { data, fetchStatus, refetch } = useQuery({
        queryKey: ["expanded-property", id],
        queryFn: () => getApartmentsListApi({ propertyId: id }),
        staleTime: 0,
    });
    const { mutate: deleteUnitMutation } = useMutation({ mutationFn: unitDeleteApi });
    const { mutate: updateUnitMutation, isPending: updateUnitIsLoading } = useMutation({
        mutationFn: unitUpdateApi,
    });
    const structure: SmartTableStructureItem<DataTableValue>[] = [
        { field: "id", header: "Id", sortable: true },
        { field: "bedrooms", header: "Спальни" },
        { field: "floor", header: "Этажи" },
        { field: "price", header: "Цена" },
        {
            field: "isHidden",
            header: "Скрыт",
            body: ({ isHidden }) => TableStatusCrossBadge({ value: isHidden as boolean }),
        },
        {
            field: "isReservationAvailable",
            header: "Бронирование",
            body: ({ isReservationAvailable }) => TableStatusCrossBadge({ value: isReservationAvailable as boolean }),
        },
        { field: "createdBy", header: "Создал" },
        { field: "createdDate", header: "Дата создания" },
        { field: "updatedBy", header: "Обновил" },
        { field: "updatedDate", header: "Дата обновления" },
        {
            field: "createdDate",
            header: "Дата создания",
            body: ({ createdDate }) => format(new Date(createdDate as string), "MM.dd.yyyy KK:mm a"),
        },
        { field: "updatedBy", header: "Обновил" },
        {
            field: "updatedDate",
            header: "Дата обновления",
            body: ({ createdDate }) => format(new Date(createdDate as string), "MM.dd.yyyy KK:mm a"),
        },
    ];
    const handleEditRow = (data: ApartmentsEntity) => () => {
        openCreateModal();
        setCreateModalType("edit");
        const payload: ModalAdministeredUnitModel = {
            itemId: data.id,
            propertyId: id,
            price: data.price,
            currency: data.currency,
            bedrooms: data.bedrooms,
            floor: data.floor,
            photos: data.photos,
            availableCount: data.quantity,
            isReservationAvailable: data.isReservationAvailable,
            description: data.additional,
            isHidden: data.isHidden,
            areaMetric: data.areaMetric,
        };
        modalRef.current?.setFormValues(payload);
    };
    const handleDeleteEntity = (rowData: ApartmentsEntity) => () => {
        withConfirm({
            header: "Удалить?",
            message: `Удаление этого апартамента может привести к необратимой потере данных`,
            onSubmit: () => deleteUnitMutation({ id: rowData.id }, { onSuccess: () => refetch() }),
            onClose: () => undefined,
        });
    };
    const rowEditorTemplate = (data: ApartmentsEntity) => {
        return (
            <ActionButton
                menuItems={[
                    {
                        label: "Редактировать",
                        icon: "pi pi-pencil",
                        callback: handleEditRow(data),
                    },
                    {
                        label: "Удалить",
                        icon: "pi pi-trash",
                        callback: handleDeleteEntity(data),
                    },
                ]}
            />
        );
    };
    const handleCloseCreateModal = () => {
        closeCreateModal();
        setCreateModalType("create");
        modalRef.current?.clearValues();
    };
    const handleUnitModalSubmit = useCallback(
        (data: ModalAdministeredUnitModel) => {
            const updatePayload: UnitUpdateApiParams = prepareUnitUpdateData(data);

            const onSuccess = () => {
                closeCreateModal();
                void refetch();
                modalRef?.current?.clearValues();
            };
            const onError = () => {
                toast?.({
                    severity: "error",
                    summary: "Ошибка",
                    detail: `При попытке изменить юнит возникла ошибка`,
                });
            };

            updateUnitMutation(updatePayload, { onSuccess, onError });
        },
        [closeCreateModal, refetch, toast, updateUnitMutation],
    );

    return (
        <>
            <SmartTable<ApartmentsEntity[]>
                className={cx("table")}
                structure={structure}
                value={data?.data || []}
                status={fetchStatus}
                scrollHeight="flex"
                responsiveLayout="scroll"
                rows={data?.count || 0}
                sortField="id"
                sortOrder={-1}
                scrollable
                removableSort
            >
                <Column header="Действия" frozen alignFrozen="right" body={rowEditorTemplate} />
            </SmartTable>
            <ModalAdministeredUnit
                ref={modalRef}
                isOpen={createModalIsOpen}
                onClose={handleCloseCreateModal}
                type="edit"
                onSubmit={handleUnitModalSubmit}
                isLoading={updateUnitIsLoading}
            />
            <ConfirmModal
                {...confirmModalProps}
                submitBtnParams={{
                    severity: "danger",
                    iconPos: "left",
                    icon: <IcTrash />,
                    label: "Удалить",
                }}
            />
        </>
    );
});
