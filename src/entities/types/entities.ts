export interface CreateNewsDto {
    id: string;
    title?: string;
    subtitle?: string;
    time?: string;
    video?: string;
    status: ContentSatus;
    contentItems?: ItemDto[];
}

export interface ItemDto {
    text?: string;
    pictureName?: string;
    list?: ListDto;
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
