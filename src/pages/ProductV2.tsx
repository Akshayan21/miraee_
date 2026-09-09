import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { V2Footer } from "../components/LegalFormKit"
import { Faq, Reveal, V2Nav } from "../components/V2Kit"
import { usePageMeta } from "../hooks/usePageMeta"
import financeDashboard from "../assets/ui-admin-dashboard.png"
import miraeeMobileUi from "../assets/miraee-mobile-phone.png"
import supplierCabin from "../assets/miraee-supplier-cabin.webp"
import "./HomeV2Light.css"
import "./SubpagesV2.css"
import "./ProductV2.css"
import "./V2AlternatingSections.css"

const contextLayers = [
    { number: "01", title: "Traveler context", copy: "Preferences, loyalty programs, seat and cabin history, dietary and access needs, the routes they fly most, and seat preferences. Asked once. Applied always." },
    { number: "02", title: "Company context", copy: "Per diem policy enforcement, corporate card expense management, budget ownership, approval chains, preferred suppliers, entity and cost centre. Set once. Enforced everywhere." },
    { number: "03", title: "Trip state", copy: "Every search, decision, booking, change, payment and receipt - live, in one place, for the whole life of the trip." },
] as const

type Capability = {
    id: string
    number: string
    label: string
    title: string
    trigger: string
    action: string
    control: string
    proof: string
}

const capabilities: Capability[] = [
    {
        id: "plan", number: "01", label: "Plan", title: "Describe the trip. Get the itinerary.",
        trigger: "A sentence: “Singapore next Tuesday, back Friday, window seat, within policy.”",
        action: "The agent reads the intent, checks the calendar, searches live inventory, and applies company policy per employee role before options appear. It returns one recommended journey with alternates, each already compliant with policy.",
        control: "The employee chooses from options that are already compliant. Your program sets approval thresholds, preferred suppliers, and which trips need sign-off before booking.",
        proof: "< 60s to a per diem policy-enforced itinerary",
    },
    {
        id: "book", number: "02", label: "Book", title: "One approval. Everything booked together.",
        trigger: "Approval of the recommended journey, or automatic booking when the trip sits inside limits you have already set.",
        action: "Books flight, hotel, rail and car as one trip rather than four transactions. Applies wholesale rates, issues a virtual card for the booking, and syncs the itinerary to the traveler's calendar.",
        control: "Payment method and virtual card rules. Entity and cost centre allocation. What may be booked without human review.",
        proof: "20–30% below published fares*",
    },
    {
        id: "expense", number: "03", label: "Expense", title: "The report writes itself.",
        trigger: "The transaction. Nothing needs to be submitted.",
        action: "Captures the receipt, codes the expense to the right category, entity and cost centre, matches it to the original booking, processes the invoice, and posts it to your ERP - AI expense management and automated expense reporting that runs end to end.",
        control: "Chart of accounts mapping. Coding rules. Exception thresholds. Final approval before posting, if you want it.",
        proof: "0 forms filed by the traveler",
    },
    {
        id: "change", number: "04", label: "Change", title: "The trip changes. Employees get one decision.",
        trigger: "A cancellation, a delay, a schedule change, or a message from the traveler.",
        action: "Detects the disruption, often before the airline notifies, finds alternatives, prices each against cost and policy, and brings back one clear recommendation. Inside pre-agreed limits, it simply rebooks and informs employees.",
        control: "What the agent may rebook without asking. Spend ceilings for autonomous changes. Who gets notified, and when.",
        proof: "97% of the journey agent-managed",
    },
    {
        id: "support", number: "05", label: "Continuous support", title: "A real person, in the same thread.",
        trigger: "Anything the traveler would rather hand to a human.",
        action: "Escalates to a travel specialist with the full trip context already attached: every search, booking, policy check and change. The traveler never re-explains the trip.",
        control: "Escalation rules. Which trip types, travelers or regions always route to a human first.", proof: "24/7 human support",
    },
    {
        id: "personal", number: "06", label: "Personal travel", title: "The same agent. Separate spend.",
        trigger: "A personal trip request, in the same conversation as the work ones.",
        action: "Plans and books it on the traveler's own card, with corporate rates applied where your agreements permit. Company money is never touched and personal trips never enter company reporting - bleisure travel without the reporting headache.",
        control: "Whether personal travel is enabled at all, and which negotiated rates extend to it.", proof: "1 agent, 2 ledgers",
    },
]

const workflow = [
    { number: "01", label: "Understands intent", worksOut: "Dates and flexibility, cabin and seat preference, the policy band for that route and grade, calendar conflicts, and whether approval is required at all.", see: "One recommended journey, two alternates, and the policy status of each.", proof: "< 60 sec" },
    { number: "02", label: "Completes the work", worksOut: "Which fare and rate combination is cheapest as a whole trip rather than segment by segment, which card to issue, and who needs to know.", see: "One approval. Then a confirmed trip in the calendar.", proof: "One approval" },
    { number: "03", label: "Stays ahead", worksOut: "Every segment is monitored continuously. Disruption is detected and alternatives are priced against policy before anyone asks.", see: "A notification that it is handled, or one decision if it genuinely needs you.", proof: "24/7" },
    { number: "04", label: "Closes the loop", worksOut: "Receipts matched, expenses coded, transactions reconciled, and entries posted to the ERP.", see: "The account is managed and the invoice is processed automatically.", proof: "Zero forms" },
] as const

const agents = [
    ["01", "Booking agent", "Searches live inventory, assembles the trip, issues payment, confirms."],
    ["02", "Policy agent", "Reads your rules and applies them before options are shown, not after they are chosen."],
    ["03", "Negotiation agent", "Works wholesale contracts and direct connections to price the trip below published fares."],
    ["04", "Rebooking agent", "Watches every segment and resolves disruption inside the limits you set."],
    ["05", "Expense agent", "Captures, codes, matches and reconciles without the traveler touching a form."],
    ["06", "Support agent", "Routes to a human with the full trip context attached."],
] as const

const supplyAdvantages = [
    ["01", "Global content", "Millions of hotels and airline partners, sourced through direct connections and wholesale agreements rather than resold inventory.", "2M+ hotels"],
    ["02", "Wholesale economics", "Negotiated rates that travel with the trip, applied automatically at booking rather than claimed back later.", "500+ airlines"],
    ["03", "Reach", "The Tabhi network already serves a traveler base at global scale. That volume is what makes the rates possible.", "125M+ travelers reached"],
    ["04", "Local experiences", "Festivals, performances, markets and makers - content that no corporate channel has ever carried.", "Hyperlocal"],
] as const

const integrations = [
    ["Identity", "SSO, SAML, SCIM, Okta, Entra", "Provision and deprovision travelers automatically. No orphaned accounts."],
    ["People", "HRIS", "Grades, entities, cost centres and managers stay current without manual upkeep."],
    ["Finance", "ERP, accounting systems, card networks", "Automated expense reporting end to end. Coded expenses post directly, corporate card expenses are managed automatically, and accounts payable is reconciled at source."],
    ["Work", "Calendar, email, chat", "Itineraries and changes appear where people already work."],
] as const

const generations = [
    ["Legacy TMC", "Expert humans brokering complex trips, with negotiated rates and real support behind them.", "Offline, slow, and priced per transaction, so the vendor earned more the more friction there was."],
    ["First-generation T&E", "Self-serve booking and digital expense, which removed the phone call and paper receipt.", "The work moved to the traveler. Booking, approval, changes and expense stayed in four separate stages with four separate owners."],
    ["Agentic", "The stages collapse. One agent carries one context from request to reconciliation.", "Nothing is handed off."],
] as const

const faqs: [string, ReactNode][] = [
    ["What is Miraee?", <>Miraee is an AI-native <strong>employee travel platform</strong> that plans, books, changes and expenses business trips end to end. Rather than connecting a booking tool to an expense tool, Miraee runs the entire journey as one continuous travel and expense management system, so the same agent that plans a trip also rebooks it during disruption and closes the expense afterwards.</>],
    ["How is Miraee different from a travel management company?", <>A <strong>travel management company</strong> processes bookings and charges per transaction, with changes and support billed separately. Miraee is software: it understands a request in natural language, applies company policy before showing options, books the whole trip as one item, and handles changes and expenses automatically. Human travel specialists are included rather than charged per call.</>],
    ["What does it mean that Miraee uses AI agents?", "Miraee runs a multi agent AI system: bounded, permissioned workers that complete tasks rather than answer questions. Separate agents own booking, policy, negotiation, rebooking, expense and support, and all of them read the same trip thread. Each agent has a written limit on what it may do without human approval, and every action it takes is logged."],
    ["Does Miraee enforce our travel policy automatically?", "Yes. Miraee enforces travel policy compliance automatically, applying company policy before search results are shown, so travelers see options that are already in policy rather than discovering violations at approval. Policy can be set by route, grade, trip type and entity, and out-of-policy requests are either flagged for review or blocked, depending on how the rules are configured."],
    ["Do travelers still have to file expense reports?", "No. Miraee captures the receipt at the point of transaction, codes it to the correct category, entity and cost centre, matches it against the original booking, and posts it to the finance system, making the expense reimbursement process easier. Travelers do not submit reports and finance teams do not chase receipts - this is automated expense reporting, not a task travelers manage."],
    ["What happens when a flight is cancelled or delayed?", "Miraee monitors every segment of every trip continuously and detects most disruptions before the airline notifies the traveler. The agent finds alternatives, prices each against company policy, and either rebooks automatically inside limits you have set or presents one clear recommendation for approval."],
    ["Can employees book personal travel through Miraee?", "Yes. The same agent plans personal trips using the traveler's own payment card, with corporate negotiated rates applied where supplier agreements permit. Personal spend never enters company reporting and company funds are never used, so business and personal travel stay entirely separate while sharing one experience - this is how Miraee supports bleisure travel without adding a second process."],
    ["What travel inventory does Miraee have access to?", "Miraee books flights, hotels, rail and car hire from live inventory sourced through direct supplier connections and wholesale agreements held by the Tabhi group, covering over 500 airlines and more than two million hotels. It also carries hyperlocal experience content that is not available through other corporate travel channels."],
    ["Which systems does Miraee integrate with?", "Miraee connects to identity providers via SSO and SCIM, to HRIS platforms for traveler and cost centre data, to ERP and accounting systems for expense posting, to corporate card networks for payment, and to calendar and messaging tools for itineraries."],
    ["How long does implementation take?", "Pilots reach full deployment in as little as 90 days."],
]

export default function ProductV2() {
    usePageMeta(
        "One Agent for the Entire Business Trip",
        "Miraee is travel management software that unifies corporate travel and expense management, live travel spend analytics, and outcomes into one AI-native platform, so the systems that used to fight each other finally work as one.",
    )

    return (
        <div className="m-site pv2-site">
            <a className="m-skip" href="#main">Skip to content</a>
            <V2Nav active="/product" />
            <main id="main">
<section className="pv2-hero m-section--light" aria-labelledby="platform-hero-title">
                    <div className="pv2-shell pv2-hero__grid">
                        <Reveal className="pv2-hero__copy">
                            <p className="m-eyebrow">THE PLATFORM</p>
                            <h1 id="platform-hero-title">One system.<br /><em>The entire journey.</em></h1>
                            <p>Six capabilities running on one continuous context inside a single corporate travel platform. Miraee doesn't pass your trip between tools. It carries it.</p>
                            <div className="m-actions">
                                <Link to="/book-a-demo">See Miraee live <span aria-hidden="true">↗</span></Link>
                                <a href="#capabilities">Jump to a capability <span aria-hidden="true">↓</span></a>
                            </div>
                            <div className="pv2-hero__chips" aria-label="Platform capabilities">
                                {["Plan", "Book", "Expense", "Change", "Support", "Personal"].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
                            </div>
                        </Reveal>
                    </div>
                </section>

                <section className="pv2-section pv2-context" aria-labelledby="context-title">
                    <div className="pv2-shell">
                        <Reveal className="pv2-heading"><div><p className="m-eyebrow">ONE CONTINUOUS CONTEXT</p><h2 id="context-title">The context never resets.</h2></div><p>Integrated tools pass records to each other. Miraee holds a single thread as one travel and expense management system, so the agent that plans your trip is the agent that rebooks it, and the same agent that closes the expense.</p></Reveal>
                        <div className="pv2-context__grid">
                            {contextLayers.map((item, index) => <Reveal className={`pv2-context__item pv2-context__item--${index + 1}`} key={item.title} delay={index * .05}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p></Reveal>)}
                        </div>
                        <Reveal className="pv2-context__close"><div>{["One thread", "One policy layer", "One data layer"].map(item => <span key={item}>{item}</span>)}</div><p>Integration moves data between systems. Continuous context means there was never a second system.</p></Reveal>
                    </div>
                </section>

                <section id="capabilities" className="pv2-section pv2-capabilities" aria-labelledby="capabilities-title">
                    <div className="pv2-shell">
                        <Reveal className="pv2-heading"><div><p className="m-eyebrow">SIX CAPABILITIES</p><h2 id="capabilities-title">One journey.<br />Six jobs completed.</h2></div><p>Each capability owns a distinct part of the trip while reading the same traveler, company, and journey context.</p></Reveal>
                        <nav className="pv2-capability-nav" aria-label="Jump to a platform capability">
                            {capabilities.map(item => <a key={item.id} href={`#${item.id}`}><span>{item.number}</span>{item.label}</a>)}
                        </nav>
                        <div className="pv2-capability-list">
                            {capabilities.map(item => (
                                <Reveal className="pv2-capability" id={item.id} key={item.id}>
                                    <div className="pv2-capability__number"><span>{item.number}</span><small>{item.label}</small></div>
                                    <div className="pv2-capability__content"><h3>{item.title}</h3><dl><div><dt>What triggers it</dt><dd>{item.trigger}</dd></div><div><dt>What the agent does</dt><dd>{item.action}</dd></div><div><dt>What you control</dt><dd>{item.control}</dd></div></dl><strong className="pv2-proof">{item.proof}</strong></div>
                                </Reveal>
                            ))}
                        </div>
                        <Reveal className="pv2-savings"><div><span>20–30%</span><p>below published fares*</p></div><div><p className="m-eyebrow">THE CANONICAL DEFINITION</p><h3>Savings, defined once.</h3><p>Savings of 20–30% against published fares on comparable itineraries, achieved through wholesale rates and direct supplier connections.</p><small>*Based on itineraries booked, compared with publicly available fares for the same route, travel date, cabin, and booking window. Individual results may vary by route, lead time, and travel mix.</small></div></Reveal>
                    </div>
                </section>

<section id="how-it-works" className="pv2-how m-section--dark" aria-labelledby="how-title">
                    <div className="pv2-shell">
                        <Reveal className="pv2-how__head"><div><p className="m-eyebrow">HOW IT WORKS</p><h2 id="how-title">Ask once.<br />Keep moving.</h2></div><p>One request. Four stages. No restarts, no repeating yourself, no managing the process.</p></Reveal>
                        <Reveal className="pv2-how__ask"><span>The ask</span><blockquote>“Singapore next Tuesday. Window seat. Within policy.”</blockquote></Reveal>
                        <div className="pv2-how__steps">
                            {workflow.map((step, index) => <Reveal className="pv2-how__step" key={step.number} delay={index * .05}><span>{step.number}</span><small>{step.label}</small><div><b>Agent works out</b><p>{step.worksOut}</p></div><div><b>You see</b><p>{step.see}</p></div><strong>{step.proof}</strong></Reveal>)}
                        </div>
                        <Reveal className="pv2-how__state"><span>Journey state</span><strong>Everything handled.</strong><p>Plan · book · protect · expense</p></Reveal>
                    </div>
                </section>

                <section className="pv2-section pv2-architecture" aria-labelledby="architecture-title">
                    <div className="pv2-shell">
                        <Reveal className="pv2-heading"><div><p className="m-eyebrow">THE ARCHITECTURE</p><h2 id="architecture-title">Not one agent.<br />A workforce.</h2></div><p>Specialized agents, each owning a job, all reading the same thread - a multi agent AI system built for travel, not a single assistant wearing different hats. They don't answer questions; they complete work.</p></Reveal>
                        <Reveal className="pv2-agent-system"><div className="pv2-agent-system__core"><span>One continuous context</span><strong>6 specialized agents in production</strong></div><div className="pv2-agent-system__list">{agents.map(([number, title, copy]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></Reveal>
                        <Reveal className="pv2-agent-definition"><span>Definition</span><p>An agent is a bounded, permissioned worker with one job, its own tools, and a written limit on what it may do alone.</p></Reveal>
                    </div>
                </section>

                <section className="pv2-supply" aria-labelledby="supply-title">
                    <div className="pv2-supply__media"><img src={supplierCabin} alt="Business traveler receiving service in an aircraft cabin" loading="lazy" /></div>
                    <div className="pv2-supply__content">
                        <Reveal><p className="m-eyebrow">THE MONDEE ADVANTAGE</p><h2 id="supply-title">Global reach.<br />Personal execution.</h2><p>Miraee runs on Tabhi's own supply marketplace, Mondee - the supply depth behind enterprise travel solutions that others resell rather than own. Its inventory is full of wholesale contracts, direct connections, and hyperlocal content that nobody else has digitized.</p></Reveal>
                        <div className="pv2-supply__rows">{supplyAdvantages.map(([number, title, copy, proof], index) => <Reveal key={title} delay={index * .04}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><strong>{proof}</strong></Reveal>)}</div>
                        <Reveal className="pv2-supply__close"><p>Most platforms compete on software.</p><strong>We compete on software and supply.</strong></Reveal>
                    </div>
                </section>

                <section className="pv2-section pv2-integrations" aria-labelledby="integrations-title">
                    <div className="pv2-shell">
                        <Reveal className="pv2-heading"><div><p className="m-eyebrow">CONNECTED SYSTEMS</p><h2 id="integrations-title">Fits the stack<br />you already run.</h2></div><p>Identity, people, finance and work tools, connected once, then quiet.</p></Reveal>
                        <div className="pv2-integrations__grid">{integrations.map(([category, connects, action], index) => <Reveal key={category} delay={index * .04}><span>0{index + 1}</span><h3>{category}</h3><strong>{connects}</strong><p>{action}</p></Reveal>)}</div>
                        <Reveal className="pv2-interoperability"><div><p className="m-eyebrow">AGENTIC INTEROPERABILITY</p><h3>Bring Miraee into the tools your teams already use.</h3></div><p>Ask for a trip status, approve a booking, or pull a spend report without leaving the assistant you already have open. Everything in one chat - just command.</p></Reveal>
                    </div>
                </section>

                <section className="pv2-generation" aria-labelledby="generation-title">
                    <div className="pv2-shell">
                        <Reveal className="pv2-generation__head"><p className="m-eyebrow">MIRAEE VS LEGACY TMCS</p><h2 id="generation-title">Built different from the tools you're used to.</h2><p>While other tools solve parts of the journey, Miraee sits distinctly apart. Here's how the operating model changed.</p></Reveal>
                        <div className="pv2-generation__grid">{generations.map(([name, solved, left], index) => <Reveal className={index === 2 ? "is-agentic" : ""} key={name} delay={index * .05}><span>0{index + 1}</span><h3>{name}</h3><div><small>What it solved</small><p>{solved}</p></div><div><small>What it left behind</small><p>{left}</p></div></Reveal>)}</div>
                        <Reveal className="pv2-generation__close"><span>The new generation of travel planning.</span><strong>Powered by agentic AI.</strong></Reveal>
                    </div>
                </section>

                <section className="pv2-section pv2-surfaces" aria-labelledby="surfaces-title">
                    <div className="pv2-shell">
                        <Reveal className="pv2-heading"><div><p className="m-eyebrow">ONE PLATFORM · TWO VIEWS</p><h2 id="surfaces-title">A console for the program.<br />An app for the trip.</h2></div><p>The same journey context, shaped around the work each person needs to do.</p></Reveal>
                        <div className="pv2-surfaces__layout">
                            <Reveal className="pv2-surface pv2-surface--console"><div><span>01 · WEB CONSOLE</span><h3>For finance and travel teams</h3><p>Policy, approvals, live spend, duty of care, reporting, and the supplier program.</p></div><img src={financeDashboard} alt="Miraee admin dashboard showing travel spend, compliance, and active trips" loading="lazy" /></Reveal>
                            <Reveal className="pv2-surface pv2-surface--app" delay={.08}><div><span>02 · MOBILE APP</span><h3>For travelers</h3><p>Ask, book, change, support, receipts, personal trips, and the live itinerary.</p></div><img className="pv2-mobile-mockup" src={miraeeMobileUi} alt="Miraee mobile app showing an AI travel assistant and flight options" loading="eager" decoding="async" /></Reveal>
                        </div>
                    </div>
                </section>

                <section className="pv2-section pv2-faq" aria-labelledby="faq-title">
                    <div className="pv2-shell pv2-faq__grid"><Reveal className="pv2-faq__intro"><p className="m-eyebrow">FAQ</p><h2 id="faq-title">The platform,<br />answered clearly.</h2><p>How the system works, what it controls, and what implementation looks like.</p></Reveal><Reveal><Faq items={faqs} /></Reveal></div>
                </section>

                <section className="m-cta pv2-cta"><Reveal><p className="m-eyebrow">SEE THE AGENT IN ACTION</p><h2>Bring a real trip.</h2><p>Twenty minutes. Your route, your policy, your edge cases. We'll run it live.</p><Link to="/book-a-demo">Book your demo <span aria-hidden="true">↗</span></Link></Reveal></section>
            </main>
            <V2Footer />
        </div>
    )
}
