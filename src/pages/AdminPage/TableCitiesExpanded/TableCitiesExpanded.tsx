import { memo, useCallback, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import cnBind from "classnames/bind";
import { format } from "date-fns";
import { Column } from "primereact/column";
import type { DataTableRowData, DataTableValue } from "primereact/datatable";

import { districtDeleteApi } from "@/api/admin/districtDeleteApi";
import { districtUpdateApi } from "@/api/admin/districtUpdateApi";
import type { DistrictUpdateApiParams } from "@/api/admin/districtUpdateApi/districtUpdateApi";
import { getDistrictsListApi } from "@/api/admin/getDistrictsListApi";
import { ConfirmModal, useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import { ModalAdministeredDistrict } from "@/components/_Modals/ModalAdministeredDistrict";
import type {
    ModalAdministeredDistrictRef,
    ModalAdministeredDistrictResult,
} from "@/components/_Modals/ModalAdministeredDistrict/ModalAdministeredDistrict";
import { SmartTable } from "@/components/SmartTable";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import type { CityEntity, DistrictEntity } from "@/entities/types/entities";
import { IcTrash } from "@/shared/assets/icons";
import { useBooleanState } from "@/shared/hooks";
import { ActionButton } from "@/shared/ui/ActionButton";

import styles from "./TableCitiesExpanded.module.scss";

const cx = cnBind.bind(styles);

export type TableCitiesExpandedProps = DataTableRowData<CityEntity[]>;
export const TableCitiesExpanded = memo(({ id, cityName }: TableCitiesExpandedProps) => {
    const modalRef = useRef<ModalAdministeredDistrictRef>(null);
    const [createModalIsOpen, openCreateModal, closeCreateModal] = useBooleanState(false);
    const [, setCreateModalType] = useState<"create" | "edit">("create");
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();

    const { data, fetchStatus, refetch } = useQuery({
        queryKey: ["expanded-cities", id],
        queryFn: () => getDistrictsListApi({ cityId: id }),
        staleTime: 0,
    });

    const { mutate: deleteDistrictMutation } = useMutation({ mutationFn: districtDeleteApi });
    const { mutate: updateDistrictMutation, isPending: updateDistrictIsLoading } = useMutation({
        mutationFn: districtUpdateApi,
    });

    const structure: SmartTableStructureItem<DataTableValue>[] = [
        { field: "id", header: "Id", sortable: true },
        { field: "districtName", header: "Название района" },
        { field: "createdBy", header: "Создал" },
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

    const handleEditRow = (data: DistrictEntity) => () => {
        openCreateModal();
        setCreateModalType("edit");
        const payload: ModalAdministeredDistrictResult = {
            id: data.id,
            cityId: id,
            cityName,
            name: data.districtName,
        };
        modalRef.current?.setFormValues(payload);
    };
    const handleDeleteEntity = (rowData: DistrictEntity) => () => {
        withConfirm({
            header: "Удалить?",
            message: `Удаление района "${rowData.districtName}" может привести к необратимой потере данных`,
            onSubmit: () => deleteDistrictMutation({ id: rowData.id }, { onSuccess: () => refetch() }),
            onClose: () => undefined,
        });
    };

    const rowEditorTemplate = (data: DistrictEntity) => {
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

    const handleDistrictModalSubmit = useCallback(
        (data: ModalAdministeredDistrictResult) => {
            const updatePayload: DistrictUpdateApiParams = {
                id: data.id || NaN,
                name: data.name,
                cityId: data.cityId,
            };

            const onSuccess = () => {
                closeCreateModal();
                void refetch();
                modalRef?.current?.clearValues();
            };

            updateDistrictMutation(updatePayload, { onSuccess });
        },
        [closeCreateModal, refetch, updateDistrictMutation],
    );

    return (
        <>
            <SmartTable<DistrictEntity[]>
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
            <ModalAdministeredDistrict
                ref={modalRef}
                isOpen={createModalIsOpen}
                onClose={handleCloseCreateModal}
                type="edit"
                onSubmit={handleDistrictModalSubmit}
                isLoading={updateDistrictIsLoading}
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
