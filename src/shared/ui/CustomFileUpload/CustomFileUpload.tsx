import type { ChangeEvent } from "react";
import { memo, useEffect, useState } from "react";
import cnBind from "classnames/bind";

import { CloseIcon } from "@/shared/assests/svg/svg";
import { ImgPreview } from "@/shared/ui/ImgPreview/ImgPreview";

import styles from "./CustomFileUpload.module.scss";

const cx = cnBind.bind(styles);

interface CustomFileUploadProps {
    value: File | null;
    onChange: (val: File | null) => void;
    name: string;
    fileStr?: string;
}
const CustomFileUpload = ({ onChange, value, name, fileStr }: CustomFileUploadProps) => {
    const [file, setFile] = useState<File | null | string>(value);
    const [_, setDrag] = useState(false);
    useEffect(() => {
        setFile(value);
    }, [value]);
    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files && onChange(e.target.files[0]);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    };
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    };
    const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        onChange(e.dataTransfer.files[0]);
    };
    useEffect(() => {
        if (fileStr) setFile(fileStr);
    }, [fileStr]);

    return (
        <div className={cx("uploader")}>
            {file === null ? (
                <div
                    className={cx("drop")}
                    onDragStart={(e) => handleDragStart(e)}
                    onDragLeave={(e) => handleDragLeave(e)}
                    onDragOver={(e) => handleDragStart(e)}
                    onDrop={(e) => handleOnDrag(e)}
                >
                    <div className={cx("top")}>
                        Нажмите
                        <div className={cx("input-file")}>
                            <input
                                className={cx("input")}
                                onChange={handleUpload}
                                type="file"
                                accept=".jpg, .jpeg, .png, .mp4, .avi, .mov, .mkv, .wmv, .flv, .webm"
                                name={name}
                            />
                            <span className={cx("title")}>Загрузите</span>
                        </div>
                        или перетяните файл
                    </div>
                    <span className={cx("label")}>Лучшее разрешение минимум 200 х 200 px</span>
                </div>
            ) : (
                <div className={cx("preview")}>
                    <ImgPreview className={cx("img")} value={file} />
                    <CloseIcon
                        className={cx("close")}
                        onClick={() => {
                            setFile(null);
                            onChange(null);
                        }}
                    />
                </div>
            )}
        </div>
    );
};
export default memo(CustomFileUpload);
