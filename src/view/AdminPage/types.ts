import type {
    CreateNewsDto,
    GetFeedbackDto,
    GetPortfolioDto,
    GetSectionDto,
    SectionArea,
} from "@/entities/types/entities";

export type AnyEntity = GetPortfolioDto | CreateNewsDto | GetSectionDto | GetFeedbackDto | SectionArea;

export enum AdminEntityPageType {
    NEWS = "news",
    ARTICLES = "articles",
    PORTFOLIO = "portfolio",
    FEEDBACK = "feedback",
    PAGES = "pages",
}
