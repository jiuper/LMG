import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export interface districtDeleteApiApiParams {
    id: string;
    status: ContentSatus;
}
export const districtDeleteApi = async (params: districtDeleteApiApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "put",
        url: `/category-area/status`,
        body: { categoryAreaId: params.id, status: params.status },
    }).then(() => true);
};
