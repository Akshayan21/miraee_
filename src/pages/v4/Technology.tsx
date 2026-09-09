import { Fragment } from "react"
import { V4Page, V4Hero, V4Cta, Reveal } from "../../components/V4Kit"
import { SecurityV1 } from "./RefSections"
import technologyPhoto from "../../assets/security-hero.jpg"
import technologyCard from "../../assets/ui-multi-city-card.png"
import "../SubpagesV2.css"
import "./V4.css"

// AI & Technology. Section order per the Part 1 structure doc:
//   hero (intelligence + Tabhi) → AI vs agentic → architecture (six agents,
//   named only) → governance + "fast for people, safe for the business".
//
// The doc says the hero must not use "200 bots". It doesn't: the number appears
// once, further down, in the framing the site already uses elsewhere — six
// specialized agents, with Tabhi's automation fabric beneath them.

const CONTRAST: { tag: string; title: string; copy: string }[] = [
    { tag: "Assistant AI", title: "Answers, drafts, waits.", copy: "It presents options and leaves execution to the traveler." },
    { tag: "Agentic AI · Miraee", title: "Plans, books, reconciles.", copy: "It interprets intent, enforces policy, handles disruptions, and escalates only when judgment is needed." },
]

// The two panels were reading as equal options in a neutral card grid, when
// the copy's actual argument is a step up from one to the other. The second
// card (Miraee) now carries the visual weight — tint, filled tag, elevation —
// with an arrow between them so the eye reads it as a transition, not a menu.
function AgenticContrast({ panels }: { panels: { tag: string; title: string; copy: string }[] }) {
    return (
        <div className="v4-contrast">
            {panels.map((panel, i) => (
                <Fragment key={panel.tag}>
                    {i > 0 && <span className="v4-contrast__arrow" aria-hidden="true">→</span>}
                    <div className={"v4-contrast__card" + (i === panels.length - 1 ? " v4-contrast__card--win" : "")}>
                        <span className="v4-contrast__tag">{panel.tag}</span>
                        <h3>{panel.title}</h3>
                        <p>{panel.copy}</p>
                    </div>
                </Fragment>
            ))}
        </div>
    )
}

const AGENT_ROWS: string[][] = [
    ["Booking agent", "Turns a sentence into a trip, in policy from the first result"],
    ["Policy agent", "Applies per diem, grade and rules at search, before you see options"],
    ["Negotiation agent", "Works wholesale and direct supply to land the best available rate"],
    ["Rebooking agent", "Watches for disruption and rebooks in the same thread"],
    ["Expense agent", "Matches receipts to trips and reconciles automatically"],
    ["Support agent", "Answers questions and pulls in a human when it matters"],
]

const GUARDRAIL_ICONS = [
    // Policy and budget guardrails — a shield.
    <svg key="shield" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v6c0 4.5 3 7.7 8 9 5-1.3 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>,
    // Human in the loop — a person.
    <svg key="human" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7.5" r="3.2" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" /></svg>,
    // Full audit trail — a log/list.
    <svg key="audit" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M8 4h11a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8" /><path d="M4 4h2v16H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" /><path d="M12 9h5M12 13h5M12 17h3" /></svg>,
    // Role-based permissions — a keyed lock.
    <svg key="lock" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15" r="1.4" /></svg>,
]

const GUARDRAILS: string[][] = [
    ["Policy and budget guardrails", "The agents search, match and rebook; choices that carry cost or risk still come to a person, always inside the policy and budget you set."],
    ["Human in the loop", "It stops and asks. Genuine exceptions pause and route to the right person, with full context."],
    ["Full audit trail", "Every agent action is logged and attributable. Nothing is invisible after the fact."],
    ["Role-based permissions", "Only within each person's existing access. Permissions follow responsibilities."],
]

// A flat row list undersold the section's job: this is the trust page's
// safety argument, so each guarantee gets an icon of its own instead of just
// a number, laid out as a scannable 2x2 grid rather than a linear reading list.
function GuardrailGrid({ rows }: { rows: string[][] }) {
    return (
        <div className="v4-guardrails">
            {rows.map(([title, body], i) => (
                <div className="v4-guardrail" key={title}>
                    <span className="v4-guardrail__icon">{GUARDRAIL_ICONS[i]}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                </div>
            ))}
        </div>
    )
}

export default function V4Technology() {
    return (
        <V4Page
            title="AI & Technology | The Intelligence Beneath Every Trip | Miraee"
            description="Agentic AI for employee travel: six specialized agents on Tabhi's automation fabric, bounded by policy, budget and permissions, with a complete audit trail.">

            <V4Hero
                eyebrow="AI & Technology"
                title={<>The intelligence<br /><em>beneath every trip.</em></>}
                lede="Miraee runs on Tabhi intelligence, the same engineering group behind the supply, the payments and the automation the trip already depends on."
                image={{ src: technologyPhoto, alt: "Engineers reviewing a system on screen together" }}
                card={{ src: technologyCard, alt: "Sample multi-city itinerary priced and booked in one pass", width: "34%", anchor: "bottom", bottom: "-60px" }} />

            <section className="v4-section v4-section--tint" id="assistant" aria-labelledby="assistant-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">AI Assistant for Every Employee</span>
                        <h2 className="v4-h2" id="assistant-title">From assistants to agents.</h2>
                        <p className="v4-lede">Most AI travel products suggest while you execute. Miraee takes action end to end: agentic AI travel, not an assistant with a travel skin.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 36 }}>
                            <AgenticContrast panels={CONTRAST} />
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="v4-section" id="architecture" aria-labelledby="architecture-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">The architecture</span>
                        <h2 className="v4-h2" id="architecture-title">Not one agent. A workforce.</h2>
                        <p className="v4-lede">Six different specialized agents each running their own allotted task, under the same thread. Beneath them sits Tabhi intelligence connecting Mondee supply, policy, payment and expense all together woven into one framework, dedicatedly working to complete one single trip.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="v4-agents" style={{ marginTop: 30 }}>
                            {AGENT_ROWS.map(([name, desc], i) => (
                                <div className="v4-agent" key={name}>
                                    <span className="v4-agent__num">{String(i + 1).padStart(2, "0")}</span>
                                    <h3>{name}</h3>
                                    <p>{desc}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="v4-note" style={{ marginTop: 28 }}>
                            <b>6</b>
                            <div>
                                <h3>Two layers, one system.</h3>
                                <p>An agent is a bounded, permissioned worker with one job, its own tools, and a written limit on what it may do alone. Competitors bolt AI onto a booking tool; here the intelligence and the supply were built together.</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Governance keeps V1's "Fast for people. Safe for the business."
                treatment verbatim; the guardrail table follows it. */}
            <SecurityV1 />

            <section className="v4-section" id="guardrails" aria-labelledby="guardrails-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Safety & governance</span>
                        <h2 className="v4-h2" id="guardrails-title">Autonomy with guardrails.</h2>
                        <p className="v4-lede">Four guardrails is easy to claim. Here's how each one holds.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 32 }}>
                            <GuardrailGrid rows={GUARDRAILS} />
                        </div>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <p className="v4-lede" style={{ marginTop: 32 }}>The agents move fast because the guardrails are fixed, speed for the traveler, safety for the business.</p>
                    </Reveal>
                </div>
            </section>

            <V4Cta title="See the agents work." body="Twenty minutes with your policy and your routes. Watch what runs without a human, and where one steps in." />
        </V4Page>
    )
}
