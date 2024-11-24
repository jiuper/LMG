import type { GetFeedbackListApiRawResponse } from "@/api/getFeedbackListApi/types";
import { createAxiosApi } from "@/shared/axios/axios";

export const getFeedbackListApi = async () => {
    return createAxiosApi()<GetFeedbackListApiRawResponse>({
        type: "get",
        url: "/feedback",
    }).then((data) => data.data);
};
