import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export type categoryUpdateApiParams = {
    id?: string;
    number?: number;
    title?: string;
    description?: string;
    subtitle?: string;
    sectionId?: string;
    pictureId?: string;
    videoId?: string;
    list?: { title?: string; items?: { caption?: string; subcaption?: string }[] };
    status?: ContentSatus;
    file?: File | null;
    video?: File | null;
};
export const categoryUpdateApi = async (params: categoryUpdateApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "postForm",
        url: "/category/update",
        body: params,
    }).then(() => true);
};
