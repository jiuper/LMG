import type { GetDistrictListApiRawResponse } from "@/api/getDistrictListApi/types";
import { createAxiosApi } from "@/shared/axios/axios";

export const getDistrictListApi = async (id: string) => {
    return createAxiosApi()<GetDistrictListApiRawResponse>({
        type: "get",
        url: `/category-area`,
        config: { params: { categoryId: id } },
    }).then((data) => data.data);
};
