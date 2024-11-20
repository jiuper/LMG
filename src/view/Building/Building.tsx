import cnBind from "classnames/bind";
import type { StaticImageData } from "next/image";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import { MapWrapper } from "@/components/Map";
import type { GetPortfolioDto } from "@/entities/types/entities";
import img_1 from "@/shared/assests/choose/Image (3).png";
import img_2 from "@/shared/assests/choose/Image (4).png";
import img_3 from "@/shared/assests/choose/Image (5).png";
import img_4 from "@/shared/assests/choose/Image (6).png";
import img_5 from "@/shared/assests/choose/Image (7).png";
import img_6 from "@/shared/assests/choose/Image (8).png";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";
import { Card } from "@/view/Building/components/Card";
import { CaseBlock } from "@/view/Main/component/CaseBlock";

import styles from "./Building.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    title?: string;
    description?: string;
    src: StaticImageData;
    alt: string;
    port: GetPortfolioDto[];
};
export const BuildingPage = ({ description, title, port, src, alt }: Props) => {
    const [isOpen, open, close] = useBooleanState(false);

    const listChooseBuild = [
        {
            title: "Реклама в лифтах",
            description: "Реклама на стойках выдачи",
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
    const listChooseEtc = [
        {
            title: "Реклама на стойках выдачи",
            description: "Эффективное размещение в зоне выдачи товаров.",
            image: img_1.src,
        },
        {
            title: "Реклама на упаковке",
            description: "Привлекайте внимание клиентов через брендированную упаковку.",
            image: img_2.src,
        },
        {
            title: "Реклама на чеках",
            description: "Дополнительное внимание клиентов с каждой покупкой.",
            image: img_3.src,
        },
        {
            title: "Реклама в зоне ожидания",
            description: "Привлеките клиентов в моменты ожидания заказов.",
            image: img_4.src,
        },
        {
            title: "Реклама через печатные материалы",
            description: "Размещение буклетов и листовок в ПВЗ.",
            image: img_5.src,
        },
    ];
    const filterList = alt === "Build" ? listChooseBuild : listChooseEtc;

    return (
        <div className={cx("building")}>
            <div className={cx("main-block")}>
                <CustomImage src={src} alt={alt} />
                <div className={cx("wrapper", "container")}>
                    <div className={cx("content")}>
                        <h1>{title}</h1>
                        <span>{description}</span>
                        <Button className={cx("button-main")} mode="empty" onClick={open} label="Заказать звонок" />
                    </div>
                </div>
                <ModalFeedBack isOpen={isOpen} onClose={close} />
            </div>
            <div className={cx("cards-container")}>
                <div className={cx("cards-wrapper", "container")}>
                    <h2>Варианты размещения рекламы</h2>
                    <div className={cx("cards")}>
                        {filterList.map((el, index) => (
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
                <CaseBlock className={cx("case-block")} listItem={port.slice(-4)} />
            </div>
            <div className={cx("form")}>
                <FormFeedback />
            </div>
        </div>
    );
};
