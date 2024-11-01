import cnBind from "classnames/bind";
import Image from "next/image";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import { MapWrapper } from "@/components/Map";
import card from "@/shared/assests/notFound.png";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";

import styles from "./LiftMediaSection.module.scss";

const cx = cnBind.bind(styles);
type Props = {};
export const LiftMediaSection = ({}: Props) => {
    const [isOpen, open, close] = useBooleanState(false);

    const list = {
        img: card,
        description: "Эффективное размещение рекламных сообщений в лифтах жилых комплексов Невского района.",
        title: "Реклама в лифтах Невский район",
        map: {
            caption: "Преимущества рекламы в лифтах Невского района",
            listText: [
                "Административно-территориальная единица Санкт-Петербурга. Расположен на юго-востоке города и является единственным районом, расположенным на обоих берегах Невы.",
                "Образован в марте 1917 года путём преобразования Шлиссельбургского участка, имевшего до революции статус пригорода, в полноценный городской район.",
                "Площадь Невского района — 6,2 тысячи га.",
                "Население района — 547 896 человек (по данным на 2023 год). Скрыть",
            ],
            list: {
                title: "Граничит с районами:",
                listTitle: [
                    "Красногвардейским;",
                    "Фрунзенским",
                    "Центральным",
                    "Колпинским",
                    " Всеволожским районом Ленинградской области.",
                ],
            },
        },
    };

    return (
        <div className={cx("lift-media-section")}>
            <div className={cx("wrapper-map")}>
                <div className={cx("wrapper", "container")}>
                    <div className={cx("header")}>
                        <h3>{list.title}</h3>
                    </div>
                    <div className={cx("map-content")}>
                        <MapWrapper />
                    </div>
                    <div className={cx("footer")}>
                        <h4>{list.map.caption}</h4>
                        <div className={cx("list-text")}>
                            {list.map.listText.slice(0, 2).map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                        <div className={cx("list")}>
                            <span>{list.map.list.title}</span>
                            {list.map.list.listTitle.map((item, index) => (
                                <span key={index}>{item}</span>
                            ))}
                        </div>
                        <div className={cx("list-text")}>
                            {list.map.listText.slice(2, list.map.listText.length).map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                    </div>
                    <Button label="Оставить заявку" onClick={open} className={cx("button")} />
                </div>
            </div>
            <div className={cx("wrapper-lift-media-us")}>
                <div className={cx("lift-media-us")}>
                    <div className={cx("wrapper", "container")}>
                        <div className={cx("header")}>
                            <h2>Выберите жилой комплекс для детальной информации</h2>
                        </div>

                        <div className={cx("items")}>
                            <div className={cx("item")}>
                                <span>ЖК 1 (Название)</span>
                            </div>
                            <div className={cx("item")}>
                                <span>ЖК 2 (Название)</span>
                            </div>
                            <div className={cx("item")}>
                                <span>ЖК 3 (Название)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("container-lift")}>
                <div className={cx("wrapper", "container")}>
                    <Image className={cx("image")} width={1200} height={423} src={list.img} alt={list.img.src} />

                    <div className={cx("description")}>{list.description}</div>
                </div>
            </div>
            <div className={cx("form")}>
                <FormFeedback />
            </div>
            <ModalFeedBack isOpen={isOpen} onClose={close} />
        </div>
    );
};
