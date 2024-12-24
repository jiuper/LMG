import { useState } from "react";
import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import { ModalFaq } from "@/components/_Modals/ModalFaq";
import type { CreateNewsDto } from "@/entities/types/entities";
import card_3 from "@/shared/assests/ImageP_3.png";
import card_4 from "@/shared/assests/ImageP_4.png";
import card_5 from "@/shared/assests/ImageP_5.png";
import { ArrowDownBigIcon } from "@/shared/assests/svg/svg";
import { Routes } from "@/shared/constants";
import { useBooleanState } from "@/shared/hooks";
import { listQuestions } from "@/view/Main/component/HelperBlock/const";
import { HistoryCard } from "@/view/Main/component/HistoryBlock/component/HistoryCard";

import styles from "./HelperBlock.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    articles?: CreateNewsDto[];
    news?: CreateNewsDto[];
};
export const HelperBlock = ({ news, articles }: Props) => {
    const href = useRouter();
    const list = [
        {
            title: "Статьи",
            listHref: articles?.slice(-3).map(({ title, id }) => ({ title: title || "", href: `/articles/${id}` })),
            image: card_3.src,
        },
        {
            title: "Новости",
            image: card_4.src,
            listHref: news?.slice(-3).map(({ title, id }) => ({ title: title || "", href: `/news/${id}` })),
        },
        {
            title: "Закон о рекламе",
            image: card_5.src,
            description:
                "Закон о рекламе в РФ регулирует рекламную деятельность, определяет допустимые формы рекламы и устанавливает ограничения для обеспечения защиты прав граждан и организаций...",
        },
    ];
    const [isOpen, open, close] = useBooleanState(false);
    const [idx, setIdx] = useState(0);
    const openModal = (i: number) => {
        open();
        setIdx(i);
    };

    return (
        <div className={cx("helper-block")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("top")}>
                    <h2 className={cx("title")}>Полезное</h2>
                    <div className={cx("cards")}>
                        {list.map((item, index) => (
                            <HistoryCard
                                onClick={
                                    index === 0
                                        ? () => href.push(Routes.ARTICLES)
                                        : index === 1
                                          ? () => href.push(Routes.NEWS)
                                          : () => href.push(`${Routes.ARTICLES}/9asd23crecsw123`)
                                }
                                key={index}
                                className={cx("card")}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
                <div className={cx("bottom")}>
                    <h2 className={cx("title")}>Ответы на самые частые вопросы</h2>
                    <div className={cx("cards")}>
                        {listQuestions.map((item, index) => (
                            <div className={cx("card")} key={index}>
                                <span>{item.title}</span>
                                <div onClick={() => openModal(index)} className={cx("icon-wrapper")}>
                                    <ArrowDownBigIcon className={cx("icon")} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ModalFaq index={idx} isOpen={isOpen} onClose={close} />
        </div>
    );
};
