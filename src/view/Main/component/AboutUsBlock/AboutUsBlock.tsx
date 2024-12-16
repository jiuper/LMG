import cnBind from "classnames/bind";

import styles from "./AboutUsBlock.module.scss";

const cx = cnBind.bind(styles);
export const AboutUsBlock = () => {
    return (
        <div className={cx("about-us")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("header")}>
                    <h2>Эффективный клиентский сервис - наш приоритет </h2>
                </div>

                <div className={cx("items")}>
                    <div className={cx("item")}>
                        <h3>
                            <strong>15 лет</strong>
                        </h3>
                        <span>опыт работы в рекламном бизнесе</span>
                    </div>
                    <div className={cx("item")}>
                        <h3>
                            <strong>25 человек</strong>
                        </h3>
                        <span>штат сотрудников на 2024 г.</span>
                    </div>
                    <div className={cx("item")}>
                        <h3>
                            <strong>Договоры с УК и Застройщиками</strong>
                        </h3>
                        <span>основание для разрешения рекламы</span>
                    </div>
                    <div className={cx("item")}>
                        <h3>
                            <strong>Лояльные</strong>
                        </h3>
                        <span>условия партнерства</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
