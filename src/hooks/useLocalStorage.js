import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultvalue) {
    
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof defaultvalue === "function") {
            return defaultvalue()
        } else {
            return defaultvalue
        }
    })
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    localStorage.clear();
    
    return [value, setValue]
}