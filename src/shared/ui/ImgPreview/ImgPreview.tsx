import { useCallback, useEffect, useState } from "react";
import cnBind from "classnames/bind";
import Image from "next/image";

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

    const handleFileUpload = async (file: File): Promise<Buffer> => {
        return fileToBuffer(file);
    };
    const newFile = useCallback((bufferFile?: Buffer) => {
        if (!bufferFile) return;
        const data = new Uint8Array(bufferFile);
        const newImg = btoa(String.fromCharCode(...data));
        const file = `data:image/png;base64,${newImg}`;
        setFile(file);
    }, []);
    useEffect(() => {
        const processFile = async () => {
            if (value) {
                const buffer = await handleFileUpload(value);
                newFile(buffer);
            }
        };
        void processFile();
    }, [value, newFile]);

    return (
        <div className={cx("container__images", className)}>
            {file && <Image className={cx("image-origin")} src={file} alt="asd" width={200} height={200} />}
        </div>
    );
};
