import type { GetArticlesListApiRawResponse } from "@/api/getArticlesListApi/types";
import { createAxiosApi } from "@/shared/axios/axios";

export const getArticlesListApi = async () => {
    return createAxiosApi()<GetArticlesListApiRawResponse>({
        type: "get",
        url: "/article",
    }).then((data) => data.data);
};
