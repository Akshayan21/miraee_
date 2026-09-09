import { V4Page, V4Hero, Reveal } from "../../components/V4Kit"
import "../SubpagesV2.css"
import "./V4.css"

// Dedicated Integrations Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: CONNECTED SYSTEMS
// Heading: Fits the system you already run.
// Subhead: Identity, people, finance and work tools, connected once, then quiet.
// # | Category | Connects to | What it does

interface IntegrationItem {
    num: string
    category: string
    connectsTo: string[]
    whatItDoes: string
    status: string
}

const INTEGRATIONS_DATA: IntegrationItem[] = [
    {
        num: "01",
        category: "Identity",
        connectsTo: ["SSO", "SAML", "SCIM", "Okta", "Entra"],
        whatItDoes: "Provisions and deprovisions travelers automatically. No orphaned accounts.",
        status: "Auto-provisioned",
    },
    {
        num: "02",
        category: "People",
        connectsTo: ["HRIS"],
        whatItDoes: "Grades, entities, cost centres and managers stay current without manual upkeep.",
        status: "Zero upkeep",
    },
    {
        num: "03",
        category: "Finance",
        connectsTo: ["ERP", "Accounting systems", "Card networks"],
        whatItDoes: "Coded expenses post directly, corporate card spend is managed automatically, and accounts payable reconciles at source.",
        status: "Source reconciled",
    },
    {
        num: "04",
        category: "Work",
        connectsTo: ["Calendar", "Email", "Chat"],
        whatItDoes: "Itineraries and changes appear where people already work.",
        status: "Native in-app",
    },
]

export default function V4Integrations() {
    return (
        <V4Page
            title="Integrations | Fits the system you already run | Miraee"
            description="Identity, people, finance and work tools, connected once, then quiet. Direct integrations for SSO, SCIM, HRIS, ERP, and chat.">

            <V4Hero
                eyebrow="CONNECTED SYSTEMS"
                title={<>Fits the system<br /><em>you already run.</em></>}
                lede="Identity, people, finance and work tools, connected once, then quiet." />

            <section className="v4-section" style={{ paddingTop: 0, paddingBottom: "clamp(64px, 8vw, 110px)" }}>
                <div className="v4-shell">
                    {/* 4 Creative Connected System Hub Cards */}
                    <div className="v4-integ-hub-grid" aria-label="Connected systems by category">
                        {INTEGRATIONS_DATA.map((item, idx) => (
                            <Reveal key={item.category} delay={idx * 0.08}>
                                <article className="v4-integ-hub-card">
                                    <div className="v4-integ-hub-card__top">
                                        <span className="v4-integ-hub-card__num">{item.num}</span>
                                        <span className="v4-integ-hub-card__live">
                                            <span className="v4-integ-hub-card__dot" aria-hidden="true" />
                                            {item.status}
                                        </span>
                                    </div>

                                    <h2 className="v4-integ-hub-card__cat">{item.category}</h2>

                                    <div className="v4-integ-hub-card__pills">
                                        {item.connectsTo.map((tech) => (
                                            <span key={tech} className="v4-integ-hub-pill">{tech}</span>
                                        ))}
                                    </div>

                                    <p className="v4-integ-hub-card__desc">
                                        {item.whatItDoes}
                                    </p>
                                </article>
                            </Reveal>
                        ))}
                    </div>

                    {/* Creative Editorial Data Table in Site Theme */}
                    <Reveal delay={0.2}>
                        <div className="v4-editorial-table-wrap">
                            <table className="v4-editorial-table" aria-label="Connected systems tabular overview">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: 80 }}>#</th>
                                        <th scope="col" style={{ width: 160 }}>Category</th>
                                        <th scope="col" style={{ width: 280 }}>Connects to</th>
                                        <th scope="col">What it does</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {INTEGRATIONS_DATA.map((row) => (
                                        <tr key={row.num}>
                                            <td style={{ fontFamily: "monospace", color: "var(--m-orange)", fontWeight: 700 }}>{row.num}</td>
                                            <td style={{ fontWeight: 700, color: "var(--m-maroon)" }}>{row.category}</td>
                                            <td style={{ color: "var(--m-maroon)", fontWeight: 500 }}>{row.connectsTo.join(", ")}</td>
                                            <td style={{ color: "var(--m-muted)" }}>{row.whatItDoes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Reveal>
                </div>
            </section>
        </V4Page>
    )
}
