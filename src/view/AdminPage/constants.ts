import type { DataTableValue } from "primereact/datatable";

import { getArticlesListApi } from "@/api/getArticlesListApi";
import { getFeedbackListApi } from "@/api/getFeedbackListApi";
import { getNewsListApi } from "@/api/getNewsListApi";
import { getPagesListApi } from "@/api/getPagesListApi";
import { getPortfolioListApi } from "@/api/getPortfolioListApi";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import { AdminEntityPageType } from "@/view/AdminPage/types";

export const REQUEST_ENTITIES_FN_MAP: Record<
    AdminEntityPageType,
    | typeof getNewsListApi
    | typeof getArticlesListApi
    | typeof getPortfolioListApi
    | typeof getFeedbackListApi
    | typeof getPagesListApi
> = {
    [AdminEntityPageType.NEWS]: getNewsListApi,
    [AdminEntityPageType.ARTICLES]: getArticlesListApi,
    [AdminEntityPageType.PORTFOLIO]: getPortfolioListApi,
    [AdminEntityPageType.FEEDBACK]: getFeedbackListApi,
    [AdminEntityPageType.PAGES]: getPagesListApi,
};

export const ENTITIES_TABLE_STRUCTURE: Record<AdminEntityPageType, SmartTableStructureItem<DataTableValue>[]> = {
    [AdminEntityPageType.NEWS]: [
        { field: "number", header: "№(id)", width: 50, sortable: true, sortField: "id" },
        { field: "title", header: "Наименование", sortable: true },
        { field: "status", header: "Статус", sortable: true },
        // { field: "createdBy", header: "Время создания", sortable: true },
        // { field: "createdAt", header: "Дата создания", sortable: true },
        // { field: "updatedBy", header: "Время обновлено", sortable: true },
        // { field: "updatedAt", header: "Дата обновления", sortable: true },
    ],
    [AdminEntityPageType.ARTICLES]: [
        { field: "number", header: "№(id)", width: 50, sortable: true, sortField: "id" },
        { field: "title", header: "Наименование", sortable: true },
        { field: "status", header: "Статус", sortable: true },
        // { field: "createdBy", header: "Время создания", sortable: true },
        // { field: "createdDate", header: "Дата создания", sortable: true },
        // { field: "updatedBy", header: "Время обновлено", sortable: true },
        // { field: "updatedDate", header: "Дата обновления", sortable: true },
    ],
    [AdminEntityPageType.PORTFOLIO]: [
        { field: "number", header: "№(id)", width: 50, sortable: true, sortField: "id" },
        { field: "title", header: "Наименование", sortable: true },
        { field: "status", header: "Статус", sortable: true },
        { field: "category", header: "Категория", sortable: true },
        // { field: "createdBy", header: "Время создания", sortable: true },
        // { field: "createdDate", header: "Дата создания", sortable: true },
        // { field: "updatedBy", header: "Время обновлено", sortable: true },
        // { field: "updatedDate", header: "Дата обновления", sortable: true },
    ],
    [AdminEntityPageType.FEEDBACK]: [
        { field: "number", header: "№(id)", width: 50, sortable: true, sortField: "id" },
        { field: "title", header: "Наименование", sortable: true },
        { field: "status", header: "Статус", sortable: true },
        { field: "category", header: "Категория", sortable: true },
        // { field: "createdBy", header: "Время создания", sortable: true },
        // { field: "createdDate", header: "Дата создания", sortable: true },
        // { field: "updatedBy", header: "Время обновлено", sortable: true },
        // { field: "updatedDate", header: "Дата обновления", sortable: true },
    ],
    [AdminEntityPageType.PAGES]: [
        { field: "", header: "Раздел", minWidth: 30, expander: true },
        { field: "number", header: "№(id)", width: 50, sortable: true, sortField: "id" },
        { field: "title", header: "Наименование", sortable: true },
        { field: "status", header: "Статус", sortable: true },
        // { field: "createdBy", header: "Время создания", sortable: true },
        // { field: "createdDate", header: "Дата создания", sortable: true },
        // { field: "updatedBy", header: "Время обновлено", sortable: true },
        // { field: "updatedDate", header: "Дата обновления", sortable: true },
    ],
};
