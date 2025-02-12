import type { SortOrder } from "primereact/datatable";

import { ContentSatus } from "@/entities/types/entities";

export const getSortDirection = (sortOrder?: SortOrder) => {
    if (sortOrder === -1) {
        return "desc";
    }

    if (sortOrder === 1) {
        return "asc";
    }

    return undefined;
};

export const filterByStatus = <T extends { status: ContentSatus }>(array: T[]): T[] => {
    return array.filter((el) => el.status === ContentSatus.PUBLISHED);
};
