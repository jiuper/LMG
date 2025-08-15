import type { ReactNode } from "react";
import cnBind from "classnames/bind";
import type { DialogProps } from "primereact/dialog";
import { Dialog } from "primereact/dialog";

import { useResizeContext } from "@/shared/context/WindowResizeProvider";

import styles from "./style.module.scss";

const cx = cnBind.bind(styles);
export interface ModalProps {
    isOpen: boolean;
    maxWidth?: string;
    onClose: () => void;
    hasHeader?: ReactNode | ((props: DialogProps) => ReactNode);
    className?: string;
    containerClassName?: string;
    classNameRoot?: string;
    children: ReactNode;
    maxHeight?: string;
    position?:
        | "center"
        | "left"
        | "top"
        | "bottom"
        | "right"
        | "bottom-right"
        | "bottom-left"
        | "top-right"
        | "top-left";
    maximized?: boolean;
    height?: string;
}
export const Modal = ({
    isOpen,
    onClose,
    children,
    hasHeader,
    maxWidth = "50vh",
    className,
    classNameRoot,
    containerClassName,
    maxHeight = "90%",
    position = "center",
    maximized,
    height,
}: ModalProps) => {
    const { isMobile } = useResizeContext();

    return (
        <Dialog
            style={{
                maxWidth,
                width: "100%",
                height,
                maxHeight: `${maxHeight}`,
                boxShadow: "none",
            }}
            header={hasHeader}
            className={cx("modal", className, { isMobile, isCenter: position === "center" })}
            maskClassName={cx("mask", containerClassName)}
            visible={isOpen}
            onHide={onClose}
            closable
            draggable={false}
            position={isMobile ? "bottom" : position}
            closeOnEscape
            maximized={maximized}
            blockScroll={isOpen}
            pt={{
                root: { className: cx(classNameRoot) },
                closeButton: { className: cx("header-btn") },
            }}
        >
            {children}
        </Dialog>
    );
};
