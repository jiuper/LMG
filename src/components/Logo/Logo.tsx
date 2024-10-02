import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import LOGO from "@/shared/assests/svg/logo.svg";
import { Routes } from "@/shared/constants/Routing";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./Logo.module.scss";

const cx = cnBind.bind(styles);
type TLogo = {
    hidden?: boolean;
};
export const Logo = ({ hidden }: TLogo) => {
    const router = useRouter();

    return (
        <div className={cx("logo", { hidden })} onClick={() => router.push(Routes.HOME)}>
            <CustomImage width={200} height={16} src={LOGO as string} alt="lmg" className={cx("image")} />
        </div>
    );
};
