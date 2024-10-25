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
            <PrimereactBreadCrumb
                separatorIcon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C9C5CA" />
                        <path
                            d="M12.96 9.81009C12.9362 9.74872 12.9005 9.69264 12.855 9.64509L10.355 7.14509C10.3084 7.09847 10.253 7.06149 10.1921 7.03626C10.1312 7.01103 10.0659 6.99805 10 6.99805C9.86685 6.99805 9.73915 7.05094 9.645 7.14509C9.59838 7.19171 9.5614 7.24706 9.53617 7.30797C9.51094 7.36888 9.49795 7.43416 9.49795 7.50009C9.49795 7.63324 9.55085 7.76094 9.645 7.85509L11.295 9.50009H7.5C7.36739 9.50009 7.24021 9.55277 7.14645 9.64654C7.05268 9.74031 7 9.86748 7 10.0001C7 10.1327 7.05268 10.2599 7.14645 10.3536C7.24021 10.4474 7.36739 10.5001 7.5 10.5001H11.295L9.645 12.1451C9.59814 12.1916 9.56094 12.2469 9.53555 12.3078C9.51017 12.3687 9.4971 12.4341 9.4971 12.5001C9.4971 12.5661 9.51017 12.6315 9.53555 12.6924C9.56094 12.7533 9.59814 12.8086 9.645 12.8551C9.69148 12.902 9.74678 12.9392 9.80771 12.9645C9.86864 12.9899 9.93399 13.003 10 13.003C10.066 13.003 10.1314 12.9899 10.1923 12.9645C10.2532 12.9392 10.3085 12.902 10.355 12.8551L12.855 10.3551C12.9005 10.3075 12.9362 10.2515 12.96 10.1901C13.01 10.0684 13.01 9.93182 12.96 9.81009Z"
                            fill="#BBC5EF"
                        />
                    </svg>
                }
                className={cx("breadcrumb")}
                home={home}
                {...props}
            />
        </div>
    );
};
