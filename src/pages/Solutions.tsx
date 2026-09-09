import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import AudienceShowcase from "../components/AudienceShowcase"
import V11PageImage from "../components/V11PageImage"
import solutionsPageImg from "../../images/weavy/v1/solutions/v1-solutions-managers.webp"
gsap.registerPlugin(ScrollTrigger)

const T = {
    ink: "var(--text)", maroon: "#450E14", orange: "#E55602",
    cream: "#FBF6F2", white: "#FFFFFF",
    muted: "rgba(var(--text-rgb),0.45)", mutedLight: "rgba(var(--text-rgb),0.12)",
    accent: "var(--accent-strong)",
}

function useGSAP(cb: (gsap: any, ST: any) => void | (() => void), deps: any[] = []) {
    useEffect(() => {
        const cleanup = cb(gsap, ScrollTrigger)
        return () => { if (typeof cleanup === "function") cleanup() }
    }, deps)
}

function useWindowWidth() {
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1440)
    useEffect(() => {
        const fn = () => setW(window.innerWidth)
        window.addEventListener("resize", fn)
        return () => window.removeEventListener("resize", fn)
    }, [])
    return w
}

function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none" }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.2 })
    const initMap: Record<string, any> = { up: { y: 48, opacity: 0 }, left: { x: -48, opacity: 0 }, right: { x: 48, opacity: 0 }, none: { opacity: 0 } }
    const init = initMap[direction]
    return (
        <motion.div ref={ref} initial={init} animate={inView ? { x: 0, y: 0, opacity: 1 } : init} transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>
            {children}
        </motion.div>
    )
}

function SmoothScrollStyle() {
    useEffect(() => {
        if (typeof document === "undefined") return
        const existing = document.getElementById("tech-scroll-style")
        if (existing) return
        const s = document.createElement("style")
        s.id = "tech-scroll-style"
        s.textContent = `html{scroll-behavior:smooth;} *{-webkit-font-smoothing:antialiased;}`
        document.head.appendChild(s)
    }, [])
    return null
}

function ScrollBar() {
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
    return <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: T.orange, transformOrigin: "left", scaleX: progress, zIndex: 200 }} />
}
// --- SOLUTIONS HERO (light theme) -------------------------------------------
const wordVariants = {
    hidden: { y: "110%", opacity: 0, rotateX: -45 },
    visible: (i: number) => ({ y: "0%", opacity: 1, rotateX: 0,
        transition: { duration: 0.75, delay: 0.3 + i * 0.055, ease: "easeOut" as const } }),
}

function SolutionsHero() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const heroRef = useRef<HTMLDivElement>(null)
    const heroInnerRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, _ST) => {
        if (!heroRef.current || !heroInnerRef.current) return
        gsap.to(heroInnerRef.current, { y: -160, ease: "none",
            scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 } })
    }, [])

    const line1 = ["Built", "for", "Everyone"]
    const line2 = ["Behind", "the", "Journey."]
    const roles = ["Employees", "Finance", "Admins", "Travel Leads", "Managers"]
    const floatPos = [
        { top: "16%", left: "7%" }, { top: "74%", left: "5%" },
        { top: "12%", right: "8%" }, { top: "66%", right: "6%" }, { top: "40%", right: "3%" },
    ]
    const accentWords = new Set(["Journey."])

    let wordIdx = 0
    const renderLine = (words: string[]) => words.map((word) => {
        const idx = wordIdx++
        return (
            <span key={idx} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", lineHeight: 1.15, perspective: 1000, marginRight: "0.22em" }}>
                <motion.span custom={idx} variants={wordVariants} initial="hidden" animate="visible"
                    style={{ display: "inline-block", backfaceVisibility: "hidden",
                        color: accentWords.has(word) ? T.orange : T.ink }}>
                    {word}
                </motion.span>
            </span>
        )
    })

    return (
        <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", background: "var(--page-bg)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {/* Warm orange glow */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 55% at 50% 8%, rgba(229,86,2,0.09), transparent 65%)" }}/>
            {/* Grid overlay */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.035) 1px, transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }}/>
            {/* Orange corner accents */}
            <div style={{ position: "absolute", top: 0, left: 0, width: 120, height: 120, borderTop: "1px solid rgba(229,86,2,0.15)", borderLeft: "1px solid rgba(229,86,2,0.15)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 120, height: 120, borderBottom: "1px solid rgba(229,86,2,0.15)", borderRight: "1px solid rgba(229,86,2,0.15)", pointerEvents: "none" }}/>
            {/* Floating role badges */}
            {!isMobile && roles.map((role, i) => (
                <motion.div key={role} initial={{ opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.6 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: "absolute", ...floatPos[i] as any, padding: "8px 18px",
                        border: "1px solid rgba(var(--text-rgb),0.08)", borderRadius: 100,
                        background: "var(--surface)", boxShadow: "0 6px 22px rgba(var(--text-rgb),0.08)", pointerEvents: "none" }}>
                    <span style={{ fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 600, color: "rgba(var(--text-rgb),0.62)", letterSpacing: "0.09em" }}>{role}</span>
                </motion.div>
            ))}
            {/* Main content */}
            <div ref={heroInnerRef} style={{ position: "relative", top: isMobile ? 0 : isTablet ? 36 : 48, zIndex: 3, maxWidth: 900, textAlign: "center", padding: isMobile ? "120px 24px 80px" : isTablet ? "100px 48px 80px" : "0 64px", willChange: "transform" }}>
                {/* Badge */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" as const }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", border: `1px solid ${T.mutedLight}`, borderRadius: 100, marginBottom: 48, background: "rgba(var(--text-rgb),0.04)" }}>
                    <motion.div animate={{ scale: [1,1.6,1], opacity: [0.7,1,0.7] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange, flexShrink: 0 }}/>
                    <span style={{ fontSize: 11, fontFamily: "var(--font-sans)", color: T.ink, letterSpacing: "0.13em", textTransform: "uppercase", fontWeight: 700 }}>Designed for Everyone · Miraee</span>
                </motion.div>
                {/* Heading  -  framer-motion word reveal, no GSAP dependency */}
                <h1 style={{ fontSize: isMobile ? 38 : isTablet ? 58 : 78, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.04, letterSpacing: "-0.035em", margin: "0 0 36px", textAlign: "center" }}>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line1)}</span>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line2)}</span>
                </h1>
                {/* Subhead */}
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.05, ease: "easeOut" as const }}
                    style={{ fontSize: isMobile ? 16 : 19, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 52px", fontWeight: 400 }}>
                    Whatever your role, use case or company, Miraee removes the friction between intent and outcome — one travel management software platform for the whole program, from planning and payment to taking the trip.
                </motion.p>
                {/* CTAs */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.25, ease: "easeOut" as const }}
                    style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                    <motion.a href="#demo" whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(229,86,2,0.55)" }} whileTap={{ scale: 0.97 }}
                        style={{ padding: isMobile ? "14px 30px" : "17px 42px", background: T.orange, color: T.white, borderRadius: 12, fontSize: 15, fontFamily: "var(--font-sans)", fontWeight: 700, textDecoration: "none", display: "inline-block", letterSpacing: "0.01em" }}>
                        Book a demo
                    </motion.a>
                    <motion.a href="#roles" whileHover={{ borderColor: "rgba(var(--text-rgb),0.4)", color: T.ink, background: "rgba(var(--text-rgb),0.04)" }} whileTap={{ scale: 0.97 }}
                        style={{ padding: isMobile ? "14px 30px" : "17px 42px", border: "1px solid rgba(var(--text-rgb),0.18)", color: "rgba(var(--text-rgb),0.65)", borderRadius: 12, fontSize: 15, fontFamily: "var(--font-sans)", fontWeight: 500, textDecoration: "none", display: "inline-block", transition: "all 0.22s" }}>
                        Talk to sales
                    </motion.a>
                </motion.div>
            </div>
            {/* Scroll indicator */}
            <motion.div style={{ position: "absolute", bottom: 36, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 4 }}
                animate={{ y: [0, 10, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
                <span style={{ fontSize: 9, fontFamily: "var(--font-sans)", color: "rgba(var(--text-rgb),0.3)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll</span>
                <div style={{ width: 1, height: 52, background: "linear-gradient(to bottom,rgba(229,86,2,0.7),transparent)" }}/>
            </motion.div>
        </section>
    )
}

// --- BY ROLE -----------------------------------------------------------------
// SVG icon paths  -  avoids Unicode encoding issues
const ROLE_ICONS: Record<string, string> = {
    employees: "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z",
    finance:   "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    admins:    "M3 3h18v2H3V3zm0 4h12v2H3V7zm0 4h18v2H3v-2zm0 4h12v2H3v-2zm0 4h18v2H3v-2z",
    travelleads: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2a8 8 0 1 1 0 16A8 8 0 0 1 12 4zm0 3a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
    chros:     "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4.42 0-8 1.79-8 4v1h16v-1c0-2.21-3.58-4-8-4z",
    managers:  "M9 12.5l2.2 2.2L20 6M21 12v6.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13A1.5 1.5 0 0 1 4.5 4H15",
}

const ROLES = [
    { id: "employees", label: "Employees", title: "Your personal AI travel agent.", sub: "Book a trip from a single sentence",
      color: T.orange,
      desc: "Describe your trip in plain language and Miraee handles planning, booking, policy and expenses. No forms. No portals. No end-of-month receipt hunt.",
      points: ["Trip planning from a single sentence", "Auto-applied policy on every booking", "Real-time rebooking when flights change", "Automated expense reporting"] },
    { id: "finance", label: "Finance", title: "Every dollar tracked. Every trip measured.", sub: "Real-time visibility, not month-end reconciliation",
      color: "#C94A00",
      desc: "Miraee gives finance real-time visibility into travel spend as part of a broader spend management approach, with automated reconciliation and ROI reporting — closing the 40% of spend that normally goes untracked.",
      points: ["Real-time travel spend analytics", "Automated reconciliation and ERP sync", "AI spend management and measurable travel ROI", "Full audit trail and policy governance"] },
    { id: "admins", label: "Admins", title: "Set the rules once. Let the platform enforce them.", sub: "Policy that enforces itself, program-wide",
      color: T.maroon,
      desc: "Configure policy, approvals and budgets, then let Miraee apply them automatically across every traveler and every booking, keeping travel policy compliance consistent program-wide.",
      points: ["Per diem policy enforcement", "Automatic approval routing with instant exception handling", "Unified employee profiles and permissions", "One dashboard for the entire travel program"] },
    { id: "travelleads", label: "Travel Leads", title: "Run a modern travel program without the busywork.", sub: "One intelligent system for the whole program",
      color: T.orange,
      desc: "Consolidate booking, spend, rewards and events into one intelligent system with the supply depth of a global marketplace behind it.",
      points: ["Owned global inventory and exclusive corporate rates", "Program-wide analytics and optimization", "Group travel and corporate event travel management built in", "Reliability backed by Tabhi and Mondee"] },
    { id: "chros", label: "CHROs", title: "Travel that supports your people, not just your policy.", sub: "Duty-of-care and consumer-grade experience, together",
      color: "#C94A00",
      desc: "Miraee delivers a seamless traveler experience while keeping duty-of-care, compliance and wellbeing front and center, so travel becomes a talent advantage, not a friction point.",
      points: ["Frictionless, consumer-grade experience for every employee", "Duty-of-care through real-time disruption support", "Policy applied fairly and consistently", "Employee incentives for cost-efficient choices"] },
    { id: "managers", label: "Managers", title: "Approvals that don't sit in your inbox.", sub: "Only exceptions reach you, with full context",
      color: T.maroon,
      desc: "Policy-compliant trips are auto-approved; only genuine exceptions reach you, with the context to decide in seconds.",
      points: ["Instant, context-rich exception routing", "Team-level visibility into travel and spend", "No more approval bottlenecks"] },
]

function RoleIcon({ id, color, size = 16 }: { id: string; color: string; size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d={ROLE_ICONS[id] || ROLE_ICONS.employees} fill={color} fillRule="evenodd"/>
        </svg>
    )
}

function ByRole() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const [active, setActive] = useState(0)
    const [stepProgress, setStepProgress] = useState(0)
    const outerRef = useRef<HTMLDivElement>(null)   // tall scroll container
    const stickyRef = useRef<HTMLDivElement>(null)  // pinned at top:0
    const tabListRef = useRef<HTMLDivElement>(null)
    const headRef = useRef<HTMLDivElement>(null)
    const N = ROLES.length

    useGSAP((gsap, ST) => {
        if (!outerRef.current) return

        // Entrance: heading words
        if (headRef.current) {
            const wds = headRef.current.querySelectorAll(".br-w")
            gsap.fromTo(wds,
                { y: "115%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.055, ease: "power4.out",
                  scrollTrigger: { trigger: headRef.current, start: "top 76%", once: true } })
        }

        // Entrance: tab list stagger
        if (tabListRef.current && !isMobile) {
            const tabs = tabListRef.current.querySelectorAll(".role-tab")
            gsap.fromTo(tabs,
                { x: -55, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out",
                  scrollTrigger: { trigger: tabListRef.current, start: "top 74%", once: true } })
        }

        if (isMobile) return  // mobile: tap-only, no scroll-pin

        // Scroll-driven role cycling  -  outer container is N*100vh tall
        // CSS sticky keeps stickyRef at top:0 while outer scrolls
        ST.create({
            trigger: outerRef.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self: any) => {
                const rawIdx = self.progress * N
                const idx = Math.min(Math.floor(rawIdx), N - 1)
                const frac = rawIdx - Math.floor(rawIdx)
                setActive(idx)
                setStepProgress(idx === N - 1 ? 1 : frac)
            },
        })
    }, [isMobile])

    const current = ROLES[active]

    return (
        // Outer tall container  -  desktop: N*100vh so each role gets one viewport of scroll
        <div ref={outerRef} id="roles" style={{ position: "relative", height: isMobile ? "auto" : `${N * 100}vh`, background: "var(--page-bg)" }}>
            {/* Sticky inner  -  stays at top:0 for desktop, normal flow for mobile */}
            <div ref={stickyRef} style={{
                position: isMobile ? "relative" : "sticky",
                top: 0,
                height: isMobile ? "auto" : "100vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: isMobile ? "80px 24px" : "clamp(32px, 5vh, 64px) clamp(32px, 5vw, 80px)",
                background: "var(--page-bg)",
            }}>
                {/* Progress bar  -  desktop only */}
                {!isMobile && (
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(var(--text-rgb),0.06)", zIndex: 10 }}>
                        <motion.div
                            animate={{ scaleX: (active + stepProgress) / N }}
                            transition={{ duration: 0.1, ease: "linear" as const }}
                            style={{ height: "100%", background: T.orange, transformOrigin: "left", scaleX: 0 }}
                        />
                    </div>
                )}
                {/* Step dots  -  desktop right side */}
                {!isMobile && (
                    <div style={{ position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 10, zIndex: 10 }}>
                        {ROLES.map((r, i) => (
                            <motion.div key={r.id} animate={{ scale: active === i ? 1.4 : 1, opacity: active === i ? 1 : 0.3 }}
                                transition={{ duration: 0.25 }}
                                style={{ width: 6, height: 6, borderRadius: "50%", background: active === i ? T.orange : T.ink, cursor: "pointer" }}
                                onClick={() => setActive(i)}
                            />
                        ))}
                    </div>
                )}

                <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
                    {/* Heading block */}
                    <div style={{ marginBottom: isMobile ? 48 : "clamp(28px, 4vh, 48px)" }}>
                        <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                            style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 14 }}>
                            Solutions by Role
                        </motion.span>
                        <div ref={headRef}>
                            <h2 style={{ fontSize: isMobile ? 34 : isTablet ? 50 : "clamp(48px, 4.1vw, 62px)", fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.04, letterSpacing: "-0.03em", margin: 0 }}>
                                <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", lineHeight: 1.18 }}>
                                    <span className="br-w" style={{ display: "inline-block" }}>Who Uses Miraee's AI Travel Platform?</span>
                                </span>
                            </h2>
                        </div>
                    </div>

                    {/* Two-column layout */}
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "220px 1fr", gap: isMobile ? 0 : 40, alignItems: "start" }}>
                        {/* Tab list */}
                        <div ref={tabListRef} style={{ display: "flex", flexDirection: isMobile || isTablet ? "row" : "column", gap: 3, overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? 16 : 0 }}>
                            {ROLES.map((role, i) => (
                                <motion.button key={role.id} className="role-tab"
                                    onClick={() => setActive(i)}
                                    type="button"
                                    aria-pressed={active === i}
                                    aria-label={`Show ${role.label} solutions`}
                                    whileHover={{ x: isMobile ? 0 : 4 }}
                                    style={{
                                        padding: isMobile ? "9px 12px" : "12px 16px",
                                        borderRadius: 10, border: "none", cursor: "pointer", textAlign: "left",
                                        background: active === i ? "rgba(229,86,2,0.07)" : "transparent",
                                        borderLeft: !isMobile && !isTablet ? `3px solid ${active === i ? T.orange : "transparent"}` : "none",
                                        borderBottom: (isMobile || isTablet) ? `2px solid ${active === i ? T.orange : "transparent"}` : "none",
                                        flexShrink: 0, transition: "all 0.22s",
                                    }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                        <RoleIcon id={role.id} color={active === i ? role.color : "rgba(var(--text-rgb),0.2)"} size={14}/>
                                        <span style={{ fontSize: isMobile ? 12 : 13, fontFamily: "var(--font-sans)", fontWeight: active === i ? 700 : 500, color: active === i ? T.ink : T.muted, whiteSpace: "nowrap", transition: "all 0.22s" }}>{role.label}</span>
                                    </div>
                                    {/* Per-tab progress bar  -  desktop only */}
                                    {!isMobile && !isTablet && active === i && (
                                        <motion.div
                                            initial={{ scaleX: 0 }} animate={{ scaleX: stepProgress }}
                                            transition={{ duration: 0.08, ease: "linear" as const }}
                                            style={{ height: 2, background: role.color, borderRadius: 2, marginTop: 6, transformOrigin: "left" }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Content panel */}
                        <AnimatePresence mode="wait">
                            <motion.div key={current.id}
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: "easeOut" as const }}
                                style={{ padding: isMobile ? "16px 0 0" : "0" }}>
                                <div style={{ padding: isMobile ? "28px 20px" : "clamp(30px, 4vh, 44px) clamp(30px, 3.2vw, 48px)", background: "var(--surface)", borderRadius: 20, position: "relative", overflow: "hidden", minHeight: isMobile ? 0 : "clamp(340px, 45vh, 410px)", border: "1px solid rgba(var(--text-rgb),0.08)", boxShadow: "0 18px 48px rgba(var(--text-rgb),0.06)", isolation: "isolate" }}>
                                    {/* Corner glow */}
                                    <div aria-hidden="true" style={{ position: "absolute", zIndex: -1, inset: 0, background: `radial-gradient(circle at 92% 8%, ${current.color}12, transparent 38%)`, pointerEvents: "none" }}/>
                                    <div style={{ position: "relative", zIndex: 1 }}>
                                      {/* Role badge */}
                                      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 100, background: `${current.color}12`, marginBottom: 18, border: `1px solid ${current.color}30` }}>
                                          <RoleIcon id={current.id} color={current.color} size={11}/>
                                          <span style={{ fontSize: 10, color: current.color, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 700 }}>{current.label}</span>
                                      </div>
                                      <h3 style={{ fontSize: isMobile ? 24 : "clamp(27px, 2.2vw, 34px)", fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 8px" }}>{current.title}</h3>
                                      <p style={{ fontSize: 15, color: current.color, fontFamily: "var(--font-sans)", fontStyle: "italic", margin: "0 0 14px", fontWeight: 500 }}>{current.sub}</p>
                                      <p style={{ fontSize: 14, color: "rgba(var(--text-rgb),0.62)", fontFamily: "var(--font-sans)", lineHeight: 1.7, margin: "0 0 22px", maxWidth: 610 }}>{current.desc}</p>
                                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: "10px 24px" }}>
                                        {current.points.map((pt, i) => (
                                            <motion.div key={pt} initial={{ x: -14, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.06, duration: 0.35 }}
                                                style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                                                <div style={{ width: 17, height: 17, borderRadius: 5, background: current.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                                                    <svg width="8" height="8" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke={T.white} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                                                </div>
                                                <span style={{ fontSize: 13, color: "rgba(var(--text-rgb),0.7)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>{pt}</span>
                                            </motion.div>
                                        ))}
                                      </div>
                                    </div>
                                    {/* Scroll hint  -  desktop only, fades after first role */}
                                    {!isMobile && active === 0 && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1.2, duration: 0.5 }}
                                            style={{ position: "absolute", bottom: 20, right: 28, display: "flex", alignItems: "center", gap: 6 }}>
                                            <span style={{ fontSize: 10, color: "rgba(var(--text-rgb),0.3)", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll to explore</span>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M3 7l3 3 3-3" stroke="rgba(var(--text-rgb),0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- BY COMPANY SIZE ----------------------------------------------------------
function BySize() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const sectionRef = useRef<HTMLDivElement>(null)

    const sizes = [
        { label: "Growth-Stage", range: "100 - 500 people", dots: 1, color: T.orange,
          headline: "Right-sized travel, without enterprise overhead.",
          desc: "Replace spreadsheets and 6+ disconnected tools with one program built for a $500K+ annual travel budget.",
          features: ["Fast onboarding", "Auto policy enforcement", "Zero admin overhead"] },
        { label: "Mid-Market", range: "500 - 1,500 people", dots: 4, color: T.maroon,
          headline: "Purpose-built for the segment incumbents underserve.",
          desc: "Upper-SMB and mid-market programs get the depth of an enterprise platform, without the enterprise price tag or implementation drag.",
          features: ["Dept-level dashboards", "Offsite coordination", "Configurable approvals"] },
        { label: "Established Mid-Market", range: "1,500 - 3,000 people", dots: 9, color: "#C94A00",
          headline: "Scale to the top of the mid-market, and beyond.",
          desc: "Programs with up to $5M in annual travel spend run on the same platform, inside a $255B serviceable market Miraee is built to serve.",
          features: ["Multi-region support", "Advanced MICE", "Consolidated reporting", "API access"] },
    ]

    useGSAP((gsap, _ST) => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".size-card")
        gsap.fromTo(cards, { y: 70, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.72, stagger: 0.13, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: isMobile ? 56 : 80 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 16 }}>Solutions by Fit</span>
                        <h2 style={{ fontSize: isMobile ? 32 : 56, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.06, letterSpacing: "-0.03em", margin: "0 auto 20px", maxWidth: 620 }}>
                            Purpose-built for upper-SMB and mid-market.
                        </h2>
                        <p style={{ fontSize: 15, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.8, margin: "0 auto", maxWidth: 620 }}>
                            Miraee is travel management software built for the segment incumbents underserve: companies with $500K–$5M in annual travel budgets and 100–3,000 employees, often running on 6+ disconnected tools with no optimization. That's a $255B serviceable market, and it's our home.
                        </p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
                    {sizes.map((size) => (
                        <motion.div key={size.label} className="size-card"
                            whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(var(--text-rgb),0.1)" }}
                            style={{ background: "var(--surface)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(var(--text-rgb),0.06)" }}>
                            <div style={{ height: 4, background: size.color }}/>
                            <div style={{ padding: isMobile ? "28px 24px" : "36px 32px" }}>
                                <div style={{ marginBottom: 24, display: "grid", gridTemplateColumns: `repeat(${size.dots === 1 ? 1 : size.dots === 4 ? 2 : 3}, auto)`, gap: 8, width: "fit-content" }}>
                                    {Array.from({ length: size.dots }).map((_, di) => (
                                        <motion.div key={di} animate={{ scale: [1, 1.25, 1] }}
                                            transition={{ duration: 2.2, delay: di * 0.18, repeat: Infinity, ease: "easeInOut" }}
                                            style={{ width: size.dots === 1 ? 14 : size.dots === 4 ? 10 : 8, height: size.dots === 1 ? 14 : size.dots === 4 ? 10 : 8, borderRadius: "50%", background: size.color, opacity: 0.7 }}/>
                                    ))}
                                </div>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: size.color, fontFamily: "var(--font-sans)", marginBottom: 8 }}>{size.range}</div>
                                <h3 style={{ fontSize: isMobile ? 22 : 26, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.2, letterSpacing: "-0.015em", margin: "0 0 14px" }}>{size.headline}</h3>
                                <p style={{ fontSize: 14, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.7, margin: "0 0 24px" }}>{size.desc}</p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {size.features.map((f) => (
                                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: size.color, flexShrink: 0 }}/>
                                            <span style={{ fontSize: 13, color: T.ink, fontFamily: "var(--font-sans)", fontWeight: 500 }}>{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- BY USE CASE --------------------------------------------------------------
function ByUseCase() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    const cases = [
        { num: "01", title: "Every business trip, end to end.", tag: "Business travel", featured: true, emergency: false,
          body: "Miraee manages business travel and expense management end to end — from booking flights, hotels, cars and rail to managing business travel expenses, policies, budgets and real-time disruptions." },
        { num: "02", title: "Group travel and events, intelligently managed.", tag: "Meetings & events", featured: false, emergency: false,
          body: "Miraee is the only platform that unifies corporate event travel management with MICE, automated group booking, intelligent venue sourcing and rate negotiation, real-time event expense tracking, and seamless attendee and itinerary management." },
        { num: "03", title: "White-glove travel, automated.", tag: "Executive travel", featured: false, emergency: false,
          body: "High-touch itineraries, preference learning and proactive disruption management give executives a premium executive travel experience without a dedicated human handler." },
        { num: "04", title: "Cross-border travel for a distributed workforce.", tag: "Global mobility", featured: false, emergency: false,
          body: "Remote-first and hybrid teams generate constant cross-border and inter-office travel. Miraee handles it at scale with global supply, local rates and consistent policy everywhere." },
        { num: "05", title: "When plans break, Miraee doesn't.", tag: "Emergency & disruption", featured: false, emergency: true,
          body: "Cancellations, delays and reroutes are managed proactively through a single chat. The best alternative is coordinated and confirmed before the traveler is stranded." },
    ]

    useGSAP((gsap, _ST) => {
        if (!sectionRef.current) return
        const hd = sectionRef.current.querySelector(".uc-heading")
        if (hd) {
            const wds = hd.querySelectorAll(".uc-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.04, ease: "power4.out",
                  scrollTrigger: { trigger: hd, start: "top 70%", once: true } })
        }
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll(".uc-card")
            gsap.fromTo(cards, { y: 60, opacity: 0, clipPath: "inset(0 0 30% 0)" },
                { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.75, stagger: 0.1, ease: "power3.out",
                  scrollTrigger: { trigger: gridRef.current, start: "top 68%", once: true } })
        }
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.038) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                <div style={{ marginBottom: isMobile ? 56 : 80 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 20 }}>
                        Solutions by Use Case
                    </motion.span>
                    <h2 className="uc-heading" style={{ fontSize: isMobile ? 28 : isTablet ? 44 : 60, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.06, letterSpacing: "-0.03em", margin: "0 0 12px" }}>
                        {["Every", "kind", "of", "company"].map((word, i) => (
                            <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.18 }}>
                                <span className="uc-w" style={{ display: "inline-block" }}>{word}</span>
                            </span>
                        ))}
                        <span style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.18 }}>
                            <span className="uc-w" style={{ display: "inline-block", color: T.orange, fontStyle: "italic" }}>travel.</span>
                        </span>
                    </h2>
                </div>
                <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: 14 }}>
                    {cases.map((c) => (
                        <motion.div key={c.num} className="uc-card"
                            whileHover={{ borderColor: c.emergency ? "rgba(229,86,2,0.6)" : "rgba(var(--text-rgb),0.14)", y: -4 }}
                            style={{
                                gridColumn: (!isMobile && !isTablet && c.featured) ? "span 2" : "span 1",
                                padding: isMobile ? "28px 22px" : "36px 32px",
                                borderRadius: 20,
                                background: c.emergency ? "rgba(229,86,2,0.07)" : "rgba(var(--text-rgb),0.04)",
                                border: c.emergency ? "1px solid rgba(229,86,2,0.3)" : "1px solid rgba(var(--text-rgb),0.08)",
                                position: "relative", overflow: "hidden",
                            }}>
                            {c.emergency && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: T.orange }}/>}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                                <span style={{ fontSize: 11, fontFamily: "monospace", color: c.emergency ? T.orange : "rgba(var(--text-rgb),0.2)", fontWeight: 700 }}>{c.num}</span>
                                <span style={{ fontSize: 10, padding: "4px 10px", borderRadius: 100, background: c.emergency ? "rgba(229,86,2,0.12)" : "rgba(var(--text-rgb),0.06)", color: c.emergency ? T.orange : "rgba(var(--text-rgb),0.4)", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>{c.tag}</span>
                            </div>
                            <h3 style={{ fontSize: isMobile ? 18 : (c.featured && !isMobile && !isTablet) ? 28 : 20, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.2, letterSpacing: "-0.015em", margin: "0 0 14px" }}>{c.title}</h3>
                            <p style={{ fontSize: 14, color: c.emergency ? "rgba(var(--text-rgb),0.55)" : "rgba(var(--text-rgb),0.45)", fontFamily: "var(--font-sans)", lineHeight: 1.75, margin: 0, maxWidth: c.featured && !isMobile ? 480 : "none" }}>{c.body}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- INTERACTIVE GLOBE --------------------------------------------------------
const GLOBE_PINS = [
    { lat: 40.7,  lon: -74.0,  label: "New York",   role: "North America Hub" },
    { lat: 51.5,  lon: -0.1,   label: "London",     role: "Europe HQ" },
    { lat: 25.2,  lon: 55.3,   label: "Dubai",      role: "Middle East Hub" },
    { lat: 1.4,   lon: 103.8,  label: "Singapore",  role: "Asia Pacific HQ" },
    { lat: -33.9, lon: 151.2,  label: "Sydney",     role: "ANZ Hub" },
    { lat: 19.1,  lon: 72.9,   label: "Mumbai",     role: "South Asia Hub" },
    { lat: 35.7,  lon: 139.7,  label: "Tokyo",      role: "Japan Hub" },
    { lat: 50.1,  lon: 8.7,    label: "Frankfurt",  role: "DACH Hub" },
    { lat: 41.9,  lon: -87.6,  label: "Chicago",    role: "Midwest Hub" },
    { lat: 22.3,  lon: 114.2,  label: "Hong Kong",  role: "Greater China Hub" },
    { lat: -23.5, lon: -46.6,  label: "Sao Paulo",  role: "LATAM Hub" },
    { lat: 55.7,  lon: 37.6,   label: "Moscow",     role: "Eastern Europe Hub" },
]

const CONTINENTS: number[][][] = [
    // North America
    [[71,-80],[65,-85],[60,-95],[55,-120],[50,-125],[40,-124],[32,-117],[22,-105],
     [15,-90],[9,-79],[8,-77],[18,-66],[25,-80],[30,-81],[35,-76],[40,-74],[45,-67],
     [50,-55],[55,-57],[60,-65],[70,-68],[75,-75],[80,-85],[83,-70],[71,-80]],
    // Greenland
    [[83,-25],[76,-18],[72,-22],[72,-40],[75,-57],[80,-57],[83,-45],[83,-25]],
    // South America
    [[10,-62],[5,-52],[-5,-35],[-15,-39],[-23,-43],[-33,-53],[-42,-64],[-55,-68],
     [-52,-75],[-42,-73],[-28,-70],[-10,-78],[0,-80],[8,-77],[10,-62]],
    // Europe
    [[71,28],[65,14],[60,5],[52,4],[50,-1],[44,-8],[36,-6],[36,5],[38,14],
     [40,18],[42,12],[44,8],[47,10],[50,14],[53,14],[56,22],[60,25],[65,25],[71,28]],
    // Africa
    [[37,9],[22,37],[12,43],[0,42],[-5,40],[-15,35],[-25,33],[-34,18],[-32,18],
     [-25,15],[-10,14],[-5,10],[5,-15],[18,-16],[30,-10],[35,4],[37,9]],
    // Asia
    [[70,30],[72,55],[72,80],[68,100],[68,130],[60,145],[55,140],[45,136],[35,120],
     [25,120],[22,115],[15,108],[10,105],[1,104],[5,100],[10,100],[20,93],[22,92],
     [18,84],[8,77],[20,58],[25,55],[30,48],[30,40],[35,36],[38,26],[42,28],
     [48,38],[55,38],[65,38],[70,30]],
    // Japan (simplified)
    [[45,141],[40,141],[35,136],[34,131],[33,131],[34,130],[37,136],[40,140],[45,141]],
    // Australia
    [[-16,136],[-14,128],[-20,116],[-28,114],[-34,119],[-38,140],[-36,150],
     [-28,153],[-18,146],[-12,136],[-16,136]],
    // New Zealand (south island approx)
    [[-40,172],[-43,171],[-46,168],[-44,170],[-42,174],[-40,172]],
    // UK / Ireland
    [[58,-4],[56,-3],[54,-5],[52,-5],[51,0],[54,0],[56,-2],[58,-4]],
    // Iberian Peninsula
    [[44,-8],[36,-7],[36,5],[40,3],[42,3],[44,-8]],
    // Italy
    [[44,8],[38,16],[38,13],[42,12],[44,8]],
    // Scandinavia
    [[71,28],[68,18],[65,14],[58,5],[60,5],[65,14],[68,18],[71,28]],
]

function GlobeMap() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rotY = useRef(0.4)
    const rotX = useRef(-0.25)
    const isDragging = useRef(false)
    const lastMouse = useRef({ x: 0, y: 0 })
    const frameRef = useRef<number>(0)
    const tagRefs = useRef<(HTMLDivElement | null)[]>([])
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || typeof window === "undefined") return
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        if (!ctx) return

        const SIZE = 500
        canvas.width = SIZE
        canvas.height = SIZE
        const cx = SIZE / 2, cy = SIZE / 2, R = SIZE * 0.40

        function toCart(lat: number, lon: number) {
            const phi = (90 - lat) * Math.PI / 180
            const th = lon * Math.PI / 180
            return { x: Math.sin(phi)*Math.sin(th), y: Math.cos(phi), z: Math.sin(phi)*Math.cos(th) }
        }

        function rotPt(p: {x:number,y:number,z:number}, ry: number, rx: number) {
            const x1 = p.x*Math.cos(ry) + p.z*Math.sin(ry)
            const z1 = -p.x*Math.sin(ry) + p.z*Math.cos(ry)
            const y2 = p.y*Math.cos(rx) - z1*Math.sin(rx)
            const z2 = p.y*Math.sin(rx) + z1*Math.cos(rx)
            return { x: x1, y: y2, z: z2 }
        }

        function proj(p: {x:number,y:number,z:number}) {
            return { sx: cx + p.x*R, sy: cy - p.y*R, z: p.z }
        }

        function drawContinent(coords: number[][]) {
            ctx.beginPath()
            let penUp = true
            for (const coord of coords) {
                const p = rotPt(toCart(coord[0], coord[1]), rotY.current, rotX.current)
                const s = proj(p)
                if (p.z > -0.05) {
                    if (penUp) { ctx.moveTo(s.sx, s.sy); penUp = false }
                    else { ctx.lineTo(s.sx, s.sy) }
                } else { penUp = true }
            }
            ctx.fillStyle = "rgba(229,86,2,0.07)"
            ctx.fill()
            ctx.strokeStyle = "rgba(229,86,2,0.28)"
            ctx.lineWidth = 0.8
            ctx.stroke()
        }

        function draw() {
            ctx.clearRect(0, 0, SIZE, SIZE)
            const ry = rotY.current, rx = rotX.current

            // Sphere fill
            const bg = ctx.createRadialGradient(cx-R*0.25, cy-R*0.25, R*0.05, cx, cy, R)
            bg.addColorStop(0, "rgba(65,14,18,1)")
            bg.addColorStop(0.55, "rgba(28,6,8,1)")
            bg.addColorStop(1, "rgba(10,2,4,1)")
            ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2)
            ctx.fillStyle = bg; ctx.fill()

            // Atmospheric glow
            const atm = ctx.createRadialGradient(cx, cy, R*0.88, cx, cy, R*1.22)
            atm.addColorStop(0, "rgba(229,86,2,0.18)")
            atm.addColorStop(0.5, "rgba(229,86,2,0.06)")
            atm.addColorStop(1, "rgba(229,86,2,0)")
            ctx.beginPath(); ctx.arc(cx, cy, R*1.22, 0, Math.PI*2)
            ctx.fillStyle = atm; ctx.fill()

            // Clip sphere
            ctx.save()
            ctx.beginPath(); ctx.arc(cx, cy, R-1, 0, Math.PI*2); ctx.clip()

            // Grid lines
            for (let la = -80; la <= 80; la += 20) {
                ctx.beginPath(); let f = true
                for (let lo = -180; lo <= 180; lo += 2) {
                    const p = rotPt(toCart(la, lo), ry, rx); const s = proj(p)
                    if (p.z >= 0) { f ? ctx.moveTo(s.sx, s.sy) : ctx.lineTo(s.sx, s.sy); f = false } else { f = true }
                }
                ctx.strokeStyle = "rgba(229,86,2,0.07)"; ctx.lineWidth = 0.5; ctx.stroke()
            }
            for (let lo = -170; lo <= 180; lo += 20) {
                ctx.beginPath(); let f = true
                for (let la = -90; la <= 90; la += 2) {
                    const p = rotPt(toCart(la, lo), ry, rx); const s = proj(p)
                    if (p.z >= 0) { f ? ctx.moveTo(s.sx, s.sy) : ctx.lineTo(s.sx, s.sy); f = false } else { f = true }
                }
                ctx.strokeStyle = "rgba(229,86,2,0.06)"; ctx.lineWidth = 0.4; ctx.stroke()
            }
            // Equator
            ctx.beginPath(); let eqF = true
            for (let lo = -180; lo <= 180; lo += 1) {
                const p = rotPt(toCart(0, lo), ry, rx); const s = proj(p)
                if (p.z >= 0) { eqF ? ctx.moveTo(s.sx, s.sy) : ctx.lineTo(s.sx, s.sy); eqF = false } else { eqF = true }
            }
            ctx.strokeStyle = "rgba(229,86,2,0.18)"; ctx.lineWidth = 0.8; ctx.stroke()

            // Continents
            for (const continent of CONTINENTS) { drawContinent(continent) }

            ctx.restore()

            // Sphere border
            ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2)
            ctx.strokeStyle = "rgba(229,86,2,0.3)"; ctx.lineWidth = 1.5; ctx.stroke()

            // Specular highlight
            ctx.beginPath()
            ctx.arc(cx - R*0.28, cy - R*0.28, R*0.55, 0.9, 2.0)
            ctx.strokeStyle = "rgba(251,246,242,0.04)"; ctx.lineWidth = 14; ctx.stroke()

            // Pins
            const t = Date.now() / 1000
            const sorted = GLOBE_PINS.map((pin, idx) => {
                const p = rotPt(toCart(pin.lat, pin.lon), ry, rx)
                const s = proj(p)
                return { ...pin, ...s, z: p.z, idx }
            }).filter(p => p.z > 0.05).sort((a, b) => a.z - b.z)

            for (const pin of sorted) {
                const alpha = Math.min(1, (pin.z - 0.05) * 3)
                const pulse = 0.5 + 0.5 * Math.sin(t * 2.2 + pin.idx * 0.85)
                const pinR = 4
                const haloR = 14 + pulse * 7

                const halo = ctx.createRadialGradient(pin.sx, pin.sy, 0, pin.sx, pin.sy, haloR)
                halo.addColorStop(0, `rgba(229,86,2,${0.4 * alpha})`)
                halo.addColorStop(0.5, `rgba(229,86,2,${0.1 * alpha})`)
                halo.addColorStop(1, "rgba(229,86,2,0)")
                ctx.beginPath(); ctx.arc(pin.sx, pin.sy, haloR, 0, Math.PI*2)
                ctx.fillStyle = halo; ctx.fill()

                ctx.beginPath(); ctx.arc(pin.sx, pin.sy, pinR + 2.5, 0, Math.PI*2)
                ctx.strokeStyle = `rgba(229,86,2,${0.45 * alpha})`; ctx.lineWidth = 1; ctx.stroke()

                const dotG = ctx.createRadialGradient(pin.sx-1, pin.sy-1, 0, pin.sx, pin.sy, pinR)
                dotG.addColorStop(0, `rgba(255,195,130,${alpha})`)
                dotG.addColorStop(1, `rgba(229,86,2,${alpha})`)
                ctx.beginPath(); ctx.arc(pin.sx, pin.sy, pinR, 0, Math.PI*2)
                ctx.fillStyle = dotG; ctx.fill()

                // Connector line to tag (drawn upward from pin)
                ctx.beginPath()
                ctx.moveTo(pin.sx, pin.sy - pinR)
                ctx.lineTo(pin.sx, pin.sy - 24)
                ctx.strokeStyle = `rgba(229,86,2,${0.35 * alpha})`
                ctx.lineWidth = 1
                ctx.stroke()
            }

            // Update HTML tag overlays via DOM
            for (let i = 0; i < GLOBE_PINS.length; i++) {
                const pin = GLOBE_PINS[i]
                const p = rotPt(toCart(pin.lat, pin.lon), ry, rx)
                const s = proj(p)
                const el = tagRefs.current[i]
                if (el) {
                    if (p.z > 0.12) {
                        const alpha = Math.min(1, (p.z - 0.12) * 2.5)
                        el.style.opacity = String(alpha)
                        el.style.left = (s.sx / SIZE * 100) + "%"
                        el.style.top = ((s.sy - 28) / SIZE * 100) + "%"
                        el.style.display = "block"
                    } else {
                        el.style.display = "none"
                    }
                }
            }

            if (!isDragging.current) rotY.current += 0.003
            frameRef.current = requestAnimationFrame(draw)
        }

        draw()
        return () => { cancelAnimationFrame(frameRef.current) }
    }, [])

    const getCanvasXY = (e: any, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY
        return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY }
    }

    const onMouseDown = (e: any) => {
        isDragging.current = true
        setDragging(true)
        const pos = getCanvasXY(e, canvasRef.current!)
        lastMouse.current = pos
    }
    const onMouseMove = (e: any) => {
        if (!canvasRef.current || !isDragging.current) return
        const pos = getCanvasXY(e, canvasRef.current)
        const dx = pos.x - lastMouse.current.x
        const dy = pos.y - lastMouse.current.y
        rotY.current += dx * 0.007
        rotX.current = Math.max(-1.2, Math.min(1.2, rotX.current + dy * 0.007))
        lastMouse.current = pos
    }
    const onMouseUp = () => { isDragging.current = false; setDragging(false) }

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: 500, aspectRatio: "1/1", margin: "0 auto" }}>
            <canvas ref={canvasRef}
                onMouseDown={onMouseDown} onMouseMove={onMouseMove}
                onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
                onTouchStart={onMouseDown} onTouchMove={onMouseMove} onTouchEnd={onMouseUp}
                style={{ width: "100%", height: "100%", cursor: dragging ? "grabbing" : "grab", display: "block", borderRadius: 16 }}
            />
            {/* HTML tag overlays — positioned via DOM in draw loop */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                {GLOBE_PINS.map((pin, i) => (
                    <div key={pin.label}
                        ref={el => { tagRefs.current[i] = el }}
                        style={{
                            position: "absolute",
                            display: "none",
                            transform: "translate(-50%, -100%)",
                            background: "rgba(10,2,4,0.92)",
                            border: "1px solid rgba(229,86,2,0.45)",
                            borderRadius: 7,
                            padding: "4px 10px 5px",
                            whiteSpace: "nowrap",
                            backdropFilter: "blur(6px)",
                        }}>
                        <div style={{ color: "#FBF6F2", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-sans)", lineHeight: 1.3 }}>{pin.label}</div>
                        <div style={{ color: "#E55602", fontSize: 9, fontWeight: 600, fontFamily: "var(--font-sans)", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.4 }}>{pin.role}</div>
                        {/* caret */}
                        <div style={{ position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid rgba(229,86,2,0.45)" }} />
                    </div>
                ))}
            </div>
            {/* Live badge */}
            <div style={{ position: "absolute", bottom: 14, left: 14, display: "flex", alignItems: "center", gap: 6, pointerEvents: "none" }}>
                <motion.div animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: "#E55602" }}/>
                <span style={{ fontSize: 10, color: "rgba(229,86,2,0.7)", fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Live monitoring</span>
            </div>
            <div style={{ position: "absolute", top: 12, left: 14, pointerEvents: "none" }}>
                <span style={{ fontSize: 9, color: "rgba(var(--text-rgb),0.3)", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Drag to rotate</span>
            </div>
        </div>
    )
}

// --- DUTY OF CARE -------------------------------------------------------------
function DutyOfCare() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const sectionRef = useRef<HTMLDivElement>(null)
    const pointsRef = useRef<HTMLDivElement>(null)
    const features = [
        { icon: ["M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"], title: "Real-time location", desc: "One live map, filter by region, team, or risk level." },
        { icon: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "m9 12 2 2 4-4"], title: "Risk monitoring", desc: "Weather, unrest, health alerts, advisories, flagged proactively." },
        { icon: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"], title: "Instant response", desc: "One tap triggers rebooking, hotel relocation, and manager notification." },
        { icon: ["M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2", "M9 12h6M9 16h4"], title: "Audit-ready records", desc: "A full trail of every itinerary and response." },
    ]

    useGSAP((gsap, _ST) => {
        if (!sectionRef.current) return
        const hd = sectionRef.current.querySelector(".doc-heading")
        if (hd) {
            const wds = hd.querySelectorAll(".doc-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.05, ease: "power4.out",
                  scrollTrigger: { trigger: hd, start: "top 72%", once: true } })
        }
        if (pointsRef.current) {
            const pts = pointsRef.current.querySelectorAll(".doc-pt")
            gsap.fromTo(pts, { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
                  scrollTrigger: { trigger: pointsRef.current, start: "top 68%", once: true } })
        }
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "25%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: "radial-gradient(circle, rgba(229,86,2,0.08) 0%, transparent 65%)", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                    style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 16 }}>
                    Duty of Care
                </motion.span>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80, marginBottom: 56 }}>
                    <div>
                        <h2 className="doc-heading" style={{ fontSize: isMobile ? 30 : 48, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.025em", margin: "0 0 28px" }}>
                            {[["Always", "know", "where"], ["your", "people", "are."]].map((line, li) => (
                                <span key={li} style={{ display: "block" }}>
                                    {line.map((word, wi) => (
                                        <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                                            <span className="doc-w" style={{ display: "inline-block" }}>{word}</span>
                                        </span>
                                    ))}
                                </span>
                            ))}
                            <span style={{ display: "block", overflow: "hidden", lineHeight: 1.2, marginTop: 4 }}>
                                <span className="doc-w" style={{ display: "inline-block", color: T.orange, fontStyle: "italic" }}>Always ready.</span>
                            </span>
                        </h2>
                        <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ fontSize: 15, color: "rgba(var(--text-rgb),0.48)", fontFamily: "var(--font-sans)", lineHeight: 1.8, margin: "0 0 36px", maxWidth: 440 }}>
                            Duty of care used to mean a spreadsheet of itineraries and a phone tree. Miraee turns it into a live, AI-monitored safety layer.
                        </motion.p>
                        <div ref={pointsRef} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            {features.map((f, i) => (
                                <motion.div key={f.title} className="doc-pt" whileHover={{ x: 6 }}
                                    style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(229,86,2,0.15)", border: "1px solid rgba(229,86,2,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <motion.div animate={{ opacity: [0.7,1,0.7] }} transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.orange} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                {f.icon.map((d: string, di: number) => <path key={di} d={d}/>)}
                                            </svg>
                                        </motion.div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 15, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, marginBottom: 4 }}>{f.title}</div>
                                        <div style={{ fontSize: 13, color: "rgba(var(--text-rgb),0.48)", fontFamily: "var(--font-sans)", lineHeight: 1.65 }}>{f.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div style={{ position: "relative", minHeight: isMobile ? 300 : 420, borderRadius: 20, overflow: "hidden" }}>
                        <GlobeMap/>
                    </div>
                </div>
                <motion.div initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                    viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" as const }}
                    style={{ padding: isMobile ? "28px 24px" : "36px 48px", background: "rgba(var(--text-rgb),0.04)", borderRadius: 20, border: "1px solid rgba(var(--text-rgb),0.08)", borderLeft: `3px solid ${T.orange}` }}>
                    <p style={{ fontSize: isMobile ? 18 : 24, fontFamily: "var(--font-heading)", fontStyle: "italic", color: T.ink, margin: 0, lineHeight: 1.55 }}>
                        "Your people travel everywhere. Miraee makes sure no one's ever alone out there."
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

// --- TRUSTED SECTORS ---------------------------------------------------------
const SECTOR_DATA = [
    { name: "Consulting & Professional Services", icon: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"] },
    { name: "Technology & SaaS", icon: ["M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"] },
    { name: "Financial Services", icon: ["M12 1v22","M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"] },
    { name: "Healthcare & Pharma", icon: ["M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z","M12 8v8","M8 12h8"] },
    { name: "Event Management & MICE", icon: ["M17 2H7a2 2 0 0 0-2 2v16l7-3 7 3V4a2 2 0 0 0-2-2z"] },
    { name: "Manufacturing", icon: ["M2 20h20","M4 20V10l4-4 4 4 4-6 4 6v10","M10 20v-5h4v5"] },
    { name: "Logistics & Supply Chain", icon: ["M1 3h15v13H1z","M16 8h4l3 3v5h-7V8z","M5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z","M18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"] },
    { name: "Telecom", icon: ["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"] },
]

function TrustedSectors() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const cols = isMobile ? 2 : w < 1024 ? 3 : 4

    return (
        <section id="demo" style={{ padding: isMobile ? "80px 24px 96px" : "110px 80px 130px", background: "var(--page-bg)", position: "relative", overflow: "hidden" }}>
            {/* Background glow */}
            <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(229,86,2,0.04) 0%, transparent 70%)", pointerEvents: "none" }}/>

            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: isMobile ? 48 : 64 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)" }}>Trusted Across</span>
                    <h2 style={{ fontSize: isMobile ? 28 : 44, fontFamily: "var(--font-heading)", color: T.ink, margin: "14px 0 0", letterSpacing: "-0.025em", fontWeight: 700, lineHeight: 1.1 }}>
                        Travel-heavy sectors.
                    </h2>
                </motion.div>

                {/* Card grid */}
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: isMobile ? 12 : 16 }}>
                    {SECTOR_DATA.map((sector, i) => (
                        <motion.div key={sector.name}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: (i % cols) * 0.07 }}
                            whileHover={{ y: -4, borderColor: "rgba(229,86,2,0.5)" }}
                            style={{
                                padding: isMobile ? "20px 16px" : "28px 24px",
                                background: "rgba(var(--text-rgb),0.04)",
                                border: "1px solid rgba(var(--text-rgb),0.08)",
                                borderRadius: 16,
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                cursor: "default",
                                transition: "border-color 0.25s",
                            }}>
                            {/* Icon box */}
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(229,86,2,0.12)", border: "1px solid rgba(229,86,2,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.orange} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    {sector.icon.map((d, di) => <path key={di} d={d}/>)}
                                </svg>
                            </div>
                            {/* Name */}
                            <span style={{ fontSize: isMobile ? 12 : 14, fontFamily: "var(--font-sans)", fontWeight: 600, color: T.ink, lineHeight: 1.4, letterSpacing: "0.01em" }}>
                                {sector.name}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ textAlign: "center", marginTop: isMobile ? 40 : 56, fontSize: 13, color: "rgba(var(--text-rgb),0.3)", fontFamily: "var(--font-sans)" }}>
                    Any industry where employees travel. Miraee handles the rest.
                </motion.p>
            </div>
        </section>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function MiraeeSolutionsPage(_props: any) {

    // Fix viewport meta for mobile responsiveness
    useEffect(() => {
        let meta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null
        if (!meta) {
            meta = document.createElement('meta') as HTMLMetaElement
            meta.name = 'viewport'
            document.head.appendChild(meta)
        }
        meta.content = 'width=device-width, initial-scale=1, maximum-scale=5'
    }, [])
    return (
        <div className="v1-type-page" style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "clip", background: "var(--page-bg)", fontFamily: "var(--font-sans)" }}>
            <SmoothScrollStyle/>
            <ScrollBar/>
            <SiteNav />
            <SolutionsHero/>
            <V11PageImage src={solutionsPageImg} alt="Manager collaborating with colleagues around business travel" label="Built around people" caption="One connected experience gives employees freedom while managers, finance, and travel teams retain the context they need." position="center 38%" mobilePosition="50% center" />
            <ByRole/>
            <AudienceShowcase/>
            <BySize/>
            <ByUseCase/>
            <DutyOfCare/>
            <TrustedSectors/>
            <V1Footer />
        </div>
    )
}
