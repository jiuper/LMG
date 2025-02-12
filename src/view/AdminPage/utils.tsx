import { useMutation } from "@tanstack/react-query";

import { articleCreateApi } from "@/api/articleCreateApi";
import { articleDeleteApi } from "@/api/articleDeleteApi";
import { articleUpdateApi } from "@/api/articleUpdateApi";
import type { categoryCreateApiParams } from "@/api/categoryCreateApi/categoryCreateApi";
import { categoryCreateApi } from "@/api/categoryCreateApi/categoryCreateApi";
import { categoryDeleteApi } from "@/api/categoryDeleteApi";
import type { categoryUpdateApiParams } from "@/api/categoryUpdateApi/categoryUpdateApi";
import { categoryUpdateApi } from "@/api/categoryUpdateApi/categoryUpdateApi";
import type { FeedbackCreateApiParams } from "@/api/feedbackCreateApi/feedbackCreateApi";
import { feedbackCreateApi } from "@/api/feedbackCreateApi/feedbackCreateApi";
import { feedbackDeleteApi } from "@/api/feedbackDeleteApi";
import type { FeedbackUpdateApiParams } from "@/api/feedbackUpdateApi/feedbackUpdateApi";
import { feedbackUpdateApi } from "@/api/feedbackUpdateApi/feedbackUpdateApi";
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
import type { ModalAdministeredCategoryModel } from "@/components/_Modals/ModalAdministeredCategory";
import type { ModalAdministeredFeedbackModel } from "@/components/_Modals/ModalAdministeredFeedBack";
import type { ModalAdministeredNewsModel } from "@/components/_Modals/ModalAdministeredNews/ModalAdministeredNews";
import type { ModalAdministeredPortfolioModel } from "@/components/_Modals/ModalAdministeredPortfolio";
import type { CreateNewsDto, GetCategoryDto, GetFeedbackDto, GetPortfolioDto } from "@/entities/types/entities";
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
    files: entity.files || [],
    pictureName: entity.pictureName,
    pictureId: entity.pictureId,
    videoId: entity.videoId,
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
    categoryId: entity.categoryId,
    status: entity.status,
    pictureId: entity.pictureId,
    file: entity.file,
    number: entity.number,
});
export interface PrepareFeedbackEditFormValuesParams {
    entity: GetFeedbackDto;
}
export const prepareFeedbackEditFormValues = ({
    entity,
}: PrepareFeedbackEditFormValuesParams): Partial<ModalAdministeredFeedbackModel> => ({
    id: entity.id,
    title: entity.title,
    description: entity.description,
    status: entity.status,
    pictureId: entity.pictureId,
    file: entity.file,
    video: entity.video,
    number: entity.number,
    videoId: entity.videoId,
});

export interface PreparePagesEditFormValuesParams {
    entity: GetCategoryDto;
}
export const preparePagesEditFormValues = ({
    entity,
}: PreparePagesEditFormValuesParams): Partial<ModalAdministeredCategoryModel> => ({
    id: entity.id,
    title: entity.title,
    description: entity.description,
    status: entity.status,
    number: entity.number,
    subtitle: entity.subtitle,
    pictureId: entity.pictureId,
    list: entity.list,
    sectionId: entity.sectionId,
    videoId: entity.videoId,
    previewPictureId: entity.previewPictureId,
});

export const prepareNewsCreateData = (data: ModalAdministeredNewsModel): NewsCreateApiParams => ({
    title: data.title,
    subtitle: data.subtitle,
    time: data.time || "5",
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
    time: data.time || "5",
    video: data.video,
    pictureId: data.pictureId,
    videoId: data.videoId,
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
    categoryId: data.categoryId,
    file: data.file,
    id: data.id,
});
export const preparePortfolioUpdateData = (data: ModalAdministeredPortfolioModel): PortfolioUpdateApiParams => ({
    title: data.title,
    description: data.description,
    status: data.status,
    categoryId: data.categoryId,
    file: data.file,
    id: data.id,
    pictureId: data.pictureId,
});

export const prepareFeedbackCreateData = (data: ModalAdministeredFeedbackModel): FeedbackCreateApiParams => ({
    title: data.title,
    description: data.description,
    status: data.status,
    video: data.video,
    file: data.file,
    id: data.id,
});
export const prepareFeedbackUpdateData = (data: ModalAdministeredFeedbackModel): FeedbackUpdateApiParams => ({
    title: data.title,
    description: data.description,
    status: data.status,
    video: data.video,
    pictureId: data.pictureId,
    videoId: data.videoId,
    file: data.file,
    id: data.id,
});

export const preparePagesCreateData = (data: ModalAdministeredCategoryModel): categoryCreateApiParams => ({
    title: data.title,
    description: data.description,
    status: data.status,
    file: data.file,
    subtitle: data.subtitle,
    list: data.list,
    video: data.video,
    sectionId: data.sectionId,
    previewPictureId: data.previewPictureId,
    previewPictureFile: data.previewPictureFile,
});
export const preparePagesUpdateData = (data: ModalAdministeredCategoryModel): categoryUpdateApiParams => ({
    title: data.title,
    description: data.description,
    status: data.status,
    file: data.file,
    id: data.id,
    number: data.number,
    subtitle: data.subtitle,
    list: data.list,
    pictureId: data.pictureId,
    video: data.video,
    videoId: data.videoId,
    sectionId: data.sectionId,
    previewPictureId: data.previewPictureId,
    previewPictureFile: data.previewPictureFile,
    iconPictureId: data.iconPictureId,
    icon: data.icon,
});

export const useEntityCreate = () => {
    const newsParams = useMutation({ mutationFn: newsCreateApi });
    const articlesParams = useMutation({ mutationFn: articleCreateApi });
    const portfolioParams = useMutation({ mutationFn: portfolioCreateApi });
    const pagesParams = useMutation({ mutationFn: categoryCreateApi });
    const feedbackParams = useMutation({ mutationFn: feedbackCreateApi });

    return {
        [AdminEntityPageType.NEWS]: newsParams,
        [AdminEntityPageType.ARTICLES]: articlesParams,
        [AdminEntityPageType.PORTFOLIO]: portfolioParams,
        [AdminEntityPageType.PAGES]: pagesParams,
        [AdminEntityPageType.FEEDBACK]: feedbackParams,
    };
};
export const useEntityUpdate = () => {
    const newsParams = useMutation({ mutationFn: newsUpdateApi });
    const articlesParams = useMutation({ mutationFn: articleUpdateApi });
    const portfolioParams = useMutation({ mutationFn: portfolioUpdateApi });
    const pagesParams = useMutation({ mutationFn: categoryUpdateApi });
    const feedbackParams = useMutation({ mutationFn: feedbackUpdateApi });

    return {
        [AdminEntityPageType.NEWS]: newsParams,
        [AdminEntityPageType.ARTICLES]: articlesParams,
        [AdminEntityPageType.PORTFOLIO]: portfolioParams,
        [AdminEntityPageType.PAGES]: pagesParams,
        [AdminEntityPageType.FEEDBACK]: feedbackParams,
    };
};
export const useEntityDelete = () => {
    const newsParams = useMutation({ mutationFn: newsDeleteApi });
    const articlesParams = useMutation({ mutationFn: articleDeleteApi });
    const portfolioParams = useMutation({ mutationFn: portfolioDeleteApi });
    const pagesParams = useMutation({ mutationFn: categoryDeleteApi });
    const feedbackParams = useMutation({ mutationFn: feedbackDeleteApi });

    return {
        [AdminEntityPageType.NEWS]: newsParams,
        [AdminEntityPageType.ARTICLES]: articlesParams,
        [AdminEntityPageType.PORTFOLIO]: portfolioParams,
        [AdminEntityPageType.PAGES]: pagesParams,
        [AdminEntityPageType.FEEDBACK]: feedbackParams,
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
        case AdminEntityPageType.FEEDBACK: {
            const { title } = entity as GetFeedbackDto;

            return `Перенос в архив "${title}"`;
        }
        default:
            return "Удаление этой сущности может привести к необратимой потере данных";
    }
};
