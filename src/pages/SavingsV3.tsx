import { Link } from "react-router-dom"
import { Reveal, V3Nav, V3Footer, Rows } from "../components/V3Kit"
import { usePageMeta } from "../hooks/usePageMeta"
import heroPhoto from "../assets/miraee-team.png"
import ctaPhoto from "../assets/partner-with-miraee.jpg"
import "./V3.css"

const engines = [
    { title: "Global travel content", body: "Flights, hotels, car rental, and non-travel content in one marketplace — no coverage gaps that push bookings off-program." },
    { title: "Private & negotiated fares", body: "Wholesale and private fares most booking tools never see, layered with your own corporate rates." },
    { title: "Company rates", body: "Your negotiated hotel and airline agreements applied automatically — never left on the table by a rushed booking." },
    { title: "Policy-aware recommendations", body: "The compliant option is the default option. No decoding PDFs, no accidental violations to claw back." },
    { title: "AI optimization", body: "Miraee weighs total trip cost — fare, hotel, ground, change risk — not just the cheapest single leg." },
    { title: "Better alternatives", body: "Where savings exist, Miraee shows them: the 7:05 instead of the 6:10, the hotel four minutes further for $80 less a night." },
    { title: "Behavioral savings", body: "A “price to beat” on every trip nudges travelers toward the smarter option — and rewards them when they take it." },
    { title: "Real-time visibility", body: "The company sees savings as they happen — by trip, team, and quarter — not in a report six weeks later." },
]

const ledger = [
    { route: "AUS → ORD", detail: "Price to beat", was: "345", now: "284", extra: "chose United 7:05a", saved: "$61 saved" },
    { route: "JFK → LHR", detail: "Negotiated fare applied over published", was: "1,412", now: "1,200", extra: "", saved: "$212 saved" },
    { route: "HOTEL · CANARY WHARF", detail: "Company rate, 2 nights", was: "378", now: "298", extra: "", saved: "$80 saved" },
]

const loop = [["Smarter choice", "Employee beats the price to beat."], ["Company saves", "Captured on the booking, instantly."], ["Employee earns", "Points land in the Miraee Wallet."], ["Adoption increases", "And the company saves more."]] as const

export default function SavingsV3() {
    usePageMeta("Savings, wallet & rewards", "Miraee doesn't just find travel. It optimizes what you spend on it.")
    return (
        <div className="v3-page savings-v3-page">
            <V3Nav />
            <header className="hero dark hero-simple">
                <div className="wrap subpage-hero-grid">
                    <Reveal className="subpage-hero-copy">
                        <h1 style={{ maxWidth: "17ch" }}>Miraee doesn't just find travel. It optimizes what you spend on it.</h1>
                        <p className="sub">Every trip is a savings opportunity — in the fare, in the behavior, and in the visibility. Miraee works all three, continuously.</p>
                        <div className="cta-row"><Link className="btn btn-solid" to="/v3/demo">See your savings <span className="arr">→</span></Link></div>
                    </Reveal>
                    <Reveal className="hero-visual" delay={0.08}>
                        <img className="hero-visual__photo" src={heroPhoto} alt="Colleagues reviewing travel savings together" />
                    </Reveal>
                </div>
            </header>

            <section>
                <div className="wrap">
                    <Reveal>
                        <h2 className="head">Seven savings engines, working at once.</h2>
                        <p className="lede">An employee just asks Miraee to plan a trip. Behind that sentence, every lever your travel program has is applied automatically.</p>
                    </Reveal>
                    <Rows items={engines} split />
                    <Reveal style={{ marginTop: 32, paddingTop: 28, borderTop: "1px solid var(--line)" }}>
                        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(19px,2vw,24px)", maxWidth: "34ch" }}>Miraee doesn't just find travel. It continuously optimizes what the company spends on travel.</p>
                    </Reveal>
                </div>
            </section>

            <section style={{ paddingTop: 0 }}>
                <div className="wrap">
                    <Reveal>
                        <h2 className="head">Option selected → dollars saved.</h2>
                        <p className="lede">Savings in Miraee aren't a voiceover claim. They're visible on every booking, to the traveler and to the company.</p>
                    </Reveal>
                    <div className="ledger">
                        {ledger.map(t => (
                            <Reveal className="ledger-row" key={t.route}>
                                <span className="route">{t.route}</span>
                                <span className="detail">{t.detail} <span className="was">${t.was}</span> {t.extra ? `· ${t.extra} ` : "→ "}<span className="now">${t.now}</span></span>
                                <span className="saved">{t.saved}</span>
                            </Reveal>
                        ))}
                        <Reveal className="ledger-total">
                            <strong>$353</strong>
                            <span style={{ maxWidth: "30ch", fontSize: 15 }}>saved on one trip — visible to finance the moment it books.</span>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="dark">
                <div className="wrap">
                    <Reveal>
                        <h2 className="head">Savings you don't have to police.</h2>
                        <p className="lede">Restrictive policy is one way to save. Rewarding good choices is a better one. When an employee makes a company-friendly choice, Miraee rewards the behavior — and the reward lands in their Miraee Wallet.</p>
                    </Reveal>
                    <div className="timeline">
                        {loop.map(([title, copy]) => <Reveal className="stop" key={title}><span className="dot" /><b>{title}</b><span>{copy}</span></Reveal>)}
                    </div>
                    <Reveal style={{ marginTop: 44, borderTop: "1px solid rgba(245,236,227,.18)", paddingTop: 24 }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--tangerine)" }}>Wallet — 4,210 points</span>
                        <p style={{ marginTop: 10, color: "var(--on-dark-muted)" }}>+610 · beat the price to beat, AUS→ORD &nbsp;·&nbsp; +340 · chose company-rate hotel</p>
                    </Reveal>
                </div>
            </section>

            <section className="cta-band">
                <div className="wrap cta-band__inner">
                    <div className="cta-band__copy">
                        <span className="cta-band__kicker">Ready when you are</span>
                        <h2>Ask us what your last quarter of travel should have cost.</h2>
                        <Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link>
                    </div>
                    <div className="cta-band__media">
                        <img className="cta-band__photo" src={ctaPhoto} alt="Colleagues reviewing travel plans on a private jet" />
                        <div className="photo-chip">
                            <span className="photo-chip__tag">Captured on one trip</span>
                            <strong>$353 saved</strong>
                            <small>Negotiated fare + better alternative</small>
                        </div>
                    </div>
                </div>
            </section>
            <V3Footer />
        </div>
    )
}
