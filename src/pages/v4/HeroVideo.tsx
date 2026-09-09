import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Users, Building2, Plane } from "lucide-react"
import { Magnetic } from "../../animations"
import { Button } from "../../components/ui/button"
import { AvatarSpotlight } from "./HeroAssistant"
import { isV2Path } from "../../lib/v2"
import travelerPhoto from "../../assets/miraee-traveler-hero.png"

// How far into the pin wrapper's extra scroll room (see .v4-hero-video-pin,
// 50vh of headroom below the sticky 100vh hero) the user has to scroll
// before the copy swaps for the avatar. Small and early on purpose — the
// sticky section is what keeps the hero visually in place during the
// crossfade, not a scroll-lock, so this just needs to fire on the first
// real scroll rather than mark some deep midpoint.
//
// Two thresholds, not one: with a single cutoff, momentum/inertial scroll
// (and plenty of trackpads) settles by oscillating a few px around wherever
// the gesture stopped, so a scroll position sitting right on that line
// flips `scrolled` back and forth every tick — the crossfade re-triggers
// rapidly instead of playing once. The gap between ENTER/EXIT is a dead
// zone: once swapped, scroll has to clear it in the other direction before
// it swaps back, so no amount of sub-pixel jitter near either edge can
// re-fire it.
const SWAP_PROGRESS_ENTER = 0.25
const SWAP_PROGRESS_EXIT = 0.05

// Full-bleed video hero. Video lives in public/videos/hero-bg.mp4. If that
// file is ever missing, the <video> element just has nothing to play and
// the poster image (+ dark gradient) carries the section — never broken.
const STATS = [
    { icon: Users, value: "125M+", label: "travelers reached" },
    { icon: Building2, value: "2M+", label: "properties" },
    { icon: Plane, value: "500+", label: "airlines" },
]

export function HeroVideo() {
    // Once the user scrolls past the hero, the copy + CTAs swap for the
    // assistant spotlight — same section, same video behind it, just a
    // crossfade of what's on top. Reverses if they scroll back to the top.
    //
    // The hero stays visually in place during the swap because it's
    // `position: sticky` inside a taller wrapper (.v4-hero-video-pin, see
    // V4.css) — not because anything is blocking scroll. An earlier version
    // tried to pin the viewport by intercepting and cancelling wheel/touch
    // events, which fought the browser's own scroll handling and produced
    // exactly the failure modes you'd expect from that: the page jumping
    // mid-lock, the crossfade never firing, scroll getting stuck. Driving
    // the swap off real scroll position and letting `position: sticky` do
    // the pinning has none of that — it's just normal scroll.
    const pinRef = useRef<HTMLDivElement>(null)
    const [scrolled, setScrolled] = useState(false)
    const noVideo = isV2Path(useLocation().pathname)
    useEffect(() => {
        // Throttled to ~once per frame budget: `scroll` can fire far more
        // than 60 times a second, and calling getBoundingClientRect() (a
        // forced layout read) that often is what was actually behind the
        // flicker — not the crossfade logic itself, but the measurement
        // backing it fighting the browser for a frame budget on top of a
        // full-bleed video and a blurred nav. A plain timestamp guard
        // (rather than requestAnimationFrame) so this keeps working even
        // when the tab is backgrounded or otherwise not getting frames.
        let lastRun = 0
        const measure = () => {
            const pin = pinRef.current
            if (!pin) return
            const { top, height } = pin.getBoundingClientRect()
            const scrollable = height - window.innerHeight
            const progress = scrollable > 0 ? -top / scrollable : 0
            setScrolled(prev => {
                if (!prev && progress > SWAP_PROGRESS_ENTER) return true
                if (prev && progress < SWAP_PROGRESS_EXIT) return false
                return prev
            })
        }
        const onScroll = () => {
            const now = Date.now()
            if (now - lastRun < 16) return
            lastRun = now
            measure()
        }
        measure()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
        }
    }, [])

    return (
        <div className="v4-hero-video-pin" ref={pinRef}>
        <section className={"v4-hero-video" + (noVideo ? " v4-hero-video--light" : "")}>
            {!noVideo && (
                <div className="v4-hero-video__bg" aria-hidden="true">
                    <video
                        className="v4-hero-video__video"
                        poster={travelerPhoto}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    >
                        <source src="/videos/hero-bg.mp4" type="video/mp4" />
                    </video>
                    <div className="v4-hero-video__overlay" />
                </div>
            )}

            <div className="v4-shell v4-hero-video__content">
                {/* mode="wait": the outgoing panel fully exits before the
                    incoming one mounts. A true simultaneous crossfade was
                    tried here first, but AvatarSpotlight is a genuinely
                    heavy mount — its own typewriter interval, input state,
                    chip handlers — and animating that in at the same moment
                    the copy panel is animating out contends for the main
                    thread mid-tween, which is what actually read as
                    jank/"glitch" during the swap. Sequencing them removes
                    that overlap entirely; the gap between them is small
                    enough (0.35s) not to read as a hard cut. */}
                <div className="v4-hero-video__stage">
                    {noVideo ? (
                        <div className="v4-hero-video__avatar">
                            <AvatarSpotlight />
                        </div>
                    ) : (
                        <AnimatePresence mode="wait" initial={false}>
                            {!scrolled ? (
                                <motion.div key="copy"
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -14, pointerEvents: "none" }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                                    <span className="v4-hero-video__eyebrow">Travel Limitless · Business travel, personalized</span>
                                    <h1 className="v4-hero-video__title">
                                        A private travel assistant
                                        <br />
                                        <em>for every employee.</em>
                                    </h1>
                                    <div className="v4-hero-video__actions">
                                        <Magnetic>
                                            <Button asChild size="lg" className="h-auto rounded-xl px-6 py-3.5 text-[15px] font-bold text-white! shadow-[0_10px_28px_rgba(229,86,2,0.35)] hover:text-white! hover:shadow-[0_14px_34px_rgba(229,86,2,0.42)]">
                                                <Link to="/book-a-demo">Book a demo</Link>
                                            </Button>
                                        </Magnetic>
                                        <Magnetic>
                                            <Button asChild variant="white" size="lg" className="h-auto rounded-xl px-6 py-3.5 text-[15px] font-bold">
                                                <a href="#how-it-works">See how it works <ArrowRight size={16} strokeWidth={2.4} /></a>
                                            </Button>
                                        </Magnetic>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="avatar" className="v4-hero-video__avatar"
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -14, pointerEvents: "none" }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                                    <AvatarSpotlight />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </div>

            {!noVideo && (
            <div className="v4-hero-video__stats" aria-label="Miraee at a glance">
                {STATS.map(({ icon: Icon, value, label }) => (
                    <span className="v4-hero-video__stat" key={label}>
                        <Icon size={16} strokeWidth={2.2} />
                        <strong>{value}</strong> {label}
                    </span>
                ))}
            </div>
            )}
        </section>
        </div>
    )
}
