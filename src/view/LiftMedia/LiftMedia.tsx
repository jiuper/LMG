import cnBind from "classnames/bind";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import { MapWrapper } from "@/components/Map";
import type { GetPortfolioDto } from "@/entities/types/entities";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";
import { CaseBlock } from "@/view/Main/component/CaseBlock";

import styles from "./LiftMedia.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    port: GetPortfolioDto[];
};
export const LiftMedia = ({ port }: Props) => {
    const [isOpen, open, close] = useBooleanState(false);

    return (
        <div className={cx("lift-media")}>
            <div className={cx("main-block")}>
                <div className={cx("wrapper", "container")}>
                    <div className={cx("content")}>
                        <h1>Реклама лифтах</h1>
                        <span>Эффективная реклама в лифтах по всему Санкт-Петербургу и области</span>
                        <Button className={cx("button-main")} mode="empty" onClick={open} label="Заказать звонок" />
                    </div>
                </div>
                <ModalFeedBack isOpen={isOpen} onClose={close} />
            </div>
            <div className={cx("wrapper-map")}>
                <div className={cx("wrapper", "container")}>
                    <div className={cx("header")}>
                        <h3>Доступные районы</h3>
                    </div>
                    <div className={cx("map-content")}>
                        <MapWrapper />
                    </div>
                </div>
            </div>
            <div className={cx("wrapper-lift-media-us")}>
                <div className={cx("lift-media-us")}>
                    <div className={cx("wrapper", "container")}>
                        <div className={cx("header")}>
                            <h2>Преимущества рекламы в лифтах</h2>
                        </div>

                        <div className={cx("items")}>
                            <div className={cx("item")}>
                                <h3>
                                    <strong>Высокая заметность</strong>
                                </h3>
                                <span>Ваша реклама всегда на виду у целевой аудитории</span>
                            </div>
                            <div className={cx("item")}>
                                <h3>
                                    <strong>Точное таргетирование</strong>
                                </h3>
                                <span>Выбирайте конкретные районы и дома для вашей рекламы</span>
                            </div>
                            <div className={cx("item")}>
                                <h3>
                                    <strong>Доступные цены</strong>
                                </h3>
                                <span>Эффективная реклама по разумной стоимости</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("wrapper-video")}>
                <h2>Как это работает</h2>
                <video className={cx("video")} width="800" height="450" controls preload="none">
                    <source src="/liftmg.webm" type="video/webm" />
                </video>
            </div>
            <div className={cx("loyalty-program")}>
                <div className={cx("wrapper", "container")}>
                    <div className={cx("header")}>
                        <h3>Как это работает</h3>
                    </div>
                    <div className={cx("content-loyalty")}>
                        <div className={cx("list")}>
                            <div className={cx("item")}>
                                <div className={cx("number")}>1</div>
                                <span className={cx("title")}>Выберите районы</span>
                            </div>
                            <svg
                                className={cx("arrow")}
                                xmlns="http://www.w3.org/2000/svg"
                                width="88"
                                height="15"
                                viewBox="0 0 88 15"
                                fill="none"
                            >
                                <path
                                    d="M1 6.54297C0.447715 6.54297 0 6.99068 0 7.54297C0 8.09525 0.447715 8.54297 1 8.54297V6.54297ZM87.0404 8.25008C87.431 7.85955 87.431 7.22639 87.0404 6.83586L80.6765 0.471901C80.286 0.0813766 79.6528 0.0813766 79.2623 0.471901C78.8717 0.862425 78.8717 1.49559 79.2623 1.88611L84.9191 7.54297L79.2623 13.1998C78.8717 13.5903 78.8717 14.2235 79.2623 14.614C79.6528 15.0046 80.286 15.0046 80.6765 14.614L87.0404 8.25008ZM1 8.54297H6.33333V6.54297H1V8.54297ZM17 8.54297H27.6667V6.54297H17V8.54297ZM38.3333 8.54297H49V6.54297H38.3333V8.54297ZM59.6667 8.54297H70.3333V6.54297H59.6667V8.54297ZM81 8.54297H86.3333V6.54297H81V8.54297Z"
                                    fill="#FBFBFB"
                                />
                            </svg>
                            <div className={cx("item")}>
                                <div className={cx("number")}>2</div>
                                <span className={cx("title")}>Создайте макет</span>
                            </div>
                            <svg
                                className={cx("arrow")}
                                xmlns="http://www.w3.org/2000/svg"
                                width="88"
                                height="15"
                                viewBox="0 0 88 15"
                                fill="none"
                            >
                                <path
                                    d="M1 6.54297C0.447715 6.54297 0 6.99068 0 7.54297C0 8.09525 0.447715 8.54297 1 8.54297V6.54297ZM87.0404 8.25008C87.431 7.85955 87.431 7.22639 87.0404 6.83586L80.6765 0.471901C80.286 0.0813766 79.6528 0.0813766 79.2623 0.471901C78.8717 0.862425 78.8717 1.49559 79.2623 1.88611L84.9191 7.54297L79.2623 13.1998C78.8717 13.5903 78.8717 14.2235 79.2623 14.614C79.6528 15.0046 80.286 15.0046 80.6765 14.614L87.0404 8.25008ZM1 8.54297H6.33333V6.54297H1V8.54297ZM17 8.54297H27.6667V6.54297H17V8.54297ZM38.3333 8.54297H49V6.54297H38.3333V8.54297ZM59.6667 8.54297H70.3333V6.54297H59.6667V8.54297ZM81 8.54297H86.3333V6.54297H81V8.54297Z"
                                    fill="#FBFBFB"
                                />
                            </svg>
                            <div className={cx("item")}>
                                <div className={cx("number")}>3</div>
                                <span className={cx("title")}>Оплатите заказ</span>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="88"
                                height="15"
                                viewBox="0 0 88 15"
                                fill="none"
                                className={cx("arrow")}
                            >
                                <path
                                    d="M1 6.54297C0.447715 6.54297 0 6.99068 0 7.54297C0 8.09525 0.447715 8.54297 1 8.54297V6.54297ZM87.0404 8.25008C87.431 7.85955 87.431 7.22639 87.0404 6.83586L80.6765 0.471901C80.286 0.0813766 79.6528 0.0813766 79.2623 0.471901C78.8717 0.862425 78.8717 1.49559 79.2623 1.88611L84.9191 7.54297L79.2623 13.1998C78.8717 13.5903 78.8717 14.2235 79.2623 14.614C79.6528 15.0046 80.286 15.0046 80.6765 14.614L87.0404 8.25008ZM1 8.54297H6.33333V6.54297H1V8.54297ZM17 8.54297H27.6667V6.54297H17V8.54297ZM38.3333 8.54297H49V6.54297H38.3333V8.54297ZM59.6667 8.54297H70.3333V6.54297H59.6667V8.54297ZM81 8.54297H86.3333V6.54297H81V8.54297Z"
                                    fill="#FBFBFB"
                                />
                            </svg>
                            <div className={cx("item")}>
                                <div className={cx("number")}>4</div>
                                <span className={cx("title")}>Получайте клиентов</span>
                            </div>
                        </div>
                        <Button className={cx("button")} label="Получить клиентов" onClick={open} />
                    </div>
                </div>
            </div>

            <div className={cx("portfolio")}>
                <CaseBlock
                    className={cx("case-block")}
                    listItem={port.filter((el) => el.categoryName === "Лифты").slice(-4)}
                />
            </div>
            <div className={cx("form")}>
                <FormFeedback />
            </div>
        </div>
    );
};
