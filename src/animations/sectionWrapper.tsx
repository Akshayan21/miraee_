import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { EO } from "./easings"

// Fades the inner content of a section in on first view without changing its
// layout height (so no whitespace gaps appear between sections while scrolling).
export function SectionWrapper({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-5% 0px" })
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: EO }}
            style={style}>
            {children}
        </motion.div>
    )
}
