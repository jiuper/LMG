import type { GetPagesListApiRawResponse } from "@/api/getPagesListApi/types";
import { createAxiosApi } from "@/shared/axios/axios";

export const getPagesListApi = async () => {
    return createAxiosApi()<GetPagesListApiRawResponse>({
        type: "get",
        url: "/section",
    }).then((data) => data.data);
};
