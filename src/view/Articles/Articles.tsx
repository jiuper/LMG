import { useState } from "react";
import cnBind from "classnames/bind";
import { Paginator } from "primereact/paginator";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import type { CreateNewsDto } from "@/entities/types/entities";
import { CardArticle } from "@/view/Articles/components/CardArticle";

import styles from "./Articles.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    listArticles: CreateNewsDto[];
    title?: string;
    url: string;
};
export const Articles = ({ listArticles, title = "Статьи", url }: Props) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event: { first: number; rows: number }) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <div className={cx("articles")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("title")}>
                    <h2>{title}</h2>
                </div>
                <div className={cx("articles-wrapper")}>
                    <div className={cx("articles")}>
                        {listArticles.map((el, index) => (
                            <CardArticle url={url} key={index} item={el} />
                        ))}
                    </div>
                    <Paginator
                        className={cx("paginator")}
                        first={first}
                        rows={rows}
                        totalRecords={listArticles.length}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>

            <div className={cx("form")}>
                <FormFeedback />
            </div>
        </div>
    );
};
