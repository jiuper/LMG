import type { MouseEventHandler } from "react";
import { useCallback, useMemo, useRef } from "react";
import cnBind from "classnames/bind";
import type { ButtonProps } from "primereact/button";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";

import styles from "./ActionButton.module.scss";

const cx = cnBind.bind(styles);

export type ActionButtonProps = ButtonProps & {
    menuClassName?: string;
    menuItems: { label: string; icon?: string; callback: () => void }[];
};
export const ActionButton = ({ menuItems, menuClassName, className, ...buttonProps }: ActionButtonProps) => {
    const menuRef = useRef<Menu>(null);

    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        menuRef?.current?.toggle(event);
    }, []);

    const convertedMenuItems = useMemo<MenuItem[]>(
        () => [
            {
                items: menuItems.map((el) => ({
                    label: el.label,
                    icon: el.icon,
                    command: el.callback,
                })),
            },
        ],
        [menuItems],
    );

    return (
        <>
            <Button
                className={cx("button", className)}
                rounded
                outlined
                text
                severity="secondary"
                icon="pi pi-ellipsis-v"
                onClick={handleButtonClick}
                {...buttonProps}
            />
            <Menu className={cx("menu", menuClassName)} ref={menuRef} popup model={convertedMenuItems} />
        </>
    );
};
