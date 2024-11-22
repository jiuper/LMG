import cnBind from "classnames/bind";

import { Modal } from "@/components/_Modals/Modal";

import styles from "./ModalFaq.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    isOpen: boolean;
    onClose: () => void;
};
export const ModalFaq = ({ isOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className={cx("modal")}>
            <div className={cx("content")}>asd</div>
        </Modal>
    );
};
