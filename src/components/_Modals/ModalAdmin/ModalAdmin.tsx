import cnBind from "classnames/bind";

import { Modal } from "@/components/_Modals/Modal";

import styles from "./ModalAdmin.module.scss";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const cx = cnBind.bind(styles);

const ModalAdmin = ({ isOpen, onClose }: Props) => {
    return (
        <Modal className={cx("modal-admin")} maxWidth="880px" onClose={onClose} isOpen={isOpen}>
            <div className={cx("modal-admin__wrapper")}>
                <div className={cx("modal-top")}>
                    <span className={cx("modal-top__title")}>Добавить новую новость</span>
                    <button className={cx("modal-top__btn")} type="button">
                        <span>Просмотр</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export { ModalAdmin };
