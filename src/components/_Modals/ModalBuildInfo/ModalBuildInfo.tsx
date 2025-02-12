import cnBind from "classnames/bind";

import { Modal } from "@/components/_Modals/Modal";
import { Button } from "@/shared/ui/_Button";

import styles from "./ModalBuildInfo.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    name?: string;
    list?: { title?: string; value?: string }[];
    onCLose: () => void;
    isOpen: boolean;
    onClick?: () => void;
};
export const ModalBuildInfo = ({ name, list, onCLose, onClick, isOpen }: Props) => {
    return (
        <Modal onClose={onCLose} isOpen={isOpen}>
            <div className={cx("modal")}>
                <div className={cx("modal-wrapper")}>
                    <div className={cx("list")}>
                        <div className={cx("list-item")}>
                            <span className={cx("title-list")}>Название</span>
                            <span className={cx("value-list")}>{name}</span>
                        </div>
                        {list?.map((el, i) => (
                            <div key={i} className={cx("list-item")}>
                                <span className={cx("title-list")}>{el.title}</span>
                                <span className={cx("value-list")}>{el.value}</span>
                            </div>
                        ))}
                        <div className={cx("button-wrapper")}>
                            <Button label="Перейти" onClick={onClick} className={cx("button")} />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
