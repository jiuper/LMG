export interface ImgPreviewType {
    filesImg?: Buffer;
    deleteFile?: (index: number) => void;
    isClose?: boolean;
    className?: string;
}
