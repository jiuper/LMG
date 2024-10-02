import type { ReactElement } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useWindowSize } from "@/shared/hooks";

type IContextValue = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    windowScreen: number;
};
const ResizeContext = createContext<IContextValue | null>(null);
export const useResizeContext = () => {
    const context = useContext(ResizeContext);

    if (!context) {
        throw new Error("useResizeContext must be used within the context");
    }

    return context;
};
export const WindowResizeProvider = ({ children }: { children: ReactElement }) => {
    const { width } = useWindowSize();
    const [windowScreen, setWindowScreen] = useState(0);

    useEffect(() => {
        if (width && width) {
            setWindowScreen(width);
        }
    }, [width]);

    const resizeContextValue: IContextValue = useMemo(() => {
        return {
            isMobile: windowScreen < 720,
            isTablet: windowScreen >= 720 && windowScreen < 1025,
            isDesktop: windowScreen >= 1025,
            windowScreen,
        };
    }, [windowScreen]);

    return <ResizeContext.Provider value={resizeContextValue}>{children}</ResizeContext.Provider>;
};
