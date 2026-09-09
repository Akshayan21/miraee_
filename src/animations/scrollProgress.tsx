import { motion, useScroll, useSpring } from "framer-motion"

// Thin orange bar pinned to the top that fills as the page scrolls.
export function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
    return <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "var(--color-orange)", transformOrigin: "0%", scaleX, zIndex: "var(--z-top)" }} />
}
