import cnBind from "classnames/bind";

import { ArrowDownBigIcon } from "@/shared/assests/svg/svg";
import { list, listQuestions } from "@/view/Main/component/HelperBlock/const";
import { HistoryCard } from "@/view/Main/component/HistoryBlock/component/HistoryCard";

import styles from "./HelperBlock.module.scss";

const cx = cnBind.bind(styles);

export const HelperBlock = () => {
    return (
        <div className={cx("helper-block")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("top")}>
                    <h2 className={cx("title")}>Полезное</h2>
                    <div className={cx("cards")}>
                        {list.map((item, index) => (
                            <HistoryCard key={index} {...item} />
                        ))}
                    </div>
                </div>
                <div className={cx("bottom")}>
                    <h2 className={cx("title")}>Ответы на самые частые вопросы</h2>
                    <div className={cx("cards")}>
                        {listQuestions.map((item, index) => (
                            <div className={cx("card")} key={index}>
                                <span>{item}</span>
                                <div className={cx("icon-wrapper")}>
                                    <ArrowDownBigIcon className={cx("icon")} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
