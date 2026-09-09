import { useEffect } from "react"
import { Link } from "react-router-dom"
import { V2Footer } from "../components/LegalFormKit"
import { Reveal, V2Nav, EditorialRows } from "../components/V2Kit"
import mondeeLogo from "../assets/mondee_logo.png"
import miraeeLogo from "../assets/Miraee_Logo.png"
import abheeLogo from "../assets/abhee logo.png"
import "./HomeV2Light.css"
import "./SubpagesV2.css"
import "./V2AlternatingSections.css"

const groupPlatforms = [
    ["Mondee", "The agentic AI travel marketplace", "Serves travel experts and organisations worldwide with negotiated air and hotel content - the supply layer Miraee books against."],
    ["Miraee", "The employee travel platform", "Plans, books, changes and expenses corporate trips end to end on one continuous context."],
    ["Abhee", "The hyperlocal experiential marketplace", "Hosts and curators offering immersive local experiences - the content behind Miraee's personal travel."],
]

const groupLogos: Record<string, string> = { Mondee: mondeeLogo, Miraee: miraeeLogo, Abhee: abheeLogo }

const advantage = [
    ["Direct supply", "Wholesale contracts and direct supplier connections rather than resold inventory - which is why the rates hold rather than being claimed back later.", "500+ airlines"],
    ["Global content", "Millions of hotels across every market your teams travel to, in one place.", "2M+ hotels"],
    ["Volume", "The group's existing traveler base is what makes those rates possible for a company your size.", "125M+ reached"],
    ["Experience content", "Hyperlocal experiences no other corporate channel carries - because a sister company digitized them.", "Abhee network"],
    ["Financial stability", "Institutional backing, so the platform running your travel program will still be here next year.", "TCW · Morgan Stanley"],
    ["Shared AI infrastructure", "Agent architecture built and proven across the group, not a first attempt.", "One engineering group"],
]

const principles = [
    ["01", "Complete the work", "An agent that returns options has moved the task, not finished it. Ours book, rebook, code and reconcile."],
    ["02", "Autonomy inside limits", "Every agent has a written boundary on what it may do alone. Published, configurable, and logged. Autonomy never means blind trust."],
    ["03", "A person when it matters", "Automation that cannot escalate is a trap. A human is always one message away, with the full trip already in front of them."],
    ["04", "The traveler is the test", "If the person taking the trip does not find it easier, nothing else we built counts."],
]

const companySummary = "Miraee is an AI-native employee travel platform for corporate travel, expense management and personal trips. Built by Tabhi, an AI-first travel group of 23 companies, Miraee plans, books, changes and expenses business trips end to end using specialized AI agents running on one continuous context. The platform books flights, hotels, rail and car hire from live inventory covering more than 500 airlines and over two million hotels, sourced through direct supplier connections and wholesale agreements held by the Tabhi group. Miraee serves three audiences: business travelers, finance teams and travel managers. Company policy is applied at the point of search rather than at approval, expenses are captured and coded automatically without traveler-submitted reports, and 24/7 human travel support is included. Miraee also supports employee personal travel on a separate ledger, using the same agent and corporate negotiated rates where supplier agreements permit. Tabhi's other platforms are Mondee, an agentic AI travel marketplace, and Abhee, a hyperlocal experiential marketplace. Tabhi ownership includes affiliates of TCW Asset Management Company and Morgan Stanley Investment Management. Miraee is available on web and mobile. Learn more at miraee.ai."

const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Miraee",
    url: "https://miraee.ai",
    parentOrganization: { "@type": "Organization", name: "Tabhi" },
    sisterOrganization: [
        { "@type": "Organization", name: "Mondee" },
        { "@type": "Organization", name: "Abhee" },
    ],
    description: companySummary,
}

export default function AboutV2() {
    useEffect(() => {
        document.title = "About Miraee - Built by Tabhi, the AI-Native Travel Group"
        const description="Miraee is an employee travel platform built by Tabhi - a travel group of 23 companies with direct supplier contracts, institutional backing and a marketplace already serving travelers at global scale.";let meta=document.querySelector<HTMLMetaElement>('meta[name="description"]');if(!meta){meta=document.createElement("meta");meta.name="description";document.head.appendChild(meta)};meta.content=description
    }, [])
    return (
        <div className="m-site">
            <a className="m-skip" href="#main">Skip to content</a>
            <V2Nav active="/about" />
            <main id="main">
                <section className="m-hero m-hero--about m-section--light" aria-labelledby="about-hero-title">
                    <Reveal className="m-hero__copy">
                        <p className="m-eyebrow">THE COMPANY</p>
                        <h1 id="about-hero-title">The Agentic Core</h1>
                        <p className="m-lede">Built by Tabhi, a travel group with direct supplier contracts, institutional backing, and a marketplace already moving travelers at global scale.</p>
                        <div className="m-actions">
                            <Link to="/book-a-demo">See Miraee live <span aria-hidden="true">↗</span></Link>
                            <a href="#tabhi">Meet the group <span aria-hidden="true">↓</span></a>
                        </div>
                        <div className="m-trust-strip">
                            {["23 companies", "3 AI platforms", "500+ airlines", "2M+ hotels", "125M+ travelers reached"].map(x => <span key={x}>{x}</span>)}
                        </div>
                    </Reveal>
                </section>

                <section aria-labelledby="origin-title">
                    <Reveal className="m-story">
                        <div className="m-story__text">
                            <p className="m-eyebrow">THE ORIGIN STORY</p>
                            <h2 id="origin-title">We ran the trips.<br />We saw the handoffs.</h2>
                            <p>Tabhi has been moving travelers for years, through a marketplace, through travel experts, through contracts held directly with airlines and hotels. Corporate travel was the one journey that never got simpler. Every tool solved a single stage and handed the traveler to the next one.</p>
                            <p>We didn't set out to build another booking tool. We had already seen what happens when you connect one to an expense tool and a support desk: five owners, four handoffs, and a traveler doing the coordinating.</p>
                        </div>
                        <div className="m-story__panel"><span className="m-story__mark"><span style={{ display: "block", whiteSpace: "nowrap" }}>5 owners.</span><span style={{ display: "block", whiteSpace: "nowrap" }}>4 handoffs.</span></span></div>
                    </Reveal>
                    <Reveal className="m-story">
                        <div className="m-story__text">
                            <p className="m-eyebrow">THE ANSWER</p>
                            <h2>One agent.<br />One thread.</h2>
                            <p>So we built the opposite. One agent, one thread, one continuous travel and expense management context, running on supply we already own. Miraee is what happens when the company that holds the contracts also writes the software.</p>
                            <p className="m-closing">Most travel software is built on someone else's inventory. Ours isn't.</p>
                        </div>
                        <div className="m-story__panel"><span className="m-story__mark"><span style={{ display: "block", whiteSpace: "nowrap" }}>1 thread.</span><span style={{ display: "block", whiteSpace: "nowrap" }}>0 handoffs.</span></span></div>
                    </Reveal>
                </section>

                <section id="tabhi" aria-labelledby="group-title" className="m-brandwall m-section--dark">
                    <div className="m-brandwall__head">
                        <Reveal>
                            <p className="m-eyebrow">BACKED BY TABHI</p>
                            <h2 id="group-title">23 companies. Three platforms. One vision.</h2>
                            <p>Tabhi brought together more than twenty travel businesses into a single AI-first group. Miraee is the corporate platform. Two others sit alongside it.</p>
                        </Reveal>
                    </div>
                    <Reveal>
                        <div className="m-brandwall__row">
                            {groupPlatforms.map(([name, what, does]) => (
                                <div className="m-brandwall__item" key={name}>
                                    <span>{what}</span>
                                    {groupLogos[name] ? <img className="m-brandwall__logo" src={groupLogos[name]} alt={name} /> : <strong>{name}</strong>}
                                    <p>{does}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                    <Reveal delay={.08}><p className="m-note m-brandwall__foot">Institutionally backed, with ownership including affiliates of TCW Asset Management and Morgan Stanley Investment Management.</p></Reveal>
                </section>

                <section className="m-section" aria-labelledby="advantage-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">THE ADVANTAGE</p>
                        <h2 id="advantage-title">Why this matters to your travel program.</h2>
                        <p>Group ownership only matters to a buyer if it changes what they get.</p>
                    </Reveal>
                    <Reveal><EditorialRows caption="What the group gives Miraee" headers={["What the group brings", "What it means for you", "Proof"]} rows={advantage} highlightLast columns={2} /></Reveal>
                    <Reveal delay={.08}><p className="m-note">Most platforms compete on software. We compete on software and supply.</p></Reveal>
                </section>

                <section className="m-iconband" aria-labelledby="build-title">
                    <div className="m-iconband__head">
                        <Reveal>
                            <p className="m-eyebrow">HOW WE BUILD</p>
                            <h2 id="build-title">Agents that do the work, not chat about it.</h2>
                            <p>Four principles that decide what we ship and what we refuse to.</p>
                        </Reveal>
                    </div>
                    <Reveal>
                        <div className="m-iconband__grid">
                            {principles.map(([num, title, body]) => (
                                <div className="m-iconband__item" key={title}>
                                    <span className="m-iconband__num">{num}</span>
                                    <h3>{title}</h3>
                                    <p>{body}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                <section className="m-section" aria-labelledby="leadership-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">THE PEOPLE</p>
                        <h2 id="leadership-title">Who's building it.</h2>
                        <p className="m-note">Team bios are on their way - check back soon.</p>
                    </Reveal>
                </section>

                <section className="m-section m-tint-band" aria-labelledby="global-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">GLOBAL</p>
                        <h2 id="global-title">On the ground where your teams travel.</h2>
                        <p className="m-note">Office locations and open roles are on their way - check back soon.</p>
                    </Reveal>
                </section>

                <section className="m-section" aria-labelledby="newsroom-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">NEWSROOM</p>
                        <h2 id="newsroom-title">Announcements and press.</h2>
                        <p className="m-note">No announcements yet - check back soon.</p>
                    </Reveal>
                </section>

                <section className="m-cta">
                    <Reveal>
                        <p className="m-eyebrow">SEE THE AGENT IN ACTION</p>
                        <h2>Bring a real trip.</h2>
                        <p>Twenty minutes. Your route, your policy, your edge cases. We'll run it live.</p>
                        <Link to="/book-a-demo">Book your demo <span aria-hidden="true">↗</span></Link>
                    </Reveal>
                </section>
            </main>
            <V2Footer />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        </div>
    )
}
