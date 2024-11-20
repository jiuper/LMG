import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export interface NewsDeleteApiApiParams {
    id: string;
    status: ContentSatus;
}
export const articleDeleteApi = async (params: NewsDeleteApiApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "put",
        url: `/article/status`,
        body: { articleId: params.id, status: params.status },
    }).then(() => true);
};
