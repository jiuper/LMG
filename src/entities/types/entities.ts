export interface CreateNewsDto {
    id: string;
    number?: number;
    title?: string;
    subtitle?: string;
    time?: string;
    video?: File | null;
    videoId?: string | null;
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
    categoryId?: string;
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
    videoId?: string;
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
    createdAt?: Date;
    updatedAt?: Date;
    build: {
        id: string;
        categoryId?: string;
        categoryAreaId?: string;
        name?: string;
        coordinates?: [number, number][];
        list?: { title?: string; value?: string }[];
    }[];
    list?: {
        title?: string;
        value?: string;
    }[];
}

export interface GetCategoryDto {
    id: string;
    number: number;
    title: string;
    description: string;
    subtitle: string;
    sectionId: string;
    pictureId?: string;
    videoId?: string;
    list?: { title: string; items: { caption: string; subcaption: string }[] };
    status?: ContentSatus;
    createdAt?: string;
    updatedAt?: string;
}
export interface GetAreaDto {
    id: string;
    number: number;
    lat: number;
    lon: number;
    name: string;
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
    categoryId: string;
    areaId: string;
    title?: string;
    description?: string;
    subTitle?: string;
    pictureId?: string | null;
    status?: ContentSatus;
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
        name?: string;
        coordinates?: [number, number][];
        list?: { title?: string; value?: string }[];
    }[];
    list?: {
        title?: string;
        value?: string;
    }[];
}

export interface GetBuildDto {
    id: string;
    number: number;
    coordinates: [number, number][];
    name: string;
    wDescription: string;
    pictureId: string;
    gTitle: string;
    gSubTitle: string;
    list: { title: string; value: string }[];
    status: ContentSatus;
    categoryAreaId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCategoryDto {
    title?: string;
    description?: string;
    subtitle?: string;
    sectionId?: string;
    pictureId?: string;
    videoId?: string;
    list?: { title?: string; items?: { caption?: string; subcaption?: string }[] };
    status?: ContentSatus;
    file?: File;
    video?: File;
    id?: string;
    number?: number;
}

export interface UpdateCategoryDto {
    id: string;
    title?: string;
    description?: string;
    subtitle?: string;
    sectionId?: string;
    pictureId?: string;
    videoId?: string;
    list?: { title?: string; items?: { caption?: string; subcaption?: string }[] };
    status?: ContentSatus;
    file?: File;
    video?: File;
}

export interface UpdateCategoryStatusDto {
    categoryId?: string;
    status?: ContentSatus;
}

export interface CreateCategoryAreaDto {
    categoryId?: string | null;
    areaId?: string | null;
    title?: string;
    description?: string;
    subTitle?: string;
    status?: ContentSatus;
    file?: File;
}

export interface UpdateCategoryAreaDto {
    id: string;
    categoryId: string;
    areaId: string;
    title?: string;
    description?: string;
    subTitle?: string;
    status?: ContentSatus;
    file?: File;
}

export interface UpdateCategoryAreaStatusDto {
    categoryAreaId?: string;
    status?: ContentSatus;
}

export interface CreateBuildDto {
    coordinates?: [number, number][];
    name?: string;
    wDescription?: string;
    gTitle?: string;
    gSubTitle?: string;
    list?: ModalList[];
    status: ContentSatus;
    categoryAreaId?: string;
}

export interface ModalList {
    title?: string;
    value?: string;
    file?: File;
}

export interface UpdateBuildDto {
    id: string;
    coordinates?: [number, number][];
    name?: string;
    wDescription?: string;
    gTitle?: string;
    gSubTitle?: string;
    list?: ModalList[];
    status: ContentSatus;
    categoryAreaId?: string;
}

export interface ModalList {
    title?: string;
    value?: string;
    file?: File;
}

export interface UpdateBuildStatusDto {
    buildId?: string;
    status?: ContentSatus;
}
