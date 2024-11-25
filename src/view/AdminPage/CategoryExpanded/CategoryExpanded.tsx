import { memo, useCallback, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import cnBind from "classnames/bind";
import { Column } from "primereact/column";
import type { DataTableRowData, DataTableRowToggleEvent, DataTableValue } from "primereact/datatable";

import { categoryDeleteApi } from "@/api/categoryDeleteApi";
import { categoryUpdateApi } from "@/api/categoryUpdateApi";
import { districtCreateApi } from "@/api/districtCreateApi";
import type { districtCreateApiParams } from "@/api/districtCreateApi/districtCreateApi";
import { getCategoryListApi } from "@/api/getCategoryListApi";
import type { GetCategoryListApiRawResponse } from "@/api/getCategoryListApi/types";
import type { PortfolioUpdateApiParams } from "@/api/portfolioUpdateApi";
import { ConfirmModal } from "@/components/_Modals/ConfirmModal";
import { useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import type {
    ModalAdministeredCategoryModel,
    ModalAdministeredCategoryRef,
} from "@/components/_Modals/ModalAdministeredCategory";
import { ModalAdministeredCategory } from "@/components/_Modals/ModalAdministeredCategory";
import type {
    ModalAdministeredPagesModel,
    ModalAdministeredPagesRef,
} from "@/components/_Modals/ModalAdministeredPages";
import { ModalAdministeredPages } from "@/components/_Modals/ModalAdministeredPages";
import { SmartTable } from "@/components/SmartTable";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import type { GetCategoryDto, GetSectionDto } from "@/entities/types/entities";
import { ContentSatus } from "@/entities/types/entities";
import { useToast } from "@/shared/context";
import { useBooleanState } from "@/shared/hooks";
import { ActionButton } from "@/shared/ui/ActionButton";
import { DistrictExpanded } from "@/view/AdminPage/DistrictExpanded";
import { preparePagesUpdateData } from "@/view/AdminPage/utils";

import styles from "./CategoryExpanded.module.scss";

const cx = cnBind.bind(styles);

export type TableCategoryExpandedProps = DataTableRowData<GetSectionDto[]>;
export const CategoryExpanded = memo(({ id }: TableCategoryExpandedProps) => {
    const modalRef = useRef<ModalAdministeredCategoryRef>(null);
    const pagesModalRef = useRef<ModalAdministeredPagesRef>(null);
    const toast = useToast();
    const [createModalIsOpen, openCreateModal, closeCreateModal] = useBooleanState(false);
    const [additionalModalIsOpen, openAdditionalModal, closeAdditionalModal] = useBooleanState(false);
    const [, setCreateModalType] = useState<"create" | "edit">("create");
    const [additionalModalType, setAdditionalModalType] = useState<"create" | "edit">("create");
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();
    const [expandedRows, setExpandedRows] = useState<GetSectionDto[]>([]);
    const {
        data: category,
        fetchStatus: categoryFetchStatus,
        refetch: refetchCategory,
    } = useQuery<GetCategoryListApiRawResponse>({
        queryKey: ["category", id],
        queryFn: () => getCategoryListApi(id),
    });

    const { mutate: deleteCategoryMutation } = useMutation({ mutationFn: categoryDeleteApi });
    const { mutate: updateCategoryMutation, isPending: updateCategoryIsLoading } = useMutation({
        mutationFn: categoryUpdateApi,
    });

    const { mutate: createDistrictMutation, isPending: createDistrictIsLoading } = useMutation({
        mutationFn: districtCreateApi,
    });

    const structure: SmartTableStructureItem<DataTableValue>[] = [
        { field: "", header: "Категория", minWidth: 30, expander: true },
        { field: "number", header: "№(id)", width: 50, sortable: true },
        { field: "title", header: "Наименование" },
        { field: "status", header: "Статус" },
    ];
    const handleRowExpand = (event: DataTableRowToggleEvent) => {
        setExpandedRows(event.data as GetSectionDto[]);
    };
    const handleRowCreate = (rowData: GetCategoryDto) => () => {
        openAdditionalModal();
        setAdditionalModalType("create");
        pagesModalRef.current?.setFormValues({
            categoryId: rowData.id,
        });
    };

    const handleEditRow = (data: GetCategoryDto) => () => {
        openCreateModal();
        setCreateModalType("edit");
        modalRef.current?.setFormValues(data);
    };
    const handleDeleteCategory = (rowData: GetCategoryDto) => () => {
        withConfirm({
            header: "Удалить?",
            message: `Удаление этого метода оплаты "${rowData.title}" может привести к необратимой потере данных`,
            onSubmit: () => deleteCategoryMutation({ id: rowData.id, status: ContentSatus.ARCHIVE }),
            onClose: () => undefined,
        });
    };

    const rowExpandTemplate = (data: GetCategoryDto) => {
        return <DistrictExpanded {...data} />;
    };

    const handlePagesModalSubmit = useCallback(
        (data: ModalAdministeredCategoryModel) => {
            const updatePayload: PortfolioUpdateApiParams = preparePagesUpdateData(data);

            const onSuccess = () => {
                closeCreateModal();
                void refetchCategory();
                setCreateModalType("create");
                modalRef?.current?.clearValues();
                toast?.({
                    severity: "success",
                    summary: "Успех",
                    detail: `Категория ${data.title} была "изменен"`,
                });
            };
            const onError = () => {
                toast?.({
                    severity: "error",
                    summary: "Ошибка",
                    detail: `При редактировании категории ${data.title} возникла ошибка`,
                });
            };
            updateCategoryMutation(updatePayload, { onSuccess, onError });
        },
        [closeCreateModal, toast],
    );

    const handleDistrictModalSubmit = useCallback(
        (data: ModalAdministeredPagesModel) => {
            const createPayload: districtCreateApiParams = {
                categoryId: data.categoryId,
                title: data.title,
                status: data.status,
                description: data.description,
                file: data.file,
                subTitle: data.subTitle,
                areaId: data.districtId,
            };

            const onSuccess = () => {
                closeAdditionalModal();
                void refetchCategory();
                setAdditionalModalType("create");
                pagesModalRef?.current?.clearValues();
                toast?.({
                    severity: "success",
                    summary: "Успех",
                    detail: `Район ${data.title} был создан`,
                });
            };
            const onError = () => {
                toast?.({
                    severity: "error",
                    summary: "Ошибка",
                    detail: `При создание района ${data.title} возникла ошибка`,
                });
            };
            createDistrictMutation(createPayload, { onSuccess, onError });
        },
        [closeCreateModal, toast],
    );

    const rowEditorTemplate = (data: GetCategoryDto) => {
        return (
            <ActionButton
                menuItems={[
                    { label: "Редактировать", icon: "pi pi-trash", callback: handleEditRow(data) },
                    { label: "Добавить район", icon: "pi pi-trash", callback: handleRowCreate(data) },
                    { label: "Архив", icon: "pi pi-trash", callback: handleDeleteCategory(data) },
                ]}
            />
        );
    };

    const handleCloseCreateModal = () => {
        closeCreateModal();
        setCreateModalType("create");
        modalRef.current?.clearValues();
    };

    const handleCloseAdditionalModal = () => {
        closeAdditionalModal();
        setAdditionalModalType("create");
        pagesModalRef.current?.clearValues();
    };

    return (
        <>
            <SmartTable<GetCategoryDto[]>
                className={cx("table")}
                structure={structure}
                value={category || []}
                scrollHeight="flex"
                responsiveLayout="scroll"
                expandedRows={expandedRows}
                status={categoryFetchStatus}
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
            <ModalAdministeredCategory
                ref={modalRef}
                isOpen={createModalIsOpen}
                onClose={handleCloseCreateModal}
                type="edit"
                onSubmit={handlePagesModalSubmit}
                isLoading={updateCategoryIsLoading}
            />
            <ModalAdministeredPages
                ref={pagesModalRef}
                isOpen={additionalModalIsOpen}
                onClose={handleCloseAdditionalModal}
                type={additionalModalType}
                onSubmit={handleDistrictModalSubmit}
                isLoading={createDistrictIsLoading}
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
