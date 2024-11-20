import type { GetPortfolioListApiRawResponse } from "@/api/getPortfolioListApi/types";
import { createAxiosApi } from "@/shared/axios/axios";

export const getPortfolioListApi = async () => {
    return createAxiosApi()<GetPortfolioListApiRawResponse>({
        type: "get",
        url: "/portfolio",
    }).then((data) => data.data);
};
