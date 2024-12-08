import { useEffect, useState } from "react";

import { createAxiosApi } from "@/shared/axios/axios";

export const useLoaderFile = (list?: string) => {
    const [fileLoader, setFileLoader] = useState<File | null>(null);

    useEffect(() => {
        if (!list) return;
        try {
            return void createAxiosApi()<Iterable<number>>({
                type: "get",
                url: `/picture/${list}`,
                config: {
                    responseType: "arraybuffer",
                },
            }).then((res) => {
                const data = new Uint8Array(res.data);
                const blob = new Blob([data], { type: "image/jpeg" });
                const file = new File([blob], list, { type: "image/jpeg" });
                setFileLoader(file);
            });
        } catch (error) {
            console.error("Error loading file:", error);
            setFileLoader(null);
        }
    }, [list]);

    return fileLoader;
};
