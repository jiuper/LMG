import type {
    CreateNewsDto,
    GetCategoryDto,
    GetFeedbackDto,
    GetPortfolioDto,
    GetSectionDto,
} from "@/entities/types/entities";

export type AnyEntity = GetPortfolioDto | CreateNewsDto | GetSectionDto | GetFeedbackDto | GetCategoryDto;

export enum AdminEntityPageType {
    NEWS = "news",
    ARTICLES = "articles",
    PORTFOLIO = "portfolio",
    FEEDBACK = "feedback",
    PAGES = "pages",
}
