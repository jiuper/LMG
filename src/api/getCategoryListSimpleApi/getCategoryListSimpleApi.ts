import type { GetCategoryListApiRawResponse } from "@/api/getCategoryListApi/types";
import { createAxiosApi } from "@/shared/axios/axios";

export const getCategoryListSimpleApi = async () => {
    return createAxiosApi()<GetCategoryListApiRawResponse>({
        type: "get",
        url: `/category`,
    }).then((data) => data.data);
};
