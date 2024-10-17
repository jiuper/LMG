import cnBind from "classnames/bind";

import card_1 from "@/shared/assests/ImageS_3.png";
import card_2 from "@/shared/assests/ImageS_4.png";
import { HistoryCard } from "@/view/Main/component/HistoryBlock/component/HistoryCard";

import styles from "./CooperationBlock.module.scss";

const cx = cnBind.bind(styles);
export const CooperationBlock = () => {
    const list = [
        {
            title: "ТСЖ. Управляющие компании",
            image: card_1.src,
        },
        {
            title: "Вакансии",
            image: card_2.src,
        },
    ];

    return (
        <div className={cx("cooperation-block")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("top")}>
                    <h2 className={cx("title")}>Сотрудничество</h2>
                    <div className={cx("cards")}>
                        {list.map((item, index) => (
                            <HistoryCard key={index} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
