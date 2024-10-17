import cnBind from "classnames/bind";

import card_1 from "@/shared/assests/card_1.png";
import card_2 from "@/shared/assests/card_2.png";
import card_3 from "@/shared/assests/card_3.png";
import card_4 from "@/shared/assests/card_4.png";
import card_5 from "@/shared/assests/card_5.png";
import { ServiceCard } from "@/view/Main/component/ServicesBlock/ServiceCard";

import styles from "./ServicesBlock.module.scss";

const cx = cnBind.bind(styles);

export const ServicesBlock = () => {
    const list = [
        {
            title: "Реклама в жилых домах, ЖК",
            description: "Описание кейса...",
            image: card_1.src,
        },
        {
            title: `Реклама для ПВЗ: Как привлечь клиентов?`,
            description: "Описание кейса...",
            image: card_2.src,
        },
        {
            title: "Реклама в фитнес клубах",
            description: "Описание кейса...",
            image: card_3.src,
        },
        {
            title: "Реклама в торговых центрах",
            description: "Описание кейса...",
            image: card_4.src,
        },
        {
            title: "Реклама в бизнес центрах",
            description: "Описание кейса...",
            image: card_5.src,
        },
    ];

    return (
        <div className={cx("services-block")}>
            <div className={cx("wrapper", "container")}>
                <h2>Услуги</h2>
                <div className={cx("cards")}>
                    {list.map((el, index) => (
                        <ServiceCard key={index} {...el} />
                    ))}
                </div>
            </div>
        </div>
    );
};
