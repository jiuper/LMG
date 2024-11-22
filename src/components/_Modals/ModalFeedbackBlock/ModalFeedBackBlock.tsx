import cnBind from "classnames/bind";

import { Modal } from "@/components/_Modals/Modal";
import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import { useResizeContext } from "@/shared/context/WindowResizeProvider";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./ModalFeedBackBlock.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    isOpen: boolean;
    onClose: () => void;
    item: { type?: string; image: string; title: string; description: string };
};
export const ModalFeedBackBlock = ({ isOpen, onClose, item }: Props) => {
    const { isMobile } = useResizeContext();
    const [isOpenFeed, open, close] = useBooleanState(false);

    return (
        <Modal className={cx("modal-case", { isMobile })} maxWidth="880px" onClose={onClose} isOpen={isOpen}>
            <div className={cx("wrapper", { isMobile })}>
                <div className={cx("content")}>
                    <div className={cx("info")}>
                        <div className={cx("title")}>
                            <h3>{item.title}</h3>
                            <span>{item.description}</span>
                        </div>
                        <div onClick={onClose} className={cx("close-btn")}>
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={cx("close")}
                            >
                                <rect width="40" height="40" rx="20" fill="#F7F7FF" />
                                <path
                                    d="M26.3002 13.7107C25.9102 13.3207 25.2802 13.3207 24.8902 13.7107L20.0002 18.5907L15.1102 13.7007C14.7202 13.3107 14.0902 13.3107 13.7002 13.7007C13.3102 14.0907 13.3102 14.7207 13.7002 15.1107L18.5902 20.0007L13.7002 24.8907C13.3102 25.2807 13.3102 25.9107 13.7002 26.3007C14.0902 26.6907 14.7202 26.6907 15.1102 26.3007L20.0002 21.4107L24.8902 26.3007C25.2802 26.6907 25.9102 26.6907 26.3002 26.3007C26.6902 25.9107 26.6902 25.2807 26.3002 24.8907L21.4102 20.0007L26.3002 15.1107C26.6802 14.7307 26.6802 14.0907 26.3002 13.7107Z"
                                    fill="#040F16"
                                />
                            </svg>
                        </div>
                    </div>
                    {item.type === "video" ? (
                        <video src={item.image}>
                            <source src={item.image} />
                        </video>
                    ) : (
                        <CustomImage
                            className={cx("image")}
                            width={768}
                            height={587}
                            src={item.image}
                            alt={item.image || ""}
                        />
                    )}
                </div>
                <div className={cx("footer")}>
                    <h3>Хотите так же?</h3>
                    <Button onClick={open} className={cx("btn")} label="Заказать звонок" />
                </div>
            </div>
            <ModalFeedBack isOpen={isOpenFeed} onClose={close} />
        </Modal>
    );
};
