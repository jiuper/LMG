import cnBind from "classnames/bind";
import type { InputTextProps } from "primereact/inputtext";
import { InputText } from "primereact/inputtext";

import styles from "./TextField.module.scss";

const cx = cnBind.bind(styles);
type TextFieldProps = InputTextProps & {
    className?: string;
    mode?: "dark" | "light";
    error?: boolean;
};
export const TextField = ({ className, mode = "dark", error = false, ...props }: TextFieldProps) => {
    return <InputText className={cx("text-field", className, mode, { error })} {...props} />;
};
