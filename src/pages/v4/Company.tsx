import { V4Page, V4Hero, V4Cta, Reveal, EditorialRows } from "../../components/V4Kit"
import mondeeLogo from "../../assets/mondee_logo.png"
import miraeeLogo from "../../assets/Miraee_Logo.png"
import abheeLogoDark from "../../assets/abhee-logo-dark.png"
import companyPhoto from "../../assets/miraee-about-company.png"
import "../SubpagesV2.css"
import "./V4.css"

// Company. Ported from AboutV2.tsx — the manager's nav has a Company menu, and
// the Part 1 structure doc has no page for it.
//
// AboutV2's three placeholder sections (team bios, offices, newsroom) are not
// carried over: "Life at Miraee" and "News & Updates" are their own Resources
// pages in V4, so duplicating empty shells here would give the same missing
// content two homes.

const TRUST = ["23 companies", "3 AI platforms", "500+ airlines", "2M+ hotels", "125M+ travelers reached"]

const PLATFORMS = [
    { name: "Mondee", logo: mondeeLogo, desc: "The agentic AI travel marketplace" },
    { name: "Miraee", logo: miraeeLogo, desc: "The employee travel platform" },
    { name: "Abhee", logo: abheeLogoDark, desc: "The hyperlocal experiential marketplace" },
]

const ADVANTAGE: string[][] = [
    ["Direct supply", "Contracts held with carriers rather than resold", "500+ airlines"],
    ["Global content", "Inventory sourced at wholesale, not screen-scraped", "2M+ hotels"],
    ["Volume", "Buying power that a single company cannot negotiate alone", "125M+ reached"],
    ["Experience content", "Hyperlocal supply no corporate channel carries", "Abhee network"],
    ["Financial stability", "Institutionally backed", "TCW · Morgan Stanley"],
    ["Shared AI infrastructure", "One engineering group behind all three platforms", "Built together"],
]

const PRINCIPLES: { num: string; title: string; copy: string }[] = [
    { num: "01", title: "Complete the work", copy: "An agent that answers is a chatbot. Ours finish the job and report what they did." },
    { num: "02", title: "Autonomy inside limits", copy: "Every agent carries a written boundary. Past it, a human decides." },
    { num: "03", title: "A person when it matters", copy: "Escalation is a feature, not a failure. The human arrives with the trip attached." },
    { num: "04", title: "The traveler is the test", copy: "If it isn't better for the person on the trip, it isn't shipped." },
]

export default function V4Company() {
    return (
        <V4Page
            title="Company | The Agentic Core | Miraee"
            description="Miraee is the employee travel platform of the Tabhi group: 23 companies, three AI platforms, direct supply across 500+ airlines and 2M+ hotels.">

            <V4Hero
                eyebrow="The company"
                title={<>The <em>agentic core.</em></>}
                lede="Miraee is the employee travel platform of the Tabhi group, built on the supply, payments and engineering the group already runs."
                image={{ src: companyPhoto, alt: "The Miraee team walking through the office, mid-conversation" }} />

            <section className="v4-section v4-section--tint" id="scale" aria-labelledby="scale-title">
                <div className="v4-shell">
                    <Reveal>
                        <h2 className="v4-h2" id="scale-title">We ran the trips. We saw the handoffs.</h2>
                        <p className="v4-lede">Five owners, four handoffs, one traveler stuck in the middle. Miraee collapses that into one agent and one thread.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="v4-stats" style={{ marginTop: 32 }}>
                            {TRUST.map(item => {
                                const [value, ...rest] = item.split(" ")
                                return (
                                    <div className="v4-stat" key={item}>
                                        <b>{value}</b>
                                        <span>{rest.join(" ")}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="v4-section" id="tabhi" aria-labelledby="tabhi-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Backed by Tabhi</span>
                        <h2 className="v4-h2" id="tabhi-title">23 companies. Three platforms. One vision.</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="m-edrows" role="table" aria-label="The Tabhi group platforms" style={{ marginTop: 28 }}>
                            {PLATFORMS.map((platform) => (
                                <div className="m-edrow" role="row" key={platform.name} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img
                                            src={platform.logo}
                                            alt={platform.name}
                                            style={{
                                                height: 28,
                                                width: "auto",
                                                maxWidth: 170,
                                                objectFit: "contain",
                                                display: "block",
                                            }}
                                        />
                                    </div>
                                    <p className="m-edrow__desc">{platform.desc}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="v4-section v4-section--tint" id="advantage" aria-labelledby="advantage-title">
                <div className="v4-shell">
                    <Reveal>
                        <h2 className="v4-h2" id="advantage-title">Why this matters to your travel program.</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 28 }}>
                            <EditorialRows headers={["What", "What it means", "Proof"]} rows={ADVANTAGE} caption="The group advantage" />
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="v4-section" id="principles" aria-labelledby="principles-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">How we build</span>
                        <h2 className="v4-h2" id="principles-title">Agents that do the work, not chat about it.</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="v4-steps" style={{ marginTop: 36 }}>
                            {PRINCIPLES.map(principle => (
                                <div className="v4-step" key={principle.num}>
                                    <b className="v4-step__num">{principle.num}</b>
                                    <h3>{principle.title}</h3>
                                    <p>{principle.copy}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            <V4Cta title="Bring a real trip." body="Twenty minutes with your policy and your routes. We'll show you the journey end to end." />
        </V4Page>
    )
}
