import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import LOGO from "@/shared/assests/svg/logo.svg";
import LOGOM from "@/shared/assests/svg/logomob.svg";
import { Routes } from "@/shared/constants/Routing";
import { useResizeContext } from "@/shared/context/WindowResizeProvider";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./Logo.module.scss";

const cx = cnBind.bind(styles);
type TLogo = {
    isFooter?: boolean;
};
export const Logo = ({ isFooter = false }: TLogo) => {
    const router = useRouter();
    const { isMobile } = useResizeContext();
    const width = !isFooter && isMobile ? 20 : 285;

    return (
        <div className={cx("logo", !isFooter && isMobile && "isMobile")} onClick={() => router.push(Routes.HOME)}>
            <CustomImage
                width={285}
                height={20}
                src={!isFooter && isMobile ? (LOGOM as string) : (LOGO as string)}
                alt="lmg"
                className={cx("image", !isFooter && isMobile && "isMobile")}
            />
        </div>
    );
};
