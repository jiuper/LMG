import type { ReactNode } from "react";
import React from "react";
import cnBind from "classnames/bind";
import Head from "next/head";
import { useRouter } from "next/router";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { ROUTING_IS_HEADER } from "@/shared/constants/Routing";
import { useResizeContext } from "@/shared/context/WindowResizeProvider";

import styles from "./PageLayout.module.scss";

const cx = cnBind.bind(styles);

interface PageLayoutProps {
    title?: string;
    children: ReactNode;
}

export const PageLayout = ({ children, title }: PageLayoutProps) => {
    const { isMobile } = useResizeContext();
    const { pathname } = useRouter();
    const isAdmin = pathname.startsWith("/admin");

    return (
        <>
            <Head>
                <link href="favicon.ico" rel="icon" type="image/svg+xml" />
                <meta
                    name="viewport"
                    content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <meta name="viewport" content="width=device-width" />
                {title && <title>{title}</title>}
            </Head>

            <div className={cx("wrapper", { "is-admin": isAdmin })}>
                {isAdmin && ROUTING_IS_HEADER.map((el) => el.href === pathname && el.isUser) && !isMobile && (
                    <SideBar isOpen />
                )}
                {!isAdmin && <Header />}
                <main className={cx("main")}>
                    <div className={cx("content")}>{children}</div>
                </main>
                {!isAdmin && <Footer />}
            </div>
        </>
    );
};
