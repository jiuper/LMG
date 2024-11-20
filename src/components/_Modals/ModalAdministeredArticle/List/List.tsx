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
};
export const List = ({ index, data }: Props) => {
    const [list, setList] = useState<ListDto>({ items: [""], title: "" });
    const onChangeTitle = (val: string) => {
        setList((prev) => ({ ...prev, title: val }));
    };

    const onChangeItems = (val: string, index: number) => {
        setList({ ...list, items: list.items?.map((el, i) => (i === index ? val : el)) });
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
                    onClick={() =>
                        setList((prev) =>
                            prev.items?.length === 1
                                ? prev
                                : {
                                      ...prev,
                                      items: prev.items?.length === 1 ? [] : prev.items?.slice(0, -1),
                                  },
                        )
                    }
                >
                    Удалить пункт
                </Button>
            </div>
        </div>
    );
};
