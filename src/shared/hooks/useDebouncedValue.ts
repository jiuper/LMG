import { useEffect, useMemo, useState } from "react";

export const useDebouncedValue = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    const handler = useMemo(
        () => (newValus: T) => {
            const timeoutId = setTimeout(() => setDebouncedValue(newValus), delay);

            return () => clearTimeout(timeoutId);
        },
        [delay],
    );

    useEffect(() => {
        const cancelTimeout = handler(value);

        return () => cancelTimeout();
    }, [value, handler]);

    return debouncedValue;
};
