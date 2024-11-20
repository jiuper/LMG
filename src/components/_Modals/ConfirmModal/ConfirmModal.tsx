import { useState } from "react";
import cnBind from "classnames/bind";

import { Modal } from "@/components/_Modals/Modal";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/_Button";
import type { CustomButtonProps } from "@/shared/ui/CustomButton/CustomButton";

import styles from "./ConfirmModal.module.scss";

const cx = cnBind.bind(styles);

export type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    message: string;
    header: string;
    submitBtnParams?: Omit<CustomButtonProps, "handleAction" | "onClick">;
    closeBtnParams?: Omit<CustomButtonProps, "handleAction" | "onClick">;
};
export const ConfirmModal = ({
    onClose,
    isOpen,
    message,
    onSubmit,
    header,
    submitBtnParams,
    closeBtnParams,
}: ConfirmModalProps) => {
    return (
        <Modal maxWidth="500px" onClose={onClose} isOpen={isOpen} className={cx("modal")} hasHeader={header}>
            <div className={cx("content")}>{message}</div>
            <div className={cx("actions")}>
                <Button className={cx("btn-submit")} onClick={onSubmit} label="Принять" {...submitBtnParams} />
                <Button
                    className={cx("btn-close")}
                    variant="outlined"
                    onClick={onClose}
                    label="Закрыть"
                    {...closeBtnParams}
                />
            </div>
        </Modal>
    );
};

export type UseConfirmModalTempData = {
    header: string;
    message: string;
    onSubmit: () => void;
    onClose: () => void;
};
export const useConfirmModal = () => {
    const [isOpen, open, close] = useBooleanState(false);

    const [tempData, setTempData] = useState<UseConfirmModalTempData>({
        header: "",
        message: "",
        onSubmit: () => undefined,
        onClose: () => undefined,
    });

    const withConfirm = (params: UseConfirmModalTempData) => {
        setTempData(params);
        open();
    };

    const modalProps = {
        isOpen,
        header: tempData.header,
        message: tempData.message,
        onClose: () => {
            close();
            tempData.onClose();
        },
        onSubmit: () => {
            close();
            tempData.onSubmit();
        },
    };

    return { withConfirm, modalProps };
};
