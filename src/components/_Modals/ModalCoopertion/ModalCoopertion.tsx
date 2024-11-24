import cnBind from "classnames/bind";

import { Modal } from "@/components/_Modals/Modal";
import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";

import styles from "./ModalCoopertion.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    isOpen: boolean;
    onClose: () => void;
};
export const ModalCoopertion = ({ isOpen, onClose }: Props) => {
    const [isOpenFeedBack, open, close] = useBooleanState(false);

    return (
        <Modal
            maxWidth="880px"
            isOpen={isOpen}
            onClose={onClose}
            hasHeader="Сотрудничество"
            className={cx("modal-coopertion")}
        >
            <div className={cx("wrapper")}>
                <div className={cx("title")}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, id.
                </div>
                <div className={cx("text")}>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, id.</span>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, id.</span>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, id.</span>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, id.</span>
                </div>
                <Button className={cx("button")} onClick={open}>
                    Связаться
                </Button>
            </div>
            <ModalFeedBack isOpen={isOpenFeedBack} onClose={close} />
        </Modal>
    );
};
