import cnBind from "classnames/bind";
import type { BreadCrumbProps } from "primereact/breadcrumb";
import { BreadCrumb as PrimereactBreadCrumb } from "primereact/breadcrumb";
import type { MenuItem } from "primereact/menuitem";

import { Routes } from "@/shared/constants/Routing";

import styles from "./BreadCrumb.module.scss";

const cx = cnBind.bind(styles);

type BreadCrumb = BreadCrumbProps;
export const BreadCrumb = ({ ...props }: BreadCrumb) => {
    const home: MenuItem = { label: "Главная", url: Routes.HOME };

    return (
        <div className={cx("wrapper", "container")}>
            <PrimereactBreadCrumb className={cx("breadcrumb")} home={home} {...props} />
        </div>
    );
};
