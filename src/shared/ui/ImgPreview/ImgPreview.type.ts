export interface ImgPreviewType {
    value: File;
    deleteFile?: (index: number) => void;
    isClose?: boolean;
    className?: string;
}
