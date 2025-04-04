import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export type categoryCreateApiParams = {
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
    id?: string;
    number?: number;
    previewPictureId?: string;
    previewPictureFile?: File | null;
    seoTitle?: string;
    seoDescription?: string;
};
export const categoryCreateApi = async (params: categoryCreateApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "postForm",
        url: "/category/create",
        body: params,
    }).then(() => true);
};
