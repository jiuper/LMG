export interface CreateNewsDto {
    id: string;
    number?: number;
    title?: string;
    subtitle?: string;
    time?: string;
    video?: string;
    pictureId?: string;
    status: ContentSatus;
    contentItems?: GetItemDto[];
    list?: ListDto[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface GetNewsDto {
    title?: string;
    subtitle?: string;
    time?: string;
    video?: string;
    pictureName?: string;
    picture?: File[];
    status: ContentSatus;
    contentItems?: ItemDto[];
    list?: ListDto[];
}
export interface GetItemDto {
    text?: string;
    pictureId?: string;
}
export interface ItemDto {
    text?: string;
    pictureName?: string;
}

export interface ListDto {
    title?: string;
    items?: string[];
}

export enum ContentSatus {
    PUBLISHED = "PUBLISHED",
    DRAFT = "DRAFT",
    ARCHIVE = "ARCHIVE",
}

export interface GetPortfolioDto {
    id: string;
    number?: number;
    title?: string;
    description?: string;
    categoryName?: string;
    status: ContentSatus;
    pictureId?: string;
}
