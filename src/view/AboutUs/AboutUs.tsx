import cnBind from "classnames/bind";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { HistoryBlock } from "@/view/Main/component/HistoryBlock";

import styles from "./AboutUs.module.scss";

const cx = cnBind.bind(styles);
export const AboutUsPage = () => {
    return (
        <div className={cx("about-us")}>
            <div className={cx("wrapper", "container")}>
                <HistoryBlock className={cx("history-block-about")} />
            </div>
            <div className={cx("form")}>
                <FormFeedback />
            </div>
        </div>
    );
};
