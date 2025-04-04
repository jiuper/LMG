import type { ContentSatus, ModalList } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export type entityUpdateApiParams = {
    coordinates?: [number, number][] | null;
    buildAreaCoordinates?: [number, number][];
    name?: string;
    wDescription?: string;
    gTitle?: string;
    gSubTitle?: string;
    list?: ModalList[];
    status?: ContentSatus;
    categoryAreaId?: string;
    id?: string;
    number?: number;
    file?: File | null;
    pictureId?: string;
    iconPictureId?: string;
    seoTitle?: string;
    seoDescription?: string;
};
export const entityUpdateApi = async (params: entityUpdateApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "postForm",
        url: "/build/update",
        body: params,
    }).then(() => true);
};
