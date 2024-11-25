import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export type districtCreateApiParams = {
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
export const districtCreateApi = async (params: districtCreateApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "postForm",
        url: "/category-area/create",
        body: params,
    }).then(() => true);
};
