import { useState } from "react";
import cnBind from "classnames/bind";

import { ModalCaseBlock } from "@/components/_Modals/ModalCaseBlock";
import card_1 from "@/shared/assests/Image (3).png";
import card_2 from "@/shared/assests/Image (4).png";
import card_3 from "@/shared/assests/Image (5).png";
import card_4 from "@/shared/assests/Image (6).png";
import card_5 from "@/shared/assests/Image (7).png";
import card_6 from "@/shared/assests/Image (8).png";
import card_7 from "@/shared/assests/Image (9).png";
import { useBooleanState } from "@/shared/hooks";
import { CaseCard } from "@/view/Main/component/CaseBlock/component";

import styles from "./CaseBlock.module.scss";

const cx = cnBind.bind(styles);

export const CaseBlock = () => {
    const list = [
        {
            title: "DOSTAЕВСКИЙ",
            description:
                "Ежемесячное размещение рекламы на  рамках внутри лифтов Бизнес Центров с ежемесячной ротацией блюд кухни и указанием приемуществ заказа в компании Достаевский",
            image: card_1.src,
        },
        {
            title: "Всем Еда",
            description: "Еженедельное распространение дорхенгеров в районах присутсвия цехов",
            image: card_2.src,
        },
        {
            title: "Самолет плюс",
            description: "Размещение рекламы на мониторах города Казань",
            image: card_3.src,
        },
        {
            title: "Икра и Рыба",
            description: "Размещение дорхенгеров на 93 500 дверях квартир",
            image: card_4.src,
        },
        {
            title: "Теремок",
            description:
                "Ежемесячное размещение рекламы вакансий  крупными форматами ,А2 и А3 на стендах в лифтах домов , территориально расположенных в локации до 5 км от точек работы.",
            image: card_5.src,
        },
        {
            title: "Faces",
            description: "Размещение рекламы на носителе типа Лайтбокс вов ходнйо группе БЦ.",
            image: card_6.src,
        },
        {
            title: "Глазцентр",
            description:
                "Ежемесячное размещение рекламы предложений клиники в нескольких районах с ежемесячной ротацией адресов и макетов на стендах в лифтах Санкт -Петербурга.",
            image: card_7.src,
        },
    ];
    const [isOpen, onOpen, onClose] = useBooleanState(false);
    const [current, setCurrent] = useState<{ title: string; description: string; image: string } | null>(null);
    const handleOnModal = (i: { title: string; description: string; image: string }) => {
        setCurrent(i);
        onOpen();
    };
    const handleOnClose = () => {
        onClose();
        setCurrent(null);
    };

    return (
        <div className={cx("case-block")}>
            <div className={cx("wrapper", "container")}>
                <h2>Портфолио</h2>
                <div className={cx("cards")}>
                    {list.map((el, index) => (
                        <CaseCard onClick={() => handleOnModal(el)} key={index} {...el} />
                    ))}
                </div>
            </div>
            <ModalCaseBlock
                isOpen={isOpen}
                onClose={handleOnClose}
                item={current !== null ? current : { title: "", description: "", image: "" }}
            />
        </div>
    );
};
