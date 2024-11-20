import cnBind from "classnames/bind";
import type { ButtonProps } from "primereact/button";
import { Button } from "primereact/button";

import styles from "./CustomButton.module.scss";

const cx = cnBind.bind(styles);
export interface CustomButtonProps extends ButtonProps {
    title?: string;
    className?: string;
    handleAction?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    classNameIcon?: string;
    name?: string;
}
export const CustomButton = ({
    title = "",
    handleAction,
    className,
    type = "button",
    disabled = false,
    icon = "",
    classNameIcon,
    name,
    ...props
}: CustomButtonProps) => {
    return (
        <Button
            pt={{ icon: { className: classNameIcon } }}
            icon={icon}
            disabled={disabled}
            type={type}
            label={title}
            className={cx("button", className)}
            onClick={handleAction}
            name={name}
            data-btn-type={props.severity}
            {...props}
        />
    );
};
