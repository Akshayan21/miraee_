import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import ThemeToggle from "../components/ThemeToggle"
import { GrainOverlay, ScrollProgress } from "../animations"
import { EO } from "../animations/easings"

const stats = [["2M+", "hotels"], ["500+", "airlines"], ["20–30%", "typical savings"], ["24/7", "human support"]]
const pains = [
    ["01", "Booking lives everywhere", "Consumer sites, agent emails, policy PDFs, and expense tools make one trip feel like five jobs."],
    ["02", "Changes become tickets", "A delayed flight starts a chain of messages while the traveler waits and finance loses visibility."],
    ["03", "Finance sees it too late", "Spend appears after the trip, after the exception, and after the chance to make a better decision."],
]
const capabilities = [
    ["Book", "Flights, stays, rail, and cars selected against live policy and traveler preferences."],
    ["Manage", "Changes, cancellations, approvals, and disruptions handled in the same conversation."],
    ["Expense", "Receipts matched, coded, checked, and ready before the traveler gets home."],
    ["Experience", "Work trips can become personal journeys without mixing company and employee spend."],
]
const roles = [
    ["Traveler", "Ask once. Get a complete, policy-safe trip."],
    ["Finance", "See committed spend before it becomes an expense."],
    ["Travel lead", "Set the rules. Let the agent run the program."],
]
const steps = [
    ["01", "Tell Miraee what you need", "Type it or say it naturally—cities, dates, preferences, meetings, and personal plans."],
    ["02", "The agent builds the journey", "Miraee searches supply, applies policy, and resolves tradeoffs before presenting a plan."],
    ["03", "Approve once, then move", "Book, change, support, and expense remain connected through the entire journey."],
]

function Logo() {
    return <a className="rv-logo" href="/" aria-label="Miraee home"><span>m</span>iraee</a>
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const seen = useInView(ref, { once: true, margin: "-12% 0px" })
    return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 52 }} animate={seen ? { opacity: 1, y: 0 } : {}} transition={{ duration: .9, delay, ease: EO }}>{children}</motion.div>
}

function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
    return <div className="rv-eyebrow"><span>{n}</span><p>{children}</p></div>
}

function Nav() {
    return <motion.nav className="rv-nav" initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: .8, ease: EO }}>
        <Logo />
        <div className="rv-nav__links"><a href="#platform">Platform</a><a href="#people">For teams</a><a href="#security">Security</a></div>
        <div className="rv-nav__actions"><ThemeToggle size={34} /><a href="https://app.miraee.ai">Sign in</a><a className="rv-nav__cta" href="/book-a-demo">Book a demo</a></div>
    </motion.nav>
}

function AgentCard() {
    return <motion.div className="rv-agent" initial={{ opacity: 0, rotate: 5, y: 80 }} animate={{ opacity: 1, rotate: -2, y: 0 }} transition={{ duration: 1.1, delay: .35, ease: EO }}>
        <div className="rv-agent__top"><span>TRIP / 0812</span><span className="rv-live">● AGENT ACTIVE</span></div>
        <div className="rv-agent__query">“Singapore next Tuesday. Near Marina Bay. Window seat.”</div>
        <div className="rv-route"><div><small>06:40</small><strong>SFO</strong><span>San Francisco</span></div><i>✦</i><div><small>14:25</small><strong>SIN</strong><span>Singapore</span></div></div>
        <div className="rv-agent__note"><b>✓</b><p><strong>Journey ready</strong><span>Policy checked · hotel matched · transfer held</span></p></div>
        <div className="rv-agent__chips"><span>Premium economy</span><span>1 stop</span><span>$428 saved</span></div>
    </motion.div>
}

function Hero() {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], [0, 180])
    const cardY = useTransform(scrollYProgress, [0, 1], [0, -120])
    return <section ref={ref} className="rv-hero">
        <div className="rv-hero__grid">
            <motion.div className="rv-hero__copy" style={{ y }}>
                <motion.div className="rv-hero__tag" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15 }}>THE AI TRAVEL OPERATING SYSTEM</motion.div>
                <h1><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EO }}>Travel should feel</motion.span><motion.span className="rv-serif" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: .12, ease: EO }}>like it runs itself.</motion.span></h1>
                <motion.div className="rv-hero__footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7 }}><p>One personal agent for every employee. One live system for travel, expense, and support.</p><a href="/book-a-demo">Meet your agent <span>↗</span></a></motion.div>
            </motion.div>
            <motion.div className="rv-hero__visual" style={{ y: cardY }}><AgentCard /><div className="rv-float rv-float--one"><small>SAVINGS FOUND</small><b>$428</b></div><div className="rv-float rv-float--two">Human support<br /><b>still included.</b></div></motion.div>
        </div>
        <div className="rv-scroll">SCROLL TO DEPART <span>↓</span></div>
    </section>
}

function Proof() { return <section className="rv-proof"><div className="rv-proof__track">{[...stats, ...stats].map(([v,l],i)=><div key={i}><b>{v}</b><span>{l}</span></div>)}</div></section> }

function Problem() { return <section className="rv-section rv-problem"><Reveal><Eyebrow n="01">The friction</Eyebrow><div className="rv-heading-grid"><h2>Business travel became<br /><em>administrative work.</em></h2><p>The traveler became the coordinator. Finance became the detective. Support became a queue.</p></div></Reveal><div className="rv-pain-grid">{pains.map(([n,t,b],i)=><Reveal key={t} className={`rv-pain rv-pain--${i+1}`} delay={i*.1}><span>{n}</span><h3>{t}</h3><p>{b}</p><i>↘</i></Reveal>)}</div></section> }

function Shift() { return <section className="rv-shift"><Reveal className="rv-shift__inner"><span className="rv-shift__orbit">M</span><div><Eyebrow n="02">The shift</Eyebrow><h2>From software you operate<br />to an agent that <em>operates for you.</em></h2><p>Miraee doesn’t add another dashboard. It becomes the connective layer across inventory, policy, payments, expense, and people.</p></div></Reveal></section> }

function Platform() {
    const ref = useRef<HTMLElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] }); const x = useSpring(useTransform(scrollYProgress,[0,1],[80,-80]),{stiffness:80,damping:22})
    return <section ref={ref} id="platform" className="rv-section rv-platform"><Reveal><Eyebrow n="03">One continuous journey</Eyebrow><div className="rv-heading-grid"><h2>Four jobs.<br /><em>One conversation.</em></h2><p>Context follows the traveler from the first request to the final reconciled receipt.</p></div></Reveal><motion.div className="rv-cap-grid" style={{ x }}>{capabilities.map(([t,b],i)=><article key={t}><span>0{i+1}</span><div className="rv-cap-icon">{["↗","⌁","✓","✦"][i]}</div><h3>{t}</h3><p>{b}</p><a href="/book-a-demo">See it in action →</a></article>)}</motion.div></section>
}

function People() { return <section id="people" className="rv-people"><Reveal><Eyebrow n="04">Built around people</Eyebrow><h2>Everyone gets<br /><em>what they need.</em></h2></Reveal><div className="rv-role-list">{roles.map(([t,b],i)=><Reveal className="rv-role" key={t} delay={i*.08}><span>0{i+1}</span><h3>{t}</h3><p>{b}</p><i>↗</i></Reveal>)}</div></section> }

function Process() { return <section className="rv-section rv-process"><Reveal><Eyebrow n="05">How it works</Eyebrow><h2>Ask. Approve.<br /><em>Keep moving.</em></h2></Reveal><div className="rv-step-grid">{steps.map(([n,t,b],i)=><Reveal key={t} className="rv-step" delay={i*.12}><div><span>{n}</span><b>{i===0?"◉":i===1?"✦":"✓"}</b></div><h3>{t}</h3><p>{b}</p></Reveal>)}</div></section> }

function Compare() { const rows=[["Natural-language planning","—","✓"],["Live policy decisions","Partial","✓"],["Personal + business travel","—","✓"],["Proactive disruption handling","—","✓"],["Expense prepared automatically","Partial","✓"]]; return <section className="rv-compare"><Reveal><Eyebrow n="06">The difference</Eyebrow><div className="rv-heading-grid"><h2>Not another booking tool.<br /><em>A new operating model.</em></h2><p>Legacy tools wait for clicks. Miraee understands intent, makes decisions, and completes the work.</p></div></Reveal><Reveal className="rv-table"><div className="rv-table__head"><span>Capability</span><span>Legacy TMC</span><span>Miraee</span></div>{rows.map(r=><div key={r[0]}><span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span></div>)}</Reveal></section> }

function Security() { return <section id="security" className="rv-security"><div className="rv-security__grid"><Reveal><Eyebrow n="07">Enterprise trust</Eyebrow><h2>Autonomous where it helps.<br /><em>Controlled where it matters.</em></h2><p>Policy, identity, approval, and auditability are built into every agent decision—not bolted on after.</p></Reveal><div className="rv-security__marks">{[["SOC 2","Controls"],["SSO","Identity"],["GDPR","Privacy"],["24/7","Humans"]].map(([a,b],i)=><Reveal key={a} className="rv-mark" delay={i*.08}><b>{a}</b><span>{b}</span></Reveal>)}</div></div></section> }

function CTA() { return <section className="rv-cta"><motion.div className="rv-cta__orb" animate={{ rotate:360 }} transition={{ duration:30,repeat:Infinity,ease:"linear" }}>MIRAEE · YOUR TRAVEL AGENT · </motion.div><Reveal><p>YOUR NEXT TRIP STARTS HERE</p><h2>Put business travel<br /><em>on autopilot.</em></h2><a href="/book-a-demo">Book a 20-minute demo <span>↗</span></a></Reveal></section> }

function Footer() { return <footer className="rv-footer"><div><Logo /><p>AI-native employee travel.<br />A Tabhi company.</p></div><div><a href="/support">Support</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div><div><a href="mailto:hello@miraee.ai">hello@miraee.ai</a><span>© 2026 Miraee</span></div></footer> }

export default function HomeRevamp() { return <main className="rv-site rv-modern"><ScrollProgress /><GrainOverlay /><Nav /><Hero /><Proof /><Problem /><Shift /><Platform /><People /><Process /><Compare /><Security /><CTA /><Footer /></main> }
