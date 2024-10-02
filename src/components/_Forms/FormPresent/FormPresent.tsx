import cnBind from "classnames/bind";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

import PRESENTFORM from "@/shared/assests/present-form.png";
import { API_BASE } from "@/shared/constants/private";
import { Routes } from "@/shared/constants/Routing";
import { UIInputText } from "@/shared/ui/_InputText/InputText";
import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./FormPresent.module.scss";

const cx = cnBind.bind(styles);

export const FormPresent = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
        },
        onSubmit: async (values) => {
            await fetch(`${API_BASE}/mail`, {
                method: "post",
                body: JSON.stringify(values),
            }).then((res) => res.ok);
            formik.resetForm();
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            phone: Yup.string(),
        }),
    });

    return (
        <div className={cx("form-present")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("form-content")}>
                    <h2>1 час в подарок на аренду студии</h2>
                    <div className={cx("description")}>
                        <div className={cx("description-text")}>
                            Заполните форму и получите{" "}
                            <Link className={cx("link")} href="/">
                                1 час в подарок
                            </Link>
                        </div>
                        <span>Мы свяжемся с Вами в течении 10 мин!</span>
                    </div>
                    <form onSubmit={formik.handleSubmit} className={cx("form")}>
                        <div className={cx("inputs")}>
                            <UIInputText
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                name="name"
                                type="text"
                                label="Ваше имя"
                                isFullWidth
                                color="grey"
                            />
                            <UIInputText
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                type="text"
                                name="phone"
                                label="Номер телефона"
                                isFullWidth
                                color="grey"
                            />
                        </div>
                        <div className={cx("buttons")}>
                            <div className={cx("privacy")}>
                                <i>*</i>Нажимая на кнопку вы соглашаетесь с{" "}
                                <Link className={cx("link")} href={Routes.POLICY}>
                                    Политикой конфиденциальности
                                </Link>
                            </div>
                            <Button mode="orange" type="submit" label="Получить подарок" iconButton />
                        </div>
                    </form>
                </div>
                <div className={cx("form-image")}>
                    <CustomImage className={cx("image")} src={PRESENTFORM} alt="present-form" />
                </div>
            </div>
        </div>
    );
};
