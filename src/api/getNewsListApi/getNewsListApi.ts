import type { GetNewsListApiRawResponse } from "@/api/getNewsListApi/types";
import { createAxiosApi } from "@/shared/axios/axios";

export const getNewsListApi = async () => {
    return createAxiosApi()<GetNewsListApiRawResponse>({
        type: "get",
        url: "/news",
    }).then((data) => data.data);
};
