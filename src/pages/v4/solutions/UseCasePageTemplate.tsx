import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { V4Page, Reveal } from "../../../components/V4Kit"
import "./UseCasesShowcase.css"
import "../V4.css"

export interface UseCaseConfig {
    slug: string
    title: string
    perks: string
    benefits: string[]
    persona: string
    bestFor?: string
    accentTag: string
    simulation: React.ReactNode
}

const ALL_USE_CASES = [
    { slug: "business-travel", title: "Business Travel", path: "/v4/solutions/business-travel" },
    { slug: "meetings-events", title: "Meetings & Events", path: "/v4/solutions/meetings-events" },
    { slug: "executive-travel", title: "Executive Travel", path: "/v4/solutions/executive-travel" },
    { slug: "global-mobility", title: "Global Mobility", path: "/v4/solutions/global-mobility" },
    { slug: "emergency-disruption", title: "Emergency & Disruption", path: "/v4/solutions/emergency-disruption" },
]

export default function UseCasePageTemplate({
    slug,
    title,
    perks,
    benefits,
    persona,
    bestFor,
    accentTag,
    simulation,
}: UseCaseConfig) {
    const otherCases = ALL_USE_CASES.filter((item) => item.slug !== slug)

    return (
        <V4Page
            title={`${title} | Use Cases | Miraee`}
            description={`${perks} Every kind of trip your company takes. All at one platform, one ledger, one policy engine.`}>

            {/* Tight header with exact same styling as RoleShowcasePage to eliminate excess gap */}
            <section className="v4-section" style={{ paddingTop: "clamp(90px, 10vw, 112px)", paddingBottom: "clamp(64px, 8vw, 100px)" }}>
                <div className="v4-shell">
                    <header className="v4-role-header-content">
                        <Reveal>
                            <span className="v4-role-eyebrow">BY USE CASE</span>
                            <h1 className="v4-role-title">{title}</h1>
                            <p className="v4-role-lede">
                                Every kind of trip your company takes. All at one platform, one ledger, one policy engine.
                            </p>
                        </Reveal>
                    </header>

                    {/* Creative Animated Showcase Card */}
                    <div className="v4-uc-stage" style={{ marginTop: 24 }}>
                        {/* Left Column: Context, Perks, Benefits & Metadata */}
                        <div className="v4-uc-stage-content">
                            <div className="v4-uc-meta-top">
                                <span className="v4-uc-badge">BY USE CASE</span>
                                <span className="v4-uc-tag">{accentTag}</span>
                            </div>

                            <h2 className="v4-uc-title" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}>
                                {title}
                            </h2>

                            {/* Perks Highlight Quote Box */}
                            <div className="v4-uc-perks-box">
                                <div className="v4-uc-perks-label">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                    </svg>
                                    <span>Perks</span>
                                </div>
                                <p className="v4-uc-perks-text">{perks}</p>
                            </div>

                            {/* Miraee Benefits Section */}
                            <div className="v4-uc-benefits-wrap">
                                <h3 className="v4-uc-section-label">Miraee benefits</h3>
                                <ul className="v4-uc-benefits-list">
                                    {benefits.map((benefit, i) => (
                                        <motion.li
                                            key={benefit}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.06 + 0.1, duration: 0.25 }}>
                                            <span className="v4-uc-check-icon">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </span>
                                            <span>{benefit}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* Metadata Grid: Persona Specific & Best For */}
                            <div className="v4-uc-meta-grid">
                                <div className="v4-uc-meta-card">
                                    <div className="v4-uc-meta-card-label">Persona specific</div>
                                    <div className="v4-uc-meta-card-value">{persona}</div>
                                </div>
                                {bestFor && (
                                    <div className="v4-uc-meta-card">
                                        <div className="v4-uc-meta-card-label">Best for</div>
                                        <div className="v4-uc-meta-card-value">{bestFor}</div>
                                    </div>
                                )}
                            </div>

                            {/* Action CTA */}
                            <div style={{ marginTop: 28 }}>
                                <Link to="/book-demo" className="v4-btn v4-btn--solid">
                                    Book a demo for {title}
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Live Simulated UI Console */}
                        <div className="v4-uc-stage-preview">
                            <div className="v4-uc-sim-screen">
                                <div className="v4-uc-sim-header">
                                    <div className="v4-uc-sim-dots">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <span className="v4-uc-sim-title">
                                        {title.toUpperCase()} SIMULATION
                                    </span>
                                    <span className="v4-uc-sim-status">
                                        <span className="v4-uc-live-dot" /> LIVE
                                    </span>
                                </div>

                                <div className="v4-uc-sim-body">
                                    {simulation}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick navigation to other use cases */}
                    <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--m-line)" }}>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--m-muted)", marginBottom: 16 }}>
                            Explore other use cases
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                            {otherCases.map((item) => (
                                <Link
                                    key={item.slug}
                                    to={item.path}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "12px 16px",
                                        borderRadius: 12,
                                        background: "var(--m-surface)",
                                        border: "1px solid var(--m-line)",
                                        textDecoration: "none",
                                        color: "var(--m-maroon)",
                                        fontWeight: 700,
                                        fontSize: "0.92rem",
                                        transition: "border-color 0.2s ease, transform 0.2s ease",
                                    }}>
                                    <span>{item.title}</span>
                                    <span style={{ color: "var(--m-orange)" }}>→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </V4Page>
    )
}
