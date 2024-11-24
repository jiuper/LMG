import { useEffect, useState } from "react";
import cnBind from "classnames/bind";

import { InputText } from "@/shared/ui/_InputText";

import styles from "./List.module.scss";

const cx = cnBind.bind(styles);

export type ListItem = {
    title: string;
    items: { caption: string; subcaption: string }[];
};

type Props = {
    data: ListItem;
    onChangeList: (newList: ListItem) => void;
};

export const List = ({ data, onChangeList }: Props) => {
    const [list, setList] = useState<ListItem>({
        title: "",
        items: [
            { caption: "", subcaption: "" },
            { caption: "", subcaption: "" },
            { caption: "", subcaption: "" },
        ],
    });

    useEffect(() => {
        setList(data);
    }, [data]);

    const onChangeTitle = (val: string) => {
        setList((prev) => ({ ...prev, title: val }));
        onChangeList({ ...list, title: val });
    };

    const onChangeValue = (val: string, type: "caption" | "subcaption", index: number = 0) => {
        setList((prev) => ({
            ...prev,
            items: prev.items.map((el, i) => (i === index ? { ...el, [type]: val } : el)),
        }));
        onChangeList({ ...list, items: list.items.map((el, i) => (i === index ? { ...el, [type]: val } : el)) });
    };

    return (
        <div className={cx("list-block")}>
            <div className={cx("list-items")}>
                <InputText
                    isFullWidth
                    label="Заголовок списка"
                    onChange={(e) => onChangeTitle(e.target.value)}
                    value={list.title}
                />
                {list.items.map((el, i) => (
                    <div className={cx("list-item")} key={i}>
                        <InputText
                            isFullWidth
                            label="Название"
                            onChange={(e) => onChangeValue(e.target.value, "caption", i)}
                            value={el.caption}
                        />
                        <InputText
                            isFullWidth
                            label="Описание"
                            onChange={(e) => onChangeValue(e.target.value, "subcaption", i)}
                            value={el.subcaption}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
