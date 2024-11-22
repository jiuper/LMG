import type { ContentSatus, ItemDto, ListDto } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export type NewsCreateApiParams = {
    title?: string;
    subtitle?: string;
    time?: string;
    video?: string;
    status: ContentSatus;
    contentItems?: ItemDto[];
    list?: ListDto[];
    files?: File[];
};
export const articleCreateApi = async (params: NewsCreateApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "postForm",
        url: "/article/create",
        body: params,
    }).then(() => true);
};