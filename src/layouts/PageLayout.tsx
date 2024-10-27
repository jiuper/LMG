import React from "react";
import cnBind from "classnames/bind";
import Head from "next/head";
import { useRouter } from "next/router";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useResizeContext } from "@/shared/context/WindowResizeProvider";

import { AdminLayout } from "./AdminLayout";
import type { PageLayoutProps } from "./types";

import styles from "./PageLayout.module.scss";

const cx = cnBind.bind(styles);

export const PageLayout = ({ children, title }: PageLayoutProps) => {
    const { isMobile } = useResizeContext();
    const { pathname } = useRouter();
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) {
        return (
            <AdminLayout title={title} pathname={pathname} isMobile={isMobile}>
                {children}
            </AdminLayout>
        );
    }

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
            <div className={cx("wrapper")}>
                <Header />
                <main className={cx("main")}>
                    <div className={cx("content")}>{children}</div>
                </main>
                <Footer />
            </div>
        </>
    );
};
