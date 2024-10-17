import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Modal } from "@/components/_Modals/Modal";
import { Button } from "@/shared/ui/Button";
import { CheckBox } from "@/shared/ui/CheckBox";
import { TextField } from "@/shared/ui/TextField";

import styles from "./ModalFeedBack.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    isOpen: boolean;
    onClose: () => void;
};
export const ModalFeedBack = ({ isOpen, onClose }: Props) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            policy: false,
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Modal className={cx("modal-feedback")} maxWidth="880px" onClose={onClose} isOpen={isOpen}>
            <div className={cx("decor")}>
                <div className={cx("header")}>
                    <h2 className={cx("title")}>Размещение рекламы и привлечение клиентов</h2>
                    <svg
                        onClick={onClose}
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={cx("close")}
                    >
                        <rect width="40" height="40" rx="20" fill="#F7F7FF" />
                        <path
                            d="M26.3002 13.7107C25.9102 13.3207 25.2802 13.3207 24.8902 13.7107L20.0002 18.5907L15.1102 13.7007C14.7202 13.3107 14.0902 13.3107 13.7002 13.7007C13.3102 14.0907 13.3102 14.7207 13.7002 15.1107L18.5902 20.0007L13.7002 24.8907C13.3102 25.2807 13.3102 25.9107 13.7002 26.3007C14.0902 26.6907 14.7202 26.6907 15.1102 26.3007L20.0002 21.4107L24.8902 26.3007C25.2802 26.6907 25.9102 26.6907 26.3002 26.3007C26.6902 25.9107 26.6902 25.2807 26.3002 24.8907L21.4102 20.0007L26.3002 15.1107C26.6802 14.7307 26.6802 14.0907 26.3002 13.7107Z"
                            fill="#040F16"
                        />
                    </svg>
                </div>
                <form className={cx("form")} onSubmit={formik.handleSubmit}>
                    <h2>Оставьте заявку</h2>
                    <div className={cx("form-content")}>
                        <div className={cx("inputs")}>
                            <TextField
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                name="name"
                                placeholder="Имя"
                                mode="light"
                            />
                            <TextField
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                name="phone"
                                placeholder="Номер телефона*"
                                mode="light"
                            />
                        </div>

                        <Button label="Отправить заявку" type="submit" />
                    </div>

                    <CheckBox
                        checked={formik.values.policy}
                        onChange={formik.handleChange}
                        name="policy"
                        title="Согласен(а) на обработку персональных данных"
                    />
                </form>
            </div>
        </Modal>
    );
};
