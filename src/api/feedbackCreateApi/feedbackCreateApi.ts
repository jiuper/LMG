import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export type FeedbackCreateApiParams = {
    id?: string;
    title?: string;
    description?: string;
    status?: ContentSatus;
    categoryName?: string;
    file?: File | null;
    video?: File | null;
};
export const feedbackCreateApi = async ({ ...params }: FeedbackCreateApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "postForm",
        url: `/feedback/create`,
        body: params,
    }).then(() => true);
};
