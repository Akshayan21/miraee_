import UseCasePageTemplate from "./UseCasePageTemplate"

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

export default function ExecutiveTravelPage() {
    return (
        <UseCasePageTemplate
            slug="executive-travel"
            title="Executive Travel"
            perks="White-glove trips. Preferences remembered. A human on call."
            benefits={[
                "Agent learns preferences over time.",
                "Named human support.",
                "Traveler profile kept separate from account login.",
                "Trips routed with full context.",
            ]}
            persona="Executives and their assistants."
            bestFor="Any size with a leadership team that travels, scales with seniority, not headcount."
            accentTag="White-Glove Service"
            simulation={<ExecutiveTravelSimulation />}
        />
    )
}
