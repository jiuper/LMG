"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const useAdminAuth = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const login = useCallback(() => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem("admin-auth", "true");
        }
        setIsAuthorized(true);
    }, []);

    const logout = useCallback(() => {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("admin-auth");
        }
        setIsAuthorized(false);
        router.push("/");
    }, [router]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isStored = sessionStorage.getItem("admin-auth") === "true";
            setIsAuthorized(isStored);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && !pathname.startsWith("/admin")) {
            logout();
        }
    }, [pathname, logout]);

    return { isAuthorized, login };
};
