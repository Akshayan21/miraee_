import { Link } from "react-router-dom"
import { Reveal, V3Nav, V3Footer, Rows } from "../components/V3Kit"
import { usePageMeta } from "../hooks/usePageMeta"
import heroPhoto from "../assets/miraee-role-finance.png"
import ctaPhoto from "../assets/role-finance-manager.jpg"
import "./V3.css"

const consoleItems = [
    { title: "Travel spend", body: "Live, by team, cost center, and route." },
    { title: "Savings", body: "Realized and behavioral, per booking." },
    { title: "Adoption", body: "Who's on Miraee, who's still offline." },
    { title: "Policy", body: "Set once, enforced in every conversation." },
    { title: "Approvals", body: "In-flow, with cost and alternatives shown." },
    { title: "Duty of care", body: "Traveler locations and reach, in a disruption." },
    { title: "Exceptions", body: "Out-of-policy flags with full context." },
    { title: "Expense visibility", body: "Trip-matched spend, before reports exist." },
]

const changeMgmt = [
    { title: "Employee onboarding", body: "Profiles, preferences, and loyalty linked in minutes." },
    { title: "Communications", body: "Launch comms and champions program, ready-made." },
    { title: "Training", body: "Role-based sessions for travelers, admins, and finance." },
    { title: "Policy migration", body: "Your rules, translated and tested before day one." },
    { title: "Launch support", body: "Hypercare through the first booking waves." },
    { title: "Adoption tracking", body: "Weekly reads on usage, savings, and stragglers." },
    { title: "Ongoing nudges", body: "In-product prompts that keep behavior on-program." },
    { title: "Offline → online", body: "Phone-and-email bookers won over, not mandated." },
]

export default function EnterpriseV3() {
    usePageMeta("For the enterprise", "Simple for employees. Complete control for the company.")
    return (
        <div className="v3-page enterprise-v3-page">
            <V3Nav />
            <header className="hero dark hero-simple">
                <div className="wrap subpage-hero-grid">
                    <Reveal className="subpage-hero-copy">
                        <h1 style={{ maxWidth: "17ch" }}>Simple for employees. Complete control for the company.</h1>
                        <p className="sub">Everything the traveler never has to think about — spend, policy, approvals, risk — is exactly what the admin console makes visible, in real time.</p>
                        <div className="cta-row"><Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link></div>
                    </Reveal>
                    <Reveal className="hero-visual" delay={0.08}>
                        <img className="hero-visual__photo" src={heroPhoto} alt="Enterprise admin reviewing the travel program console" />
                    </Reveal>
                </div>
            </header>

            <section>
                <div className="wrap">
                    <Reveal>
                        <h2 className="head">One pane of glass for the whole program.</h2>
                    </Reveal>
                    <Rows items={consoleItems} split />
                    <Reveal className="lede" style={{ marginTop: 36, maxWidth: "66ch" }}>
                        Plus traveler activity and employee &amp; organization management — roles, departments, entitlements — without a services engagement to change a rule.
                    </Reveal>
                </div>
            </section>

            <section className="dark">
                <div className="wrap">
                    <Reveal>
                        <h2 className="head">We don't just deploy Miraee. We make the change successful.</h2>
                        <p className="lede">A travel platform only saves money if people use it. Miraee ships with the launch program that moves offline behavior online — and keeps it there.</p>
                    </Reveal>
                    <Rows items={changeMgmt} split />
                </div>
            </section>

            <section className="cta-band">
                <div className="wrap cta-band__inner">
                    <div className="cta-band__copy">
                        <span className="cta-band__kicker">Ready when you are</span>
                        <h2>For employees, Miraee feels simple. For you, it's total visibility.</h2>
                        <Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link>
                    </div>
                    <div className="cta-band__media">
                        <img className="cta-band__photo" src={ctaPhoto} alt="Enterprise leaders reviewing travel program data" />
                        <div className="photo-chip">
                            <span className="photo-chip__tag">Live · this quarter</span>
                            <strong>97% in policy</strong>
                            <small>Spend, savings, and duty of care in one pane</small>
                        </div>
                    </div>
                </div>
            </section>
            <V3Footer />
        </div>
    )
}
