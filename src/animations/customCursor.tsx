import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useWindowWidth } from "../hooks/useWindowSize"
import { EO } from "./easings"

const ORANGE = "var(--color-orange)"

// Orange dot + lagging ring cursor companion (desktop only, keeps native cursor)
export function CustomCursor() {
    const w = useWindowWidth()
    const x = useMotionValue(-100)
    const y = useMotionValue(-100)
    const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 })
    const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 })
    const [hoverUI, setHoverUI] = useState(false)
    useEffect(() => {
        if (typeof window === "undefined") return
        const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
        const over = (e: MouseEvent) => {
            const t = e.target as HTMLElement
            setHoverUI(!!(t && t.closest && t.closest("button, a")))
        }
        window.addEventListener("mousemove", move, { passive: true })
        window.addEventListener("mouseover", over, { passive: true })
        return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over) }
    }, [x, y])
    if (w < 1024) return null
    return (
        <>
            {/* Ambient spotlight: warm light follows the cursor across the page */}
            <motion.div className="v4-cursor" style={{ position: "fixed", left: 0, top: 0, x: sx, y: sy, translateX: "-50%", translateY: "-50%", width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.055) 0%, transparent 60%)", zIndex: 340, pointerEvents: "none" }} />
            <motion.div className="v4-cursor" style={{ position: "fixed", left: 0, top: 0, x, y, translateX: "-50%", translateY: "-50%", width: 6, height: 6, borderRadius: "50%", background: ORANGE, zIndex: 9999, pointerEvents: "none" }} />
            <motion.div animate={{ scale: hoverUI ? 2 : 1, opacity: hoverUI ? 0.3 : 0.55 }} transition={{ duration: 0.25, ease: EO }}
                className="v4-cursor" style={{ position: "fixed", left: 0, top: 0, x: sx, y: sy, translateX: "-50%", translateY: "-50%", width: 34, height: 34, borderRadius: "50%", border: "1.5px solid " + ORANGE, zIndex: 9999, pointerEvents: "none" }} />
        </>
    )
}
