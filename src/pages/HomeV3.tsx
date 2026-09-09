import { useEffect, useRef, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, V3Nav, V3Footer } from "../components/V3Kit"
import { usePageMeta } from "../hooks/usePageMeta"
import travelerHero from "../assets/miraee-traveler-hero.webp"
import heroPhoto from "../assets/platform_hero_image .jpg"
import mobileUi from "../assets/miraee-mobile-phone.png"
import miraeeFavicon from "../assets/favicon-180.png"
import userAvatar from "../assets/role-traveller.jpg"
import "./V3.css"

// Plays the product screenshot first, then swaps to the conversation —
// each line arriving in turn — instead of showing everything at once.
function JourneyDemo({ image, imageAlt, lines }: { image: string; imageAlt: string; lines: { from: "ask" | "reply"; text: ReactNode }[] }) {
    const ref = useRef<HTMLDivElement>(null)
    const [showChat, setShowChat] = useState(false)
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShowChat(true); return }
        let alive = true
        let id: ReturnType<typeof setTimeout>
        const imageHold = 1600
        const chatHold = lines.length * 400 + 2000
        const step = (next: boolean) => {
            if (!alive) return
            setShowChat(next)
            id = setTimeout(() => step(!next), next ? chatHold : imageHold)
        }
        id = setTimeout(() => step(true), imageHold)
        return () => { alive = false; clearTimeout(id) }
    }, [lines.length])
    return (
        <div ref={ref} className="journey-console">
            <AnimatePresence initial={false}>
                {!showChat ? (
                    <motion.img key="shot" className="journey-console__product" src={image} alt={imageAlt}
                        initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.96, y: -10, filter: "blur(10px)" }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} />
                ) : (
                    <motion.div key="chat" className="transcript" initial={{ opacity: 0, filter: "blur(6px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.4 }}>
                        {lines.map((line, i) => (
                            <motion.div key={i} className={"t-line " + line.from}
                                initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ delay: i * 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                                <span className="t-avatar t-avatar--photo" aria-hidden="true">
                                    {line.from === "ask"
                                        ? <img src={userAvatar} alt="" style={{ objectPosition: "50% 15%", transform: "scale(1.8)" }} />
                                        : <img src={miraeeFavicon} alt="" />}
                                </span>
                                <div className="t-body">
                                    <span className="who">{line.from === "ask" ? "The ask" : "Miraee replies"}</span>
                                    <p className={line.from}>{line.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const outcomes = [
    ["01", "Save more", "Global content, negotiated fares, policy-aware AI, and behavioral nudges that continuously optimize what travel costs.", "/v3/savings"],
    ["02", "Travel better", "One request books the whole trip — flight, hotel, and ground — tuned to each traveler's preferences and loyalty programs.", "/v3/product"],
    ["03", "Get help instantly", "AI that fixes disruptions before you notice, and human experts who pick up mid-sentence — never start over.", "/v3/product"],
    ["04", "Reward your people", "Smart choices earn real rewards in the Miraee Wallet. Travel becomes a benefit, not a chore.", "/v3/hr"],
    ["05", "Stay in control", "Spend, savings, policy, approvals, and duty of care — complete visibility for the enterprise, zero friction for employees.", "/v3/enterprise"],
] as const

const broken = ["Search five tools", "Compare fares", "Decode the policy PDF", "Book flight here, hotel there", "Hold for support", "Save every receipt", "Build the expense report", "Chase the refund"]

const facts = ["Flights · hotels · cars", "Savings & wallet", "AI + human support", "Zero-touch expense"]

const loop = [
    ["Employee chooses smart", "Miraee surfaces a better option and a price to beat."],
    ["Company saves", "Savings are captured and visible in real time."],
    ["Employee earns", "Rewards land in the Miraee Wallet."],
    ["Adoption grows", "More trips on Miraee — more savings next quarter."],
] as const

export default function HomeV3() {
    usePageMeta("Travel Limitless with Miraee", "One intelligent AI travel companion that understands the traveler, understands the company, and manages every journey end to end — search, booking, changes, support, and expenses in a single conversation.")
    return (
        <div className="v3-page home-v3-page">
            <V3Nav />
            <header className="hero">
                <div className="wrap">
                    <div className="hero-grid">
                        <Reveal className="hero-copy">
                            <h1>AI-native employee <em className="accent-word">travel Platform</em></h1>
                            <p className="sub">One intelligent platform for booking, travel management, and expenses. Miraee is built for business travel, and the personal trips people love.</p>
                            <div className="cta-row">
                                <Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link>
                                <Link className="btn btn-line" to="/v3/product">See how it works</Link>
                            </div>
                            <div className="fact-line fact-line--scroll" aria-label={facts.join(", ")}>
                                <div className="fact-line__track">
                                    {[...facts, ...facts].map((f, i) => (
                                        <span key={i} aria-hidden={i >= facts.length}>{f}</span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                        <Reveal className="hero-visual" delay={0.1}>
                            <img className="hero-visual__photo" src={heroPhoto} alt="Business traveler at the gate, golden hour" />
                        </Reveal>
                    </div>
                </div>
            </header>

            <section className="dark problem-section">
                <div className="wrap problem-layout">
                    <Reveal className="problem-card">
                        <div className="problem-flow" aria-label="The fragmented travel workflow">
                            {broken.map((item, index) => <Reveal className="problem-step" key={item} delay={index * .035}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p><i aria-hidden="true">×</i></Reveal>)}
                        </div>
                    </Reveal>
                    <div className="problem-intro">
                        <Reveal>
                            <h2 className="head">Travel today is broken.</h2>
                            <p className="lede">To take one business trip, an employee or admin has to search multiple tools, compare, book, decode the policy, manage changes, call support, save receipts, and file expenses. Every step in a different place.</p>
                        </Reveal>
                        <Reveal className="problem-resolution" delay={.15}>
                            <p>Miraee replaces all of it with <strong>one conversation.</strong></p>
                            <Link className="btn btn-solid" to="/v3/demo">Explore our product now <span className="arr">→</span></Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="experience-section">
                <div className="wrap experience-layout">
                    <Reveal className="experience-copy">
                        <h2 className="head">Tell Miraee what you need. Miraee does the work.</h2>
                        <p className="lede">Miraee already knows who's traveling, what the policy allows, which fares your company negotiated, and how you like to fly. You just say where you need to be.</p>
                        <div className="experience-facts" aria-label="What Miraee handles">
                            <span><b>01</b> Traveler preferences</span>
                            <span><b>02</b> Company policy</span>
                            <span><b>03</b> Negotiated fares</span>
                        </div>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <JourneyDemo
                            image={mobileUi}
                            imageAlt="Miraee mobile app showing an AI travel assistant and flight options"
                            lines={[
                                { from: "ask", text: "Get me to Chicago Monday, back Wednesday evening." },
                                { from: "reply", text: <>United 6:10a, aisle seat. Hyatt, 2 blocks from the client. In policy — <strong>saves $61</strong>.</> },
                                { from: "ask", text: "Take it. Add a car." },
                                { from: "reply", text: <>Booked — flight, hotel, car, one trip. <strong>+610 points</strong> to your Wallet.</> },
                            ]}
                        />
                    </Reveal>
                </div>
            </section>

            <section style={{ paddingTop: 0 }}>
                <div className="wrap">
                    <Reveal>
                        <h2 className="head">Five outcomes. One companion.</h2>
                    </Reveal>
                    <div className="tiles">
                        {outcomes.map(([n, title, copy, href]) => (
                            <Reveal key={title}>
                                <Link className="tile" to={href}>
                                    <span className="num">{n}</span><h3>{title}</h3><p>{copy}</p>
                                </Link>
                            </Reveal>
                        ))}
                        <Reveal>
                            <div className="tile cta-tile">
                                <span className="num">06</span>
                                <h3 style={{ color: "#fff" }}>See it live</h3>
                                <p>Twenty minutes with your policy and your routes. We'll show you the savings.</p>
                                <Link className="btn btn-solid" style={{ marginTop: 18, background: "var(--tangerine)" }} to="/v3/demo">Book a demo <span className="arr">→</span></Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section style={{ paddingTop: 0 }}>
                <div className="wrap">
                    <Reveal>
                        <h2 className="head">Savings that compound on their own.</h2>
                        <p className="lede">Miraee doesn't enforce savings with restrictive policy alone — it rewards the behavior that creates them.</p>
                    </Reveal>
                    <div className="timeline">
                        {loop.map(([title, copy]) => (
                            <Reveal className="stop" key={title}><span className="dot" /><b>{title}</b><span>{copy}</span></Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-band">
                <div className="wrap cta-band__inner">
                    <div className="cta-band__copy">
                        <span className="cta-band__kicker">Ready when you are</span>
                        <h2>Corporate travel reimagined around the traveler.</h2>
                        <Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link>
                    </div>
                    <div className="cta-band__media">
                        <img className="cta-band__photo" src={travelerHero} alt="Business traveler using Miraee" />
                        <div className="photo-chip">
                            <span className="photo-chip__tag">Flight · in policy</span>
                            <strong>SFO → JFK</strong>
                            <small>United 6:10a · saves $61 vs. usual</small>
                        </div>
                    </div>
                </div>
            </section>
            <V3Footer />
        </div>
    )
}
