import { useRef, useState } from "react";

export const useBooleanState = (
    initial?: boolean,
): [value: boolean, handleIsTrue: () => void, handleIsFalse: () => void, handleIsToggle: () => void] => {
    const [value, setValue] = useState<boolean>(initial || false);

    const setFalse = useRef(() => setValue(false));
    const setTrue = useRef(() => setValue(true));
    const toggleValue = useRef(() => setValue((prev) => !prev));

    return [value, setTrue.current, setFalse.current, toggleValue.current];
};
