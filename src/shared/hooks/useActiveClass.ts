import { useState } from "react";

export const useActiveClass = (initState: number) => {
    const [isIndex, setIsIndex] = useState<number>(initState);
    const indexBtn = (index: number) => setIsIndex(index);
    const indexBtnNext = () => setIsIndex((prev) => prev + 1);
    const indexBtnPrev = () => setIsIndex((prev) => prev - 1);

    return { isIndex, indexBtn, indexBtnNext, indexBtnPrev };
};
