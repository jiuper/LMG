import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import { Button } from "@/shared/ui/Button";

import styles from "./MainBlock.module.scss";

const cx = cnBind.bind(styles);

export const MainBlock = () => {
    const router = useRouter();
    const list = [
        { title: "Лифты", href: "/" },
        { title: "ПВЗ", href: "/" },
        { title: "ТЦ", href: "/" },
        { title: "БЦ", href: "/" },
        { title: "Реклама где хотите", href: "/" },
    ];

    return (
        <div className={cx("main-block")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("content")}>
                    <h1>Размещение рекламы и привлечение клиентов</h1>
                    <span>Эффективные решения для вашего бизнеса </span>
                    <Button label="Заказать звонок" />
                </div>
                <div className={cx("buttons")}>
                    {list.map(({ title, href }, index) => (
                        <Button className={cx("button")} key={index} label={title} onClick={() => router.push(href)} />
                    ))}
                </div>
            </div>
        </div>
    );
};
