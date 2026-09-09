import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import V11Hero from "../components/V11Hero"
import PersonaExperience, { PERSONA_SCRIPTS } from "../components/PersonaExperience"
import forTeamsImg from "../../images/weavy/v1/solutions/v1-solutions-managers.webp"
import "./HomeV12.css"

// ─── Page 3. For Teams ────────────────────────────────────────────────────────
// Copy is taken verbatim from the website content document (Part 3, Page 3).
// Section order: hero → fit → six role views → use cases → duty of care → CTA.

const T = {
    ink: "var(--text)",
    maroon: "#450E14",
    orange: "#E55602",
    cream: "#FBF6F2",
    muted: "rgba(var(--text-rgb),0.45)",
    // Readable secondary ink. 0.45 is only 3.19:1, which fails AA below 24px.
    muted2: "rgba(var(--text-rgb),0.68)",
    mutedLight: "rgba(var(--text-rgb),0.12)",
    accent: "var(--accent-strong)",
    // Lifted orange for the dark chat card, where #E55602 is too dark to read.
    accentLight: "#FF8A52",
    // Deepened orange for 10-11px labels on cream, where #E55602 is only 3.45:1.
    accentInk: "#B23F02",
    // On-dark set for the role band.
    onDark: "#FFF6F0",
    onDarkSoft: "rgba(255, 246, 240, 0.66)",
    onDarkFaint: "rgba(255, 246, 240, 0.14)",
    maroonDeep: "#2E0409",
}

const F = "var(--font-sans)"
const SERIF = "var(--font-heading)"

function useWindowWidth() {
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1440)
    useEffect(() => {
        const fn = () => setW(window.innerWidth)
        window.addEventListener("resize", fn)
        return () => window.removeEventListener("resize", fn)
    }, [])
    return w
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.2 })
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
            {children}
        </motion.div>
    )
}

function Label({ text }: { text: string }) {
    return (
        <div style={{ fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.orange, marginBottom: 18 }}>
            {text}
        </div>
    )
}

// ─── 2 Fit ────────────────────────────────────────────────────────────────────
function Fit() {
    const isMobile = useWindowWidth() < 768
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
                <Reveal>
                    <Label text="Fit" />
                    <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 3.4vw, 50px)", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                        Who Miraee is <span style={{ color: T.accent, fontStyle: "italic" }}>for.</span>
                    </h2>
                    <p style={{ fontFamily: F, fontSize: isMobile ? 16 : 18, lineHeight: 1.75, color: T.muted, margin: "0 0 36px" }}>
                        Miraee is built for upper-SMB and mid-market companies, typically 100 to 3,000 employees and $500K to $5M in annual travel spend, running six or more disconnected tools today. Growth-stage teams get a program with no admin overhead. Multi-region companies get entity-level control, MICE and consolidated reporting on the same platform.
                    </p>
                    <a href="/book-a-demo" style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                        Find your fit →
                    </a>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 3 One platform, six views ────────────────────────────────────────────────
type Role = { label: string; slug: string; shift: string; rows: string[]; cta: string; href: string }

// "You used to X. Now you Y." is the payload of this section, so the panel stages
// the two halves as a before/after diptych instead of burying them in one
// sentence. Split on "Now " and keep the doc copy verbatim on both sides.
function splitShift(shift: string): [string, string] {
    const i = shift.indexOf("Now ")
    if (i < 0) return [shift, ""]
    return [shift.slice(0, i).trim(), shift.slice(i).trim()]
}

const ROLES: Role[] = [
    {
        label: "Employees",
        slug: "employees",
        shift: "You used to assemble a trip. Now you describe one.",
        rows: [
            "Trip planning from a sentence",
            "Policy applied before you see options",
            "Rebooking handled in the same thread",
            "Receipts captured, no report to file",
            "Personal trips on the same agent",
        ],
        cta: "See a trip get planned",
        href: "/v1.1/product",
    },
    {
        label: "Finance",
        slug: "finance",
        shift: "You used to reconcile the past. Now you watch the present.",
        rows: [
            "Committed spend visible at booking",
            "Automated reconciliation and ERP sync",
            "Wholesale rates 20 to 30% below published fares*",
            "Full exportable audit trail",
            "What finance still controls: chart of accounts, approval chains, spend ceilings, permitted suppliers, final sign-off, exportable log",
        ],
        cta: "Run the ROI calculator",
        href: "/v1.1/resources",
    },
    {
        label: "Travel leads",
        slug: "travel-leads",
        shift: "You used to process bookings. Now you run a program.",
        rows: [
            "Program-wide analytics by team, entity and route",
            "Direct supply through Mondee",
            "MICE and group booking built in",
            "Exceptions routed to you with context",
        ],
        cta: "See the console",
        href: "/v1.1/product",
    },
    {
        label: "Admins",
        slug: "admins",
        shift: "You used to police every trip. Now you set the rule once.",
        rows: [
            "Per diem and policy enforced at search",
            "Approval routing by role and threshold",
            "Unified traveler profiles from HRIS",
            "One dashboard for the whole program",
        ],
        cta: "See policy setup",
        href: "/v1.1/product",
    },
    {
        label: "CHROs",
        slug: "chros",
        shift: "You used to enforce policy. Now you support people.",
        rows: [
            "Consumer-grade traveler experience",
            "Duty of care and disruption support",
            "Policy applied the same way for everyone",
            "Optional incentives for cost-efficient choices",
        ],
        cta: "See the traveler experience",
        href: "/v1.1/product",
    },
    {
        label: "Managers",
        slug: "managers",
        shift: "You used to chase approvals. Now only exceptions reach you.",
        rows: [
            "Routine trips self-book inside limits",
            "Exceptions arrive with full context",
            "Team-level visibility without a report",
        ],
        cta: "See approval flow",
        href: "/v1.1/product",
    },
]

// Band A, left: the claim. "You used to X" is struck through, which says
// "no longer true" faster than a label can, and "Now you Y" carries the weight.
function RoleStatement({ role, isMobile }: { role: Role; isMobile: boolean }) {
    const [before, after] = splitShift(role.shift)
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.onDarkSoft, marginBottom: 14 }}>
                Before
            </div>
            <p style={{
                fontFamily: SERIF, fontSize: isMobile ? 20 : "clamp(21px, 1.7vw, 26px)", fontWeight: 400,
                lineHeight: 1.32, letterSpacing: "-0.02em", color: T.onDarkSoft, margin: "0 0 30px",
                textDecoration: "line-through", textDecorationColor: T.accentLight,
                textDecorationThickness: "1.5px", textUnderlineOffset: "2px",
            }}>
                {before}
            </p>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.accentLight, marginBottom: 14 }}>
                With Miraee
            </div>
            <h3 style={{ fontFamily: SERIF, fontSize: isMobile ? 30 : "clamp(32px, 3.4vw, 50px)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.035em", color: T.onDark, margin: 0 }}>
                <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>{role.shift}</span>
                <span aria-hidden="true">{after}</span>
            </h3>
            <a href={role.href} style={{
                display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 10,
                marginTop: isMobile ? 30 : "auto", paddingTop: 30,
                fontFamily: F, fontSize: 15, fontWeight: 700, color: T.accentLight, textDecoration: "none",
                borderBottom: "1px solid " + T.onDarkFaint,
            }}>
                {role.cta} <span aria-hidden="true">&rarr;</span>
            </a>
        </div>
    )
}

// Band B: what changes, as a full-width grid rather than a tall skinny list —
// which is what left a column of dead space beside it. Rendered once for real
// and once per role in a hidden measurer, so the band can reserve the tallest
// role's exact height at the current width and never shift the page.
function RoleLedger({ role, isMobile, animate }: { role: Role; isMobile: boolean; animate: boolean }) {
    const rise = animate ? { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } } : {}
    return (
        <ul style={{
            listStyle: "none", margin: 0, padding: 0,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
            columnGap: 40, borderTop: "1px solid " + T.onDarkFaint,
        }}>
            {role.rows.map((row, i) => (
                <motion.li key={row} {...rise}
                    transition={{ duration: 0.44, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        // The one long "what finance still controls" row would wrap to
                        // four lines in a third of the width, so it takes two.
                        gridColumn: !isMobile && row.length > 74 ? "span 2" : undefined,
                        display: "flex", gap: 14, alignItems: "baseline",
                        padding: "20px 0", borderBottom: "1px solid " + T.onDarkFaint,
                    }}>
                    <span aria-hidden="true" style={{ color: T.accentLight, fontSize: 13, lineHeight: 1.7, flexShrink: 0 }}>&#9679;</span>
                    <span style={{ fontFamily: F, fontSize: isMobile ? 15 : 16, lineHeight: 1.6, letterSpacing: "-0.005em", color: T.onDark }}>{row}</span>
                </motion.li>
            ))}
        </ul>
    )
}

function RoleViews() {
    const w = useWindowWidth()
    const isMobile = w < 900
    const [active, setActive] = useState(0)
    const reduce = useReducedMotion()
    const role = ROLES[active]
    const railRef = useRef<HTMLDivElement>(null)
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
    // Only the stage swap should reserve height; the first paint must not.
    const [stageMin, setStageMin] = useState(0)
    const measureRef = useRef<HTMLDivElement>(null)

    // Home links each of its three cards to a role here (e.g. #finance), so
    // open that tab on arrival and keep responding to in-page hash changes.
    useEffect(() => {
        const openFromHash = () => {
            const slug = window.location.hash.replace("#", "")
            if (!slug) return
            const i = ROLES.findIndex(r => r.slug === slug)
            if (i >= 0) setActive(i)
        }
        openFromHash()
        window.addEventListener("hashchange", openFromHash)
        return () => window.removeEventListener("hashchange", openFromHash)
    }, [])

    // On the mobile rail the active tab can sit off-screen after a deep link or
    // an arrow-key move, which makes the selection invisible. Keep it in view.
    useEffect(() => {
        // One frame of slack: on a hash deep link this runs before the rail has
        // been laid out, when scrollWidth still equals clientWidth.
        let alive = true
        const align = (behavior: ScrollBehavior) => {
            const rail = railRef.current
            const tab = tabRefs.current[active]
            if (!alive || !rail || !tab || rail.scrollWidth <= rail.clientWidth) return
            const pad = 20
            const left = tab.offsetLeft - pad
            const right = tab.offsetLeft + tab.offsetWidth + pad
            // Only ever corrects an off-screen selection, so a manual swipe is
            // never hijacked.
            if (left < rail.scrollLeft) rail.scrollTo({ left, behavior })
            else if (right > rail.scrollLeft + rail.clientWidth) {
                rail.scrollTo({ left: right - rail.clientWidth, behavior })
            }
        }
        const id = requestAnimationFrame(() => align(reduce ? "auto" : "smooth"))
        // On a hash deep link the rail is not yet scrollable in the first frame,
        // because the tab labels have not been laid out with the webfont. Jump
        // rather than glide on this pass: the section is off-screen anyway.
        document.fonts?.ready.then(() => align("auto"))
        return () => { alive = false; cancelAnimationFrame(id) }
    }, [active, reduce, isMobile])

    // Roles have 3 to 5 rows and their sentences wrap differently at every width,
    // so a row-count estimate is wrong on mobile. Measure all six columns in the
    // hidden measurer below and reserve the tallest. Re-runs on resize.
    useEffect(() => {
        const el = measureRef.current
        if (!el) return
        const heights = [...el.children].map(c => (c as HTMLElement).offsetHeight)
        // + the band's own label above the grid.
        const max = Math.max(0, ...heights) + 46
        if (max > 46) setStageMin(Math.round(max))
    }, [w])

    // WAI-ARIA tabs: arrows move selection, Home/End jump to the ends, and only
    // the selected tab is in the tab order (roving tabindex).
    const onRailKeyDown = (e: React.KeyboardEvent) => {
        const last = ROLES.length - 1
        let next = -1
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1
        else if (e.key === "Home") next = 0
        else if (e.key === "End") next = last
        if (next < 0) return
        e.preventDefault()
        setActive(next)
        tabRefs.current[next]?.focus()
    }

    const spring = { type: "spring" as const, stiffness: 120, damping: 20 }

    return (
        <section id="roles" className="v11-role-band" style={{
            position: "relative",
            // Full-bleed dark band. The page runs cream, so inverting here makes
            // the product preview the hero rather than a stamp on a pale field.
            background: T.maroonDeep,
            padding: isMobile ? "88px 0 96px" : "136px 0 148px",
            scrollMarginTop: 90,
            // clip, not hidden: `overflow: hidden` would make this section the
            // scroll container for its descendants.
            overflowX: "clip",
        }}>
            {/* Warm lift behind the preview so the band has depth rather than
                reading as a flat rectangle. Purely decorative. */}
            <div aria-hidden="true" style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: isMobile
                    ? "radial-gradient(120% 60% at 50% 22%, rgba(229,86,2,0.20), transparent 70%)"
                    : "radial-gradient(58% 74% at 76% 30%, rgba(229,86,2,0.24), transparent 68%), radial-gradient(48% 60% at 8% 88%, rgba(255,138,82,0.10), transparent 70%)",
            }} />

            {/* Oversized role numeral, set as an outline so it reads as a
                watermark rather than competing with the copy. */}
            {!isMobile && (
                <motion.div key={"ghost-" + role.slug} aria-hidden="true"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: reduce ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: "absolute", top: 40, right: "3vw", pointerEvents: "none",
                        fontFamily: F, fontSize: "clamp(180px, 22vw, 330px)", fontWeight: 700,
                        lineHeight: 0.8, letterSpacing: "-0.06em",
                        color: "transparent", WebkitTextStroke: "1px rgba(255,246,240,0.07)",
                    }}>
                    {String(active + 1).padStart(2, "0")}
                </motion.div>
            )}

            <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: isMobile ? "0 20px" : "0 56px" }}>

                {/* Header — left-aligned, with the role counter carrying the right
                    edge instead of a second block of copy. */}
                <Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) auto", gap: 24, alignItems: "end", marginBottom: isMobile ? 40 : 64 }}>
                        <div>
                            <div style={{ fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.accentLight, marginBottom: 18 }}>
                                One platform, six views
                            </div>
                            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4.4vw, 62px)", fontWeight: 700, color: T.onDark, lineHeight: 1.04, letterSpacing: "-0.035em", margin: 0, maxWidth: "16ch" }}>
                                What changes, <span style={{ color: T.accentLight, fontStyle: "italic" }}>role by role.</span>
                            </h2>
                        </div>
                        {!isMobile && (
                            <div style={{ textAlign: "right", paddingBottom: 8 }}>
                                <div style={{ fontFamily: F, fontSize: 46, fontWeight: 300, letterSpacing: "-0.04em", color: T.onDark, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                                    {String(active + 1).padStart(2, "0")}
                                    <span style={{ color: "rgba(255,246,240,0.32)" }}> / {String(ROLES.length).padStart(2, "0")}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </Reveal>

                {/* Role rail — horizontal, hairline-separated, no boxes. The active
                    marker slides between roles on one shared layoutId. */}
                <div ref={railRef} role="tablist" aria-label="Explore Miraee by role"
                    aria-orientation="horizontal" onKeyDown={onRailKeyDown}
                    style={{
                        display: "flex", gap: isMobile ? 4 : 0, borderTop: "1px solid " + T.onDarkFaint,
                        overflowX: isMobile ? "auto" : "visible", scrollSnapType: isMobile ? "x mandatory" : undefined,
                        WebkitOverflowScrolling: "touch", marginBottom: isMobile ? 40 : 0,
                        scrollbarWidth: "none",
                        // Fades the cut-off tab so it reads as "more to the right".
                        maskImage: isMobile ? "linear-gradient(90deg, #000 0, #000 86%, transparent 100%)" : undefined,
                        WebkitMaskImage: isMobile ? "linear-gradient(90deg, #000 0, #000 86%, transparent 100%)" : undefined,
                    }}>
                    {ROLES.map((r, i) => {
                        const on = i === active
                        return (
                            <button key={r.label} id={r.slug} role="tab"
                                ref={el => { tabRefs.current[i] = el }}
                                aria-selected={on}
                                aria-controls="role-stage"
                                tabIndex={on ? 0 : -1}
                                onClick={() => setActive(i)}
                                style={{
                                    position: "relative", flex: isMobile ? "0 0 auto" : "1 1 0", minWidth: isMobile ? 132 : 0,
                                    scrollSnapAlign: isMobile ? "start" : undefined,
                                    // The sticky nav is ~90px, so a #finance deep link would
                                    // otherwise land this tab underneath it.
                                    scrollMarginTop: 140,
                                    display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start",
                                    minHeight: 84, padding: isMobile ? "18px 12px" : "22px 20px 22px 0",
                                    border: "none", background: "transparent", cursor: "pointer", textAlign: "left",
                                    fontFamily: F, opacity: on ? 1 : 0.66,
                                    transition: "opacity .3s cubic-bezier(.16,1,.3,1), transform .18s cubic-bezier(.16,1,.3,1)",
                                }}
                                onPointerDown={e => { e.currentTarget.style.transform = "translateY(1px)" }}
                                onPointerUp={e => { e.currentTarget.style.transform = "none" }}
                                onPointerLeave={e => { e.currentTarget.style.transform = "none" }}>
                                <span style={{ fontFamily: F, fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", fontVariantNumeric: "tabular-nums", color: on ? T.accentLight : T.onDarkSoft }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <b style={{ fontFamily: F, fontSize: isMobile ? 14 : 16.5, fontWeight: 650, letterSpacing: "-0.01em", color: on ? T.onDark : T.onDarkSoft, whiteSpace: "nowrap" }}>
                                    {r.label}
                                </b>
                                {on && (
                                    <motion.span layoutId="role-rail-marker" transition={spring} aria-hidden="true"
                                        style={{ position: "absolute", top: -1, left: 0, right: isMobile ? 0 : 20, height: 2, background: T.accentLight, boxShadow: "0 0 18px rgba(255,138,82,0.55)" }} />
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Stage — asymmetric split. The typographic argument sits on the page
                    itself; only the product preview gets a dark surface, so the
                    section no longer reads as one heavy slab. */}
                <div id="role-stage" role="tabpanel" aria-labelledby={role.slug} tabIndex={-1}
                    style={{ marginTop: isMobile ? 0 : 56, outline: "none" }}>

                    {/* Band A — claim left, product preview right, equal height. */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) minmax(0, 0.88fr)",
                        gap: isMobile ? 36 : 72, alignItems: "stretch",
                    }}>
                        <motion.div key={"claim-" + role.slug}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reduce ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] }}>
                            <RoleStatement role={role} isMobile={isMobile} />
                        </motion.div>

                        {/* One dark surface, not a card inside a card: the preview runs
                            flush and the frame prints the role and the disclosure once. */}
                        <motion.div key={"stage-" + role.slug}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reduce ? 0.2 : 0.54, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                // Lifted glass panel: a 1px inner lip plus a tinted
                                // diffusion shadow, so it refracts off the band.
                                background: "linear-gradient(168deg, rgba(255,246,240,0.085), rgba(255,246,240,0.028))",
                                border: "1px solid rgba(255,246,240,0.12)",
                                borderRadius: 26,
                                padding: isMobile ? "22px 20px 24px" : "26px 28px 30px",
                                boxShadow: "inset 0 1px 0 rgba(255,246,240,0.14), 0 40px 80px -34px rgba(0,0,0,0.6)",
                                backdropFilter: "blur(2px)",
                            }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 16, marginBottom: 20, borderBottom: "1px solid rgba(255,246,240,0.14)" }}>
                                <motion.span aria-hidden="true"
                                    animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
                                    transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ width: 6, height: 6, borderRadius: "50%", background: T.accentLight, flexShrink: 0 }} />
                                <span style={{ fontFamily: F, fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.accentLight }}>
                                    {role.label}
                                </span>
                                <span style={{ marginLeft: "auto", fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.onDarkSoft }}>
                                    Scripted preview
                                </span>
                            </div>
                            {/* Reserves the tallest of the six scripts at each breakpoint. */}
                            <div style={{ minHeight: isMobile ? 268 : 232 }}>
                                <PersonaExperience script={PERSONA_SCRIPTS[role.slug]} autoPlay tone="dark" flush />
                            </div>
                        </motion.div>
                    </div>

                    {/* Band B — the ledger, across the full width. */}
                    <div style={{ position: "relative", marginTop: isMobile ? 40 : 72, minHeight: stageMin || undefined }}>
                        <div style={{ fontFamily: F, fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.onDarkSoft, marginBottom: 18 }}>
                            What changes
                        </div>
                        <motion.div key={"ledger-" + role.slug}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reduce ? 0.2 : 0.46, ease: [0.16, 1, 0.3, 1] }}>
                            <RoleLedger role={role} isMobile={isMobile} animate={!reduce} />
                        </motion.div>

                        <div ref={measureRef} aria-hidden="true" style={{
                            position: "absolute", top: 0, left: 0, right: 0,
                            visibility: "hidden", pointerEvents: "none", overflow: "hidden", height: 0,
                        }}>
                            {ROLES.map(r => (
                                <div key={r.slug}><RoleLedger role={r} isMobile={isMobile} animate={false} /></div>
                            ))}
                        </div>
                    </div>
                </div>

                <Reveal delay={0.15}>
                    <p style={{ fontFamily: F, fontSize: 13, lineHeight: 1.7, color: T.onDarkSoft, marginTop: isMobile ? 36 : 56 }}>
                        * On comparable itineraries. Results vary.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 4 Use cases ──────────────────────────────────────────────────────────────
const USE_CASES: [string, string][] = [
    ["Business travel", "End-to-end booking, changes and expense for everyday trips, inside policy without a queue."],
    ["Meetings and events", "MICE, group booking, venue sourcing and attendee management on the same platform and ledger."],
    ["Executive travel", "White-glove handling with the agent learning preferences over time and a named human on call."],
    ["Global mobility", "Cross-border travel for distributed teams, with entity-level policy, currency and data residency handled."],
    ["Emergency and disruption", "Proactive rebooking, traveler location and one thread for the whole response."],
]

function UseCases() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section id="use-cases" style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px", scrollMarginTop: 90 }}>
            <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: 56 }}>
                        <Label text="Use cases" />
                        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 3.4vw, 50px)", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.03em", margin: 0 }}>
                            Every kind of trip <span style={{ color: T.accent, fontStyle: "italic" }}>your company takes.</span>
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : w < 1100 ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 24 }}>
                    {USE_CASES.map(([title, body], i) => (
                        <Reveal key={title} delay={i * 0.07}>
                            <div style={{ height: "100%", boxSizing: "border-box", background: "var(--page-bg)", border: `1px solid ${T.mutedLight}`, borderRadius: 20, padding: "34px 30px" }}>
                                <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: T.accent, opacity: 0.55, marginBottom: 14 }}>
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: T.ink, lineHeight: 1.25, margin: "0 0 12px" }}>{title}</h3>
                                <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.65, color: T.muted, margin: 0 }}>{body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── 5 Duty of care ───────────────────────────────────────────────────────────
const DUTY_ROWS: [string, string][] = [
    ["Real-time location", "Know where every traveler is, from booked segments and check-ins, with role-based access."],
    ["Risk monitoring", "Disruption, weather and advisory alerts matched to itineraries."],
    ["Instant response", "Rebook, reroute or reach a human from the same thread."],
    ["Audit-ready records", "Every action logged with actor, rule, time and cost."],
]

function DutyOfCare() {
    const isMobile = useWindowWidth() < 900
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 0.9fr) minmax(0, 1.1fr)", gap: isMobile ? 40 : 80, alignItems: "start" }}>
                <Reveal>
                    <div>
                        <Label text="Duty of care" />
                        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 3.4vw, 50px)", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.03em", margin: "0 0 26px" }}>
                            Your people travel everywhere. <span style={{ color: T.accent, fontStyle: "italic" }}>No one is ever alone out there.</span>
                        </h2>
                        <a href="/v1.1/security" style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                            How agent actions are governed →
                        </a>
                    </div>
                </Reveal>
                <div>
                    {DUTY_ROWS.map(([title, body], i) => (
                        <Reveal key={title} delay={i * 0.08}>
                            <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 18, padding: "26px 0", borderTop: `1px solid ${T.mutedLight}` }}>
                                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: T.orange, paddingTop: 4 }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: T.ink, margin: "0 0 8px" }}>{title}</h3>
                                    <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.65, color: T.muted, margin: 0 }}>{body}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── 6 Closing CTA (universal, Part 2.2) ──────────────────────────────────────
function ClosingCTA() {
    const isMobile = useWindowWidth() < 768
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "140px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: "6%", right: "8%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
                <Reveal>
                    <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 700, color: T.ink, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                        Bring a<br /><span style={{ color: T.accent }}>real trip.</span>
                    </h2>
                    <p style={{ fontFamily: F, fontSize: 18, lineHeight: 1.65, color: T.muted, maxWidth: 480, margin: "0 auto 44px" }}>
                        Twenty minutes. Your route, your policy, your edge cases. We run it live.
                    </p>
                    <a href="/book-a-demo" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: T.maroon, color: T.cream, fontFamily: F, fontSize: 17, fontWeight: 700, padding: "20px 52px", borderRadius: 100, textDecoration: "none" }}>
                        Book your demo ↗
                    </a>
                    <p style={{ fontFamily: F, fontSize: 13, color: T.muted, marginTop: 20 }}>
                        No long contracts. No heavy IT lift. Live in as little as 90 days.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

export default function ForTeamsPage() {
    useEffect(() => {
        // Title tag + meta description per the doc's For Teams SEO brief.
        document.title = "For Employees, Finance and Travel Teams | Miraee"
        const description = "What changes for employees, finance, travel leads, admins, HR and managers when one agent runs the trip. Use cases from MICE to executive travel and disruption."
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta) }
        meta.content = description
    }, [])

    return (
        <div className="v1-type-page" style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "clip", fontFamily: F, background: "var(--page-bg)" }}>
            <SiteNav />
            <V11Hero
                kicker="For Teams"
                title="Built for everyone"
                accent="behind the journey."
                sub="From the person taking the trip to the people paying for it and running the program."
                primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
                secondaryCta={{ label: "See the roles ↓", href: "#roles" }}
                image={{ src: forTeamsImg, alt: "Manager reviewing an approval with a colleague" }}
                chips={["Employees", "Finance", "Travel leads", "Admins", "CHROs", "Managers", "Use cases"]} />
            <Fit />
            <RoleViews />
            <UseCases />
            <DutyOfCare />
            <ClosingCTA />
            <V1Footer />
        </div>
    )
}
