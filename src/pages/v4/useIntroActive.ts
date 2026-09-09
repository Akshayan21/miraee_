import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

// State for V0Intro.tsx's <IntroCover>, split into its own module (not a
// component export) so IntroCover.tsx stays fast-refresh-friendly and so a
// caller can also make the real page `inert` while the cover is up — V0
// itself doesn't do this, but without it a keyboard user can Tab straight
// past a cover that's fully opaque to a mouse user and land focus on content
// they can't see.
//
// Three things beyond a literal copy of V0's source:
//   - both html and body are scroll-locked, not just body (V0 only locks
//     body; whichever element is the actual scrolling root — browser/reset
//     dependent — stays scrollable otherwise, so V0's own cover can be
//     scrolled past on the first gesture in some browsers)
//   - it skips entirely under prefers-reduced-motion (a full-screen wipe is
//     exactly what that setting exists to suppress)
//   - it only ever plays once per browser session, so internal navigation
//     back to /v4 doesn't replay it

const SESSION_KEY = "miraee-v4-intro-done"

export type IntroPhase = "hold" | "reveal" | "done"

export function useIntroActive() {
    const reduce = useReducedMotion()

    // Skip if the page loaded already scrolled (refresh mid-page), if the cover
    // has already played this session, or under reduced motion.
    const [enabled] = useState(() => {
        if (typeof window === "undefined") return false
        if (window.scrollY >= 60) return false
        try { if (sessionStorage.getItem(SESSION_KEY)) return false } catch { /* private mode */ }
        return true
    })
    const [phase, setPhase] = useState<IntroPhase>("hold")

    const active = enabled && !reduce

    // Scroll lock, trigger listeners, and the hold→reveal→done sequence are all
    // one imperative effect, run once, rather than three effects re-keyed on
    // `phase`. An earlier, phase-keyed version looked correct on paper (lock
    // gated on phase !== "done", so the hold→reveal transition should tear the
    // effect down and immediately re-set it up within the same React commit,
    // before any paint) but measurement showed the inline overflow was already
    // cleared 30ms after the trigger fired — the actual commit/paint ordering
    // did not give the guarantee the comment claimed. Rather than keep
    // reasoning about effect-teardown timing across a dependency change, the
    // lock here is applied exactly once, imperatively, and released at exactly
    // one call site (inside the same timeout that flips phase to "done") —
    // there is no re-render in between for anything to race.
    useEffect(() => {
        if (!active) return

        const html = document.documentElement
        const body = document.body
        const prevHtmlOverflow = html.style.overflow
        const prevBodyOverflow = body.style.overflow

        // Lock BOTH html and body. Only locking body is the classic scroll-lock
        // bug: whichever element is the real scrolling root (browser/reset
        // dependent — often <html>, not <body>) stays scrollable if its own
        // overflow isn't also set, so a wheel tick still moves the page — and
        // everything under the cover, the hero included, scrolls along with it.
        html.style.overflow = "hidden"
        body.style.overflow = "hidden"
        window.scrollTo(0, 0)

        const unlock = () => {
            html.style.overflow = prevHtmlOverflow
            body.style.overflow = prevBodyOverflow
        }

        let revealTimer = 0
        const startReveal = (event?: Event) => {
            event?.preventDefault()
            window.removeEventListener("wheel", startReveal)
            window.removeEventListener("touchmove", startReveal)
            window.removeEventListener("keydown", startReveal)
            window.clearTimeout(autoTimer)
            try { sessionStorage.setItem(SESSION_KEY, "1") } catch { /* private mode */ }
            setPhase("reveal")
            // Scroll stays locked for the full 1.4s wipe, not just until the
            // trigger fires — released here, pinned to 0 once more first so the
            // hero is exactly where it starts regardless of what happened during
            // the animation.
            revealTimer = window.setTimeout(() => {
                window.scrollTo(0, 0)
                unlock()
                setPhase("done")
            }, 1500)
        }

        // Non-passive so preventDefault actually stops the gesture that triggers
        // the reveal from also scrolling the (still locked) page.
        window.addEventListener("wheel", startReveal, { passive: false, once: true })
        window.addEventListener("touchmove", startReveal, { passive: false, once: true })
        window.addEventListener("keydown", startReveal, { once: true })
        const autoTimer = window.setTimeout(startReveal, 4500)

        return () => {
            window.removeEventListener("wheel", startReveal)
            window.removeEventListener("touchmove", startReveal)
            window.removeEventListener("keydown", startReveal)
            window.clearTimeout(autoTimer)
            window.clearTimeout(revealTimer)
            unlock()
        }
    }, [active])

    return { active: active && phase !== "done", phase }
}
