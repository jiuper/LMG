import type { ContentSatus, ModalList } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export type entityCreateApiParams = {
    coordinates?: [number, number][];
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
};
export const entityCreateApi = async (params: entityCreateApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "postForm",
        url: "/build/create",
        body: params,
    }).then(() => true);
};
