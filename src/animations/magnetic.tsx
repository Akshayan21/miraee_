import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// Buttons that lean toward the cursor and spring back
export function Magnetic({ children, strength = 0.32 }: { children: React.ReactNode; strength?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const sx = useSpring(x, { stiffness: 240, damping: 15, mass: 0.4 })
    const sy = useSpring(y, { stiffness: 240, damping: 15, mass: 0.4 })
    return (
        <motion.div ref={ref}
            onMouseMove={(e) => {
                const r = ref.current?.getBoundingClientRect()
                if (!r) return
                x.set((e.clientX - (r.left + r.width / 2)) * strength)
                y.set((e.clientY - (r.top + r.height / 2)) * strength)
            }}
            onMouseLeave={() => { x.set(0); y.set(0) }}
            style={{ x: sx, y: sy, display: "inline-block" }}>
            {children}
        </motion.div>
    )
}
