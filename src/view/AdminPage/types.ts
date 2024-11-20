import type { CreateNewsDto, GetPortfolioDto } from "@/entities/types/entities";

export type AnyEntity = GetPortfolioDto | CreateNewsDto;

export enum AdminEntityPageType {
    NEWS = "news",
    ARTICLES = "articles",
    PORTFOLIO = "portfolio",
    PAGES = "pages",
}
