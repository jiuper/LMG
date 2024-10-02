import { useCallback, useEffect, useState } from "react";
import cnBind from "classnames/bind";
import Image from "next/image";

import type { ImgPreviewType } from "./ImgPreview.type";

import styles from "./style.module.scss";

const cx = cnBind.bind(styles);
export const ImgPreview = ({ filesImg, className }: ImgPreviewType) => {
    const [file, setFile] = useState<string>();
    const newFile = useCallback((bufferFile?: Buffer) => {
        if (!bufferFile) return;
        const data = new Uint8Array(Object.values(bufferFile)[1]);

        const newImg = btoa(String.fromCharCode.apply(null, Array.from(data)));
        const file = `data:image/png;base64,${newImg}`;

        setFile(file);
    }, []);

    useEffect(() => {
        newFile(filesImg);
    }, [filesImg, newFile]);

    return (
        <div className={cx("container__images", className)}>
            {file && <Image className={cx("image-origin")} src={file} alt="asd" width={200} height={200} />}
        </div>
    );
};
