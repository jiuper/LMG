import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import card_1 from "@/shared/assests/card_1.png";
import card_2 from "@/shared/assests/card_2.png";
import card_3 from "@/shared/assests/card_3.png";
import card_4 from "@/shared/assests/card_4.png";
import card_5 from "@/shared/assests/card_5.png";
import { Routes } from "@/shared/constants";
import { ServiceCard } from "@/view/Main/component/ServicesBlock/ServiceCard";

import styles from "./ServicesBlock.module.scss";

const cx = cnBind.bind(styles);

export const ServicesBlock = () => {
    const href = useRouter();
    const list = [
        {
            title: "Реклама в жилых домах, ЖК",
            image: card_1.src,
            href: Routes.BUILDING,
        },
        {
            title: `Реклама для ПВЗ: Как привлечь клиентов?`,
            image: card_2.src,
            href: Routes.POSTERPVZ,
        },
        {
            title: "Реклама в фитнес клубах",
            image: card_3.src,
            href: Routes.POSTERFITNES,
        },
        {
            title: "Реклама в торговых центрах",
            image: card_4.src,
            href: Routes.POSTERTC,
        },
        {
            title: "Реклама в бизнес центрах",
            image: card_5.src,
            href: Routes.POSTERBC,
        },
    ];

    return (
        <div className={cx("services-block")}>
            <div className={cx("wrapper", "container")}>
                <h2>Услуги</h2>
                <div className={cx("cards")}>
                    {list.map((el, index) => (
                        <ServiceCard onClick={() => href.push(el.href)} key={index} {...el} />
                    ))}
                </div>
            </div>
        </div>
    );
};
