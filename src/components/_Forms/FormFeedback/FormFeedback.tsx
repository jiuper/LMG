import { useState } from "react";
import axios from "axios";
import cnBind from "classnames/bind";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

import done from "@/shared/assests/done 1.png";
import wa from "@/shared/assests/whatsapp.png";
import { API_BASE } from "@/shared/constants/private";
import { InputText } from "@/shared/ui/_InputText";
import { Button } from "@/shared/ui/Button";
import { CheckBox } from "@/shared/ui/CheckBox";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./FormFeedback.module.scss";

const cx = cnBind.bind(styles);

const phoneRegExp = /^(\+7|7|8)?[\s\-]?\(?[489]\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;

export const FormFeedback = () => {
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
        <div className={cx("container", "wrapper")}>
            <div className={cx("decor")}>
                <div className={cx("header")}>
                    <h2 className={cx("title")}>{!step ? "Остались вопросы?" : "Заявка отправлена"}</h2>
                    {!step && <span className={cx("text")}>Оставьте заявку и мы свяжемся с вами</span>}
                </div>
                <form className={cx("form", { step })} onSubmit={formik.handleSubmit}>
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
                                <div
                                    onClick={() => window.open("https://wa.me/89616092843", "_blank")}
                                    className={cx("social-item", "icon")}
                                >
                                    <CustomImage src={wa} alt="WhatsApp" />
                                </div>
                            </div>
                        </div>
                    )}
                </form>
                {step && <Button className={cx("button")} label="Назад" onClick={() => setStep(false)} />}
            </div>
        </div>
    );
};
