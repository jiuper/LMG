import { useMutation } from "@tanstack/react-query";

import { articleCreateApi } from "@/api/articleCreateApi";
import { articleDeleteApi } from "@/api/articleDeleteApi";
import { articleUpdateApi } from "@/api/articleUpdateApi";
import type { NewsCreateApiParams } from "@/api/newsCreateApi/newsCreateApi";
import { newsCreateApi } from "@/api/newsCreateApi/newsCreateApi";
import { newsDeleteApi } from "@/api/newsDeleteApi";
import type { NewsUpdateApiParams } from "@/api/newsUpdateApi/newsUpdateApi";
import { newsUpdateApi } from "@/api/newsUpdateApi/newsUpdateApi";
import type { PortfolioCreateApiParams } from "@/api/portfolioCreateApi";
import { portfolioCreateApi } from "@/api/portfolioCreateApi";
import { portfolioDeleteApi } from "@/api/portfolioDeleteApi";
import type { PortfolioUpdateApiParams } from "@/api/portfolioUpdateApi/portfolioUpdateApi";
import { portfolioUpdateApi } from "@/api/portfolioUpdateApi/portfolioUpdateApi";
import type { ModalAdministeredNewsModel } from "@/components/_Modals/ModalAdministeredNews/ModalAdministeredNews";
import type { ModalAdministeredPortfolioModel } from "@/components/_Modals/ModalAdministeredPortfolio";
import type { CreateNewsDto, GetPortfolioDto } from "@/entities/types/entities";
import type { AnyEntity } from "@/view/AdminPage/types";
import { AdminEntityPageType } from "@/view/AdminPage/types";

export interface PrepareNewsEditFormValuesParams {
    entity: CreateNewsDto;
}
export const prepareNewsEditFormValues = ({ entity }: PrepareNewsEditFormValuesParams): ModalAdministeredNewsModel => ({
    id: entity.id,
    title: entity.title,
    subtitle: entity.subtitle,
    time: entity.time,
    video: entity.video,
    status: entity.status,
    list: entity.list || [],
    contentItems: entity.contentItems || [],
    files: [],
});

export interface PreparePortfolioEditFormValuesParams {
    entity: GetPortfolioDto;
}
export const preparePortfolioEditFormValues = ({
    entity,
}: PreparePortfolioEditFormValuesParams): Partial<ModalAdministeredPortfolioModel> => ({
    id: entity.id,
    title: entity.title,
    description: entity.description,
    categoryName: entity.categoryName,
    status: entity.status,
    pictureId: entity.pictureId,
    file: null,
    number: entity.number,
});

export const prepareNewsCreateData = (data: ModalAdministeredNewsModel): NewsCreateApiParams => ({
    title: data.title,
    subtitle: data.subtitle,
    time: data.time || "5 мин.",
    video: data.video,
    status: data.status,
    contentItems: data.contentItems,
    list: data.list,
    files: data.files,
    pictureName: data.pictureName,
});
export const prepareNewsUpdateData = (data: ModalAdministeredNewsModel): NewsUpdateApiParams => ({
    title: data.title,
    subtitle: data.subtitle,
    time: data.time || "5 мин.",
    video: data.video,
    status: data.status,
    contentItems: data.contentItems,
    list: data.list,
    files: data.files,
    pictureName: data.pictureName,
    id: data.id,
});

export const preparePortfolioCreateData = (data: ModalAdministeredPortfolioModel): PortfolioCreateApiParams => ({
    title: data.title,
    description: data.description,
    status: data.status,
    categoryName: data.categoryName,
    file: data.file,
    id: data.id,
});
export const preparePortfolioUpdateData = (data: ModalAdministeredPortfolioModel): PortfolioUpdateApiParams => ({
    title: data.title,
    description: data.description,
    status: data.status,
    categoryName: data.categoryName,
    file: data.file,
    id: data.id,
});

export const useEntityCreate = () => {
    const newsParams = useMutation({ mutationFn: newsCreateApi });
    const articlesParams = useMutation({ mutationFn: articleCreateApi });
    const portfolioParams = useMutation({ mutationFn: portfolioCreateApi });
    const pagesParams = useMutation({ mutationFn: newsCreateApi });

    return {
        [AdminEntityPageType.NEWS]: newsParams,
        [AdminEntityPageType.ARTICLES]: articlesParams,
        [AdminEntityPageType.PORTFOLIO]: portfolioParams,
        [AdminEntityPageType.PAGES]: pagesParams,
    };
};
export const useEntityUpdate = () => {
    const newsParams = useMutation({ mutationFn: newsUpdateApi });
    const articlesParams = useMutation({ mutationFn: articleUpdateApi });
    const portfolioParams = useMutation({ mutationFn: portfolioUpdateApi });
    const pagesParams = useMutation({ mutationFn: newsUpdateApi });

    return {
        [AdminEntityPageType.NEWS]: newsParams,
        [AdminEntityPageType.ARTICLES]: articlesParams,
        [AdminEntityPageType.PORTFOLIO]: portfolioParams,
        [AdminEntityPageType.PAGES]: pagesParams,
    };
};
export const useEntityDelete = () => {
    const newsParams = useMutation({ mutationFn: newsDeleteApi });
    const articlesParams = useMutation({ mutationFn: articleDeleteApi });
    const portfolioParams = useMutation({ mutationFn: portfolioDeleteApi });
    const pagesParams = useMutation({ mutationFn: newsDeleteApi });

    return {
        [AdminEntityPageType.NEWS]: newsParams,
        [AdminEntityPageType.ARTICLES]: articlesParams,
        [AdminEntityPageType.PORTFOLIO]: portfolioParams,
        [AdminEntityPageType.PAGES]: pagesParams,
    };
};

export const getDeleteEntityConfirmMessage = (entity: AnyEntity, entityType: AdminEntityPageType) => {
    switch (entityType) {
        case AdminEntityPageType.NEWS: {
            const { title } = entity as CreateNewsDto;

            return `Перенос в архив "${title}"`;
        }
        case AdminEntityPageType.ARTICLES: {
            const { title } = entity as CreateNewsDto;

            return `Перенос в архив "${title}"`;
        }
        case AdminEntityPageType.PORTFOLIO: {
            const { title } = entity as GetPortfolioDto;

            return `Перенос в архив "${title}"`;
        }
        case AdminEntityPageType.PAGES: {
            const { title } = entity as CreateNewsDto;

            return `Перенос в архив "${title}"`;
        }
        default:
            return "Удаление этой сущности может привести к необратимой потере данных";
    }
};