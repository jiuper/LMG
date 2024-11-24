import { useCallback, useEffect, useState } from "react";
import cnBind from "classnames/bind";
import Image from "next/image";

import { API_BASE } from "@/shared/constants/private";

import type { ImgPreviewType } from "./ImgPreview.type";

import styles from "./style.module.scss";

const cx = cnBind.bind(styles);

const fileToBuffer = (file: File): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const buffer = Buffer.from(arrayBuffer);
            resolve(buffer);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};

export const ImgPreview = ({ value, className }: ImgPreviewType) => {
    const [file, setFile] = useState<string | null>(null);
    const linkFile = typeof value === "string" ? `${API_BASE}/picture/${value}` : file;
    const handleFileUpload = async (file: File): Promise<Buffer> => {
        return fileToBuffer(file);
    };

    const newFile = useCallback((bufferFile?: Buffer) => {
        if (!bufferFile) return;

        try {
            if (!(bufferFile instanceof Buffer)) {
                throw new Error("bufferFile is not an instance of Buffer");
            }

            const base64String = bufferFile.toString("base64");
            const file = `data:image/png;base64,${base64String}`;

            setFile(file);
        } catch (error) {
            console.error("Error converting buffer to Base64:", error);
        }
    }, []);

    useEffect(() => {
        const processFile = async () => {
            if (typeof value !== "string") {
                const buffer = await handleFileUpload(value);
                newFile(buffer);
            }
        };
        void processFile();
    }, [value, newFile]);

    return (
        <div className={cx("container__images", className)}>
            {linkFile && <Image className={cx("image-origin")} src={linkFile} alt="asd" width={200} height={200} />}
        </div>
    );
};
