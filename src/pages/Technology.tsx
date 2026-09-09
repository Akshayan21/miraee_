import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import V11Hero from "../components/V11Hero"
import "./HomeV12.css"
import V11PageImage from "../components/V11PageImage"
import technologyPageImg from "../../images/weavy/v1/solutions/v1-solutions-admins.webp"

// ─── Page 5. AI & Technology ──────────────────────────────────────────────────
// Copy is taken verbatim from the website content document (Part 3, Page 5).
// Per the doc: the eight-agent list is reconciled to six specialised agents,
// the Brain & Heart toggle is removed, and Safety & Governance becomes a short
// pointer to Trust & Security rather than a duplicate treatment.

const T = {
    ink: "var(--text)",
    maroon: "#450E14",
    orange: "#E55602",
    cream: "#FBF6F2",
    muted: "rgba(var(--text-rgb),0.45)",
    mutedLight: "rgba(var(--text-rgb),0.12)",
    accent: "var(--accent-strong)",
}

const F = "var(--font-sans)"
const SERIF = "var(--font-heading)"

function useWindowWidth() {
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1440)
    useEffect(() => {
        const fn = () => setW(window.innerWidth)
        window.addEventListener("resize", fn)
        return () => window.removeEventListener("resize", fn)
    }, [])
    return w
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.2 })
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
            {children}
        </motion.div>
    )
}

function Label({ text }: { text: string }) {
    return (
        <div style={{ fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.orange, marginBottom: 18 }}>
            {text}
        </div>
    )
}

function SectionHead({ label, title, accent, body, maxWidth = 760, center = true }: { label: string; title: string; accent?: string; body?: string; maxWidth?: number; center?: boolean }) {
    const isMobile = useWindowWidth() < 768
    return (
        <Reveal>
            <div style={{ textAlign: center ? "center" : "left", maxWidth, margin: center ? "0 auto 56px" : "0 0 56px" }}>
                <Label text={label} />
                <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 3.4vw, 50px)", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.03em", margin: 0 }}>
                    {title}{accent ? <> <span style={{ color: T.accent, fontStyle: "italic" }}>{accent}</span></> : null}
                </h2>
                {body && (
                    <p style={{ fontFamily: F, fontSize: isMobile ? 16 : 18, lineHeight: 1.75, color: T.muted, margin: "22px auto 0", maxWidth: 640 }}>
                        {body}
                    </p>
                )}
            </div>
        </Reveal>
    )
}


// ─── 2 What agentic AI means here ─────────────────────────────────────────────
const ASSISTANT_VS_AGENT: [string, string, string][] = [
    ["You describe a trip", "Drafts options and waits", "Searches live inventory, applies policy, returns a bookable itinerary"],
    ["A flight is cancelled", "Explains your options", "Detects it, prices alternatives, rebooks in band or brings one decision"],
    ["The trip ends", "Reminds you to file", "Has already captured, coded and posted every receipt"],
]

function AgenticAI() {
    const w = useWindowWidth()
    const isMobile = w < 860
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1080, margin: "0 auto" }}>
                <SectionHead label="What agentic AI means here" title="An assistant answers." accent="An agent finishes the job." />

                <Reveal delay={0.1}>
                    <div style={{ borderTop: `1px solid ${T.mutedLight}` }}>
                        {!isMobile && (
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", gap: 24, padding: "16px 0", borderBottom: `1px solid ${T.mutedLight}` }}>
                                <span />
                                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted }}>Assistant AI</span>
                                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange }}>Agentic AI (Miraee)</span>
                            </div>
                        )}
                        {ASSISTANT_VS_AGENT.map(([moment, assistant, agent]) => (
                            <div key={moment} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1.2fr", gap: isMobile ? 10 : 24, padding: isMobile ? "24px 0" : "28px 0", borderBottom: `1px solid ${T.mutedLight}` }}>
                                <div style={{ fontFamily: SERIF, fontSize: isMobile ? 20 : 22, fontWeight: 700, color: T.ink, lineHeight: 1.25 }}>{moment}</div>
                                <div>
                                    {isMobile && <div style={{ fontFamily: F, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, marginBottom: 6 }}>Assistant AI</div>}
                                    <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.65, color: T.muted, margin: 0 }}>{assistant}</p>
                                </div>
                                <div>
                                    {isMobile && <div style={{ fontFamily: F, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange, marginBottom: 6 }}>Agentic AI (Miraee)</div>}
                                    <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.65, color: T.ink, fontWeight: 600, margin: 0 }}>{agent}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div style={{ marginTop: 44, background: T.maroon, borderRadius: 20, padding: isMobile ? "28px 26px" : "36px 44px" }}>
                        <div style={{ fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(251,246,242,0.5)", marginBottom: 12 }}>Definition</div>
                        <p style={{ fontFamily: SERIF, fontSize: isMobile ? 19 : 24, lineHeight: 1.45, color: T.cream, margin: 0 }}>
                            An agent is a bounded, permissioned worker with one job, its own tools, and a written limit on what it may do alone.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 3 Architecture ───────────────────────────────────────────────────────────
const LAYERS = [
    "Conversational interface (chat, email, mobile, web console)",
    "Six specialised agents",
    "Mondee inventory and settlement",
]

const AGENTS: [string, string][] = [
    ["Booking agent", "Searches live inventory, assembles the itinerary, books flight, hotel, rail and car as one trip."],
    ["Policy agent", "Applies per-role, per-entity rules at search; routes real exceptions to a named approver with context."],
    ["Negotiation agent", "Selects wholesale and negotiated rates; predicts cost across fare classes and timing."],
    ["Rebooking agent", "Monitors every segment, detects disruption, prices alternatives and rebooks within limits."],
    ["Expense agent", "Captures receipts, codes to chart of accounts, matches to booking, posts to ERP."],
    ["Support agent", "Escalates to a human with the full trip attached and keeps the conversation in one thread."],
]

const CAPABILITY_STRIP = [
    "Intent understanding",
    "Autonomous booking inside limits",
    "Real-time policy enforcement",
    "Predictive cost optimisation",
    "Disruption handling",
    "Automated expense",
    "Spend intelligence",
]

function Architecture() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section id="architecture" style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px", scrollMarginTop: 90 }}>
            <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <SectionHead label="Architecture" title="Six agents." accent="One shared context." />

                {/* Three layers */}
                <Reveal delay={0.08}>
                    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "stretch", gap: 12, marginBottom: 48 }}>
                        {LAYERS.map((layer, i) => (
                            <div key={layer} style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ flex: 1, boxSizing: "border-box", minHeight: 84, display: "flex", alignItems: "center", padding: "18px 22px", borderRadius: 16, border: `1px solid ${i === 1 ? "rgba(229,86,2,0.4)" : T.mutedLight}`, background: i === 1 ? "rgba(229,86,2,0.06)" : "var(--surface)" }}>
                                    <div>
                                        <div style={{ fontFamily: F, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", color: T.orange, marginBottom: 6 }}>{String(i + 1).padStart(2, "0")}</div>
                                        <div style={{ fontFamily: F, fontSize: 14.5, fontWeight: 650, color: T.ink, lineHeight: 1.45 }}>{layer}</div>
                                    </div>
                                </div>
                                {i < LAYERS.length - 1 && (
                                    <span aria-hidden="true" style={{ color: T.orange, fontSize: 18, flexShrink: 0, alignSelf: "center", transform: isMobile ? "rotate(90deg)" : "none" }}>→</span>
                                )}
                            </div>
                        ))}
                    </div>
                </Reveal>

                {/* Six agents */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : w < 1100 ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 20 }}>
                    {AGENTS.map(([name, body], i) => (
                        <Reveal key={name} delay={i * 0.06}>
                            <div style={{ height: "100%", boxSizing: "border-box", background: "var(--surface)", border: `1px solid ${T.mutedLight}`, borderRadius: 20, padding: "30px 28px" }}>
                                <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: T.accent, opacity: 0.55, marginBottom: 12 }}>
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <h3 style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 700, color: T.ink, margin: "0 0 10px" }}>{name}</h3>
                                <p style={{ fontFamily: F, fontSize: 14.5, lineHeight: 1.65, color: T.muted, margin: 0 }}>{body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Capability strip */}
                <Reveal delay={0.2}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 44 }}>
                        {CAPABILITY_STRIP.map(c => (
                            <span key={c} style={{ padding: "9px 16px", borderRadius: 100, border: `1px solid ${T.mutedLight}`, background: "rgba(var(--text-rgb),0.03)", fontFamily: F, fontSize: 12.5, fontWeight: 600, color: T.ink }}>
                                {c}
                            </span>
                        ))}
                    </div>
                </Reveal>

                {/* The layer beneath the six agents.
                    Doc design note: keep the six-agent diagram as the traveler-facing
                    layer and show the 200+ bot fabric as the layer beneath it. The two
                    counts must never be merged into one number. */}
                <Reveal delay={0.26}>
                    <div style={{ marginTop: isMobile ? 48 : 72, paddingTop: isMobile ? 40 : 56, borderTop: `1px solid ${T.mutedLight}` }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 0.44fr) minmax(0, 1fr)", gap: isMobile ? 24 : 56, alignItems: "start" }}>
                            <div>
                                <div style={{ fontFamily: SERIF, fontSize: "clamp(38px, 5vw, 62px)", fontWeight: 700, color: T.accent, lineHeight: 1, letterSpacing: "-0.04em" }}>200+</div>
                                <h3 style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: T.ink, margin: "14px 0 0", lineHeight: 1.4 }}>
                                    The layer beneath the six agents
                                </h3>
                            </div>
                            <p style={{ fontFamily: F, fontSize: isMobile ? 15 : 16, lineHeight: 1.75, color: T.muted, margin: 0 }}>
                                The six agents a traveler meets do not work alone. They run on Tabhi&rsquo;s automation fabric: 200+ specialised bots that connect booking, supply, policy, payment, expense and support into one framework, each handling one small, well-defined step. Breaking the work into small steps is what makes the system both reliable and fast &mdash; every bot has a job narrow enough to execute cleanly and to audit. It is also what lets the same framework serve every persona differently: the steps an employee needs, the controls finance needs and the visibility a travel lead needs are assembled from the same shared library of bots, not rebuilt for each role.
                            </p>
                        </div>

                        <div style={{ marginTop: isMobile ? 28 : 40, padding: isMobile ? "26px 24px" : "34px 40px", borderRadius: 22, background: T.maroon, color: T.cream }}>
                            <p style={{ fontFamily: SERIF, fontSize: isMobile ? 19 : 24, lineHeight: 1.5, color: T.cream, margin: 0 }}>
                                <strong style={{ fontWeight: 700 }}>Two layers, one system.</strong> Six specialised agents run each trip. 200+ Tabhi bots connect the whole platform beneath them. Competitors bolt AI onto a booking tool; our intelligence and our supply were built together, on infrastructure the group already runs.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 4 Learning and adaptation ────────────────────────────────────────────────
function Learning() {
    const isMobile = useWindowWidth() < 768
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
                <Reveal>
                    <Label text="Learning and adaptation" />
                    <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 3.4vw, 50px)", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                        It gets sharper <span style={{ color: T.accent, fontStyle: "italic" }}>with every trip.</span>
                    </h2>
                    <p style={{ fontFamily: F, fontSize: isMobile ? 16 : 18, lineHeight: 1.75, color: T.muted, margin: 0 }}>
                        The agents learn each traveler&rsquo;s preferences and each company&rsquo;s patterns, so recommendations get more precise over time. Learning is scoped to your tenant. Your data is not used to train foundation models.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 5 Governance (short pointer; detail lives on Trust & Security) ───────────
const GOVERNANCE_TILES = ["Full audit trail", "Policy and budget guardrails", "Role-based permissions", "Human in the loop"]

function Governance() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1080, margin: "0 auto" }}>
                <SectionHead label="Governance" title="Autonomy inside" accent="written limits." />
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16 }}>
                    {GOVERNANCE_TILES.map((tile, i) => (
                        <Reveal key={tile} delay={i * 0.07}>
                            <div style={{ height: "100%", boxSizing: "border-box", background: "var(--surface)", border: `1px solid ${T.mutedLight}`, borderRadius: 18, padding: "26px 22px" }}>
                                <div style={{ fontFamily: F, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", color: T.orange, marginBottom: 10 }}>{String(i + 1).padStart(2, "0")}</div>
                                <div style={{ fontFamily: F, fontSize: 15, fontWeight: 650, color: T.ink, lineHeight: 1.4 }}>{tile}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={0.3}>
                    <div style={{ textAlign: "center", marginTop: 40 }}>
                        <a href="/v1.1/security" style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                            Decision matrix, hard limits and data lifecycle →
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 6 Developers and integrations ────────────────────────────────────────────
const DEV_ITEMS: [string, string][] = [
    ["Unified travel API", "Search, book, change and expense across all supply from one interface."],
    ["Prebuilt connectors", "ERP, HRIS, GDS, accounting and payment networks."],
    ["White-label", "For TMCs and partners who want the agent under their own brand."],
    ["Sandbox", "Developer access with test inventory."],
]

function Developers() {
    const w = useWindowWidth()
    const isMobile = w < 900
    return (
        <section id="developers" style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px", scrollMarginTop: 90 }}>
            <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 0.8fr) minmax(0, 1.2fr)", gap: isMobile ? 40 : 72, alignItems: "start" }}>
                <Reveal>
                    <div>
                        <Label text="Developers and integrations" />
                        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 3.4vw, 50px)", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.03em", margin: "0 0 28px" }}>
                            Build <span style={{ color: T.accent, fontStyle: "italic" }}>on it.</span>
                        </h2>
                        <a href="/book-a-demo" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.orange, color: T.cream, fontFamily: F, fontSize: 14.5, fontWeight: 700, padding: "15px 30px", borderRadius: 100, textDecoration: "none" }}>
                            Talk to our integration team →
                        </a>
                    </div>
                </Reveal>
                <div>
                    {DEV_ITEMS.map(([title, body], i) => (
                        <Reveal key={title} delay={i * 0.07}>
                            <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 18, padding: "24px 0", borderTop: `1px solid ${T.mutedLight}` }}>
                                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: T.orange, paddingTop: 4 }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: T.ink, margin: "0 0 8px" }}>{title}</h3>
                                    <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.65, color: T.muted, margin: 0 }}>{body}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── 7 Where we're headed ─────────────────────────────────────────────────────
// Doc Part 4 item 6: whether a public roadmap belongs on the site at all is
// still an open decision. Retained here as the doc's Page 5 specifies, with no
// phase labels that date the product.
const ROADMAP: [string, string][] = [
    ["Now", "AI booking engine, expense module, policy and approval engine, iOS and web console."],
    ["Next", "MICE workflows, deeper ERP and HRIS integrations, rewards and loyalty."],
    ["Then", "MENA, EU and APAC expansion, corporate card, white-label for TMCs."],
]

function Roadmap() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1080, margin: "0 auto" }}>
                <SectionHead label="Where we're headed" title="Where we're" accent="headed." />
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
                    {ROADMAP.map(([phase, body], i) => (
                        <Reveal key={phase} delay={i * 0.08}>
                            <div style={{ height: "100%", boxSizing: "border-box", background: "var(--surface)", border: `1px solid ${T.mutedLight}`, borderRadius: 20, padding: "32px 28px" }}>
                                <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 700, color: T.accent, margin: "0 0 14px" }}>{phase}</h3>
                                <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.65, color: T.muted, margin: 0 }}>{body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── 8 Closing CTA (universal, Part 2.2) ──────────────────────────────────────
function ClosingCTA() {
    const isMobile = useWindowWidth() < 768
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "140px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: "6%", right: "8%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
                <Reveal>
                    <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 700, color: T.ink, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                        Bring a<br /><span style={{ color: T.accent }}>real trip.</span>
                    </h2>
                    <p style={{ fontFamily: F, fontSize: 18, lineHeight: 1.65, color: T.muted, maxWidth: 480, margin: "0 auto 44px" }}>
                        Twenty minutes. Your route, your policy, your edge cases. We run it live.
                    </p>
                    <a href="/book-a-demo" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: T.maroon, color: T.cream, fontFamily: F, fontSize: 17, fontWeight: 700, padding: "20px 52px", borderRadius: 100, textDecoration: "none" }}>
                        Book your demo ↗
                    </a>
                    <p style={{ fontFamily: F, fontSize: 13, color: T.muted, marginTop: 20 }}>
                        No long contracts. No heavy IT lift. Live in as little as 90 days.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

export default function MiraeeTechnologyPage(_props: any) {
    useEffect(() => {
        // Title tag + meta description per the doc's AI & Technology SEO brief.
        document.title = "Agentic AI for Corporate Travel | How Miraee Works | Miraee"
        const description = "Six specialised agents on one shared context, each with one job and a written limit. How Miraee's agentic AI plans, books and reconciles travel, and what it may never do."
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta) }
        meta.content = description

        let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null
        if (!viewport) {
            viewport = document.createElement("meta") as HTMLMetaElement
            viewport.name = "viewport"
            document.head.appendChild(viewport)
        }
        viewport.content = "width=device-width, initial-scale=1, maximum-scale=5"
    }, [])

    return (
        <div className="v1-type-page" style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "clip", fontFamily: F, background: "var(--page-bg)" }}>
            <SiteNav />
            <V11Hero
                kicker="AI & Technology"
                title="The intelligence"
                accent="beneath every trip."
                sub="Miraee is AI-native by design: a coordinated multi-agent system running on owned global supply, with every action permissioned and logged."
                primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
                secondaryCta={{ label: "See the architecture ↓", href: "#architecture" }}
                image={{ src: technologyPageImg, alt: "Administrator working with the Miraee platform" }} />
            <AgenticAI />
            <V11PageImage src={technologyPageImg} alt="Administrator working with the Miraee platform" label="Six agents. One shared context." caption="Every agent action is permissioned and logged." position="center top" mobilePosition="center top" />
            <Architecture />
            <Learning />
            <Governance />
            <Developers />
            <Roadmap />
            <ClosingCTA />
            <V1Footer />
        </div>
    )
}
