import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => { // ф виклик один раз і передає рез цієї ф, як початкове знач
        let currentValue;

        try {
            console.log(key, localStorage.getItem(key))
            currentValue = JSON.parse(
                localStorage.getItem(key) || String(defaultValue)
            );
        } catch(error) {
            console.log(error)
            currentValue = defaultValue;
        }
        console.log(key, currentValue)
        return currentValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export default useLocalStorage;