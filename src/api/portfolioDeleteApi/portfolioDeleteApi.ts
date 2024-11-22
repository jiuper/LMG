import type { ContentSatus } from "@/entities/types/entities";
import { createAxiosApi } from "@/shared/axios/axios";

export interface PortfolioDeleteApiApiParams {
    id: string;
    status: ContentSatus;
}
export const portfolioDeleteApi = async (params: PortfolioDeleteApiApiParams): Promise<boolean> => {
    return createAxiosApi()<boolean>({
        type: "put",
        url: `/portfolio/status`,
        body: { portfolioId: params.id, status: params.status },
    }).then(() => true);
};
