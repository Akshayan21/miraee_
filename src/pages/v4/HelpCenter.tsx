import { Link } from "react-router-dom"
import type { ReactNode } from "react"
import { V4Page, V4Hero, Reveal, Faq } from "../../components/V4Kit"
import "../SubpagesV2.css"
import "./V4.css"

// Help Center. Not a stub: the FAQ content already exists (ResourcesV2.tsx) and
// the support request form is a live, routed page, so this hands people
// straight to it rather than inventing a second one.

const FAQS: [string, ReactNode][] = [
    ["How does Miraee handle policy?", "Policy is applied before search results are shown, so travelers only see options that are already compliant. Rules can be set by route, grade, trip type and entity, and out-of-policy requests are either flagged for review or blocked, depending on how you configure them."],
    ["Which systems does it integrate with?", "Identity providers via SSO and SCIM, HRIS platforms for traveler and cost centre data, ERP and accounting systems for expense posting, corporate card networks for payment, and calendar and messaging tools for itineraries."],
    ["How long is implementation?", "Pilots reach full deployment in as little as 90 days. Most programs start on one entity or region alongside their incumbent rather than switching everything at once."],
    ["Does it cover group travel and events?", "Yes. MICE, group booking, venue sourcing and attendee management run on the same platform and the same ledger as everyday business travel."],
    ["Is my data safe?", "Every agent action is logged and attributable, access follows role-based permissions, and the platform is built for SOC 2 operational controls, SSO/SCIM identity management and GDPR privacy by design."],
]

export default function V4HelpCenter() {
    return (
        <V4Page
            title="Help Center | Contact Miraee"
            description="Answers to common questions about policy, integrations, implementation and data, and a direct line to a human.">

            <V4Hero
                eyebrow="Help center"
                title="Answers, fast."
                lede="The questions we're asked most, and a direct line to a person when the answer isn't here."
                actions={<>
                    <Link className="v4-btn v4-btn--solid" to="/support">Raise a request</Link>
                    <Link className="v4-btn v4-btn--ghost" to="/book-a-demo">Talk to us</Link>
                </>} />

            <section className="v4-section" id="faq" aria-labelledby="help-faq-title">
                <div className="v4-shell">
                    <Reveal><h2 className="v4-h2" id="help-faq-title">Common questions.</h2></Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 28 }}><Faq items={FAQS} /></div>
                    </Reveal>
                </div>
            </section>

            <section className="v4-section v4-section--tint" aria-labelledby="contact-title">
                <div className="v4-shell">
                    <Reveal>
                        <div className="v4-note">
                            <b>24/7</b>
                            <div>
                                <h2 id="contact-title">Still stuck? Talk to a person.</h2>
                                <p>Support requests go to the same team that backs the agents. If it concerns a live trip, say so: those are picked up first.</p>
                                <p style={{ marginTop: 16 }}>
                                    <Link className="v4-btn v4-btn--solid" to="/support">Raise a support request</Link>
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </V4Page>
    )
}
