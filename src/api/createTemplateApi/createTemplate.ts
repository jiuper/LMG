import { useMutation } from "@tanstack/react-query";

import { createAxiosApi } from "@/shared/axios/axios";

export type templateCreateApiParams = {
    file?: File | null;
};

export type ErrorsM = {
    errors: { [key: string]: string[] };
};

export const templateCreateApi = async (params: templateCreateApiParams): Promise<ErrorsM> => {
    return createAxiosApi()<ErrorsM>({
        type: "postForm",
        url: "/parser/upload",
        body: params,
    }).then((response) => response.data);
};

export const useCreateTemplateApi = () => {
    return useMutation({
        mutationFn: templateCreateApi,
    });
};
