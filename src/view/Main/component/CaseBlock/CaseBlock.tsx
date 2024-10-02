import cnBind from "classnames/bind";

import card_1 from "@/shared/assests/card_1.png";
import card_2 from "@/shared/assests/card_2.png";
import card_3 from "@/shared/assests/card_3.png";
import card_4 from "@/shared/assests/card_4.png";
import { CaseCard } from "@/view/Main/component/CaseBlock/component";

import styles from "./CaseBlock.module.scss";

const cx = cnBind.bind(styles);

type Props = {};
export const CaseBlock = (props: Props) => {
    const list = [
        {
            title: "Media Group",
            description: "Реклама в ЖК Бережный по улице некрасова масова",
            image: card_1.src,
        },
        {
            title: "Media Group",
            description: "Реклама в ЖК Бережный по улице некрасова масова",
            image: card_2.src,
        },
        {
            title: "Media Group",
            description: "Реклама в ЖК Бережный по улице некрасова масова",
            image: card_3.src,
        },
        {
            title: "Media Group",
            description: "Реклама в ЖК Бережный по улице некрасова масова",
            image: card_4.src,
        },
        {
            title: "Media Group",
            description: "Реклама в ЖК Бережный по улице некрасова масова",
            image: card_4.src,
        },
        {
            title: "Media Group",
            description: "Реклама в ЖК Бережный по улице некрасова масова",
            image: card_4.src,
        },
        {
            title: "Media Group",
            description: "Реклама в ЖК Бережный по улице некрасова масова",
            image: card_4.src,
        },
    ];

    return (
        <div className={cx("case-block")}>
            <div className={cx("wrapper", "container")}>
                <h2>Портфолио</h2>
                <div className={cx("cards")}>
                    {list.map((el, index) => (
                        <CaseCard key={index} {...el} />
                    ))}
                </div>
            </div>
        </div>
    );
};
