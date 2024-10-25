import { useEffect, useState } from "react";
import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { EyeIcon, TimeIcon } from "@/shared/assests/svg/svg";
import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./Articel.module.scss";

type Props = {
    date?: {
        id: number;
        title: string;
        subtitle: string;
        date?: string;
        time?: string;
        body?: {
            img?: string[];
            text?: string[];
            list?: {
                title: string;
                list: string[];
            }[];
            video?: string;
        };
    };
    list?: { title: string; id: string }[];
};

const cx = cnBind.bind(styles);

export const Articel = ({ date, list }: Props) => {
    const [views, setViews] = useState<number>(0);
    const href = useRouter();

    useEffect(() => {
        const currentViews = localStorage.getItem("pageViews");
        const newViews = currentViews ? parseInt(currentViews, 10) + 1 : 1;
        localStorage.setItem("pageViews", newViews.toString());
        setViews(newViews);
    }, []);

    const listTest = {
        id: 1,
        title: "Реклама для ПВЗ:",
        subtitle: "Увеличьте Присутствие Вашего Бренда в Местах Доставки Заказов",
        date: "25 августа",
        time: "5 мин.",
        body: {
            img: ["", ""],
            text: [
                "Наша компания предлагает эффективные решения для размещения рекламы в Пунктах Выдачи Заказов (ПВЗ). Это уникальная возможность не только привлечь внимание целевой аудитории, но и превратить ПВЗ в мощный маркетинговый инструмент для вашего бизнеса.",
                "Увеличьте свою узнаваемость и привлеките новых клиентов с помощью рекламы в ПВЗ! Свяжитесь с нами сегодня, чтобы обсудить детали и запустить успешную рекламную кампанию",
            ],
            list: [
                {
                    title: "Почему реклама в ПВЗ работает?",
                    list: [
                        "Высокий охват. ПВЗ ежедневно посещают десятки, а иногда и сотни людей, что делает их идеальной площадкой для размещения рекламы вашего бренда или продукта.",
                        "Таргетинг по местоположению. ПВЗ обычно располагаются в оживленных районах с хорошей проходимостью, что дает вам доступ к локальной аудитории.",
                        "Эффективность для интернет-магазинов и локальных бизнесов. Если ваш бизнес связан с электронной коммерцией или вы предлагаете локальные услуги, реклама в ПВЗ поможет вам непосредственно взаимодействовать с потенциальными клиентами.",
                    ],
                },
                {
                    title: "Наши услуги",
                    list: [
                        "Мы предлагаем полный спектр рекламных решений:",
                        "Размещение баннеров и постеров в зонах ожидания.",
                        "Рекламные стойки и POS-материалы.",
                        "Digital-реклама через экраны в ПВЗ.",
                    ],
                },
                {
                    title: "Преимущества работы с нами",
                    list: [
                        "Анализ и подбор лучших локаций. Мы поможем вам выбрать наиболее эффективные ПВЗ для размещения рекламы в зависимости от вашей целевой аудитории.",
                        "Создание креативных решений. Наша команда дизайнеров и маркетологов создаст привлекательные материалы, которые точно запомнятся вашим клиентам.",
                        "Мониторинг и отчетность. Мы предоставляем полные отчеты о результатах рекламных кампаний, чтобы вы могли отслеживать эффективность.",
                    ],
                },
            ],
            video: "",
        },
    };

    return (
        <div className={cx("articel")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("card")}>
                    <div className={cx("header")}>
                        <div className={cx("title")}>
                            <h2>{listTest.title}</h2>
                            <span>{listTest.subtitle}</span>
                        </div>
                        <div className={cx("info")}>
                            <div className={cx("date")}>
                                <span>{listTest.date}</span>
                                <div className={cx("icon-wrapper")}>
                                    <EyeIcon />
                                    <span>{views}</span>
                                </div>
                                <div className={cx("icon-wrapper")}>
                                    <TimeIcon />
                                    <span>{listTest.time}</span>
                                </div>
                            </div>
                            <div className={cx("buttons")}>
                                <Button label="Поделиться" className={cx("button")} />
                                <Button label="Заказать звонок" className={cx("button")} />
                            </div>
                        </div>
                    </div>
                    <div className={cx("body")}>
                        <div className={cx("text")}>
                            <CustomImage
                                className={cx("image")}
                                width={1136}
                                height={423}
                                src={listTest.body.img[0]}
                                alt="img"
                            />
                            {listTest.body.text[0] && <span>{listTest.body.text[0]}</span>}
                        </div>

                        <div className={cx("list-wrapper")}>
                            {listTest.body.list.map((item, index) => (
                                <div key={index} className={cx("list")}>
                                    <h4 className={cx("title")}>{item.title}</h4>
                                    <div className={cx("list-text")}>
                                        {item.list.map((item, idx) => (
                                            <span key={idx}>{item}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {listTest.body.text[1] && <span>{listTest.body.text[1]}</span>}
                        <div className={cx("media")}>
                            {listTest.body.video ? (
                                <video className={cx("image")} src={listTest.body.video} />
                            ) : (
                                <CustomImage
                                    className={cx("image")}
                                    width={1136}
                                    height={423}
                                    src={listTest.body.img[1]}
                                    alt="img"
                                />
                            )}
                        </div>
                    </div>
                </div>
                {list ? (
                    <div className={cx("aside")}>
                        <h4 className={cx("title")}>Читайте также</h4>
                        <div className={cx("list")}>
                            {list.map((el, i) => (
                                <div onClick={() => href.push(`/articles/${el.id}`)} className={cx("item")} key={i}>
                                    {el.title}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>

            <div className={cx("form")}>
                <FormFeedback />
            </div>
        </div>
    );
};
