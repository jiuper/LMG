import type { SyntheticEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { DataTableRowToggleEvent, SortOrder } from "primereact/datatable";
import type { Toast } from "primereact/toast";
import type { FormEvent } from "primereact/ts-helpers";

import type { GetArticlesListApiRawResponse } from "@/api/getArticlesListApi/types";
import { getNewsListApi } from "@/api/getNewsListApi";
import type { GetNewsListApiRawResponse } from "@/api/getNewsListApi/types";
import type { GetPortfolioListApiRawResponse } from "@/api/getPortfolioListApi/types";
import type { NewsCreateApiParams } from "@/api/newsCreateApi/newsCreateApi";
import type { NewsUpdateApiParams } from "@/api/newsUpdateApi/newsUpdateApi";
import { useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import type {
    ModalAdministeredArticleModel,
    ModalAdministeredArticleRef,
} from "@/components/_Modals/ModalAdministeredArticle";
import type { ModalAdministeredNewsModel, ModalAdministeredNewsRef } from "@/components/_Modals/ModalAdministeredNews";
import { ContentSatus } from "@/entities/types/entities";
import { useToast } from "@/shared/context";
import { useBooleanState } from "@/shared/hooks";
import { ActionButton } from "@/shared/ui/ActionButton";
import { REQUEST_ENTITIES_FN_MAP } from "@/view/AdminPage/constants";

import { AdminEntityPageV } from "./AdminEntityPageV";
import type { AnyEntity } from "./types";
import { AdminEntityPageType } from "./types";
import {
    getDeleteEntityConfirmMessage,
    prepareNewsCreateData,
    prepareNewsEditFormValues,
    prepareNewsUpdateData,
    useEntityCreate,
    useEntityDelete,
    useEntityUpdate,
} from "./utils";

export interface AdminEntityPageFilters {
    title?: string;
    term?: string;
    name?: string;
    email?: string;
    source?: number;
    userName?: string;
    cityIds?: number[];
    developerIds?: number[];
    districtIds?: number[];
}
export interface AdminEntityPageProps {
    entityType: AdminEntityPageType;
}
const AdminEntityPageC = ({ entityType }: AdminEntityPageProps) => {
    const router = useRouter();
    const toast = useToast();
    const [filters, setFilters] = useState<AdminEntityPageFilters>({});
    const [page, setPage] = useState(0);
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();

    const toastRef = useRef<Toast>(null);
    const newsModalRef = useRef<ModalAdministeredNewsRef>(null);
    const articleModalRef = useRef<ModalAdministeredArticleRef>(null);

    const createEntity = useEntityCreate();
    const updateEntity = useEntityUpdate();
    const deleteEntity = useEntityDelete();

    const [additionalModalIsOpen, openAdditionalModal, closeAdditionalModal] = useBooleanState(false);
    const [createModalIsOpen, openCreateModal, closeCreateModal] = useBooleanState(false);

    const [createModalType, setCreateModalType] = useState<"create" | "edit">("create");
    const [sort, setSort] = useState<{ column: string; direction: SortOrder }>({ column: "id", direction: -1 });

    const [expandedRows, setExpandedRows] = useState<AnyEntity[]>([]);

    const {
        data: entityData,
        fetchStatus: entityStatus,
        refetch: entityRefetch,
    } = useQuery<GetNewsListApiRawResponse | GetArticlesListApiRawResponse | GetPortfolioListApiRawResponse>({
        queryKey: ["entity", entityType],
        queryFn: () => REQUEST_ENTITIES_FN_MAP[entityType](),
    });

    const { data: newsData } = useQuery<GetNewsListApiRawResponse>({
        queryKey: ["news", AdminEntityPageType.NEWS],
        queryFn: () => getNewsListApi(),
        enabled: entityType === AdminEntityPageType.NEWS,
    });

    // const totalPages = entityData?.count ? Math.ceil(entityData.count / ITEMS_FOR_PAGE) : 0;

    const handleEntityTypeChange = ({ value }: FormEvent<AdminEntityPageType, SyntheticEvent<Element, Event>>) => {
        if (!value) return;
        void router.push(value);
    };

    const handleNewsModalSubmit = useCallback(
        (data: ModalAdministeredNewsModel) => {
            const createPayload: NewsCreateApiParams = prepareNewsCreateData(data);
            const updatePayload: NewsUpdateApiParams = prepareNewsUpdateData(data);

            const onSuccess = () => {
                closeCreateModal();
                void entityRefetch();
                setCreateModalType("create");
                newsModalRef?.current?.clearValues();
                toast?.({
                    severity: "success",
                    summary: "Успех",
                    detail: `Новость ${data.title} была ${createModalType === "create" ? "создана" : "изменена"}`,
                });
            };
            const onError = () => {
                toast?.({
                    severity: "error",
                    summary: "Ошибка",
                    detail: `При ${createModalType === "create" ? "создании" : "редактировании"} новости ${
                        data.title
                    } возникла ошибка`,
                });
            };

            switch (createModalType) {
                case "create":
                    createEntity[AdminEntityPageType.NEWS].mutate(createPayload, { onSuccess, onError });
                    break;
                case "edit":
                    updateEntity[AdminEntityPageType.NEWS].mutate(updatePayload, { onSuccess, onError });
                    break;
                default:
                    return false;
            }
        },
        [closeCreateModal, createEntity, createModalType, entityRefetch, toast, updateEntity],
    );

    const handleArticleModalSubmit = useCallback(
        (data: ModalAdministeredArticleModel) => {
            const createPayload: NewsCreateApiParams = prepareNewsCreateData(data);
            const updatePayload: NewsUpdateApiParams = prepareNewsUpdateData(data);

            const onSuccess = () => {
                closeCreateModal();
                void entityRefetch();
                setCreateModalType("create");
                articleModalRef?.current?.clearValues();
                toast?.({
                    severity: "success",
                    summary: "Успех",
                    detail: `Новость ${data.title} была ${createModalType === "create" ? "создана" : "изменена"}`,
                });
            };
            const onError = () => {
                toast?.({
                    severity: "error",
                    summary: "Ошибка",
                    detail: `При ${createModalType === "create" ? "создании" : "редактировании"} новости ${
                        data.title
                    } возникла ошибка`,
                });
            };

            switch (createModalType) {
                case "create":
                    createEntity[AdminEntityPageType.ARTICLES].mutate(createPayload, { onSuccess, onError });
                    break;
                case "edit":
                    updateEntity[AdminEntityPageType.ARTICLES].mutate(updatePayload, { onSuccess, onError });
                    break;
                default:
                    return false;
            }
        },
        [closeCreateModal, createEntity, createModalType, entityRefetch, toast, updateEntity],
    );

    const handleDeleteEntity = (entity: AnyEntity) => () => {
        const confirmMessage = getDeleteEntityConfirmMessage(entity, entityType);

        const onSuccess = () => {
            void entityRefetch();
            toast?.({
                severity: "success",
                summary: "Успех",
                detail: `Сущность ${entityType} была удалена`,
            });
        };
        const onError = () => {
            toast?.({
                severity: "error",
                summary: "Ошибка",
                detail: `При попытке удалить сущность ${entityType} возникла ошибка`,
            });
        };

        withConfirm({
            header: "Удалить?",
            message: confirmMessage,
            onSubmit: () =>
                deleteEntity[entityType]?.mutate(
                    { id: entity.id, status: ContentSatus.ARCHIVE },
                    { onSuccess, onError },
                ),
            onClose: () => undefined,
        });
    };

    const handleRestoreEntity = (entity: AnyEntity) => () => {
        const confirmMessage = getDeleteEntityConfirmMessage(entity, entityType);

        const onSuccess = () => {
            void entityRefetch();
            toast?.({
                severity: "success",
                summary: "Успех",
                detail: `Сущность ${entityType} была восстановлена`,
            });
        };
        const onError = () => {
            toast?.({
                severity: "error",
                summary: "Ошибка",
                detail: `При попытке удалить сущность ${entityType} возникла ошибка`,
            });
        };

        withConfirm({
            header: "Восстановить?",
            message: confirmMessage,
            onSubmit: () =>
                deleteEntity[entityType]?.mutate(
                    { id: entity.id, status: ContentSatus.PUBLISHED },
                    { onSuccess, onError },
                ),
            onClose: () => undefined,
        });
    };

    const handleRowEdit = (rowData: AnyEntity) => () => {
        openCreateModal();
        setCreateModalType("edit");
        switch (entityType) {
            case AdminEntityPageType.NEWS:
                newsModalRef.current?.setFormValues(
                    prepareNewsEditFormValues({
                        entity: rowData,
                    }),
                );
                break;
            case AdminEntityPageType.ARTICLES:
                articleModalRef.current?.setFormValues(
                    prepareNewsEditFormValues({
                        entity: rowData,
                    }),
                );

                break;
            // case AdminEntityPageType.PORTFOLIO:
            //     {
            //         const payload = prepareDeveloperEditFormValues({
            //             entity: rowData as DeveloperEntity,
            //         });
            //         developerModalRef.current?.setFormValues(payload);
            //     }
            //     break;
            // case AdminEntityPageType.PAGES:
            //     getCityInfoMutation(
            //         { id: rowData.id },
            //         {
            //             onSuccess: (res) => {
            //                 const payload = prepareCityEditFormValues(res);
            //                 cityModalRef.current?.setFormValues(payload);
            //             },
            //         },
            //     );
            //     break;
            default:
                return false;
        }
    };
    const handleSearchChange = useCallback(
        (value?: string | number) => {
            let key: string | undefined;

            switch (entityType) {
                case AdminEntityPageType.NEWS:
                    key = "userName";
                    break;
                case AdminEntityPageType.ARTICLES:
                    key = "title";
                    break;
                case AdminEntityPageType.PORTFOLIO:
                    key = "term";
                    break;
                case AdminEntityPageType.PAGES:
                    key = "name";
                    break;

                default:
                    break;
            }
            setFilters(() => (key && value ? { [key]: value } : {}));
        },
        [entityType],
    );

    const handleRowExpand = (event: DataTableRowToggleEvent) => {
        setExpandedRows(event.data as AnyEntity[]);
    };
    const rowEditorTemplate = (data: AnyEntity) => {
        switch (entityType) {
            case AdminEntityPageType.ARTICLES: {
                return (
                    <ActionButton
                        menuItems={[
                            {
                                label: "Редактировать",
                                icon: "pi pi-pencil",
                                callback: handleRowEdit(data),
                            },
                            {
                                label: data.status === ContentSatus.ARCHIVE ? "Восстановить" : "Архив",
                                icon: "pi pi-trash",
                                callback:
                                    data.status === ContentSatus.ARCHIVE
                                        ? handleRestoreEntity(data)
                                        : handleDeleteEntity(data),
                            },
                        ]}
                    />
                );
            }
            case AdminEntityPageType.NEWS:
                return (
                    <ActionButton
                        menuItems={[
                            {
                                label: "Редактировать",
                                icon: "pi pi-pencil",
                                callback: handleRowEdit(data),
                            },
                            {
                                label: data.status === ContentSatus.ARCHIVE ? "Восстановить" : "Архив",
                                icon: "pi pi-trash",
                                callback:
                                    data.status === ContentSatus.ARCHIVE
                                        ? handleRestoreEntity(data)
                                        : handleDeleteEntity(data),
                            },
                        ]}
                    />
                );
            case AdminEntityPageType.PORTFOLIO:
                return (
                    <ActionButton
                        menuItems={[
                            {
                                label: "Редактировать",
                                icon: "pi pi-pencil",
                                callback: handleRowEdit(data),
                            },
                            {
                                label: "Архив",
                                icon: "pi pi-trash",
                                callback: handleDeleteEntity(data),
                            },
                        ]}
                    />
                );
            case AdminEntityPageType.PAGES:
                return (
                    <ActionButton
                        menuItems={[
                            {
                                label: "Редактировать",
                                icon: "pi pi-pencil",
                                callback: handleRowEdit(data),
                            },
                            {
                                label: "Архив",
                                icon: "pi pi-trash",
                                callback: handleDeleteEntity(data),
                            },
                        ]}
                    />
                );
            default:
                return null;
        }
    };

    const handleCloseCreateModal = () => {
        closeCreateModal();
        setCreateModalType("create");
        newsModalRef.current?.clearValues();
        articleModalRef.current?.clearValues();
    };
    const handleCloseAdditionalModal = () => {
        closeAdditionalModal();
        newsModalRef.current?.clearValues();
        articleModalRef.current?.clearValues();
    };

    const createModalIsLoading = !!createEntity[entityType]?.isPending;
    const updateModalIsLoading = !!updateEntity[entityType]?.isPending;

    useEffect(() => {
        setPage(0);
    }, [filters, entityType, sort]);

    useEffect(() => {
        setSort({ column: "id", direction: -1 });
        setFilters({});
    }, [entityType]);

    return (
        <AdminEntityPageV
            entityType={entityType}
            filters={filters}
            entityOptions={newsData || []}
            totalPages={0}
            page={page + 1}
            totalItems={entityData?.length}
            sortField={sort?.column}
            sortOrder={sort?.direction}
            onNextClick={() => setPage(page + 1)}
            onPrevClick={() => setPage(page - 1)}
            onSort={(i) => setSort({ column: i.sortField, direction: i.sortOrder })}
            handleSearchChange={handleSearchChange}
            handleEntityTypeChange={handleEntityTypeChange}
            openCreateModal={openCreateModal}
            handleRowExpand={handleRowExpand}
            rowEditorTemplate={rowEditorTemplate}
            handleCloseCreateModal={handleCloseCreateModal}
            handleCloseAdditionalModal={handleCloseAdditionalModal}
            createModalIsLoading={createModalIsLoading}
            updateModalIsLoading={updateModalIsLoading}
            newsModalRef={newsModalRef}
            articleModalRef={articleModalRef}
            expandedRows={expandedRows}
            entityData={entityData}
            entityStatus={entityStatus}
            createModalType={createModalType}
            handleNewsModalSubmit={handleNewsModalSubmit}
            createModalIsOpen={createModalIsOpen}
            handleArticleModalSubmit={handleArticleModalSubmit}
            additionalModalIsOpen={additionalModalIsOpen}
            toastRef={toastRef}
            confirmModalProps={confirmModalProps}
        />
    );
};
export { AdminEntityPageC as AdminEntityPage };
