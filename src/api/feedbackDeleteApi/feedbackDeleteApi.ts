import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export interface FeedbackDeleteApiApiParams {
    id: string;
    status: ContentSatus;
}
export const feedbackDeleteApi = async (params: FeedbackDeleteApiApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "put",
        url: `/feedback/status`,
        body: { feedbackId: params.id, status: params.status },
    }).then(() => true);
};
