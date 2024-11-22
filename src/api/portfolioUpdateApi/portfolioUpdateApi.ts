import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export type PortfolioUpdateApiParams = {
    id?: string;
    title?: string;
    description?: string;
    status?: ContentSatus;
    categoryName?: string;
    file?: File | null;
};
export const portfolioUpdateApi = async ({ ...params }: PortfolioUpdateApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "postForm",
        url: `/portfolio/update`,
        body: params,
    }).then(() => true);
};
