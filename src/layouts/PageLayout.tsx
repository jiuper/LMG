import type { ReactNode } from "react";
import React from "react";
import cnBind from "classnames/bind";
import Head from "next/head";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import styles from "./PageLayout.module.scss";

const cx = cnBind.bind(styles);

interface PageLayoutProps {
    title?: string;
    children: ReactNode;
}

export const PageLayout = ({ children, title }: PageLayoutProps) => {
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
