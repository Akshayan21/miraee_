import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { V2Footer } from "../components/LegalFormKit"
import { Reveal, V2Nav, EditorialRows } from "../components/V2Kit"
import "./HomeV2Light.css"
import "./SubpagesV2.css"
import "./V2AlternatingSections.css"
import { usePageMeta } from "../hooks/usePageMeta"

const employeeBlocks = [
    ["Trip planning from a single sentence", "Describe your trip in plain language. Miraee reads the intent, checks your calendar, and assembles flight, hotel, rail and car as one policy-compliant trip."],
    ["Auto-applied policy on every booking", "Company policy is applied before options are shown, so every choice is already within the rules for your role, route and trip."],
    ["Real-time rebooking when flights change", "The agent detects disruption, finds the best alternative, checks it against policy, and either fixes the trip or brings you one decision."],
    ["Automated expense reporting", "Receipts are auto-captured and submitted with zero manual entry - automated expense reporting, not another task for the traveler."],
] as const

const financeBlocks = [
    ["Real-time travel spend analytics", "The moment a trip is booked, its cost is visible against the right entity and cost centre, so finance can see committed spend before a card statement arrives."],
    ["Automated reconciliation and ERP sync", "Every expense is categorised, allocated and matched to its booking at the source. Receipts are captured at the transaction and entries post to your ERP without re-keying."],
    ["AI spend management and measurable travel ROI", "Miraee brings tracked spend, negotiated-rate savings and trip outcomes together, giving finance a clear view of performance rather than another reporting gap."],
    ["Full audit trail and policy governance", "Rules are applied before booking, exceptions are recorded, and every agent action remains attributable, reviewable and exportable."],
] as const

const financeControls = [
    "The chart of accounts and every coding rule",
    "Approval chains, by amount, entity, grade and trip type",
    "The spend ceiling above which no agent may act alone",
    "Which suppliers and fare classes are permitted at all",
    "Final sign-off before anything posts, if you want it",
    "A complete, exportable log of every action any agent has taken",
]

const travelTeamBlocks = [
    ["Owned global inventory and exclusive corporate rates", "Direct supplier connections and wholesale agreements give the program supply depth that is applied automatically at booking."],
    ["Program-wide analytics and optimization", "See booking, spend, rewards and program performance together, then improve the rules instead of policing individual trips."],
    ["Group travel and corporate event travel management built in", "MICE, offsites, conferences and guest travel run on the same rails, with their own spend controls and approval paths."],
    ["Reliability backed by Tabhi and Mondee", "Miraee combines a modern agentic platform with the operating history, supplier relationships and reach of an established global travel group."],
    ["Enterprise travel solutions", "Policy, approvals, duty of care, global supply and 24/7 human support work as one program rather than a collection of disconnected tools."],
] as const

const adminBlocks = [
    ["Per diem policy enforcement", "Meal, lodging and incidental caps are applied automatically at booking, by role, region and trip type, with no manual checking required."],
    ["Automatic approval routing with instant exception handling", "In-policy trips clear themselves. Anything outside the rule routes to the right approver immediately, with the context to decide fast."],
    ["Unified employee profiles and permissions", "One record per traveler holds their role, entitlements, payment methods and approval chain, kept consistent across every booking."],
    ["One dashboard for the entire travel program", "Policy, budgets, approvals and bookings live in a single view, so the program can be managed rather than policed trip by trip."],
] as const

const chroBlocks = [
    ["Frictionless, consumer-grade experience for every employee", "Booking feels like a personal assistant, not a portal, so the policy that protects the company doesn't feel like a tax on the traveler."],
    ["Duty-of-care through real-time disruption support", "Every traveler's location and status is visible as it changes, with proactive rebooking and outreach the moment something goes wrong."],
    ["Policy applied fairly and consistently", "The same rules apply the same way to everyone, automatically, so equity in travel policy stops depending on who happens to ask."],
    ["Employee incentives for cost-efficient choices", "Travelers who choose the lower-cost, in-policy option are recognized for it, turning savings into a shared win instead of a rule to resent."],
] as const

const managerBlocks = [
    ["Instant, context-rich exception routing", "Only trips that genuinely break policy reach you, arriving with the traveler, the reason and the alternative already attached."],
    ["Team-level visibility into travel and spend", "See who's traveling, where, and at what cost across your team without chasing anyone for a status update."],
    ["No more approval bottlenecks", "Routine, in-policy trips are approved automatically, so your queue holds judgment calls, not rubber stamps."],
] as const

const additionalPersonas = [
    ["For admins", "Set the rules once. Let the platform enforce them.", "Configure policy, approvals and budgets, then let Miraee apply them automatically across every traveler and booking, keeping travel policy compliance consistent program-wide. Per diem policy enforcement, instant exception routing, unified employee profiles and permissions, and one dashboard keep the program under control.", "Manage the whole program without manual policing.", "admins"],
    ["For travel leads", "Run a modern travel program without the busywork.", "Consolidate booking, spend, rewards and events into one intelligent system with the supply depth of a global marketplace behind it. Owned inventory, program-wide analytics, corporate event travel management, reliability backed by Tabhi and Mondee, and enterprise travel solutions are built in.", "One intelligent system for the whole program.", "travel-teams"],
    ["For CHROs", "Travel that supports your people, not just your policy.", "Miraee delivers a frictionless, consumer-grade traveler experience with duty-of-care through real-time disruption support, while keeping compliance and wellbeing front and center. Policy is applied fairly and consistently, with incentives for cost-efficient choices.", "Travel becomes a talent advantage.", "chros"],
    ["For managers", "Approvals that don't sit in your inbox.", "Policy-compliant trips are auto-approved. Only genuine exceptions reach you, with instant, context-rich routing and team-level visibility into travel and spend.", "No more approval bottlenecks.", "managers"],
] as const

const useCases = [
    ["Business travel", "Every business trip, end to end.", "Miraee manages business travel and expense management end to end - from booking flights, hotels, cars and rail to managing business travel expenses, policies, budgets and real-time disruptions."],
    ["Meetings & events", "Group travel and events, intelligently managed.", "Miraee is the only platform that unifies corporate event travel management with MICE, automated group booking, intelligent venue sourcing and rate negotiation, real-time event expense tracking, and seamless attendee and itinerary management."],
    ["Executive travel", "White-glove travel, automated.", "High-touch itineraries, preference learning and proactive disruption management give executives a premium executive travel experience without a dedicated human handler."],
    ["Global mobility", "Cross-border travel for a distributed workforce.", "Remote-first and hybrid teams generate constant cross-border and inter-office travel. Miraee handles it at scale with global supply, local rates and consistent policy everywhere."],
    ["Emergency & disruption", "When plans break, Miraee doesn't.", "Cancellations, delays and reroutes are managed proactively through a single chat. The best alternative is coordinated and confirmed before the traveler is stranded."],
]

type TabId = "employees" | "finance" | "travel-teams" | "admins" | "chros" | "managers"

const TABS: { id: TabId; label: string; title: string; teaser: string; shift: string }[] = [
    { id: "employees", label: "FOR EMPLOYEES", title: "Your personal AI travel agent.", teaser: "Describe your trip in plain language and Miraee handles planning, booking, policy and expenses. No forms. No portals. No end-of-month receipt hunt.", shift: "You used to assemble a trip. Now you describe one." },
    { id: "finance", label: "FOR FINANCE", title: "Every dollar tracked. Every trip measured.", teaser: "Miraee gives finance real-time visibility into travel spend as part of a broader spend management software approach, with automated reconciliation and ROI reporting - closing the 40% of spend that normally goes untracked.", shift: "You used to reconcile the past. Now you watch the present." },
    { id: "travel-teams", label: "FOR TRAVEL LEADS", title: "Run a modern travel program without the busywork.", teaser: "Consolidate booking, spend, rewards and events into one intelligent system with the supply depth of a global marketplace behind it.", shift: "You used to process bookings. Now you run a program." },
    { id: "admins", label: "FOR ADMINS", title: "Set the rules once. Let the platform enforce them.", teaser: "Configure policy, approvals and budgets, then let Miraee apply them automatically across every traveler and every booking, keeping travel policy compliance consistent program-wide.", shift: "You used to police every trip. Now you set the rule once." },
    { id: "chros", label: "FOR CHROS", title: "Travel that supports your people, not just your policy.", teaser: "Miraee delivers a seamless traveler experience while keeping duty-of-care, compliance and wellbeing front and center, so travel becomes a talent advantage, not a friction point.", shift: "You used to enforce policy. Now you support people." },
    { id: "managers", label: "FOR MANAGERS", title: "Approvals that don't sit in your inbox.", teaser: "Policy-compliant trips are auto-approved; only genuine exceptions reach you, with the context to decide in seconds.", shift: "You used to chase approvals. Now only exceptions reach you." },
]

function isTabId(v: string): v is TabId {
    return v === "employees" || v === "finance" || v === "travel-teams" || v === "admins" || v === "chros" || v === "managers"
}

export default function ForTeamsV2() {
    usePageMeta("Miraee for Business Travelers, Finance Teams and Travel Managers", "Miraee is travel management software for employees, finance teams and travel leaders, unifying booking, policy, spend, support and expenses.")
    const [active, setActive] = useState<TabId>("employees")

    useEffect(() => {
        const applyHash = () => {
            const h = window.location.hash.slice(1)
            if (isTabId(h)) setActive(h)
        }
        applyHash()
        window.addEventListener("hashchange", applyHash)
        return () => window.removeEventListener("hashchange", applyHash)
    }, [])

    const select = (id: TabId) => {
        setActive(id)
        window.history.replaceState(null, "", `#${id}`)
    }

    const tab = TABS.find(t => t.id === active)!

    return (
        <div className="m-site">
            <a className="m-skip" href="#main">Skip to content</a>
            <V2Nav active="/for-teams" />
            <main id="main">
                <section className="m-hero m-section--light" aria-labelledby="teams-hero-title">
                    <Reveal className="m-hero__copy">
                        <p className="m-eyebrow">DESIGNED FOR EVERYONE</p>
                        <h1 id="teams-hero-title">Built for everyone behind the journey, from planning and payment to taking the trip.</h1>
                        <p className="m-lede">Whatever your role, use case or company, Miraee removes the friction between intent and outcome, one travel management software platform for the whole program.</p>
                        <div className="m-jumplinks">
                            <a href="#employees">For employees <span aria-hidden="true">↓</span></a>
                            <a href="#finance">For finance <span aria-hidden="true">↓</span></a>
                            <a href="#travel-teams">For travel teams <span aria-hidden="true">↓</span></a>
                        </div>
                    </Reveal>
                </section>

                <section className="m-section m-tint-band" aria-labelledby="personas-title">
                    <Reveal className="m-section__head"><p className="m-eyebrow">MORE PERSONAS</p><h2 id="personas-title">One program. Every stakeholder.</h2></Reveal>
                    <div className="m-personas">{additionalPersonas.map(([label,title,copy,outcome,anchor]) => <Reveal className="m-personas__item" key={label}><span className="m-eyebrow">{label}</span><h3><a href={`#${anchor}`}>{title}</a></h3><p>{copy}</p><strong>{outcome}</strong></Reveal>)}</div>
                </section>

                <section className="m-section" aria-labelledby="use-cases-title">
                    <Reveal className="m-section__head"><p className="m-eyebrow">BY USE CASE</p><h2 id="use-cases-title">Every kind of company travel.</h2></Reveal>
                    <div className="m-list m-use-cases">{useCases.map(([label,title,copy],i) => <Reveal className="m-list__row" key={label}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p><strong>{label}</strong></Reveal>)}</div>
                </section>

                <section className="m-section m-business m-section--dark" aria-labelledby="fit-title">
                    <Reveal className="m-section__head"><p className="m-eyebrow">BY FIT</p><h2 id="fit-title">Tuned to how your industry travels.</h2><p>Whether your travel is driven by client engagement, distributed teams, field operations or events, Miraee adapts policy, supply and workflows to your patterns.</p></Reveal>
                    <Reveal className="m-splitfacts"><div><h3>Purpose-built for upper-SMB and mid-market.</h3><p>Miraee is travel management software built for the segment incumbents underserve: companies with $500K–$5M in annual travel budgets and 100–3,000 employees, often running on 6+ disconnected tools with no optimization. That's a $255B serviceable market, and it's our home.</p></div><div><h3>Find your fit.</h3><p>Bring your travel pattern, systems and approval model. We'll show how the platform maps to them.</p><Link to="/book-a-demo">Find your fit <span aria-hidden="true">→</span></Link></div></Reveal>
                </section>

                <section id="team-select" className="m-section" aria-label="Choose your role">
                    <div className="m-anchor" id="employees" />
                    <div className="m-anchor" id="finance" />
                    <div className="m-anchor" id="travel-teams" />
                    <div className="m-anchor" id="admins" />
                    <div className="m-anchor" id="chros" />
                    <div className="m-anchor" id="managers" />

                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">ONE PLATFORM · SIX VIEWS</p>
                        <h2>Same trip. A different problem solved for each of you.</h2>
                        <p>Pick the role that's yours. The platform underneath never changes.</p>
                    </Reveal>

                    <div className="m-roletabs" role="tablist" aria-label="Choose your role">
                        {TABS.map(t => (
                            <button key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-selected={active === t.id} aria-controls="team-panel" onClick={() => select(t.id)}>
                                <span className="m-roletabs__label">{t.label}</span>
                                <h3>{t.title}</h3>
                                <p>{t.teaser}</p>
                            </button>
                        ))}
                    </div>

                    <div key={active} id="team-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="m-rolepanel">
                            <div className="m-shift"><p><span>The shift</span>{tab.shift}</p></div>

                            {active === "employees" && (
                                <>
                                    <EditorialRows caption="For employees" headers={["Feature", "What it means"]} rows={employeeBlocks.map(row => [...row])} columns={2} />
                                    <div className="m-chip-row">
                                        {["Twelve tabs", "Screenshotted confirmations", "Chasing approvals", "Keeping receipts", "Filing reports", "Waiting on hold"].map(x => <span key={x}>{x}</span>)}
                                    </div>
                                    <div className="m-role-close">
                                        <strong>Get 6 hours per trip planning back.</strong>
                                        <Link to="/book-a-demo">See a trip handled live <span aria-hidden="true">↗</span></Link>
                                    </div>
                                </>
                            )}

                            {active === "finance" && (
                                <>
                                    <EditorialRows caption="What changes for finance" headers={["What changes", "How"]} rows={financeBlocks.map(row => [...row])} columns={2} />
                                    <div className="m-callout">
                                        <h3>What finance still controls</h3>
                                        <p>The objection every CFO raises about autonomous agents, answered before it's asked.</p>
                                        <ul className="m-edlist m-edlist--grid">{financeControls.map(c => <li key={c}>{c}</li>)}</ul>
                                    </div>
                                    <div className="m-role-close">
                                        <strong>Turn travel from an unmanaged line item into a measurable performance engine.</strong>
                                        <Link to="/book-a-demo">Talk to us about your close <span aria-hidden="true">↗</span></Link>
                                    </div>
                                </>
                            )}

                            {active === "travel-teams" && (
                                <>
                                    <EditorialRows caption="For travel teams" headers={["Capability", "What it means"]} rows={travelTeamBlocks.map(row => [...row])} columns={2} />
                                    <div className="m-role-close">
                                        <strong>24/7 agent + human care</strong>
                                        <Link to="/book-a-demo">See the console <span aria-hidden="true">↗</span></Link>
                                    </div>
                                </>
                            )}

                            {active === "admins" && (
                                <>
                                    <EditorialRows caption="For admins" headers={["Control", "What it means"]} rows={adminBlocks.map(row => [...row])} columns={2} />
                                    <div className="m-role-close">
                                        <strong>Manage the whole program without manual policing.</strong>
                                        <Link to="/book-a-demo">See policy enforce itself <span aria-hidden="true">↗</span></Link>
                                    </div>
                                </>
                            )}

                            {active === "chros" && (
                                <>
                                    <EditorialRows caption="For CHROs" headers={["Capability", "What it means"]} rows={chroBlocks.map(row => [...row])} columns={2} />
                                    <div className="m-role-close">
                                        <strong>Travel becomes a talent advantage, not a friction point.</strong>
                                        <Link to="/book-a-demo">See duty-of-care in action <span aria-hidden="true">↗</span></Link>
                                    </div>
                                </>
                            )}

                            {active === "managers" && (
                                <>
                                    <EditorialRows caption="For managers" headers={["Capability", "What it means"]} rows={managerBlocks.map(row => [...row])} columns={2} />
                                    <div className="m-role-close">
                                        <strong>No more approval bottlenecks.</strong>
                                        <Link to="/book-a-demo">See exceptions routed instantly <span aria-hidden="true">↗</span></Link>
                                    </div>
                                </>
                            )}
                    </div>
                </section>

                <section className="m-cta">
                    <Reveal>
                        <p className="m-eyebrow">See the agent in action</p>
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
