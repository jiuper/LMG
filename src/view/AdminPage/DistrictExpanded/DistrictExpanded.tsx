import { memo, useCallback, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import cnBind from "classnames/bind";
import { Column } from "primereact/column";
import type { DataTableRowData, DataTableRowToggleEvent, DataTableValue } from "primereact/datatable";

import type { districtCreateApiParams } from "@/api/districtCreateApi/districtCreateApi";
import { districtDeleteApi } from "@/api/districtDeleteApi";
import { districtUpdateApi } from "@/api/districtUpdateApi";
import { entityCreateApi } from "@/api/entityCreateApi";
import type { entityCreateApiParams } from "@/api/entityCreateApi/entityCreateApi";
import { getDistrictListApi } from "@/api/getDistrictListApi";
import type { GetDistrictListApiRawResponse } from "@/api/getDistrictListApi/types";
import { ConfirmModal } from "@/components/_Modals/ConfirmModal";
import { useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import type {
    ModalAdministeredEntityModel,
    ModalAdministeredEntityRef,
} from "@/components/_Modals/ModalAdministeredEntity";
import { ModalAdministeredEntity } from "@/components/_Modals/ModalAdministeredEntity";
import type {
    ModalAdministeredPagesModel,
    ModalAdministeredPagesRef,
} from "@/components/_Modals/ModalAdministeredPages";
import { ModalAdministeredPages } from "@/components/_Modals/ModalAdministeredPages";
import { SmartTable } from "@/components/SmartTable";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import type { GetCategoryAreaDto, GetCategoryDto } from "@/entities/types/entities";
import { ContentSatus } from "@/entities/types/entities";
import { useToast } from "@/shared/context";
import { useBooleanState } from "@/shared/hooks";
import { ActionButton } from "@/shared/ui/ActionButton";
import { EntityExpanded } from "@/view/AdminPage/EntityExpanded";

import styles from "./DistrictExpanded.module.scss";

const cx = cnBind.bind(styles);

export type TableDistrictExpandedProps = DataTableRowData<GetCategoryDto[]>;
export const DistrictExpanded = memo(({ id }: TableDistrictExpandedProps) => {
    const modalRef = useRef<ModalAdministeredPagesRef>(null);
    const entityModalRef = useRef<ModalAdministeredEntityRef>(null);
    const [createModalIsOpen, openCreateModal, closeCreateModal] = useBooleanState(false);
    const [, setCreateModalType] = useState<"create" | "edit">("create");
    const toast = useToast();
    const [additionalModalIsOpen, openAdditionalModal, closeAdditionalModal] = useBooleanState(false);
    const [additionalModalType, setAdditionalModalType] = useState<"create" | "edit">("create");
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();
    const [expandedRows, setExpandedRows] = useState<GetCategoryDto[]>([]);
    const structure: SmartTableStructureItem<DataTableValue>[] = [
        { field: "", header: "Район", minWidth: 30, expander: true },
        { field: "area.number", header: "№(id)", width: 50, sortable: true },
        { field: "area.name", header: "Наименование" },
        { field: "status", header: "Статус" },
    ];
    const { data, fetchStatus, refetch } = useQuery<GetDistrictListApiRawResponse>({
        queryKey: ["district", id],
        queryFn: () => getDistrictListApi(id),
    });

    const { mutate: deleteDistrictMutation } = useMutation({ mutationFn: districtDeleteApi });
    const { mutate: updateDistrictMutation, isPending: updateDistrictIsLoading } = useMutation({
        mutationFn: districtUpdateApi,
        onSuccess: () => refetch(),
    });

    const { mutate: createEntityMutation, isPending: createEntityIsLoading } = useMutation({
        mutationFn: entityCreateApi,
        onSuccess: () => refetch(),
    });

    const handleRowExpand = (event: DataTableRowToggleEvent) => {
        setExpandedRows(event.data as GetCategoryDto[]);
    };

    const handleRowCreate = (rowData: GetCategoryAreaDto) => () => {
        openAdditionalModal();
        setAdditionalModalType("create");
        entityModalRef.current?.setFormValues({
            categoryAreaId: rowData.id,
        });
    };

    const handleEditRow = (data: GetCategoryAreaDto) => () => {
        openCreateModal();
        setCreateModalType("edit");
        modalRef.current?.setFormValues({ ...data, pictureId: data.pictureId || "" });
    };

    const handleDeleteDistrict = (rowData: GetCategoryAreaDto) => () => {
        withConfirm({
            header: `${rowData.status === ContentSatus.PUBLISHED ? "Архив" : "Восстановить"}`,
            message: `${rowData.status === ContentSatus.PUBLISHED ? `Поместить "${rowData.area.name}" район в архив` : `Восстановить "${rowData.area.name}" район из архива`}`,
            onSubmit: () =>
                deleteDistrictMutation({
                    id: rowData.id,
                    status: rowData.status === ContentSatus.ARCHIVE ? ContentSatus.PUBLISHED : ContentSatus.ARCHIVE,
                }),
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
                    { label: "Редактировать", icon: "pi pi-trash", callback: handleEditRow(data) },
                    { label: "Добавить юнит", icon: "pi pi-trash", callback: handleRowCreate(data) },
                    {
                        label: data.status === ContentSatus.ARCHIVE ? "Восстановить" : "Архив",
                        icon: "pi pi-trash",
                        callback: handleDeleteDistrict(data),
                    },
                ]}
            />
        );
    };

    const handleEntityModalSubmit = useCallback(
        (data: ModalAdministeredEntityModel) => {
            const createPayload: entityCreateApiParams = {
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
                buildAreaCoordinates: data.buildAreaCoordinates,
            };

            const onSuccess = () => {
                closeAdditionalModal();
                void refetch();
                setAdditionalModalType("create");
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
            createEntityMutation(createPayload, { onSuccess, onError });
        },
        [closeAdditionalModal, createEntityMutation, refetch, toast],
    );

    const handleDistrictModalSubmit = useCallback(
        (data: ModalAdministeredPagesModel) => {
            const updatePayload: districtCreateApiParams = {
                categoryId: data.categoryId,
                title: data.title,
                status: data.status,
                description: data.description,
                file: data.file,
                subTitle: data.subTitle,
                id: data.id,
                areaId: data.districtId,
            };

            const onSuccess = () => {
                closeCreateModal();
                void refetch();
                setCreateModalType("create");
                modalRef?.current?.clearValues();
                toast?.({
                    severity: "success",
                    summary: "Успех",
                    detail: `Район ${data.title} была "изменен"`,
                });
            };
            const onError = () => {
                toast?.({
                    severity: "error",
                    summary: "Ошибка",
                    detail: `При редактировании района ${data.title} возникла ошибка`,
                });
            };
            updateDistrictMutation(updatePayload, { onSuccess, onError });
        },
        [closeCreateModal, toast],
    );

    const handleCloseCreateModal = () => {
        closeCreateModal();
        setCreateModalType("create");
        modalRef.current?.clearValues();
    };

    const handleCloseAdditionalModal = () => {
        closeAdditionalModal();
        setAdditionalModalType("create");
        entityModalRef.current?.clearValues();
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
                onSubmit={handleDistrictModalSubmit}
                isLoading={updateDistrictIsLoading}
            />

            <ModalAdministeredEntity
                ref={entityModalRef}
                isOpen={additionalModalIsOpen}
                onClose={handleCloseAdditionalModal}
                type={additionalModalType}
                onSubmit={handleEntityModalSubmit}
                isLoading={createEntityIsLoading}
            />

            <ConfirmModal
                {...confirmModalProps}
                submitBtnParams={{
                    severity: "danger",
                    iconPos: "left",
                    label: "Ок",
                }}
            />
        </>
    );
});
