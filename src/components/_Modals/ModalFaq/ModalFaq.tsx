import cnBind from "classnames/bind";

import { Modal } from "@/components/_Modals/Modal";
import { listQuestions } from "@/view/Main/component/HelperBlock/const";

import styles from "./ModalFaq.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    isOpen: boolean;
    onClose: () => void;
    index: number;
};
export const ModalFaq = ({ isOpen, onClose, index }: Props) => {
    return (
        <Modal
            maxWidth="880px"
            isOpen={isOpen}
            onClose={onClose}
            hasHeader={listQuestions[index].title}
            className={cx("modal-faq")}
        >
            <div className={cx("wrapper")}>
                <div className={cx("text")}>
                    <span>{listQuestions[index].desc}</span>
                </div>
            </div>
        </Modal>
    );
};
