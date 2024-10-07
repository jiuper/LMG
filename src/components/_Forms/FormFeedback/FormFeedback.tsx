import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Button } from "@/shared/ui/Button";
import { CheckBox } from "@/shared/ui/CheckBox";
import { TextField } from "@/shared/ui/TextField";

import styles from "./FormFeedback.module.scss";

const cx = cnBind.bind(styles);
type Props = {};
export const FormFeedback = (props: Props) => {
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
        <div className={cx("form")}>
            <div className={cx("header")}>
                <h2 className={cx("title")}>Остались вопросы?</h2>
                <span className={cx("text")}>Оставьте заявку и мы свяжемся с вами</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <TextField value={formik.values.name} onChange={formik.handleChange} name="name" placeholder="Имя" />
                <TextField
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    name="phone"
                    placeholder="Номер телефона*"
                />
                <CheckBox
                    checked={formik.values.policy}
                    onChange={formik.handleChange}
                    name="policy"
                    title="Согласен(а) на обработку персональных данных"
                />
                <Button label="Отправить заявку" type="submit" />
            </form>
        </div>
    );
};
