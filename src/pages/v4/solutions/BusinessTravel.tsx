import UseCasePageTemplate from "./UseCasePageTemplate"

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

export default function BusinessTravelPage() {
    return (
        <UseCasePageTemplate
            slug="business-travel"
            title="Business Travel"
            perks="Everyday trips. Described and booked easily. Policy compliant."
            benefits={[
                "Per diem rules apply at search.",
                "Overview of total trips and spend.",
                "Savings rate and rewards.",
                "Autonomous expense reconciliation.",
            ]}
            persona="Any employee of the company."
            bestFor="Startups to enterprise, anyone with recurring travel."
            accentTag="Everyday Trips"
            simulation={<BusinessTravelSimulation />}
        />
    )
}
