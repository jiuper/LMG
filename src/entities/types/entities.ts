export interface CreateNewsDto {
    id: string;
    number?: number;
    urlTitle?: string;
    title?: string;
    subtitle?: string;
    time?: string;
    video?: File | null;
    videoId?: string | null;
    pictureId?: string;
    files?: File[] | [];
    status: ContentSatus;
    contentItems?: GetItemDto[];
    pictureName?: string;
    list?: ListDto[];
    createdAt?: string;
    updatedAt?: string;
}

export interface GetItemDto {
    text?: string;
    pictureId?: string;
    pictureName?: string;
}
export interface ItemDto {
    text?: string;
    pictureId?: string;
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
    categoryId?: string;
    status: ContentSatus;
    pictureId?: string;
    file?: File | null;
}
export interface GetFeedbackDto {
    id: string;
    number?: number;
    title?: string;
    description?: string;
    video?: File;
    status: ContentSatus;
    pictureId?: string;
    videoId?: string;
    file?: File | null;
}

export interface GetSectionDto {
    id: string;
    number: number;
    title?: string;
    urlTitle?: string;
    description?: string;
    status: ContentSatus;
    createdAt?: Date;
    updatedAt?: Date;
    build: {
        id: string;
        categoryId?: string;
        categoryAreaId?: string;
        urlBuild?: string;
        urlCategory?: string;
        urlCategoryArea?: string;
        number: number;
        coordinates?: [number, number][];
        buildAreaCoordinates?: [number, number][];
        iconPictureId: string;
        name: string;
        wDescription: string;
        pictureId: string;
        gTitle: string;
        gSubTitle: string;
        list: { title: string; value: string }[];
        status: ContentSatus;
        createdAt: Date;
        updatedAt: Date;
    }[];
    list?: {
        title?: string;
        value?: string;
    }[];
}

export interface GetCategoryDto {
    id: string;
    urlTitle?: string;
    number: number;
    title: string;
    description: string;
    subtitle: string;
    seoTitle?: string;
    seoDescription?: string;
    sectionId: string;
    pictureId?: string;
    videoId?: string;
    list?: { title: string; items: { caption: string; subcaption: string }[] };
    status: ContentSatus;
    createdAt?: string;
    updatedAt?: string;
    previewPictureId?: string;
    iconPictureId?: string;
}
export interface GetAreaDto {
    id: string;
    urlTitle?: string;
    number: number;
    lat: number;
    lon: number;
    name: string;
    seoTitle?: string;
    seoDescription?: string;
    title: string;
    description: string;
    subTitle: string;
    status?: ContentSatus;
    pictureId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface GetCategoryAreaDto {
    id: string;
    urlTitle?: string;
    categoryId: string;
    areaId: string;
    seoTitle?: string;
    seoDescription?: string;
    title?: string;
    description?: string;
    subTitle?: string;
    pictureId?: string | null;
    status: ContentSatus;
    createdAt: Date;
    updatedAt: Date;
    area: {
        id: string;
        number: number;
        lat?: number;
        lon?: number;
        name?: string;
        status?: ContentSatus;
        createdAt: Date;
        updatedAt: Date;
    };
    build: {
        id: string;
        categoryId?: string;
        categoryAreaId?: string;
        urlBuild?: string;
        urlCategory?: string;
        urlCategoryArea?: string;
        number: number;
        coordinates?: [number, number][];
        buildAreaCoordinates?: [number, number][];
        iconPictureId: string;
        name: string;
        wDescription: string;
        pictureId: string;
        gTitle: string;
        gSubTitle: string;
        list: { title: string; value: string }[];
        status: ContentSatus;
        createdAt: Date;
        updatedAt: Date;
    }[];
    list?: {
        title?: string;
        value?: string;
    }[];
}

export interface GetBuildDto {
    id: string;
    urlTitle: string;
    seoTitle?: string;
    seoDescription?: string;
    categoryId?: string;
    categoryAreaId?: string;
    number: number;
    coordinates?: [number, number][];
    buildAreaCoordinates?: [number, number][];
    iconPictureId?: string;
    name: string;
    wDescription?: string;
    pictureId?: string;
    gTitle?: string;
    gSubTitle?: string;
    list: { title: string; value: string }[];
    status: ContentSatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ModalList {
    title?: string;
    value?: string;
    file?: File;
}
export interface GetPortfolioSectionDto {
    id: string;
    number?: number;
    title?: string;
    description?: string;
    categoryId?: string;
    status: ContentSatus;
    pictureId?: string;
}
