import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import V11Hero from "../components/V11Hero"
import "./HomeV12.css"
import V11PageImage from "../components/V11PageImage"
import whyPageImg from "../../images/weavy/v1/solutions/v1-solutions-employees.webp"
gsap.registerPlugin(ScrollTrigger)

// --- Design tokens & shared local helpers (self-contained per V1 page pattern) --
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const existing = document.getElementById("why-miraee-v1-scroll-style")
        if (existing) return
        const s = document.createElement("style")
        s.id = "why-miraee-v1-scroll-style"
        s.textContent = `html{scroll-behavior:smooth;} *{-webkit-font-smoothing:antialiased;}`
        document.head.appendChild(s)
    }, [])
    return null
}

// --- Content (verbatim from WhyMiraeeV2.tsx) ----------------------------------
// Copy below is taken verbatim from the website content document (Page 4).
// Doc note: competitor names stay out of on-page copy; they are targeted via
// the SEO title/meta and Resources comparison articles instead.

// Doc section 2 — What actually changes (Stage / Today / With Miraee).
const shift: [string, string, string][] = [
    ["Planning a trip", "The traveler assembles it across tools", "Describes it and gets a policy-safe itinerary in under a minute"],
    ["Staying in policy", "Violations are found at approval", "Policy is applied at search; only compliant options appear"],
    ["Getting approval", "A queue, with context reconstructed from emails", "Routine trips self-book inside limits; only real exceptions escalate, with context attached"],
    ["Handling disruption", "The traveler discovers it and opens a ticket", "The agent detects it, prices alternatives, rebooks in band or brings one decision"],
    ["Filing the expense", "Collect, code, submit; finance chases the gaps", "Captured, coded and reconciled at the transaction"],
    ["Getting help", "A support queue with no context", "A specialist in the same thread with the full trip attached"],
]

// Doc section 3 — Side by side, table one: capabilities.
const capabilityCompare: [string, string, string, string][] = [
    ["Natural-language planning", "No", "No", "Yes"],
    ["Policy applied before booking", "Partial, by agent", "Partial, at checkout", "Yes, at search"],
    ["Proactive disruption handling", "By phone, during hours", "Notification only", "Detect, price, rebook in band"],
    ["Expense prepared automatically", "No", "Partial, receipt capture", "Coded, matched, posted"],
    ["Business and personal travel", "No", "No", "Yes, separate ledgers"],
    ["24/7 human support", "Often extra cost", "Chat, limited", "Included, same thread"],
    ["Agents that complete the work", "Humans do", "Software returns options", "Yes, inside written limits"],
]

// Doc section 3 — table two: commercials. Rewritten per the doc so no claim
// implies supplier change penalties are waived.
const commercials: [string, string, string, string][] = [
    ["Platform booking fee", "Per transaction", "Per user or per trip", "None"],
    ["Platform change fee", "Per transaction", "Varies", "None. Supplier fare rules apply"],
    ["Human support", "Priced per call or tier", "Tiered", "Included"],
    ["Expense management", "Separate product", "Bundled or add-on", "Included"],
    ["Expense reports per trip", "One, by the traveler", "One, partly pre-filled", "None to file"],
]

// Doc section 4 — The hard questions.
const hardQuestions: [string, string][] = [
    ["“We just signed with our TMC.”", "Run Miraee alongside it for one team. Your TMC keeps the contract; your pilot group gets a different experience. Compare at renewal with your own numbers."],
    ["“Our travelers won’t adopt another tool.”", "There is nothing to learn. Employees describe a trip in the chat or email they already use, and the agent does the rest. Adoption is the absence of a tool."],
    ["“We can’t let AI book without approval.”", "Then it won’t. Every autonomous action sits inside limits you set, and out-of-policy bookings always require a named human. Start with approval on everything and relax it when the audit trail earns it."],
    ["“Our travel policy is too complex.”", "Complex policy is exactly what breaks when humans apply it at approval time. The agent applies per-role, per-entity, per-route rules at search, every time, and shows its reasoning."],
    ["“What happens when a trip goes badly wrong?”", "A person, 24/7, in the same thread, with the full trip in front of them. The agent handles the routine so humans are available for the hard cases."],
    ["“You’re new.”", "Miraee is new. The supply behind it is not. Mondee has direct contracts with 500+ airlines and 2M+ hotels and has moved travelers at scale for years. The group is institutionally backed. What is new is the operating model, and we would rather show it on your trip than describe it."],
]

// Doc section 5 — Switching, without a big-bang (four steps with owners).
const switching: [string, string, string][] = [
    ["Policy", "We translate your existing policy into agent rules with your travel team.", "Miraee, with your travel team"],
    ["Connect", "SSO, HRIS and ERP with your IT team. Users provision automatically.", "Miraee, with your IT team"],
    ["Pilot", "One team, real trips, live support. Typically four to six weeks.", "Both"],
    ["Roll out", "Company-wide, with traveler onboarding and admin training. Full deployment in as little as 90 days.", "Miraee"],
]

// --- Hero ----------------------------------------------------------------------

// --- The Shift -------------------------------------------------------------------
function TheShift() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLDivElement>(null)
    const rowsRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, _ST) => {
        if (!rowsRef.current) return
        const rows = rowsRef.current.querySelectorAll(".shift-row")
        gsap.fromTo(rows, { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: "power3.out",
              scrollTrigger: { trigger: rowsRef.current, start: "top 78%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 48 : 72 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 16 }}>What Actually Changes</span>
                        <h2 style={{ fontSize: isMobile ? 30 : isTablet ? 44 : 56, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 18px", maxWidth: 720 }}>
                            What actually changes.
                        </h2>
                    </div>
                </Reveal>

                {!isMobile && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, padding: "0 0 14px", borderBottom: "1px solid rgba(var(--text-rgb),0.08)", marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, fontFamily: "var(--font-sans)" }}>The job</span>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, fontFamily: "var(--font-sans)" }}>Today</span>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)" }}>With Miraee</span>
                    </div>
                )}

                <div ref={rowsRef}>
                    {shift.map(([job, today, withMiraee]) => (
                        <div key={job} className="shift-row" style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                            gap: isMobile ? 12 : 32,
                            padding: isMobile ? "24px 0" : "28px 0",
                            borderBottom: "1px solid rgba(var(--text-rgb),0.06)",
                        }}>
                            <h3 style={{ fontSize: isMobile ? 18 : 17, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.01em" }}>{job}</h3>
                            <p style={{ fontSize: 14, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.75, margin: 0 }}>
                                {isMobile && <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, marginBottom: 6 }}>Today</span>}
                                {today}
                            </p>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                <div style={{ width: 16, height: 16, borderRadius: 5, background: T.orange, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                                    <svg width="8" height="8" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke={T.white} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                                </div>
                                <p style={{ fontSize: 14, color: T.ink, fontFamily: "var(--font-sans)", lineHeight: 1.75, margin: 0, fontWeight: 500 }}>
                                    {isMobile && <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange, marginBottom: 6 }}>With Miraee</span>}
                                    {withMiraee}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- Side by side ------------------------------------------------------------
function CompareTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: string[][] }) {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <div style={{ overflowX: "auto", borderRadius: 16, border: "1px solid rgba(var(--text-rgb),0.08)" }}>
            <table style={{ width: "100%", minWidth: isMobile ? 560 : 0, borderCollapse: "collapse" }} aria-label={caption}>
                <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>{caption}</caption>
                <thead>
                    <tr>
                        {headers.map((h, i) => (
                            <th key={h} scope="col" style={{
                                textAlign: "left", padding: isMobile ? "14px 16px" : "16px 22px", fontSize: 11, fontWeight: 700,
                                letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-sans)",
                                color: i === headers.length - 1 ? T.orange : "rgba(var(--text-rgb),0.45)",
                                background: "rgba(var(--text-rgb),0.04)", borderBottom: "1px solid rgba(var(--text-rgb),0.08)",
                                whiteSpace: "nowrap",
                            }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, ri) => (
                        <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? "1px solid rgba(var(--text-rgb),0.06)" : "none" }}>
                            {row.map((cell, ci) => {
                                const isLast = ci === row.length - 1
                                const isDash = cell === "-"
                                return (
                                    <td key={ci} style={{
                                        padding: isMobile ? "14px 16px" : "16px 22px", fontSize: 13.5, fontFamily: "var(--font-sans)",
                                        color: isDash ? "rgba(var(--text-rgb),0.22)" : isLast ? T.ink : "rgba(var(--text-rgb),0.55)",
                                        fontWeight: ci === 0 ? 600 : isLast ? 700 : 400,
                                        background: isLast ? "rgba(229,86,2,0.06)" : "transparent",
                                    }}>
                                        {ci === 0 ? cell : (
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                                                {isLast && !isDash && (
                                                    <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0 }}><path d="M2 6l3 3 5-5" stroke={T.orange} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                                                )}
                                                {cell}
                                            </span>
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function SideBySide() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP((gsap, _ST) => {
        if (!sectionRef.current) return
        const blocks = sectionRef.current.querySelectorAll(".compare-block")
        gsap.fromTo(blocks, { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true } })
    }, [])

    return (
        <section id="compare" ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.038) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                <div style={{ marginBottom: isMobile ? 48 : 72 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 16 }}>
                        Side by Side
                    </motion.span>
                    <h2 style={{ fontSize: isMobile ? 28 : isTablet ? 44 : 56, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: 0, maxWidth: 700 }}>
                        Side by side.
                    </h2>
                </div>

                <div className="compare-block" style={{ marginBottom: 48 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(var(--text-rgb),0.5)", fontFamily: "var(--font-sans)", margin: "0 0 18px" }}>Capability</h3>
                    <CompareTable caption="Capability comparison" headers={["Capability", "Legacy TMC", "First-gen T&E tool", "Miraee"]} rows={capabilityCompare} />
                </div>

                <div className="compare-block">
                    <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(var(--text-rgb),0.5)", fontFamily: "var(--font-sans)", margin: "0 0 18px" }}>Commercials</h3>
                    <CompareTable caption="Commercial terms comparison" headers={["Commercials", "Legacy TMC", "First-gen T&E tool", "Miraee"]} rows={commercials} />
                </div>
            </div>
        </section>
    )
}

// --- Hard questions (accordion) -----------------------------------------------
function QuestionRow({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false)
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <div style={{ borderBottom: "1px solid rgba(var(--text-rgb),0.08)" }}>
            <button onClick={() => setOpen(o => !o)} aria-expanded={open}
                style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
                    padding: isMobile ? "22px 0" : "28px 4px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                }}>
                <span style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                    <span style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, flexShrink: 0 }}>{String(index + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: isMobile ? 17 : 20, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, letterSpacing: "-0.01em" }}>{q}</span>
                </span>
                <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
                    style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", border: `1px solid ${T.orange}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="10" height="10" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke={T.orange} strokeWidth="1.6" strokeLinecap="round" /></svg>
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                        <p style={{ margin: isMobile ? "0 0 22px" : "0 0 28px", paddingLeft: isMobile ? 0 : 40, fontSize: 14.5, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.85, maxWidth: 720 }}>
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function HardQuestions() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024

    return (
        <section style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 40 : 64 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 16 }}>The Hard Questions</span>
                        <h2 style={{ fontSize: isMobile ? 28 : isTablet ? 42 : 52, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0 }}>
                            The hard questions.
                        </h2>
                    </div>
                </Reveal>
                <Reveal>
                    <div>
                        {hardQuestions.map(([q, a], i) => (
                            <QuestionRow key={q} q={q} a={a} index={i} />
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// --- Switching timeline --------------------------------------------------------
function Switching() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, _ST) => {
        if (!sectionRef.current) return
        const steps = sectionRef.current.querySelectorAll(".switch-step")
        gsap.fromTo(steps, { y: 46, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 74%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 48 : 72 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 16 }}>Switching</span>
                        <h2 style={{ fontSize: isMobile ? 30 : isTablet ? 44 : 54, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 16px", maxWidth: 640 }}>
                            Switching, without a big-bang.
                        </h2>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4,1fr)", gap: isMobile ? 0 : 20 }}>
                    {switching.map(([step, what, who], i) => (
                        <div key={step} className="switch-step" style={{
                            padding: isMobile ? "28px 0" : "32px 26px",
                            borderTop: isMobile ? "1px solid rgba(var(--text-rgb),0.08)" : `3px solid ${T.orange}`,
                            borderBottom: isMobile && i === switching.length - 1 ? "1px solid rgba(var(--text-rgb),0.08)" : "none",
                            background: isMobile ? "transparent" : "rgba(var(--text-rgb),0.03)",
                            borderRadius: isMobile ? 0 : 16,
                            position: "relative",
                        }}>
                            <span style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, display: "block", marginBottom: 14 }}>0{i + 1}</span>
                            <h3 style={{ fontSize: 21, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, margin: "0 0 12px", letterSpacing: "-0.01em" }}>{step}</h3>
                            <p style={{ fontSize: 13.5, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.75, margin: "0 0 16px" }}>{what}</p>
                            <p style={{ fontSize: 11.5, color: T.orange, fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: "0.03em", margin: 0 }}>{who}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- Closing CTA -----------------------------------------------------------------
function WhyCTA() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP((gsap, _ST) => {
        if (!sectionRef.current) return
        gsap.fromTo(sectionRef.current.querySelector(".cta-inner"), { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "100px 24px" : "160px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.038) 1px, transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }} />
            <div style={{
                position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(229,86,2,0.1) 0%, transparent 60%)",
            }} />
            <div className="cta-inner" style={{ position: "relative", zIndex: 2, maxWidth: 780, margin: "0 auto" }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 20 }}>
                    See the Agent in Action
                </span>
                <h2 style={{ fontSize: isMobile ? 32 : isTablet ? 48 : 60, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                    Bring the trip that<br />always goes wrong.
                </h2>
                <p style={{ fontSize: isMobile ? 15 : 17, color: "rgba(var(--text-rgb),0.5)", fontFamily: "var(--font-sans)", lineHeight: 1.8, margin: "0 auto 44px", maxWidth: 560 }}>
                    The multi-city one. The one that always gets changed. The one nobody expenses correctly. Twenty minutes, live.
                </p>
                <motion.div style={{ display: "inline-block" }} whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(229,86,2,0.55)" }} whileTap={{ scale: 0.97 }}>
                    <Link to="/book-a-demo" style={{ padding: isMobile ? "16px 34px" : "18px 46px", background: T.orange, color: T.white, borderRadius: 12, fontSize: 15, fontFamily: "var(--font-sans)", fontWeight: 700, textDecoration: "none", display: "inline-block", letterSpacing: "0.01em" }}>
                        Book your demo
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

// --- Page ------------------------------------------------------------------------
export default function MiraeeWhyMiraeePage() {
    useEffect(() => {
        document.title = "Why Miraee | Compared with TMCs and Travel & Expense Tools"
        // Meta description per the doc's Why Miraee SEO brief.
        const description = "Side by side with legacy TMCs and first-generation T&E tools, plus straight answers to the hard questions. Your travel program is not broken. Its architecture is."
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        if (!meta) {
            meta = document.createElement("meta")
            meta.name = "description"
            document.head.appendChild(meta)
        }
        meta.content = description
    }, [])

    useGSAP(() => {
        ScrollTrigger.refresh()
        return () => { ScrollTrigger.getAll().forEach(st => st.kill()) }
    }, [])

    return (
        <div className="v1-type-page" style={{ background: "var(--page-bg)" }}>
            <SmoothScrollStyle />
            <SiteNav />
            <V11Hero
                kicker="Why Miraee"
                title="Your travel program isn't broken."
                accent="Its architecture is."
                sub="Every tool in corporate travel solved one stage and handed the traveler to the next. The problem was never the booking screen. It was the handoff."
                primaryCta={{ label: "See the difference live", href: "/book-a-demo" }}
                secondaryCta={{ label: "Compare side by side ↓", href: "#compare" }}
                image={{ src: whyPageImg, alt: "Employee beginning a business journey with confidence" }} />
            <V11PageImage src={whyPageImg} alt="Employee beginning a business journey with confidence" label="A better way to travel" caption="Employees get a personal experience while the business gains one continuous view of the journey." position="center 38%" mobilePosition="56% center" />
            <TheShift />
            <SideBySide />
            <HardQuestions />
            <Switching />
            <WhyCTA />
            <V1Footer />
        </div>
    )
}
