import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { V2Footer } from "../components/LegalFormKit"
import { Faq, Reveal, V2Nav } from "../components/V2Kit"
import { usePageMeta } from "../hooks/usePageMeta"
import "./HomeV2Light.css"
import "./SubpagesV2.css"
import "./ResourcesV2.css"
import "./V2AlternatingSections.css"

const guides = [
    ["The $255B Opportunity in Unmanaged Travel", "why the mid-market is the next battleground."],
    ["From Cost Center to ROI Engine", "a finance leader's guide to measurable travel."],
    ["The Agentic Era of Corporate Travel", "what changes when AI agents run the trip."],
    ["Six Systems, One Trip", "the hidden cost of a disconnected travel stack."],
]

const calculators = [
    ["ROI / Savings Calculator", "hours reclaimed, spend brought under management, projected return."],
    ["Unmanaged Spend Estimator", "how much of your travel budget is invisible today."],
    ["Tool Consolidation Calculator", "the cost of your current 6+ tool stack vs. one platform."],
]

const faqs: [string, ReactNode][] = [
    ["How does Miraee handle policy?", "Automatically, on every booking, with instant exception routing."],
    ["Which systems does it integrate with?", "ERP, accounting, HRIS, corporate card/payment networks, and GDS."],
    ["How long is implementation?", "Pilots reach full deployment in as little as 90 days."],
    ["Does it cover group travel and events?", <>Yes - <strong>MICE</strong> is native.</>],
    ["Is my data safe?", "Enterprise-grade security, full audit trails, and governance are built in."],
]

export default function ResourcesV2() {
    usePageMeta(
        "Resources for Agentic Corporate Travel | Miraee",
        "Research, tools, and guidance for finance, travel, and people leaders building the future of agentic corporate travel.",
    )

    return (
        <div className="m-site rv2-site">
            <a className="m-skip" href="#main">Skip to content</a>
            <V2Nav active="/resources" />

            <main id="main">
                <section className="rv2-hero m-section--light" aria-labelledby="resources-hero-title">
                    <Reveal className="rv2-hero__copy">
                        <h1 id="resources-hero-title">Everything you need to shape the future of corporate travel.</h1>
                        <p>Research, tools, and guidance for finance, travel, and people leaders building the <strong>agentic travel</strong> program.</p>
                    </Reveal>
                </section>

                <section id="guides" className="rv2-guides" aria-labelledby="guides-title">
                    <div className="rv2-shell">
                        <Reveal className="rv2-section-head">
                            <span>01 / Guides &amp; reports</span>
                            <h2 id="guides-title">Go deep on the shift to agentic travel.</h2>
                        </Reveal>

                        <div className="rv2-guide-list">
                            {guides.map(([title, description], index) => (
                                <Reveal className="rv2-guide" key={title} delay={index * 0.04}>
                                    <span className="rv2-guide__index">0{index + 1}</span>
                                    <h3>{title}</h3>
                                    <p><span aria-hidden="true">- </span>{description}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="calculators" className="rv2-calculators m-section--dark" aria-labelledby="calculators-title">
                    <div className="rv2-shell">
                        <Reveal className="rv2-section-head rv2-section-head--dark">
                            <span>02 / Calculators</span>
                            <h2 id="calculators-title">Put numbers to the opportunity.</h2>
                        </Reveal>

                        <div className="rv2-calculator-grid">
                            {calculators.map(([title, description], index) => (
                                <Reveal className="rv2-calculator" key={title} delay={index * 0.05}>
                                    <span>0{index + 1}</span>
                                    <h3>{title}</h3>
                                    <p><span aria-hidden="true">- </span>{description}</p>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal className="rv2-section-action">
                            <a href="mailto:hello@miraee.ai?subject=Miraee%20calculator%20access">Try the calculators <span aria-hidden="true">↗</span></a>
                        </Reveal>
                    </div>
                </section>

                <div className="rv2-feature-grid">
                    <section id="webinars" className="rv2-feature rv2-feature--webinars" aria-labelledby="webinars-title">
                        <Reveal className="rv2-feature__inner">
                            <span>03 / Webinars</span>
                            <div>
                                <h2 id="webinars-title">Learn from the teams building the agentic era.</h2>
                                <p>Live and on-demand sessions on AI in travel, <strong>expense automation</strong>, MICE, and building a measurable travel program.</p>
                                <a href="mailto:hello@miraee.ai?subject=Miraee%20webinars">Browse webinars <span aria-hidden="true">↗</span></a>
                            </div>
                        </Reveal>
                    </section>

                    <section id="help-center" className="rv2-feature rv2-feature--help" aria-labelledby="help-title">
                        <Reveal className="rv2-feature__inner">
                            <span>04 / Help center</span>
                            <div>
                                <h2 id="help-title">Answers, fast.</h2>
                                <p>Setup guides, admin documentation, traveler how-tos, and integration walkthroughs - searchable and always current.</p>
                                <Link to="/support">Visit the Help Center <span aria-hidden="true">↗</span></Link>
                            </div>
                        </Reveal>
                    </section>
                </div>

                <section className="rv2-faq" aria-labelledby="resources-faq-title">
                    <div className="rv2-shell rv2-faq__layout">
                        <Reveal className="rv2-faq__intro">
                            <span>05 / FAQs</span>
                            <h2 id="resources-faq-title">Common questions, clearly answered.</h2>
                        </Reveal>
                        <Reveal className="rv2-faq__items">
                            <Faq items={faqs} />
                        </Reveal>
                    </div>
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
        </div>
    )
}
