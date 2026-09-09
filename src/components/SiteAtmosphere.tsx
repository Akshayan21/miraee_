import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function SiteAtmosphere() {
    const pointerX = useMotionValue(-400)
    const pointerY = useMotionValue(-400)
    const x = useSpring(pointerX, { stiffness: 45, damping: 18, mass: 0.8 })
    const y = useSpring(pointerY, { stiffness: 45, damping: 18, mass: 0.8 })

    useEffect(() => {
        const move = (event: PointerEvent) => {
            pointerX.set(event.clientX - 220)
            pointerY.set(event.clientY - 220)
        }
        window.addEventListener("pointermove", move, { passive: true })
        return () => window.removeEventListener("pointermove", move)
    }, [pointerX, pointerY])

    return (
        <>
            <div className="site-atmosphere" aria-hidden="true">
                <div className="site-atmosphere__orb site-atmosphere__orb--one" />
                <div className="site-atmosphere__orb site-atmosphere__orb--two" />
                <motion.div className="site-atmosphere__cursor" style={{ x, y }} />
            </div>
        </>
    )
}
