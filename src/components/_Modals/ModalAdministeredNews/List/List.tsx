import { useEffect, useState } from "react";
import cnBind from "classnames/bind";

import type { ListDto } from "@/entities/types/entities";
import { Button } from "@/shared/ui/_Button";
import { InputText } from "@/shared/ui/_InputText";

import styles from "./List.module.scss";

const cx = cnBind.bind(styles);

type Props = {
    index: number;
    data: ListDto;
    onChangeList: (list: ListDto, index: number) => void;
};
export const List = ({ index, data, onChangeList }: Props) => {
    const [list, setList] = useState<ListDto>({ items: [""], title: "" });
    const onChangeTitle = (val: string) => {
        setList((prev) => ({ ...prev, title: val }));
        onChangeList({ ...list, title: val }, index - 1);
    };

    const onChangeItems = (val: string, inx: number) => {
        setList({ ...list, items: list.items?.map((el, i) => (i === inx ? val : el)) });
        onChangeList({ ...list, items: list.items?.map((el, i) => (i === inx ? val : el)) }, index - 1);
    };

    useEffect(() => {
        setList(data);
    }, [data]);

    return (
        <div className={cx("list-block")}>
            <span>Список {index}</span>
            <InputText
                isFullWidth
                label="Заголовок списка"
                onChange={(e) => onChangeTitle(e.target.value)}
                value={list.title}
            />
            <div className={cx("list-items")}>
                {list.items?.map((el, i) => (
                    <InputText
                        key={i}
                        isFullWidth
                        label={`Пункт ${i + 1}`}
                        onChange={(e) => onChangeItems(e.target.value, i)}
                        value={el}
                    />
                ))}
            </div>
            <div className={cx("buttons")}>
                <Button
                    className={cx("add-btn")}
                    onClick={() => setList((prev) => ({ ...prev, items: [...(prev.items || []), ""] }))}
                >
                    Добавить пункт
                </Button>
                <Button
                    className={cx("remove-btn")}
                    onClick={() => {
                        setList((prev) =>
                            prev.items?.length === 1
                                ? prev
                                : {
                                      ...prev,
                                      items: prev.items?.length === 1 ? [] : prev.items?.slice(0, -1),
                                  },
                        );
                        onChangeList({ ...list, items: list.items?.slice(0, -1) }, index - 1);
                    }}
                >
                    Удалить пункт
                </Button>
            </div>
        </div>
    );
};
