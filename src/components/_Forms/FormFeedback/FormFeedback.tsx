import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { TGIcon, WAIcon } from "@/shared/assests/svg/svg";
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
        <div className={cx("container", "wrapper")}>
            <div className={cx("decor")}>
                <div className={cx("header")}>
                    <h2 className={cx("title")}>Остались вопросы?</h2>
                    <span className={cx("text")}>Оставьте заявку и мы свяжемся с вами</span>
                </div>
                <form className={cx("form")} onSubmit={formik.handleSubmit}>
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

                        <Button className={cx("button")} label="Отправить заявку" type="submit" />
                    </div>
                    <div className={cx("footer")}>
                        <CheckBox
                            checked={formik.values.policy}
                            onChange={formik.handleChange}
                            name="policy"
                            title="Согласен(а) на обработку персональных данных"
                        />
                        <div className={cx("social")}>
                            <div className={cx("social-item", "icon")}>
                                <TGIcon />
                            </div>
                            <div className={cx("social-item", "icon")}>
                                <WAIcon />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
