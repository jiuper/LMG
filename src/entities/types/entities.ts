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
export interface GetFeedbackDto {
    id: string;
    number?: number;
    title?: string;
    description?: string;
    video?: File;
    status: ContentSatus;
    pictureId?: string;
}
export interface CreateFeedbackDto {
    title?: string;
    description?: string;
    video?: string;
    status: ContentSatus;
}

export interface GetSectionDto {
    id: string;
    number: number;
    title?: string;
    description?: string;
    status?: ContentSatus;
    createdAt: Date;
    updatedAt: Date;
    sectionArea: SectionArea[];
}
export interface CreateCategoryDto {
    id?: string;
    number?: number;
    title?: string;
    description?: string;
    subtitle?: string;
    districtId?: string;
    pictureId?: string;
    status?: ContentSatus;
    file?: File | null;
}
export interface Area {
    id: string;
    number: number;
    lat?: string;
    lon?: string;
    name?: string;
    title?: string;
    description?: string;
    subTitle?: string;
    status?: ContentSatus;
    picture?: Picture;
    pictureId?: string;
    createdAt: Date;
    updatedAt: Date;
    sectionArea: SectionArea[];
}

export interface SectionArea {
    id: string;
    sectionId: string;
    areaId: string;
    section: GetSectionDto;
    area: Area;
    status?: ContentSatus;
    createdAt: Date;
    updatedAt: Date;
    build: Build[];
}

export interface Build {
    id: string;
    number: number;
    lat?: string;
    lon?: string;
    name?: string;
    wPicture?: Picture;
    wPictureId?: string;
    wDescription?: string;
    gPicture?: Picture;
    gPictureId?: string;
    gTitle?: string;
    gSubTitle?: string;
    list?: any;
    status?: ContentSatus;
    sectionAreaId?: string;
    sectionArea?: SectionArea;
    createdAt: Date;
    updatedAt: Date;
}

export interface Picture {
    id: string;
    url: string;
}
