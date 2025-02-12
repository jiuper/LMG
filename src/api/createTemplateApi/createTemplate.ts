import { useMutation } from "@tanstack/react-query";

import { createAxiosApi } from "@/shared/axios/axios";

export type templateCreateApiParams = {
    file?: File | null;
};
export const templateCreateApi = async (params: templateCreateApiParams): Promise<string[]> => {
    return createAxiosApi()<string[]>({
        type: "postForm",
        url: "/parser/upload",
        body: params,
    }).then((data) => data.data);
};

export const useCreateTemplateApi = () => {
    return useMutation({
        mutationFn: templateCreateApi,
    });
};
