import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { EO } from "./easings"

// Words rise into place one after another from behind a mask.
export function StaggerWords({ text, delay = 0, stagger = 0.055, style }: { text: string; delay?: number; stagger?: number; style?: React.CSSProperties }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: "-6% 0px" })
    return (
        <span ref={ref} style={style}>
            {text.split(" ").map((word, i) => (
                <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.05em", marginRight: "0.28em" }}>
                    <motion.span style={{ display: "inline-block" }}
                        initial={{ y: "112%", opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.85, delay: delay + i * stagger, ease: EO }}>
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    )
}
