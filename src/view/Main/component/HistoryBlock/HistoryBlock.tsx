import cnBind from "classnames/bind";

import card_1 from "@/shared/assests/history_1.png";
import card_2 from "@/shared/assests/history_2.png";
import card_3 from "@/shared/assests/history_3.png";
import { HistoryCard } from "@/view/Main/component/HistoryBlock/component/HistoryCard";

import styles from "./HistoryBlock.module.scss";

const cx = cnBind.bind(styles);
export const HistoryBlock = () => {
    const list = [
        { title: "История компании", description: "Описание кейса...", image: card_1.src },
        {
            title: "Доркументы",
            image: card_2.src,
            listHref: [
                { title: "Документ 1", href: "/" },
                { title: "Документ 2", href: "/" },
                { title: "Документ 3", href: "/" },
            ],
        },
    ];

    return (
        <div className={cx("history-block")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("cards")}>
                    <div className={cx("cards-wrapper")}>
                        {list.map((item, index) => (
                            <HistoryCard key={index} {...item} />
                        ))}
                    </div>
                    <HistoryCard title="Наша команда" image={card_3.src} />
                </div>
            </div>
        </div>
    );
};
