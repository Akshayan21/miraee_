import { V4Page, Reveal } from "../../components/V4Kit"
import "../SubpagesV2.css"
import "./V4.css"

// Dedicated AI Assistant for Every Employee Page
// Exact design matching the Architecture section (second reference image):
// Eyebrow: The architecture
// Heading: Not one agent. A workforce.
// Body: Six different specialized agents each running their own allotted task, under the same thread. Beneath them sits Tabhi intelligence connecting Mondee supply, policy, payment and expense all together woven into one framework, dedicatedly working to complete one single trip.
// Chips: Booking agent · Policy agent · Negotiation agent · Rebooking agent · Expense agent · Support agent
// Note: 6 | Two layers, one system.

const AGENTS = [
    "Booking agent",
    "Policy agent",
    "Negotiation agent",
    "Rebooking agent",
    "Expense agent",
    "Support agent",
]

export default function V4AiAssistant() {
    return (
        <V4Page
            title="AI Assistant for Every Employee | The Architecture | Miraee"
            description="Six different specialized agents each running their own allotted task, under the same thread. Beneath them sits Tabhi intelligence.">

            <section
                className="v4-section"
                id="architecture"
                aria-labelledby="architecture-title"
                style={{ paddingTop: "clamp(130px, 16vw, 180px)", paddingBottom: "clamp(64px, 8vw, 110px)" }}>
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">The architecture</span>
                        <h2 className="v4-h2" id="architecture-title">Not one agent. A workforce.</h2>
                        <p className="v4-lede">
                            Six different specialized agents each running their own allotted task, under the same thread. Beneath them sits Tabhi intelligence connecting Mondee supply, policy, payment and expense all together woven into one framework, dedicatedly working to complete one single trip.
                        </p>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <ul className="v4-chips" style={{ marginTop: 30 }}>
                            {AGENTS.map((agent) => (
                                <li key={agent}>{agent}</li>
                            ))}
                        </ul>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <div className="v4-note" style={{ marginTop: 28 }}>
                            <b>6</b>
                            <div>
                                <h3>Two layers, one system.</h3>
                                <p>
                                    An agent is a bounded, permissioned worker with one job, its own tools, and a written limit on what it may do alone. Competitors bolt AI onto a booking tool; here the intelligence and the supply were built together.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </V4Page>
    )
}
