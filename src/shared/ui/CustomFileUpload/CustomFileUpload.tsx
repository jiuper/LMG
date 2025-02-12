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
    onDelete?: () => void;
    required?: boolean;
}
const CustomFileUpload = ({ onChange, value, name, fileStr, onDelete, required }: CustomFileUploadProps) => {
    const [file, setFile] = useState<File | null | string>(value);
    const [_, setDrag] = useState(false);
    useEffect(() => {
        setFile(value);
    }, [value]);
    const generateRandomName = (length: number) => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    };

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const originalFile = e.target.files[0];

            const randomLength = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
            const randomName = generateRandomName(randomLength);

            const renamedFile = new File([originalFile], `${randomName}.${originalFile.name.split(".").pop()}`, {
                type: originalFile.type,
            });

            onChange(renamedFile);
        }
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
                    className={cx("drop", { required })}
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
                    {file !== "" && <ImgPreview className={cx("img")} value={file} />}
                    <CloseIcon
                        className={cx("close")}
                        onClick={() => {
                            setFile(null);
                            onChange(null);
                            onDelete?.();
                        }}
                    />
                </div>
            )}
        </div>
    );
};
export default memo(CustomFileUpload);
