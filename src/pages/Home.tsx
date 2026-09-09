import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import timeline1990s from "../assets/timeline-1990s.webp"
import timeline2000s from "../assets/timeline-2000.webp"
import timelineToday from "../assets/timeline_today.webp"
import timelineAgent from "../assets/timeline_agent.webp"
import ThemeToggle from "../components/ThemeToggle"
import { useWindowWidth } from "../hooks/useWindowSize"
import {
    EO, StaggerWords, GrainOverlay, ScrollProgress,
} from "../animations"

// NOTE: FadeUp/SlideIn/WaveLetters/DepthExit/Magnetic/TiltCard/ScrambleText/
// SectionWrapper/ES/SmoothScroll used to be shared primitives in
// src/animations/. They were removed as dead code (this page is unrouted —
// see src/App.tsx). A banned mouse-follower cursor component that used to be
// rendered here was also deleted outright per design audit (no stand-in).
// Minimal local stand-ins below keep this unrouted file type-checking
// without reintroducing the deleted modules.
const ES = EO
function FadeUp({ children, style }: { children: React.ReactNode; delay?: number; y?: number; style?: React.CSSProperties }) {
    return <div style={style}>{children}</div>
}
function SlideIn({ children, style }: { children: React.ReactNode; from?: "left" | "right" | "bottom"; delay?: number; distance?: number; style?: React.CSSProperties }) {
    return <div style={style}>{children}</div>
}
function WaveLetters({ text }: { text: string; delay?: number; hoverColor?: string }) {
    return <span>{text}</span>
}
function DepthExit({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
function Magnetic({ children }: { children: React.ReactNode; strength?: number }) {
    return <>{children}</>
}
function TiltCard({ children, style }: { children: React.ReactNode; max?: number; style?: React.CSSProperties }) {
    return <div style={style}>{children}</div>
}
function ScrambleText({ text }: { text: string }) {
    return <span>{text}</span>
}
function SectionWrapper({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return <div style={style}>{children}</div>
}

const T = {
    // Flipping surfaces/text → CSS vars (see index.css :root / [data-theme=dark])
    bg: "var(--page-bg)", bg2: "var(--surface)",
    ink: "var(--text)", maroon: "#450E14", orange: "#E55602",
    muted: "var(--text-muted)", border: "var(--hairline)",
    card: "var(--surface)", orangeFaint: "rgba(229,86,2,0.07)",
    // Fixed brand colors (used on permanently-dark sections)
    white: "#FFFFFF", cream: "#FBF6F2",
    accent: "var(--accent-strong)",
}

function SectionLabel({ children, accent = T.orange }: { children: string; accent?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, scale: 0.88, x: -10 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EO }}
            style={{ marginBottom: 24, display: "inline-flex" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.11em", textTransform: "uppercase" as const, color: accent, border: "1.5px solid " + accent + "30", borderRadius: 100, padding: "5px 14px" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                <ScrambleText text={children} />
            </span>
        </motion.div>
    )
}

export function MiraeeLogo({ fill = T.orange, height = 28 }: { fill?: string; height?: number }) {
    const w = height * (338 / 84)
    return (
        <svg width={w} height={height} viewBox="0 0 338 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: "100%", height: "auto", display: "block" }}>
            <path d="M113.255 83.0098C112.156 83.0098 111.078 82.8081 110.021 82.4154C102.147 79.4749 101.207 66.7045 102.95 55.7387C103.807 50.3886 105.846 37.5439 105.413 31.7797C104.25 32.82 102.496 34.6352 100.033 37.788C93.6499 45.9513 86.2095 53.8917 79.3504 50.8344C74.0977 48.4884 72.5229 40.9514 74.679 28.4464L74.7001 28.3084C76.9407 15.2833 76.3805 11.0159 75.683 9.63587C74.2456 9.9331 68.1792 12.3216 52.4106 31.1746C50.6033 33.3402 48.9651 35.4102 47.4749 37.374C52.1041 40.8134 53.2244 47.1933 50.8147 56.3332C47.3481 69.4751 40.8272 78.1692 33.8095 79.0078C30.1844 79.443 26.9398 77.7127 25.1537 74.3795C22.4375 69.3265 22.9765 59.9955 30.0259 46.8005C23.0188 49.4862 13.9825 54.295 5.36894 60.2185L0 52.3312C6.29899 48.0001 24.1391 36.4823 37.2761 35.2085C39.5589 31.9814 42.1694 28.5951 45.1498 25.0389C62.3769 4.40245 72.4172 -2.60374 79.7837 0.835664C88.3972 4.85892 85.6916 20.5485 84.0746 29.922L84.0535 30.06C83.0811 35.7074 83.1763 39.444 83.5039 41.323C84.9518 40.3676 87.7948 37.9579 92.5402 31.8858C97.962 24.954 103.785 18.8819 109.704 21.4827C116.965 24.6673 115.548 37.1193 112.336 57.2461C110.962 65.8871 112.166 72.0016 113.318 73.371C114.291 73.1056 118.878 71.0674 128.231 55.8661L135.872 43.4567L143.968 48.4778L136.327 60.8872C127.047 75.9718 119.765 83.0098 113.255 83.0098ZM42.0003 45.2188C38.2061 51.1741 36.0712 55.8343 34.8875 59.1675C32.89 64.7619 33.0169 67.9571 33.3233 69.2522C35.1306 68.2119 38.9988 63.8702 41.6304 53.8704C43.0466 48.5096 42.6027 46.015 42.0003 45.2188Z" fill={fill}/>
            <path d="M134.191 18.6482C134.191 15.1132 136.855 12.5337 140.659 12.5337C144.464 12.5337 147.128 15.1132 147.128 18.6482C147.128 22.1831 144.559 24.7627 140.659 24.7627C136.76 24.7627 134.191 22.1831 134.191 18.6482ZM135.713 30.9727H145.511V82.5638H135.713V30.9727Z" fill={fill}/>
            <path d="M152.75 30.9725H162.547C162.547 34.3164 162.547 36.3227 162.452 39.571H162.547C165.496 33.8387 170.537 30.877 176.625 30.877C177.481 30.877 178.432 30.877 179.383 30.9725V39.9532H175.864C167.113 39.9532 162.547 46.6409 162.547 54.7617V82.5635H152.75V30.9725Z" fill={fill}/>
            <path d="M179.31 56.9592C179.31 41.4819 189.392 29.8262 202.899 29.8262C210.794 29.8262 216.882 33.0745 220.306 39.3801H220.496C220.401 36.4184 220.401 34.5076 220.401 30.9726H230.198V82.5637H220.401C220.401 79.0288 220.401 77.6912 220.496 74.3473H220.306C216.691 80.2708 210.128 83.9012 202.899 83.9012C189.107 83.9012 179.31 72.5321 179.31 56.9592ZM220.781 56.8637C220.781 46.2589 214.408 38.8068 204.801 38.8068C195.194 38.8068 189.107 46.7366 189.107 56.9592C189.107 67.1819 195.385 74.9206 204.801 74.9206C214.218 74.9206 220.781 67.6596 220.781 56.8637Z" fill={fill}/>
            <path d="M235.388 56.864C235.388 41.1001 245.756 29.4443 261.07 29.4443C276.384 29.4443 285.23 39.667 285.23 55.3354C285.23 56.7685 285.135 58.0105 284.945 59.4436H244.9C245.946 68.6153 252.129 75.2075 261.355 75.2075C267.823 75.2075 272.865 72.0547 275.813 66.1313L283.993 70.2395C279.428 79.5068 271.152 83.9971 260.975 83.9971C245.661 83.9971 235.388 72.5324 235.388 56.864ZM276.099 51.6094C274.957 43.4886 269.821 38.2339 261.07 38.2339C252.794 38.2339 247.087 43.7752 245.28 51.6094H276.099Z" fill={fill}/>
            <path d="M288.157 56.864C288.157 41.1001 298.525 29.4443 313.839 29.4443C329.153 29.4443 338 39.667 338 55.3354C338 56.7685 337.904 58.0105 337.714 59.4436H297.669C298.715 68.6153 304.898 75.2075 314.125 75.2075C320.593 75.2075 325.634 72.0547 328.583 66.1313L336.763 70.2395C332.197 79.5068 323.922 83.9971 313.744 83.9971C298.43 83.9971 288.157 72.5324 288.157 56.864ZM328.858 51.6094C327.716 43.4886 322.58 38.2339 313.829 38.2339C305.553 38.2339 299.846 43.7752 298.039 51.6094H328.858Z" fill={fill}/>
        </svg>
    )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
    const w = useWindowWidth()
    const isMobile = w < 640
    return (
        <motion.nav
            initial={{ y: -28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: EO }}
            style={{ position: "fixed", top: 14, left: "50%", x: "-50%", zIndex: 200, width: "min(1080px, calc(100vw - 24px))", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "0 10px 0 18px" : "0 10px 0 26px", borderRadius: 100, background: "var(--glass-bg)", backdropFilter: "blur(18px)", border: "1px solid var(--glass-border)", boxShadow: "0 10px 34px rgba(var(--text-rgb),0.08)" }}>
            <a href="https://app.miraee.ai" style={{ textDecoration: "none", display: "inline-flex" }}><MiraeeLogo fill={T.orange} height={24} /></a>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 16 }}>
                <ThemeToggle size={isMobile ? 32 : 34} />
                {!isMobile && <a href="https://app.miraee.ai" style={{ fontSize: 13.5, fontFamily: "var(--font-sans)", fontWeight: 600, color: T.muted, textDecoration: "none", transition: "color 0.25s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.ink)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
                    onFocus={e => (e.currentTarget.style.color = T.ink)}
                    onBlur={e => (e.currentTarget.style.color = T.muted)}>Sign in</a>}
                <motion.a href="/book-a-demo" whileHover={{ scale: 1.04, boxShadow: "0 10px 28px rgba(229,86,2,0.28)" }} whileTap={{ scale: 0.96 }}
                    style={{ display: "inline-flex", alignItems: "center", background: T.accent, color: T.cream, borderRadius: 100, padding: isMobile ? "10px 18px" : "11px 22px", fontSize: 13, fontFamily: "var(--font-sans)", fontWeight: 700, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap" }}>
                    Book a demo
                </motion.a>
            </div>
        </motion.nav>
    )
}


// ─── TRAVEL-NATIVE VISUAL ELEMENTS ────────────────────────────────────────────
function TypingDots({ color = T.muted }: { color?: string }) {
    return (
        <span className="inline-flex gap-1 items-center">
            {[0, 1, 2].map(i => (
                <motion.span key={i} animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }} style={{ width: 5, height: 5, borderRadius: "50%", background: color, display: "inline-block" }} />
            ))}
        </span>
    )
}

function PlaneGlyph({ size = 15, color = T.orange, rotate = 0 }: { size?: number; color?: string; rotate?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rotate}deg)`, display: "block" }}>
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.4.7c-.2.4-.1.9.3 1.2L8.7 12l-2 3H4l-1 1 3 2 2 3 1-1v-2.7l3-2 3.3 5.2c.3.4.8.6 1.3.4l.7-.3c.4-.2.6-.6.5-1.1z" />
        </svg>
    )
}

function CheckDot({ size = 16 }: { size?: number }) {
    return (
        <span className="rounded-full bg-[#3BA55D] inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
    )
}

// ─── DEPARTURE BOARD HEADLINE ─────────────────────────────────────────────────
// Each letter rolls through random characters and settles, like an airport
// split-flap board. Hovering a word re-rolls it.

// Per-step product vignette for How It Works
function StepVisual({ index, accent, inView }: { index: number; accent: string; inView: boolean }) {
    const card: React.CSSProperties = { background: T.card, border: "1px solid " + T.border, borderRadius: 20, boxShadow: "0 24px 64px rgba(var(--text-rgb),0.09)", padding: 20, width: 300, fontFamily: "var(--font-sans)" }
    if (index === 0) return (
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }} transition={{ duration: 0.7, delay: 0.35, ease: EO }} style={{ ...card, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ alignSelf: "flex-end", maxWidth: "92%", background: T.maroon, color: T.cream, borderRadius: "14px 14px 4px 14px", padding: "9px 13px", fontSize: 12.5, lineHeight: 1.5 }}>Fly me to Singapore Mar 15, hotel near the client office</div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, alignSelf: "flex-end" }}>
                {[8, 14, 20, 12, 16, 9, 13].map((h, i) => (
                    <motion.div key={i} animate={inView ? { height: [h * 0.4, h, h * 0.4] } : {}} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.1 }} style={{ width: 2.5, height: h, borderRadius: 2, background: accent, opacity: 0.75 }} />
                ))}
                <span style={{ fontSize: 10, color: T.muted, marginLeft: 6 }}>or say it out loud</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TypingDots color={accent} />
                <span style={{ fontSize: 11, color: T.muted }}>Miraee is on it</span>
            </div>
        </motion.div>
    )
    if (index === 1) return (
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }} transition={{ duration: 0.7, delay: 0.35, ease: EO }} style={{ ...card, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: T.ink }}>SFO</span>
                <div style={{ flex: 1, position: "relative", margin: "0 10px", height: 16, display: "flex", alignItems: "center" }}>
                    <motion.div animate={{ backgroundPosition: ["0px 0px", "24px 0px"] }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }} style={{ width: "100%", height: 1.5, backgroundImage: `repeating-linear-gradient(90deg, ${accent} 0 5px, transparent 5px 12px)`, opacity: 0.6 }} />
                    <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}><PlaneGlyph size={13} color={accent} rotate={45} /></div>
                </div>
                <span style={{ fontSize: 15, fontWeight: 800, color: T.ink }}>SIN</span>
            </div>
            {[{ t: "SQ 31 · Nonstop · 17h 25m", p: "$1,240", best: true }, { t: "NH 107 · 1 stop · 21h 10m", p: "$1,388", best: false }, { t: "UA 28 · 1 stop · 22h 45m", p: "$1,512", best: false }].map((o, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }} transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease: EO }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: 12, border: o.best ? "1.5px solid " + accent : "1px solid " + T.border, background: o.best ? "rgba(229,86,2,0.05)" : "transparent" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 11.5, fontWeight: 600, color: o.best ? T.ink : T.muted }}>{o.t}</span>
                        {o.best && <span style={{ fontSize: 9.5, fontWeight: 700, color: accent, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Best · in policy</span>}
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: o.best ? T.ink : T.muted }}>{o.p}</span>
                </motion.div>
            ))}
        </motion.div>
    )
    if (index === 2) return (
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }} transition={{ duration: 0.7, delay: 0.35, ease: EO }} style={{ ...card, position: "relative" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, marginBottom: 10 }}>Trip request · Singapore</div>
            {["SQ 31 · SFO to SIN · $1,240", "2 nights · client-side hotel", "Total $1,596 · under budget"].map((t, i) => (
                <div key={i} style={{ fontSize: 11.5, color: T.muted, padding: "7px 0", borderTop: "1px solid " + T.border }}>{t}</div>
            ))}
            <motion.div initial={{ opacity: 0, scale: 2.4, rotate: -4 }} animate={inView ? { opacity: 1, scale: 1, rotate: -12 } : { opacity: 0, scale: 2.4, rotate: -4 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.9 }}
                style={{ position: "absolute", right: 14, bottom: 14, border: "2.5px solid " + accent, color: accent, borderRadius: 8, padding: "5px 12px", fontSize: 13, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase" as const, background: "rgba(255,255,255,0.85)" }}>
                Expensed
            </motion.div>
        </motion.div>
    )
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 300 }}>
            {[{ t: "Calendar synced", s: "Flight + hotel on your schedule" }, { t: "Receipt captured", s: "$18.40 airport cab · auto-coded" }, { t: "Rebooked automatically", s: "6:00 AM cancelled → on the 9:15 AM" }].map((n, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }} transition={{ duration: 0.55, delay: 0.4 + i * 0.2, ease: EO }}
                    style={{ background: T.card, border: "1px solid " + T.border, borderRadius: 16, boxShadow: "0 16px 40px rgba(var(--text-rgb),0.07)", padding: "13px 16px", display: "flex", alignItems: "center", gap: 11, fontFamily: "var(--font-sans)" }}>
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

// Dotted world map with animated flight connections between hub cities
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

function CtaRoutes() {
    const dots: Array<[number, number]> = []
    WORLD_ROWS.forEach((row, r) => {
        for (let c = 0; c < row.length; c++) {
            if (row[c] === "1") dots.push([c * 36 + 18, r * 38 + 40])
        }
    })
    return (
        <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {/* Dotted continents */}
            <g>
                {dots.map(([dx, dy], i) => (
                    <circle key={i} cx={dx} cy={dy} r={3.2} fill={T.cream} opacity={0.09} />
                ))}
            </g>
            {/* Flight arcs: dashed, flowing */}
            {FLIGHT_ARCS.map((d, i) => (
                <motion.path key={i} d={d} fill="none" stroke={T.orange} strokeOpacity={0.32} strokeWidth={1.3} strokeDasharray="4 8"
                    animate={{ strokeDashoffset: [0, -96] }} transition={{ duration: 7 + (i % 3) * 2, repeat: Infinity, ease: "linear" }} />
            ))}
            {/* Travelling flights along each arc */}
            {FLIGHT_ARCS.map((d, i) => (
                <circle key={"p" + i} r={3} fill={T.orange} opacity={0.9}>
                    <animateMotion dur={`${6 + (i % 4) * 1.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} path={d} />
                </circle>
            ))}
            {/* Hub pings */}
            {HUBS.map(([px, py], i) => (
                <g key={"h" + i} transform={`translate(${px},${py})`}>
                    <circle r={3.4} fill={T.orange} opacity={0.85} />
                    <motion.circle r={4} fill="none" stroke={T.orange} strokeOpacity={0.5}
                        animate={{ r: [4, 16], opacity: [0.6, 0] }} transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }} />
                </g>
            ))}
        </svg>
    )
}

// ─── INTRO COVER — triggered one-shot circle reveal ──────────────────────────
// Fixed gradient cover with the white Miraee wordmark. Page scroll is locked;
// the first wheel / touch / key fires ONE tweened clip-path reveal (1.4s,
// expo ease) — deterministic 60fps, no scroll-scrub jitter. Unmounts when done
// so it costs nothing afterwards. Hero sits at page top the whole time.
function IntroCover() {
    const w = useWindowWidth()
    const isMobile = w < 640
    // Skip entirely if the page loads already scrolled (refresh mid-page)
    const [enabled] = useState(() => typeof window === "undefined" || window.scrollY < 60)
    const [phase, setPhase] = useState<"hold" | "reveal" | "done">("hold")
    useEffect(() => {
        if (!enabled || phase !== "hold" || typeof window === "undefined") return
        document.body.style.overflow = "hidden"
        const trigger = () => setPhase("reveal")
        window.addEventListener("wheel", trigger, { passive: true, once: true })
        window.addEventListener("touchmove", trigger, { passive: true, once: true })
        window.addEventListener("keydown", trigger, { once: true })
        const auto = window.setTimeout(trigger, 4500)
        return () => {
            window.removeEventListener("wheel", trigger)
            window.removeEventListener("touchmove", trigger)
            window.removeEventListener("keydown", trigger)
            window.clearTimeout(auto)
        }
    }, [enabled, phase])
    useEffect(() => {
        if (phase !== "reveal" || typeof window === "undefined") return
        ;(window as any).__miraeeIntroDone = true
        window.dispatchEvent(new Event("miraee-intro-done"))
        const t = window.setTimeout(() => {
            document.body.style.overflow = ""
            setPhase("done")
        }, 1500)
        return () => window.clearTimeout(t)
    }, [phase])
    // Cover skipped (mid-page load): tell the hero to start right away
    useEffect(() => {
        if (typeof window === "undefined" || enabled) return
        ;(window as any).__miraeeIntroDone = true
        window.dispatchEvent(new Event("miraee-intro-done"))
    }, [enabled])
    // Safety: always restore scroll if unmounted
    useEffect(() => () => { if (typeof window !== "undefined") document.body.style.overflow = "" }, [])
    if (!enabled || phase === "done") return null
    return (
        <motion.div
            initial={{ clipPath: "circle(135% at 50% 45%)" }}
            animate={phase === "reveal" ? { clipPath: "circle(0% at 50% 45%)" } : {}}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: "fixed", inset: 0, zIndex: 900, willChange: "clip-path", background: `linear-gradient(135deg, #2E080D 0%, ${T.maroon} 38%, #8A2B0A 70%, ${T.orange} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {/* Slow drifting light */}
            <motion.div animate={{ x: ["-8%", "8%", "-8%"], y: ["-5%", "7%", "-5%"] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", inset: "-25%", background: "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.10) 0%, transparent 52%)", pointerEvents: "none", willChange: "transform" }} />
            <motion.div animate={{ x: ["6%", "-6%", "6%"], y: ["8%", "-4%", "8%"] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", inset: "-25%", background: "radial-gradient(circle at 70% 75%, rgba(229,86,2,0.25) 0%, transparent 50%)", pointerEvents: "none", willChange: "transform" }} />
            {/* Wordmark: entrance, then exit-through on reveal */}
            <motion.div
                animate={phase === "reveal" ? { scale: 1.55, opacity: 0, y: -60 } : { scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, willChange: "transform, opacity", width: "100%", maxWidth: 640, padding: "0 24px", boxSizing: "border-box" }}>
                <motion.div initial={{ opacity: 0, y: 30, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1, delay: 0.2, ease: EO }}
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <MiraeeLogo fill="#FFFFFF" height={isMobile ? 64 : 130} />
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease: EO }}
                    style={{ fontSize: isMobile ? 13 : 15, fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(251,246,242,0.6)", margin: 0, textAlign: "center" }}>
                    The AI-native employee travel platform.
                </motion.p>
            </motion.div>
            {/* Scroll hint */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase === "reveal" ? 0 : 1 }} transition={{ delay: phase === "reveal" ? 0 : 1.4, duration: 0.5 }}
                style={{ position: "absolute", bottom: 42, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 10, fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(251,246,242,0.55)" }}>scroll to enter</span>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: 1.5, height: 36, background: "linear-gradient(to bottom, rgba(251,246,242,0.8), transparent)" }} />
            </motion.div>
        </motion.div>
    )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    const heroRef = useRef<HTMLDivElement>(null)
    // Scrollytelling scene: hero is pinned, scroll scrubs the type performance
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] })
    const sp = useSpring(scrollYProgress, { stiffness: 110, damping: 24, restDelta: 0.0005 })
    // Headline block scales up, glides to viewport center, then fades out
    const hScale = useTransform(sp, [0.05, 0.85], [1, isMobile ? 1.25 : 1.6])
    const hY = useTransform(sp, [0.05, 0.6], [0, 36])
    const hOpacity = useTransform(sp, [0.68, 0.94], [1, 0])
    // Supporting UI bows out first
    const uiOpacity = useTransform(sp, [0.03, 0.28], [1, 0])
    const uiY = useTransform(sp, [0.03, 0.28], [0, -36])
    const bgScale = useTransform(sp, [0, 1], [1, 1.15])
    const bgOpacity = useTransform(sp, [0, 0.7], [1, 0])
    const mx = useMotionValue(0)
    const my = useMotionValue(0)
    const blobPX = useSpring(mx, { stiffness: 50, damping: 20 })
    const blobPY = useSpring(my, { stiffness: 50, damping: 20 })
    // Hover clip-path reveal: dark layer follows the cursor over the text block
    const textRef = useRef<HTMLDivElement>(null)
    const hrTarget = useMotionValue(0)
    // Sequence: intro cover opens -> board letters roll into place
    const [, setGo] = useState(false)
    useEffect(() => {
        if (typeof window === "undefined") return
        if ((window as any).__miraeeIntroDone) { setGo(true); return }
        const onDone = () => setGo(true)
        window.addEventListener("miraee-intro-done", onDone)
        const fallback = window.setTimeout(onDone, 7000)
        return () => { window.removeEventListener("miraee-intro-done", onDone); window.clearTimeout(fallback) }
    }, [])
    // Collapse the hover reveal the moment the scene starts scrubbing
    useEffect(() => scrollYProgress.on("change", v => { if (v > 0.04) hrTarget.set(0) }), [scrollYProgress])
    return (
        <div ref={heroRef} style={{ height: "220vh", position: "relative", background: T.bg }}>
        <section
            onMouseMove={(e) => {
                if (typeof window === "undefined") return
                mx.set((e.clientX / window.innerWidth - 0.5) * 48)
                my.set((e.clientY / window.innerHeight - 0.5) * 48)
            }}
            style={{ position: "sticky", top: 0, height: "100dvh", background: T.bg, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "120px 20px 80px" : isTablet ? "120px 40px 80px" : "100px 64px 80px", overflow: "hidden" }}>
            {/* Parallax ambient blob (scroll + pointer reactive) */}
            <motion.div style={{ position: "absolute", top: "5%", right: "-8%", width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.08) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none", scale: bgScale, opacity: bgOpacity, x: blobPX, y: blobPY }} />
            <motion.div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "30vw", height: "30vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(69,14,20,0.05) 0%, transparent 60%)", filter: "blur(40px)", pointerEvents: "none" }} />
            {/* Corner HUD: meta anchored to the four corners, fades on scroll */}
            {!isMobile && (
                <motion.div style={{ opacity: uiOpacity }}>
                    <div style={{ position: "absolute", bottom: 36, left: "clamp(24px,4vw,56px)", fontSize: 10.5, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: T.muted }}>Built by Tabhi</div>
                    <div style={{ position: "absolute", bottom: 36, right: "clamp(24px,4vw,56px)", fontSize: 10.5, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: T.muted }}>Wholesale savings 20–30%</div>
                </motion.div>
            )}
            <motion.div style={{ position: "relative", zIndex: 2, maxWidth: 1280, width: "100%", margin: "0 auto" }}>
                {/* MONUMENT: centered stacked type, meta pinned to the corners */}
                <div ref={textRef} style={{ position: "relative", textAlign: "center" as const }}>
                {/* Badge (bows out first on scroll) */}
                <motion.div style={{ opacity: uiOpacity, y: uiY }}>
                <motion.div initial={{ opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, delay: 0.15, ease: EO }} style={{ marginBottom: 32 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: T.orange, border: "1.5px solid " + T.orange + "30", borderRadius: 100, padding: "5px 14px" }}>
                        <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} style={{ width: 5, height: 5, borderRadius: "50%", background: T.orange, display: "inline-block" }} />
                        A personal AI agent for every employee.
                    </span>
                </motion.div>
                </motion.div>
                {/* Monumental centered headline; scales to center and fades on scroll */}
                <motion.div style={{ scale: hScale, y: hY, opacity: hOpacity, transformOrigin: "center center", willChange: "transform, opacity" }}>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "clamp(1.9rem,8.5vw,2.8rem)" : isTablet ? "clamp(3.4rem,8.5vw,5.8rem)" : "clamp(3.8rem,7vw,7rem)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.045em", color: T.ink, margin: 0 }}>
                    <div><WaveLetters text="AI-native employee" delay={0.2} /></div>
                    <div><span style={{ color: T.orange }}><WaveLetters text="travel Platform" delay={0.55} hoverColor={T.maroon} /></span></div>
                </h1>
                </motion.div>
                {/* Subline centered */}
                <motion.div style={{ opacity: uiOpacity, y: uiY }}>
                <FadeUp delay={1.0} style={{ maxWidth: 560, margin: "28px auto 0" }}>
                    <p style={{ fontSize: isMobile ? 16 : 18, fontFamily: "var(--font-sans)", fontWeight: 400, lineHeight: 1.65, color: T.muted, margin: 0 }}>
                        One intelligent platform for booking, travel management, and expenses. Miraee is built for business travel, and the personal trips people love.
                    </p>
                </FadeUp>
                {/* CTAs centered */}
                <FadeUp delay={1.2} style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 32 }}>
                    <Magnetic><motion.a href="/book-a-demo" whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(229,86,2,0.3)" }} whileTap={{ scale: 0.97 }} style={{ display: "inline-flex", background: T.accent, color: T.cream, border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 15, fontFamily: "var(--font-sans)", fontWeight: 700, cursor: "pointer", textDecoration: "none" }}>Book a demo</motion.a></Magnetic>
                    <Magnetic><motion.button whileHover={{ x: 4 }} style={{ background: "transparent", color: T.ink, border: "1.5px solid " + T.border, borderRadius: 12, padding: "14px 24px", fontSize: 15, fontFamily: "var(--font-sans)", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                        See how it works
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </motion.button></Magnetic>
                </FadeUp>
                {/* Mobile proof line */}
                {isMobile && (
                    <FadeUp delay={1.4} style={{ marginTop: 36 }}>
                        <p style={{ fontSize: 12, fontFamily: "var(--font-sans)", fontWeight: 500, color: T.muted, margin: 0 }}>Built by Tabhi · 2M+ hotels</p>
                    </FadeUp>
                )}
                </motion.div>
                </div>
            </motion.div>
        </section>
        </div>
    )
}

// ─── STAT STRIP ───────────────────────────────────────────────────────────────
function StatStrip() {
    const STATS = [
        { val: "2M+", label: "Hotels" }, { val: "500+", label: "Airlines" },
        { val: "200+", label: "AI agents" }, { val: "125M+", label: "Travelers reached" },
        { val: "20\u201330%", label: "Wholesale savings" }, { val: "24/7", label: "Human support" },
        { val: "100%", label: "Agent-managed" }, { val: "1", label: "Platform" },
    ]
    const items = [...STATS, ...STATS]
    // Strip skews with scroll velocity: the page feels physically connected
    const { scrollY } = useScroll()
    const velo = useVelocity(scrollY)
    const skewRaw = useTransform(velo, [-1500, 1500], [-5, 5])
    const skewX = useSpring(skewRaw, { stiffness: 250, damping: 30 })
    return (
        <div style={{ background: T.maroon, overflow: "hidden", padding: "18px 0", display: "flex", alignItems: "center" }}>
            <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} style={{ display: "flex", gap: 0, width: "max-content", skewX }}>
                {items.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", padding: "0 36px", borderRight: "1px solid rgba(251,246,242,0.12)", whiteSpace: "nowrap" }}>
                        <span style={{ fontSize: 20, fontFamily: "var(--font-sans)", fontWeight: 800, color: T.cream, letterSpacing: "-0.02em", marginRight: 10 }}>{s.val}</span>
                        <span style={{ fontSize: 12, fontFamily: "var(--font-sans)", fontWeight: 500, color: "rgba(251,246,242,0.55)", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{s.label}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

// ─── KINETIC TYPE BAND — giant strips slide opposite ways with scroll ────────
function KineticBand({ line1, line2, bg = T.bg, ink = T.ink }: { line1: string; line2: string; bg?: string; ink?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "4%"])
    const x2 = useTransform(scrollYProgress, [0, 1], ["4%", "-10%"])
    const rowStyle: React.CSSProperties = { whiteSpace: "nowrap", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(3rem,8vw,7rem)", letterSpacing: "-0.03em", lineHeight: 1.06, userSelect: "none" }
    return (
        <div ref={ref} style={{ overflow: "hidden", padding: "clamp(40px,6vw,64px) 0 clamp(32px,5vw,56px)", background: bg }}>
            <motion.div style={{ ...rowStyle, x: x1, color: ink, willChange: "transform" }}>{(line1 + "\u2002\u00B7\u2002").repeat(4)}</motion.div>
            <motion.div style={{ ...rowStyle, x: x2, color: "transparent", WebkitTextStroke: `1.5px ${ink}`, opacity: 0.6, willChange: "transform" }}>{(line2 + "\u2002\u00B7\u2002").repeat(4)}</motion.div>
        </div>
    )
}

// ─── TIMELINE — sticky scroll marches through the eras of business travel ────
const TIMELINE_ERAS = [
    {
        era: "1990s", a: "phone calls and", b: "paper tickets.",
        desc: "Business travel was manual, time-consuming, and full of friction. It took hours to plan a single trip.",
        img: timeline1990s, pos: "center",
        features: [
            { icon: "☎", label: "Phone calls", sub: "Long wait times" },
            { icon: "⧉", label: "Fax approvals", sub: "Manual everything" },
            { icon: "◈", label: "Paper tickets", sub: "Easy to lose" },
            { icon: "▤", label: "Filing cabinets", sub: "Difficult to track" },
        ],
    },
    {
        era: "2000s", a: "Call centers and", b: "Corporate desks.",
        desc: "Online booking arrived, but travel still meant rigid corporate tools, call centers, and endless approvals.",
        img: timeline2000s, pos: "center",
        features: [
            { icon: "◉", label: "Call centers", sub: "Hold music forever" },
            { icon: "⬡", label: "Booking portals", sub: "Clunky UX" },
            { icon: "✦", label: "Corporate cards", sub: "Manual reconciliation" },
            { icon: "◎", label: "Expense reports", sub: "Weeks to file" },
        ],
    },
    {
        era: "Today", a: "portals", b: "you operate.",
        desc: "Dashboards everywhere. Travelers became the operators, stitching a dozen disconnected tools together themselves.",
        img: timelineToday, pos: "center",
        features: [
            { icon: "⧉", label: "Disconnected apps", sub: "12+ vendors" },
            { icon: "◈", label: "Manual policy", sub: "Guesswork" },
            { icon: "◉", label: "Self-service", sub: "You do the work" },
            { icon: "✦", label: "Scattered data", sub: "No single view" },
        ],
    },
    {
        era: "2026", a: "an agent that", b: "does it for you.",
        desc: "Miraee flips it. A swarm of AI agents books, negotiates, and rebooks, with a human in the loop when it matters.",
        img: timelineAgent, pos: "center 18%",
        features: [
            { icon: "⬡", label: "AI agents", sub: "200+ specialized" },
            { icon: "◈", label: "Auto-booking", sub: "Seconds not hours" },
            { icon: "◉", label: "Human backup", sub: "24/7 support" },
            { icon: "✦", label: "One platform", sub: "Everything connected" },
        ],
    },
]

function EraPanel({ index, total, progress, era, isMobile }: { index: number; total: number; progress: any; era: typeof TIMELINE_ERAS[0]; isMobile: boolean }) {
    const start = index / total
    const end = (index + 1) / total
    const span = end - start
    // Same scroll mechanic as before — a gentle depth push as each era enters/exits, driven by scroll progress
    const scale = useTransform(progress, [start, start + span * 0.5, end], [1.07, 1, 0.94])
    const opacity = useTransform(progress, [start, start + span * 0.14, end - span * 0.14, end], [0, 1, 1, 0])
    const contentX = useTransform(progress, [start, start + span * 0.3], [isMobile ? 0 : -36, 0])
    const pad = isMobile ? 24 : 56
    return (
        <motion.div style={{ position: "absolute", inset: 0, scale, opacity, willChange: "transform, opacity", pointerEvents: "none", overflow: "hidden" }}>
            {/* Full-bleed era photo */}
            <img src={era.img} alt={era.era + " " + era.a + " " + era.b} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: era.pos, display: "block" }} />
            {/* Legibility wash — dark on the left where the copy sits, plus a floor for the stepper */}
            <div style={{ position: "absolute", inset: 0, background: isMobile
                ? "linear-gradient(to top, rgba(15,3,5,0.94) 8%, rgba(15,3,5,0.62) 52%, rgba(15,3,5,0.72) 100%)"
                : "linear-gradient(90deg, rgba(15,3,5,0.94) 0%, rgba(15,3,5,0.80) 40%, rgba(15,3,5,0.30) 78%, rgba(15,3,5,0.12) 100%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,3,5,0.6) 0%, transparent 22%)", pointerEvents: "none" }} />
            {/* Editorial copy */}
            <motion.div style={{ position: "absolute", left: pad, right: pad, top: "50%", transform: "translateY(-50%)", x: contentX, maxWidth: 620, display: "flex", flexDirection: "column", gap: isMobile ? 16 : 22 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 12, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" as const, color: T.orange }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: T.orange, flexShrink: 0 }} />{era.era}
                </span>
                <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: isMobile ? "2.1rem" : "clamp(2.6rem,5.2vw,4.6rem)", letterSpacing: "-0.04em", lineHeight: 1.02 }}>
                    <span style={{ color: T.cream }}>{era.a} </span>
                    <span style={{ color: T.orange }}>{era.b}</span>
                </h2>
                <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: isMobile ? 15 : 18, lineHeight: 1.6, color: "rgba(251,246,242,0.66)", maxWidth: 440 }}>{era.desc}</p>
            </motion.div>
        </motion.div>
    )
}

function ZTunnel() {
    const ref = useRef<HTMLDivElement>(null)
    const w = useWindowWidth()
    const isMobile = w < 640
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
    const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.0005 })
    const total = TIMELINE_ERAS.length
    const [step, setStep] = useState(0)
    useEffect(() => scrollYProgress.on("change", v => setStep(Math.min(total - 1, Math.floor(v * total)))), [scrollYProgress, total])
    const pad = isMobile ? 24 : 56
    return (
        <div ref={ref} style={{ height: "820vh", position: "relative", background: T.bg, paddingTop: 56 }}>
            <div style={{ position: "sticky", top: 12, height: "calc(100dvh - 24px)", margin: "0 12px", borderRadius: 32, background: "#140305", overflow: "hidden" }}>
                {TIMELINE_ERAS.map((era, i) => (
                    <EraPanel key={i} index={i} total={total} progress={smooth} era={era} isMobile={isMobile} />
                ))}
                {/* Numbered era stepper */}
                <div style={{ position: "absolute", bottom: isMobile ? 24 : 34, left: pad, right: pad, display: "flex", alignItems: "center", gap: isMobile ? 10 : 16, zIndex: 5, pointerEvents: "none" }}>
                    {TIMELINE_ERAS.map((_, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 16, flex: i < total - 1 ? 1 : "0 0 auto" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
                                <motion.span animate={{ color: step === i ? T.orange : "rgba(251,246,242,0.45)" }} transition={{ duration: 0.35, ease: EO }}
                                    style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? 13 : 15, fontWeight: 800, letterSpacing: "0.02em", color: "rgba(251,246,242,0.45)" }}>{String(i + 1).padStart(2, "0")}</motion.span>
                                <motion.div animate={{ width: step === i ? (isMobile ? 20 : 28) : 0, opacity: step === i ? 1 : 0 }} transition={{ duration: 0.4, ease: EO }}
                                    style={{ height: 2.5, borderRadius: 2, background: T.orange }} />
                            </div>
                            {i < total - 1 && <div style={{ flex: 1, height: 1, background: "rgba(251,246,242,0.18)" }} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ─── PROBLEM ──────────────────────────────────────────────────────────────────
const PAIN_CARDS = [
    { icon: "⧉", title: "Disconnected systems", body: "Booking tools, travel desks, payments, expense software, employee benefits.", stat: "5", statLabel: "separate systems" },
    { icon: "✦", title: "Vendors to manage", body: "A dozen vendors stitched together, none of them talking to each other.", stat: "12+", statLabel: "vendors" },
    { icon: "◎", title: "Built for the employee", body: "None of it built for the person actually traveling.", stat: "0", statLabel: "built for them" },
]

function PainCard({ icon, title, body, stat, statLabel, index }: typeof PAIN_CARDS[0] & { index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-8% 0px" })
    const [hovered, setHovered] = useState(false)
    return (
        <TiltCard max={6} style={{ flex: "1 1 280px", minWidth: 0, display: "flex", borderRadius: 20 }}>
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 48, borderRadius: 100, scale: 0.92 }}
            animate={inView ? { opacity: 1, y: 0, borderRadius: 20, scale: 1 } : {}}
            whileHover={{ boxShadow: "0 20px 48px rgba(229,86,2,0.13), 0 4px 16px rgba(var(--text-rgb),0.06)", borderColor: "rgba(229,86,2,0.35)" }}
            transition={{ duration: 0.8, delay: index * 0.13, ease: ES }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{ background: T.card, border: "1px solid " + T.border, padding: 32, flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16, position: "relative", overflow: "hidden", cursor: "default" }}>
            <motion.div animate={{ scale: hovered ? 1.4 : 1, opacity: hovered ? 0.18 : 1 }} transition={{ duration: 0.4, ease: EO }}
                style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: T.orangeFaint, filter: "blur(24px)", pointerEvents: "none" }} />
            <motion.div animate={{ scale: hovered ? 1.2 : 1, rotate: hovered ? 8 : 0 }} transition={{ duration: 0.35, ease: EO }}
                style={{ fontSize: 24, color: T.orange, width: "fit-content" }}>{icon}</motion.div>
            <div>
                <p style={{ fontSize: 17, fontFamily: "var(--font-sans)", fontWeight: 700, color: T.ink, margin: "0 0 10px", lineHeight: 1.3 }}>{title}</p>
                <motion.p initial={{ opacity: 0, height: 0 }} animate={inView ? { opacity: 1, height: "auto" } : {}} transition={{ duration: 0.6, delay: index * 0.13 + 0.3, ease: EO }}
                    style={{ fontSize: 14, fontFamily: "var(--font-sans)", fontWeight: 400, color: T.muted, margin: 0, lineHeight: 1.65, overflow: "hidden" }}>{body}</motion.p>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.13 + 0.5 }}
                style={{ marginTop: "auto", display: "flex", alignItems: "baseline", gap: 8, paddingTop: 20, borderTop: "1px solid " + T.border }}>
                <motion.span animate={{ color: hovered ? T.maroon : T.orange }} transition={{ duration: 0.3 }}
                    style={{ fontSize: 32, fontFamily: "var(--font-sans)", fontWeight: 800, letterSpacing: "-0.03em" }}>{stat}</motion.span>
                <span style={{ fontSize: 12, fontFamily: "var(--font-sans)", fontWeight: 500, color: T.muted, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{statLabel}</span>
            </motion.div>
        </motion.div>
        </TiltCard>
    )
}

function Problem() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    return (
        <SectionWrapper>
            <section style={{ background: T.bg2, padding: isMobile ? "80px 20px" : isTablet ? "80px 40px" : "120px 64px", overflow: "hidden" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                    <SectionLabel>The problem</SectionLabel>
                    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 24 : isTablet ? 40 : 80, marginBottom: 56 }}>
                        <div style={{ flex: "0 0 auto", maxWidth: isMobile ? "100%" : "42%" }}>
                            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "2rem" : "clamp(2.2rem,4vw,3.6rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, margin: 0 }}>
                                <StaggerWords text="A $2T industry still runs on" /><br />
                                <span style={{ color: "var(--accent-strong)" }}><StaggerWords text="disconnected tools." delay={0.15} /></span>
                            </h2>
                        </div>
                        <FadeUp delay={0.2} style={{ flex: 1 }}>
                            <p style={{ fontSize: 17, fontFamily: "var(--font-sans)", lineHeight: 1.7, color: T.muted, margin: 0, maxWidth: 480 }}>
                                Booking tools, travel desks, payments, expense software, employee benefits: a dozen vendors stitched together.
                            </p>
                            <p style={{ fontSize: 14, fontFamily: "var(--font-sans)", fontWeight: 700, color: T.orange, marginTop: 16 }}>
                                And none of it built for the person actually traveling.
                            </p>
                        </FadeUp>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                        {PAIN_CARDS.map((card, i) => (<PainCard key={card.title} {...card} index={i} />))}
                    </div>
                </div>
            </section>
        </SectionWrapper>
    )
}

// ─── SOLUTION — sticky scroll feature showcase ────────────────────────────────
const SOLUTION_ITEMS = [
    { num: "01", title: "Global content, local experiences", body: "Millions of hotels and hundreds of airlines, plus hyperlocal experiences no one else has digitized.", accent: T.orange, stat: "2M+", statLabel: "hotels", icon: "◈" },
    { num: "02", title: "A swarm of specialized agents", body: "Booking, policy, negotiation, rebooking and expense agents that act, not just answer.", accent: "var(--accent-strong)", stat: "200+", statLabel: "deep AI agents", icon: "⬡" },
    { num: "03", title: "Human in the loop", body: "Real support and oversight where it matters, so autonomy never means blind trust.", accent: T.orange, stat: "24/7", statLabel: "human support", icon: "◉" },
]

function Solution() {
    const w = useWindowWidth()
    const isMobile = w < 640
    // Split-screen needs widescreen: portrait tablets get the stacked cards
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
                                    <p style={{ fontSize: 18, fontFamily: "var(--font-sans)", fontWeight: 800, color: T.ink, margin: "10px 0 12px" }}>{item.title}</p>
                                    <p style={{ fontSize: 14, fontFamily: "var(--font-sans)", lineHeight: 1.65, color: T.muted, margin: "0 0 20px" }}>{item.body}</p>
                                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                                        <span style={{ fontSize: 36, fontFamily: "var(--font-sans)", fontWeight: 900, color: item.accent, letterSpacing: "-0.04em" }}>{item.stat}</span>
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
            <div style={{ position: "sticky", top: 0, height: "100dvh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
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
                                            style={{ fontSize: 16, fontFamily: "var(--font-sans)", fontWeight: 700, margin: 0 }}>{s.title}</motion.p>
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

// ─── CAPABILITIES — click accordion ─────────────────────────────────────────
const CAPS = [
    { num: "01", title: "Plan", body: "Describe the trip in plain language. Miraee builds an in-policy itinerary in seconds.", icon: "◈", accent: T.orange, stat: "<60s", statLabel: "to an itinerary" },
    { num: "02", title: "Book", body: "Flights, hotels and cars from Mondee wholesale inventory: real savings, one tap.", icon: "⬡", accent: "var(--accent-strong)", stat: "20\u201330%", statLabel: "wholesale savings" },
    { num: "03", title: "Expense", body: "Receipts, reports and reconciliation handled automatically. No forms, no chasing.", icon: "◉", accent: T.orange, stat: "0", statLabel: "forms to fill" },
    { num: "04", title: "Change", body: "Plans shift, the agent rebooks itself: within policy, before you even ask.", icon: "◈", accent: "var(--accent-strong)", stat: "100%", statLabel: "handled by the agent" },
    { num: "05", title: "24/7 support", body: "A human-in-the-loop backup whenever a trip needs a real person.", icon: "⬡", accent: T.orange, stat: "24/7", statLabel: "human backup" },
    { num: "06", title: "Personal travel", body: "The same agent plans employees own trips: a perk they actually use.", icon: "◎", accent: "var(--accent-strong)", stat: "1", statLabel: "agent for everything" },
]

// Orbital dial node: sits on the wheel, stays upright while the wheel turns
function CapNode({ cap, i, active }: { cap: typeof CAPS[0]; i: number; active: number }) {
    const isActive = active === i
    return (
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(min(185px, 15vw, 24vh))` }}>
            <motion.div animate={{ rotate: active * 60 - i * 60, scale: isActive ? 1.28 : 1 }} transition={{ type: "spring", stiffness: 70, damping: 15 }}
                style={{ width: 58, height: 58, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", willChange: "transform" }}>
                <motion.div animate={{ background: isActive ? cap.accent : T.card, borderColor: isActive ? cap.accent : T.border, color: isActive ? T.cream : T.muted, boxShadow: isActive ? "0 12px 32px " + cap.accent + "50" : "0 2px 8px rgba(var(--text-rgb),0.05)" }} transition={{ duration: 0.4 }}
                    style={{ width: 58, height: 58, borderRadius: "50%", border: "1.5px solid", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                    {cap.icon}
                </motion.div>
            </motion.div>
        </div>
    )
}

function Capabilities() {
    const w = useWindowWidth()
    const isMobile = w < 640
    // Orbital dial needs widescreen: iPad Pro portrait (1024) gets the list too
    const isTablet = w >= 640 && w < 1200
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
    const [activeIndex, setActiveIndex] = useState(0)
    useEffect(() => {
        return scrollYProgress.on("change", v => {
            const idx = Math.min(CAPS.length - 1, Math.floor(v * CAPS.length))
            setActiveIndex(idx)
        })
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
                        {CAPS.map((cap) => (
                            <div key={cap.num} style={{ position: "relative", borderBottom: "1px solid " + T.border, padding: "20px 0 20px 16px" }}>
                                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: cap.accent, borderRadius: 2 }} />
                                <p style={{ fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 700, color: cap.accent, letterSpacing: "0.1em", margin: "0 0 6px" }}>{cap.num}</p>
                                <p style={{ fontSize: 16, fontFamily: "var(--font-sans)", fontWeight: 700, color: T.ink, margin: "0 0 8px" }}>{cap.title}</p>
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
            {/* Tall container drives scroll progress */}
            <div ref={containerRef} style={{ height: CAPS.length * 100 + "vh", position: "relative" }}>
                <div style={{ position: "sticky", top: 0, height: "100dvh", overflow: "hidden", background: T.bg, display: "flex", alignItems: "center", paddingTop: 110 }}>
                    {/* Header pinned top-left (below fixed nav) */}
                    <div style={{ position: "absolute", top: 92, left: "clamp(32px,5vw,64px)", right: "clamp(32px,5vw,64px)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 3 }}>
                        <div>
                            <SectionLabel>The product</SectionLabel>
                            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem,2.2vw,2.1rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.03em", color: T.ink, margin: 0 }}>
                                One platform for the whole journey.
                            </h2>
                        </div>
                        <div style={{ textAlign: "right" as const }}>
                            <div style={{ fontSize: 28, fontFamily: "var(--font-sans)", fontWeight: 900, color: CAPS[activeIndex].accent, letterSpacing: "-0.03em", lineHeight: 1 }}>{CAPS[activeIndex].num}<span style={{ color: T.muted, fontWeight: 600, fontSize: 15 }}> / 06</span></div>
                        </div>
                    </div>
                    {/* Orbital dial: scroll turns the wheel */}
                    <div style={{ flex: "0 0 46%", display: "flex", justifyContent: "center" }}>
                        <div style={{ position: "relative", width: "min(400px, 52vh)", aspectRatio: "1" }}>
                            {/* Rings */}
                            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid " + T.border }} />
                            <div style={{ position: "absolute", inset: "12%", borderRadius: "50%", border: "1px dashed rgba(var(--text-rgb),0.12)" }} />
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                style={{ position: "absolute", inset: "-7px", borderRadius: "50%", border: "1px dashed rgba(229,86,2,0.25)", willChange: "transform" }} />
                            {/* Wheel */}
                            <motion.div animate={{ rotate: -activeIndex * 60 }} transition={{ type: "spring", stiffness: 70, damping: 15 }}
                                style={{ position: "absolute", inset: 0, willChange: "transform" }}>
                                {CAPS.map((cap, i) => <CapNode key={cap.num} cap={cap} i={i} active={activeIndex} />)}
                            </motion.div>
                            {/* Live stat hub */}
                            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                                <AnimatePresence mode="wait">
                                    <motion.div key={activeIndex}
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.25 }}
                                        transition={{ duration: 0.35, ease: EO }}
                                        style={{ textAlign: "center" as const }}>
                                        <div style={{ fontSize: "clamp(3rem,4.5vw,4.5rem)", fontFamily: "var(--font-heading)", fontWeight: 900, color: CAPS[activeIndex].accent, letterSpacing: "-0.05em", lineHeight: 0.95 }}>{CAPS[activeIndex].stat}</div>
                                        <div style={{ fontSize: 10, fontFamily: "var(--font-sans)", fontWeight: 700, color: T.muted, textTransform: "uppercase" as const, letterSpacing: "0.14em", marginTop: 8 }}>{CAPS[activeIndex].statLabel}</div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                    {/* Active capability content */}
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
                        {/* Progress ticks */}
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

// ─── ROLES (scroll-linked horizontal pan) ─────────────────────────────────────
const ROLES = [
    { tag: "Experiences", headline: "Not bookable anywhere else.", body: "The city after 5pm, the festival, the family weekend bolted onto a work trip. Booked and expensed separately, one tap.", stat: "90%", statLabel: "of experiences", accent: "var(--accent-strong)", bg: "var(--page-bg)", img: "" },
    { tag: "01", headline: "Festivals and culture", body: "", stat: "", statLabel: "", accent: T.orange, bg: "var(--surface-2)", img: "https://framerusercontent.com/images/LMZ3ugguI8VTpFeCKuOrrEUXDY.jpg" },
    { tag: "02", headline: "Once-in-a-trip moments", body: "", stat: "", statLabel: "", accent: "var(--accent-strong)", bg: "var(--page-bg)", img: "https://framerusercontent.com/images/lS1MsTKdDET0sJLlXRCt44HdDFY.jpg" },
    { tag: "03", headline: "Local performances", body: "", stat: "", statLabel: "", accent: T.orange, bg: "var(--surface-2)", img: "https://framerusercontent.com/images/AANz7Gv2v4OLJICanNZTO4cDyE.jpg" },
    { tag: "04", headline: "Markets and makers", body: "", stat: "", statLabel: "", accent: "var(--accent-strong)", bg: "var(--page-bg)", img: "https://framerusercontent.com/images/v0MpWd9NHbV98F3GxQZzhtAp0o.jpg" },
    { tag: "05", headline: "The bleisure weekend", body: "", stat: "", statLabel: "", accent: T.orange, bg: "var(--surface-2)", img: "https://framerusercontent.com/images/OLnrOVVrjhLnXULOt0RWBQJJ30.jpg" },
    { tag: "06", headline: "Food and discovery", body: "", stat: "", statLabel: "", accent: "var(--accent-strong)", bg: "var(--page-bg)", img: "https://framerusercontent.com/images/KqpDMVbbYgwoEAK6vQioHlDmeQ.jpg" },
]

function RoleCard({ tag, headline, body, stat, statLabel, accent, bg, img }: typeof ROLES[0]) {
    const [hov, setHov] = useState(false)
    const imgRef = useRef<HTMLDivElement>(null)
    const imgInView = useInView(imgRef, { once: true, margin: "-8% 0px" })
    return (
        <TiltCard max={6} style={{ width: "min(380px, 84vw)", flexShrink: 0, display: "flex", borderRadius: 24 }}>
        <motion.div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ flex: 1, background: hov ? T.card : bg, border: "1px solid " + T.border, borderRadius: 24, padding: 36, display: "flex", flexDirection: "column", gap: 20, boxShadow: hov ? "0 20px 60px rgba(var(--text-rgb),0.12)" : "none", transition: "box-shadow 0.3s ease, background 0.3s ease" }}>
            <span style={{ display: "inline-block", fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: accent, border: "1.5px solid " + accent + "30", borderRadius: 100, padding: "4px 12px", alignSelf: "flex-start" }}>{tag}</span>
            <p style={{ fontSize: 22, fontFamily: "var(--font-sans)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 12px", color: T.ink }}>{headline}</p>
            {img ? (
                <div ref={imgRef} style={{ borderRadius: 14, overflow: "hidden", height: 200, position: "relative" }}>
                    <motion.img src={img} alt={headline}
                        initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.25 }}
                        animate={imgInView ? { clipPath: "inset(0% 0% 0% 0%)", scale: hov ? 1.08 : 1 } : {}}
                        transition={{ clipPath: { duration: 0.9, ease: EO }, scale: { duration: 0.7, ease: EO } }}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", willChange: "clip-path, transform" }} />
                </div>
            ) : null}
            {body ? <p style={{ fontSize: 14, fontFamily: "var(--font-sans)", lineHeight: 1.65, color: T.muted, margin: 0 }}>{body}</p> : null}
            {stat ? (
                <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid " + T.border }}>
                    <div style={{ fontSize: 36, fontFamily: "var(--font-sans)", fontWeight: 800, color: accent, letterSpacing: "-0.04em", lineHeight: 1 }}>{stat}</div>
                    <div style={{ fontSize: 12, fontFamily: "var(--font-sans)", fontWeight: 500, color: T.muted, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: 4 }}>{statLabel}</div>
                </div>
            ) : (
                <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid " + T.border, display: "flex", alignItems: "center", gap: 8 }}>
                    <PlaneGlyph size={14} rotate={45} color={accent} />
                    <span style={{ fontSize: 12, fontFamily: "var(--font-sans)", fontWeight: 600, color: T.muted, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>One tap away</span>
                </div>
            )}
        </motion.div>
        </TiltCard>
    )
}

function Roles() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    const sectionRef = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const cardWidth = 380
    const gap = 20
    // Pan ONLY by the amount the track overflows the viewport.
    // Wide screens fit all cards: panPx = 0, no pinned scroll at all.
    const pad = Math.min(64, Math.max(32, w * 0.05))
    const contentW = ROLES.length * cardWidth + (ROLES.length - 1) * gap + 64
    const panPx = Math.max(0, Math.round(pad + contentW - w))
    useEffect(() => {
        if (isMobile || isTablet || panPx === 0) return
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return
        const onScroll = () => {
            // rect.top = 0 when section-top at viewport-top (progress 0)
            // rect.top = -panPx when section scrolled up panPx (progress 1)
            const scrolledIn = -section.getBoundingClientRect().top
            const progress = Math.max(0, Math.min(1, scrolledIn / panPx))
            track.style.transform = `translateX(${-progress * panPx}px)`
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener("scroll", onScroll)
    }, [isMobile, isTablet, panPx])
    if (isMobile || isTablet) {
        return (
            <SectionWrapper>
                <section style={{ background: T.bg, padding: isMobile ? "80px 20px" : "80px 40px" }}>
                    <div style={{ marginBottom: 40 }}>
                        <SectionLabel>Experiences</SectionLabel>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "clamp(1.8rem,8vw,2.4rem)" : "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, margin: 0 }}>
                            <StaggerWords text="Business travel," /><br /><StaggerWords text="meet the trips people love." delay={0.15} />
                        </h2>
                    </div>
                    <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, WebkitOverflowScrolling: "touch" }}>
                        {ROLES.map(role => (
                            <div key={role.tag} style={{ minWidth: isMobile ? "min(300px,80vw)" : 340, flexShrink: 0 }}>
                                <RoleCard {...role} />
                            </div>
                        ))}
                    </div>
                </section>
            </SectionWrapper>
        )
    }
    // Section height = panPx + 100vh. scrollable = offsetHeight - innerHeight = panPx exactly.
    // panPx = 0 (all cards fit): height = 100vh, sticky never engages, zero dead scroll.
    return (
        <section ref={sectionRef} style={{ position: "relative", height: panPx === 0 ? "100dvh" : `calc(${panPx}px + 100dvh)`, background: T.bg }}>
            <div style={{ position: "sticky", top: 0, height: "100dvh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ paddingLeft: "clamp(32px,5vw,64px)", paddingRight: "clamp(32px,5vw,64px)", marginBottom: 48 }}>
                    <SectionLabel>Experiences</SectionLabel>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, margin: 0 }}>
                        <StaggerWords text="Business travel, meet the" /><br />
                        <StaggerWords text="trips people love." delay={0.15} />
                    </h2>
                </div>
                <div style={{ overflow: "hidden", paddingLeft: "clamp(32px,5vw,64px)" }}>
                    <div ref={trackRef} style={{ display: "flex", gap: 20, willChange: "transform" }}>
                        {ROLES.map(role => <RoleCard key={role.tag} {...role} />)}
                        <div style={{ minWidth: 64, flexShrink: 0 }} />
                    </div>
                </div>
                {panPx > 0 && (
                    <FadeUp style={{ paddingLeft: "clamp(32px,5vw,64px)", marginTop: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 28, height: 1, background: T.orange }} />
                            <span style={{ fontSize: 11, fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: T.muted }}>scroll to explore</span>
                        </div>
                    </FadeUp>
                )}
            </div>
        </section>
    )
}

// ─── HOW IT WORKS — immersive full-viewport sticky scroll ────────────────────
const STEPS = [
    { num: "01", title: "Plan", body: "Describe the trip in plain language. Miraee builds an in-policy itinerary in seconds.", accent: T.orange, bg: T.bg, tag: "Plain language" },
    { num: "02", title: "Book", body: "Flights, hotels and cars from Mondee wholesale inventory: real savings, one tap.", accent: "var(--accent-strong)", bg: T.bg2, tag: "Wholesale inventory" },
    { num: "03", title: "Expense", body: "Receipts, reports and reconciliation handled automatically. No forms, no chasing.", accent: T.orange, bg: "var(--surface-2)", tag: "Zero forms" },
    { num: "04", title: "Change", body: "Plans shift, the agent rebooks itself: within policy, before you even ask.", accent: "var(--accent-strong)", bg: T.bg, tag: "Self-rebooking" },
]

function StepPanel({ num, title, body, accent, bg, tag, index, total }: typeof STEPS[0] & { index: number; total: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: false, margin: "-20% 0px" })
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    return (
        <div ref={ref} style={{ position: "sticky", top: 0, height: "100dvh", background: bg, display: "flex", alignItems: "center", overflow: "hidden", zIndex: index + 1 }}>
            {/* Massive ghost number */}
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={inView ? { opacity: 0.045, x: 0 } : { opacity: 0, x: 60 }}
                transition={{ duration: 0.9, ease: EO }}
                style={{ position: "absolute", right: isMobile ? -20 : -10, top: "50%", transform: "translateY(-50%)", fontSize: isMobile ? "42vw" : "28vw", fontFamily: "var(--font-heading)", fontWeight: 900, color: T.ink, lineHeight: 1, userSelect: "none", pointerEvents: "none", letterSpacing: "-0.06em" }}>
                {num}
            </motion.div>
            {/* Orange side accent bar */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EO }}
                style={{ position: "absolute", left: 0, top: "15%", height: "70%", width: 3, background: accent, transformOrigin: "top", borderRadius: 2 }}
            />
            {/* Step counter top-right */}
            <div style={{ position: "absolute", top: 32, right: isMobile ? 20 : 64, display: "flex", alignItems: "center", gap: 12 }}>
                {Array.from({ length: total }).map((_, i) => (
                    <motion.div key={i}
                        animate={{ width: i === index ? 24 : 6, background: i === index ? accent : T.border }}
                        transition={{ duration: 0.4 }}
                        style={{ height: 6, borderRadius: 3 }}
                    />
                ))}
            </div>
            {/* Step product vignette (widescreen only: overlaps content below 1200) */}
            {w >= 1200 && (
                <div style={{ position: "absolute", right: "7%", top: "50%", transform: "translateY(-50%)", zIndex: 2 }}>
                    <StepVisual index={index} accent={accent} inView={inView} />
                </div>
            )}
            {/* Content */}
            <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "0 24px" : isTablet ? "0 40px" : "0 80px", maxWidth: isMobile ? "100%" : isTablet ? "100%" : 720 }}>
                {/* Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, delay: 0.05, ease: EO }}
                    style={{ marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: accent }}>
                    <span style={{ width: 20, height: 1.5, background: accent, display: "inline-block" }} />
                    {tag}
                </motion.div>
                {/* Step number small */}
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: EO }}
                    style={{ fontSize: 13, fontFamily: "var(--font-sans)", fontWeight: 700, color: accent, letterSpacing: "0.08em", margin: "0 0 12px" }}>
                    {num} / {String(total).padStart(2, "0")}
                </motion.p>
                {/* Title */}
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "clamp(3rem,12vw,5rem)" : isTablet ? "clamp(3.5rem,8vw,5.5rem)" : "clamp(4rem,7vw,7rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.045em", color: T.ink, margin: "0 0 32px" }}>
                    <StaggerWords text={title} delay={0.15} stagger={0.08} />
                </h2>
                {/* Body */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0.35, ease: EO }}
                    style={{ fontSize: isMobile ? 15 : 18, fontFamily: "var(--font-sans)", fontWeight: 400, lineHeight: 1.7, color: T.muted, margin: 0, maxWidth: 520 }}>
                    {body}
                </motion.p>
                {/* Accent line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: 64 } : { width: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: EO }}
                    style={{ height: 2, background: accent, borderRadius: 2, marginTop: 40 }}
                />
            </div>
        </div>
    )
}

function HowItWorks() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    return (
        <section style={{ position: "relative" }}>
            {/* Section header — scrolls away */}
            <div style={{ background: T.bg2, padding: isMobile ? "80px 20px 40px" : isTablet ? "80px 40px 40px" : "80px 64px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div>
                    <SectionLabel>How it works</SectionLabel>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "1.1rem" : "1.2rem", fontWeight: 500, color: T.muted, margin: 0, letterSpacing: "-0.01em" }}>
                        One agent, the whole journey: plan, book, expense, change.
                    </h3>
                </div>
                <span style={{ fontSize: 13, fontFamily: "var(--font-sans)", color: T.muted }}>Voice, chat or avatar · It remembers your preferences.</span>
            </div>
            {/* Sticky panels stack */}
            {STEPS.map((step, i) => (
                <StepPanel key={step.num} {...step} index={i} total={STEPS.length} />
            ))}
        </section>
    )
}

// ─── BUSINESS CASE ────────────────────────────────────────────────────────────
const CASE_STATS = [
    { stat: "20\u201330%", label: "Travel savings, validated apples-to-apples vs. incumbents", accent: T.orange },
    { stat: "100%", label: "Of the journey managed by the agent, end to end", accent: "var(--accent-strong)" },
    { stat: "1", label: "Platform for business and personal travel alike", accent: T.orange },
]

function Comparison() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    return (
        <SectionWrapper>
            <section style={{ background: T.bg, padding: isMobile ? "80px 20px" : isTablet ? "80px 40px" : "120px 64px", overflow: "hidden" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                    <SectionLabel accent={"var(--accent-strong)"}>The business case</SectionLabel>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "2rem" : "clamp(2rem,3.5vw,3.2rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, marginBottom: isMobile ? 40 : 64 }}>
                        <StaggerWords text="Loved by employees." /><br />
                        <span style={{ color: T.orange }}><StaggerWords text="Trusted by finance." delay={0.2} /></span>
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 20 : 24 }}>
                        {CASE_STATS.map((c, i) => (
                            <SlideIn key={c.stat} from="bottom" delay={i * 0.12}>
                                <TiltCard max={5} style={{ display: "flex", borderRadius: 24 }}>
                                    <div style={{ flex: 1, background: T.card, border: "1px solid " + T.border, borderRadius: 24, padding: isMobile ? "32px 28px" : "44px 36px", display: "flex", flexDirection: "column", gap: 16 }}>
                                        <div style={{ fontSize: "clamp(3rem,5vw,4.6rem)", fontFamily: "var(--font-heading)", fontWeight: 900, color: c.accent, letterSpacing: "-0.05em", lineHeight: 0.95 }}>{c.stat}</div>
                                        <div style={{ height: 2, width: 44, background: c.accent, opacity: 0.6 }} />
                                        <p style={{ fontSize: 15, fontFamily: "var(--font-sans)", lineHeight: 1.6, color: T.muted, margin: 0 }}>{c.label}</p>
                                    </div>
                                </TiltCard>
                            </SlideIn>
                        ))}
                    </div>
                </div>
            </section>
        </SectionWrapper>
    )
}

// ─── FOR AIRLINES & SUPPLIERS ─────────────────────────────────────────────────
const SEC_BADGES = [
    { icon: "◈", label: "Premium travelers", sub: "Access to a large, engaged base of premium travelers" },
    { icon: "⬡", label: "Brand-forward NDC", sub: "Brand-forward content and real-time merchandising over NDC" },
    { icon: "◉", label: "The whole traveler", sub: "Win business travel and their personal travel alike" },
]

function Security() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    const mediaRef = useRef<HTMLDivElement>(null)
    const mediaInView = useInView(mediaRef, { once: true, margin: "-12% 0px" })
    const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] })
    const mediaY = useTransform(scrollYProgress, [0, 1], [30, -30])
    const [imgHov, setImgHov] = useState(false)
    return (
        <SectionWrapper>
            <section style={{ background: T.bg2, padding: isMobile ? "80px 20px" : isTablet ? "80px 40px" : "120px 64px", overflow: "hidden" }}>
                <div className="max-w-[1280px] mx-auto">
                    <div style={{ display: "flex", flexDirection: isMobile || isTablet ? "column" : "row", gap: isMobile ? 40 : isTablet ? 48 : 80, alignItems: "center" }}>
                        <div className="flex-1 min-w-0">
                            <SectionLabel>For airlines and suppliers</SectionLabel>
                            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "2rem" : "clamp(1.8rem,2.8vw,2.8rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.03em", color: T.ink, margin: 0 }}>
                                <StaggerWords text="Be part of your travelers’" /><br />
                                <span style={{ color: "var(--accent-strong)" }}><StaggerWords text="best experiences." delay={0.2} /></span>
                            </h2>
                            <FadeUp delay={0.3} style={{ marginTop: 20 }}>
                                <p style={{ fontSize: 15, fontFamily: "var(--font-sans)", lineHeight: 1.65, color: T.muted, margin: "0 0 28px", maxWidth: 480 }}>Miraee puts your brand in front of premium, high-frequency travelers, for the business trip and the personal one, with content you control.</p>
                            </FadeUp>
                            <div className="flex flex-col gap-4 mb-8">
                                {SEC_BADGES.map((b, i) => (
                                    <SlideIn key={b.label} from="left" delay={0.35 + i * 0.12}>
                                        <div className="flex items-start gap-3.5">
                                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.45 + i * 0.12 }}
                                                className="w-2 h-2 rounded-full bg-orange mt-[7px] shrink-0" />
                                            <div>
                                                <span className="text-[15px] font-bold text-fg">{b.label}. </span>
                                                <span className="text-[15px] leading-[1.6] text-fg-muted">{b.sub}.</span>
                                            </div>
                                        </div>
                                    </SlideIn>
                                ))}
                            </div>
                            <FadeUp delay={0.8}>
                                <Magnetic><motion.a href="/book-a-demo" whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(229,86,2,0.25)" }} whileTap={{ scale: 0.97 }} style={{ display: "inline-flex", background: T.accent, color: T.cream, border: "none", borderRadius: 12, padding: "13px 26px", fontSize: 14, fontFamily: "var(--font-sans)", fontWeight: 700, cursor: "pointer", textDecoration: "none" }}>Partner with Miraee</motion.a></Magnetic>
                            </FadeUp>
                        </div>
                        {/* Media: clip reveal + scroll parallax */}
                        <div ref={mediaRef} style={{ flex: isMobile || isTablet ? "0 0 auto" : "0 0 44%", width: isMobile || isTablet ? "100%" : undefined }}>
                            <motion.div style={{ y: isMobile ? 0 : mediaY, borderRadius: 28, overflow: "hidden", boxShadow: "0 32px 80px rgba(69,14,20,0.12)" }}
                                onMouseEnter={() => setImgHov(true)} onMouseLeave={() => setImgHov(false)}>
                                <motion.img src="https://framerusercontent.com/images/lS1MsTKdDET0sJLlXRCt44HdDFY.jpg" alt="Travelers enjoying a local experience"
                                    initial={{ clipPath: "inset(0% 100% 0% 0%)", scale: 1.2 }}
                                    animate={mediaInView ? { clipPath: "inset(0% 0% 0% 0%)", scale: imgHov ? 1.06 : 1 } : {}}
                                    transition={{ clipPath: { duration: 1.1, ease: EO }, scale: { duration: 0.8, ease: EO } }}
                                    style={{ width: "100%", height: isMobile ? 280 : 440, objectFit: "cover", display: "block", willChange: "clip-path, transform" }} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </SectionWrapper>
    )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
    const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.0005 })
    // Act 1: wordmark flies past the camera. Act 2: the ask arrives.
    const logoScale = useTransform(smooth, [0, 0.45], [0.5, 7])
    const logoOpacity = useTransform(smooth, [0, 0.08, 0.32, 0.45], [0, 1, 1, 0])
    const contentOpacity = useTransform(smooth, [0.48, 0.68], [0, 1])
    const contentY = useTransform(smooth, [0.48, 0.72], [70, 0])
    const contentScale = useTransform(smooth, [0.48, 0.72], [0.95, 1])
    return (
        <div ref={ref} style={{ height: "380vh", position: "relative", background: T.bg, paddingBottom: 48 }}>
            <div style={{ position: "sticky", top: 12, height: "calc(100dvh - 24px)", margin: "0 12px", borderRadius: 32, background: T.maroon, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.22) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-15%", left: "-8%", width: "35vw", height: "35vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,246,242,0.06) 0%, transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />
                <CtaRoutes />
                {/* Act 1: wordmark fly-through */}
                <motion.div style={{ position: "absolute", scale: logoScale, opacity: logoOpacity, willChange: "transform, opacity", pointerEvents: "none" }}>
                    <MiraeeLogo fill={T.cream} height={isMobile ? 56 : 100} />
                </motion.div>
                {/* Act 2: the ask */}
                <motion.div style={{ opacity: contentOpacity, y: contentY, scale: contentScale, maxWidth: 1280, width: "100%", padding: isMobile ? "0 20px" : isTablet ? "0 40px" : "0 64px", position: "relative", zIndex: 2, willChange: "transform, opacity" }}>
                    <div style={{ maxWidth: 780 }}>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? "2.2rem" : "clamp(2.5rem,5vw,5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: T.cream, margin: "0 0 24px" }}>
                            Give every employee<br />an AI travel agent.
                        </h2>
                        <p style={{ fontSize: isMobile ? 16 : 18, fontFamily: "var(--font-sans)", lineHeight: 1.65, color: "rgba(251,246,242,0.65)", margin: "0 0 40px", maxWidth: 500 }}>Effortless for travelers. Controlled for finance. Rewarding for everyone.</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                            <Magnetic><motion.a href="/book-a-demo" whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(0,0,0,0.3)" }} whileTap={{ scale: 0.97 }} style={{ display: "inline-flex", background: T.cream, color: T.maroon, border: "none", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontFamily: "var(--font-sans)", fontWeight: 800, cursor: "pointer", textDecoration: "none" }}>Book a demo</motion.a></Magnetic>
                            <Magnetic><motion.a href="/book-a-demo" whileHover={{ borderColor: "rgba(251,246,242,0.5)" }} style={{ display: "inline-flex", background: "transparent", color: T.cream, border: "1.5px solid rgba(251,246,242,0.2)", borderRadius: 12, padding: "14px 28px", fontSize: 15, fontFamily: "var(--font-sans)", fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>Partner with Miraee</motion.a></Magnetic>
                        </div>
                        <p style={{ fontSize: 13, fontFamily: "var(--font-sans)", color: "rgba(251,246,242,0.4)", margin: "24px 0 0" }}>Built by Tabhi.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const footRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: footRef, offset: ["start end", "end end"] })
    const wmY = useTransform(scrollYProgress, [0, 1], [160, 0])
    const wmOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 0.06])
    const COLS = [
        { title: "Company", links: ["About Tabhi", "Careers", "Newsroom", "Support"] },
        { title: "Partners", links: ["For airlines", "For suppliers", "Distribution"] },
        { title: "Legal", links: ["Terms & Conditions", "Privacy", "Security"] },
    ]
    const LINK_HREFS: Record<string, string> = {
        "About Tabhi": "https://www.tabhi.com/",
        "Careers": "/",
        "Newsroom": "/",
        "Support": "/support",
        "For airlines": "/",
        "For suppliers": "/",
        "Distribution": "/",
        "Terms & Conditions": "/terms",
        "Privacy": "/privacy",
        "Security": "/",
    }
    return (
        <SectionWrapper>
            <footer ref={footRef} style={{ background: "#0F0407", padding: isMobile ? "60px 20px 40px" : "80px 64px 48px", position: "relative", overflow: "hidden" }}>
                {/* Giant watermark rises as the footer enters */}
                <motion.div style={{ y: wmY, opacity: wmOpacity, position: "absolute", bottom: isMobile ? -20 : -50, left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
                    <MiraeeLogo fill={T.cream} height={isMobile ? 120 : 260} />
                </motion.div>
                <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
                    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 48 : 80, marginBottom: 64 }}>
                        <div style={{ flex: "0 0 auto", maxWidth: 280 }}>
                            <MiraeeLogo fill={T.orange} height={28} />
                            <p style={{ fontSize: 14, fontFamily: "var(--font-sans)", lineHeight: 1.65, color: "rgba(251,246,242,0.45)", marginTop: 20, marginBottom: 0 }}>The AI-native employee travel platform. A Tabhi company.</p>
                            <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
                                <motion.a href="/book-a-demo" whileHover={{ scale: 1.03 }} style={{ display: "inline-flex", background: T.orange, color: T.white, border: "none", borderRadius: 10, padding: "11px 22px", fontSize: 13, fontFamily: "var(--font-sans)", fontWeight: 700, cursor: "pointer", textDecoration: "none" }}>Book a demo</motion.a>
                                <motion.a href="/support" whileHover={{ scale: 1.03, borderColor: "rgba(251,246,242,0.5)" }}
                                    style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "transparent", color: T.cream, border: "1.5px solid rgba(251,246,242,0.25)", borderRadius: 10, padding: "11px 20px", fontSize: 13, fontFamily: "var(--font-sans)", fontWeight: 700, cursor: "pointer", textDecoration: "none" }}>
                                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                                    Support
                                </motion.a>
                            </div>
                        </div>
                        <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr", gap: 32 }}>
                            {COLS.map(col => (
                                <div key={col.title}>
                                    <p style={{ fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(251,246,242,0.35)", margin: "0 0 16px" }}>{col.title}</p>
                                    {col.links.map(link => (
                                        <a key={link} href={LINK_HREFS[link] || "#"}
                                            target={(LINK_HREFS[link] || "").indexOf("http") === 0 ? "_blank" : undefined}
                                            rel={(LINK_HREFS[link] || "").indexOf("http") === 0 ? "noopener noreferrer" : undefined}
                                            style={{ display: "block", fontSize: 14, fontFamily: "var(--font-sans)", fontWeight: 500, color: "rgba(251,246,242,0.55)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                                            onMouseEnter={e => (e.currentTarget.style.color = T.cream)}
                                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(251,246,242,0.55)")}>{link}</a>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-t-[rgba(251,246,242,0.08)] pt-7 flex justify-between items-center flex-wrap gap-3">
                        <p className="text-[13px] text-[rgba(251,246,242,0.28)] m-0">
                            © 2026 Miraee, a Tabhi company. <a href="/privacy" style={{ color: "rgba(251,246,242,0.5)", textDecoration: "none", fontWeight: 600 }}>Privacy</a> · <a href="/terms" style={{ color: "rgba(251,246,242,0.5)", textDecoration: "none", fontWeight: 600 }}>Terms</a> · Security
                        </p>
                        <p className="text-[13px] text-[rgba(251,246,242,0.28)] m-0">Built by Tabhi AI</p>
                    </div>
                </div>
            </footer>
        </SectionWrapper>
    )
}

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function MiraeeLandingPage({ style }: { style?: React.CSSProperties }) {
    useEffect(() => {
        if (typeof document === "undefined") return
        let meta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null
        if (!meta) { meta = document.createElement("meta") as HTMLMetaElement; meta.name = "viewport"; document.head.appendChild(meta) }
        meta.content = "width=device-width, initial-scale=1, maximum-scale=5"
    }, [])
    return (
        <div style={{ fontFamily: "var(--font-sans)", WebkitFontSmoothing: "antialiased", backgroundColor: T.bg, width: "100%", ...style }}>
            <ScrollProgress />
            <Nav />
            <IntroCover />
            <GrainOverlay />
            <div data-chapter="Intro"><Hero /></div>
            <StatStrip />
            <div data-chapter="The shift"><ZTunnel /></div>
            <div data-chapter="Problem"><DepthExit><Problem /></DepthExit></div>
            <div data-chapter="Solution"><Solution /></div>
            <KineticBand line1="ONE PLATFORM" line2="THE WHOLE JOURNEY" />
            <div data-chapter="Capabilities"><Capabilities /></div>
            <div data-chapter="Roles"><Roles /></div>
            <div data-chapter="How it works"><HowItWorks /></div>
            <KineticBand line1="LOVED BY EMPLOYEES" line2="TRUSTED BY FINANCE" bg={T.bg2} />
            <div data-chapter="Proof"><DepthExit><Comparison /></DepthExit></div>
            <div data-chapter="Trust"><DepthExit><Security /></DepthExit></div>
            <div data-chapter="Begin"><CTA /></div>
            <Footer />
        </div>
    )
}
