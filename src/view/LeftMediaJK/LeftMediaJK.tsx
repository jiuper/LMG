import cnBind from "classnames/bind";
import Image from "next/image";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import { MapWrapper } from "@/components/Map";
import card from "@/shared/assests/notFound.png";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";

import styles from "./LeftMediaJK.module.scss";

const cx = cnBind.bind(styles);

type Props = {};
export const LeftMediaJk = ({}: Props) => {
    const [isOpen, open, close] = useBooleanState(false);
    const list = {
        img: card,
        description: "Эффективное размещение рекламных сообщений в лифтах жилых комплексов Невского района.",
        title: "ЖК Солнышко",
        caption:
            'ЖК "Солнышко"- двухсекционный 23-этажный кирпично-монолитный жилой дом.  В комплексе 4 здания. В доме представлены 1-, 2-, 3-комнатные квартиры улучшенной планировки, с просторными кухнями и холлами, общей площадью от 45,20 до 109,50 кв. м.',
        text: 'Привлеките внимание жителей престижного ЖК "Солнечный" с помощью нашей рекламы в лифтах.',
    };

    return (
        <div className={cx("left-media-jk")}>
            <div className={cx("wrapper-map")}>
                <div className={cx("wrapper", "container")}>
                    <div className={cx("header")}>
                        <h3>{list.title}</h3>
                    </div>
                    <div className={cx("map-content")}>
                        <MapWrapper />
                    </div>
                    <div className={cx("footer")}>
                        <p>{list.caption}</p>
                    </div>
                    <Button label="Оставить заявку" onClick={open} className={cx("button")} />
                </div>
            </div>
            <div className={cx("container-lift")}>
                <div className={cx("wrapper", "container")}>
                    <Image className={cx("image")} width={1200} height={423} src={list.img} alt={list.img.src} />

                    <div className={cx("description")}>
                        <h2>{list.description}</h2>
                        <span>{list.text}</span>
                    </div>
                </div>
            </div>
            <div className={cx("form")}>
                <FormFeedback />
            </div>
            <ModalFeedBack isOpen={isOpen} onClose={close} />
        </div>
    );
};
