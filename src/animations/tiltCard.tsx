import { useRef } from "react"
import { motion, useMotionValue, useMotionTemplate, useSpring, useReducedMotion } from "framer-motion"

// 3D perspective tilt with a light glare that follows the pointer.
//
// Everything the pointer drives is a motion value, so moving the mouse never
// triggers a React render — the original version called setState on every
// mousemove, which re-rendered the card and rebuilt the gradient string dozens
// of times a second, per card. The element rect is also cached on enter rather
// than read on every move, which was forcing a synchronous layout each time.
export function TiltCard({ children, max = 7, style }: { children: React.ReactNode; max?: number; style?: React.CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null)
    const rect = useRef<DOMRect | null>(null)
    const reduced = useReducedMotion()

    const rx = useMotionValue(0)
    const ry = useMotionValue(0)
    const srx = useSpring(rx, { stiffness: 220, damping: 18 })
    const sry = useSpring(ry, { stiffness: 220, damping: 18 })

    const gx = useMotionValue(50)
    const gy = useMotionValue(50)
    const glareOpacity = useMotionValue(0)
    const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22) 0%, transparent 55%)`

    if (reduced) {
        return <div ref={ref} style={{ ...style, position: "relative" }}>{children}</div>
    }

    return (
        <motion.div ref={ref}
            onMouseEnter={() => { rect.current = ref.current?.getBoundingClientRect() ?? null; glareOpacity.set(1) }}
            onMouseMove={event => {
                const r = rect.current
                if (!r) return
                const px = (event.clientX - r.left) / r.width
                const py = (event.clientY - r.top) / r.height
                ry.set((px - 0.5) * 2 * max)
                rx.set(-(py - 0.5) * 2 * max)
                gx.set(px * 100)
                gy.set(py * 100)
            }}
            onMouseLeave={() => { rx.set(0); ry.set(0); glareOpacity.set(0); rect.current = null }}
            style={{ ...style, rotateX: srx, rotateY: sry, transformPerspective: 900, transformStyle: "preserve-3d", position: "relative" }}>
            {children}
            <motion.div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", opacity: glareOpacity, transition: "opacity 0.35s ease", background: glare, zIndex: 5 }} />
        </motion.div>
    )
}
