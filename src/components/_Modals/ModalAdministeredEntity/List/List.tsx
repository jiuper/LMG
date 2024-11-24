import { useEffect, useState } from "react";
import cnBind from "classnames/bind";

import { Button } from "@/shared/ui/_Button";
import { InputText } from "@/shared/ui/_InputText";

import styles from "./List.module.scss";

const cx = cnBind.bind(styles);

export type ListItem = {
    title: string;
    value: string;
};

type Props = {
    data: ListItem[];
    onChangeList: (newList: ListItem[]) => void;
};

export const List = ({ data, onChangeList }: Props) => {
    const [list, setList] = useState<ListItem[]>([{ title: "", value: "" }]);

    useEffect(() => {
        setList(data);
    }, [data]);

    const onChange = (val: string, type: "title" | "value", i: number) => {
        setList((prev) => prev.map((item, index) => (index === i ? { ...item, [type]: val } : item)));

        onChangeList(list.map((item, index) => (index === i ? { ...item, [type]: val } : item)));
    };

    return (
        <div className={cx("list-block")}>
            <div className={cx("list-items")}>
                {list.map((el, i) => (
                    <div className={cx("list-item")} key={i}>
                        <InputText
                            isFullWidth
                            label="Заголовок списка"
                            onChange={(e) => onChange(e.target.value, "title", i)}
                            value={el.title}
                        />
                        <InputText
                            isFullWidth
                            label="Содержание"
                            onChange={(e) => onChange(e.target.value, "value", i)}
                            value={el.value}
                        />
                    </div>
                ))}
            </div>
            <div className={cx("buttons")}>
                <Button
                    className={cx("add-btn")}
                    onClick={() => setList((prev) => [...prev, { title: "", value: "" }])}
                >
                    Добавить пункт
                </Button>
                <Button
                    className={cx("remove-btn")}
                    onClick={() => {
                        setList((prev) => (prev.length === 1 ? prev : prev.slice(0, -1)));
                        onChangeList(list.slice(0, -1));
                    }}
                >
                    Удалить пункт
                </Button>
            </div>
        </div>
    );
};
