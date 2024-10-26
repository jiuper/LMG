import { useMemo } from "react";

import { type Belong, ROUTING_MAP } from "../constants";

export const useNavigationItems = (belong: Belong) => {
    const routeItems = useMemo(
        () =>
            ROUTING_MAP.filter((item) => item.belong.find((item) => item.name === belong))
                .map((item) => ({ ...item, sortId: item.belong.find((item) => item.name === belong)?.sortId }))
                .sort((a, b) => Number(a.sortId) - Number(b.sortId))
                .map(({ label, link, Icon }) => ({ label, link, Icon })),
        [belong],
    );

    return routeItems;
};
