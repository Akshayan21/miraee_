import { type ReactNode, type CSSProperties, useState } from "react"
import { motion } from "framer-motion"
import { V4Page, V4Cta, Reveal, Faq } from "../../components/V4Kit"
import { PlatformHeroV1, TwoViewsV1, OutcomesV1, SavingsV3, IntegrationsV1, MondeeAdvantageV2, TMCGenerationsV2 } from "./RefSections"
import { Capabilities } from "./V0Sections"
import supplyImage from "../../assets/supply_image.png"
import ledgerImage from "../../assets/Booking_image.png"
import avatarImg from "../../assets/Avatar.png"
import wholeTripImage from "../../assets/whole trip.webp"
import learnsYouImage from "../../assets/tarvel that learns you.jpg"
import enterpriseImage from "../../assets/Entreprices control.png"
import chatMasterGif from "../../assets/CHAT MASTER.gif"
import "../SubpagesV2.css"
import "./V4.css"

const PERSONALIZATION_KNOWS = ["Who the traveler is", "Company travel policy", "Seat preferences", "Airline & hotel preferences", "Loyalty programs", "Previous behavior", "Office & location context", "Preferred timings"]

// Platform. Section order:
//   Hero → less work, better journeys → one platform, two views (V1) →
//   six capabilities → savings that compound (V3) → savings, defined once →
//   fits the systems you already run (V1) → Mondee/Tabhi trust bar (V2) →
//   Miraee vs legacy TMCs (V2) → the platform adapts (duty of care,
//   reporting, onboarding) → FAQs.

// Real mini-visualizations instead of a single line-icon each — a small
// live map, a bar chart and a progress ring, each echoing the card's own
// tag ("one live map", "exportable in one click", "live completion %").
const VISUAL_MAP = (
    <div className="v4-mini-map" aria-hidden="true">
        <span className="v4-mini-map__route" />
        <span className="v4-mini-map__pin v4-mini-map__pin--a" />
        <span className="v4-mini-map__pin v4-mini-map__pin--b" />
        <span className="v4-mini-map__pin v4-mini-map__pin--c is-active"><i /></span>
    </div>
)
const VISUAL_CHART = (
    <div className="v4-mini-chart" aria-hidden="true">
        {[38, 62, 46, 80, 55].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className={i === 3 ? "is-accent" : undefined} />
        ))}
    </div>
)
const VISUAL_PROGRESS = (
    <div className="v4-mini-ring" aria-hidden="true">
        <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" className="v4-mini-ring__track" />
            <circle cx="32" cy="32" r="26" className="v4-mini-ring__fill" />
        </svg>
        <span className="v4-mini-ring__label">72%</span>
    </div>
)

const ADAPTIVE_FEATURES: [ReactNode, string, string, string][] = [
    [VISUAL_MAP, "Live location tracking, real reassurance.", "See every active traveler on one live map, with itinerary changes flagged in real time. Built for duty of care, so teams always know where travelers are headed when it matters most.", "Real-time, one live map"],
    [VISUAL_CHART, "Your travel data, read your way.", "Get tailored reports on spend, compliance, savings and reimbursements by team, entity or route. Export insights instantly without wrestling with spreadsheets.", "Exportable in one click"],
    [VISUAL_PROGRESS, "Guided self-setup & onboarding", "A guided self-service setup lets employees build their travel profiles, with live progress tracking. Simple onboarding, with no implementation team required.", "Live completion %"],
]

const FAQS: [string, ReactNode][] = [
    ["What is Miraee?", "Miraee is an AI-native employee travel platform that plans, books, changes and expenses business trips end to end. Rather than connecting a booking tool to an expense tool, Miraee runs the entire journey as one continuous travel and expense management system, so the same agent that plans a trip also rebooks it during disruption and closes the expense afterwards."],
    ["How is Miraee different from a travel management company?", "A travel management company processes bookings and charges per transaction, with changes and support billed separately. Miraee is software: it understands a request in natural language, applies company policy before showing options, books the whole trip as one item, and handles changes and expenses automatically. Human travel specialists are included rather than charged per call."],
    ["What does it mean that Miraee uses AI agents?", "Miraee runs a multi agent AI system: bounded, permissioned workers that complete tasks rather than answer questions. Separate agents own booking, policy, negotiation, rebooking, expense and support, and all of them read the same trip thread. Each agent has a written limit on what it may do without human approval, and every action it takes is logged."],
    ["Does Miraee enforce our travel policy automatically?", "Yes. Miraee applies company policy before search results are shown, so travelers see options that are already in policy rather than discovering violations at approval. Policy can be set by route, grade, trip type and entity, and out-of-policy requests are either flagged for review or blocked, depending on how the rules are configured."],
    ["Do travelers still have to file expense reports?", "No. Miraee captures the receipt at the point of transaction, codes it to the correct category, entity and cost centre, matches it against the original booking, and posts it to the finance system. Travelers do not submit reports and finance teams do not chase receipts."],
    ["What happens when a flight is cancelled or delayed?", "Miraee monitors every segment of every trip continuously and detects most disruptions before the airline notifies the traveler. The agent finds alternatives, prices each against company policy, and either rebooks automatically inside limits you have set or presents one clear recommendation for approval."],
    ["Can employees book personal travel through Miraee?", "Yes. The same agent plans personal trips using the traveler's own payment card, with corporate negotiated rates applied where supplier agreements permit. Personal spend never enters company reporting and company funds are never used, so business and personal travel stay entirely separate while sharing one experience."],
    ["What travel inventory does Miraee have access to?", "Miraee books flights, hotels, rail and car hire from live inventory sourced through direct supplier connections and wholesale agreements held by the Tabhi group, covering over 500 airlines and more than two million hotels. It also carries hyperlocal experience content that is not available through other corporate travel channels."],
    ["Which systems does Miraee integrate with?", "Miraee connects to identity providers via SSO and SCIM, to HRIS platforms for traveler and cost centre data, to ERP and accounting systems for expense posting, to corporate card networks for payment, and to calendar and messaging tools for itineraries."],
    ["How long does implementation take?", "Pilots reach full deployment in as little as 90 days."],
]

// "What sets us apart" — six-card bento below the Mondee/Tabhi trust bar.
// Each card carries a large translucent ghost numeral (same device
// StepPanel/RefSections use elsewhere for a section's own number) plus a
// small line icon, so the grid reads as a deliberate system rather than six
// interchangeable text blocks.
const APART_ICON_AGENTS = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
    </svg>
)
const APART_ICON_CONVO = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="4.5" width="17" height="12" rx="3" />
        <path d="M8.5 16.5v3l3.7-3M8 9h8M8 12h5.5" />
    </svg>
)
const APART_ICON_LEARNS = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="8" r="3.5" /><path d="M3.5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
        <path d="M19 3v4M17 5h4" />
    </svg>
)
const APART_ICON_LEDGER = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
        <path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" />
        <path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" />
    </svg>
)
const APART_ICON_SHIELD = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 19.5 6v6c0 4.6-3.1 7.7-7.5 8.9-4.4-1.2-7.5-4.3-7.5-8.9V6L12 3Z" />
        <path d="M8.75 12.2 11 14.5l4.5-4.9" />
    </svg>
)
const APART_ICON_SUPPLY = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 8.5 3.5 12l3.5 3.5M17 8.5 20.5 12 17 15.5" />
        <path d="M14 6.5 10 17.5" />
    </svg>
)

const WHAT_SETS_APART: { icon: ReactNode; title: string; body: string; accent?: "orange" | "maroon"; image?: string; imagePosClosed?: string; imagePosActive?: string }[] = [
    { icon: APART_ICON_AGENTS, title: "Agentic by design, not AI as a feature", body: "Six agents do the searching, matching and reconciling. Decisions that carry cost or risk still come to you.", image: avatarImg, imagePosClosed: "50% 20%", imagePosActive: "50% 22%" },
    { icon: APART_ICON_CONVO, title: "Whole trip in one conversation", body: "Describe it in a sentence; it comes back planned, priced and in policy. No tabs, no report to file. The conversation is the workflow.", accent: "orange", image: wholeTripImage, imagePosClosed: "37% 15%", imagePosActive: "37% 20%" },
    { icon: APART_ICON_LEARNS, title: "Travel that learns you", body: "Preferred airlines, seats, hotels and timing, applied from the first result. Personal identity stays separate from account login.", accent: "maroon", image: learnsYouImage, imagePosClosed: "43% 18%", imagePosActive: "43% 22%" },
    { icon: APART_ICON_LEDGER, title: "One platform, one ledger, one source of truth", body: "Booking, policy, expense and reconciliation on one system. Every agent reads from real data, not tools stitched together.", accent: "orange", image: ledgerImage },
    { icon: APART_ICON_SHIELD, title: "Enterprise control, consumer ease", body: "A traveler experience people want to use, on governance the business trusts for full audit trails.", accent: "maroon", image: enterpriseImage },
    { icon: APART_ICON_SUPPLY, title: "Direct supply, better economics", body: "Wholesale and direct supply through Mondee, with the negotiation agent working the best rate on every booking.", accent: "orange", image: supplyImage },
]

function WhatSetsApart() {
    const [active, setActive] = useState(0)
    return (
        <section className="v4-section" id="apart" aria-labelledby="apart-title">
            <div className="v4-shell">
                <Reveal>
                    <span className="v4-eyebrow">What sets us apart</span>
                    <h2 className="v4-h2" id="apart-title">Not AI added to travel.<br /><em>Travel rebuilt around AI.</em></h2>
                    <p className="v4-lede">Most tools bolted a chatbot onto a booking engine. Miraee started from the agents up, so the whole trip runs as one system, and you stay the one who decides.</p>
                </Reveal>
                <div className="v4-apart-strip" role="tablist" onMouseLeave={() => setActive(0)}>
                    {WHAT_SETS_APART.map((item, i) => {
                        const isActive = i === active
                        return (
                            <motion.button
                                type="button"
                                role="tab"
                                aria-expanded={isActive}
                                key={item.title}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8% 0px" }}
                                transition={{ duration: 0.6, delay: i * 0.05 }}
                                className={"v4-apart-panel" + (isActive ? " is-active" : "") + (item.accent ? ` v4-apart-panel--${item.accent}` : "") + (item.image ? " v4-apart-panel--photo" : "")}
                                style={item.image ? {
                                    backgroundImage: `linear-gradient(180deg, rgba(43,10,13,.32) 0%, rgba(43,10,13,.8) 100%), url(${item.image})`,
                                    ...(item.imagePosClosed ? { "--apart-photo-pos": item.imagePosClosed } as CSSProperties : {}),
                                    ...(item.imagePosActive ? { "--apart-photo-pos-active": item.imagePosActive } as CSSProperties : {}),
                                } : undefined}
                                onClick={() => setActive(i)}
                                onMouseEnter={() => setActive(i)}
                            >
                                <span className="v4-apart-panel__icon" aria-hidden="true">{item.icon}</span>
                                <div className="v4-apart-panel__body">
                                    <h3>{item.title}</h3>
                                    <p>{item.body}</p>
                                </div>
                            </motion.button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default function V4Platform() {
    return (
        <V4Page
            title="Platform | Plan, Book, Expense, Change | Miraee"
            description="One AI-native platform for employee travel: six capabilities covering the whole journey, wholesale savings, and the integrations your stack already runs.">

            {/* V1's Product page hero, ported exactly (layout + animation) —
                see RefSections.tsx for the source citation (<V11Hero> at
                src/components/V11Hero.tsx, used by src/pages/Product.tsx). */}
            <PlatformHeroV1 />

            <section className="v4-section v4-section--tint" id="personalization" aria-labelledby="personalization-title">
                <div className="v4-shell v4-personalization-grid">
                    <Reveal>
                        <span className="v4-eyebrow">Built on context</span>
                        <h2 className="v4-h2" id="personalization-title">One sentence works because Miraee already knows.</h2>
                        <p className="v4-lede">No profile to fill out, no policy to look up. Every trip request lands on top of everything Miraee already holds about the traveler, the company, and the trip in progress.</p>
                        <div className="v4-context-grid">
                            {PERSONALIZATION_KNOWS.map((item, index) => (
                                <div className="v4-context-chip" key={item}>
                                    <span>{String(index + 1).padStart(2, "0")}</span>
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="v4-personalization-grid__media">
                            <img src={chatMasterGif} alt="Miraee chat recognizing a traveler's context mid-conversation" />
                        </div>
                    </Reveal>
                </div>
            </section>

            <OutcomesV1 />

            {/* V1's "One platform, two views" — see RefSections.tsx for the
                source citation (Product.tsx `TwoViews`). */}
            <TwoViewsV1 />

            {/* V0's orbital dial, ported exactly (layout + animation) -- see
                V0Sections.tsx for the source citation and what changed. Replaces
                the earlier card-grid version of the six capabilities; the mega
                menu's #plan...#personal links resolve to ids the dial itself sets
                (per-item ids on the mobile list; #capabilities on the desktop
                dial's scroll container -- scroll-linked, so a deep link lands at
                the top of the dial rather than a specific node). */}
            <Capabilities />

            <SavingsV3 />

            <section className="v4-section v4-section--tight-top" aria-labelledby="savings-note-title">
                <div className="v4-shell">
                    <Reveal>
                        <div className="v4-note">
                            <b>20-30%</b>
                            <div>
                                <h3 id="savings-note-title">Savings, defined once.</h3>
                                <p>Savings of 20 to 30% against published fares on comparable itineraries, achieved through wholesale rates and direct supplier connections.</p>
                                <p className="v4-foot-note">*Based on itineraries booked, compared with publicly available fares for the same route, travel date, cabin, and booking window. Individual results may vary by route, lead time, and travel mix.</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* V1's "Fits the systems you already run" — see RefSections.tsx
                for the source citation (Product.tsx `Integrations`). */}
            <IntegrationsV1 />

            {/* V2's Tabhi/Mondee-branded trust bar — see RefSections.tsx for
                the source citation (ProductV2.tsx `.pv2-supply`). */}
            <MondeeAdvantageV2 />

            <WhatSetsApart />

            {/* Moved directly below the bento on request — was previously
                further down, after TMCGenerationsV2. */}
            <section className="v4-section" id="adaptive" aria-labelledby="adaptive-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Platform depth</span>
                        <h2 className="v4-h2" id="adaptive-title">The Miraee platform adapts. So your people don't have to.</h2>
                    </Reveal>
                    <div className="v4-adaptive-grid">
                        {ADAPTIVE_FEATURES.map(([visual, title, body, tag], i) => (
                            <Reveal className="v4-adaptive-card v4-adaptive-card--visual" key={title} delay={i * 0.1}>
                                {visual}
                                <h3>{title}</h3>
                                <p>{body}</p>
                                <span className="v4-adaptive-card__tag">{tag}</span>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* V2's "Miraee vs legacy TMCs" — see RefSections.tsx for the
                source citation (ProductV2.tsx `.pv2-generation`). */}
            <TMCGenerationsV2 />

            <section className="v4-section v4-section--tint" id="faq" aria-labelledby="faq-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">FAQ</span>
                        <h2 className="v4-h2" id="faq-title">The platform, answered clearly.</h2>
                        <p className="v4-lede">How the system works, what it controls, and what implementation looks like.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 28 }}><Faq items={FAQS} /></div>
                    </Reveal>
                </div>
            </section>

            <V4Cta title="Bring a real trip." body="Twenty minutes with your policy and your routes. We'll show you the journey end to end." />
        </V4Page>
    )
}
