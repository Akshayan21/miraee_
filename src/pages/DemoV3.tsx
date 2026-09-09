import { useState } from "react"
import { Reveal, V3Nav, V3Footer, Rows } from "../components/V3Kit"
import { usePageMeta } from "../hooks/usePageMeta"
import travelerImage from "../assets/platform_hero_image .jpg"
import "./V3.css"

const walkAway = [
    { title: "Save more", body: "A savings estimate against your current program, using your real city pairs." },
    { title: "Travel better", body: "The traveler experience, live — one sentence to a fully booked trip." },
    { title: "Get help instantly", body: "A disruption handled end to end, with seamless human escalation." },
    { title: "Reward your people", body: "The Wallet loop that turns policy compliance into a perk." },
    { title: "Complete control", body: "The admin console — spend, savings, adoption, and duty of care in one place." },
]

export default function DemoV3() {
    usePageMeta("Book a demo", "Twenty minutes, your policy, your routes. We'll show what Miraee finds — and what it saves.")
    const [submitted, setSubmitted] = useState(false)
    return (
        <div className="v3-page demo-v3-page">
            <V3Nav />
            <header className="hero dark hero-simple">
                <div className="wrap subpage-hero-grid">
                    <Reveal className="subpage-hero-copy">
                        <h1 style={{ maxWidth: "16ch" }}>See your travel program, reimagined.</h1>
                        <p className="sub">Twenty minutes, your policy, your routes. We'll show what Miraee finds — and what it saves.</p>
                    </Reveal>
                    <Reveal className="hero-proof-panel demo-proof" delay={0.08}>
                        <img className="demo-proof__image" src={travelerImage} alt="Business travelers moving through an airport terminal" />
                    </Reveal>
                </div>
            </header>

            <section style={{ paddingTop: 0 }}>
                <div className="wrap demo-grid">
                    <Reveal>
                        <h2 className="head" style={{ fontSize: "clamp(22px,2.6vw,30px)" }}>What you'll walk away with</h2>
                        <Rows items={walkAway} />
                        <p style={{ marginTop: 32, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, maxWidth: "32ch" }}>
                            Miraee — corporate travel reimagined around the traveler, <span style={{ color: "var(--ochre)" }}>powered by AI and backed by humans.</span>
                        </p>
                    </Reveal>
                    <Reveal>
                        <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                            <div className="form">
                                <div className="field"><label htmlFor="f-name">Name</label><input id="f-name" type="text" autoComplete="name" required placeholder="Alex Rivera" /></div>
                                <div className="field"><label htmlFor="f-email">Work email</label><input id="f-email" type="email" autoComplete="email" required placeholder="alex@company.com" /></div>
                                <div className="field"><label htmlFor="f-company">Company</label><input id="f-company" type="text" autoComplete="organization" required placeholder="Company, Inc." /></div>
                                <div className="field"><label htmlFor="f-size">Travelers per year</label>
                                    <select id="f-size" defaultValue="Under 100">
                                        <option>Under 100</option><option>100 – 500</option><option>500 – 2,500</option><option>2,500+</option>
                                    </select>
                                </div>
                                <div className="field full"><label htmlFor="f-msg">What should we focus on?</label><textarea id="f-msg" placeholder="Savings, traveler experience, expense, rollout…" /></div>
                                <div className="full"><button className="btn btn-solid" type="submit" style={{ width: "100%", justifyContent: "center" }} disabled={submitted}>Book my demo <span className="arr">→</span></button></div>
                            </div>
                            {submitted && <div className="form-ok">Thanks — you're on the list. A Miraee travel specialist will reach out within one business day.</div>}
                        </form>
                        <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 20 }}>Prefer email? <b>hello@miraee.ai</b></p>
                    </Reveal>
                </div>
            </section>
            <V3Footer />
        </div>
    )
}
