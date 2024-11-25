import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export type districtUpdateApiParams = {
    categoryId?: string | null;
    areaId?: string | null;
    title?: string;
    description?: string;
    subTitle?: string;
    status?: ContentSatus;
    file?: File | null;
    id?: string;
    number?: number;
};
export const districtUpdateApi = async (params: districtUpdateApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "postForm",
        url: "/category-area/update",
        body: params,
    }).then(() => true);
};
