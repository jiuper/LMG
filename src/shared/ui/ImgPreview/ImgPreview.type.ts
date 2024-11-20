export interface ImgPreviewType {
    value: File | string;
    deleteFile?: (index: number) => void;
    isClose?: boolean;
    className?: string;
}
