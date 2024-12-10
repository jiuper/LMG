import { type SyntheticEvent, useMemo } from "react";
import type { FetchStatus } from "@tanstack/query-core";
import cnBind from "classnames/bind";
import { Column } from "primereact/column";
import type { DataTableRowToggleEvent, DataTableStateEvent, SortOrder } from "primereact/datatable";
import { Toast } from "primereact/toast";
import type { FormEvent } from "primereact/ts-helpers";

import type { GetArticlesListApiRawResponse } from "@/api/getArticlesListApi/types";
import type { GetFeedbackListApiRawResponse } from "@/api/getFeedbackListApi/types";
import type { GetNewsListApiRawResponse } from "@/api/getNewsListApi/types";
import type { GetPagesListApiRawResponse } from "@/api/getPagesListApi/types";
import type { GetPortfolioListApiRawResponse } from "@/api/getPortfolioListApi/types";
import { ConfirmModal } from "@/components/_Modals/ConfirmModal";
import type { ConfirmModalProps } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import { ModalAdministeredArticle } from "@/components/_Modals/ModalAdministeredArticle";
import { ModalAdministeredCategory } from "@/components/_Modals/ModalAdministeredCategory";
import type {
    ModalAdministeredFeedbackModel,
    ModalAdministeredFeedbackRef,
} from "@/components/_Modals/ModalAdministeredFeedBack";
import { ModalAdministeredFeedBack } from "@/components/_Modals/ModalAdministeredFeedBack";
import type { ModalAdministeredNewsModel, ModalAdministeredNewsRef } from "@/components/_Modals/ModalAdministeredNews";
import { ModalAdministeredNews } from "@/components/_Modals/ModalAdministeredNews";
import type {
    ModalAdministeredPagesModel,
    ModalAdministeredPagesRef,
} from "@/components/_Modals/ModalAdministeredPages";
import type {
    ModalAdministeredPortfolioModel,
    ModalAdministeredPortfolioRef,
} from "@/components/_Modals/ModalAdministeredPortfolio";
import { ModalAdministeredPortfolio } from "@/components/_Modals/ModalAdministeredPortfolio";
import { SmartTable } from "@/components/SmartTable";
import { Button } from "@/shared/ui/_Button";
import { InputSearch } from "@/shared/ui/_InputSearch";
import type { AdminEntityPageFilters } from "@/view/AdminPage/AdminEntityPageC";
import { ENTITIES_TABLE_STRUCTURE } from "@/view/AdminPage/constants";

import type { AnyEntity } from "./types";
import { AdminEntityPageType } from "./types";

import styles from "./AdminEntityPage.module.scss";

const cx = cnBind.bind(styles);

type PropsType = {
    entityType: AdminEntityPageType;
    totalPages?: number;
    page?: number;
    totalItems?: number;
    sortField?: string;
    sortOrder?: SortOrder;
    onNextClick?: () => void;
    onPrevClick?: () => void;
    onSort?(event: DataTableStateEvent): void;
    handleSearchChange: (value?: string | number) => void;
    filters: AdminEntityPageFilters;
    handleEntityTypeChange: ({ value }: FormEvent<AdminEntityPageType, SyntheticEvent<Element, Event>>) => void;
    handleRowExpand: (event: DataTableRowToggleEvent) => void;
    rowEditorTemplate: (data: AnyEntity) => JSX.Element | null;
    handleCloseCreateModal: () => void;
    createModalIsLoading: boolean;
    updateModalIsLoading: boolean;
    newsModalRef: React.RefObject<ModalAdministeredNewsRef>;
    articleModalRef: React.RefObject<ModalAdministeredNewsRef>;
    portfolioModalRef: React.RefObject<ModalAdministeredPortfolioRef>;
    pagesModalRef: React.RefObject<ModalAdministeredPagesRef>;
    expandedRows: AnyEntity[];
    openCreateModal: () => void;
    entityData?:
        | GetNewsListApiRawResponse
        | GetArticlesListApiRawResponse
        | GetPortfolioListApiRawResponse
        | GetFeedbackListApiRawResponse
        | GetPagesListApiRawResponse;
    entityStatus: FetchStatus;
    createModalType: "create" | "edit";
    handleNewsModalSubmit: (data: ModalAdministeredNewsModel) => false | undefined;
    createModalIsOpen: boolean;
    handleArticleModalSubmit: (data: ModalAdministeredNewsModel) => false | undefined;
    handlePortfolioModalSubmit: (data: ModalAdministeredPortfolioModel) => false | undefined;
    handleFeedbackModalSubmit: (data: ModalAdministeredFeedbackModel) => false | undefined;
    handlePagesModalSubmit: (data: ModalAdministeredPagesModel) => false | undefined;
    feedbackModalRef: React.RefObject<ModalAdministeredFeedbackRef>;
    toastRef: React.RefObject<Toast>;
    confirmModalProps: ConfirmModalProps;
    rowExpandTemplate: (data: AnyEntity) => JSX.Element | null;
};
export const AdminEntityPageV = ({
    entityType,
    totalPages,
    page,
    totalItems,
    sortField,
    sortOrder,
    onNextClick,
    onPrevClick,
    onSort,
    handleSearchChange,
    handleRowExpand,
    rowEditorTemplate,
    handleCloseCreateModal,
    createModalIsLoading,
    updateModalIsLoading,
    expandedRows,
    openCreateModal,
    filters,
    entityData,
    entityStatus,
    createModalType,
    createModalIsOpen,
    toastRef,
    confirmModalProps,
    handleArticleModalSubmit,
    articleModalRef,
    handleNewsModalSubmit,
    newsModalRef,
    handlePortfolioModalSubmit,
    portfolioModalRef,
    handleFeedbackModalSubmit,
    feedbackModalRef,
    rowExpandTemplate,
    pagesModalRef,
    handlePagesModalSubmit,
}: PropsType) => {
    const filterValue = useMemo(() => {
        switch (entityType) {
            case AdminEntityPageType.NEWS:
                return filters.userName || "";
            case AdminEntityPageType.ARTICLES:
                return filters.title || "";
            case AdminEntityPageType.PORTFOLIO:
                return filters.term || "";
            case AdminEntityPageType.PAGES:
                return filters.name || "";

            default:
                return "";
        }
    }, [entityType, filters.name, filters.term, filters.title, filters.userName]);

    return (
        <>
            <div className={cx("content")}>
                <div className={cx("block-toolbar")}>
                    <InputSearch isFullWidth value={filterValue} debounceDelay={500} onChange={handleSearchChange} />
                    {entityType === AdminEntityPageType.NEWS && (
                        <Button className={cx("btn-neon")} label="Создать новость" onClick={openCreateModal} />
                    )}
                    {entityType === AdminEntityPageType.ARTICLES && (
                        <Button className={cx("btn-neon")} label="Создать статью" onClick={openCreateModal} />
                    )}
                    {entityType === AdminEntityPageType.PORTFOLIO && (
                        <Button className={cx("btn-neon")} label="Создать портфолио" onClick={openCreateModal} />
                    )}
                    {entityType === AdminEntityPageType.FEEDBACK && (
                        <Button className={cx("btn-neon")} label="Создать отзыв" onClick={openCreateModal} />
                    )}
                </div>

                <div className={cx("block-table")}>
                    <SmartTable<AnyEntity[]>
                        className={cx("table")}
                        structure={ENTITIES_TABLE_STRUCTURE[entityType]}
                        value={entityData || []}
                        status={entityStatus}
                        scrollHeight="flex"
                        rowExpansionTemplate={rowExpandTemplate}
                        responsiveLayout="scroll"
                        rows={0}
                        totalPages={totalPages}
                        page={page}
                        lazy
                        totalItems={totalItems}
                        widthFooter
                        scrollable
                        removableSort
                        sortField={sortField}
                        sortOrder={sortOrder}
                        expandedRows={expandedRows}
                        onRowToggle={handleRowExpand}
                        onNextClick={onNextClick}
                        onPrevClick={onPrevClick}
                        onSort={onSort}
                    >
                        <Column header="Действия" frozen alignFrozen="right" body={rowEditorTemplate} />
                    </SmartTable>
                </div>
            </div>
            {entityType === AdminEntityPageType.NEWS && (
                <ModalAdministeredNews
                    ref={newsModalRef}
                    type={createModalType}
                    isOpen={createModalIsOpen}
                    onClose={handleCloseCreateModal}
                    onSubmit={handleNewsModalSubmit}
                    isLoading={createModalType === "create" ? createModalIsLoading : updateModalIsLoading}
                />
            )}
            {entityType === AdminEntityPageType.ARTICLES && (
                <ModalAdministeredArticle
                    isOpen={createModalIsOpen}
                    onClose={handleCloseCreateModal}
                    onSubmit={handleArticleModalSubmit}
                    type={createModalType}
                    ref={articleModalRef}
                    isLoading={createModalType === "create" ? createModalIsLoading : updateModalIsLoading}
                />
            )}
            {entityType === AdminEntityPageType.PORTFOLIO && (
                <ModalAdministeredPortfolio
                    ref={portfolioModalRef}
                    isOpen={createModalIsOpen}
                    onClose={handleCloseCreateModal}
                    type={createModalType}
                    onSubmit={handlePortfolioModalSubmit}
                    isLoading={createModalType === "create" ? createModalIsLoading : updateModalIsLoading}
                />
            )}
            {entityType === AdminEntityPageType.FEEDBACK && (
                <ModalAdministeredFeedBack
                    ref={feedbackModalRef}
                    isOpen={createModalIsOpen}
                    onClose={handleCloseCreateModal}
                    type={createModalType}
                    onSubmit={handleFeedbackModalSubmit}
                    isLoading={createModalType === "create" ? createModalIsLoading : updateModalIsLoading}
                />
            )}
            {entityType === AdminEntityPageType.PAGES && (
                <ModalAdministeredCategory
                    ref={pagesModalRef}
                    isOpen={createModalIsOpen}
                    onClose={handleCloseCreateModal}
                    type={createModalType}
                    onSubmit={handlePagesModalSubmit}
                    isLoading={createModalType === "create" ? createModalIsLoading : updateModalIsLoading}
                />
            )}
            <Toast ref={toastRef} />
            <ConfirmModal
                {...confirmModalProps}
                submitBtnParams={{
                    severity: "danger",
                    iconPos: "left",
                    label: "Принять",
                }}
            />
        </>
    );
};
