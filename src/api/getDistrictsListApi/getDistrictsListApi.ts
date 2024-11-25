import type { GetDistrictsListApiRawResponse } from "@/api/getDistrictsListApi/types";
import { createAxiosApi } from "@/shared/axios/axios";

export const getDistrictsListApi = async () => {
    return createAxiosApi()<GetDistrictsListApiRawResponse>({
        type: "get",
        url: `/area`,
    }).then((data) => data.data);
};
