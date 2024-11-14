import React, { useCallback, useEffect, useState } from "react";
import cnBind from "classnames/bind";
import Head from "next/head";

import { SideBar } from "@/components/SideBar";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { Button } from "@/shared/ui/Button";

import type { AdminPageLayoutProps } from "./types";

import styles from "./PageLayout.module.scss";

const cx = cnBind.bind(styles);

export const AdminLayout = ({ children, title, pathname, isMobile }: AdminPageLayoutProps) => {
    const [search, setSearch] = useState<string>("");
    const [createTitle, setCreateTitle] = useState<string>("Создать статью");

    const handleSearchChange = useCallback((value?: string) => {
        setSearch(value ?? "");
    }, []);

    const setTitle = useCallback((pathname?: string) => {
        const getTitle = (path: string) => {
            const splitPath = path.split("/").filter((el) => el);
            const newPath = splitPath.length > 1 ? splitPath[1] : splitPath[0];
            type PathKeys = "admin" | "news" | "portfolio";
            const paths: { [key in PathKeys]: string } = {
                admin: "Создать статью",
                news: "Созадть новость",
                portfolio: "Созадть кейс",
            };
            setCreateTitle(paths[newPath as PathKeys] ?? "");
        };

        if (pathname) {
            getTitle(pathname);
        } else {
            setCreateTitle("Cозадать статью");
        }
    }, []);

    const hahdelClick = useCallback(() => {
        console.log("kek");
    }, []);

    useEffect(() => {
        setTitle(pathname);
    }, [pathname, setTitle]);

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
            <div className={cx("wrapper", "is-admin")}>
                {!isMobile && <SideBar isOpen />}
                <main className={cx("main")}>
                    {createTitle && (
                        <div className={cx("search-box")}>
                            <InputSearch
                                rootClassName={cx("search-box__input")}
                                debounceDelay={200}
                                value={search}
                                onChange={handleSearchChange}
                            />
                            <Button
                                label={createTitle}
                                mode="purple"
                                className={cx("search-box__btn")}
                                onClick={hahdelClick}
                            />
                        </div>
                    )}
                    <div className={cx("content")}>{children}</div>
                </main>
            </div>
        </>
    );
};
