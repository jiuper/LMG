import { useState } from "react";
import cnBind from "classnames/bind";
import type { ImageProps } from "next/image";
import Image from "next/image";

import NotF0undImg from "@/shared/assests/notFound.png";

import styles from "./CustomImage.module.scss";

const cx = cnBind.bind(styles);

type CustomImageProps = ImageProps;
export const CustomImage = ({ ...props }: CustomImageProps) => {
    const { src, alt, className, onClick, width, height } = props;
    const [err, setErr] = useState(false);

    return (
        <Image
            width={width}
            height={height}
            className={cx("image", className)}
            src={!err ? src : NotF0undImg}
            alt={alt}
            onClick={onClick}
            onError={() => setErr(true)}
        />
    );
};
