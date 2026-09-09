import { useEffect, useState } from "react"

export function useWindowWidth() {
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1440)
    useEffect(() => {
        if (typeof window === "undefined") return
        const fn = () => setW(window.innerWidth)
        window.addEventListener("resize", fn, { passive: true })
        window.addEventListener("orientationchange", fn, { passive: true })
        return () => { window.removeEventListener("resize", fn); window.removeEventListener("orientationchange", fn) }
    }, [])
    return w
}

export const useVW = useWindowWidth
