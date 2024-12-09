import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import cnBind from "classnames/bind";
import Head from "next/head";
import { useRouter } from "next/router";

import { getCategoryListApi } from "@/api/getCategoryListApi";
import { getPagesListApi } from "@/api/getPagesListApi";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { items } from "@/components/NavBar/constants";
import { Routes } from "@/shared/constants";
import { useResizeContext } from "@/shared/context/WindowResizeProvider";

import { AdminLayout } from "./AdminLayout";
import type { PageLayoutProps } from "./types";

import styles from "./PageLayout.module.scss";

const cx = cnBind.bind(styles);

export const PageLayout = ({ children, title }: PageLayoutProps) => {
    const { isMobile } = useResizeContext();
    const { pathname } = useRouter();
    const isAdmin = pathname.startsWith("/fsjfnsdklflsdkfdferkg");

    if (isAdmin) {
        return (
            <AdminLayout title={title} pathname={pathname} isMobile={isMobile}>
                {children}
            </AdminLayout>
        );
    }
    const { data: section } = useQuery({
        queryKey: ["section"],
        queryFn: getPagesListApi,
    });

    const listSec = useMemo(() => section || [], [section]);
    const { data } = useQuery({
        queryKey: ["category"],
        queryFn: () => getCategoryListApi(listSec.filter((el) => el.number === 1)[0].id),
    });
    const list = useMemo(() => data || [], [data]);
    const mutateMenu = useMemo(() => {
        return items.map((el, index) => {
            let updatedItems = el.items?.filter((item) => item.url) || [];

            if (list[index]) {
                updatedItems = updatedItems.map((item, itemIndex) => {
                    if (itemIndex === 0) {
                        const result = list.filter((elem) =>
                            elem.title
                                .toLowerCase()
                                .replace(/\s+/g, "")
                                .includes("реклама в лифтах".replace(/\s+/g, "")),
                        )[0];
                        const id = result ? result.id : "";

                        return { ...item, url: `${Routes.BUILDING}/${id}` };
                    }

                    if (itemIndex === 1) {
                        const result = list.filter((elem) =>
                            elem.title
                                .toLowerCase()
                                .replace(/\s+/g, "")
                                .includes("реклама на видеоэкранах".replace(/\s+/g, "")),
                        )[0];
                        const id = result ? result.id : "";

                        return { ...item, url: `${Routes.BUILDING}/${id}` };
                    }

                    return item;
                });
            }

            return { ...el, items: updatedItems };
        });
    }, [list]);

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
            <div className={cx("wrapper")}>
                <Header data={mutateMenu} />
                <main className={cx("main")}>
                    <div className={cx("content")}>{children}</div>
                </main>
                <Footer />
            </div>
        </>
    );
};
