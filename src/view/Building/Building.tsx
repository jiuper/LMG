import cnBind from "classnames/bind";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import { MapWrapper } from "@/components/Map";
import img_1 from "@/shared/assests/choose/Image (3).png";
import img_2 from "@/shared/assests/choose/Image (4).png";
import img_3 from "@/shared/assests/choose/Image (5).png";
import img_4 from "@/shared/assests/choose/Image (6).png";
import img_5 from "@/shared/assests/choose/Image (7).png";
import img_6 from "@/shared/assests/choose/Image (8).png";
import card_1 from "@/shared/assests/Image (3).png";
import card_2 from "@/shared/assests/Image (4).png";
import card_3 from "@/shared/assests/Image (5).png";
import card_4 from "@/shared/assests/Image (6).png";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/view/Building/components/Card";
import { CaseBlock } from "@/view/Main/component/CaseBlock";

import styles from "./Building.module.scss";

const cx = cnBind.bind(styles);
type Props = {};
export const BuildingPage = ({}: Props) => {
    const [isOpen, open, close] = useBooleanState(false);
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
    ];
    const listChoose = [
        {
            title: "Реклама в лифтах",
            description: "Эффективное размещение в кабинах лифтов",
            image: img_1.src,
        },
        {
            title: "Реклама в подъездах",
            description: "Эффективное размещение в кабинах лифтов",
            image: img_2.src,
        },
        {
            title: "Распространение по почтовым ящикам",
            description: "Эффективное размещение в кабинах лифтов",
            image: img_3.src,
        },
        {
            title: "Реклама на видео экранах ",
            description: "Эффективное размещение в кабинах лифтов",
            image: img_4.src,
        },
        {
            title: "Вложение квитанции",
            description: "Эффективное размещение в кабинах лифтов",
            image: img_5.src,
        },
        {
            title: "Распространение дорхенгеров",
            description: "Эффективное размещение в кабинах лифтов",
            image: img_6.src,
        },
    ];

    return (
        <div className={cx("building")}>
            <div className={cx("main-block")}>
                <div className={cx("wrapper", "container")}>
                    <div className={cx("content")}>
                        <h1>Реклама в жилых домах</h1>
                        <span>
                            Достигайте своей аудитории там, где она живет.Эффективное решение для продвижения ваших
                            услуг и товаров среди жителей.
                        </span>
                        <Button className={cx("button-main")} mode="empty" onClick={open} label="Заказать звонок" />
                    </div>
                </div>
                <ModalFeedBack isOpen={isOpen} onClose={close} />
            </div>
            <div className={cx("cards-container")}>
                <div className={cx("cards-wrapper", "container")}>
                    <h2>Варианты размещения рекламы</h2>
                    <div className={cx("cards")}>
                        {listChoose.map((el, index) => (
                            <Card key={index} {...el} />
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx("wrapper-map", "container")}>
                <div className={cx("header")}>
                    <h3>Доступные локации</h3>
                    <Button className={cx("button")} mode="empty" onClick={open} label="Заказать звонок" />
                </div>
                <div className={cx("map-content")}>
                    <MapWrapper />
                </div>
            </div>
            <div className={cx("portfolio")}>
                <CaseBlock className={cx("case-block")} listItem={list} />
            </div>
            <div className={cx("form")}>
                <FormFeedback />
            </div>
        </div>
    );
};
