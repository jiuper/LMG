import { useEffect, useMemo, useState } from "react";

export const useSizeResponseImages = (fileImg?: File) => {
    const [sizeImg, setSizeImg] = useState<number>(0);

    const respImg = useMemo(() => (sizeImg > 133 ? 133.333 : sizeImg < 20 ? 20 : sizeImg), [sizeImg]);
    useEffect(() => {
        if(!fileImg) return
        const img = new Image();
        img.src = URL.createObjectURL(fileImg);
        img.onload = () => {
            setSizeImg((img.height / img.width) * 100);
        };
    }, [fileImg]);

    return respImg;
};
