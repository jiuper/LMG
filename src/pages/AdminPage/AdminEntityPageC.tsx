import type { SyntheticEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { DataTableRowToggleEvent, SortOrder } from "primereact/datatable";
import type { DropdownChangeEvent } from "primereact/dropdown";
import type { MultiSelectChangeEvent } from "primereact/multiselect";
import type { Toast } from "primereact/toast";
import type { FormEvent } from "primereact/ts-helpers";

import { citiesSimpleListApi } from "@/api/admin/citiesSimpleListApi";
import type { CitiesSimpleListApiResponse } from "@/api/admin/citiesSimpleListApi/types";
import type { CityCreateApiParams } from "@/api/admin/cityCreateApi/cityCreateApi";
import type { CityUpdateApiParams } from "@/api/admin/cityUpdateApi/cityUpdateApi";
import type { DeveloperCreateApiParams } from "@/api/admin/developerCreateApi/developerCreateApi";
import { developersSimpleListApi } from "@/api/admin/developersSimpleListApi";
import type { DevelopersSimpleListApiResponse } from "@/api/admin/developersSimpleListApi/types";
import type { DeveloperUpdateApiParams } from "@/api/admin/developerUpdateApi/developerUpdateApi";
import type { DistrictCreateApiParams } from "@/api/admin/districtCreateApi/districtCreateApi";
import { districtCreateApi } from "@/api/admin/districtCreateApi/districtCreateApi";
import { districtsSimpleListApi } from "@/api/admin/districtsSimpleListApi";
import type { DistrictsSimpleListApiResponse } from "@/api/admin/districtsSimpleListApi/types";
import type { GetCitiesListApiResponse } from "@/api/admin/getCitiesListApi/types";
import { getCitiesSingleApi } from "@/api/admin/getCitiesSingleApi";
import type { GetEmailsListApiResponse } from "@/api/admin/getEmailsListApi/types";
import type { GetErrorsListApiResponse } from "@/api/admin/getErrorsListApi/types";
import type { GetPropertiesListApiResponse } from "@/api/admin/getPropertiesListApi/types";
import type { PropertyCreateApiParams } from "@/api/admin/propertyCreateApi/propertyCreateApi";
import type { PropertyUpdateApiParams } from "@/api/admin/propertyUpdateApi/propertyUpdateApi";
import type { UnitCreateApiParams } from "@/api/admin/unitCreateApi/unitCreateApi";
import { unitCreateApi } from "@/api/admin/unitCreateApi/unitCreateApi";
import type { GetDevelopersListApiResponse } from "@/api/getDevelopersListApi/types";
import type { GetUsersListApiResponse } from "@/api/getUsersListApi/types";
import type { UserCreateApiParams } from "@/api/userCreateApi/userCreateApi";
import type { UserUpdateApiParams } from "@/api/userUpdateApi/userUpdateApi";
import { useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import type {
    ModalAdministeredCityModel,
    ModalAdministeredCityRef,
} from "@/components/_Modals/ModalAdministeredCity/ModalAdministeredCity";
import type { ModalAdministeredDealsCountControllerRef } from "@/components/_Modals/ModalAdministeredDealsCount/ModalAdministeredDealsCountController";
import type {
    ModalAdministeredDeveloperRef,
    ModalAdministeredDeveloperResult,
} from "@/components/_Modals/ModalAdministeredDeveloper";
import type {
    ModalAdministeredDistrictRef,
    ModalAdministeredDistrictResult,
} from "@/components/_Modals/ModalAdministeredDistrict/ModalAdministeredDistrict";
import type {
    ModalAdministeredRealtyModel,
    ModalAdministeredRealtyRef,
} from "@/components/_Modals/ModalAdministeredRealty/ModalAdministeredRealty";
import type {
    ModalAdministeredUnitModel,
    ModalAdministeredUnitRef,
} from "@/components/_Modals/ModalAdministeredUnit/ModalAdministeredUnit";
import type { ModalAdministeredUserRef, ModalAdministeredUserResult } from "@/components/_Modals/ModalAdministeredUser";
import type {
    ApartmentsEntity,
    CityEntity,
    DeveloperEntity,
    ErrorLog,
    PropertyEntity,
    UserEntity,
} from "@/entities/types/entities";
import { queryClient } from "@/pages/_app.page";
import { useToast } from "@/shared/context";
import { useBooleanState } from "@/shared/hooks";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { ActionButton } from "@/shared/ui/ActionButton";
import { getSortDirection } from "@/shared/utils/filterAndSort";
import { ITEMS_FOR_PAGE, REQUEST_ENTITIES_FN_MAP } from "@/view/AdminPage/constants";
import { TableCitiesExpanded } from "@/view/AdminPage/TableCitiesExpanded";
import { TablePropertyExpanded } from "@/view/AdminPage/TablePropertyExpanded";
import { TableUserExpanded } from "@/view/AdminPage/TableUserExpanded";

import { AdminEntityPageV } from "./AdminEntityPageV";
import { ErrorLogExpanded } from "./ErrorLogExpanded";
import { useDropdownEntityOptions } from "./hooks";
import type { AnyEntity } from "./types";
import { AdminEntityPageType } from "./types";
import {
    getDeleteEntityConfirmMessage,
    prepareCityCreateData,
    prepareCityEditFormValues,
    prepareCityUpdateData,
    prepareDeveloperCreateData,
    prepareDeveloperEditFormValues,
    prepareDeveloperUpdateData,
    preparePropertyCreateData,
    preparePropertyEditFormValues,
    preparePropertyUpdateData,
    prepareUnitCreateData,
    prepareUserCreateData,
    prepareUserEditFormValues,
    prepareUserUpdateData,
    useEntityCreate,
    useEntityDelete,
    useEntityToggle,
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
    const debounceFilters = useDebouncedValue(filters, 500);

    const toastRef = useRef<Toast>(null);
    const userModalRef = useRef<ModalAdministeredUserRef>(null);
    const developerModalRef = useRef<ModalAdministeredDeveloperRef>(null);
    const propertyModalRef = useRef<ModalAdministeredRealtyRef>(null);
    const unitModalRef = useRef<ModalAdministeredUnitRef>(null);
    const cityModalRef = useRef<ModalAdministeredCityRef>(null);
    const districtModalRef = useRef<ModalAdministeredDistrictRef>(null);
    const userDealsCountModalRef = useRef<ModalAdministeredDealsCountControllerRef>(null);

    const createEntity = useEntityCreate();
    const updateEntity = useEntityUpdate();
    const deleteEntity = useEntityDelete();
    const toggleEntity = useEntityToggle();

    const entityOptions = useDropdownEntityOptions();

    const [additionalModalIsOpen, openAdditionalModal, closeAdditionalModal] = useBooleanState(false);
    const [createModalIsOpen, openCreateModal, closeCreateModal] = useBooleanState(false);

    const [createModalType, setCreateModalType] = useState<"create" | "edit">("create");
    const [sort, setSort] = useState<{ column: string; direction: SortOrder }>({ column: "id", direction: -1 });

    const [expandedRows, setExpandedRows] = useState<AnyEntity[]>([]);

    const {
        data: entityData,
        fetchStatus: entityStatus,
        refetch: entityRefetch,
    } = useQuery<
        | GetUsersListApiResponse
        | GetDevelopersListApiResponse
        | GetPropertiesListApiResponse
        | GetCitiesListApiResponse
        | GetEmailsListApiResponse
        | GetErrorsListApiResponse
    >({
        queryKey: ["entity", entityType, debounceFilters, page, sort],
        queryFn: () =>
            REQUEST_ENTITIES_FN_MAP[entityType]({
                page,
                size: ITEMS_FOR_PAGE,
                ...debounceFilters,
                ...{ ...sort, direction: getSortDirection(sort?.direction) },
            }),
        placeholderData: keepPreviousData,
    });

    const { data: citiesData } = useQuery<CitiesSimpleListApiResponse>({
        queryKey: ["cities", AdminEntityPageType.PROPERTIES],
        queryFn: () => citiesSimpleListApi(undefined),
        enabled: entityType === AdminEntityPageType.PROPERTIES,
    });
    const { data: developersData } = useQuery<DevelopersSimpleListApiResponse>({
        queryKey: ["developers", AdminEntityPageType.PROPERTIES],
        queryFn: () => developersSimpleListApi(undefined),
        enabled: entityType === AdminEntityPageType.PROPERTIES,
    });
    const { data: districtsData } = useQuery<DistrictsSimpleListApiResponse>({
        queryKey: ["districts", AdminEntityPageType.PROPERTIES],
        queryFn: () => districtsSimpleListApi(undefined),
        enabled: entityType === AdminEntityPageType.PROPERTIES,
    });
    const { mutate: createDistrictMutation, isPending: createDistrictIsLoading } = useMutation({
        mutationFn: districtCreateApi,
    });
    const { mutate: createUnitMutation, isPending: createUnitIsLoading } = useMutation({
        mutationFn: unitCreateApi,
    });
    const { mutate: getCityInfoMutation } = useMutation({ mutationFn: getCitiesSingleApi });

    const totalPages = entityData?.count ? Math.ceil(entityData.count / ITEMS_FOR_PAGE) : 0;

    const handleEntityTypeChange = ({ value }: FormEvent<AdminEntityPageType, SyntheticEvent<Element, Event>>) => {
        if (!value) return;
        void router.push(value);
    };

    const handleUserModalSubmit = useCallback(
        (data: ModalAdministeredUserResult) => {
            const createPayload: UserCreateApiParams = prepareUserCreateData(data);
            const updatePayload: UserUpdateApiParams = prepareUserUpdateData(data);

            const onSuccess = () => {
                closeCreateModal();
                void entityRefetch();
                setCreateModalType("create");
                userModalRef?.current?.clearValues();
                toast?.({
                    severity: "success",
                    summary: "Успех",
                    detail: `Пользователь ${data.userName} был ${createModalType === "create" ? "создан" : "изменен"}`,
                });
            };
            const onError = () => {
                toast?.({
                    severity: "error",
                    summary: "Ошибка",
                    detail: `При ${createModalType === "create" ? "создании" : "редактировании"} пользователя ${
                        data.userName
                    } возникла ошибка`,
                });
            };

            switch (createModalType) {
                case "create":
                    createEntity[AdminEntityPageType.USERS].mutate(createPayload, { onSuccess, onError });
                    break;
                case "edit":
                    updateEntity[AdminEntityPageType.USERS].mutate(updatePayload, { onSuccess, onError });
                    break;
                default:
                    return false;
            }
        },
        [closeCreateModal, createEntity, createModalType, entityRefetch, toast, updateEntity],
    );
    const handleDeveloperModalSubmit = useCallback(
        (data: ModalAdministeredDeveloperResult) => {
            const createPayload: DeveloperCreateApiParams = prepareDeveloperCreateData(data);
            const updatePayload: DeveloperUpdateApiParams = prepareDeveloperUpdateData(data);

            const onSuccess = () => {
                closeCreateModal();
                void entityRefetch();
                setCreateModalType("create");
                developerModalRef?.current?.clearValues();
            };

            switch (createModalType) {
                case "create":
                    createEntity[AdminEntityPageType.DEVELOPERS].mutate(createPayload, { onSuccess });
                    break;
                case "edit":
                    updateEntity[AdminEntityPageType.DEVELOPERS].mutate(updatePayload, { onSuccess });
                    break;
                default:
                    return false;
            }
        },
        [closeCreateModal, createEntity, createModalType, entityRefetch, updateEntity],
    );
    const handlePropertyModalSubmit = useCallback(
        (data: ModalAdministeredRealtyModel) => {
            const createPayload: PropertyCreateApiParams = preparePropertyCreateData(data);
            const updatePayload: PropertyUpdateApiParams = preparePropertyUpdateData(data);

            const onSuccess = () => {
                closeCreateModal();
                void entityRefetch();
                setCreateModalType("create");
                propertyModalRef?.current?.clearValues();
            };

            switch (createModalType) {
                case "create":
                    createEntity[AdminEntityPageType.PROPERTIES].mutate(createPayload, { onSuccess });
                    break;
                case "edit":
                    updateEntity[AdminEntityPageType.PROPERTIES].mutate(updatePayload, { onSuccess });
                    break;
                default:
                    return false;
            }
        },
        [closeCreateModal, createEntity, createModalType, entityRefetch, updateEntity],
    );
    const handleUnitModalSubmit = useCallback(
        (data: ModalAdministeredUnitModel) => {
            const createPayload: UnitCreateApiParams = prepareUnitCreateData(data);

            const onSuccess = () => {
                closeAdditionalModal();
                void entityRefetch();
                void queryClient.invalidateQueries({ queryKey: ["expanded-property"] });
                setCreateModalType("create");
                unitModalRef?.current?.clearValues();
            };
            const onError = () => {
                toast?.({
                    severity: "error",
                    summary: "Ошибка",
                    detail: `При попытке создать юнит возникла ошибка`,
                });
            };

            createUnitMutation(createPayload, { onSuccess, onError });
        },
        [closeAdditionalModal, createUnitMutation, entityRefetch, toast],
    );
    const handleCityModalSubmit = useCallback(
        (data: ModalAdministeredCityModel) => {
            const createPayload: CityCreateApiParams = prepareCityCreateData(data);
            const updatePayload: CityUpdateApiParams = prepareCityUpdateData(data);

            const onSuccess = () => {
                closeCreateModal();
                void entityRefetch();
                setCreateModalType("create");
                cityModalRef?.current?.clearValues();
            };

            switch (createModalType) {
                case "create":
                    createEntity[AdminEntityPageType.CITIES].mutate(createPayload, { onSuccess });
                    break;
                case "edit":
                    updateEntity[AdminEntityPageType.CITIES].mutate(updatePayload, { onSuccess });
                    break;
                default:
                    return false;
            }
        },
        [closeCreateModal, createEntity, createModalType, entityRefetch, updateEntity],
    );
    const handleDistrictModalSubmit = useCallback(
        (data: ModalAdministeredDistrictResult) => {
            const createPayload: DistrictCreateApiParams = {
                name: data.name,
                cityId: data.cityId,
            };

            const onSuccess = () => {
                closeAdditionalModal();
                void entityRefetch();
                void queryClient.invalidateQueries({ queryKey: ["expanded-cities"] });
                setCreateModalType("create");
                cityModalRef?.current?.clearValues();
            };

            createDistrictMutation(createPayload, { onSuccess });
        },
        [closeAdditionalModal, createDistrictMutation, entityRefetch],
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
            onSubmit: () => deleteEntity[entityType]?.mutate({ id: entity.id }, { onSuccess, onError }),
            onClose: () => undefined,
        });
    };
    const handleCreateDistrict = (rowData: CityEntity) => () => {
        openAdditionalModal();
        districtModalRef.current?.setFormValues({ cityName: rowData.cityName, cityId: rowData.id, name: "" });
    };
    const handleCreateUnit = (rowData: ApartmentsEntity, propertyId: PropertyEntity) => () => {
        openAdditionalModal();
        unitModalRef.current?.setFormValues({
            isHidden: rowData.isHidden,
            isReservationAvailable: rowData.isReservationAvailable,
            floor: rowData.floor,
            bedrooms: rowData.bedrooms,
            price: rowData.price,
            currency: rowData.currency,
            propertyId: propertyId.id,
        });
    };
    const handleToggleEntity = (rowData: AnyEntity) => () => {
        switch (entityType) {
            case AdminEntityPageType.USERS:
                {
                    const { id, userName } = rowData as UserEntity;
                    const isActive = "isActive" in rowData ? rowData.isActive : undefined;
                    const onSuccess = () => {
                        void entityRefetch();
                        toast?.({
                            severity: "success",
                            summary: "Успех",
                            detail: `Пользователь ${userName} был ${isActive ? "деактивирован" : "активирован"}`,
                        });
                    };
                    const onError = () => {
                        toast?.({
                            severity: "error",
                            summary: "Ошибка",
                            detail: `При ${
                                isActive ? "деактивировации" : "активировации"
                            } ользователя ${userName} возникла ошибка`,
                        });
                    };

                    toggleEntity[AdminEntityPageType.USERS]?.mutate({ id, status: !isActive }, { onSuccess, onError });
                }
                break;
            default:
        }
    };
    const handleRowEdit = (rowData: AnyEntity) => () => {
        openCreateModal();
        setCreateModalType("edit");

        switch (entityType) {
            case AdminEntityPageType.USERS:
                {
                    const payload = prepareUserEditFormValues({
                        entity: rowData as UserEntity,
                    });
                    userModalRef.current?.setFormValues(payload);
                }
                break;
            case AdminEntityPageType.PROPERTIES:
                {
                    const payload = preparePropertyEditFormValues({
                        entity: rowData as PropertyEntity,
                        cities: citiesData || [],
                        districts: districtsData || [],
                    });
                    propertyModalRef.current?.setFormValues(payload);
                }
                break;
            case AdminEntityPageType.DEVELOPERS:
                {
                    const payload = prepareDeveloperEditFormValues({
                        entity: rowData as DeveloperEntity,
                    });
                    developerModalRef.current?.setFormValues(payload);
                }
                break;
            case AdminEntityPageType.CITIES:
                getCityInfoMutation(
                    { id: rowData.id },
                    {
                        onSuccess: (res) => {
                            const payload = prepareCityEditFormValues(res);
                            cityModalRef.current?.setFormValues(payload);
                        },
                    },
                );
                break;
            default:
                return false;
        }
    };
    const handleSearchChange = useCallback(
        (value?: string | number) => {
            let key: string | undefined;

            switch (entityType) {
                case AdminEntityPageType.USERS:
                    key = "userName";
                    break;
                case AdminEntityPageType.DEVELOPERS:
                    key = "title";
                    break;
                case AdminEntityPageType.PROPERTIES:
                    key = "term";
                    break;
                case AdminEntityPageType.CITIES:
                    key = "name";
                    break;
                case AdminEntityPageType.EMAILS:
                    key = "email";
                    break;
                case AdminEntityPageType.ERRORS:
                    key = "source";
                    break;

                default:
                    break;
            }
            setFilters(() => (key && value ? { [key]: value } : {}));
        },
        [entityType],
    );

    const handleDevelopersChange = (event: MultiSelectChangeEvent) => {
        const value = event.target.value as number[];
        setFilters((prevState) => ({ ...prevState, developerIds: value }));
    };
    const handleCitiesChange = (event: MultiSelectChangeEvent) => {
        const value = event.target.value as number[];
        setFilters((prevState) => ({ ...prevState, cityIds: value }));
    };
    const handleDistrictChange = (event: MultiSelectChangeEvent) => {
        const value = event.target.value as number[];
        setFilters((prevState) => ({ ...prevState, districtIds: value }));
    };
    const handleErrorFilterChange = (event: DropdownChangeEvent) => {
        const value = event.target.value as number | undefined;
        setFilters((prevState) => ({ ...prevState, source: value }));
    };
    const handleRowExpand = (event: DataTableRowToggleEvent) => {
        setExpandedRows(event.data as AnyEntity[]);
    };
    const rowEditorTemplate = (data: AnyEntity) => {
        switch (entityType) {
            case AdminEntityPageType.USERS: {
                const entityData = data as UserEntity;

                return (
                    <ActionButton
                        menuItems={[
                            { label: "Редактировать", icon: "pi pi-pencil", callback: handleRowEdit(data) },
                            {
                                label: "Количество сделок",
                                icon: "pi pi-credit-card",
                                callback: () => {
                                    userDealsCountModalRef.current?.show({
                                        userId: entityData.id,
                                        maxActiveDeals: entityData.maxActiveDeals,
                                    });
                                },
                            },
                            {
                                label: (data as UserEntity).isActive ? "Отключить" : "Включить",
                                icon: "pi pi-wrench",
                                callback: handleToggleEntity(data),
                            },
                            { label: "Удалить", icon: "pi pi-trash", callback: handleDeleteEntity(data) },
                        ]}
                    />
                );
            }
            case AdminEntityPageType.PROPERTIES:
                return (
                    <ActionButton
                        menuItems={[
                            {
                                label: "Создать юнит",
                                icon: "pi pi-plus",
                                callback: handleCreateUnit(data as ApartmentsEntity, data as PropertyEntity),
                            },
                            {
                                label: "Редактировать",
                                icon: "pi pi-pencil",
                                callback: handleRowEdit(data),
                            },
                            {
                                label: "Удалить",
                                icon: "pi pi-trash",
                                callback: handleDeleteEntity(data),
                            },
                        ]}
                    />
                );
            case AdminEntityPageType.DEVELOPERS:
                return (
                    <ActionButton
                        menuItems={[
                            {
                                label: "Редактировать",
                                icon: "pi pi-pencil",
                                callback: handleRowEdit(data),
                            },
                            {
                                label: "Удалить",
                                icon: "pi pi-trash",
                                callback: handleDeleteEntity(data),
                            },
                        ]}
                    />
                );
            case AdminEntityPageType.CITIES:
                return (
                    <ActionButton
                        menuItems={[
                            {
                                label: "Создать район",
                                icon: "pi pi-plus",
                                callback: handleCreateDistrict(data as CityEntity),
                            },
                            {
                                label: "Редактировать",
                                icon: "pi pi-pencil",
                                callback: handleRowEdit(data),
                            },
                            {
                                label: "Удалить",
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
    const rowExpandTemplate = (data: AnyEntity) => {
        switch (entityType) {
            case AdminEntityPageType.USERS:
                return <TableUserExpanded {...(data as UserEntity)} />;
            case AdminEntityPageType.PROPERTIES:
                return <TablePropertyExpanded {...(data as PropertyEntity)} />;
            case AdminEntityPageType.CITIES:
                return <TableCitiesExpanded {...(data as CityEntity)} />;
            case AdminEntityPageType.ERRORS:
                return <ErrorLogExpanded {...(data as ErrorLog)} />;
            default:
                return null;
        }
    };

    const handleCloseCreateModal = () => {
        closeCreateModal();
        setCreateModalType("create");
        userModalRef.current?.clearValues();
        propertyModalRef.current?.clearValues();
        developerModalRef.current?.clearValues();
        cityModalRef.current?.clearValues();
    };
    const handleCloseAdditionalModal = () => {
        closeAdditionalModal();
        districtModalRef.current?.clearValues();
        unitModalRef.current?.clearValues();
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
            entityOptions={entityOptions}
            developersData={developersData}
            citiesData={citiesData}
            districtsData={districtsData}
            totalPages={totalPages}
            page={page + 1}
            totalItems={entityData?.count}
            sortField={sort?.column}
            sortOrder={sort?.direction}
            onNextClick={() => setPage(page + 1)}
            onPrevClick={() => setPage(page - 1)}
            onSort={(i) => setSort({ column: i.sortField, direction: i.sortOrder })}
            handleSearchChange={handleSearchChange}
            handleDevelopersChange={handleDevelopersChange}
            handleCitiesChange={handleCitiesChange}
            handleDistrictChange={handleDistrictChange}
            handleEntityTypeChange={handleEntityTypeChange}
            openCreateModal={openCreateModal}
            handleRowExpand={handleRowExpand}
            rowEditorTemplate={rowEditorTemplate}
            rowExpandTemplate={rowExpandTemplate}
            handleCloseCreateModal={handleCloseCreateModal}
            handleCloseAdditionalModal={handleCloseAdditionalModal}
            handleErrorFilterChange={handleErrorFilterChange}
            createModalIsLoading={createModalIsLoading}
            updateModalIsLoading={updateModalIsLoading}
            userModalRef={userModalRef}
            developerModalRef={developerModalRef}
            propertyModalRef={propertyModalRef}
            cityModalRef={cityModalRef}
            districtModalRef={districtModalRef}
            unitModalRef={unitModalRef}
            expandedRows={expandedRows}
            entityData={entityData}
            entityStatus={entityStatus}
            createModalType={createModalType}
            handleUserModalSubmit={handleUserModalSubmit}
            createModalIsOpen={createModalIsOpen}
            handleDeveloperModalSubmit={handleDeveloperModalSubmit}
            handlePropertyModalSubmit={handlePropertyModalSubmit}
            additionalModalIsOpen={additionalModalIsOpen}
            handleUnitModalSubmit={handleUnitModalSubmit}
            createUnitIsLoading={createUnitIsLoading}
            handleCityModalSubmit={handleCityModalSubmit}
            handleDistrictModalSubmit={handleDistrictModalSubmit}
            createDistrictIsLoading={createDistrictIsLoading}
            toastRef={toastRef}
            confirmModalProps={confirmModalProps}
            userDealsCountModalRef={userDealsCountModalRef}
        />
    );
};
export { AdminEntityPageC as AdminEntityPage };
