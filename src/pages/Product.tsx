import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import V11Hero from "../components/V11Hero"
import "./HomeV12.css"
import V11PageImage from "../components/V11PageImage"
import productPageImg from "../../images/weavy/v1/v1-home-hero.webp"
import financeDashboard from "../assets/ui-admin-dashboard.png"
import miraeeMobileUi from "../assets/miraee-mobile-phone.png"
gsap.registerPlugin(ScrollTrigger)

// ─── Design tokens ───────────────────────────────────────────────────────────
const T = {
    ink:    "var(--text)",
    maroon: "#450E14",
    orange: "#E55602",
    cream:  "#FBF6F2",
    white:  "#FFFFFF",
    muted:  "rgba(var(--text-rgb),0.45)",
    mutedLight: "rgba(var(--text-rgb),0.12)",
    accent: "var(--accent-strong)",
}

// ─── Mouse parallax ──────────────────────────────────────────────────────────
function useWindowWidth() {
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1440)
    useEffect(() => {
        const fn = () => setW(window.innerWidth)
        window.addEventListener("resize", fn)
        return () => window.removeEventListener("resize", fn)
    }, [])
    return w
}

// ─── Ripple hook ─────────────────────────────────────────────────────────────
function useRipple() {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
    const trigger = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const id = Date.now()
        setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
        setTimeout(() => setRipples(r => r.filter(rr => rr.id !== id)), 600)
    }, [])
    const rippleEls = ripples.map(r => (
        <motion.span key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 6, opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{ position: "absolute", borderRadius: "50%", width: 40, height: 40, background: "rgba(255,255,255,0.35)", pointerEvents: "none", left: r.x - 20, top: r.y - 20, zIndex: 10 }} />
    ))
    return { trigger, rippleEls }
}

// ─── Tilt card ───────────────────────────────────────────────────────────────
function TiltCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const onMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        setTilt({ x: ((e.clientX - rect.left) / rect.width - 0.5) * 14, y: ((e.clientY - rect.top) / rect.height - 0.5) * -14 })
    }, [])
    return (
        <div ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
            onMouseMove={onMove}
            style={{
                transform: hovered ? `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` : "perspective(900px) rotateX(0deg) rotateY(0deg)",
                transition: hovered ? "transform 0.08s ease-out" : "transform 0.5s ease",
                ...style,
            }}>
            {children}
        </div>
    )
}

// ─── Reveal wrapper ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none" }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.25 })
    const initMap = { up: { y: 48, opacity: 0 }, left: { x: -48, opacity: 0 }, right: { x: 48, opacity: 0 }, none: { opacity: 0 } }
    const init = initMap[direction]
    return (
        <motion.div ref={ref}
            initial={init}
            animate={inView ? { x: 0, y: 0, opacity: 1 } : init}
            transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>
            {children}
        </motion.div>
    )
}

// ─── Smooth scroll ────────────────────────────────────────────────────────────
function SmoothScrollStyle() {
    useEffect(() => {
        if (typeof document === "undefined") return
        const existing = document.getElementById("prod-scroll-style")
        if (existing) return
        const s = document.createElement("style")
        s.id = "prod-scroll-style"
        s.textContent = `html{scroll-behavior:smooth;} *{-webkit-font-smoothing:antialiased;}`
        document.head.appendChild(s)
    }, [])
    return null
}

// ─── Magnetic button ─────────────────────────────────────────────────────────
function useMagnet(strength = 0.35) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const sx = useSpring(x, { stiffness: 200, damping: 18 })
    const sy = useSpring(y, { stiffness: 200, damping: 18 })
    const onMove = useCallback((e: MouseEvent) => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
    }, [strength, x, y])
    const onLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])
    useEffect(() => {
        const el = ref.current; if (!el) return
        el.addEventListener("mousemove", onMove); el.addEventListener("mouseleave", onLeave)
        return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave) }
    }, [onMove, onLeave])
    return { ref, sx, sy }
}

// ─── Scroll counter ───────────────────────────────────────────────────────────
// ─── Section label ────────────────────────────────────────────────────────────
function Label({ text }: { text: string }) {
    return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.muted }}>
                {text}
            </span>
        </div>
    )
}

// ─── 2.1 HERO ────────────────────────────────────────────────────────────────


// ─── 2.4 PERSONALISATION ENGINE ───────────────────────────────────────────────
function PersonalisationEngine() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const cards = [
        {
            num: "01",
            tag: "Traveler context",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="3.5" stroke={T.accent} strokeWidth="1.8"/>
                    <path d="M5 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke={T.accent} strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
            ),
            body: "Preferences, loyalty programs, seat and cabin history, dietary and accessibility needs. Asked once. Applied always.",
            accent: T.accent,
        },
        {
            num: "02",
            tag: "Company context",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="10" rx="2" stroke={T.orange} strokeWidth="1.8"/>
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={T.orange} strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1.2" fill={T.orange}/>
                </svg>
            ),
            body: "Per diem policy, card rules, budget ownership, approval chains, preferred suppliers. Set once. Enforced everywhere.",
            accent: T.orange,
        },
        {
            num: "03",
            tag: "Trip state",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#1a6b4a" strokeWidth="1.8"/>
                    <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" stroke="#1a6b4a" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
            ),
            body: "Every search, decision, booking, change, payment and receipt, live, in one place.",
            accent: "#1a6b4a",
        },
    ]
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                    <Reveal direction="none">
                        <Label text="One Continuous Context" />
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            The context <span style={{ color: T.accent }}>never resets.</span>
                        </h2>
                    </Reveal>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 28 }}>
                    {cards.map((c, i) => (
                        <Reveal key={c.tag} direction="up" delay={i * 0.12}>
                            <TiltCard style={{ height: "100%" }}>
                                <div style={{ background: "var(--page-bg)", borderRadius: 20, padding: "40px 36px", border: `1px solid ${T.mutedLight}`, height: "100%", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: `color-mix(in srgb, ${c.accent} 6%, transparent)` }} />
                                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                                        <div style={{ width: 52, height: 52, borderRadius: 14, background: `color-mix(in srgb, ${c.accent} 8%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            {c.icon}
                                        </div>
                                        <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, color: c.accent, opacity: 0.7 }}>{c.num}</span>
                                    </div>
                                    <div style={{ display: "inline-block", background: `color-mix(in srgb, ${c.accent} 8%, transparent)`, color: c.accent, fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 16 }}>
                                        {c.tag}
                                    </div>
                                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.65, color: T.muted, margin: 0 }}>{c.body}</p>
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>

                {/* Closing strip */}
                <Reveal delay={0.3} direction="none">
                    <div style={{ marginTop: 56, textAlign: "center" }}>
                        <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: 14, padding: "14px 28px", borderRadius: 100, background: `color-mix(in srgb, ${T.accent} 5%, transparent)`, border: `1px solid ${T.mutedLight}`, marginBottom: 20 }}>
                            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.accent }}>
                                One thread · One policy layer · One data layer
                            </span>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.4b SIX CAPABILITIES — DEEP DIVES ───────────────────────────────────────
function CapabilityCard({ cap, index: _index, open, onToggle }: { cap: any; index: number; open: boolean; onToggle: () => void }) {
    return (
        <div style={{ background: "var(--surface)", borderRadius: 20, border: `1px solid ${T.mutedLight}`, overflow: "hidden" }}>
            <button onClick={onToggle} aria-expanded={open}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 24, padding: "28px 32px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 32, fontWeight: 700, color: T.accent, opacity: 0.55, flexShrink: 0, minWidth: 48 }}>{cap.num}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange, marginBottom: 6 }}>{cap.tag}</div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(19px, 2vw, 24px)", fontWeight: 700, color: T.ink, margin: 0, lineHeight: 1.25 }}>{cap.headline}</h3>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, color: T.accent, whiteSpace: "nowrap" }}>{cap.proof}</div>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ fontSize: 24, color: T.orange, lineHeight: 1 }}>+</motion.span>
                </div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" as const }} style={{ overflow: "hidden" }}>
                        <div style={{ padding: "0 32px 32px 32px", display: "grid", gridTemplateColumns: "1fr", gap: 20, maxWidth: 760, marginLeft: 72 }}>
                            <div>
                                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, marginBottom: 6 }}>Trigger</div>
                                <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.65, color: T.ink, margin: 0 }}>{cap.trigger}</p>
                            </div>
                            <div>
                                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, marginBottom: 6 }}>What the agent does</div>
                                <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.65, color: T.ink, margin: 0 }}>{cap.does}</p>
                            </div>
                            <div>
                                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, marginBottom: 6 }}>What you control</div>
                                <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.65, color: T.ink, margin: 0 }}>{cap.control}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function SixCapabilities() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const [openIdx, setOpenIdx] = useState<number>(0)

    const caps = [
        {
            num: "01", tag: "Plan",
            headline: "Describe the trip. Get the itinerary.",
            trigger: "A sentence",
            does: "Reads intent, checks the calendar, applies policy for the traveler's role, returns one recommended journey with alternates",
            control: "Which options are compliant; approval thresholds",
            proof: "Under a minute †",
        },
        {
            num: "02", tag: "Book",
            headline: "One approval. Everything booked together.",
            trigger: "Approval, or auto-booking inside limits",
            does: "Books flight, hotel, rail and car as one trip, applies wholesale rates, issues a virtual card",
            control: "Payment and card rules; entity and cost-centre allocation",
            proof: "20 to 30% below published fares *",
        },
        {
            num: "03", tag: "Expense",
            headline: "The report writes itself.",
            trigger: "The transaction",
            does: "Captures the receipt, codes it, matches it to the booking, posts to your ERP",
            control: "Chart-of-accounts mapping, coding rules, optional final approval",
            proof: "No expense report to file",
        },
        {
            num: "04", tag: "Change",
            headline: "One decision, not a support queue.",
            trigger: "A cancellation, delay or message",
            does: "Detects disruption, often before the airline notifies, prices alternatives, rebooks within limits or presents one choice",
            control: "What the agent may rebook alone; spend ceilings",
            proof: "Every segment monitored 24/7",
        },
        {
            num: "05", tag: "Support",
            headline: "A real person, in the same thread.",
            trigger: "Anything the traveler hands to a human",
            does: "Escalates with the full trip context attached, so nobody repeats themselves",
            control: "Escalation rules by trip type, traveler or region",
            proof: "24/7 human support",
        },
        {
            num: "06", tag: "Personal travel",
            headline: "The same agent. Separate spend.",
            trigger: "A personal request in the same conversation",
            does: "Books on the traveler's own card, applies corporate rates where permitted, never touches company money",
            control: "Whether personal travel is enabled at all",
            proof: "One agent, two ledgers",
        },
    ]

    return (
        <section id="capabilities" style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <Reveal direction="none">
                        <Label text="Six Capabilities" />
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            Six <span style={{ color: T.accent, fontStyle: "italic" }}>capabilities.</span>
                        </h2>
                    </Reveal>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {caps.map((cap, i) => (
                        <Reveal key={cap.num} direction="up" delay={i * 0.05}>
                            <CapabilityCard cap={cap} index={i} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
                        </Reveal>
                    ))}
                </div>

                {/* Footnotes — required inline with every stat (see stat table) */}
                <Reveal delay={0.2} direction="none">
                    <p style={{ marginTop: 32, fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.7, color: T.muted }}>
                        * On comparable itineraries. Results vary by program, route mix and adoption. † Typical single-city trips.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.5 ANALYTICS & INSIGHTS ─────────────────────────────────────────────────
function AnalyticsInsights() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const chartRef = useRef<HTMLDivElement>(null)
    const inView = useInView(chartRef, { once: true, amount: 0.4 })
    const bars = [
        { label: "Jan", value: 45, color: T.accent },
        { label: "Feb", value: 62, color: T.accent },
        { label: "Mar", value: 38, color: T.accent },
        { label: "Apr", value: 78, color: T.orange },
        { label: "May", value: 55, color: T.accent },
        { label: "Jun", value: 88, color: T.accent },
    ]
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 80, alignItems: "center" }}>
                    <div>
                        <Reveal direction="left">
                            <Label text="Analytics & Insights" />
                            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                                Every trip,<br />
                                <span style={{ color: T.accent, fontStyle: "italic" }}>visible while it happens.</span>
                            </h2>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.75, color: T.muted, margin: 0 }}>
                                Committed spend, savings against published fares, out-of-policy rate and open exceptions, by team, entity and route. Exportable at any time.
                            </p>
                        </Reveal>
                    </div>

                    {/* Animated dashboard mockup */}
                    <Reveal direction="right" delay={0.1}>
                        <div style={{ background: "var(--surface)", borderRadius: 24, padding: 32, boxShadow: "0 24px 64px rgba(var(--text-rgb),0.1)", border: `1px solid ${T.mutedLight}` }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                                <div>
                                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, color: T.ink }}>Travel Spend</div>
                                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: T.muted, marginTop: 2 }}>Jan — Jun 2025</div>
                                </div>
                                <div style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", padding: "6px 12px", borderRadius: 100, fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700 }}>
                                    ↓ 20–30% vs. published fares
                                </div>
                            </div>
                            <div ref={chartRef} style={{ display: "flex", gap: 10, alignItems: "flex-end", height: 160, padding: "0 0 0", marginBottom: 16 }}>
                                {bars.map((b, i) => (
                                    <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={inView ? { height: `${b.value}%` } : {}}
                                            transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                            style={{ width: "100%", borderRadius: "6px 6px 0 0", background: b.color, opacity: b.label === "Apr" ? 1 : 0.7 }} />
                                        <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: T.muted }}>{b.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ borderTop: `1px solid ${T.mutedLight}`, paddingTop: 16, display: "flex", gap: 20 }}>
                                {[{ k: "Total", v: "$142K" }, { k: "Savings", v: "$40K" }, { k: "OOP", v: "2.1%" }].map(({ k, v }) => (
                                    <div key={k}>
                                        <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: T.muted }}>{k}</div>
                                        <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: T.ink }}>{v}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p style={{ marginTop: 14, fontFamily: "var(--font-sans)", fontSize: 12, color: T.muted, textAlign: "center" }}>
                            Illustrative dashboard. Sample data.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

// ─── 2.7-pre SUPPLY (one line, full treatment lives on About) ─────────────────
function Supply() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "72px 20px" : "96px 80px" }}>
            <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
                <Reveal direction="none">
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? 17 : 20, lineHeight: 1.75, color: T.ink, margin: 0 }}>
                        Miraee books against Mondee&rsquo;s direct supply: 500+ airlines and 2M+ hotels, plus Abhee&rsquo;s hyperlocal experiences. Most platforms compete on software. We compete on software and supply.{" "}
                        <a href="/v1.1/about" style={{ color: T.orange, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>&rarr;</a>
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.7 INTEGRATIONS ─────────────────────────────────────────────────────────
function Integrations() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const cats = [
        {
            title: "Identity",
            pills: ["SAML", "OIDC", "SCIM", "Okta", "Microsoft Entra"],
            body: "SSO via SAML and OIDC, SCIM provisioning, Okta, Microsoft Entra.",
        },
        {
            title: "People",
            pills: ["HRIS"],
            body: "HRIS for roles, cost centres and approval chains.",
        },
        {
            title: "Finance",
            pills: ["ERP", "Accounting", "Card networks"],
            body: "ERP and accounting systems, corporate card and payment networks.",
        },
        {
            title: "Work",
            pills: ["Calendar", "Email", "Chat"],
            body: "Calendar, email and chat, so trips start where the request happens.",
        },
    ]
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                    <Reveal direction="none">
                        <Label text="Connected Systems" />
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            Fits the systems<br />
                            <span style={{ color: T.accent, fontStyle: "italic" }}>you already run.</span>
                        </h2>
                    </Reveal>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 28 }}>
                    {cats.map((c, ci) => (
                        <Reveal key={c.title} direction="up" delay={ci * 0.1}>
                            <div style={{ background: "var(--page-bg)", borderRadius: 20, padding: "32px 32px", border: `1px solid ${T.mutedLight}` }}>
                                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>{c.title}</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                                    {c.pills.map((p, pi) => (
                                        <motion.div key={p}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: ci * 0.1 + pi * 0.06 }}
                                            whileHover={{ scale: 1.05, background: T.maroon, color: T.cream }}
                                            style={{ padding: "8px 16px", borderRadius: 100, background: "var(--surface)", border: `1px solid ${T.mutedLight}`, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: T.ink, cursor: "default", transition: "background 0.2s, color 0.2s" }}>
                                            {p}
                                        </motion.div>
                                    ))}
                                </div>
                                <p style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.6, color: T.muted, margin: 0 }}>{c.body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={0.3} direction="none">
                    <div style={{ textAlign: "center", marginTop: 48 }}>
                        <a href="/v1.1/technology#developers" style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                            Unified API and developer sandbox →
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.7b COMPARISON POINTER (the only comparison table lives on Why Miraee) ──
function ComparisonPointer() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "72px 20px" : "96px 80px" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
                <Reveal direction="none">
                    <a href="/v1.1/why-miraee" style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? 17 : 20, fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                        Compare Miraee side by side with legacy TMCs and first-gen T&amp;E tools &rarr;
                    </a>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.7c ONE PLATFORM, TWO VIEWS ──────────────────────────────────────────────
function TwoViews() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <Reveal direction="none">
                        <Label text="One Platform, Two Views" />
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 0" }}>
                            One platform.<br /><span style={{ color: T.accent, fontStyle: "italic" }}>Two views.</span>
                        </h2>
                    </Reveal>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr", gap: 24, alignItems: "stretch" }}>
                    <Reveal direction="left">
                        <div style={{ background: "var(--page-bg)", borderRadius: 20, border: `1px solid ${T.mutedLight}`, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                            <div style={{ padding: "40px 36px 0" }}>
                                <div style={{ display: "inline-block", background: `color-mix(in srgb, ${T.accent} 8%, transparent)`, color: T.accent, fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 20 }}>Web console</div>
                                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: T.muted, marginBottom: 6 }}>Who</div>
                                <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: T.ink, marginBottom: 24 }}>Finance and travel teams</div>
                                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: T.muted, marginBottom: 6 }}>Holds</div>
                                <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.75, color: T.ink, margin: 0 }}>
                                    Policy, approvals, live spend, <strong>duty of care</strong>, reporting and exports.
                                </p>
                            </div>
                            <div style={{ flex: 1, minHeight: 300, marginTop: 32, padding: "0 28px 28px", display: "flex" }}>
                                <div style={{ width: "100%", borderRadius: 14, overflow: "hidden", border: `1px solid ${T.mutedLight}`, boxShadow: "0 24px 48px rgba(15,4,7,0.16)", display: "flex", flexDirection: "column" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", background: "#EDEAE6" }}>
                                        <div style={{ display: "flex", gap: 6 }}>
                                            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ED6A5E" }} />
                                            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#F4BF4F" }} />
                                            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#61C454" }} />
                                        </div>
                                        <div style={{ flex: 1, background: "#fff", borderRadius: 6, padding: "4px 10px", fontFamily: "var(--font-sans)", fontSize: 11, color: T.muted }}>app.miraee.ai/overview</div>
                                    </div>
                                    <div style={{ position: "relative", flex: 1, overflow: "hidden", background: "#F4F1EC" }}>
                                        <img src={financeDashboard} alt="Miraee admin dashboard showing travel spend, compliance, and active trips" loading="lazy"
                                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "center top" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal direction="right" delay={0.1}>
                        <div style={{ background: T.maroon, borderRadius: 20, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                            <div style={{ padding: "40px 36px 0" }}>
                                <div style={{ display: "inline-block", background: "rgba(251,246,242,0.15)", color: T.cream, fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 20 }}>Mobile app</div>
                                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(251,246,242,0.55)", marginBottom: 6 }}>Who</div>
                                <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: T.cream, marginBottom: 24 }}>Travelers</div>
                                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(251,246,242,0.55)", marginBottom: 6 }}>Holds</div>
                                <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.75, color: T.cream, margin: 0 }}>
                                    Ask, book, change, reach support, capture receipts, plan personal trips.
                                </p>
                            </div>
                            <div style={{ flex: 1, minHeight: 300, marginTop: 24, padding: "0 28px 28px", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
                                <img src={miraeeMobileUi} alt="Miraee mobile app showing an AI travel assistant and flight options" loading="lazy"
                                    style={{ width: "min(64%, 210px)", height: "auto", maxHeight: "100%", objectFit: "contain", objectPosition: "center bottom", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.35))" }} />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

// ─── 2.7d FAQ ───────────────────────────────────────────────────────────────────
function ProductFaqItem({ q, a, index }: { q: string; a: React.ReactNode; index: number }) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{ borderBottom: `1px solid ${T.mutedLight}` }}>
            <button onClick={() => setOpen(o => !o)} aria-expanded={open}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "22px 4px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, flexShrink: 0 }}>{String(index + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 16, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink }}>{q}</span>
                </span>
                <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
                    style={{ fontSize: 20, color: T.orange, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" as const }} style={{ overflow: "hidden" }}>
                        <p style={{ margin: "0 0 24px 40px", fontSize: 14.5, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.8, maxWidth: 680 }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function ProductFAQ() {
    const w = useWindowWidth()
    const isMobile = w < 768

    // Doc Page 2 section 8 — ten questions, answers must match the stat table.
    const faqs: [string, React.ReactNode][] = [
        ["What is Miraee?", "An AI-native corporate travel platform. One agent plans, books, changes and expenses each trip inside your policy, with a human available in the same thread."],
        ["How is it different from a TMC?", "A TMC puts expert humans between the traveler and the booking. Miraee puts an agent there and keeps humans for exceptions, with no per-transaction fee."],
        ["What is an AI agent here?", "A bounded, permissioned worker with one job, its own tools and a written limit on what it may do alone. Six of them run a trip."],
        ["How is policy enforced?", "At search. The agent only shows compliant options, so approval handles real exceptions rather than catching violations."],
        ["Do employees still file expense reports?", "No. Receipts are captured, coded and matched to the booking at the transaction and posted to your ERP."],
        ["What happens when a flight is disrupted?", "The agent detects it, prices alternatives and rebooks within your limits, or brings the traveler one decision. A person is available 24/7."],
        ["Can employees book personal travel?", "If you enable it. Same agent, the traveler's own card, separate ledger."],
        ["Where does the inventory come from?", "Mondee's direct contracts with 500+ airlines and 2M+ hotels, plus Abhee experiences."],
        ["What does it integrate with?", "Identity, HRIS, ERP and accounting, card networks, calendar and chat. See Connected systems above."],
        ["How long does implementation take?", "Pilots typically run four to six weeks. Full deployment in as little as 90 days."],
    ]

    return (
        <section style={{ padding: isMobile ? "80px 24px" : "120px 80px", background: "var(--page-bg)" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 40 : 56, textAlign: "center" }}>
                        <Label text="FAQ" />
                        <h2 style={{ fontSize: isMobile ? 28 : 44, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0 }}>
                            Questions people ask before they book a demo.
                        </h2>
                    </div>
                </Reveal>
                <Reveal>
                    <div>
                        {faqs.map(([q, a], i) => <ProductFaqItem key={q} q={q} a={a} index={i} />)}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.8 DEMO CTA ─────────────────────────────────────────────────────────────
function DemoCTA() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const { trigger, rippleEls } = useRipple()
    const { ref: magRef, sx, sy } = useMagnet(0.4)
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "140px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(69,14,20,0.06) 0%, transparent 70%)" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.07) 0%, transparent 70%)" }} />
            </div>
            <div style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto" }}>
                <Reveal direction="none">
                    <Label text="See The Agent In Action" />
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 700, color: T.ink, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                        Bring a<br />
                        <span style={{ color: T.accent }}>real trip.</span>
                    </h2>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.65, color: T.muted, maxWidth: 480, margin: "0 auto 56px" }}>
                        Twenty minutes. Your route, your policy, your edge cases. We run it live.
                    </p>
                </Reveal>
                <Reveal delay={0.2}>
                    <motion.div ref={magRef} style={{ display: "inline-block" }}>
                        <motion.a
                            href="/book-a-demo"
                            onClick={trigger}
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ boxShadow: "0 24px 64px rgba(69,14,20,0.4)" }}
                            style={{ position: "relative", overflow: "hidden", background: T.maroon, color: T.cream, fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 700, padding: "20px 52px", borderRadius: 100, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 12, letterSpacing: "-0.01em", textDecoration: "none" }}>
                            <motion.span style={{ display: "flex", alignItems: "center", gap: 12, x: sx, y: sy }}>
                                {rippleEls}
                                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", flexShrink: 0, boxShadow: "0 0 0 3px rgba(34,197,94,0.3)" }} />
                                Book your demo ↗
                            </motion.span>
                        </motion.a>
                    </motion.div>
                </Reveal>
                <Reveal delay={0.35}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: T.muted, marginTop: 20 }}>
                        No long contracts. No heavy IT lift. Live in as little as 90 days.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────
function ScrollProgress() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        if (typeof window === "undefined") return
        const h = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            setProgress(max > 0 ? window.scrollY / max : 0)
        }
        window.addEventListener("scroll", h)
        return () => window.removeEventListener("scroll", h)
    }, [])
    return (
        <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: T.orange, transformOrigin: "left", scaleX: progress, zIndex: 200 }} />
    )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function MiraeeProductPage(_props: { style?: React.CSSProperties }) {

    // Meta title/description + viewport meta for mobile responsiveness
    useEffect(() => {
        // Title tag + meta description per the doc's Platform SEO brief.
        document.title = "Platform | Plan, Book, Expense, Change, Support | Miraee"
        const description = "Six capabilities on one continuous context: planning, booking, expense, changes, human support and personal travel. See how the Miraee corporate travel platform works."
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta) }
        meta.content = description

        let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null
        if (!viewport) {
            viewport = document.createElement('meta') as HTMLMetaElement
            viewport.name = 'viewport'
            document.head.appendChild(viewport)
        }
        viewport.content = 'width=device-width, initial-scale=1, maximum-scale=5'

        // The page is long and several sections mount with dynamic content, so
        // ScrollTrigger's cached start/end positions can go stale before the
        // full-page layout settles. Force a recalculation once everything below
        // has painted, otherwise triggers further down the page never fire.
        const raf = requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()))
        return () => cancelAnimationFrame(raf)
    }, [])
    return (
        <div className="v1-type-page" style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "clip", fontFamily: "var(--font-sans)", background: "var(--page-bg)" }}>
            <SmoothScrollStyle />
            <ScrollProgress />
            <SiteNav />
            {/* Doc Page 2 order: hero → one continuous context → six capabilities →
                two views → analytics → connected systems → supply → FAQ → CTA.
                Removed per doc: second How It Works (Home owns it), the agent
                workforce architecture (AI & Technology), the Mondee Advantage
                (About), and the Legacy TMC table (Why Miraee). */}
            <V11Hero
                kicker="The Platform"
                title="One system."
                accent="The entire journey."
                sub="Six capabilities running on one continuous context. Miraee does not pass your trip between tools. It carries it."
                primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
                secondaryCta={{ label: "Jump to a capability ↓", href: "#capabilities" }}
                image={{ src: productPageImg, alt: "Business traveler using Miraee during a journey" }}
                proof={["500+ airlines", "2M+ hotels", "Under a minute to an itinerary", "24/7 human support"]}
                chips={["PLAN", "BOOK", "EXPENSE", "CHANGE", "SUPPORT", "PERSONAL"]} />
            <V11PageImage src={productPageImg} alt="Business traveler using Miraee during a journey" label="One system. The entire journey." caption="Six capabilities running on one continuous context." position="center 42%" mobilePosition="58% center" />
            <PersonalisationEngine />
            <SixCapabilities />
            <TwoViews />
            <AnalyticsInsights />
            <Integrations />
            <Supply />
            <ComparisonPointer />
            <ProductFAQ />
            <DemoCTA />
            <V1Footer />
        </div>
    )
}
