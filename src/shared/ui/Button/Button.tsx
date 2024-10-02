import cnBind from "classnames/bind";
import type { ButtonProps } from "primereact/button";
import { Button as PrimereactButton } from "primereact/button";

import { ArrowIcon, GiftIcon } from "@/shared/assests/icons/svgs";

import styles from "./Button.module.scss";

const cx = cnBind.bind(styles);
type ButtonPropsC = ButtonProps & {
    mode: "outlined" | "orange" | "empty" | "empty-button";
    className?: string;
    iconButton?: boolean;
};
export const Button = ({ mode, iconButton = false, className, ...props }: ButtonPropsC) => {
    return (
        <PrimereactButton
            icon={!iconButton ? <ArrowIcon className={cx("icon")} /> : <GiftIcon className={cx("icon")} />}
            className={cx("button", className, mode)}
            iconPos="right"
            {...props}
        />
    );
};
