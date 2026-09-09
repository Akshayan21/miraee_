import { V4Page, V4Hero, V4Cta, Reveal, MiniTable } from "../../components/V4Kit"
import { SixViews } from "./SixViews"
import type { SixViewRole } from "./SixViews"
import UseCasesShowcase from "./solutions/UseCasesShowcase"
import { useWindowWidth } from "../../hooks/useWindowSize"
import solutionsPhoto from "../../assets/team-travellers.jpg"
import solutionsCard from "../../assets/ui-expenses-card.png"
import employeePersonaPhoto from "../../assets/v2-home-hero.jpg"
import adminPersonaPhoto from "../../assets/partner-with-miraee.jpg"
import financePersonaPhoto from "../../assets/role-finance-manager.jpg"
import travelLeadPersonaPhoto from "../../assets/miraee-role-travel-team.png"
import "../SubpagesV2.css"
import "./V4.css"

// Solutions. Section order:
//   six views (very minimal text) → use cases (V1.1) → persona table
//   → duty of care (reduced).
//
// The six roles are the canonical set from ForTeams.tsx. Slugs are the
// hyphenated form (travel-leads), which is what PersonaExperience and
// PersonaShowcase already use; ForTeamsV2 and Solutions.tsx each drifted to a
// different spelling and those are not carried forward here.

// Shaped for the V1.1 diptych: `shift` is the full "You used to X. Now you Y."
// sentence, which SixViews splits on "Now " into the struck-through before
// and the headline after.

const ROLES: SixViewRole[] = [
    {
        slug: "employees",
        label: "Employees",
        shift: "Used to assemble a trip. Now they describe one.",
        body: "Book from a sentence, checked against policy as you go. The Receipt Scanner matches receipts to trips automatically, so there's no report to file. Your briefing carries currency, safety, visa and emergency numbers; Rewards tracks points to your next milestone.",
        controls: ["My Trips", "Receipt Scanner", "Rewards"],
        cta: "Explore Employee Solution",
        href: "/v4/solutions/employees",
        rows: [
            "A trip from a sentence booked directly in policy",
            "No report to file: receipts matched with AI confidence",
            "Everything for the road in hand with safety & briefings",
            "Personal travel rewards tracked to your next milestone",
        ],
    },
    {
        slug: "managers",
        label: "Managers",
        shift: "You used to chase approvals. Now only exceptions reach you.",
        body: "Routine trips inside policy self-book. What reaches you arrives with estimated cost, exact policy overage and an AI confidence score, so you can decide in one glance. Team Analytics gives you spend vs budget, compliance and travel outcomes in one view, and you can allocate rewards per employee across the team, all without pulling a month's report.",
        controls: ["Approvals", "Team Analytics", "Team Trips", "Points Pool"],
        cta: "Explore Manager Solution",
        href: "/v4/solutions/managers",
        rows: [
            "The whole team in one view: spend vs budget and travel outcomes",
            "Approvals that take a click: only real exceptions reach you",
            "Rewards you control per person across the entire team",
        ],
    },
    {
        slug: "finance",
        label: "Finance",
        shift: "Rechecking each department's spend separately, untangling one misfiled entry or a missing one that keeps the books from matching, and delays in reporting all round. Now Full control on spends, all in one place.",
        body: "Committed spend shows at booking, not month-end. Track by department, category and top spenders, and move reimbursements from pending to paid in one table. The CFO Dashboard rolls up spend vs budget, savings and cycle time, all exportable.",
        controls: ["Accounts", "Approval chains", "Ceilings", "Suppliers", "Sign-off", "Audit log"],
        cta: "Explore Finance Solution",
        href: "/v4/solutions/finance",
        rows: [
            "Reports that arrive ready shaped to each reader in one click",
            "Every spend already accounted for with live tracking",
            "Reimbursements that move themselves with direct ERP sync",
            "CFO Dashboard with spend vs budget, savings and cycle time",
        ],
    },
    {
        slug: "travel-leads",
        label: "Travel leads",
        shift: "You used to process bookings. Now you run a program.",
        body: "A Live Tracker shows route, status and ETA for every traveler in motion. The Booking Queue holds every open request in one place, with analytics by team, entity and route. MICE and group booking built in, direct supply through Mondee.",
        controls: ["Live Tracker", "Booking Queue", "Program analytics"],
        cta: "Explore Travel Lead Solution",
        href: "/v4/solutions/travel-leads",
        rows: [
            "Everyone in motion on one screen with status and live ETA",
            "Every open booking request managed in one shared queue",
            "Program-wide analytics with MICE and direct Mondee supply",
        ],
    },
    {
        slug: "admins",
        label: "Admins",
        shift: "You used to police every trip. Now you set the rule once.",
        body: "Policy applies at search, so out-of-policy trips rarely get built. The Overview shows the whole program in one place — onboarding gaps, exceptions, budget, adoption, compliance and AI-surfaced savings. Manage travelers and rules, run duty of care from the Live Map, and reconcile without switching screens. The Agentic ROI Dashboard shows exactly what the agent saved in hours and dollars.",
        controls: ["Overview", "Policies", "Live Map", "Agentic ROI"],
        cta: "Explore Admin Solution",
        href: "/v4/solutions/admins",
        rows: [
            "Policy that enforces itself at search and inherits by grade",
            "The whole program at a glance with live duty of care map",
            "Agentic ROI Dashboard proving hours and dollars saved",
            "Unified profiles and reconciliation without switching screens",
        ],
    },
    {
        slug: "chros",
        label: "CHROs",
        shift: "You used to enforce policy. Now you support people.",
        body: "Your view leads with people: Total People, Travel Ready, Currently Traveling and Compliance. Duty of Care shows every active traveler with a live location, plus on-trip tracking, a travelers-by-day calendar and compliance by team pulled from HRIS. Same policy for everyone, a consumer-grade experience.",
        controls: ["Duty of Care", "Readiness", "Compliance by Team"],
        cta: "Explore CHRO Solution",
        href: "/v4/solutions/chros",
        rows: [
            "People, not policy, up front with live readiness per employee",
            "Care that's always on: real-time location and proactive safety",
            "Fairness by design with HRIS team compliance and one standard",
        ],
    },
]

// The persona table covers the four personas named in the structure doc.
// CHROs and Managers are covered by the six views above rather than repeated
// here, which is what the doc specifies.
const PERSONA_TABLE: string[][] = [
    ["Employees", "Their own trip, inside policy", "Ask once, book in policy, keep moving", "Personal travel on the same agent", "Self-serve, agent-led"],
    ["Admins", "Policy, approval routing, profiles", "Set the rule once, enforced at search", "One dashboard for the program", "Rule-based, by exception"],
    ["Finance", "Chart of accounts, spend ceilings, sign-off", "Committed spend visible at booking", "20-30% wholesale savings", "Continuous reconciliation"],
    ["Travel leads", "Supplier program, group travel, analytics", "Run a program, not a booking queue", "Direct supply through Mondee", "Program-level, by exception"],
]

// A face per row of the table above — same order as PERSONA_TABLE. MiniTable
// itself is shared with V2 (WhyMiraeeV2.tsx), so the photos are rendered here
// as a strip above the table rather than inside the shared component.
const PERSONA_PHOTOS: [string, string][] = [
    [employeePersonaPhoto, "Employee"],
    [adminPersonaPhoto, "Admin"],
    [financePersonaPhoto, "Finance"],
    [travelLeadPersonaPhoto, "Travel lead"],
]

const DUTY_ROWS: [string, string][] = [
    ["Real-time location", "Know where every traveler is, from booked segments and check-ins, with role-based access."],
    ["Risk monitoring", "Disruption, weather and advisory alerts matched to itineraries."],
    ["Instant response", "Rebook, reroute or reach a human from the same thread."],
    ["Audit-ready records", "Every action logged with actor, rule, time and cost."],
]

export default function V4Solutions() {
    const isMobile = useWindowWidth() < 900

    return (
        <V4Page
            title="Solutions by Role and Use Case | Miraee"
            description="One platform, six views. What changes for employees, finance, travel leads, admins, CHROs and managers, plus every kind of company travel.">

            <V4Hero
                eyebrow="Solutions"
                title={<>Six views.<br /><em>What changes, role by role.</em></>}
                lede="Same trip. A different problem solved for each of you."
                image={{ src: solutionsPhoto, alt: "Colleagues walking together outside the office" }}
                card={{ src: solutionsCard, alt: "Sample expense feed: flight, hotel and meals auto-coded, two flagged for policy" }} />

            <SixViews roles={ROLES} isMobile={isMobile} />

            <section className="v4-section" id="personas" aria-labelledby="personas-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Persona table</span>
                        <h2 className="v4-h2" id="personas-title">Control, benefit and model, side by side.</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="v4-persona-faces" style={{ marginTop: 28 }}>
                            {PERSONA_PHOTOS.map(([photo, label]) => (
                                <div className="v4-persona-faces__item" key={label}>
                                    <img src={photo} alt="" aria-hidden="true" />
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 16 }}>
                            <MiniTable
                                headers={["Persona", "What they control", "What changes", "The perk", "Operating model"]}
                                rows={PERSONA_TABLE}
                                caption="What each persona controls and gains" />
                        </div>
                    </Reveal>
                </div>
            </section>

            <UseCasesShowcase />

            <section className="v4-section" id="duty-of-care" aria-labelledby="duty-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Duty of care</span>
                        <h2 className="v4-h2" id="duty-title">Your people travel everywhere. No one is ever alone out there.</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="v4-steps" style={{ marginTop: 36 }}>
                            {DUTY_ROWS.map(([title, copy], index) => (
                                <div className="v4-step" key={title}>
                                    <b className="v4-step__num">0{index + 1}</b>
                                    <h3>{title}</h3>
                                    <p>{copy}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                    <Reveal>
                        <p className="v4-foot-note" style={{ marginTop: 24 }}>*Savings of 20 to 30% against published fares on comparable itineraries. Based on itineraries booked, compared with publicly available fares for the same route, travel date, cabin, and booking window. Individual results may vary by route, lead time, and travel mix.</p>
                    </Reveal>
                </div>
            </section>

            <V4Cta title="Bring a real trip." body="Twenty minutes with your policy and your routes, from whichever seat you sit in." />
        </V4Page>
    )
}
