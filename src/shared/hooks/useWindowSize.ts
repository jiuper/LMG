import { useEffect, useState } from "react";

interface IWindowSize {
    width: number | null;
    height: number | null;
}

export const useWindowSize = (): IWindowSize => {
    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: null,
        height: null,
    });

    useEffect(() => {
        if (window !== undefined) {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
};
