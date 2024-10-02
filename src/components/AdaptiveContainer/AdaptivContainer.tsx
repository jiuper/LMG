import type { ReactNode } from "react";
import cnBind from "classnames/bind";

import styles from "./AdaptiveContainer.module.scss";

const cx = cnBind.bind(styles);
export interface ContainerProps {
    className?: string;
    children?: ReactNode;
}

export const AdaptiveContainer = ({
    className,

    children = <div />,
}: ContainerProps): JSX.Element => {
    return <div className={cx(className, "container")}>{children}</div>;
};
