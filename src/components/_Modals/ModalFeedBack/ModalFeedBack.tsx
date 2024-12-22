import { useState } from "react";
import axios from "axios";
import cnBind from "classnames/bind";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

import { Modal } from "@/components/_Modals/Modal";
import done from "@/shared/assests/done 1.png";
import tg from "@/shared/assests/telegram.png";
import wa from "@/shared/assests/whatsapp.png";
import { API_BASE } from "@/shared/constants/private";
import { useResizeContext } from "@/shared/context/WindowResizeProvider";
import { InputText } from "@/shared/ui/_InputText";
import { Button } from "@/shared/ui/Button";
import { CheckBox } from "@/shared/ui/CheckBox";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./ModalFeedBack.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    isOpen: boolean;
    onClose: () => void;
};
const phoneRegExp = /^(\+7|7|8)?[\s\-]?\(?[489]\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
export const ModalFeedBack = ({ isOpen, onClose }: Props) => {
    const { isMobile } = useResizeContext();
    const router = useRouter();
    const [step, setStep] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required("Имя обязательно"),
        phone: Yup.string()
            .matches(phoneRegExp, "Введите корректный номер телефона")
            .required("Номер телефона обязателен"),
        policy: Yup.boolean().oneOf([true], "Необходимо согласие на обработку персональных данных"),
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            policy: false,
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await axios.post(`${API_BASE}/mail`, values);
            formik.resetForm();
            setSubmitting(false);
            setStep(true);
        },
    });

    return (
        <Modal className={cx("modal-feedback", { isMobile })} maxWidth="880px" onClose={onClose} isOpen={isOpen}>
            <div className={cx("decor", { isMobile })}>
                <div className={cx("header")}>
                    <h2 className={cx("title")}>
                        {!step ? "Размещение рекламы и привлечение клиентов" : "Заявка отправлена"}
                    </h2>
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
                <form className={cx("form", { step })} onSubmit={formik.handleSubmit}>
                    {!step && <h2>Оставьте заявку</h2>}
                    <div className={cx("form-content", { step })}>
                        {!step ? (
                            <>
                                <div className={cx("inputs")}>
                                    <InputText
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        name="name"
                                        label="Имя"
                                        onBlur={formik.handleBlur}
                                        error={formik.errors.name}
                                        isFullWidth
                                    />

                                    <InputText
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        name="phone"
                                        label="Номер телефона*"
                                        onBlur={formik.handleBlur}
                                        error={formik.errors.phone}
                                        isFullWidth
                                    />
                                </div>
                                <Button
                                    disabled={!formik.values.policy || formik.isSubmitting}
                                    className={cx("button")}
                                    label="Отправить заявку"
                                    type="submit"
                                />
                            </>
                        ) : (
                            <>
                                <div className={cx("social-item", "icon")}>
                                    <CustomImage src={done} alt="done" />
                                </div>
                                <span>
                                    Мы свяжемся с вами в кратчайшее время и ответим на все интересующие вас вопросы
                                </span>
                            </>
                        )}
                    </div>

                    {!step && (
                        <div className={cx("footer")}>
                            <CheckBox
                                checked={formik.values.policy}
                                onChange={formik.handleChange}
                                name="policy"
                                title="Согласен(а) на обработку "
                                link="персональных данных"
                                url="/politika-konfidentsialnosti"
                            />
                            <div className={cx("social")}>
                                <div onClick={() => router.push("/")} className={cx("social-item", "icon")}>
                                    <CustomImage src={tg} alt="tg" />
                                </div>
                                <div onClick={() => router.push("/")} className={cx("social-item", "icon")}>
                                    <CustomImage src={wa} alt="tg" />
                                </div>
                            </div>
                        </div>
                    )}
                </form>
                {step && (
                    <Button
                        className={cx("button")}
                        label="Назад"
                        onClick={() => {
                            setStep(false);
                            onClose();
                        }}
                    />
                )}
            </div>
        </Modal>
    );
};
