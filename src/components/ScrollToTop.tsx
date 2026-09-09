import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

// Reset scroll to top on every route change (SPA nav).
export default function ScrollToTop() {
    const { pathname } = useLocation()
    useLayoutEffect(() => {
        if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual"
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })

        // Lazy routes replace a viewport-height fallback after this component mounts.
        // Reassert the top after that layout swap so browser restoration/anchoring
        // cannot move the newly rendered hero.
        let secondFrame = 0
        const firstFrame = window.requestAnimationFrame(() => {
            secondFrame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }))
        })
        return () => {
            window.cancelAnimationFrame(firstFrame)
            window.cancelAnimationFrame(secondFrame)
        }
    }, [pathname])
    return null
}
