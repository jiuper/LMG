import cnBind from "classnames/bind";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IcDoubleArrow, IcLogout } from "@/shared/assests/svg";
import { Belong } from "@/shared/constants";
import { useBooleanState } from "@/shared/hooks";
import { useNavigationItems } from "@/shared/hooks/useNavigationItems";

import styles from "./SideBar.module.scss";

const cx = cnBind.bind(styles);

interface Props {
    isOpen?: boolean;
}

export const SideBar = ({ isOpen = false }: Props) => {
    const pathName = usePathname();
    // const dispatch = useAppDispatch();
    const [isOpenSidebar, , , toggleOpenSidebar] = useBooleanState(isOpen);
    // const userData = useAppSelector((state) => state.account.userData);
    const navItems = useNavigationItems(Belong.DESKTOP_SIDE_BAR_NAVIGATION);

    // const logOut = useCallback(() => {
    //     window.location.href = "/";
    //     deleteCookie(COOKIE_ACCESS_TOKEN);
    //     deleteCookie(COOKIE_REFRESH_TOKEN);
    //     dispatch(accountSliceActions.resetAccountStores());
    // }, [dispatch]);

    return (
        <div className={cx("side-bar", { isOpenSidebar })}>
            <div className={cx("wrapper", { isOpenSidebar })}>
                <div className={cx("top")}>
                    {/* <Avatar
                        icon="pi pi-user"
                        className={cx("avatar")}
                        src="/files/photo"
                        diameter={64}
                        isProtected
                        isOnline
                    />
                    <div className={cx("profile", { isOpenSidebar })}>
                        <div className={cx("name")}>{`${userData?.firstName || ""} ${userData?.lastName || ""}`}</div>
                        <div className={cx("email")}>{userData?.email || ""}</div>
                    </div> */}
                </div>

                <div className={cx("navbar")}>
                    <div className={cx("sidebar-menu-item", { isOpenSidebar })} onClick={toggleOpenSidebar}>
                        <IcDoubleArrow className={cx("icon", { isOpenSidebar })} />
                        <span>Свернуть</span>
                    </div>
                    <nav className={cx("nav")}>
                        <ul className={cx("nav-list")}>
                            {navItems.map((item) => (
                                <li className={cx("nav-list-item")} key={item.link}>
                                    <Link
                                        className={cx("sidebar-menu-item", {
                                            isActive: item.link === pathName,
                                            isOpenSidebar,
                                        })}
                                        href={item.link}
                                    >
                                        {item.Icon && <item.Icon />}
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className={cx("nav-bottom")}>
                        <button className={cx("sidebar-menu-item", { isOpenSidebar })} type="button">
                            <IcLogout />
                            <span>Выйти</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
