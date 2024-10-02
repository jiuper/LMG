import cnBind from "classnames/bind";
import type { CheckboxProps } from "primereact/checkbox";
import { Checkbox as PrimeCheckbox } from "primereact/checkbox";

import styles from "./CheckBox.module.scss";

const cx = cnBind.bind(styles);
type CheckBoxPropsC = CheckboxProps & {
    className?: string;
    classNameContainer?: string;
    classNameLabel?: string;
    mode?: "dark" | "light";
};
export const CheckBox = ({
    className,
    title,
    onChange,
    mode = "dark",
    classNameContainer,
    classNameLabel,
    ...props
}: CheckBoxPropsC) => {
    return (
        <div className={cx("wrapper", classNameContainer)}>
            <PrimeCheckbox
                inputId="ingredient1"
                onChange={onChange}
                className={cx("check-box", className, mode)}
                {...props}
            />
            <label htmlFor="ingredient1" className={cx("label", classNameLabel)}>
                {title}
            </label>
        </div>
    );
};
