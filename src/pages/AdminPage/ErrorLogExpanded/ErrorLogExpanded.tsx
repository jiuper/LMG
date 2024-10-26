import React from "react";
import cnBind from "classnames/bind";

import styles from "./ErrorLogExpanded.module.scss";

const cx = cnBind.bind(styles);

interface ErrorLogExpandedProps {
    additionalInformation: string;
}

export const ErrorLogExpanded = ({ additionalInformation }: ErrorLogExpandedProps) => {
    return <div className={cx("error-log-expanded")}>{additionalInformation}</div>;
};
