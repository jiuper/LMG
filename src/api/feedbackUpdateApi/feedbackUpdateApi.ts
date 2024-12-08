import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export type FeedbackUpdateApiParams = {
    id?: string;
    title?: string;
    description?: string;
    status?: ContentSatus;
    file?: File | null;
    video?: File | null;
    pictureId?: string;
    videoId?: string;
};
export const feedbackUpdateApi = async ({ ...params }: FeedbackUpdateApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "postForm",
        url: `/feedback/update`,
        body: params,
    }).then(() => true);
};
