import { Link } from "react-router-dom"
import { V2Footer } from "../components/LegalFormKit"
import { EditorialRows, Reveal, V2Nav } from "../components/V2Kit"
import { usePageMeta } from "../hooks/usePageMeta"
import "./HomeV2Light.css"
import "./SubpagesV2.css"
import "./V2AlternatingSections.css"

const capabilities = [
    ["Intent understanding", "Natural-language requests become structured itineraries."],
    ["Autonomous booking decisions", "Optimal options are selected across owned supply."],
    ["Real-time policy enforcement", "Every action is checked against company policy."],
    ["Predictive cost optimization", "Fare and rate intelligence lowers spend."],
    ["Disruption handling", "Rebooking and coordination happen proactively."],
    ["Automated expense reporting", "Capture, coding, and ERP sync require no manual entry."],
    ["AI spend management", "Finance and admins get a clear view of travel spend as it happens."],
]

const guardrails = [
    ["01", "Full audit trail", "Every agent action is recorded and attributable."],
    ["02", "Policy and budget guardrails", "Every agent acts inside the rules and thresholds you set."],
    ["03", "Role-based permissions", "Approvals and access follow each person's responsibilities."],
    ["04", "Human in the loop", "Genuine exceptions pause for human judgment."],
]

const roadmap = [
    ["Launch", "Core AI booking engine, expense module, policy and approval engine, iOS and web."],
    ["Product-market fit", "MICE, deeper ERP and HRIS integrations, rewards, and loyalty."],
    ["Global scale", "MENA, EU, and APAC expansion, corporate card, and white-label support for TMCs."],
]

const integrations = [
    ["Unified travel API", "Booking, policy, and expense through one interface."],
    ["Prebuilt connectors", "ERP, HRIS, GDS, accounting, and payment networks."],
    ["White-label options", "Travel capabilities for TMC and platform partners."],
    ["Developer access", "Documentation and sandbox access for integration teams."],
]

export default function TechnologyV2() {
    usePageMeta(
        "AI & Technology | Miraee",
        "Explore Miraee's multi agent AI system for agentic travel, automated expense reporting, policy enforcement, governance and travel management software integrations.",
    )

    return (
        <div className="m-site">
            <a className="m-skip" href="#main">Skip to content</a>
            <V2Nav active="/technology" />
            <main id="main">
                <section className="m-hero m-section--light" aria-labelledby="technology-hero-title">
                    <Reveal className="m-hero__copy">
                        <p className="m-eyebrow">AI &amp; TECHNOLOGY</p>
                        <h1 id="technology-hero-title">The intelligence engine beneath every trip.</h1>
                        <p className="m-lede">Miraee is AI-native by design: a coordinated multi agent AI system sitting on owned global supply. It turns “I need to travel” into a booked, compliant, reconciled, and measured outcome.</p>
                        <div className="m-actions"><Link to="/book-a-demo">Book a technical demo <span aria-hidden="true">↗</span></Link><a href="#agentic-ai">See how it works <span aria-hidden="true">↓</span></a></div>
                    </Reveal>
                </section>

                <section id="agentic-ai" className="m-section" aria-labelledby="agentic-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">WHAT IS AGENTIC AI?</p>
                        <h2 id="agentic-title">From assistants to agents.</h2>
                        <p>Most AI travel products suggest while you execute. Miraee takes action end to end - agentic AI travel, not an assistant with a travel skin.</p>
                    </Reveal>
                    <Reveal className="m-tech-contrast">
                        <div><span>ASSISTANT AI</span><h3>Answers, drafts, waits.</h3><p>It presents options and leaves execution to the traveler.</p></div>
                        <div><span>AGENTIC AI · MIRAEE</span><h3>Plans, books, reconciles.</h3><p>It interprets intent, enforces policy, handles disruptions, and escalates only when judgment is needed.</p></div>
                    </Reveal>
                </section>

                <section className="m-section m-tint-band" aria-labelledby="capabilities-title">
                    <Reveal className="m-section__head"><p className="m-eyebrow">AI CAPABILITIES</p><h2 id="capabilities-title">What the agents actually do.</h2></Reveal>
                    <Reveal><EditorialRows caption="Miraee AI capabilities" headers={["Capability", "What it does"]} rows={capabilities} columns={2} /></Reveal>
                </section>

                <section className="m-section" aria-labelledby="learning-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">LEARNING &amp; ADAPTATION</p>
                        <h2 id="learning-title">It gets smarter with every trip.</h2>
                        <p>Miraee learns from past preferences, patterns, and outcomes to deliver increasingly personalized recommendations and sharper optimization over time - continuous learning that compounds across your organization, not a static rules engine.</p>
                    </Reveal>
                </section>

                <section className="m-iconband m-section--dark" aria-labelledby="governance-title">
                    <div className="m-iconband__head"><Reveal><p className="m-eyebrow">SAFETY &amp; GOVERNANCE</p><h2 id="governance-title">Autonomy with guardrails.</h2><p>Every action is bounded by policy, budget, and permissions, then recorded in a complete audit trail. This is AI governance for travel, not a compliance afterthought.</p></Reveal></div>
                    <Reveal><div className="m-iconband__grid">{guardrails.map(([num, title, body]) => <div className="m-iconband__item" key={title}><span className="m-iconband__num">{num}</span><h3>{title}</h3><p>{body}</p></div>)}</div></Reveal>
                </section>

                <section className="m-section" aria-labelledby="roadmap-title">
                    <Reveal className="m-section__head"><p className="m-eyebrow">FUTURE ROADMAP</p><h2 id="roadmap-title">Where the engine is going.</h2><p>A phased view from the core platform to deeper integrations and global scale.</p></Reveal>
                    <Reveal><div className="m-flow">{roadmap.map(([title, body]) => <div className="m-flow__step" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></Reveal>
                </section>

                <section className="m-section m-tint-band" aria-labelledby="developer-title">
                    <Reveal className="m-section__head"><p className="m-eyebrow">DEVELOPERS &amp; INTEGRATIONS</p><h2 id="developer-title">Build on the travel operating system.</h2><p>Miraee exposes a unified travel API and connector library so partners can put travel intelligence inside their own systems - true travel management software integrations, not one-off connectors.</p></Reveal>
                    <Reveal><EditorialRows caption="Developer and integration capabilities" headers={["Capability", "Detail"]} rows={integrations} columns={2} /></Reveal>
                    <Reveal className="m-section-action"><Link to="/book-a-demo">Talk to our integration team <span aria-hidden="true">↗</span></Link></Reveal>
                </section>

                <section className="m-cta">
                    <Reveal>
                        <p className="m-eyebrow">SEE THE AGENT IN ACTION</p>
                        <h2>Bring a real trip.</h2>
                        <p>Twenty minutes. Your route, your policy, your edge cases. We'll run it live.</p>
                        <Link to="/book-a-demo">Book your demo <span aria-hidden="true">↗</span></Link>
                    </Reveal>
                </section>
            </main>
            <V2Footer />
        </div>
    )
}
