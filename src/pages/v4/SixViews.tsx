import { useRef, useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import PersonaExperience, { PERSONA_SCRIPTS } from "../../components/PersonaExperience"
import { Reveal } from "../../components/V4Kit"
import financeVideo from "../../assets/Video/Finance.mp4"
import adminVideo from "../../assets/Video/Admin.mp4"

// Verbatim port of V1.1's "One platform, six views" (src/pages/ForTeams.tsx:374).
//
// The payload of this section is "You used to X. Now you Y.", so the panel stages
// the two halves as a before/after diptych rather than burying them in one
// sentence — the "before" struck through, the "after" as the headline. A
// horizontal hairline rail switches roles, with the active marker sliding
// between them on one shared layoutId, and the right-hand glass panel plays that
// role's scripted preview.
//
// Structure, spring, layoutId, the split-on-"Now " rule and every dimension come
// from the source. Colours are re-pointed at V4's dark band.

const T = {
    onDark: "#fff6f0",
    onDarkSoft: "rgba(255,246,240,0.62)",
    onDarkFaint: "rgba(255,246,240,0.16)",
    accentLight: "#ff8a52",
}
const spring = { type: "spring" as const, stiffness: 420, damping: 38 }

export type SixViewRole = {
    label: string
    slug: string
    shift: string
    body?: string
    controls?: string[]
    rows: string[]
    cta: string
    href: string
}

// "You used to X. Now you Y." — split on "Now " and keep the copy verbatim on
// both sides.
function splitShift(shift: string): [string, string] {
    const i = shift.indexOf("Now ")
    if (i < 0) return [shift, ""]
    return [shift.slice(0, i).trim(), shift.slice(i).trim()]
}

function RoleStatement({ role, isMobile }: { role: SixViewRole; isMobile: boolean }) {
    const [before, after] = splitShift(role.shift)
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.onDarkSoft, marginBottom: 14 }}>
                Before
            </div>
            <p style={{
                fontFamily: "var(--font-sans)", fontSize: isMobile ? 18 : "clamp(19px, 1.5vw, 24px)", fontWeight: 400,
                lineHeight: 1.32, letterSpacing: "-0.02em", color: T.onDarkSoft, margin: "0 0 24px",
                textDecoration: "line-through", textDecorationColor: T.accentLight,
                textDecorationThickness: "1.5px", textUnderlineOffset: "2px",
            }}>
                {before}
            </p>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.accentLight, marginBottom: 12 }}>
                With Miraee
            </div>
            {/* The visible headline is only the "after" half, so the full sentence
                is exposed to assistive tech in a visually-hidden span. */}
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isMobile ? 26 : "clamp(28px, 2.8vw, 42px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.035em", color: T.onDark, margin: "0 0 16px" }}>
                <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>{role.shift}</span>
                <span aria-hidden="true">{after}</span>
            </h3>

            {role.body && (
                <p style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? 14 : 15, lineHeight: 1.65, color: T.onDarkSoft, margin: "0 0 16px" }}>
                    {role.body}
                </p>
            )}

            {role.controls && role.controls.length > 0 && (
                <div className="v4-role-controls" aria-label={`Controls for ${role.label}`}>
                    <span className="v4-role-controls__label">Controls</span>
                    {role.controls.map(ctrl => (
                        <span key={ctrl} className="v4-role-control-chip">{ctrl}</span>
                    ))}
                </div>
            )}

            <Link to={role.href} style={{
                display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 10,
                marginTop: isMobile ? 24 : "auto", paddingTop: 20,
                fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 700, color: T.accentLight, textDecoration: "none",
                borderBottom: "1px solid " + T.onDarkFaint,
            }}>
                {role.cta} <span aria-hidden="true">&rarr;</span>
            </Link>
        </div>
    )
}

// What changes, as a full-width grid rather than a tall skinny list.
function RoleLedger({ role, isMobile, animate }: { role: SixViewRole; isMobile: boolean; animate: boolean }) {
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
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? 15 : 16, lineHeight: 1.6, letterSpacing: "-0.005em", color: T.onDark }}>{row}</span>
                </motion.li>
            ))}
        </ul>
    )
}

export function SixViews({ roles, isMobile }: { roles: SixViewRole[]; isMobile: boolean }) {
    const { hash } = useLocation()
    const [active, setActive] = useState(() => {
        if (!hash) return 0
        const targetSlug = hash.replace("#", "").toLowerCase()
        const matchIndex = roles.findIndex(r => r.slug.toLowerCase() === targetSlug)
        return matchIndex >= 0 ? matchIndex : 0
    })

    // Adjust active tab state during render when URL hash changes
    const [prevHash, setPrevHash] = useState(hash)
    if (prevHash !== hash) {
        setPrevHash(hash)
        if (hash) {
            const targetSlug = hash.replace("#", "").toLowerCase()
            const matchIndex = roles.findIndex(r => r.slug.toLowerCase() === targetSlug)
            if (matchIndex >= 0) {
                setActive(matchIndex)
            }
        }
    }

    const reduce = useReducedMotion()
    const railRef = useRef<HTMLDivElement>(null)
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
    const role = roles[active]

    // Roving tabindex: this rail IS a real tablist, so arrow keys move selection.
    const onRailKeyDown = (event: React.KeyboardEvent) => {
        const last = roles.length - 1
        let next: number
        if (event.key === "ArrowRight") next = active === last ? 0 : active + 1
        else if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1
        else if (event.key === "Home") next = 0
        else if (event.key === "End") next = last
        else return
        event.preventDefault()
        setActive(next)
        tabRefs.current[next]?.focus()
    }

    const roleVideo = role.slug === "finance" ? financeVideo : role.slug === "admins" ? adminVideo : null
    const [videoMuted] = useState(true)
    const [showVideo] = useState<Record<string, boolean>>({ finance: true, admins: true })
    const isVideoMode = Boolean(roleVideo && (showVideo[role.slug] ?? true))
    const stageVideoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (stageVideoRef.current) {
            stageVideoRef.current.muted = videoMuted
        }
    }, [videoMuted, active, isVideoMode])

    return (
        <section id="roles" className="v4-sixviews" aria-labelledby="sixviews-title">
            <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: isMobile ? "0 20px" : "0 56px" }}>

                <Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) auto", gap: 24, alignItems: "end", marginBottom: isMobile ? 40 : 64 }}>
                        <div>
                            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.accentLight, marginBottom: 18 }}>
                                Built for each seat
                            </div>
                            <h2 id="sixviews-title" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 4.4vw, 56px)", fontWeight: 700, color: T.onDark, lineHeight: 1.06, letterSpacing: "-0.035em", margin: 0, maxWidth: "22ch" }}>
                                Everyone lands on a dashboard <span style={{ color: T.accentLight, fontStyle: "italic" }}>shaped to their role.</span>
                            </h2>
                        </div>
                        {!isMobile && (
                            <div style={{ textAlign: "right", paddingBottom: 8 }}>
                                <div style={{ fontFamily: "var(--font-sans)", fontSize: 46, fontWeight: 300, letterSpacing: "-0.04em", color: T.onDark, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                                    {String(active + 1).padStart(2, "0")}
                                    <span style={{ color: "rgba(255,246,240,0.32)" }}> / {String(roles.length).padStart(2, "0")}</span>
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
                    {roles.map((r, i) => {
                        const on = i === active
                        return (
                            <button key={r.label} id={r.slug} role="tab" type="button"
                                ref={el => { tabRefs.current[i] = el }}
                                aria-selected={on}
                                aria-controls="role-stage"
                                tabIndex={on ? 0 : -1}
                                onClick={() => setActive(i)}
                                style={{
                                    position: "relative", flex: isMobile ? "0 0 auto" : "1 1 0", minWidth: isMobile ? 132 : 0,
                                    scrollSnapAlign: isMobile ? "start" : undefined,
                                    // The fixed nav is ~90px, so a #finance deep link would
                                    // otherwise land this tab underneath it.
                                    scrollMarginTop: 140,
                                    display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start",
                                    minHeight: 84, padding: isMobile ? "18px 12px" : "22px 20px 22px 0",
                                    border: "none", background: "transparent", cursor: "pointer", textAlign: "left",
                                    fontFamily: "var(--font-sans)", opacity: on ? 1 : 0.66,
                                    transition: "opacity .3s cubic-bezier(.16,1,.3,1), transform .18s cubic-bezier(.16,1,.3,1)",
                                }}
                                onPointerDown={e => { e.currentTarget.style.transform = "translateY(1px)" }}
                                onPointerUp={e => { e.currentTarget.style.transform = "none" }}
                                onPointerLeave={e => { e.currentTarget.style.transform = "none" }}>
                                <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", fontVariantNumeric: "tabular-nums", color: on ? T.accentLight : T.onDarkSoft }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <b style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? 14 : 16.5, fontWeight: 650, letterSpacing: "-0.01em", color: on ? T.onDark : T.onDarkSoft, whiteSpace: "nowrap" }}>
                                    {r.label}
                                </b>
                                {on && (
                                    <motion.span layoutId="v4-role-rail-marker" transition={spring} aria-hidden="true"
                                        style={{ position: "absolute", top: -1, left: 0, right: isMobile ? 0 : 20, height: 2, background: T.accentLight, boxShadow: "0 0 18px rgba(255,138,82,0.55)" }} />
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Stage — asymmetric split. The typographic argument sits on the band
                    itself; only the product preview gets a raised glass surface. */}
                <div id="role-stage" role="tabpanel" aria-labelledby={role.slug} tabIndex={-1}
                    style={{ marginTop: isMobile ? 0 : 56, outline: "none" }}>

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
                                background: "linear-gradient(168deg, rgba(255,246,240,0.085), rgba(255,246,240,0.028))",
                                border: "1px solid rgba(255,246,240,0.12)",
                                borderRadius: 26,
                                padding: isMobile ? "22px 20px 24px" : "26px 28px 30px",
                                boxShadow: "inset 0 1px 0 rgba(255,246,240,0.14), 0 40px 80px -34px rgba(0,0,0,0.6)",
                            }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 16, marginBottom: 20, borderBottom: "1px solid rgba(255,246,240,0.14)" }}>
                                <motion.span aria-hidden="true"
                                    animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
                                    transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ width: 6, height: 6, borderRadius: "50%", background: T.accentLight, flexShrink: 0 }} />
                                <span style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.accentLight }}>
                                    {role.label}
                                </span>
                                
                                <span style={{ marginLeft: "auto", fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.onDarkSoft }}>
                                    {roleVideo ? "Live Preview" : "Scripted Preview"}
                                </span>
                            </div>

                            {/* Stage Visual Viewport */}
                            <div style={{ minHeight: isMobile ? 268 : 232 }}>
                                {roleVideo ? (
                                    <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,246,240,0.15)", background: "#0b0607" }}>
                                        <video
                                            ref={stageVideoRef}
                                            src={roleVideo}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="auto"
                                            style={{ width: "100%", display: "block", borderRadius: 16, maxHeight: 380, objectFit: "cover" }}
                                        />
                                    </div>
                                ) : (
                                    PERSONA_SCRIPTS[role.slug] && (
                                        <PersonaExperience script={PERSONA_SCRIPTS[role.slug]} autoPlay tone="dark" flush />
                                    )
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Band B — what changes, as a full-width grid. */}
                    <div style={{ marginTop: isMobile ? 40 : 64 }}>
                        <RoleLedger role={role} isMobile={isMobile} animate={!reduce} />
                    </div>
                </div>
            </div>
        </section>
    )
}
