import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export type PortfolioCreateApiParams = {
    id?: string;
    title?: string;
    description?: string;
    status?: ContentSatus;
    categoryName?: string;
    file?: File | null;
};
export const portfolioCreateApi = async ({ ...params }: PortfolioCreateApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "postForm",
        url: `/portfolio/create`,
        body: params,
    }).then(() => true);
};
