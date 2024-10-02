import cnBind from "classnames/bind";
import Link from "next/link";
import { InputTextarea } from "primereact/inputtextarea";

import FORMBOOKING from "@/shared/assests/form-booking.png";
import { Routes } from "@/shared/constants/Routing";
import { UIInputText } from "@/shared/ui/_InputText/InputText";
import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./FormBooking.module.scss";

const cx = cnBind.bind(styles);

export const FormBooking = () => {
    return (
        <div className={cx("form-booking")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("header")}>
                    <h2>Забронируйте зал сейчас!</h2>
                    <span className={cx("title")}>
                        Выберите удобное время для фотосессии и моментально забронируйте зал
                    </span>
                </div>
                <form className={cx("form")} action="">
                    <div className={cx("step-one")}>
                        <div className={cx("step-title")}>
                            01 <span>Выберите время бронирования</span>
                        </div>
                        <div className={cx("step-buttons")}>
                            <div className={cx("step-button")}>
                                <Button mode="orange" label="Посмотреть свободные даты" />
                            </div>
                        </div>
                    </div>
                    <div className={cx("step-two")}>
                        <div className={cx("step-title")}>
                            02 <span>Заполните Ваши данные</span>
                        </div>
                        <div className={cx("step-field")}>
                            <div className={cx("inputs")}>
                                <div className={cx("input-wrapper")}>
                                    <UIInputText placeholder="Ваше имя" isFullWidth />
                                    <UIInputText placeholder="Фамилия" isFullWidth />
                                </div>
                                <div className={cx("input-wrapper")}>
                                    <UIInputText placeholder="Email" isFullWidth />
                                    <UIInputText placeholder="Номер телефона" isFullWidth />
                                </div>
                            </div>
                            <InputTextarea autoResize className={cx("textarea")} placeholder="Комментарии" />
                            <div className={cx("buttons")}>
                                <div className={cx("privacy")}>
                                    <i>*</i>Нажимая на кнопку вы соглашаетесь с{" "}
                                    <Link className={cx("link")} href={Routes.POLICY}>
                                        Политикой конфиденциальности
                                    </Link>
                                </div>
                                <Button
                                    className={cx("button-booking")}
                                    mode="orange"
                                    type="submit"
                                    label="Получить подарок"
                                    iconButton
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx("step-three")}>
                        <CustomImage className={cx("image")} src={FORMBOOKING} alt="form-booking" />
                    </div>
                </form>
            </div>
        </div>
    );
};
