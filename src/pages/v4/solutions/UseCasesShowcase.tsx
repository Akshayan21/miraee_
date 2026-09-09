import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal } from "../../../components/V4Kit"
import "./UseCasesShowcase.css"

interface UseCaseItem {
    id: string
    number: string
    title: string
    perks: string
    benefits: string[]
    persona: string
    bestFor?: string
    accentTag: string
}

const USE_CASES_DATA: UseCaseItem[] = [
    {
        id: "use-business",
        number: "01",
        title: "Business Travel",
        perks: "Everyday trips. Described and booked easily. Policy compliant.",
        benefits: [
            "Per diem rules apply at search.",
            "Overview of total trips and spend.",
            "Savings rate and rewards.",
            "Autonomous expense reconciliation.",
        ],
        persona: "Any employee of the company.",
        bestFor: "Startups to enterprise, anyone with recurring travel.",
        accentTag: "Everyday Trips",
    },
    {
        id: "use-events",
        number: "02",
        title: "Meetings & Events",
        perks: "Group trips, one plan. Venues and attendees together. Costs stay in view.",
        benefits: [
            "MICE and group booking built in.",
            "Venue sourcing and attendee management on the same platform.",
            "Group spend rolls into the same budgets, compliance and audit trail.",
        ],
        persona: "Event organisers or Managers.",
        bestFor: "Mid-market to enterprise running regular offsites, summits or client events.",
        accentTag: "Group Coordination",
    },
    {
        id: "use-executive",
        number: "03",
        title: "Executive Travel",
        perks: "White-glove trips. Preferences remembered. A human on call.",
        benefits: [
            "Agent learns preferences over time.",
            "Named human support.",
            "Traveler profile kept separate from account login.",
            "Trips routed with full context.",
        ],
        persona: "Executives and their assistants.",
        bestFor: "Any size with a leadership team that travels, scales with seniority, not headcount.",
        accentTag: "White-Glove Service",
    },
    {
        id: "use-mobility",
        number: "04",
        title: "Global Mobility",
        perks: "Cross-border trips. Local rules handled. Distributed teams covered.",
        benefits: [
            "Entity-level policy, currency and data residency per office.",
            "Grade-based rules inherit across entities.",
            "HRIS keeps cost centres and managers current.",
        ],
        persona: "Global teams, HR and admins.",
        bestFor: "Multi-entity companies with offices in more than one country.",
        accentTag: "Cross-Border Entity",
    },
    {
        id: "use-disruption",
        number: "05",
        title: "Emergency & Disruption",
        perks: "Fast rebooking. Travelers located. One thread for the response.",
        benefits: [
            "Proactive rebooking.",
            "Live traveler location on the map.",
            "Duty of care from the same console.",
            "Everyone affected is seen in context.",
        ],
        persona: "Travel leads, admins and CHROs.",
        accentTag: "Duty of Care",
    },
]

const spring = { type: "spring" as const, stiffness: 450, damping: 36 }

export default function UseCasesShowcase() {
    const [activeIndex, setActiveIndex] = useState(0)

    // Listen to hash changes (e.g. /v4/solutions#use-events)
    useEffect(() => {
        const updateFromHash = () => {
            const hash = window.location.hash.replace("#", "")
            if (!hash) return
            const idx = USE_CASES_DATA.findIndex((item) => item.id === hash)
            if (idx >= 0) {
                setActiveIndex(idx)
            }
        }
        updateFromHash()
        window.addEventListener("hashchange", updateFromHash)
        return () => window.removeEventListener("hashchange", updateFromHash)
    }, [])

    const handleSelect = (idx: number, id: string) => {
        setActiveIndex(idx)
        window.history.replaceState(null, "", `#${id}`)
    }

    const current = USE_CASES_DATA[activeIndex]

    return (
        <section className="v4-section v4-section--tint v4-uc-section" id="use-cases" aria-labelledby="use-cases-title">
            <div className="v4-shell">
                <Reveal>
                    <div className="v4-uc-header">
                        <span className="v4-eyebrow">BY USE CASE</span>
                        <h2 className="v4-h2" id="use-cases-title">Every kind of company travel.</h2>
                        <p className="v4-lede">
                            Every kind of trip your company takes. All at one platform, one ledger, one policy engine.
                        </p>
                    </div>
                </Reveal>

                {/* Creative Navigation Rail */}
                <Reveal delay={0.1}>
                    <div className="v4-uc-nav" role="tablist" aria-label="Use cases">
                        {USE_CASES_DATA.map((item, idx) => {
                            const isActive = idx === activeIndex
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`v4-uc-tab ${isActive ? "v4-uc-tab--active" : ""}`}
                                    onClick={() => handleSelect(idx, item.id)}>
                                    {isActive && (
                                        <motion.div
                                            layoutId="v4-uc-active-pill"
                                            className="v4-uc-tab-bg"
                                            transition={spring}
                                        />
                                    )}
                                    <span className="v4-uc-tab-num">{item.number}</span>
                                    <span className="v4-uc-tab-title">{item.title}</span>
                                </button>
                            )
                        })}
                    </div>
                </Reveal>

                {/* Animated Interactive Stage */}
                <div className="v4-uc-stage-wrapper">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, y: 16, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -16, scale: 0.99 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="v4-uc-stage">

                            {/* Left Column: Context, Perks, Benefits & Metadata */}
                            <div className="v4-uc-stage-content">
                                <div className="v4-uc-meta-top">
                                    <span className="v4-uc-badge">{current.number} / USE CASE</span>
                                    <span className="v4-uc-tag">{current.accentTag}</span>
                                </div>

                                <h3 className="v4-uc-title">{current.title}</h3>

                                {/* Perks Quote Box */}
                                <div className="v4-uc-perks-box">
                                    <div className="v4-uc-perks-label">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                        </svg>
                                        <span>Perks</span>
                                    </div>
                                    <p className="v4-uc-perks-text">{current.perks}</p>
                                </div>

                                {/* Miraee Benefits Section */}
                                <div className="v4-uc-benefits-wrap">
                                    <h4 className="v4-uc-section-label">Miraee benefits</h4>
                                    <ul className="v4-uc-benefits-list">
                                        {current.benefits.map((benefit, i) => (
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

                                {/* Bottom Metadata: Persona Specific & Best For */}
                                <div className="v4-uc-meta-grid">
                                    <div className="v4-uc-meta-card">
                                        <div className="v4-uc-meta-card-label">Persona specific</div>
                                        <div className="v4-uc-meta-card-value">{current.persona}</div>
                                    </div>
                                    {current.bestFor && (
                                        <div className="v4-uc-meta-card">
                                            <div className="v4-uc-meta-card-label">Best for</div>
                                            <div className="v4-uc-meta-card-value">{current.bestFor}</div>
                                        </div>
                                    )}
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
                                            {current.title.toUpperCase()} SIMULATION
                                        </span>
                                        <span className="v4-uc-sim-status">
                                            <span className="v4-uc-live-dot" /> LIVE
                                        </span>
                                    </div>

                                    <div className="v4-uc-sim-body">
                                        {activeIndex === 0 && <BusinessTravelSimulation />}
                                        {activeIndex === 1 && <MeetingsEventsSimulation />}
                                        {activeIndex === 2 && <ExecutiveTravelSimulation />}
                                        {activeIndex === 3 && <GlobalMobilitySimulation />}
                                        {activeIndex === 4 && <EmergencyDisruptionSimulation />}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Quick Cards Grid: 5 Scannable Tiles */}
                <div className="v4-uc-quick-grid" style={{ marginTop: 36 }}>
                    {USE_CASES_DATA.map((item, idx) => {
                        const isActive = idx === activeIndex
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleSelect(idx, item.id)}
                                className={`v4-uc-mini-card ${isActive ? "v4-uc-mini-card--active" : ""}`}>
                                <div className="v4-uc-mini-card-head">
                                    <span className="v4-uc-mini-num">{item.number}</span>
                                    <span className="v4-uc-mini-title">{item.title}</span>
                                </div>
                                <p className="v4-uc-mini-perk">{item.perks}</p>
                            </button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

/* ──────────────────────────────────────────────────────────────────────────
   Simulated Interactive Displays for each Use Case
   ────────────────────────────────────────────────────────────────────────── */

function BusinessTravelSimulation() {
    return (
        <div className="v4-sim-content">
            <div className="v4-sim-prompt-box">
                <span className="v4-sim-prompt-label">Traveler Prompt</span>
                <p className="v4-sim-prompt-text">
                    "Book SF meeting trip next Tuesday to Thursday. Preferred hotel near Market St, within per diem."
                </p>
            </div>

            <div className="v4-sim-checklist">
                <div className="v4-sim-check-row">
                    <span className="v4-sim-badge v4-sim-badge--success">✓ IN-POLICY</span>
                    <span>Direct flight matched ($380 vs $450 policy cap)</span>
                </div>
                <div className="v4-sim-check-row">
                    <span className="v4-sim-badge v4-sim-badge--success">✓ PER DIEM</span>
                    <span>Market St Hotel @ $210/night ($240 per diem applied)</span>
                </div>
                <div className="v4-sim-check-row">
                    <span className="v4-sim-badge v4-sim-badge--orange">✓ AUTONOMOUS EXPENSE</span>
                    <span>Receipt coded to Marketing / Travel Ledger instantly</span>
                </div>
            </div>

            <div className="v4-sim-metric-row">
                <div className="v4-sim-stat">
                    <b>$142</b>
                    <span>Policy Savings</span>
                </div>
                <div className="v4-sim-stat">
                    <b>0 min</b>
                    <span>Expense Forms</span>
                </div>
                <div className="v4-sim-stat">
                    <b>+240</b>
                    <span>Reward Pts</span>
                </div>
            </div>
        </div>
    )
}

function MeetingsEventsSimulation() {
    return (
        <div className="v4-sim-content">
            <div className="v4-sim-event-card">
                <div className="v4-sim-event-top">
                    <div>
                        <span className="v4-sim-badge v4-sim-badge--orange">MICE & GROUP</span>
                        <h5 className="v4-sim-event-name">Annual Sales Kickoff 2026</h5>
                    </div>
                    <span className="v4-sim-roster-pill">32 Attendees</span>
                </div>
                <div className="v4-sim-event-venue">
                    Venue: <strong>Fairmont San Jose & Grand Ballroom</strong>
                </div>
            </div>

            <div className="v4-sim-progress-box">
                <div className="v4-sim-progress-head">
                    <span>Master Group Budget</span>
                    <b>$34,800 / $42,000</b>
                </div>
                <div className="v4-sim-progress-bar">
                    <div className="v4-sim-progress-fill" style={{ width: "82%" }} />
                </div>
            </div>

            <div className="v4-sim-checklist">
                <div className="v4-sim-check-row">
                    <span className="v4-sim-badge v4-sim-badge--success">✓ SYNCED</span>
                    <span>Arrivals aligned: 32 flights landing 2:00 PM, 4:30 PM</span>
                </div>
                <div className="v4-sim-check-row">
                    <span className="v4-sim-badge v4-sim-badge--success">✓ ONE LEDGER</span>
                    <span>Single group invoice with attendee cost-center breakdown</span>
                </div>
            </div>
        </div>
    )
}

function ExecutiveTravelSimulation() {
    return (
        <div className="v4-sim-content">
            <div className="v4-sim-exec-card">
                <div className="v4-sim-exec-head">
                    <div className="v4-sim-avatar">EV</div>
                    <div>
                        <h5 className="v4-sim-exec-name">Elena Vance · Executive Profile</h5>
                        <span className="v4-sim-exec-sub">VP Product & Partnerships</span>
                    </div>
                    <span className="v4-sim-badge v4-sim-badge--orange">PRIORITY VIP</span>
                </div>

                <div className="v4-sim-pref-chips">
                    <span>Window Seat 1A/2A</span>
                    <span>High Floor (Quiet)</span>
                    <span>Airport Transfer</span>
                    <span>No Layover</span>
                </div>
            </div>

            <div className="v4-sim-support-box">
                <div className="v4-sim-support-agent">
                    <span className="v4-sim-support-dot" />
                    <strong>Dedicated Concierge:</strong> Marcus Thorne (Online)
                </div>
                <p className="v4-sim-support-note">
                    "Flight BA178 gate moved to A12. Ground chauffeur is parked at Terminal 5 door 3."
                </p>
            </div>

            <div className="v4-sim-check-row">
                <span className="v4-sim-badge v4-sim-badge--success">✓ SEGREGATED</span>
                <span>Traveler personal profile isolated from admin login</span>
            </div>
        </div>
    )
}

function GlobalMobilitySimulation() {
    return (
        <div className="v4-sim-content">
            <div className="v4-sim-entity-grid">
                <div className="v4-sim-entity-item v4-sim-entity-item--active">
                    <span className="v4-sim-flag">🇬🇧 UK HQ</span>
                    <b>£220/day Per Diem</b>
                    <span>GBP / HMRC Rules</span>
                </div>
                <div className="v4-sim-entity-item">
                    <span className="v4-sim-flag">🇩🇪 Berlin Hub</span>
                    <b>€195/day Per Diem</b>
                    <span>EUR / Statutory</span>
                </div>
                <div className="v4-sim-entity-item">
                    <span className="v4-sim-flag">🇺🇸 US Operations</span>
                    <b>$260/day Per Diem</b>
                    <span>USD / GSA Tier 1</span>
                </div>
            </div>

            <div className="v4-sim-checklist" style={{ marginTop: 16 }}>
                <div className="v4-sim-check-row">
                    <span className="v4-sim-badge v4-sim-badge--success">✓ RESIDENCY</span>
                    <span>EU tenant data residency locked in Frankfurt region</span>
                </div>
                <div className="v4-sim-check-row">
                    <span className="v4-sim-badge v4-sim-badge--success">✓ HRIS LIVE</span>
                    <span>Cost centres & employee grades inherited across entities</span>
                </div>
            </div>
        </div>
    )
}

function EmergencyDisruptionSimulation() {
    return (
        <div className="v4-sim-content">
            <div className="v4-sim-alert-box">
                <div className="v4-sim-alert-head">
                    <span className="v4-sim-alert-pulse">⚠️ ALERT</span>
                    <strong>Storm Disruption · Chicago (ORD)</strong>
                </div>
                <p className="v4-sim-alert-msg">
                    Severe weather incoming. 18 flights delayed. 3 employees scheduled to depart.
                </p>
            </div>

            <div className="v4-sim-tracker">
                <div className="v4-sim-tracker-head">
                    <span>Active Travelers in Context</span>
                    <span className="v4-sim-badge v4-sim-badge--success">3 Located</span>
                </div>
                <div className="v4-sim-traveler-row">
                    <span>D. Miller (ORD → SFO)</span>
                    <strong style={{ color: "var(--m-orange)" }}>Auto-rebooked to 6:20 PM</strong>
                </div>
                <div className="v4-sim-traveler-row">
                    <span>S. Chen & R. Gomez</span>
                    <span style={{ color: "var(--m-maroon)" }}>Checked into safe airport lounge</span>
                </div>
            </div>

            <div className="v4-sim-check-row" style={{ marginTop: 12 }}>
                <span className="v4-sim-badge v4-sim-badge--orange">✓ ONE THREAD</span>
                <span>Travel lead, admin & traveler synchronized on live console</span>
            </div>
        </div>
    )
}
