import type { GetCategoryListApiRawResponse } from "@/api/getCategoryListApi/types";
import { createAxiosApi } from "@/shared/axios/axios";

export const getCategoryListApi = async (sectionId: string) => {
    return createAxiosApi()<GetCategoryListApiRawResponse>({
        type: "get",
        url: `/category`,
        config: { params: { sectionId } },
    }).then((data) => data.data);
};
