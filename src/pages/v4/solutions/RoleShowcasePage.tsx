import { useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { V4Page, Reveal } from "../../../components/V4Kit"
import PersonaExperience, { PERSONA_SCRIPTS } from "../../../components/PersonaExperience"
import RoleVideoShowcase from "./RoleVideoShowcase"
import "../../SubpagesV2.css"
import "../V4.css"

export type RoleDetail = { icon?: ReactNode; title: string; body: string }

interface RoleShowcaseProps {
    roleSlug: string
    roleTitle: string
    shift: string
    body: string
    controls: string[]
    ctaText?: string
    before?: string
    afterHeading?: string
    videoSrc?: string
    detailsHeading?: string
    details?: RoleDetail[]
}

function splitShift(shift: string): [string, string] {
    const i = shift.indexOf("Now ")
    if (i < 0) return [shift, ""]
    return [shift.slice(0, i).trim(), shift.slice(i).trim()]
}

export default function RoleShowcasePage({
    roleSlug,
    roleTitle,
    shift,
    body,
    controls,
    ctaText,
    before: beforeOverride,
    afterHeading,
    videoSrc,
    detailsHeading,
    details,
}: RoleShowcaseProps) {
    const [splitBefore, splitAfter] = splitShift(shift)
    const before = beforeOverride ?? splitBefore
    const after = afterHeading ?? splitAfter
    const script = PERSONA_SCRIPTS[roleSlug]
    const [viewShift, setViewShift] = useState<"miraee" | "before">("miraee")

    return (
        <V4Page
            title={`${roleTitle} | Solutions | Miraee`}
            description={`Everyone lands on a dashboard shaped to their role. ${shift}`}>

            <section className="v4-section v4-navan-hero-section">
                <div className="v4-shell">
                    {/* Unified 2-Column Hero: Story on Left, Looping Product Canvas on Right */}
                    <div className="v4-navan-hero-grid">
                        {/* Left Column: Narrative, Transformation Switcher, Controls */}
                        <div className="v4-navan-hero-content">
                            <Reveal>
                                <div className="v4-navan-eyebrow">
                                    <span>Built for each seat &bull; {roleTitle}</span>
                                </div>
                                <h1 className="v4-navan-headline">{after || roleTitle}</h1>
                                <p className="v4-navan-lede">{body}</p>

                                {/* Interactive Shift Switcher (Before vs With Miraee) */}
                                <div className="v4-navan-shift-box">
                                    <div className="v4-navan-shift-nav" role="tablist" aria-label="Transformation comparison">
                                        <button
                                            type="button"
                                            role="tab"
                                            aria-selected={viewShift === "miraee"}
                                            className={`v4-navan-tab-trigger ${viewShift === "miraee" ? "active" : ""}`}
                                            onClick={() => setViewShift("miraee")}
                                        >
                                            With Miraee
                                        </button>
                                        <button
                                            type="button"
                                            role="tab"
                                            aria-selected={viewShift === "before"}
                                            className={`v4-navan-tab-trigger ${viewShift === "before" ? "active" : ""}`}
                                            onClick={() => setViewShift("before")}
                                        >
                                            The Old Way
                                        </button>
                                    </div>

                                    <div className="v4-navan-shift-panel">
                                        <AnimatePresence mode="wait">
                                            {viewShift === "miraee" ? (
                                                <motion.div
                                                    key="miraee"
                                                    initial={{ opacity: 0, y: 6 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -6 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="v4-navan-panel-label text-orange">Modern Operating Model</div>
                                                    <p className="v4-navan-panel-text">{shift || after}</p>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="before"
                                                    initial={{ opacity: 0, y: 6 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -6 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="v4-navan-panel-label text-muted">Manual Friction</div>
                                                    <p className="v4-navan-panel-text text-muted">{before}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Capabilities Chips */}
                                {controls && controls.length > 0 && (
                                    <div className="v4-navan-controls">
                                        <span className="v4-navan-controls-label">Key Capabilities</span>
                                        <div className="v4-navan-chips">
                                            {controls.map((ctrl) => (
                                                <span key={ctrl} className="v4-navan-chip">
                                                    {ctrl}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="v4-navan-hero-cta">
                                    <a href="/v4/resources/calculator" className="v4-btn v4-btn--solid">
                                        {ctaText || "Request a live demo"}
                                    </a>
                                </div>
                            </Reveal>
                        </div>

                        {/* Right Column: Clean Looping Video or Scripted Preview */}
                        <div className="v4-navan-hero-stage">
                            <Reveal delay={0.12}>
                                {videoSrc ? (
                                    <RoleVideoShowcase videoSrc={videoSrc} title={roleTitle} />
                                ) : script ? (
                                    <div className="v4-navan-script-frame">
                                        <div className="v4-navan-script-bar">
                                            <div className="v4-navan-bar-dots">
                                                <span /><span /><span />
                                            </div>
                                            <span className="v4-navan-bar-title">{roleTitle} Console Preview</span>
                                        </div>
                                        <div className="v4-navan-script-body">
                                            <PersonaExperience script={script} tone="light" autoPlay />
                                        </div>
                                    </div>
                                ) : null}
                            </Reveal>
                        </div>
                    </div>

                    {/* Section 2: The 3 Core Pillars (Navan 3-Column Bento Cards) */}
                    {details && details.length > 0 && (
                        <div className="v4-navan-pillars-wrap">
                            {detailsHeading && (
                                <Reveal>
                                    <div className="v4-navan-pillars-header">
                                        <span className="v4-navan-eyebrow">Operating Model</span>
                                        <h2 className="v4-navan-pillars-title">{detailsHeading}</h2>
                                    </div>
                                </Reveal>
                            )}
                            <div className="v4-navan-pillars-grid">
                                {details.map((d, i) => (
                                    <Reveal className="v4-navan-pillar-card" key={d.title} delay={i * 0.08}>
                                        <span className="v4-navan-pillar-num">0{i + 1}</span>
                                        <h3 className="v4-navan-pillar-heading">{d.title}</h3>
                                        <p className="v4-navan-pillar-desc">{d.body}</p>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </V4Page>
    )
}
