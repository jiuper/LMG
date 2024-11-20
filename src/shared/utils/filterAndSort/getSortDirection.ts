import type { SortOrder } from "primereact/datatable";

export const getSortDirection = (sortOrder?: SortOrder) => {
    if (sortOrder === -1) {
        return "desc";
    }

    if (sortOrder === 1) {
        return "asc";
    }

    return undefined;
};
