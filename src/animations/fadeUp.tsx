import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { EO } from "./easings"

// Fades and lifts its children up into view once, when scrolled into range.
export function FadeUp({ children, delay = 0, y = 28, style }: { children: React.ReactNode; delay?: number; y?: number; style?: React.CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-6% 0px" })
    return (
        <motion.div ref={ref} style={style}
            initial={{ y, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.75, delay, ease: EO }}>
            {children}
        </motion.div>
    )
}
