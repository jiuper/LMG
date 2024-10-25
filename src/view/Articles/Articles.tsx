import { useState } from "react";
import cnBind from "classnames/bind";
import { Paginator } from "primereact/paginator";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import def from "@/shared/assests/card_1.png";
import { CardArticle } from "@/view/Articles/components/CardArticle";

import styles from "./Articles.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    listArticles?: [{ src?: string; title?: string; description?: string; id: string }];
    title?: string;
};
export const Articles = ({ listArticles, title = "Статьи" }: Props) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event: { first: number; rows: number }) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    const list = [
        {
            src: def,
            title: "Реклама в жилых домах, ЖК",
            description: "Когда название длинное, то вторая часть названия идет сюда",
            id: "1",
        },
        {
            src: def,
            title: "Реклама в жилых домах, ЖК",
            description: "Когда название длинное, то вторая часть названия идет сюда",
            id: "1",
        },
        {
            src: def,
            title: "Реклама в жилых домах, ЖК",
            description: "Когда название длинное, то вторая часть названия идет сюда",
            id: "1",
        },
        {
            src: def,
            title: "Реклама в жилых домах, ЖК",
            description: "Когда название длинное, то вторая часть названия идет сюда",
            id: "1",
        },
        {
            src: def,
            title: "Реклама в жилых домах, ЖК",
            description: "Когда название длинное, то вторая часть названия идет сюда",
            id: "1",
        },
    ];

    return (
        <div className={cx("articles")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("title")}>
                    <h2>{title}</h2>
                </div>
                <div className={cx("articles-wrapper")}>
                    <div className={cx("articles")}>
                        {list.map((el, index) => (
                            <CardArticle key={index} {...el} src={el.src.src} />
                        ))}
                    </div>
                    <Paginator
                        className={cx("paginator")}
                        first={first}
                        rows={rows}
                        totalRecords={120}
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
