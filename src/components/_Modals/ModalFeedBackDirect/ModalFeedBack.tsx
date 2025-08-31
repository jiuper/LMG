import { useState } from "react";
import axios from "axios";
import cnBind from "classnames/bind";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

import { Modal } from "@/components/_Modals/Modal";
import one from "@/shared/assests/choose/1-1440х1080.jpg";
import two from "@/shared/assests/choose/4-1440х1080.jpg";
import three from "@/shared/assests/choose/5 1920х1080.jpg";
import done from "@/shared/assests/done 1.png";
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
    count?: number | null;
};
const phoneRegExp = /^(\+7|7|8)?[\s\-]?\(?[489]\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
export const ModalFeedBackDirect = ({ isOpen, onClose, count }: Props) => {
    const { isMobile } = useResizeContext();
    const href = useRouter();
    const [step, setStep] = useState(false);
    const utmMap: Record<string, string> = {
        "17234975318": "3za2",
        "17234975321": "3za2",
        "17234975328": "25%",
        "17234975331": "25%",
        "17234975311": "1rub",
        "17234975314": "1rub",
    };
    const match = href.asPath.match(/utm_content=(\d+)/);
    const utmValue = match?.[1];
    const mappedCount = utmValue ? (utmMap[utmValue] ?? null) : null;
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
            await axios.post(`${API_BASE}/mail`, {
                ...values,
                name: `${values.name} страница:${href.pathname} ${mappedCount ? `utm:${mappedCount}` : ""}`,
            });
            formik.resetForm();
            setSubmitting(false);
            setStep(true);
        },
    });
    const listTitle = [
        ["1 месяц", " рекламы на стендах в лифтах жилых домов за ", "1 рубль"],
        ["3 месяца рекламы на стендах в лифтах жилых домов по цене 2-х!"],
        ["25% скидки", " новым клиентам на ", "первый месяц", " размещения на стендах в лифтах жилых домов!"],
    ];

    const listDesc = [
        "- при размещении на 3 календарных месяца\n" +
            "- при подтверждении рекламной кампании ДО 25.09.2025\n" +
            "- на собственную адресную программу РА ЛифтМедиаГрупп в г. Санкт-Петербург",
        "- при подтверждении рекламной кампании ДО 25.09.2025\n" +
            "- на собственную адресную программу РА ЛифтМедиаГрупп в г. Санкт-Петербург",
        "- только для новых клиентов РА ЛифтМедиаГрупп\n" +
            "- при подтверждении рекламной кампании ДО 25.09.2025\n" +
            "- на собственную адресную программу РА ЛифтМедиаГрупп в г. Санкт-Петербург",
    ];

    const listImage = [three, two, one];

    return (
        <Modal className={cx("modal-feedback", { isMobile })} maxWidth="880px" onClose={onClose} isOpen={isOpen}>
            <div className={cx("decor", { isMobile })}>
                <div className={cx("header")}>
                    <span className={cx("title")}>
                        {listTitle[count || 0].map((part, i) =>
                            ["1 месяц", "1 руб.", "25% скидки", "первый месяц"].includes(part) ? (
                                <strong key={i}>{part}</strong>
                            ) : (
                                part
                            ),
                        )}
                    </span>
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
                <div className={cx("content")}>
                    <CustomImage
                        className={cx("image")}
                        width={800}
                        height={350}
                        src={listImage[count || 0]}
                        alt="yandexDirect"
                    />
                    <span className={cx("desc")}>Предложение действует:</span>
                    <div className={cx("list")}>
                        {listDesc[count || 0].split("\n").map((el, i) => (
                            <span key={i}>{el}</span>
                        ))}
                    </div>
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
                                <div
                                    onClick={() => window.open("https://wa.me/89616092843", "_blank")}
                                    className={cx("social-item", "icon")}
                                >
                                    <CustomImage src={wa} alt="wa" />
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
