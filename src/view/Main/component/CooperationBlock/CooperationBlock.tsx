import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import { ModalCoopertion } from "@/components/_Modals/ModalCoopertion";
import card_1 from "@/shared/assests/ImageS_3.png";
import card_2 from "@/shared/assests/ImageS_4.png";
import { useBooleanState } from "@/shared/hooks";
import { HistoryCard } from "@/view/Main/component/HistoryBlock/component/HistoryCard";

import styles from "./CooperationBlock.module.scss";

const cx = cnBind.bind(styles);
export const CooperationBlock = () => {
    const href = useRouter();
    const [isOpen, open, close] = useBooleanState(false);
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
        <div id="cooperation" className={cx("cooperation-block")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("top")}>
                    <h2 className={cx("title")}>Сотрудничество</h2>
                    <div className={cx("cards")}>
                        {list.map((item, index) => (
                            <HistoryCard
                                onClick={index === 1 ? () => href.push("https://spb.hh.ru/employer/1394775") : open}
                                key={index}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <ModalCoopertion onClose={close} isOpen={isOpen} />
        </div>
    );
};
