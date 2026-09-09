import { Link } from "react-router-dom"
import { Reveal, V3Nav, V3Footer, Rows } from "../components/V3Kit"
import { usePageMeta } from "../hooks/usePageMeta"
import employeePhoto from "../assets/miraee-role-employee.png"
import ctaPhoto from "../assets/v2-home-hero.jpg"
import miraeeFavicon from "../assets/favicon-180.png"
import "./V3.css"

const perks = [
    { title: "Less administrative work", body: "No tool-hopping, no expense reports, no hold music. Hours of travel admin per trip go back to real work — or to life." },
    { title: "A premium travel experience", body: "The kind of trip planning executives get from an assistant, now available to every employee who travels." },
    { title: "Personalization throughout", body: "Seats, airlines, hotels, timings, loyalty programs — remembered once, applied to every future trip." },
    { title: "24×7 assistance", body: "A cancelled red-eye at 2 am is handled at 2 am — by AI instantly, by a human expert when it matters." },
    { title: "Duty of care", body: "The company always knows where its travelers are and can reach them in a disruption — quietly, without surveillance theater." },
    { title: "Rewards for smart choices", body: "Company-friendly bookings earn points in the Miraee Wallet. Doing right by the budget finally pays the traveler too." },
]

export default function HrV3() {
    usePageMeta("For HR & employees", "Turn corporate travel from a pain point into a benefit.")
    return (
        <div className="v3-page hr-v3-page">
            <V3Nav />
            <header className="hero dark hero-simple">
                <div className="wrap subpage-hero-grid">
                    <Reveal className="subpage-hero-copy">
                        <h1 style={{ maxWidth: "16ch" }}>Turn corporate travel from a pain point into a benefit.</h1>
                        <p className="sub">Your frequent travelers give up evenings, weekends, and sleep for the company. Miraee gives them back time, care, and rewards — and gives HR a benefit that costs less than the tools it replaces.</p>
                        <div className="cta-row"><Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link></div>
                    </Reveal>
                    <Reveal className="hero-visual" delay={0.08}>
                        <img className="hero-visual__photo" src={employeePhoto} alt="Employee traveling for business, checking Miraee on their phone" />
                        <div className="photo-chip photo-chip--toast">
                            <span className="photo-chip__icon"><img src={miraeeFavicon} alt="" width={16} height={16} /></span>
                            <div><strong>+610 points</strong><small>Added to your Miraee Wallet</small></div>
                        </div>
                    </Reveal>
                </div>
            </header>

            <section>
                <div className="wrap">
                    <Reveal>
                        <h2 className="head">A premium experience, for everyone.</h2>
                    </Reveal>
                    <Rows items={perks} split />
                    <Reveal className="lede" style={{ marginTop: 40, maxWidth: "68ch" }}>
                        The result is less travel stress — before the trip, during it, and after it. For companies with frequent travelers and executives, that's not a perk line in a handbook. It's retention.
                    </Reveal>
                </div>
            </section>

            <section className="dark people-experience">
                <div className="wrap people-experience__grid">
                    <Reveal className="people-experience__copy">
                        <h2 className="head">Travel people actually like.</h2>
                        <p className="lede">Recruiting closes on benefits candidates can feel. “You'll never file an expense report again, and good bookings earn you rewards” is a benefit they feel on the first trip.</p>
                        <div className="people-experience__highlights"><span><b>01</b> Onboarding in minutes</span><span><b>02</b> VIP &amp; executive handling</span><span><b>03</b> Wallet rewards</span></div>
                    </Reveal>
                    <Reveal className="employee-pass" delay={0.08}>
                        <div className="employee-pass__top"><span>Miraee</span><small>Employee onboarding</small></div>
                        <blockquote>— Welcome, Dana! I've set up your profile from HR: aisle seat, vegetarian meal, Marriott Bonvoy linked.</blockquote>
                        <div className="employee-pass__wallet"><div><small>You</small><strong>Perfect. I fly to Denver a lot.</strong></div></div>
                        <footer><span>Miraee</span><small>Noted — I'll keep your Denver favorites ready.</small></footer>
                    </Reveal>
                </div>
            </section>

            <section className="cta-band">
                <div className="wrap cta-band__inner">
                    <div className="cta-band__copy">
                        <span className="cta-band__kicker">Ready when you are</span>
                        <h2>Give your travelers the upgrade. Keep the budget.</h2>
                        <Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link>
                    </div>
                    <div className="cta-band__media">
                        <img className="cta-band__photo" src={ctaPhoto} alt="Traveler smiling at the airport" />
                    </div>
                </div>
            </section>
            <V3Footer />
        </div>
    )
}
