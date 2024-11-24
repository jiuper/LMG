import cnBind from "classnames/bind";

import { Modal } from "@/components/_Modals/Modal";

import styles from "./ModalFaq.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    isOpen: boolean;
    onClose: () => void;
};
export const ModalFaq = ({ isOpen, onClose }: Props) => {
    return (
        <Modal
            maxWidth="880px"
            isOpen={isOpen}
            onClose={onClose}
            hasHeader="Как долго длятся курсы?"
            className={cx("modal-faq")}
        >
            <div className={cx("wrapper")}>
                <div className={cx("title")}>
                    <span>Главная страница это страница родитель.</span>
                    <span>Навигация находиться в хедере</span>
                    <span>Секции на ней</span>
                </div>
                <div className={cx("text")}>
                    <span>1. Баннер вверху страницы с описанием и ключевым назначением сайта.</span>
                    <span> Размещение рекламы в различных местах и привлечение клиентов на бизнес заказчика</span>
                </div>
                <div className={cx("text", "text-list")}>
                    <span>2. секция с кейсами которые отображаются в виде карточек:</span>
                    <div className={cx("list")}>
                        <span>Реклама в жилых домах, ЖК</span>
                        <span>Реклама ПВЗ</span>
                        <span>Реклама в фитнес клубах</span>
                        <span>Реклама в торговых центрах</span>
                        <span>Реклама в бизнес центрах</span>
                    </div>
                </div>
                <div className={cx("text")}>
                    <span>3.Блок Карусель с прокруткой</span>
                    <span> Акции</span>
                </div>
                <div className={cx("text")}>
                    <span>4.Блок Видео отзывы клиентов</span>
                    <span>5.Блок Раздел “Полезное” содержит в себе, Статьи; Новости; Faq; Закон о рекламе</span>
                    <span>6.Блок Сотрудничество( содержит в себе ТСЖ; УК)</span>
                    <span>7.Блок О нас - (содержит в себе История; Наша команда; Документы)</span>
                    <span>8.Блок Портфолио</span>
                    <span>9.Блок Способы оплаты</span>
                </div>
            </div>
        </Modal>
    );
};
