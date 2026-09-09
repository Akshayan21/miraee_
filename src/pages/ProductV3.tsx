import { useEffect, useRef, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { Reveal, V3Nav, V3Footer, Rows, Transcript } from "../components/V3Kit"
import { usePageMeta } from "../hooks/usePageMeta"
import bookingCard from "../assets/ui-flight-card.png"
import changeCard from "../assets/miraee-flight-cancelled-notification.png"
import expensesCard from "../assets/ui-expenses-card.png"
import miraeeFavicon from "../assets/favicon-180.png"
import teamTravellers from "../assets/team-travellers.jpg"
import heroPhoto from "../assets/miraee-role-travel-team.png"
import bookingBg from "../assets/role-traveller.jpg"
import "./V3.css"

// Scroll-linked screen animation — the product screenshot drifts and settles
// into place as the section scrolls through view, instead of sitting static.
function ScrollShot({ src, alt, className, bg, bgAlt, children }: { src: string; alt: string; className?: string; bg?: string; bgAlt?: string; children?: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "end 35%"] })
    const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [70, -30])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [0.93, 1, 1.03])
    const opacity = useTransform(scrollYProgress, [0, 0.18, 1], [0, 1, 1])
    return (
        <div ref={ref} className={className}>
            {bg && <img className="product-image-stage__bg" src={bg} alt={bgAlt ?? ""} aria-hidden={!bgAlt} />}
            <motion.img src={src} alt={alt} style={{ y, scale, opacity }} />
            {children}
        </div>
    )
}

// Plays the modification-request screenshot first, then swaps to the live
// disruption timeline — same looping pattern as the homepage's JourneyDemo.
function DisruptionDemo({ shot, shotAlt }: { shot: string; shotAlt: string }) {
    const [showLive, setShowLive] = useState(false)
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShowLive(true); return }
        let alive = true
        let id: ReturnType<typeof setTimeout>
        const shotHold = 1800
        const liveHold = 5200
        const step = (next: boolean) => {
            if (!alive) return
            setShowLive(next)
            id = setTimeout(() => step(!next), next ? liveHold : shotHold)
        }
        id = setTimeout(() => step(true), shotHold)
        return () => { alive = false; clearTimeout(id) }
    }, [])
    return (
        <div className="disruption-demo">
            <AnimatePresence initial={false}>
                {!showLive ? (
                    <motion.div key="shot" className="disruption-demo__pane"
                        initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.96, y: -10, filter: "blur(10px)" }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                        <div className="product-change-shot"><img src={shot} alt={shotAlt} /></div>
                    </motion.div>
                ) : (
                    <motion.div key="live" className="disruption-demo__pane"
                        initial={{ opacity: 0, filter: "blur(6px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.4 }}>
                        <div className="disruption-console__bar"><span><i /> Active disruption</span><small>Trip · FRA 2048</small></div>
                        <div className="disruption-status"><span>Flight cancelled</span><div><b>JFK</b><i>→</i><b>FRA</b></div><small>Detected at 4:12 pm</small></div>
                        <div className="disruption-timeline">
                            <motion.article className="disruption-event disruption-event--alert" initial={{ opacity: 0, y: 14, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                                <span className="disruption-event__marker"><img src={miraeeFavicon} alt="" width={20} height={20} /></span>
                                <div><small>Miraee · 4:12 pm</small><p>Your 6:30 pm to Frankfurt was just cancelled. I'm holding two alternatives: Lufthansa 7:45 pm (lands 9:10 am) or the 6:05 am tomorrow. Your hotel is flexible either way — I've already checked.</p></div>
                            </motion.article>
                            <motion.div className="disruption-options" initial={{ opacity: 0, y: 14, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                                <span><b>7:45 pm</b><small>Lufthansa · lands 9:10 am</small><i>Held</i></span><span><b>6:05 am</b><small>Tomorrow morning</small><i>Available</i></span>
                            </motion.div>
                            <motion.article className="disruption-event disruption-event--traveler" initial={{ opacity: 0, y: 14, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 1.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                                <span className="t-avatar t-avatar--photo"><img src={bookingBg} alt="" style={{ objectPosition: "50% 15%", transform: "scale(1.8)" }} /></span>
                                <div><small>The ask</small><p>"Take the 7:45. Can someone call me about the client dinner?"</p></div>
                            </motion.article>
                            <motion.article className="disruption-event disruption-event--resolved" initial={{ opacity: 0, y: 14, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 1.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                                <span className="disruption-event__marker"><img src={miraeeFavicon} alt="" width={20} height={20} /></span>
                                <div><small>Miraee replies</small><p>Rebooked ✓ — seat 4C, bag transferred, hotel and car adjusted. Connecting you with Priya, a senior travel expert. She has your full trip context — nothing to repeat.</p></div>
                            </motion.article>
                        </div>
                        <motion.footer className="human-handoff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.4 }}>
                            <div><span>PS</span><p><b>Priya Shah</b><small>Senior travel expert · full context received</small></p></div><strong>Connected</strong>
                        </motion.footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Looping "live" interface widget — stands in for a product-screen video,
// cycling through what Miraee already knows instead of describing it in prose.
function PersonalizationLoop() {
    const items = [
        { tag: "Traveler context", text: "Aisle seat · Delta Diamond · vegetarian meal on file" },
        { tag: "Company policy", text: "$450/night cap, Northeast — auto-approved, in policy" },
        { tag: "Trip state", text: "Flight booked · hotel confirmed · 2 receipts matched" },
    ]
    const [active, setActive] = useState(0)
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        const id = setInterval(() => setActive(v => (v + 1) % items.length), 2800)
        return () => clearInterval(id)
    }, [items.length])
    const cur = items[active]
    return (
        <div className="personalization-loop">
            <div className="personalization-loop__bar">
                <motion.span className="personalization-loop__dot" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                <span>Personalization — live</span>
            </div>
            <div className="personalization-loop__body">
                <AnimatePresence initial={false}>
                    <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="personalization-loop__row" style={{ position: "absolute" }}>
                        <b>{cur.tag}</b>
                        <p>{cur.text}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="personalization-loop__dots">
                {items.map((it, i) => <button key={it.tag} aria-label={`Show ${it.tag}`} onClick={() => setActive(i)} className={i === active ? "active" : ""} />)}
            </div>
        </div>
    )
}

const knows = ["Who the traveler is", "Company travel policy", "Seat preferences", "Airline & hotel preferences", "Loyalty programs", "Previous behavior", "Office & location context", "Preferred timings"]

const bookingSteps = [
    { title: "Understand", body: "Miraee parses the request — dates, city, proximity to your office, return window — and applies traveler and company context." },
    { title: "Assemble", body: "Flight, hotel, and ground transportation composed as one itinerary, from global content plus your negotiated and company rates." },
    { title: "Approve", body: "If the trip needs sign-off, approval happens in the same conversation — the approver sees cost, policy fit, and alternatives." },
    { title: "Booked", body: "Confirmed end to end. Calendar holds, confirmations, and receipts organize themselves under one trip." },
]

const supportRows = [
    { title: "Proactive, not reactive", body: "Miraee watches every itinerary, contacts the traveler first, and understands exactly what a delay breaks — connections, hotels, meetings." },
    { title: "Seamless human escalation", body: "When judgment is needed, a human expert joins with the complete context. The traveler never re-explains, never re-queues." },
    { title: "Pre-trip → during → post-trip", body: "24×7 coverage across the whole journey, including VIP and executive handling for the people whose time costs the most." },
]

const expenseSteps = [
    { title: "Receipt captured", body: "Bookings file themselves; snap anything else — a taxi, a client coffee — and Miraee reads it." },
    { title: "Matched & categorized", body: "Each charge is matched to the trip, categorized, and coded against the right cost center automatically." },
    { title: "Policy checked", body: "Out-of-policy items are flagged in the moment — with context — not three weeks later by finance." },
    { title: "Prepared & submitted", body: "The report is ready before the traveler unpacks. Review, tap, done — or fully zero-touch where policy allows." },
]

export default function ProductV3() {
    usePageMeta("The Miraee experience", "Miraee understands who you are, how you fly, and what your company allows — so a trip that used to take an hour of tabs takes one sentence.")
    return (
        <div className="v3-page product-v3-page">
            <V3Nav />
            <header className="hero dark hero-simple">
                <div className="wrap subpage-hero-grid">
                    <Reveal className="subpage-hero-copy">
                        <h1 style={{ maxWidth: "18ch" }}>Your best, traveled colleague, on every trip.</h1>
                        <p className="sub">Miraee understands who you are, how you fly, and what your company allows — so a trip that used to take an hour of tabs takes one sentence.</p>
                        <div className="cta-row"><Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link></div>
                    </Reveal>
                    <Reveal className="hero-visual" delay={0.08}>
                        <img className="hero-visual__photo" src={heroPhoto} alt="Miraee team reviewing global travel routes" />
                        <div className="photo-chip photo-chip--toast">
                            <span className="photo-chip__icon"><img src={miraeeFavicon} alt="" width={16} height={16} /></span>
                            <div><strong>Booked ✓</strong><small>Itinerary on your calendar</small></div>
                        </div>
                    </Reveal>
                </div>
            </header>

            <section className="booking-showcase">
                <div className="wrap booking-showcase__grid">
                    <Reveal className="booking-showcase__copy">
                        <h2 className="head">One sentence. One complete trip.</h2>
                        <p className="lede">“I need to be in London Tuesday morning, close to our office, and come back Thursday evening.” That's the whole workflow. Here's what happens behind it.</p>
                        <div className="booking-context">
                            <span>Miraee already knows</span>
                            <div>{knows.map((item, index) => <p key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</p>)}</div>
                        </div>
                        <Reveal delay={0.1} style={{ marginTop: 28 }}>
                            <PersonalizationLoop />
                        </Reveal>
                    </Reveal>
                    <ScrollShot className="product-image-stage product-image-stage--booking" src={bookingCard} alt="Miraee flight booking card showing a fare, policy status, and reward" bg={bookingBg} bgAlt="Traveler checking their itinerary at the airport" />
                    <div className="booking-showcase__steps">
                        <Rows items={bookingSteps} />
                        <Transcript lines={[
                            { from: "ask", text: "I need to be in London Tuesday morning, close to our office, back Thursday evening." },
                            { from: "reply", text: "— BA 178, Tue 8:40a arrival · Marriott Canary Wharf, 4 min from the office · car on landing. All in policy." },
                            { from: "ask", text: "Book it." },
                            { from: "reply", text: "Booked ✓ Itinerary on your calendar." },
                        ]} />
                    </div>
                </div>
            </section>

            <section className="dark disruption-section">
                <div className="wrap disruption-layout">
                    <Reveal className="disruption-copy">
                        <h2 className="head">AI when it's instant. Humans when it matters.</h2>
                        <p className="lede">Disruptions are where travel programs earn trust. Miraee knows about the problem before the traveler does — and never makes them start over when a human steps in.</p>
                        <div className="disruption-principles">
                            {supportRows.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}
                        </div>
                    </Reveal>
                    <Reveal className="disruption-console" delay={0.08}>
                        <DisruptionDemo shot={changeCard} shotAlt="Phone lock screen showing a Miraee push notification about a cancelled flight" />
                    </Reveal>
                </div>
            </section>

            <section className="product-expense-section">
                <div className="wrap product-expense-grid">
                    <Reveal>
                        <h2 className="head">The best expense report is the one you never create.</h2>
                        <p className="lede">Miraee already knows what was booked, what was paid, and why. After the trip, there is no second job to do.</p>
                    </Reveal>
                    <Rows items={expenseSteps} />
                    <Reveal className="product-image-stage product-image-stage--expense" delay={0.08}><img src={expensesCard} alt="Miraee automated expense summary interface" /></Reveal>
                    <Transcript className="product-expense-transcript" lines={[
                        { from: "reply", text: "— Trip to Chicago closed. 9 receipts matched, all in policy. Expense report ready." },
                        { from: "ask", text: "Submit it." },
                        { from: "reply", text: "Submitted ✓ Reimbursement in 2–3 days." },
                    ]} />
                </div>
            </section>

            <section className="cta-band">
                <div className="wrap cta-band__inner">
                    <div className="cta-band__copy">
                        <span className="cta-band__kicker">Ready when you are</span>
                        <h2>Tell Miraee what you need. Miraee does the work.</h2>
                        <Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link>
                    </div>
                    <div className="cta-band__media">
                        <img className="cta-band__photo" src={teamTravellers} alt="Colleagues traveling for business" />
                        <div className="photo-chip photo-chip--toast">
                            <span className="photo-chip__icon"><img src={miraeeFavicon} alt="" width={16} height={16} /></span>
                            <div><strong>Success!</strong><small>Expense submitted. You're done.</small></div>
                        </div>
                    </div>
                </div>
            </section>
            <V3Footer />
        </div>
    )
}
