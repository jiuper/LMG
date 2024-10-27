import { useAppSelector } from "@/shared/redux/configStore";

import { ENTITIES_PAGE_SELECT_ENTITY_OPTIONS } from "./constants";

export const useDropdownEntityOptions = () => {
    const role = useAppSelector((store) => store.account.userData?.role);

    return ENTITIES_PAGE_SELECT_ENTITY_OPTIONS.filter((item) => item.accessRoles.includes(role ?? 0)).map(
        ({ title, value }) => ({ title, value }),
    );
};
