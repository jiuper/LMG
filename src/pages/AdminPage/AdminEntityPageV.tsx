import { type LegacyRef, type SyntheticEvent, useMemo } from "react";
import type { FetchStatus } from "@tanstack/query-core";
import cnBind from "classnames/bind";
import { Column } from "primereact/column";
import type { DataTableRowToggleEvent, DataTableStateEvent, SortOrder } from "primereact/datatable";
import type { DropdownChangeEvent } from "primereact/dropdown";
import type { MultiSelectChangeEvent } from "primereact/multiselect";
import type { SelectItemOptionsType } from "primereact/selectitem";
import { Toast } from "primereact/toast";
import type { FormEvent } from "primereact/ts-helpers";

import type { CitiesSimpleListApiResponse } from "@/api/admin/citiesSimpleListApi/types";
import type { DevelopersSimpleListApiResponse } from "@/api/admin/developersSimpleListApi/types";
import type { DistrictsSimpleListApiResponse } from "@/api/admin/districtsSimpleListApi/types";
import type { GetCitiesListApiResponse } from "@/api/admin/getCitiesListApi/types";
import type { GetEmailsListApiResponse } from "@/api/admin/getEmailsListApi/types";
import type { GetErrorsListApiResponse } from "@/api/admin/getErrorsListApi/types";
import type { GetPropertiesListApiResponse } from "@/api/admin/getPropertiesListApi/types";
import type { GetDevelopersListApiResponse } from "@/api/getDevelopersListApi/types";
import type { GetUsersListApiResponse } from "@/api/getUsersListApi/types";
import { ConfirmModal } from "@/components/_Modals/ConfirmModal";
import type { ConfirmModalProps } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import type {
    ModalAdministeredCityModel,
    ModalAdministeredCityRef,
} from "@/components/_Modals/ModalAdministeredCity/ModalAdministeredCity";
import { ModalAdministeredCity } from "@/components/_Modals/ModalAdministeredCity/ModalAdministeredCity";
import type { ModalAdministeredDealsCountControllerRef } from "@/components/_Modals/ModalAdministeredDealsCount/ModalAdministeredDealsCountController";
import { ModalAdministeredDealsCountController } from "@/components/_Modals/ModalAdministeredDealsCount/ModalAdministeredDealsCountController";
import type {
    ModalAdministeredDeveloperRef,
    ModalAdministeredDeveloperResult,
} from "@/components/_Modals/ModalAdministeredDeveloper";
import { ModalAdministeredDeveloper } from "@/components/_Modals/ModalAdministeredDeveloper";
import { ModalAdministeredDistrict } from "@/components/_Modals/ModalAdministeredDistrict";
import type {
    ModalAdministeredDistrictRef,
    ModalAdministeredDistrictResult,
} from "@/components/_Modals/ModalAdministeredDistrict/ModalAdministeredDistrict";
import type {
    ModalAdministeredRealtyModel,
    ModalAdministeredRealtyRef,
} from "@/components/_Modals/ModalAdministeredRealty";
import { ModalAdministeredRealty } from "@/components/_Modals/ModalAdministeredRealty";
import { ModalAdministeredUnit } from "@/components/_Modals/ModalAdministeredUnit";
import type {
    ModalAdministeredUnitModel,
    ModalAdministeredUnitRef,
} from "@/components/_Modals/ModalAdministeredUnit/ModalAdministeredUnit";
import type { ModalAdministeredUserRef, ModalAdministeredUserResult } from "@/components/_Modals/ModalAdministeredUser";
import { ModalAdministeredUser } from "@/components/_Modals/ModalAdministeredUser";
import { SmartTable } from "@/components/SmartTable";
import { PageLayout } from "@/layouts/PageLayout";
import { IcTrash } from "@/shared/assets/icons";
import { Button } from "@/shared/ui/_Button";
import { Dropdown } from "@/shared/ui/_Dropdown";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { MultiSelect } from "@/shared/ui/_MultiSelect";
import type { AdminEntityPageFilters } from "@/view/AdminPage/AdminEntityPageC";
import {
    ENTITIES_PAGE_TITLE_MAP,
    ENTITIES_TABLE_STRUCTURE,
    ERRORS_PAGE_FILTER_OPTIONS,
} from "@/view/AdminPage/constants";

import type { AnyEntity } from "./types";
import { AdminEntityPageType } from "./types";

import styles from "./AdminEntityPage.module.scss";

const cx = cnBind.bind(styles);

type PropsType = {
    entityType: AdminEntityPageType;
    citiesData?: CitiesSimpleListApiResponse;
    entityOptions: SelectItemOptionsType;
    developersData?: DevelopersSimpleListApiResponse;
    districtsData?: DistrictsSimpleListApiResponse;
    totalPages?: number;
    page?: number;
    totalItems?: number;
    sortField?: string;
    sortOrder?: SortOrder;
    onNextClick?: () => void;
    onPrevClick?: () => void;
    onSort?(event: DataTableStateEvent): void;
    handleSearchChange: (value?: string | number) => void;
    handleCitiesChange: (event: MultiSelectChangeEvent) => void;
    handleDevelopersChange: (event: MultiSelectChangeEvent) => void;
    handleDistrictChange: (event: MultiSelectChangeEvent) => void;
    handleErrorFilterChange: (event: DropdownChangeEvent) => void;
    filters: AdminEntityPageFilters;
    handleEntityTypeChange: ({ value }: FormEvent<AdminEntityPageType, SyntheticEvent<Element, Event>>) => void;
    handleRowExpand: (event: DataTableRowToggleEvent) => void;
    rowEditorTemplate: (data: AnyEntity) => JSX.Element | null;
    rowExpandTemplate: (data: AnyEntity) => JSX.Element | null;
    handleCloseCreateModal: () => void;
    handleCloseAdditionalModal: () => void;
    createModalIsLoading: boolean;
    updateModalIsLoading: boolean;
    userModalRef: React.RefObject<ModalAdministeredUserRef>;
    developerModalRef: React.RefObject<ModalAdministeredDeveloperRef>;
    propertyModalRef: React.RefObject<ModalAdministeredRealtyRef>;
    cityModalRef: React.RefObject<ModalAdministeredCityRef>;
    districtModalRef: React.RefObject<ModalAdministeredDistrictRef>;
    unitModalRef: React.RefObject<ModalAdministeredUnitRef>;
    expandedRows: AnyEntity[];
    openCreateModal: () => void;
    entityData?:
        | GetUsersListApiResponse
        | GetDevelopersListApiResponse
        | GetPropertiesListApiResponse
        | GetCitiesListApiResponse
        | GetEmailsListApiResponse
        | GetErrorsListApiResponse;
    entityStatus: FetchStatus;
    createModalType: "create" | "edit";
    handleUserModalSubmit: (data: ModalAdministeredUserResult) => false | undefined;
    createModalIsOpen: boolean;
    handleDeveloperModalSubmit: (data: ModalAdministeredDeveloperResult) => false | undefined;
    handlePropertyModalSubmit: (data: ModalAdministeredRealtyModel) => false | undefined;
    additionalModalIsOpen: boolean;
    handleUnitModalSubmit: (data: ModalAdministeredUnitModel) => void;
    createUnitIsLoading: boolean;
    handleCityModalSubmit: (data: ModalAdministeredCityModel) => void;
    handleDistrictModalSubmit: (data: ModalAdministeredDistrictResult) => void;
    createDistrictIsLoading: boolean;
    toastRef: React.RefObject<Toast>;
    confirmModalProps: ConfirmModalProps;
    userDealsCountModalRef: LegacyRef<ModalAdministeredDealsCountControllerRef>;
};
export const AdminEntityPageV = ({
    entityType,
    citiesData,
    entityOptions,
    developersData,
    districtsData,
    totalPages,
    page,
    totalItems,
    sortField,
    sortOrder,
    onNextClick,
    onPrevClick,
    onSort,
    handleSearchChange,
    handleCitiesChange,
    handleDevelopersChange,
    handleDistrictChange,
    handleRowExpand,
    rowEditorTemplate,
    rowExpandTemplate,
    handleCloseCreateModal,
    handleCloseAdditionalModal,
    createModalIsLoading,
    updateModalIsLoading,
    userModalRef,
    developerModalRef,
    propertyModalRef,
    cityModalRef,
    districtModalRef,
    unitModalRef,
    expandedRows,
    openCreateModal,
    filters,
    handleEntityTypeChange,
    entityData,
    entityStatus,
    createModalType,
    handleUserModalSubmit,
    createModalIsOpen,
    handleDeveloperModalSubmit,
    handlePropertyModalSubmit,
    additionalModalIsOpen,
    handleUnitModalSubmit,
    createUnitIsLoading,
    handleCityModalSubmit,
    handleDistrictModalSubmit,
    createDistrictIsLoading,
    handleErrorFilterChange,
    toastRef,
    confirmModalProps,
    userDealsCountModalRef,
}: PropsType) => {
    const filterValue = useMemo(() => {
        switch (entityType) {
            case AdminEntityPageType.USERS:
                return filters.userName || "";
            case AdminEntityPageType.DEVELOPERS:
                return filters.title || "";
            case AdminEntityPageType.PROPERTIES:
                return filters.term || "";
            case AdminEntityPageType.CITIES:
                return filters.name || "";
            case AdminEntityPageType.EMAILS:
                return filters.email || "";

            default:
                return "";
        }
    }, [entityType, filters.email, filters.name, filters.term, filters.title, filters.userName]);

    return (
        <PageLayout title={ENTITIES_PAGE_TITLE_MAP[entityType]}>
            <div className={cx("content")}>
                <div className={cx("block-toolbar")}>
                    <InputSearch isFullWidth value={filterValue} debounceDelay={500} onChange={handleSearchChange} />
                    {entityType === AdminEntityPageType.PROPERTIES && (
                        <>
                            <MultiSelect
                                options={citiesData}
                                value={filters.cityIds}
                                onChange={handleCitiesChange}
                                optionLabel="text"
                                optionValue="id"
                                placeholder="Город"
                                isFullWidth
                            />
                            <MultiSelect
                                options={developersData}
                                value={filters.developerIds}
                                onChange={handleDevelopersChange}
                                optionLabel="text"
                                optionValue="id"
                                placeholder="Застройщик"
                                isFullWidth
                            />
                            <MultiSelect
                                options={districtsData}
                                value={filters.districtIds}
                                onChange={handleDistrictChange}
                                optionLabel="text"
                                optionValue="id"
                                placeholder="Район"
                                isFullWidth
                            />
                        </>
                    )}
                    {entityType === AdminEntityPageType.ERRORS && (
                        <Dropdown
                            options={ERRORS_PAGE_FILTER_OPTIONS}
                            value={filters.source}
                            onChange={handleErrorFilterChange}
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Тип"
                            isFullWidth
                        />
                    )}
                    <Dropdown
                        options={entityOptions}
                        value={entityType}
                        onChange={handleEntityTypeChange}
                        optionLabel="title"
                        className={cx("type-dropdown")}
                        isFullWidth
                    />
                    {entityType === AdminEntityPageType.USERS && (
                        <Button className={cx("btn-neon")} label="Создать пользователя" onClick={openCreateModal} />
                    )}
                    {entityType === AdminEntityPageType.DEVELOPERS && (
                        <Button className={cx("btn-neon")} label="Создать застройщика" onClick={openCreateModal} />
                    )}
                    {entityType === AdminEntityPageType.PROPERTIES && (
                        <Button className={cx("btn-neon")} label="Создать недвижимость" onClick={openCreateModal} />
                    )}
                    {entityType === AdminEntityPageType.CITIES && (
                        <Button className={cx("btn-neon")} label="Создать город" onClick={openCreateModal} />
                    )}
                </div>

                <div className={cx("block-table")}>
                    <SmartTable<AnyEntity[]>
                        className={cx("table")}
                        structure={ENTITIES_TABLE_STRUCTURE[entityType]}
                        value={entityData?.data || []}
                        status={entityStatus}
                        scrollHeight="flex"
                        responsiveLayout="scroll"
                        rows={entityData?.count || 0}
                        totalPages={totalPages}
                        page={page}
                        lazy
                        totalItems={totalItems}
                        widthFooter
                        scrollable
                        removableSort
                        sortField={sortField}
                        sortOrder={sortOrder}
                        rowExpansionTemplate={rowExpandTemplate}
                        expandedRows={expandedRows}
                        onRowToggle={handleRowExpand}
                        onNextClick={onNextClick}
                        onPrevClick={onPrevClick}
                        onSort={onSort}
                    >
                        {entityType !== AdminEntityPageType.EMAILS && entityType !== AdminEntityPageType.ERRORS && (
                            <Column header="Действия" frozen alignFrozen="right" body={rowEditorTemplate} />
                        )}
                    </SmartTable>
                </div>
            </div>
            {entityType === AdminEntityPageType.USERS && (
                <>
                    <ModalAdministeredDealsCountController ref={userDealsCountModalRef} />
                    <ModalAdministeredUser
                        ref={userModalRef}
                        type={createModalType}
                        isOpen={createModalIsOpen}
                        onClose={handleCloseCreateModal}
                        onSubmit={handleUserModalSubmit}
                        isLoading={createModalType === "create" ? createModalIsLoading : updateModalIsLoading}
                    />
                </>
            )}
            {entityType === AdminEntityPageType.DEVELOPERS && (
                <ModalAdministeredDeveloper
                    isOpen={createModalIsOpen}
                    onClose={handleCloseCreateModal}
                    onSubmit={handleDeveloperModalSubmit}
                    type={createModalType}
                    ref={developerModalRef}
                    isLoading={createModalType === "create" ? createModalIsLoading : updateModalIsLoading}
                />
            )}
            {entityType === AdminEntityPageType.PROPERTIES && (
                <>
                    <ModalAdministeredRealty
                        ref={propertyModalRef}
                        isOpen={createModalIsOpen}
                        onClose={handleCloseCreateModal}
                        type={createModalType}
                        onSubmit={handlePropertyModalSubmit}
                        isLoading={createModalType === "create" ? createModalIsLoading : updateModalIsLoading}
                    />
                    <ModalAdministeredUnit
                        isOpen={additionalModalIsOpen}
                        onClose={handleCloseAdditionalModal}
                        onSubmit={handleUnitModalSubmit}
                        isLoading={createUnitIsLoading}
                        ref={unitModalRef}
                        type={createModalType}
                    />
                </>
            )}
            {entityType === AdminEntityPageType.CITIES && (
                <>
                    <ModalAdministeredCity
                        ref={cityModalRef}
                        isOpen={createModalIsOpen}
                        onClose={handleCloseCreateModal}
                        type={createModalType}
                        onSubmit={handleCityModalSubmit}
                        isLoading={createModalType === "create" ? createModalIsLoading : updateModalIsLoading}
                    />
                    <ModalAdministeredDistrict
                        ref={districtModalRef}
                        type="create"
                        isOpen={additionalModalIsOpen}
                        onClose={handleCloseAdditionalModal}
                        onSubmit={handleDistrictModalSubmit}
                        isLoading={createDistrictIsLoading}
                    />
                </>
            )}
            <Toast ref={toastRef} />
            <ConfirmModal
                {...confirmModalProps}
                submitBtnParams={{
                    severity: "danger",
                    iconPos: "left",
                    icon: <IcTrash />,
                    label: "Удалить",
                }}
            />
        </PageLayout>
    );
};
