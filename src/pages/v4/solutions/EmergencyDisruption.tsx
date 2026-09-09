import UseCasePageTemplate from "./UseCasePageTemplate"

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

export default function EmergencyDisruptionPage() {
    return (
        <UseCasePageTemplate
            slug="emergency-disruption"
            title="Emergency & Disruption"
            perks="Fast rebooking. Travelers located. One thread for the response."
            benefits={[
                "Proactive rebooking.",
                "Live traveler location on the map.",
                "Duty of care from the same console.",
                "Everyone affected is seen in context.",
            ]}
            persona="Travel leads, admins and CHROs."
            accentTag="Duty of Care"
            simulation={<EmergencyDisruptionSimulation />}
        />
    )
}
