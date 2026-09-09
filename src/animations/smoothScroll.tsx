import { useEffect } from "react"

// Inertia smooth scroll: wheel input is lerped so the whole page glides.
// Desktop only; scrollbar drag, keyboard, and touch stay native.
export function SmoothScroll() {
    useEffect(() => {
        if (typeof window === "undefined" || window.innerWidth < 1024) return
        let target = window.scrollY
        let current = window.scrollY
        let raf = 0
        let active = false
        const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight
        const tick = () => {
            current += (target - current) * 0.105
            if (Math.abs(target - current) < 0.5) { current = target; active = false }
            window.scrollTo(0, current)
            if (active) raf = requestAnimationFrame(tick)
        }
        const onWheel = (e: WheelEvent) => {
            if (e.ctrlKey) return
            if (document.body.style.overflow === "hidden") return
            e.preventDefault()
            const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
            target = Math.max(0, Math.min(maxScroll(), target + delta))
            if (!active) { active = true; raf = requestAnimationFrame(tick) }
        }
        const sync = () => { if (!active) { target = window.scrollY; current = window.scrollY } }
        window.addEventListener("wheel", onWheel, { passive: false })
        window.addEventListener("scroll", sync, { passive: true })
        return () => {
            window.removeEventListener("wheel", onWheel)
            window.removeEventListener("scroll", sync)
            cancelAnimationFrame(raf)
        }
    }, [])
    return null
}
