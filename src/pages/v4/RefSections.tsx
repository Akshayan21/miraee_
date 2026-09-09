import { useRef } from "react"
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Reveal } from "../../components/V4Kit"
import productPageImg from "../../assets/platform_hero.jpg"
import expenseCardGif from "../../assets/expense card.gif"
import financeDashboard from "../../assets/ui-admin-dashboard.png"
import miraeeMobileUi from "../../assets/miraee-mobile-phone.png"
import supplierCabin from "../../assets/miraee-supplier-cabin.webp"
import outcomeEmployeePhoto from "../../assets/Handle_every_change.jpg"
import outcomeFinancePhoto from "../../assets/Expense_loop.jpg"
import outcomeTravelTeamPhoto from "../../assets/Plan_Book.jpg"

// Verbatim ports of the sections the site-architecture doc names by version —
// layout, structure and reveal timing copied from the source, not
// re-interpreted through V4's generic card components.
//
//   PlatformHeroV1  Product page hero — from V1 (src/pages/Product.tsx:836,
//                   the shared <V11Hero> component at src/components/V11Hero.tsx)
//   TwoViewsV1  "One platform, two views" — from V1 Product page
//               src/pages/Product.tsx:594 (`TwoViews`)
//   IntegrationsV1  "Fits the systems you already run" — from V1 Product page
//               src/pages/Product.tsx:504 (`Integrations`)
//   UseCasesV11  "Every kind of trip your company takes" — from V1.1 For Teams
//               src/pages/ForTeams.tsx:547 (`UseCases`)
//   MondeeAdvantageV2  "The Mondee Advantage" (Tabhi/Mondee trust bar) — from V2
//               src/pages/ProductV2.tsx:198 (`.pv2-supply`)
//   TMCGenerationsV2  "Miraee vs legacy TMCs" — from V2 Product page
//               src/pages/ProductV2.tsx:215 (`.pv2-generation`)
//   OutcomesV1  "Less work, better journeys — from V1 homepage"
//               src/pages/HomeElegant.tsx:133 + .el-outcome* in HomeElegant.css
//   SecurityV1  "Fast for people. Safe for business — from V1 homepage"
//               src/pages/HomeElegant.tsx:135 + .el-security/.el-trust
//   SavingsV3   "Savings that compound on their own — V3"
//               src/pages/HomeV3.tsx:187 + .timeline/.stop in V3.css
//
// Colours are re-pointed at V4's --m-* tokens; every dimension, border, stagger
// delay and element order is unchanged from the source.

const heroEase = [0.16, 1, 0.3, 1] as const

export function PlatformHeroV1() {
    return (
        <section className="v4r-phero">
            <div className="v4r-phero__row">
                <motion.div className="v4r-phero__copy"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: heroEase }}>
                    <span className="v4r-phero__kicker">The Platform</span>
                    <h1>One system.<br /><em>The entire journey.</em></h1>
                    <p>Six capabilities running on one continuous context. Miraee does not pass your trip between tools. It carries it.</p>
                    <div className="v4r-phero__actions">
                        <Link className="v4-btn v4-btn--solid" to="/book-a-demo">Book a demo</Link>
                        <a className="v4-btn v4-btn--ghost" href="#capabilities">Jump to a capability ↓</a>
                    </div>
                    <div className="v4r-phero__proof">
                        {["500+ airlines", "2M+ hotels", "Under a minute to an itinerary", "24/7 human support"].map((p, i) => (
                            <span key={p} style={{ display: "contents" }}>
                                {i > 0 && <i />}
                                <span>{p}</span>
                            </span>
                        ))}
                    </div>
                    <div className="v4r-phero__chips">
                        {["PLAN", "BOOK", "EXPENSE", "CHANGE", "SUPPORT", "PERSONAL"].map(c => <span key={c}>{c}</span>)}
                    </div>
                </motion.div>
                <motion.div className="v4r-phero__media"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.12, ease: heroEase }}>
                    <img src={productPageImg} alt="Business traveler using Miraee during a journey" fetchPriority="high" decoding="async" />
                    <img className="v4r-phero__gif v4r-phero__gif--br" src={expenseCardGif} alt="Miraee automatically categorizing a trip expense" />
                </motion.div>
            </div>
        </section>
    )
}

// Product.tsx's own Reveal supports directional slide-in (left/right/none),
// unlike V4Kit's Reveal (fade-up only) — kept local so TwoViewsV1's split
// panels animate in from the sides exactly as they do in V1.
function DirReveal({ children, delay = 0, direction = "up" }: { children: ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none" }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.25 })
    const initMap = { up: { y: 48, opacity: 0 }, left: { x: -48, opacity: 0 }, right: { x: 48, opacity: 0 }, none: { opacity: 0 } }
    const init = initMap[direction]
    return (
        <motion.div ref={ref}
            initial={init}
            animate={inView ? { x: 0, y: 0, opacity: 1 } : init}
            transition={{ duration: 0.75, delay, ease: heroEase }}>
            {children}
        </motion.div>
    )
}

export function TwoViewsV1() {
    return (
        <section className="v4r-views">
            <div className="v4r-views__shell">
                <div className="v4r-views__head">
                    <DirReveal direction="none">
                        <span className="v4r-label">One Platform, Two Views</span>
                        <h2>Two access points.<br /><em>One experience.</em></h2>
                    </DirReveal>
                </div>
                <div className="v4r-views__grid">
                    <DirReveal direction="left">
                        <div className="v4r-view-card">
                            <div className="v4r-view-card__copy">
                                <span className="v4r-view-card__tag">Web console</span>
                                <div className="v4r-view-card__who">Who</div>
                                <div className="v4r-view-card__whoval">Finance and travel teams</div>
                                <div className="v4r-view-card__who">Holds</div>
                                <p>Policy, approvals, live spend, <strong>duty of care</strong>, reporting and exports.</p>
                            </div>
                            <div className="v4r-view-card__frame">
                                <div className="v4r-view-card__window">
                                    <div className="v4r-view-card__browser">
                                        <div className="v4r-view-card__dots">
                                            <span style={{ background: "#ED6A5E" }} />
                                            <span style={{ background: "#F4BF4F" }} />
                                            <span style={{ background: "#61C454" }} />
                                        </div>
                                        <div className="v4r-view-card__url">app.miraee.ai/overview</div>
                                    </div>
                                    <div className="v4r-view-card__shot">
                                        <img src={financeDashboard} alt="Miraee admin dashboard showing travel spend, compliance, and active trips" loading="lazy" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DirReveal>
                    <DirReveal direction="right" delay={0.1}>
                        <div className="v4r-view-card v4r-view-card--dark">
                            <div className="v4r-view-card__copy">
                                <span className="v4r-view-card__tag">Mobile app</span>
                                <div className="v4r-view-card__who">Who</div>
                                <div className="v4r-view-card__whoval">Travelers</div>
                                <div className="v4r-view-card__who">Holds</div>
                                <p>Ask, book, change, reach support, capture receipts, plan personal trips.</p>
                            </div>
                            <div className="v4r-view-card__phone">
                                <img src={miraeeMobileUi} alt="Miraee mobile app showing an AI travel assistant and flight options" loading="lazy" />
                            </div>
                        </div>
                    </DirReveal>
                </div>
            </div>
        </section>
    )
}

const INTEGRATION_CATS: { title: string; pills: string[]; body: string }[] = [
    { title: "Identity", pills: ["SAML", "OIDC", "SCIM", "Okta", "Microsoft Entra"], body: "SSO via SAML and OIDC, SCIM provisioning, Okta, Microsoft Entra." },
    { title: "People", pills: ["HRIS"], body: "HRIS for roles, cost centres and approval chains." },
    { title: "Finance", pills: ["ERP", "Accounting", "Card networks"], body: "ERP and accounting systems, corporate card and payment networks." },
    { title: "Work", pills: ["Calendar", "Email", "Chat"], body: "Calendar, email and chat, so trips start where the request happens." },
]

export function IntegrationsV1() {
    return (
        <section className="v4r-integrations" id="integrations">
            <div className="v4r-integrations__shell">
                <div className="v4r-integrations__head">
                    <DirReveal direction="none">
                        <span className="v4r-label">Connected Systems</span>
                        <h2>Fits the systems<br /><em>you already run.</em></h2>
                    </DirReveal>
                </div>
                <div className="v4r-integrations__grid">
                    {INTEGRATION_CATS.map((c, ci) => (
                        <DirReveal key={c.title} direction="up" delay={ci * 0.1}>
                            <div className="v4r-integration-card">
                                <div className="v4r-integration-card__title">{c.title}</div>
                                <div className="v4r-integration-card__pills">
                                    {c.pills.map((p, pi) => (
                                        <motion.div key={p}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: ci * 0.1 + pi * 0.06 }}
                                            whileHover={{ scale: 1.05, background: "var(--m-maroon)", color: "#FBF6F2" }}
                                            className="v4r-integration-card__pill">
                                            {p}
                                        </motion.div>
                                    ))}
                                </div>
                                <p>{c.body}</p>
                            </div>
                        </DirReveal>
                    ))}
                </div>
                <DirReveal delay={0.3} direction="none">
                    <div className="v4r-integrations__foot">
                        <Link to="/v4/technology">Unified API and developer sandbox →</Link>
                    </div>
                </DirReveal>
            </div>
        </section>
    )
}

// Ids match the mega menu's "By use case" deep links (V4NavData.ts).
const USE_CASES_V11: [string, string, string][] = [
    ["use-business", "Business travel", "End-to-end booking, changes and expense for everyday trips, inside policy without a queue."],
    ["use-events", "Meetings and events", "MICE, group booking, venue sourcing and attendee management on the same platform and ledger."],
    ["use-executive", "Executive travel", "White-glove handling with the agent learning preferences over time and a named human on call."],
    ["use-mobility", "Global mobility", "Cross-border travel for distributed teams, with entity-level policy, currency and data residency handled."],
    ["use-disruption", "Emergency and disruption", "Proactive rebooking, traveler location and one thread for the whole response."],
]

export function UseCasesV11() {
    return (
        <section className="v4r-usecases" id="use-cases">
            <div className="v4r-usecases__shell">
                <div className="v4r-usecases__head">
                    <Reveal>
                        <span className="v4r-label">Use cases</span>
                        <h2>Every kind of trip <em>your company takes.</em></h2>
                    </Reveal>
                </div>
                <div className="v4r-usecases__grid">
                    {USE_CASES_V11.map(([id, title, body], i) => (
                        <Reveal key={id} delay={i * 0.07}>
                            <div className="v4r-usecase-card" id={id}>
                                <div className="v4r-usecase-card__num">{String(i + 1).padStart(2, "0")}</div>
                                <h3>{title}</h3>
                                <p>{body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

const OUTCOMES: [string, string, string, string, string, string][] = [
    ["For employees", "Ask once. Get a complete, policy-safe trip.", "A trip that feels personal - not procedural.", "4.8/5", "traveler experience", outcomeEmployeePhoto],
    ["For finance", "See committed spend before it becomes an expense.", "Complete transparency over company expenditure.", "20-30%", "wholesale savings", outcomeFinancePhoto],
    ["For travel teams", "Set the rules once and run the program by exception.", "No more managing every single booking and update.", "24/7", "agent + human care", outcomeTravelTeamPhoto],
]

// Each row pins via `position: sticky` and the next row's higher z-index
// covers it as the page scrolls, so the card underneath needs to visibly
// recede rather than just vanish — scale and dim it down over the same
// scroll range the next card takes to arrive. Tracked per-card (not as one
// shared scroll range) because sticky elements don't share a scroll
// timeline the way a single pinned container's children would.
function OutcomeRow({ title, shift, expect, stat, statLabel, photo, index, total }: { title: string; shift: string; expect: string; stat: string; statLabel: string; photo: string; index: number; total: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isLast = index === total - 1
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "start 0.15"] })
    const reduced = useReducedMotion()
    const scale = useTransform(scrollYProgress, [0, 1], [1, reduced || isLast ? 1 : 0.93])
    const brightness = useTransform(scrollYProgress, [0, 1], [1, reduced || isLast ? 1 : 0.82])
    const filter = useTransform(brightness, b => `brightness(${b})`)
    return (
        <motion.div
            ref={ref}
            className="v4r-outcome-row"
            style={{ scale, filter, top: 96 + index * 6, zIndex: index + 1 }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="v4r-outcome-row__panel">
                <span className="v4r-outcome-row__num">0{index + 1}</span>
                <h3>{title}</h3>
                <p className="v4r-outcome-row__shift">{shift}</p>
                <p className="v4r-outcome-row__expect">{expect}</p>
            </div>
            <div className="v4r-outcome-row__media">
                <img src={photo} alt="" aria-hidden="true" />
                <div className="v4r-outcome-row__stat"><strong>{stat}</strong><small>{statLabel}</small></div>
            </div>
        </motion.div>
    )
}

export function OutcomesV1() {
    return (
        <section id="outcomes" className="v4r-outcomes">
            <Reveal className="v4r-section-head">
                <span>Designed for everyone</span>
                <h2>Less work.<br /><em>Better journeys.</em></h2>
            </Reveal>
            <div className="v4r-outcome-rows">
                {OUTCOMES.map(([title, shift, expect, stat, statLabel, photo], i) => (
                    <OutcomeRow key={title} title={title} shift={shift} expect={expect} stat={stat} statLabel={statLabel} photo={photo} index={i} total={OUTCOMES.length} />
                ))}
            </div>
        </section>
    )
}

const TRUST: [string, string][] = [
    ["SOC 2", "Operational controls"],
    ["SSO / SCIM", "Identity management"],
    ["GDPR", "Privacy by design"],
    ["Audit logs", "Every agent action"],
]

export function SecurityV1() {
    return (
        <section id="governance" className="v4r-security">
            <Reveal>
                <span className="v4r-label">Enterprise foundations</span>
                <h2>Fast for people.<br />Safe for the business.</h2>
                <p>Every action is governed, permissioned, traceable, and ready for enterprise controls.</p>
            </Reveal>
            <div className="v4r-security__grid">
                {TRUST.map(([mark, label], i) => (
                    <Reveal className="v4r-trust" key={mark} delay={i * 0.08}>
                        <i>0{i + 1}</i>
                        <b>{mark}</b>
                        <span>{label}</span>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

const LOOP: [string, string][] = [
    ["Employee chooses smart", "Miraee surfaces a better option and a price to beat."],
    ["Company saves", "Savings are captured and visible in real time."],
    ["Employee earns", "Rewards land in the Miraee Wallet."],
    ["Adoption grows", "More trips on Miraee, more savings next quarter."],
]

export function SavingsV3() {
    return (
        <section id="savings" className="v4-section">
            <div className="v4-shell">
                <Reveal>
                    <h2 className="v4-h2">Savings that compound on their own.</h2>
                    <p className="v4-lede">Miraee doesn't enforce savings with restrictive policy alone: it rewards the behavior that creates them.</p>
                </Reveal>
                <div className="v4r-timeline">
                    {LOOP.map(([title, copy]) => (
                        <Reveal className="v4r-stop" key={title}>
                            <span className="v4r-dot" />
                            <b>{title}</b>
                            <span>{copy}</span>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

const SUPPLY_ADVANTAGES: [string, string, string, string][] = [
    ["01", "Global content", "Millions of hotels and airline partners, sourced through direct connections and wholesale agreements rather than resold inventory.", "2M+ hotels"],
    ["02", "Wholesale economics", "Negotiated rates that travel with the trip, applied automatically at booking rather than claimed back later.", "500+ airlines"],
    ["03", "Reach", "The Tabhi network already serves a traveler base at global scale. That volume is what makes the rates possible.", "125M+ travelers reached"],
    ["04", "Local experiences", "Festivals, performances, markets and makers - content that no corporate channel has ever carried.", "Hyperlocal"],
]

export function MondeeAdvantageV2() {
    return (
        <section className="v4r-supply" aria-labelledby="supply-title">
            <div className="v4r-supply__media">
                <img src={supplierCabin} alt="Business traveler receiving service in an aircraft cabin" loading="lazy" />
            </div>
            <div className="v4r-supply__content">
                <Reveal>
                    <span className="v4r-supply__eyebrow">The Mondee Advantage</span>
                    <h2 id="supply-title">Global reach.<br />Personal execution.</h2>
                    <p>Miraee runs on Tabhi's own supply marketplace, Mondee - the supply depth behind enterprise travel solutions that others resell rather than own. Its inventory is full of wholesale contracts, direct connections, and hyperlocal content that nobody else has digitized.</p>
                </Reveal>
                <div className="v4r-supply__rows">
                    {SUPPLY_ADVANTAGES.map(([number, title, copy, proof], index) => (
                        <Reveal key={title} delay={index * .04}>
                            <span>{number}</span>
                            <div><h3>{title}</h3><p>{copy}</p></div>
                            <strong>{proof}</strong>
                        </Reveal>
                    ))}
                </div>
                <Reveal className="v4r-supply__close">
                    <p>Most platforms compete on software.</p>
                    <strong>We compete on software and supply.</strong>
                </Reveal>
            </div>
        </section>
    )
}

const GEN_ICON_PHONE = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
)
const GEN_ICON_CLIPBOARD = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M9 13.5l2 2 4-4.5" />
    </svg>
)
const GEN_ICON_AGENT = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.2" />
        <circle cx="5" cy="19" r="2.2" />
        <circle cx="19" cy="19" r="2.2" />
        <path d="M12 7.2v3.8M12 11l-5.5 6M12 11l5.5 6" />
    </svg>
)

const GENERATIONS: [string, string, string, string, ReactNode][] = [
    ["Legacy TMC", "Offline era", "Expert humans brokering complex trips, with negotiated rates and real support behind them.", "Offline, slow, and priced per transaction, so the vendor earned more the more friction there was.", GEN_ICON_PHONE],
    ["First-generation T&E", "Self-serve era", "Self-serve booking and digital expense, which removed the phone call and paper receipt.", "The work moved to the traveler. Booking, approval, changes and expense stayed in four separate stages with four separate owners.", GEN_ICON_CLIPBOARD],
    ["Agentic", "Miraee, today", "The stages collapse. One agent carries one context from request to reconciliation.", "Nothing is handed off.", GEN_ICON_AGENT],
]

export function TMCGenerationsV2() {
    return (
        <section className="v4r-generation" aria-labelledby="generation-title">
            <div className="v4-shell">
                <Reveal className="v4r-generation__head">
                    <div>
                        <span className="v4r-label">Miraee vs legacy TMCs</span>
                        <h2 id="generation-title">Built different from the tools you're used to.</h2>
                    </div>
                    <p>While other tools solve parts of the journey, Miraee sits distinctly apart. Here's how the operating model changed.</p>
                </Reveal>
                <div className="v4r-generation__grid">
                    {GENERATIONS.map(([name, era, solved, left, icon], index) => (
                        <Reveal className={index === 2 ? "is-agentic" : ""} key={name} delay={index * .05}>
                            <div className="v4r-generation__top">
                                <span className="v4r-generation__icon" aria-hidden="true">{icon}</span>
                                <span>0{index + 1}</span>
                            </div>
                            <h3>{name}</h3>
                            <div><small>What it solved</small><p>{solved}</p></div>
                            <div><small>What it left behind</small><p>{left}</p></div>
                            <span className="v4r-generation__era">{era}</span>
                            {index < 2 && <span className="v4r-generation__arrow" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></span>}
                        </Reveal>
                    ))}
                </div>
                <Reveal className="v4r-generation__close">
                    <span>The new generation of travel planning.</span>
                    <strong>Powered by agentic AI.</strong>
                </Reveal>
            </div>
        </section>
    )
}
