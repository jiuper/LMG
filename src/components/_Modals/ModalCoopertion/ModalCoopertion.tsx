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
            hasHeader="ПРЕДЛОЖЕНИЕ О СОТРУДНИЧЕСТВЕ (УК И ТСЖ)"
            className={cx("modal-coopertion")}
        >
            <div className={cx("wrapper")}>
                <div className={cx("text")}>
                    <span>Вы являетесь представителем Управляющей компании или ТСЖ многоэтажных жилых домов!?</span>
                    <span>
                        Вы готовы получать дополнительную прибыль от размещения рекламных стендов в лифтовых кабинах?!
                    </span>
                    <span> В таком случае, вы находитесь на правильной странице нашего сайта.</span>
                </div>
                <div className={cx("text")}>
                    <span>Заполните пожалуйста форму ниже - это предварительна заявка на сотрудничество.</span>
                </div>
                <Button className={cx("button")} onClick={open}>
                    Связаться
                </Button>
            </div>
            <ModalFeedBack isOpen={isOpenFeedBack} onClose={close} />
        </Modal>
    );
};
