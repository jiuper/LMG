import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export interface entityDeleteApiApiParams {
    id: string;
    status: ContentSatus;
}
export const entityDeleteApi = async (params: entityDeleteApiApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "put",
        url: `/build/status`,
        body: { buildId: params.id, status: params.status },
    }).then(() => true);
};
