import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import type { MotionValue } from "framer-motion"
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import { EO, FadeUp, SectionWrapper, StaggerWords, ScrambleText, TiltCard } from "../../animations"
import { useWindowWidth } from "../../hooks/useWindowSize"
import employeeAvatar from "../../assets/miraee-role-employee.png"
import financeAvatar from "../../assets/Finance .jpg"
import managerAvatar from "../../assets/Manager Image.jpg"
import adminAvatar from "../../assets/Admin.jpg"
import planStepPhoto from "../../assets/plan.webp"
import bookStepPhoto from "../../assets/book.jpg"
import expenseStepPhoto from "../../assets/expense11.jpg"
import changeStepPhoto from "../../assets/manage.jpg"

// Verbatim ports of the V0 homepage sections the site-architecture doc calls
// for by name — layout and animation, not just the copy. Source is
// Miraee_landing_page/src/pages/Home.tsx; the content itself is catalogued in
// docs/v0-home-reference.md.
//
// Only two things are changed from V0: the colours read from V4's `--m-*`
// tokens instead of V0's hardcoded T object, and the "200+ AI agents" stat uses
// the site's current agents-plus-bots framing.

const T = {
    bg: "var(--m-paper)", bg2: "var(--m-surface)", surface2: "var(--m-soft)",
    ink: "var(--m-maroon)", maroon: "var(--m-maroon)", orange: "var(--m-orange)",
    muted: "var(--m-muted)", border: "var(--m-line)", card: "var(--m-surface)",
    cream: "#FBF6F2", accent: "var(--m-orange)",
}
// Font migration: headings use var(--font-heading) (Instrument Sans), body
// copy/labels/stats use var(--font-sans) (Geist) — see global tokens in
// src/index.css. The former F/FB (Plus Jakarta Sans/Sora) constants were
// removed once every inline fontFamily below was converted.

function SectionLabel({ children, accent = T.orange }: { children: string; accent?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, scale: 0.88, x: -10 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EO }}
            style={{ marginBottom: 24, display: "inline-flex" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.11em", textTransform: "uppercase", color: accent, border: "1.5px solid " + T.border, borderRadius: 100, padding: "5px 14px" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                <ScrambleText text={children} />
            </span>
        </motion.div>
    )
}

function PlaneGlyph({ size = 15, color = T.orange, rotate = 0 }: { size?: number; color?: string; rotate?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rotate}deg)`, display: "block" }}>
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.4.7c-.2.4-.1.9.3 1.2L8.7 12l-2 3H4l-1 1 3 2 2 3 1-1v-2.7l3-2 3.3 5.2c.3.4.8.6 1.3.4l.7-.3c.4-.2.6-.6.5-1.1z" />
        </svg>
    )
}

function TypingDots({ color = T.muted, active = true }: { color?: string; active?: boolean }) {
    return (
        <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
            {[0, 1, 2].map(i => (
                <motion.span key={i} animate={active ? { opacity: [0.25, 1, 0.25], y: [0, -3, 0] } : { opacity: 0.25, y: 0 }} transition={{ duration: 1, repeat: active ? Infinity : 0, delay: i * 0.18 }} style={{ width: 5, height: 5, borderRadius: "50%", background: color, display: "inline-block" }} />
            ))}
        </span>
    )
}

function SlideIn({ children, from = "left", delay = 0, distance = 60, style }: { children: ReactNode; from?: "left" | "right" | "bottom"; delay?: number; distance?: number; style?: CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-5% 0px" })
    const x = from === "left" ? -distance : from === "right" ? distance : 0
    const y = from === "bottom" ? distance : 0
    return (
        <motion.div ref={ref} style={style}
            initial={{ x, y, opacity: 0 }}
            animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.85, delay, ease: EO }}>
            {children}
        </motion.div>
    )
}

function CheckDot({ size = 16 }: { size?: number }) {
    return (
        <span style={{ width: size, height: size, borderRadius: "50%", background: "#3BA55D", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
    )
}

// ─── STAT STRIP ──────────────────────────────────────────────────────────────
// Infinite marquee on maroon, skewed by scroll velocity so the page feels
// physically connected. All eight V0 data points.
export function StatStrip() {
    const stripRef = useRef<HTMLDivElement>(null)
    // The marquee row is ~4000px wide. Its scroll-velocity skew and its looping
    // translate were being recomputed for the whole 8800px page, long after the
    // strip had left the screen. Gating on view keeps the effect identical where
    // you can see it and stops the compositor touching it where you cannot.
    const stripInView = useInView(stripRef, { margin: "200px 0px" })
    const STATS = [
        { val: "2M+", label: "Properties" }, { val: "500+", label: "Airlines" },
        { val: "6", label: "Specialized agents" }, { val: "125M+", label: "Travelers reached" },
        { val: "20-30%", label: "Wholesale savings" }, { val: "24/7", label: "Human support" },
        { val: "100%", label: "Agent-managed" }, { val: "1", label: "Platform" },
    ]
    const items = [...STATS, ...STATS]
    const { scrollY } = useScroll()
    const velo = useVelocity(scrollY)
    const skewRaw = useTransform(velo, [-1500, 1500], [-5, 5])
    const skewX = useSpring(skewRaw, { stiffness: 250, damping: 30 })
    return (
        <div ref={stripRef} style={{ background: T.maroon, overflow: "hidden", padding: "18px 0", display: "flex", alignItems: "center" }}>
            <motion.div
                animate={stripInView ? { x: ["0%", "-50%"] } : { x: "0%" }}
                transition={{ duration: 28, repeat: stripInView ? Infinity : 0, ease: "linear" }}
                style={{ display: "flex", gap: 0, width: "max-content", skewX: stripInView ? skewX : 0, willChange: "transform" }}>
                {items.map((s, i) => (
                    // flexShrink:0 is load-bearing. index.css gives every div inside a
                    // registered site wrapper `min-width: 0`, which lets these
                    // nowrap items shrink below their text width and overlap.
                    <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0, padding: "0 36px", borderRight: "1px solid rgba(251,246,242,0.12)", whiteSpace: "nowrap" }}>
                        <span style={{ fontSize: 20, fontFamily: "var(--font-sans)", fontWeight: 800, color: T.cream, letterSpacing: "-0.02em", marginRight: 10 }}>{s.val}</span>
                        <span style={{ fontSize: 12, fontFamily: "var(--font-sans)", fontWeight: 500, color: "rgba(251,246,242,0.55)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

// ─── KINETIC TYPE BAND ───────────────────────────────────────────────────────
// Giant type strips sliding opposite ways with scroll; second row is outline only.
//
// This band sits directly after HowItWorks's four stacked 100vh sticky panels,
// so it is on screen at the single heaviest moment on the page: their ghost
// numbers and product cards are still un-pinning and repainting while this
// mounts. Its own cost has to be kept low precisely because it cannot avoid
// landing on top of that.
//
// Three changes from the source, none of them visual removals:
//   - font-size capped at 4.5rem instead of 7rem, and the outlined row's
//     stroke narrowed to 1.25px — the outline is a genuinely expensive paint
//     (stroking every glyph in a 900-weight face at up to 112px, across a
//     long repeated string), so less glyph area is the direct lever.
//   - the line repeats 3 times instead of 4 — still comfortably covers the
//     ±10%/+4% horizontal travel with margin, just less text to lay out.
//   - `contain: paint` scopes each row's repaint to its own box instead of
//     being dragged into the repaint the neighbouring sticky panels are doing
//     at the same moment; `useReducedMotion` freezes the drift instead of
//     tracking scroll, matching every other scroll-linked effect on this page.
export function KineticBand({ line1, line2, bg = T.bg, ink = T.ink }: { line1: string; line2: string; bg?: string; ink?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "4%"])
    const x2 = useTransform(scrollYProgress, [0, 1], ["4%", "-10%"])
    const rowStyle: CSSProperties = { whiteSpace: "nowrap", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.4rem,6vw,4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.06, userSelect: "none", contain: "paint" }
    return (
        <div ref={ref} style={{ overflow: "hidden", padding: "clamp(40px,6vw,64px) 0 clamp(32px,5vw,56px)", background: bg }}>
            <motion.div style={{ ...rowStyle, x: reduced ? "0%" : x1, color: ink, willChange: "transform" }}>{(line1 + " · ").repeat(3)}</motion.div>
            <motion.div style={{ ...rowStyle, x: reduced ? "0%" : x2, color: "transparent", WebkitTextStroke: `1.25px ${ink}`, opacity: 0.6, willChange: "transform" }}>{(line2 + " · ").repeat(3)}</motion.div>
        </div>
    )
}

// ─── HOW IT WORKS ────────────────────────────────────────────────────────────
const STEPS = [
    { num: "01", title: "Plan", body: "Describe the trip in plain language. Miraee builds an in-policy itinerary in seconds.", accent: T.orange, bg: T.bg, tag: "Plain language" },
    { num: "02", title: "Book", body: "Flights, hotels and cars from Mondee wholesale inventory: real savings, one tap.", accent: T.accent, bg: T.bg2, tag: "Wholesale inventory" },
    { num: "03", title: "Expense", body: "Receipts, reports and reconciliation handled automatically. No forms, no chasing.", accent: T.orange, bg: T.surface2, tag: "Zero forms" },
    { num: "04", title: "Change", body: "Plans shift, the agent rebooks itself: within policy, before you even ask.", accent: T.accent, bg: T.bg, tag: "Self-rebooking" },
]

// One real photo per step, framed behind the chat-card mock — kept as a
// side lookup (not merged into STEPS) so STEPS' own shape stays simple.
// All four are lifestyle photos, so all use object-fit: cover.
const STEP_PHOTOS: { src: string; fit: "cover" | "contain" }[] = [
    { src: planStepPhoto, fit: "cover" },
    { src: bookStepPhoto, fit: "cover" },
    { src: expenseStepPhoto, fit: "cover" },
    { src: changeStepPhoto, fit: "cover" },
]

// Per-step product vignette, rendered at >=1200px only.
function StepVisual({ index, accent, inView }: { index: number; accent: string; inView: boolean }) {
    const card: CSSProperties = { background: T.card, border: "1px solid " + T.border, borderRadius: 20, boxShadow: "0 24px 64px rgba(69,14,20,0.09)", padding: 20, width: 300, fontFamily: "var(--font-sans)" }
    const rise = { initial: { opacity: 0, y: 32 }, animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }, transition: { duration: 0.7, delay: 0.35, ease: EO } }

    if (index === 0) return (
        <motion.div {...rise} style={{ ...card, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ alignSelf: "flex-end", maxWidth: "92%", background: T.maroon, color: T.cream, borderRadius: "14px 14px 4px 14px", padding: "9px 13px", fontSize: 12.5, lineHeight: 1.5 }}>Fly me to Singapore Mar 15, hotel near the client office</div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, alignSelf: "flex-end" }}>
                {[8, 14, 20, 12, 16, 9, 13].map((h, i) => (
                    <motion.div key={i} animate={inView ? { height: [h * 0.4, h, h * 0.4] } : {}} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.1 }} style={{ width: 2.5, height: h, borderRadius: 2, background: accent, opacity: 0.75 }} />
                ))}
                <span style={{ fontSize: 10, color: T.muted, marginLeft: 6 }}>or say it out loud</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TypingDots color={accent} active={inView} />
                <span style={{ fontSize: 11, color: T.muted }}>Miraee is on it</span>
            </div>
        </motion.div>
    )

    if (index === 1) return (
        <motion.div {...rise} style={{ ...card, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: T.ink }}>SFO</span>
                <div style={{ flex: 1, position: "relative", margin: "0 10px", height: 16, display: "flex", alignItems: "center" }}>
                    <div style={{ width: "100%", height: 1.5, overflow: "hidden", opacity: 0.6 }}>
                        <motion.div animate={inView ? { x: [0, -24] } : { x: 0 }} transition={{ duration: 1.6, repeat: inView ? Infinity : 0, ease: "linear" }} style={{ width: "calc(100% + 24px)", height: "100%", backgroundImage: `repeating-linear-gradient(90deg, ${accent} 0 5px, transparent 5px 12px)` }} />
                    </div>
                    <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}><PlaneGlyph size={13} color={accent} rotate={45} /></div>
                </div>
                <span style={{ fontSize: 15, fontWeight: 800, color: T.ink }}>SIN</span>
            </div>
            {[{ t: "SQ 31 · Nonstop · 17h 25m", p: "$1,240", best: true }, { t: "NH 107 · 1 stop · 21h 10m", p: "$1,388", best: false }, { t: "UA 28 · 1 stop · 22h 45m", p: "$1,512", best: false }].map((o, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }} transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease: EO }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: 12, border: o.best ? "1.5px solid " + accent : "1px solid " + T.border, background: o.best ? "rgba(229,86,2,0.05)" : "transparent" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 11.5, fontWeight: 600, color: o.best ? T.ink : T.muted }}>{o.t}</span>
                        {o.best && <span style={{ fontSize: 9.5, fontWeight: 700, color: accent, letterSpacing: "0.06em", textTransform: "uppercase" }}>Best · in policy</span>}
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: o.best ? T.ink : T.muted }}>{o.p}</span>
                </motion.div>
            ))}
        </motion.div>
    )

    if (index === 2) return (
        <motion.div {...rise} style={{ ...card, position: "relative" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, marginBottom: 10 }}>Trip request · Singapore</div>
            {["SQ 31 · SFO to SIN · $1,240", "2 nights · client-side hotel", "Total $1,596 · under budget"].map((t, i) => (
                <div key={i} style={{ fontSize: 11.5, color: T.muted, padding: "7px 0", borderTop: "1px solid " + T.border }}>{t}</div>
            ))}
            <motion.div initial={{ opacity: 0, scale: 2.4, rotate: -4 }} animate={inView ? { opacity: 1, scale: 1, rotate: -12 } : { opacity: 0, scale: 2.4, rotate: -4 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.9 }}
                style={{ position: "absolute", right: 14, bottom: 14, border: "2.5px solid " + accent, color: accent, borderRadius: 8, padding: "5px 12px", fontSize: 13, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", background: "rgba(255,255,255,0.85)" }}>
                Expensed
            </motion.div>
        </motion.div>
    )

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 300 }}>
            {[{ t: "Calendars synced", s: "Flight + hotel on your schedule" }, { t: "Difference of rebooking paid", s: "$18.40 airport cab · auto-coded" }, { t: "Rebook confirmed", s: "6:00 AM cancelled → on the 9:15 AM" }].map((n, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }} transition={{ duration: 0.55, delay: 0.4 + i * 0.2, ease: EO }}
                    style={{ background: T.card, border: "1px solid " + T.border, borderRadius: 16, boxShadow: "0 16px 40px rgba(69,14,20,0.07)", padding: "13px 16px", display: "flex", alignItems: "center", gap: 11, fontFamily: "var(--font-sans)" }}>
                    <CheckDot size={17} />
                    <div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>{n.t}</div>
                        <div style={{ fontSize: 10.5, color: T.muted }}>{n.s}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

function StepPanel({ num, title, body, accent, bg, tag, index, total, progress }: typeof STEPS[0] & { index: number; total: number; progress: MotionValue<number> }) {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    const isLast = index === total - 1

    // Real card-stack mechanics: every card lives in the SAME sticky
    // viewport (see HowItWorks below), absolutely positioned on top of each
    // other, and `progress` is one continuous 0→1 value for the whole
    // section — not four separate sticky elements each with their own
    // release timing, which was the actual bug in the previous attempt.
    // With four independent sticky panels in four non-overlapping wrapper
    // divs, panel N fully un-stuck and scrolled away before panel N+1's
    // wrapper even began — they never occupied the viewport at the same
    // time, so there was nothing to visibly stack. A single shared
    // progress value driving absolutely-positioned siblings is the only way
    // to get one card sliding up and over another still on screen.
    const segment = 1 / total
    const overlap = 0.5 // fraction of a segment spent transitioning
    // index 0 has nothing to slide in from — pin its "enter" window before
    // scroll starts (progress is always >= 0) so it clamps to y:0 from the
    // first frame, without needing to special-case the hook call itself.
    const enterStart = index === 0 ? -1 : index * segment - overlap * segment
    const enterEnd = index === 0 ? -0.999 : index * segment
    const y = useTransform(progress, [enterStart, enterEnd], ["100%", "0%"])

    // The last card is never covered, so its "recede" window is pinned
    // past progress's reachable range (0–1) — clamps to scale/brightness 1
    // for the entire scroll, same trick as above.
    const recedeStart = isLast ? 1.5 : (index + 1) * segment - overlap * segment
    const recedeEnd = isLast ? 2 : (index + 1) * segment
    const scale = useTransform(progress, [recedeStart, recedeEnd], [1, 0.92])
    const brightness = useTransform(progress, [recedeStart, recedeEnd], [1, 0.82])
    const filter = useTransform(brightness, v => `brightness(${v})`)

    // Inner content's entrance animations (ghost number, text, photo) fire
    // once this card has finished sliding into place — reusing the old
    // `inView`-gated JSX below so that part of the component is unchanged.
    const [inView, setInView] = useState(index === 0)
    useMotionValueEvent(progress, "change", v => setInView(v >= enterEnd - 0.001))

    return (
        <motion.div className="v4-step-panel"
            style={{ position: "absolute", inset: 0, background: bg, display: "flex", alignItems: "center", overflow: "hidden", zIndex: index + 1, borderRadius: index > 0 ? (isMobile ? "20px 20px 0 0" : "40px 40px 0 0") : 0, boxShadow: index > 0 ? "0 -50px 90px -30px rgba(15,4,7,0.32)" : "none", transformOrigin: "top center", y, scale, filter }}>
            {/* Soft shadow along the top edge — the visual cue that this
                panel is a card sliding up and settling over the one behind
                it, not a hard cut replacing it. */}
            {index > 0 && (
                <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120, background: "linear-gradient(180deg, rgba(15,4,7,0.14), transparent)", zIndex: 1, pointerEvents: "none" }} />
            )}
            {/* Massive ghost number. willChange is gated on inView rather than
                permanent: all four panels are mounted as siblings for the whole
                section, so an unconditional will-change here means four
                GPU-promoted 28vw-glyph layers held simultaneously for the entire
                scroll — right through the transition into the kinetic band that
                follows. Only the panel actually settling needs the layer. */}
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={inView ? { opacity: 0.045, x: 0 } : { opacity: 0, x: 60 }}
                transition={{ duration: 0.9, ease: EO }}
                style={{ position: "absolute", right: isMobile ? -20 : -10, top: "50%", transform: "translateY(-50%)", fontSize: isMobile ? "42vw" : "28vw", fontFamily: "var(--font-heading)", fontWeight: 900, color: T.ink, lineHeight: 1, userSelect: "none", pointerEvents: "none", letterSpacing: "-0.06em", willChange: inView ? "transform, opacity" : "auto" }}>
                {num}
            </motion.div>
            {/* Orange side accent bar */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EO }}
                style={{ position: "absolute", left: 0, top: "15%", height: "70%", width: 3, background: accent, transformOrigin: "top", borderRadius: 2 }} />
            {/* Step counter top-right */}
            <div style={{ position: "absolute", top: 92, right: isMobile ? 20 : 64, display: "flex", alignItems: "center", gap: 12 }}>
                {Array.from({ length: total }).map((_, i) => (
                    <motion.div key={i}
                        animate={{ width: i === index ? 24 : 6, background: i === index ? accent : T.border }}
                        transition={{ duration: 0.4 }}
                        style={{ height: 6, borderRadius: 3 }} />
                ))}
            </div>
            {w >= 1200 && (
                <div style={{ position: "absolute", right: "7%", top: "50%", transform: "translateY(-50%)" }}>
                    {/* A real photo as the visual anchor for every step, the
                        chat-card mock floating over its bottom-left corner
                        and spilling half outside the frame edge — same
                        layered-overlay depth as the homepage hero's photo +
                        flight card. */}
                    <div style={{ position: "relative", width: 560, height: 400 }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
                            transition={{ duration: 0.9, ease: EO }}
                            style={{ position: "absolute", inset: 0, padding: 14, background: T.cream, borderRadius: 28, boxShadow: "0 50px 100px -24px rgba(69,14,20,0.45), 0 1px 0 rgba(255,255,255,0.7) inset" }}>
                            <img src={STEP_PHOTOS[index].src} alt="" style={{ width: "100%", height: "100%", objectFit: STEP_PHOTOS[index].fit, borderRadius: 18, display: "block", background: T.card }} />
                        </motion.div>
                        <div style={{ position: "absolute", left: -44, bottom: -32, zIndex: 2 }}>
                            <StepVisual index={index} accent={accent} inView={inView} />
                        </div>
                    </div>
                </div>
            )}
            <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "0 24px" : isTablet ? "0 40px" : "0 80px", maxWidth: isMobile ? "100%" : isTablet ? "100%" : 720 }}>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, delay: 0.05, ease: EO }}
                    style={{ marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent }}>
                    <span style={{ width: 20, height: 1.5, background: accent, display: "inline-block" }} />
                    {tag}
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: EO }}
                    style={{ fontSize: 13, fontFamily: "var(--font-sans)", fontWeight: 700, color: accent, letterSpacing: "0.08em", margin: "0 0 12px" }}>
                    {num} / {String(total).padStart(2, "0")}
                </motion.p>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "clamp(3rem,12vw,5rem)" : isTablet ? "clamp(3.5rem,8vw,5.5rem)" : "clamp(4rem,7vw,7rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.045em", color: T.ink, margin: "0 0 32px" }}>
                    <StaggerWords text={title} delay={0.15} stagger={0.08} />
                </h3>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0.35, ease: EO }}
                    style={{ fontSize: isMobile ? 15 : 18, fontFamily: "var(--font-sans)", fontWeight: 400, lineHeight: 1.7, color: T.muted, margin: 0, maxWidth: 520 }}>
                    {body}
                </motion.p>
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: 64 } : { width: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: EO }}
                    style={{ height: 2, background: accent, borderRadius: 2, marginTop: 40 }} />
            </div>
        </motion.div>
    )
}

export function HowItWorks() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    const total = STEPS.length
    // The single scroll track every card's `progress` (0→1) is measured
    // against — see StepPanel above for why this has to be one shared
    // value rather than each card tracking its own separate range.
    const trackRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress: progress } = useScroll({ target: trackRef, offset: ["start start", "end end"] })
    return (
        <section id="how-it-works" style={{ position: "relative" }}>
            <div style={{ background: T.bg2, padding: isMobile ? "80px 20px 40px" : isTablet ? "80px 40px 40px" : "80px 64px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div>
                    <SectionLabel>How it works</SectionLabel>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "1.1rem" : "1.2rem", fontWeight: 500, color: T.muted, margin: 0, letterSpacing: "-0.01em" }}>
                        One agent, the whole journey: plan, book, expense, change.
                    </h2>
                </div>
                <span style={{ fontSize: 13, fontFamily: "var(--font-sans)", color: T.muted }}>Voice, chat or avatar · It remembers your preferences.</span>
            </div>
            {/* trackRef's height is what gives the whole stack its scroll
                room — total dwell across all N cards, ~1.4 viewports each.
                The inner div is the one actual sticky viewport; every card
                is an absolutely-positioned sibling inside it (see
                StepPanel), so they can genuinely overlap on screen. */}
            <div ref={trackRef} style={{ position: "relative", height: `${total * (isMobile ? 130 : 150)}vh` }}>
                <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
                    {STEPS.map((step, i) => (
                        <StepPanel key={step.num} {...step} index={i} total={total} progress={progress} />
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── EXPERIENCES (scroll-linked horizontal pan) ──────────────────────────────
// V0's own six images (docs/v0-home-reference.md), hotlinked from
// framerusercontent.com exactly as V0 itself references them — not a local
// substitute. That CDN is outside this project's control, so if a link ever
// breaks the tile silently loses its photo; V0 carries the same exposure.
const ROLES = [
    { tag: "Experiences", headline: "Not bookable anywhere else.", body: "The city after 5pm, the festival, the family weekend bolted onto a work trip. Booked and expensed separately, one tap.", stat: "90%", statLabel: "of experiences", accent: T.accent, bg: T.bg, img: "" },
    { tag: "01", headline: "Festivals and culture", body: "", stat: "", statLabel: "", accent: T.orange, bg: T.surface2, img: "https://framerusercontent.com/images/LMZ3ugguI8VTpFeCKuOrrEUXDY.jpg" },
    { tag: "02", headline: "Once-in-a-trip moments", body: "", stat: "", statLabel: "", accent: T.accent, bg: T.bg, img: "https://framerusercontent.com/images/lS1MsTKdDET0sJLlXRCt44HdDFY.jpg" },
    { tag: "03", headline: "Local performances", body: "", stat: "", statLabel: "", accent: T.orange, bg: T.surface2, img: "https://framerusercontent.com/images/AANz7Gv2v4OLJICanNZTO4cDyE.jpg" },
    { tag: "04", headline: "Markets and makers", body: "", stat: "", statLabel: "", accent: T.accent, bg: T.bg, img: "https://framerusercontent.com/images/v0MpWd9NHbV98F3GxQZzhtAp0o.jpg" },
    { tag: "05", headline: "The bleisure weekend", body: "", stat: "", statLabel: "", accent: T.orange, bg: T.surface2, img: "https://framerusercontent.com/images/OLnrOVVrjhLnXULOt0RWBQJJ30.jpg" },
    { tag: "06", headline: "Food and discovery", body: "", stat: "", statLabel: "", accent: T.accent, bg: T.bg, img: "https://framerusercontent.com/images/KqpDMVbbYgwoEAK6vQioHlDmeQ.jpg" },
]

function RoleCard({ tag, headline, body, stat, statLabel, accent, bg, img, index }: typeof ROLES[0] & { index: number }) {
    const [hov, setHov] = useState(false)
    // Separate from imgInView below: the card's own entrance (opacity/y)
    // must not depend on a ref that only exists when `img` is set — ROLES[0]
    // (the text-only "Not bookable anywhere else" intro tile, img: "") never
    // renders that inner div, so imgRef.current stayed null forever and the
    // card sat at its initial opacity: 0 permanently — the "white gap"
    // before card 01 in the row was actually this invisible-but-still-
    // taking-up-width intro card, not a scroll/positioning bug at all.
    const cardRef = useRef<HTMLDivElement>(null)
    const cardInView = useInView(cardRef, { once: true, margin: "-8% 0px" })
    const imgRef = useRef<HTMLDivElement>(null)
    const imgInView = useInView(imgRef, { once: true, margin: "-8% 0px" })
    const reduced = useReducedMotion()
    return (
        <TiltCard max={9} style={{ width: "min(380px, 84vw)", flexShrink: 0, display: "flex", borderRadius: 24 }}>
            <motion.div ref={cardRef} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: reduced ? 0 : index * 0.06, ease: EO }}
                style={{ flex: 1, background: hov ? T.card : bg, border: "1px solid " + T.border, borderRadius: 24, padding: 36, display: "flex", flexDirection: "column", gap: 20, boxShadow: hov ? "0 24px 70px rgba(69,14,20,0.16)" : "0 1px 0 rgba(69,14,20,0.03)", transition: "box-shadow 0.35s ease, background 0.3s ease" }}>
                <motion.span
                    animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                    style={{ display: "inline-block", fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, border: "1.5px solid " + T.border, borderRadius: 100, padding: "4px 12px", alignSelf: "flex-start" }}>{tag}</motion.span>
                <p style={{ fontSize: 22, fontFamily: "var(--font-heading)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 12px", color: T.ink }}>{headline}</p>
                {img ? (
                    <div ref={imgRef} style={{ borderRadius: 14, overflow: "hidden", height: 200, position: "relative" }}>
                        {/* Idle Ken Burns drift while the card sits unhovered, so the tile
                            never looks like a static photo — it settles the instant a
                            pointer arrives and TiltCard's own hover scale takes over. */}
                        <motion.img src={img} alt={headline}
                            initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.25 }}
                            animate={imgInView ? {
                                clipPath: "inset(0% 0% 0% 0%)",
                                scale: hov ? 1.1 : (reduced ? 1 : [1, 1.06, 1]),
                            } : {}}
                            transition={{
                                clipPath: { duration: 0.9, ease: EO },
                                scale: hov || reduced
                                    ? { duration: 0.6, ease: EO }
                                    : { duration: 9 + index * 1.3, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
                            }}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", willChange: "clip-path, transform" }} />
                        {/* Brand wash: a duotone tint at rest that clears on hover so the
                            photo reveals itself in full colour, like light hitting it. */}
                        <div aria-hidden="true" style={{
                            position: "absolute", inset: 0, pointerEvents: "none",
                            background: `linear-gradient(155deg, rgba(69,14,20,${hov ? 0.05 : 0.3}) 0%, rgba(229,86,2,${hov ? 0.02 : 0.16}) 60%, transparent 100%)`,
                            mixBlendMode: "multiply",
                            transition: "background 0.5s ease",
                        }} />
                    </div>
                ) : null}
                {body ? <p style={{ fontSize: 14, fontFamily: "var(--font-sans)", lineHeight: 1.65, color: T.muted, margin: 0 }}>{body}</p> : null}
                {stat ? (
                    <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid " + T.border }}>
                        <div style={{ fontSize: 36, fontFamily: "var(--font-heading)", fontWeight: 800, color: accent, letterSpacing: "-0.04em", lineHeight: 1 }}>{stat}</div>
                        <div style={{ fontSize: 12, fontFamily: "var(--font-sans)", fontWeight: 500, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{statLabel}</div>
                    </div>
                ) : (
                    <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid " + T.border, display: "flex", alignItems: "center", gap: 8 }}>
                        <PlaneGlyph size={14} rotate={45} color={accent} />
                        <span style={{ fontSize: 12, fontFamily: "var(--font-sans)", fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>One tap away</span>
                    </div>
                )}
            </motion.div>
        </TiltCard>
    )
}

export function Experiences() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    const sectionRef = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const cardWidth = 380
    const gap = 20
    // Pan ONLY by the amount the track overflows the viewport. Wide screens fit
    // every card: panPx = 0, and no pinned scroll happens at all.
    const pad = Math.min(64, Math.max(32, w * 0.05))
    const contentW = ROLES.length * cardWidth + (ROLES.length - 1) * gap + 64
    const panPx = Math.max(0, Math.round(pad + contentW - w))
    // Gate the rAF loop below to roughly when the section could be on
    // screen — matching StatStrip's own inView gate elsewhere in this file,
    // so this doesn't become a permanent per-frame cost for the whole time
    // Home is mounted, most of which this section isn't anywhere near.
    const sectionInView = useInView(sectionRef, { margin: "400px 0px" })

    useEffect(() => {
        if (isMobile || isTablet || panPx === 0 || !sectionInView) return
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return
        // V0 ran this under SmoothScroll (a wheel-event lerp applied
        // site-wide), which meant every scroll gesture arrived as many small
        // eased steps — the pan could never visually skip past its own
        // starting frame. V4 dropped SmoothScroll everywhere else for
        // performance, so a single fast trackpad flick now applies its full
        // native delta in one tick: without any smoothing here, the pan
        // would snap straight from 0 to wherever that flick landed, and the
        // section reads as starting mid-pan instead of flush with the H1.
        // Easing `current` toward the scroll-derived `target` every frame
        // (instead of writing `target` straight to the transform) restores
        // that same "always animates through its own start" feel, scoped to
        // just this one number instead of hijacking scroll globally.
        let raf = 0
        let current = 0
        const loop = () => {
            const scrolledIn = -section.getBoundingClientRect().top
            const target = Math.max(0, Math.min(1, scrolledIn / panPx))
            current += (target - current) * 0.12
            if (Math.abs(target - current) < 0.0005) current = target
            track.style.transform = `translateX(${-current * panPx}px)`
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(raf)
    }, [isMobile, isTablet, panPx, sectionInView])

    if (isMobile || isTablet) {
        return (
            <SectionWrapper>
                <section id="experiences" style={{ background: T.bg, padding: isMobile ? "80px 20px" : "80px 40px" }}>
                    <div style={{ marginBottom: 40 }}>
                        <SectionLabel>Experiences</SectionLabel>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "clamp(1.8rem,8vw,2.4rem)" : "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, margin: 0 }}>
                            <StaggerWords text="Business travel," /><br /><StaggerWords text="meet the trips people love." delay={0.15} />
                        </h2>
                    </div>
                    <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, WebkitOverflowScrolling: "touch" }}>
                        {ROLES.map((role, index) => (
                            <div key={role.tag} style={{ minWidth: isMobile ? "min(300px,80vw)" : 340, flexShrink: 0 }}>
                                <RoleCard {...role} index={index} />
                            </div>
                        ))}
                    </div>
                </section>
            </SectionWrapper>
        )
    }

    return (
        <section id="experiences" ref={sectionRef} style={{ position: "relative", height: panPx === 0 ? "100vh" : `calc(${panPx}px + 100vh)`, background: T.bg }}>
            <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ paddingLeft: "clamp(32px,5vw,64px)", paddingRight: "clamp(32px,5vw,64px)", marginBottom: 48 }}>
                    <SectionLabel>Experiences</SectionLabel>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, margin: 0 }}>
                        <StaggerWords text="Business travel, meet the" /><br />
                        <StaggerWords text="trips people love." delay={0.15} />
                    </h2>
                </div>
                <div style={{ overflow: "hidden", paddingLeft: "clamp(32px,5vw,64px)" }}>
                    <div ref={trackRef} style={{ display: "flex", gap: 20, willChange: "transform" }}>
                        {ROLES.map((role, index) => <RoleCard key={role.tag} {...role} index={index} />)}
                        <div style={{ minWidth: 64, flexShrink: 0 }} />
                    </div>
                </div>
                {panPx > 0 && (
                    <FadeUp style={{ paddingLeft: "clamp(32px,5vw,64px)", marginTop: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 28, height: 1, background: T.orange }} />
                            <span style={{ fontSize: 11, fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted }}>scroll to explore</span>
                        </div>
                    </FadeUp>
                )}
            </div>
        </section>
    )
}

// ─── BUSINESS CASE ───────────────────────────────────────────────────────────
const CASE_STATS = [
    { stat: "20-30%", label: "Travel savings, validated apples-to-apples vs. incumbents", accent: T.orange },
    { stat: "100%", label: "Of the journey managed by the agent, end to end", accent: T.accent },
    { stat: "1", label: "Platform for business and personal travel alike", accent: T.orange },
]

// A 2x2 role grid — colour-tinted card, copy on the left, a real person's
// photo bleeding to the card's own edges on the right. Same reference
// pattern as a well-known expense-management competitor's "who this is
// for" section, adapted to Miraee's four seats instead of one persona per
// finance function.
const ROLE_GRID = [
    { photo: employeeAvatar, title: "Employees", body: "Ask once. Get a complete, in-policy trip booked before you sit back down — no forms, no chasing receipts.", bg: T.surface2 },
    { photo: financeAvatar, title: "Finance teams", body: "See spend the moment it's booked, not when the invoice lands weeks later. Reconciliation runs itself.", bg: T.cream },
    { photo: managerAvatar, title: "Managers", body: "Routine trips self-book inside policy. What actually reaches your queue needs a real decision.", bg: T.cream },
    { photo: adminAvatar, title: "Admins", body: "Set the policy once; it's applied at search on every trip. One dashboard for the whole program.", bg: T.surface2 },
]

function CaseVoices() {
    const w = useWindowWidth()
    const isMobile = w < 640
    return (
        <div style={{ marginTop: 64 }}>
            <span style={{ display: "block", fontSize: 10.5, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, marginBottom: 20, opacity: 0.7 }}>Built for every seat</span>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
                {ROLE_GRID.map((r, i) => (
                    <FadeUp key={r.title} delay={i * 0.08}>
                        <div style={{ display: "flex", minHeight: 220, borderRadius: 20, overflow: "hidden", background: r.bg }}>
                            <div style={{ flex: "1 1 55%", padding: isMobile ? 24 : 32, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
                                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 800, color: T.ink, margin: 0, letterSpacing: "-0.01em" }}>{r.title}</h3>
                                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.6, color: T.muted, margin: 0 }}>{r.body}</p>
                            </div>
                            <div style={{ flex: "0 0 40%", position: "relative" }}>
                                <img src={r.photo} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                        </div>
                    </FadeUp>
                ))}
            </div>
        </div>
    )
}

export function BusinessCase({ children }: { children?: ReactNode }) {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    return (
        <SectionWrapper>
            <section id="proof" style={{ background: T.bg2, padding: isMobile ? "80px 20px" : isTablet ? "80px 40px" : "120px 64px" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                    <SectionLabel accent={T.accent}>The business case</SectionLabel>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "clamp(1.8rem,8vw,2.4rem)" : "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, margin: "0 0 56px" }}>
                        <StaggerWords text="Loved by employees." /><br />
                        <span style={{ color: T.orange }}><StaggerWords text="Trusted by finance." delay={0.15} /></span>
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 32 : 48 }}>
                        {CASE_STATS.map((item, i) => (
                            <FadeUp key={item.stat} delay={i * 0.1}>
                                <div style={{ borderTop: "2px solid " + T.border, paddingTop: 24 }}>
                                    <div style={{ fontSize: isMobile ? 44 : 56, fontFamily: "var(--font-heading)", fontWeight: 800, color: item.accent, letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 14 }}>{item.stat}</div>
                                    <p style={{ fontSize: 15, fontFamily: "var(--font-sans)", lineHeight: 1.6, color: T.muted, margin: 0 }}>{item.label}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                    <CaseVoices />
                    {children}
                </div>
            </section>
        </SectionWrapper>
    )
}

// ─── CTA ROUTES — dotted world map with flowing flight arcs ──────────────────
// Verbatim port of V0's CtaRoutes (Home.tsx:218). Dotted continents from a
// bitmap, seven great-circle arcs with flowing dashes, planes travelling each
// arc via SMIL animateMotion, and pulsing hub pings at eight cities.
const WORLD_ROWS = [
    "0000000011000111100000000000001111100000",
    "0000000111100111100000111111111111110000",
    "0111101111111110001011111111111111111100",
    "0111011111111110001111111111111111111100",
    "0000111111111100011111111111111111111000",
    "0000111111111000111111111111111111110000",
    "0000011111110001111111111111111111100000",
    "0000011110000011111111110111101111000000",
    "0000001110000011111111100110011110000000",
    "0000000110000011111101100000011111000000",
    "0000000001111000011111000000001111110000",
    "0000000001111100011111100000000111000000",
    "0000000001111100011111000000000111100000",
    "0000000001111000011110000000001111110000",
    "0000000001110000011100000000001111100000",
    "0000000001100000000000000000000000001000",
    "0000000001100000000000000000000000011000",
    "0000000001000000000000000000000000000000",
]
// Hub px coords in the 1440x760 viewBox: SFO NYC LON DXB SIN SYD TYO GRU
const HUBS: Array<[number, number]> = [[248, 209], [442, 205], [738, 173], [954, 285], [1152, 399], [1343, 551], [1292, 228], [554, 513]]
const FLIGHT_ARCS = [
    "M248,209 Q345,130 442,205",
    "M442,205 Q590,90 738,173",
    "M738,173 Q850,170 954,285",
    "M954,285 Q1055,320 1152,399",
    "M1152,399 Q1255,440 1343,551",
    "M248,209 Q760,40 1292,228",
    "M554,513 Q640,300 738,173",
]

export function CtaRoutes() {
    const reduce = useReducedMotion()
    const dots: Array<[number, number]> = []
    WORLD_ROWS.forEach((row, r) => {
        for (let c = 0; c < row.length; c++) {
            if (row[c] === "1") dots.push([c * 36 + 18, r * 38 + 40])
        }
    })
    return (
        <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {/* Dotted continents */}
            <g>
                {dots.map(([dx, dy], i) => (
                    <circle key={i} cx={dx} cy={dy} r={3.2} fill={T.cream} opacity={0.09} />
                ))}
            </g>
            {/* Flight arcs: dashed, flowing */}
            {FLIGHT_ARCS.map((d, i) => (
                <motion.path key={i} d={d} fill="none" stroke={T.orange} strokeOpacity={0.32} strokeWidth={1.3} strokeDasharray="4 8"
                    animate={reduce ? undefined : { strokeDashoffset: [0, -96] }}
                    transition={{ duration: 7 + (i % 3) * 2, repeat: Infinity, ease: "linear" }} />
            ))}
            {/* Travelling flights along each arc. SMIL, so reduced motion has to
                be honoured by simply not rendering them. */}
            {!reduce && FLIGHT_ARCS.map((d, i) => (
                <circle key={"p" + i} r={3} fill={T.orange} opacity={0.9}>
                    <animateMotion dur={`${6 + (i % 4) * 1.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} path={d} />
                </circle>
            ))}
            {/* Hub pings */}
            {HUBS.map(([px, py], i) => (
                <g key={"h" + i} transform={`translate(${px},${py})`}>
                    <circle r={3.4} fill={T.orange} opacity={0.85} />
                    <motion.circle r={4} fill="none" stroke={T.orange} strokeOpacity={0.5}
                        animate={reduce ? undefined : { r: [4, 16], opacity: [0.6, 0] }}
                        transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }} />
                </g>
            ))}
        </svg>
    )
}


// ─── SIX CAPABILITIES — orbital dial ────────────────────────────────────────────
// Verbatim port of V0's Capabilities() (Home.tsx:846-980). Scroll drives which
// capability is active (not clicks, despite the "click accordion" shorthand in
// docs/v0-home-reference.md): a 600vh tall wrapper (CAPS.length * 100vh) holds
// a sticky 100vh stage; scrollYProgress maps to an index 0-5, which spins a
// 6-node ring, crossfades the centre stat, and crossfades the right-hand
// title/body panel. Falls back to a plain numbered list under 1200px, where
// the ring has no room to read.
// One purpose-drawn line icon per capability instead of abstract geometric
// glyphs — each reads as its own concept at a glance (compass for planning,
// ticket for booking, receipt for expense, swap arrows for change, headset
// for support, suitcase for personal travel).
const CAP_ICON_PLAN = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.2" />
        <path d="M14.6 9.4 13 13l-3.6 1.6L11 11l3.6-1.6Z" />
    </svg>
)
const CAP_ICON_BOOK = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.2" y="6" width="17.6" height="12" rx="2.2" />
        <path d="M9.5 6v12" strokeDasharray="1.8 2.4" />
    </svg>
)
const CAP_ICON_EXPENSE = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 3h11v17.2l-2.2-1.5-2 1.5-2-1.5-2 1.5-2.2-1.5L6.5 20.2V3Z" />
        <path d="M9 8.4h6M9 12h6M9 15.6h3.4" />
    </svg>
)
const CAP_ICON_CHANGE = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 8h11.5l-3-3" />
        <path d="M17.5 16H6l3 3" />
    </svg>
)
const CAP_ICON_SUPPORT = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
        <rect x="3.2" y="14" width="4" height="5.4" rx="1.6" />
        <rect x="16.8" y="14" width="4" height="5.4" rx="1.6" />
        <path d="M19.5 19.4a3.5 3.5 0 0 1-3.5 3.1h-2.6" />
    </svg>
)
const CAP_ICON_PERSONAL = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="16" height="11.5" rx="2.2" />
        <path d="M9 8V6.2A2.2 2.2 0 0 1 11.2 4h1.6A2.2 2.2 0 0 1 15 6.2V8" />
        <path d="M4 13.4h16" />
    </svg>
)

const CAPS = [
    { num: "01", title: "Plan", body: "Describe the trip in plain language. Miraee builds an in-policy itinerary in seconds.", icon: CAP_ICON_PLAN, accent: T.orange, stat: "<60s", statLabel: "to an itinerary" },
    { num: "02", title: "Book", body: "Flights, hotels and cars from Mondee wholesale inventory: real savings, one tap.", icon: CAP_ICON_BOOK, accent: T.accent, stat: "20-30%", statLabel: "wholesale savings" },
    { num: "03", title: "Expense", body: "Receipts, reports and reconciliation handled automatically. No forms, no chasing.", icon: CAP_ICON_EXPENSE, accent: T.orange, stat: "0", statLabel: "forms to fill" },
    { num: "04", title: "Change", body: "Plans shift, the agent rebooks itself: within policy, before you even ask.", icon: CAP_ICON_CHANGE, accent: T.accent, stat: "100%", statLabel: "handled by the agent" },
    { num: "05", title: "24/7 support", body: "A human-in-the-loop backup whenever a trip needs a real person.", icon: CAP_ICON_SUPPORT, accent: T.orange, stat: "24/7", statLabel: "human backup" },
    { num: "06", title: "Personal travel", body: "The same agent plans employees’ own trips: a perk they actually use.", icon: CAP_ICON_PERSONAL, accent: T.accent, stat: "1", statLabel: "agent for everything" },
]

// Orbital dial node: sits on the wheel, stays upright while the wheel turns.
function CapNode({ cap, i, active }: { cap: typeof CAPS[0]; i: number; active: number }) {
    const isActive = active === i
    return (
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(min(185px, 15vw, 24vh))` }}>
            <motion.div animate={{ rotate: active * 60 - i * 60, scale: isActive ? 1.28 : 1 }} transition={{ type: "spring", stiffness: 70, damping: 15 }}
                style={{ width: 58, height: 58, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", willChange: "transform" }}>
                <motion.div animate={{ background: isActive ? cap.accent : T.card, borderColor: isActive ? cap.accent : T.border, color: isActive ? T.cream : T.muted, boxShadow: isActive ? "0 12px 32px " + cap.accent + "50" : "0 2px 8px rgba(69,14,20,0.05)" }} transition={{ duration: 0.4 }}
                    style={{ width: 58, height: 58, borderRadius: "50%", border: "1.5px solid", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                    {cap.icon}
                </motion.div>
            </motion.div>
        </div>
    )
}

export function Capabilities() {
    const w = useWindowWidth()
    const isMobile = w < 640
    // Orbital dial needs widescreen: iPad Pro portrait (1024) gets the list too.
    const isTablet = w >= 640 && w < 1200
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
    const [activeIndex, setActiveIndex] = useState(0)
    // Gates the outer ring's continuous 60s rotation — off (and not costing a
    // frame) until the dial is actually on screen, same pattern already used
    // for the marquee and the kinetic band on this page.
    const [ringInView, setRingInView] = useState(false)

    useEffect(() => {
        return scrollYProgress.on("change", v => {
            const idx = Math.min(CAPS.length - 1, Math.floor(v * CAPS.length))
            setActiveIndex(idx)
        })
    }, [scrollYProgress])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const observer = new IntersectionObserver(([entry]) => setRingInView(entry.isIntersecting), { threshold: 0 })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    if (isMobile || isTablet) {
        return (
            <SectionWrapper>
                <section style={{ background: T.bg, padding: isMobile ? "80px 20px" : "80px 40px" }}>
                    <SectionLabel>The product</SectionLabel>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "clamp(1.8rem,8vw,2.4rem)" : "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, marginBottom: 36 }}>
                        <StaggerWords text="One platform for" /><br /><StaggerWords text="the whole journey." delay={0.15} />
                    </h2>
                    <div style={{ borderTop: "1px solid " + T.border }}>
                        {CAPS.map((cap, i) => (
                            <div key={cap.num} id={["plan", "book", "expense", "change", "support", "personal"][i]} style={{ position: "relative", borderBottom: "1px solid " + T.border, padding: "20px 0 20px 16px", scrollMarginTop: 108 }}>
                                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: cap.accent, borderRadius: 2 }} />
                                <p style={{ fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 700, color: cap.accent, letterSpacing: "0.1em", margin: "0 0 6px" }}>{cap.num}</p>
                                <p style={{ fontSize: 16, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, margin: "0 0 8px" }}>{cap.title}</p>
                                <p style={{ fontSize: 13, fontFamily: "var(--font-sans)", lineHeight: 1.6, color: T.muted, margin: 0 }}>{cap.body}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </SectionWrapper>
        )
    }

    return (
        <SectionWrapper>
            {/* Tall container drives scroll progress. */}
            <div ref={containerRef} id="capabilities" style={{ height: CAPS.length * 100 + "vh", position: "relative" }}>
                <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: T.bg, display: "flex", alignItems: "center", paddingTop: 110 }}>
                    {/* Header pinned top-left (below fixed nav). */}
                    <div style={{ position: "absolute", top: 92, left: "clamp(32px,5vw,64px)", right: "clamp(32px,5vw,64px)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 3 }}>
                        <div>
                            <SectionLabel>The product</SectionLabel>
                            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem,2.2vw,2.1rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.03em", color: T.ink, margin: 0 }}>
                                One platform for the whole journey.
                            </h2>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 28, fontFamily: "var(--font-heading)", fontWeight: 900, color: CAPS[activeIndex].accent, letterSpacing: "-0.03em", lineHeight: 1 }}>{CAPS[activeIndex].num}<span style={{ color: T.muted, fontWeight: 600, fontSize: 15 }}> / 06</span></div>
                        </div>
                    </div>
                    {/* Orbital dial: scroll turns the wheel. */}
                    <div style={{ flex: "0 0 46%", display: "flex", justifyContent: "center" }}>
                        <div style={{ position: "relative", width: "min(400px, 52vh)", aspectRatio: "1" }}>
                            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid " + T.border }} />
                            <div style={{ position: "absolute", inset: "12%", borderRadius: "50%", border: "1px dashed rgba(69,14,20,0.12)" }} />
                            <motion.div animate={ringInView ? { rotate: 360 } : {}} transition={{ duration: 60, repeat: ringInView ? Infinity : 0, ease: "linear" }}
                                style={{ position: "absolute", inset: "-7px", borderRadius: "50%", border: "1px dashed rgba(229,86,2,0.25)", willChange: "transform" }} />
                            <motion.div animate={{ rotate: -activeIndex * 60 }} transition={{ type: "spring", stiffness: 70, damping: 15 }}
                                style={{ position: "absolute", inset: 0, willChange: "transform" }}>
                                {CAPS.map((cap, i) => <CapNode key={cap.num} cap={cap} i={i} active={activeIndex} />)}
                            </motion.div>
                            {/* Live stat hub. */}
                            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                                <AnimatePresence mode="wait">
                                    <motion.div key={activeIndex}
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.25 }}
                                        transition={{ duration: 0.35, ease: EO }}
                                        style={{ textAlign: "center" }}>
                                        <div style={{ fontSize: "clamp(3rem,4.5vw,4.5rem)", fontFamily: "var(--font-heading)", fontWeight: 900, color: CAPS[activeIndex].accent, letterSpacing: "-0.05em", lineHeight: 0.95 }}>{CAPS[activeIndex].stat}</div>
                                        <div style={{ fontSize: 10, fontFamily: "var(--font-sans)", fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.14em", marginTop: 8 }}>{CAPS[activeIndex].statLabel}</div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                    {/* Active capability content. */}
                    <div style={{ flex: 1, paddingRight: "clamp(32px,5vw,64px)", paddingLeft: 24, position: "relative", zIndex: 2 }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={activeIndex}
                                initial={{ opacity: 0, y: 44, clipPath: "inset(12% 0 0 0)" }}
                                animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                                exit={{ opacity: 0, y: -32, clipPath: "inset(0 0 12% 0)" }}
                                transition={{ duration: 0.45, ease: EO }}>
                                <div style={{ fontSize: 12, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.12em", color: CAPS[activeIndex].accent, marginBottom: 14 }}>{CAPS[activeIndex].num} · {CAPS[activeIndex].statLabel.toUpperCase()}</div>
                                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem,3.2vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, color: T.ink, margin: "0 0 20px", maxWidth: 520 }}>{CAPS[activeIndex].title}</h3>
                                <p style={{ fontSize: 16, fontFamily: "var(--font-sans)", lineHeight: 1.7, color: T.muted, margin: 0, maxWidth: 440 }}>{CAPS[activeIndex].body}</p>
                            </motion.div>
                        </AnimatePresence>
                        {/* Progress ticks. */}
                        <div style={{ display: "flex", gap: 6, marginTop: 44 }}>
                            {CAPS.map((cap, i) => (
                                <motion.div key={i} animate={{ width: i === activeIndex ? 32 : 8, background: i === activeIndex ? cap.accent : T.border }} transition={{ duration: 0.4 }}
                                    style={{ height: 4, borderRadius: 2 }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}

// ─── PLATFORM SOLUTION ───────────────────────────────────────────────────────
// "200+ deep agents, working as one." — split-screen sticky panel: an active
// item list on the left, a crossfading icon/stat/title panel on the right.
// Source: Miraee_landing_page/src/pages/Home.tsx:685-843 (`Solution`).
const SOLUTION_ITEMS = [
    { num: "01", title: "Global content, local experiences", body: "Millions of properties and hundreds of airlines, plus hyperlocal experiences no one else has digitized.", accent: T.orange, stat: "2M+", statLabel: "properties", icon: "◈" },
    { num: "02", title: "A swarm of specialized agents", body: "Booking, policy, negotiation, rebooking and expense agents that act, not just answer.", accent: T.accent, stat: "200+", statLabel: "deep AI agents", icon: "⬡" },
    { num: "03", title: "Human in the loop", body: "Real support and oversight where it matters, so autonomy never means blind trust.", accent: T.orange, stat: "24/7", statLabel: "human support", icon: "◉" },
]

export function PlatformSolution() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1200
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
    const [active, setActive] = useState(0)

    useEffect(() => {
        const unsub = scrollYProgress.on("change", v => {
            if (v < 0.33) setActive(0)
            else if (v < 0.66) setActive(1)
            else setActive(2)
        })
        return unsub
    }, [scrollYProgress])

    if (isMobile || isTablet) {
        return (
            <SectionWrapper>
                <section style={{ background: T.bg, padding: isMobile ? "80px 20px" : "80px 40px" }}>
                    <SectionLabel>The platform</SectionLabel>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "clamp(1.8rem,8vw,2.4rem)" : "clamp(2rem,5vw,3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, marginBottom: 40 }}>
                        <StaggerWords text="200+ deep agents," /><br /><StaggerWords text="working as one." delay={0.15} />
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {SOLUTION_ITEMS.map((item, i) => (
                            <SlideIn key={item.num} from="left" delay={i * 0.1}>
                                <div style={{ background: T.card, border: "1px solid " + T.border, borderRadius: 20, padding: 28 }}>
                                    <span style={{ fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 700, color: item.accent, letterSpacing: "0.08em" }}>{item.num}</span>
                                    <p style={{ fontSize: 18, fontFamily: "var(--font-heading)", fontWeight: 800, color: T.ink, margin: "10px 0 12px" }}>{item.title}</p>
                                    <p style={{ fontSize: 14, fontFamily: "var(--font-sans)", lineHeight: 1.65, color: T.muted, margin: "0 0 20px" }}>{item.body}</p>
                                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                                        <span style={{ fontSize: 36, fontFamily: "var(--font-heading)", fontWeight: 900, color: item.accent, letterSpacing: "-0.04em" }}>{item.stat}</span>
                                        <span style={{ fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 600, color: T.muted, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{item.statLabel}</span>
                                    </div>
                                </div>
                            </SlideIn>
                        ))}
                    </div>
                </section>
            </SectionWrapper>
        )
    }

    const item = SOLUTION_ITEMS[active]
    return (
        <section ref={sectionRef} style={{ position: "relative", height: "300vh", background: T.bg }}>
            <div style={{ position: "sticky", top: 0, height: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
                {/* LEFT — item list */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(32px,5vw,64px)", borderRight: "1px solid " + T.border, background: T.bg }}>
                    <SectionLabel>The platform</SectionLabel>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, marginBottom: 52 }}>
                        <StaggerWords text="200+ deep agents," /><br />
                        <StaggerWords text="working as one." delay={0.15} />
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {SOLUTION_ITEMS.map((s, i) => (
                            <motion.div key={s.num}
                                animate={{ borderColor: active === i ? s.accent + "40" : T.border, backgroundColor: active === i ? s.accent + "07" : "transparent" }}
                                transition={{ duration: 0.4 }}
                                style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "20px 20px", borderRadius: 14, border: "1px solid", cursor: "default" }}>
                                {/* Active indicator bar */}
                                <motion.div animate={{ background: active === i ? s.accent : T.border, height: active === i ? 44 : 20 }} transition={{ duration: 0.4, ease: EO }}
                                    style={{ width: 3, borderRadius: 2, flexShrink: 0, marginTop: 4 }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                                        <motion.span animate={{ color: active === i ? s.accent : T.muted }} transition={{ duration: 0.3 }}
                                            style={{ fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.1em" }}>{s.num}</motion.span>
                                        <motion.p animate={{ color: active === i ? T.ink : T.muted }} transition={{ duration: 0.3 }}
                                            style={{ fontSize: 16, fontFamily: "var(--font-heading)", fontWeight: 700, margin: 0 }}>{s.title}</motion.p>
                                    </div>
                                    <AnimatePresence>
                                        {active === i && (
                                            <motion.p key={s.num}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.35, ease: EO }}
                                                style={{ fontSize: 13, fontFamily: "var(--font-sans)", lineHeight: 1.6, color: T.muted, margin: 0, overflow: "hidden" }}>
                                                {s.body}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {/* Scroll hint */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 40 }}>
                        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ width: 1, height: 24, background: "linear-gradient(to bottom, " + T.orange + ", transparent)" }} />
                        <span style={{ fontSize: 10, fontFamily: "var(--font-sans)", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: T.muted }}>scroll through</span>
                    </div>
                </div>
                {/* RIGHT — active content panel */}
                <div style={{ position: "relative", overflow: "hidden", background: T.bg2 }}>
                    {/* Background accent blob */}
                    <AnimatePresence mode="wait">
                        <motion.div key={active + "-blob"}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            transition={{ duration: 0.6, ease: EO }}
                            style={{ position: "absolute", top: "20%", right: "-10%", width: "70%", height: "70%", borderRadius: "50%", background: "radial-gradient(circle, " + item.accent + "12 0%, transparent 65%)", filter: "blur(48px)", pointerEvents: "none" }}
                        />
                    </AnimatePresence>
                    {/* Content */}
                    <AnimatePresence mode="wait">
                        <motion.div key={active}
                            initial={{ opacity: 0, y: 40, clipPath: "inset(10% 0 0 0)" }}
                            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                            exit={{ opacity: 0, y: -30, clipPath: "inset(0 0 10% 0)" }}
                            transition={{ duration: 0.55, ease: EO }}
                            style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(32px,5vw,64px)" }}>
                            {/* Icon */}
                            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5, ease: EO }}
                                style={{ fontSize: 48, color: item.accent, marginBottom: 32, lineHeight: 1 }}>
                                {item.icon}
                            </motion.div>
                            {/* Giant stat */}
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.5, ease: EO }}>
                                <div style={{ fontSize: "clamp(5rem,9vw,9rem)", fontFamily: "var(--font-heading)", fontWeight: 900, color: item.accent, letterSpacing: "-0.05em", lineHeight: 0.9, marginBottom: 8 }}>{item.stat}</div>
                                <div style={{ fontSize: 12, fontFamily: "var(--font-sans)", fontWeight: 700, color: T.muted, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: 40 }}>{item.statLabel}</div>
                            </motion.div>
                            {/* Step label */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.4 }}
                                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                <div style={{ width: 32, height: 1.5, background: item.accent }} />
                                <span style={{ fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: item.accent }}>Step {item.num}</span>
                            </motion.div>
                            {/* Title */}
                            <motion.h3 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5, ease: EO }}
                                style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "-0.03em", color: T.ink, margin: "0 0 20px", lineHeight: 1.1 }}>
                                {item.title}
                            </motion.h3>
                            {/* Progress indicator */}
                            <div style={{ display: "flex", gap: 6, marginTop: 40 }}>
                                {SOLUTION_ITEMS.map((_, i) => (
                                    <motion.div key={i}
                                        animate={{ width: i === active ? 32 : 8, background: i === active ? item.accent : T.border }}
                                        transition={{ duration: 0.4 }}
                                        style={{ height: 4, borderRadius: 2 }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
