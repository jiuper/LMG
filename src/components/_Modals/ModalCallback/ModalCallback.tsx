import cnBind from "classnames/bind";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

import { API_BASE } from "@/shared/constants/private";
import { Routes } from "@/shared/constants/Routing";
import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";
import { TextField } from "@/shared/ui/TextField";

import styles from "./ModalCallback.module.scss";

const cx = cnBind.bind(styles);
type ModalCallbackProps = {
    onClose: () => void;
    isOpen: boolean;
    title?: string;
    caption?: string;
};
export const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const ModalCallback = ({ onClose, isOpen, title = "Обратный звонок", caption }: ModalCallbackProps) => {
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
            onClose();
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            phone: Yup.string().matches(phoneRegExp, "Неверный формат номера").required("Обязательное поле"),
        }),
    });

    return (
        <Modal maxWidth="421px" className={cx("modal")} isOpen={isOpen} hasHeader={title} onClose={onClose}>
            <form onSubmit={formik.handleSubmit} className={cx("wrapper")}>
                <div className={cx("title")}>
                    <span>Заполните форму и мы свяжемся с вами</span>
                </div>
                <div className={cx("title")}>{caption}</div>
                <div className={cx("form")}>
                    <TextField
                        value={formik.values.name}
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        placeholder="Ваше имя"
                        mode="light"
                        error={!!(formik.errors.name && formik.touched.name)}
                    />
                    <TextField
                        mode="light"
                        value={formik.values.phone}
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        placeholder="7 (___) ___ ____"
                        error={!!(formik.errors.phone && formik.touched.phone)}
                    />
                </div>
                <div className={cx("footer")}>
                    <div className={cx("privacy")}>
                        <i>*</i>Нажимая на кнопку вы соглашаетесь с{" "}
                        <Link className={cx("link")} href={Routes.POLICY}>
                            Политикой конфиденциальности
                        </Link>
                    </div>
                    <Button mode="outlined" type="submit" label="Отправить" />
                </div>
            </form>
        </Modal>
    );
};
