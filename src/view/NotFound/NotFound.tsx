import cnBind from "classnames/bind";

import styles from "./NotFound.module.scss";

const cx = cnBind.bind(styles);
export const NotFound = () => {
    return (
        <div className={cx("not-found", "container")}>
            <div className={cx("content")}>
                <h1>404</h1>
                <p>Упс... Страница не найдена</p>
            </div>
        </div>
    );
};
