import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export interface categoryDeleteApiApiParams {
    id: string;
    status: ContentSatus;
}
export const categoryDeleteApi = async (params: categoryDeleteApiApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "put",
        url: `/category/status`,
        body: { categoryId: params.id, status: params.status },
    }).then(() => true);
};
