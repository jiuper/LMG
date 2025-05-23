import { useState } from "react";
import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import { useAdminAuth } from "@/shared/hooks/useAdminAuth";
import { UIButton } from "@/shared/ui/_Button/Button";
import { UIInputText } from "@/shared/ui/_InputText/InputText";

import styles from "./FormAuth.module.scss";

const cx = cnBind.bind(styles);

export const FormAuth = () => {
    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [error, setError] = useState("");
    const { login } = useAdminAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (loginValue === "admin" && passwordValue === "1234") {
            login();
            router.push("/admin"); // переход в админку
        } else {
            setError("Неверный логин или пароль");
        }
    };

    return (
        <div className={cx("container")}>
            <form className={cx("form")} onSubmit={handleSubmit}>
                <h2 className={cx("title")}>Вход в систему</h2>

                {error && <div className={cx("error")}>{error}</div>}

                <div className={cx("field")}>
                    <label htmlFor="login">Логин</label>
                    <UIInputText
                        isFullWidth
                        id="login"
                        type="text"
                        value={loginValue}
                        onChange={(e) => setLoginValue(e.target.value)}
                        required
                    />
                </div>

                <div className={cx("field")}>
                    <label htmlFor="password">Пароль</label>
                    <UIInputText
                        id="password"
                        type="password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        required
                        isFullWidth
                    />
                </div>

                <UIButton type="submit" label="Войти" isFullWidth />
            </form>
        </div>
    );
};
