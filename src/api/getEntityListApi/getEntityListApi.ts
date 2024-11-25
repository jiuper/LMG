import type { GetEntityListApiRawResponse } from "@/api/getEntityListApi/types";
import { createAxiosApi } from "@/shared/axios/axios";

export const getEntityListApi = async (id: string) => {
    return createAxiosApi()<GetEntityListApiRawResponse>({
        type: "get",
        url: `/build`,
        config: { params: { buildId: id } },
    }).then((data) => data.data);
};
