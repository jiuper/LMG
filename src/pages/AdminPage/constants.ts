import { format } from "date-fns";
import type { DataTableValue } from "primereact/datatable";
import type { SelectItem } from "primereact/selectitem";

import { getCitiesListApi } from "@/api/admin/getCitiesListApi";
import { getEmailsListApi } from "@/api/admin/getEmailsListApi";
import { getErrorsListApi } from "@/api/admin/getErrorsListApi";
import { getPropertiesListApi } from "@/api/admin/getPropertiesListApi";
import { getDevelopersListApi } from "@/api/getDevelopersListApi";
import { getUsersListApi } from "@/api/getUsersListApi";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import { ErrorSource, UserRole } from "@/entities/types/entities";
import { TableRatingBadge } from "@/shared/ui/TableRatingBadge";
import { TableStatusCrossBadge } from "@/shared/ui/TableStatusCrossBadge";
import { AdminEntityPageType } from "@/view/AdminPage/types";

export const REQUEST_ENTITIES_FN_MAP: Record<
    AdminEntityPageType,
    | typeof getUsersListApi
    | typeof getDevelopersListApi
    | typeof getPropertiesListApi
    | typeof getCitiesListApi
    | typeof getEmailsListApi
    | typeof getErrorsListApi
> = {
    [AdminEntityPageType.USERS]: getUsersListApi,
    [AdminEntityPageType.DEVELOPERS]: getDevelopersListApi,
    [AdminEntityPageType.PROPERTIES]: getPropertiesListApi,
    [AdminEntityPageType.CITIES]: getCitiesListApi,
    [AdminEntityPageType.EMAILS]: getEmailsListApi,
    [AdminEntityPageType.ERRORS]: getErrorsListApi,
};

export const ENTITIES_PAGE_TITLE_MAP: Record<AdminEntityPageType, string> = {
    [AdminEntityPageType.USERS]: "Администрирование | Пользователи",
    [AdminEntityPageType.DEVELOPERS]: "Администрирование | Застройщик",
    [AdminEntityPageType.PROPERTIES]: "Администрирование | Недвижимость",
    [AdminEntityPageType.CITIES]: "Администрирование | Города",
    [AdminEntityPageType.EMAILS]: "Администрирование | Emails",
    [AdminEntityPageType.ERRORS]: "Администрирование | Ошибки",
};

export const ENTITIES_PAGE_SELECT_ENTITY_OPTIONS: (Omit<SelectItem, "value"> & {
    accessRoles: (UserRole | 0)[];
    value: AdminEntityPageType;
})[] = [
    {
        title: "Пользователи",
        value: AdminEntityPageType.USERS,
        accessRoles: [UserRole.User, UserRole.Administrator, UserRole.Operator, UserRole.SuperAdministrator],
    },
    {
        title: "Застройщик",
        value: AdminEntityPageType.DEVELOPERS,
        accessRoles: [UserRole.User, UserRole.Administrator, UserRole.Operator, UserRole.SuperAdministrator],
    },
    {
        title: "Недвижимость",
        value: AdminEntityPageType.PROPERTIES,
        accessRoles: [UserRole.User, UserRole.Administrator, UserRole.Operator, UserRole.SuperAdministrator],
    },
    {
        title: "Города",
        value: AdminEntityPageType.CITIES,
        accessRoles: [UserRole.User, UserRole.Administrator, UserRole.Operator, UserRole.SuperAdministrator],
    },
    {
        title: "Емейлы",
        value: AdminEntityPageType.EMAILS,
        accessRoles: [UserRole.User, UserRole.Administrator, UserRole.Operator, UserRole.SuperAdministrator],
    },
    { title: "Ошибки", value: AdminEntityPageType.ERRORS, accessRoles: [UserRole.SuperAdministrator] },
];

export const ENTITIES_TABLE_STRUCTURE: Record<AdminEntityPageType, SmartTableStructureItem<DataTableValue>[]> = {
    [AdminEntityPageType.USERS]: [
        { field: "", header: "", minWidth: 30, expander: true },
        { field: "id", header: "№(id)", width: 50, sortable: true, sortField: "id" },
        { field: "firstName", header: "Имя", sortable: true },
        { field: "lastName", header: "Фамилия", sortable: true },
        { field: "userName", header: "Имя пользователя", sortable: true },
        { field: "role", header: "Роль", sortable: true },
        { field: "email", header: "Почта", sortable: true },
        {
            field: "isActive",
            header: "Статус",
            body: ({ isActive }) => TableRatingBadge({ value: isActive ? "Active" : "No active" }),
            sortable: true,
        },
        { field: "maxActiveDeals", header: "Сделок", sortable: true },
        { field: "createdBy", header: "Создан", sortable: true },
        { field: "createdDate", header: "Дата создания", sortable: true },
        { field: "updatedBy", header: "Обновлено", sortable: true },
        { field: "updatedDate", header: "Дата обновления", sortable: true },
    ],
    [AdminEntityPageType.DEVELOPERS]: [
        { field: "id", header: "№(id)", sortable: true, width: 50 },
        { field: "title", header: "Название", width: 300, sortable: true },
        {
            field: "isLogoProvided",
            header: "Лого",
            body: ({ isLogoProvided }) => (isLogoProvided ? TableRatingBadge({ value: "Yes" }) : ""),
            sortable: true,
        },
        { field: "createdBy", header: "Создан", sortable: true },
        { field: "createdDate", header: "Дата создания", sortable: true },
        { field: "updatedBy", header: "Обновлено", sortable: true },
        { field: "updatedDate", header: "Дата обновления", sortable: true },
    ],
    [AdminEntityPageType.PROPERTIES]: [
        { field: "", header: "", minWidth: 30, expander: true },
        { field: "id", header: "№(id)", minWidth: 100, sortable: true },
        { field: "header", header: "Название", minWidth: 200, sortable: true },
        { field: "district", header: "Район", minWidth: 150, sortable: true },
        { field: "createdBy", header: "Застройщик", sortable: true },
        {
            field: "rating",
            header: "Рейтинг",
            body: ({ rating }) => TableRatingBadge({ value: rating as string }),
            sortable: true,
        },
        { field: "readyDate", header: "Дата готовности", sortable: true },
        {
            field: "isPreLaunch",
            header: "Предзапуск",
            body: ({ isPreLaunch }) => TableStatusCrossBadge({ value: isPreLaunch as boolean }),
            sortable: true,
        },
        {
            field: "isHidden",
            header: "Скрыт",
            body: ({ isHidden }) => TableStatusCrossBadge({ value: isHidden as boolean }),
            sortable: true,
        },
        { field: "photosCount", header: "Фото", sortable: true },
        { field: "videosCount", header: "Видео", sortable: true },
        { field: "createdBy", header: "Создал", sortable: true },
        {
            field: "createdDate",
            header: "Дата создания",
            body: ({ createdDate }) => format(new Date(createdDate as string), "MM.dd.yyyy KK:mm a"),
            minWidth: 150,
            sortable: true,
        },
        { field: "updatedBy", header: "Обновил", sortable: true },
        {
            field: "updatedDate",
            header: "Дата обновления",
            body: ({ createdDate }) => format(new Date(createdDate as string), "MM.dd.yyyy KK:mm a"),
            minWidth: 150,
            sortable: true,
        },
    ],
    [AdminEntityPageType.CITIES]: [
        { field: "", header: "", minWidth: 30, expander: true },
        { field: "id", header: "№(id)", sortable: true, width: 50 },
        { field: "cityName", header: "Имя", width: 300, sortable: true },
        { field: "districtsCount", header: "Количество районов", sortable: true },
        { field: "createdBy", header: "Создал", sortable: true },
        {
            field: "createdDate",
            header: "Дата создания",
            body: ({ createdDate }) => format(new Date(createdDate as string), "MM.dd.yyyy KK:mm a"),
            minWidth: 150,
            sortable: true,
        },
        { field: "updatedBy", header: "Обновил", sortable: true },
        {
            field: "updatedDate",
            header: "Дата обновления",
            body: ({ createdDate }) => format(new Date(createdDate as string), "MM.dd.yyyy KK:mm a"),
            minWidth: 150,
            sortable: true,
        },
    ],
    [AdminEntityPageType.EMAILS]: [
        { field: "id", header: "№(id)", sortable: true, width: 50 },
        { field: "email", header: "Отправить по электронной почте", sortable: true },
        { field: "idEmailLang", header: "Язык", sortable: true },
        { field: "idEmailTemplate", header: "Шаблон письма", sortable: true },
        {
            field: "isSent",
            header: "Отправляется",
            body: ({ isSent }) => TableStatusCrossBadge({ value: isSent as boolean }),
            sortable: true,
        },
        {
            field: "createdDate",
            header: "Дата создания",
            body: ({ createdDate }) => format(new Date(createdDate as string), "MM.dd.yyyy KK:mm a"),
            minWidth: 150,
            sortable: true,
        },
        {
            field: "updatedDate",
            header: "Дата обновления",
            body: ({ createdDate }) => format(new Date(createdDate as string), "MM.dd.yyyy KK:mm a"),
            minWidth: 150,
            sortable: true,
        },
    ],
    [AdminEntityPageType.ERRORS]: [
        { field: "", header: "", width: 10, expander: true },
        { field: "id", header: "ID", sortable: true, width: 10 },
        {
            field: "errorSource",
            header: "Source",
            sortable: true,
            width: 10,
            body: ({ errorSource }) => ErrorSource[errorSource as ErrorSource],
        },
        { field: "url", header: "Url", sortable: true, width: 10, maxWidth: 150 },
        { field: "message", header: "Message", sortable: true, width: 300, maxWidth: 150 },
        { field: "createdBy", header: "Created By", sortable: true, width: 10 },
        { field: "createdDate", header: "Created Date", sortable: true, width: 10 },
    ],
};

export const ERRORS_PAGE_FILTER_OPTIONS: SelectItem[] = [
    { label: "Без фильтрации", value: undefined },
    { label: "Server", value: 1 },
    { label: "Client", value: 2 },
];

export const ITEMS_FOR_PAGE = 50;
