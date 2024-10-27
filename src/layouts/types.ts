import type { ReactNode } from "react";

interface PageLayoutProps {
    title?: string;
    children: ReactNode;
}

type OptionalProps = {
    pathname?: string;
    isMobile?: boolean;
};

interface AdminPageLayoutProps extends PageLayoutProps, Partial<OptionalProps> {}

export type { AdminPageLayoutProps, PageLayoutProps };
