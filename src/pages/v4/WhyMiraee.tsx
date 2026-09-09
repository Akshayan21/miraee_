import { V4Page, V4Hero, V4Cta, Reveal, MiniTable, Faq } from "../../components/V4Kit"
import type { ReactNode } from "react"
import whyMiraeePhoto from "../../assets/role-traveller.jpg"
import whyMiraeeCard from "../../assets/expense card.gif"
import "../SubpagesV2.css"
import "./V4.css"

// "What actually changes" reads as a transformation, not a spreadsheet, so it
// gets a before/after list instead of MiniTable: the old way struck through,
// the new way as the visual payload, connected by an arrow. Mirrors the
// struck-through convention SixViews already uses for the same "you used to
// X, now you Y" shape, so the two pages read as one design language.
function ShiftList({ rows }: { rows: string[][] }) {
    return (
        <ul className="v4-shift">
            {rows.map(([job, before, after]) => (
                <li className="v4-shift__row" key={job}>
                    <span className="v4-shift__job">{job}</span>
                    <span className="v4-shift__before">
                        <span className="v4-shift__microlabel">Today</span>
                        {before}
                    </span>
                    <span className="v4-shift__arrow" aria-hidden="true">→</span>
                    <span className="v4-shift__after">
                        <span className="v4-shift__microlabel">With Miraee</span>
                        {after}
                    </span>
                </li>
            ))}
        </ul>
    )
}

// The rollout plan is a sequence, not a spreadsheet — a table forces a reader
// to scan three unrelated columns to find "what order does this happen in".
// A connected stepper makes the order the first thing you see; the numeral
// prefix already baked into each step's label ("01 · Policy") moves into a
// real badge instead of being repeated as text.
function StepperList({ rows }: { rows: string[][] }) {
    return (
        <div className="v4-stepper">
            {rows.map(([step, body, who], i) => {
                const title = step.includes(" · ") ? step.split(" · ")[1] : step
                return (
                    <div className="v4-stepper__node" key={step}>
                        <span className="v4-stepper__badge" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                        <h3>{title}</h3>
                        <p>{body}</p>
                        <span className="v4-stepper__who">{who}</span>
                    </div>
                )
            })}
        </div>
    )
}

// Why Miraee. Ported from WhyMiraeeV2.tsx — the differentiation argument the
// manager's nav asks for, which the Part 1 structure doc has no page for.
// The #switching section is the target of the Product menu's
// "Implementation / Onboarding" link.

const SHIFT: string[][] = [
    ["Planning a trip", "You search, compare and assemble it", "You describe it once"],
    ["Staying in policy", "You find out at approval", "Applied before options appear"],
    ["Getting approval", "Chased over email", "Routine trips self-book inside limits"],
    ["Handling disruption", "You call and wait", "Detected and rebooked in the same thread"],
    ["Filing the expense", "A form, weeks later", "Captured, coded and posted at source"],
    ["Getting help", "A queue, then re-explain the trip", "A person with the trip already attached"],
]

const CAPABILITY_COMPARE: string[][] = [
    ["Natural-language planning", "No", "No", "Yes"],
    ["Policy applied before booking", "Partial", "Partial", "Yes"],
    ["Proactive disruption handling", "No", "No", "Yes"],
    ["Expense prepared automatically", "No", "Partial", "Yes"],
    ["Business and personal travel", "No", "No", "Yes"],
    ["24/7 human support", "Billed per call", "Add-on", "Included"],
    ["Agents that complete the work", "No", "No", "Yes"],
]

const HARD_QUESTIONS: [string, ReactNode][] = [
    ["We just signed with our TMC.", "Most programs run a pilot on one entity or one region alongside the incumbent, then compare like for like. Nothing has to be torn out to see the number."],
    ["Our travelers won't adopt another tool.", "Miraee is a conversation, not a portal. There is no interface to learn: employees describe the trip in the tools they already have open, and the itinerary comes back in policy."],
    ["We can't let AI book without approval.", "Then don't. Every agent has a written limit on what it may do alone, and you set it. Many programs start with approval on everything and relax it once the audit trail earns trust."],
    ["Our travel policy is too complex.", "Policy is configured by route, grade, trip type and entity, and it is applied at search rather than at approval: the more complex the policy, the more that matters."],
    ["What happens when a trip goes badly wrong?", "The agent detects the disruption, prices the alternatives, and escalates to a human travel specialist with the whole trip already attached. The traveler never starts over."],
    ["You're new.", "The software is. The supply, the payments and the engineering are the Tabhi group's, which already reaches 125M+ travelers across 500+ airlines and 2M+ properties."],
]

const SWITCHING: string[][] = [
    ["01 · Policy", "Your rules, entities, grades and approval chains are configured", "Your travel and finance leads"],
    ["02 · Connect", "SSO, HRIS, ERP and card networks are linked", "IT, one working session"],
    ["03 · Pilot", "One entity or region runs live alongside the incumbent", "A single team"],
    ["04 · Roll out", "Program-wide, with the pilot's numbers as the baseline", "Everyone"],
]

export default function V4WhyMiraee() {
    return (
        <V4Page
            title="Why Miraee | Same Trip, Different Operating Model"
            description="Your travel program isn't broken: its architecture is. How Miraee compares to a legacy TMC and first-generation T&E, and what switching actually takes.">

            <V4Hero
                eyebrow="Why Miraee"
                title={<>Your travel program isn't broken.<br /><em>Its architecture is.</em></>}
                lede="Booking in one tool, policy in another, expense in a third. Miraee runs the whole journey as one system."
                image={{ src: whyMiraeePhoto, alt: "A traveler working from an airport lounge", position: "48% 40%" }}
                card={{ src: whyMiraeeCard, alt: "Miraee automatically categorizing a trip expense", crop: 0.08, width: "42%", anchor: "bottom" }} />

            <section className="v4-section v4-section--tint" id="what-changes" aria-labelledby="what-changes-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">What actually changes</span>
                        <h2 className="v4-h2" id="what-changes-title">From tools that wait to agents that act.</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 28 }}>
                            <ShiftList rows={SHIFT} />
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="v4-section" id="compare" aria-labelledby="compare-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Side by side</span>
                        <h2 className="v4-h2" id="compare-title">Same trip. Different operating model.</h2>
                    </Reveal>
                    {/* Boxed, pinned-column comparison treatment — same
                        m-compare-block pattern WhyMiraeeV2 uses for this exact
                        section, so the Miraee column reads as the winner via
                        a checkmark + tint, not color alone. */}
                    <Reveal className="m-compare-block" delay={0.1}>
                        <MiniTable headers={["Capability", "Legacy TMC", "First-gen T&E", "Miraee"]} rows={CAPABILITY_COMPARE} caption="Capability comparison" highlightLast checkmark />
                    </Reveal>
                </div>
            </section>

            <section className="v4-section v4-section--tint" id="questions" aria-labelledby="questions-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">The hard questions</span>
                        <h2 className="v4-h2" id="questions-title">What people ask before they switch.</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 28 }}><Faq items={HARD_QUESTIONS} /></div>
                    </Reveal>
                </div>
            </section>

            <section className="v4-section" id="switching" aria-labelledby="switching-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Implementation & onboarding</span>
                        <h2 className="v4-h2" id="switching-title">Live in weeks, not quarters.</h2>
                        <p className="v4-lede">Pilots reach full deployment in as little as 90 days, and nothing has to be switched off to start.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 40 }}>
                            <StepperList rows={SWITCHING} />
                        </div>
                    </Reveal>
                </div>
            </section>

            <V4Cta title="Experience the agentic travel." body="Bring a real trip, a real policy and a real route. Twenty minutes." />
        </V4Page>
    )
}
