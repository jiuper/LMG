import cnBind from "classnames/bind";
import type { ButtonProps } from "primereact/button";
import { Button as PrimereactButton } from "primereact/button";

import styles from "./Button.module.scss";

const cx = cnBind.bind(styles);
type ButtonPropsC = ButtonProps & {
    mode?: "outlined" | "empty" | "purple";
    className?: string;
};
export const Button = ({ mode = "outlined", className, ...props }: ButtonPropsC) => {
    return <PrimereactButton className={cx("button", mode, className)} iconPos="right" {...props} />;
};
