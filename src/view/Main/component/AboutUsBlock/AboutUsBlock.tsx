import cnBind from "classnames/bind";

import styles from "./AboutUsBlock.module.scss";

const cx = cnBind.bind(styles);
export const AboutUsBlock = () => {
    return (
        <div className={cx("about-us")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("header")}>
                    <h2>Эффективный клиентский сервис наш приоритет </h2>
                </div>

                <div className={cx("items")}>
                    <div className={cx("item")}>
                        <span>15 лет</span>
                        <span>опыт работы в рекламном бизнесе</span>
                    </div>
                    <div className={cx("item")}>
                        <span>25 человек</span>
                        <span>штат сотрудников на 2024 г.</span>
                    </div>
                    <div className={cx("item")}>
                        <span>Договор с УК, и застройщика</span>
                        <span>основание для разрешения рекламы</span>
                    </div>
                    <div className={cx("item")}>
                        <span>Лояльные</span>
                        <span>условия партнерства</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
