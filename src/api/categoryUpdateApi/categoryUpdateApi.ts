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
    iconPictureId?: string | null;
    icon?: File | null;
    previewPictureId?: string;
    previewPictureFile?: File | null;
    seoTitle?: string;
    seoDescription?: string;
};
export const categoryUpdateApi = async (params: categoryUpdateApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "postForm",
        url: "/category/update",
        body: params,
    }).then(() => true);
};
