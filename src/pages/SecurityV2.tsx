import { useEffect } from "react"
import { V2Footer } from "../components/LegalFormKit"
import { Reveal, V2Nav, Faq } from "../components/V2Kit"
import "./HomeV2Light.css"
import "./SubpagesV2.css"
import "./V2AlternatingSections.css"

const SECURITY_EMAIL = "mailto:hello@miraee.ai?subject=Security%20package%20request"

const mayDoWithoutAsking = [
    ["Search inventory and assemble an itinerary", "Always permitted", "Fixed control"],
    ["Book a trip that is fully within policy", "Permitted", "Can require approval on any dimension"],
    ["Rebook a disrupted trip within the original fare band", "Permitted", "Ceiling set by you"],
    ["Rebook above the original cost", "Requires approval", "Threshold set by you"],
    ["Code and post an expense to the ERP", "Permitted", "Can require sign-off before posting"],
    ["Book out of policy", "Never permitted without approval", "Approver set by you"],
    ["Issue a virtual card for a booking", "Permitted within trip value", "Limits set by you"],
]

const neverDo = [
    "Move money outside the payment rails you have pre-authorised",
    "Change a policy rule, an approval chain or a spend limit",
    "Book with a supplier you have excluded",
    "Use company funds for a personal trip, or personal funds for a company trip",
    "Access or act on traveler personal data beyond the scope of the trip in hand",
    "Delete, alter or suppress an audit record",
    "Take an action it cannot log, attribute and explain",
]

const humanSits = [
    ["Setting policy and limits", "You. Always. No agent may write a rule."],
    ["Routine in-policy booking", "The agent, inside your limits."],
    ["Anything out of policy", "A named human approver you designate."],
    ["Disruption inside the fare band", "The agent, with notification."],
    ["Disruption above the fare band", "A human, with the agent's recommendation attached."],
    ["Escalation to a person", "The traveler, at any point, with full context carried over."],
]

const trustLayers = [
    ["01", "Identity", "SSO / SCIM", "People and agents get only the access their role requires."],
    ["02", "Policy", "Configurable", "Every action is checked against your rules before execution."],
    ["03", "Approval", "Human when needed", "Thresholds route exceptions to the right decision-maker."],
    ["04", "Evidence", "Always logged", "Actor, rule, time and cost are recorded for every action."],
]

const faqs: [string, string][] = [
    ["Where is our data stored?", "Miraee stores and processes customer data in the region you select at contract: United States, European Union or India. Data does not leave the selected region except where a booking must be transmitted to a supplier to be fulfilled."],
    ["Do Miraee's AI agents use our company data to train models?", "No. Your trip data is used to personalise your own organisation's experience and is not used to train foundation models or to improve outcomes for any other customer. Personalisation is scoped to your tenant."],
    ["What can Miraee's agents do without human approval?", "Miraee's agents can search inventory, assemble itineraries, book trips that fall fully within your policy, rebook disruptions inside a fare band you define, and code expenses to your finance system. Anything out of policy, above your thresholds, or outside pre-authorised payment rails requires a named human approver. Every boundary is configurable and every action is logged."],
    ["Can we see what an agent did and why?", "Yes. Every agent action is recorded with the action taken, the agent responsible, the timestamp, the policy rule applied and the cost involved. The full audit trail is exportable at any time and cannot be altered or deleted by any agent."],
    ["How does Miraee handle traveler personal data?", "Miraee collects only the traveler data required to book and support a trip, including identity details, preferences, loyalty memberships and the itinerary itself. Access is role-based, agents cannot act on personal data beyond the scope of the trip in hand, and retention periods are published."],
]

export default function SecurityV2() {
    useEffect(() => {
        document.title = "Security, Compliance and AI Governance - Miraee"
        const description = "How Miraee secures traveler data, where it is stored, and exactly what our AI agents may and may not do without a human. Certifications, controls and the full governance model."
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta) }
        meta.content = description
    }, [])
    return (
        <div className="m-site">
            <a className="m-skip" href="#main">Skip to content</a>
            <V2Nav active="/security" />
            <main id="main">
                <section className="m-hero m-section--light" aria-labelledby="security-hero-title">
                    <Reveal className="m-hero__copy">
                        <p className="m-eyebrow">TRUST</p>
                        <h1 id="security-hero-title">Fast for people.<br /><em>Safe for the business.</em></h1>
                        <p className="m-lede">Every agent action is governed, permissioned, traceable and reversible. Autonomy never means blind trust.</p>
                        <div className="m-actions">
                            <a href={SECURITY_EMAIL}>Request the security package <span aria-hidden="true">↗</span></a>
                            <a href="#governance">See the boundaries <span aria-hidden="true">↓</span></a>
                        </div>
                        <div className="m-chip-row">{["SOC 2", "GDPR", "SSO / SCIM", "Audit logs"].map(c => <span key={c}>{c}</span>)}</div>
                    </Reveal>
                </section>

                <section id="certifications" className="m-security m-section--dark" aria-label="Certifications and compliance">
                    <Reveal>
                        <p className="m-eyebrow">CERTIFICATIONS</p>
                        <h2>Independently verified,<br />not self-declared.</h2>
                        <p>Security controls, data protection, identity management, and agent actions are documented with a clear status for procurement review.</p>
                    </Reveal>
                    <div className="m-security__marks">
                        <span><strong>SOC 2</strong><small>In progress</small></span>
                        <span><strong>GDPR</strong><small>Compliant</small></span>
                        <span><strong>SSO / SCIM</strong><small>Identity management</small></span>
                        <span><strong>Audit logs</strong><small>Every agent action</small></span>
                    </div>
                </section>

                <section className="m-section sec-residency" aria-labelledby="residency-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">DATA RESIDENCY</p>
                        <h2 id="residency-title">Your data stays where you need it.</h2>
                        <p>Choose the region your traveler and transaction data is stored and processed in. For organisations operating across the US, Europe and India, this is a procurement requirement rather than a preference.</p>
                    </Reveal>
                    <Reveal className="sec-regions">
                        {[["US","United States"],["EU","European Union"],["IN","India"]].map(([code,name]) => <div key={code}><span>{code}</span><strong>{name}</strong><small>Regional processing</small></div>)}
                    </Reveal>
                </section>

                <section id="governance" className="m-section" aria-labelledby="governance-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">AI GOVERNANCE</p>
                        <h2 id="governance-title">Autonomy never means blind trust.</h2>
                        <p>Agents act inside boundaries you set. Here are the boundaries, in writing.</p>
                    </Reveal>

                    <Reveal className="sec-layers">
                        {trustLayers.map(([n,title,label,copy]) => <div className="sec-layer" key={title}><span>{n}</span><div><small>{label}</small><h3>{title}</h3><p>{copy}</p></div></div>)}
                    </Reveal>

                    <Reveal><div className="sec-section-title"><div><p className="m-eyebrow">DECISION MATRIX</p><h3 className="m-subhead">What agents may do without asking</h3></div><p>Every one of these defaults is configurable, and every boundary can be tightened.</p></div></Reveal>
                    <Reveal className="sec-decisions" delay={.03}>
                        {mayDoWithoutAsking.map(([action,rule,config]) => {
                            const approval = rule.includes("Requires") || rule.includes("Never")
                            return <article className={approval ? "needs-approval" : "is-permitted"} key={action}>
                                <div className="sec-decision-status"><span aria-hidden="true">{approval ? "↗" : "✓"}</span><small>{approval ? "Human approval" : "Agent permitted"}</small></div>
                                <h4>{action}</h4><p>{config === "Fixed control" ? rule : config}</p>
                            </article>
                        })}
                    </Reveal>

                    <Reveal className="sec-hard-limits" delay={.06}>
                        <div className="sec-section-title"><div><p className="m-eyebrow">HARD LIMITS</p><h3 className="m-subhead">What agents never do</h3></div><p>Not configurable in any tenant or under any setting.</p></div>
                        <div className="m-hardstop">{neverDo.map(x => <div key={x}><span aria-hidden="true">✕</span>{x}</div>)}</div>
                    </Reveal>

                    <Reveal delay={.09}><div className="sec-section-title"><div><p className="m-eyebrow">HUMAN IN THE LOOP</p><h3 className="m-subhead">Where the human sits</h3></div><p>Routine work moves automatically. Exceptions arrive with context.</p></div></Reveal>
                    <Reveal delay={.1}>
                        <div className="m-flow">
                            {humanSits.map(([stage, who]) => (
                                <div className="m-flow__step" key={stage}>
                                    <h3>{stage}</h3>
                                    <p>{who}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal className="sec-data-principles" delay={.12}>
                        <div className="sec-section-title"><div><p className="m-eyebrow">DATA LIFECYCLE</p><h3 className="m-subhead">What data trains what</h3></div><p>Plain-language commitments for security and procurement teams.</p></div>
                        <div className="m-splitfacts">
                            <div>
                                <h3>Your data stays scoped to your organisation.</h3>
                                <p>Your trip data personalises your organisation's experience and nothing else. It is not used to train foundation models or improve outcomes for another customer. Personalisation is scoped to your tenant.</p>
                            </div>
                            <div>
                                <h3>Retention and deletion are documented.</h3>
                                <p>Retention periods, traveler deletion rights, tax and audit obligations, and contract-end return formats are defined in the security package for your deployment.</p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal className="m-callout" delay={.14}>
                        <p className="m-eyebrow">THE AUDIT TRAIL</p>
                        <h3>Every action. Every actor. Every reason.</h3>
                        <p>Each agent action is logged with what was done, which agent did it, when, under which rule, and what it cost. The complete record is exportable at any time.</p>
                    </Reveal>

                </section>

                <section className="m-section m-tint-band" aria-labelledby="access-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">ACCESS</p>
                        <h2 id="access-title">The right people. The right data. Nothing more.</h2>
                    </Reveal>
                    <Reveal className="sec-access-grid">
                        {[["SAML + OIDC","Single sign-on"],["SCIM","Automatic provisioning and deprovisioning"],["Role based","Traveler, approver, finance and admin access"],["Entity isolated","Segregation for multi-company groups"],["MFA","Session controls and enforced multi-factor authentication"]].map(([mark,copy],i) => <div key={mark}><span>{String(i+1).padStart(2,"0")}</span><strong>{mark}</strong><p>{copy}</p></div>)}
                    </Reveal>
                </section>

                <section className="m-section sec-operations" aria-labelledby="reliability-title">
                    <Reveal className="m-section__head"><p className="m-eyebrow">RELIABILITY</p><h2 id="reliability-title">Travel doesn't wait for maintenance windows.</h2></Reveal>
                    <Reveal className="sec-ops-grid">
                        <div><span>01</span><small>Uptime</small><h3>Uptime commitment</h3><p>Defined in your service agreement.</p></div>
                        <div><span>02</span><small>Live status</small><h3>Public incident history</h3><a href="https://status.miraee.ai">status.miraee.ai <span aria-hidden="true">↗</span></a></div>
                        <div><span>03</span><small>Support</small><h3>Human help, 24/7</h3><p>A defined incident escalation path for administrators.</p></div>
                    </Reveal>
                    <Reveal className="sec-subprocessors">
                        <div><p className="m-eyebrow">SUBPROCESSORS</p><h3>Who else touches your data.</h3></div>
                        <p>A current list of every subprocessor, what they process and where. Subscribe to be notified before the list changes.</p>
                        <a href={SECURITY_EMAIL}>Request the current list <span aria-hidden="true">↗</span></a>
                    </Reveal>
                </section>

                <section className="m-section" aria-labelledby="security-faq-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">SECURITY FAQ</p>
                        <h2 id="security-faq-title">Questions procurement asks first.</h2>
                    </Reveal>
                    <Reveal><Faq items={faqs} /></Reveal>
                </section>

                <section className="m-cta">
                    <Reveal>
                        <p className="m-eyebrow">DILIGENCE</p>
                        <h2>Send us your<br />security questionnaire.</h2>
                        <p>We'll return it completed, with the documentation attached.</p>
                        <a href={SECURITY_EMAIL}>Request the security package <span aria-hidden="true">↗</span></a>
                    </Reveal>
                </section>
            </main>
            <V2Footer />
        </div>
    )
}
