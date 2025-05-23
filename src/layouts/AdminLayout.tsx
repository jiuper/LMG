import React from "react";
import cnBind from "classnames/bind";
import Head from "next/head";

import { FormAuth } from "@/components/_Forms/FormAuth/FormAuth";
import { SideBar } from "@/components/SideBar";
import { useAdminAuth } from "@/shared/hooks/useAdminAuth";

import type { AdminPageLayoutProps } from "./types";

import styles from "./PageLayout.module.scss";

const cx = cnBind.bind(styles);

export const AdminLayout = ({ children, title, isMobile }: AdminPageLayoutProps) => {
    const { isAuthorized } = useAdminAuth();

    if (!isAuthorized) return <FormAuth />;

    if (isAuthorized)
        return (
            <>
                <Head>
                    <link href="favicon.svg" rel="icon" type="image/svg+xml" />
                    <meta
                        name="viewport"
                        content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                    <meta name="viewport" content="width=device-width" />
                    {title && <title>{title}</title>}
                </Head>
                <div className={cx("wrapper", "is-admin")}>
                    {!isMobile && <SideBar isOpen />}
                    <main className={cx("main")}>
                        <div className={cx("content")}>{children}</div>
                    </main>
                </div>
            </>
        );
};
