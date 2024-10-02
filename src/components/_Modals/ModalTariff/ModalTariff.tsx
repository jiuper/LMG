import cnBind from "classnames/bind";

import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";

import styles from "./ModalTariff.module.scss";

const cx = cnBind.bind(styles);
type ModalTariffProps = {
    isOpen: boolean;
    onClose: () => void;
    tariff: { id: string; caption: string; description: string; price: number }[];
    onClick?: (val: string) => void;
};
export const ModalTariff = ({ isOpen, onClose, tariff, onClick }: ModalTariffProps) => {
    return (
        <Modal maxWidth="100%" hasHeader="Тарифы" isOpen={isOpen} onClose={onClose}>
            <div className={cx("modal-tariff")}>
                <div className={cx("wrapper", "container")}>
                    {tariff.map(({ caption, description, price, id }, index) => (
                        <div key={index} className={cx("cards")}>
                            <div className={cx("card-tariff")}>
                                <div className={cx("header")}>
                                    <h4>{caption}</h4>
                                </div>
                                <div className={cx("body")}>
                                    <div className={cx("option")}>
                                        <span className={cx("description")}>{description}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("footer")}>
                                <h4>{price} ₽</h4>
                                <Button onClick={() => onClick?.(caption)} mode="outlined" label="Забронировать" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
};
