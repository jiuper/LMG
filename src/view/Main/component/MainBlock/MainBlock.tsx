import cnBind from "classnames/bind";

import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";

import styles from "./MainBlock.module.scss";

const cx = cnBind.bind(styles);

export const MainBlock = () => {
    const list = ["Лифты", "ПВЗ", "ТЦ", "БЦ", "Реклама где хотите"];
    const [isOpen, open, close] = useBooleanState(false);

    return (
        <div className={cx("main-block")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("content")}>
                    <h1>Разместим рекламу вашего бизнеса в каждом доме</h1>
                    <div className={cx("description")}>
                        <span>
                            Более <strong>30 000</strong> собственных
                        </span>
                        <span>
                            <strong>рекламных носителей</strong> по всей России
                        </span>
                    </div>

                    <Button className={cx("button")} mode="outlined" onClick={open} label="Заказать звонок" />
                </div>
                <div className={cx("buttons")}>
                    {list.map((el, index) => (
                        <Button className={cx("button")} key={index} label={el} onClick={open} />
                    ))}
                </div>
            </div>
            <ModalFeedBack isOpen={isOpen} onClose={close} />
        </div>
    );
};
