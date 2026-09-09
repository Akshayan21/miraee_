import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef, useEffect } from "react"
import { GrainOverlay, ScrollProgress } from "../animations"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import { Link } from "react-router-dom"
import PersonaShowcase from "../components/PersonaShowcase"
import dashboardImg from "../assets/ui-admin-dashboard.png"
import flightCardImg from "../assets/ui-flight-card.png"
import experiencesImg from "../../images/weavy/v1/v1-experiences-culture.webp"
import closingCtaImg from "../../images/weavy/v1/v1-closing-cta.webp"
import mobilePhoneImg from "../assets/miraee-mobile-phone.png"
import homeHeroImg from "../../images/weavy/v1/v1-home-hero.webp"
import "./HomeElegant.css"
import "./HomeV12.css"

const ease = [0.16, 1, 0.3, 1] as const
const MotionLink = motion.create(Link)

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const visible = useInView(ref, { once: true, margin: "-12% 0px" })
  return <motion.div ref={ref} className={className} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 42, scale: .985, filter: "blur(8px)" }} animate={visible ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}} transition={{ duration: reduce ? .2 : .9, delay: reduce ? 0 : delay, ease }}>{children}</motion.div>
}

function SectionSignal({ light = false }: { light?: boolean }) { return <motion.div className={`el-section-signal${light ? " el-section-signal--light" : ""}`} aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: .6 }} transition={{ duration: 1.15, ease }}><motion.i initial={{ left: "0%" }} whileInView={{ left: "100%" }} viewport={{ once: true }} transition={{ duration: 1.2, delay: .12, ease }}/></motion.div> }

function Hero() {
  return <section className="v12-hero">
    <div className="v12-hero__row">
      <div className="v12-hero__copy">
        <span className="v12-hero__kicker">Travel Limitless · Business travel, personalised</span>
        <h1>A private travel assistant<br /><em>for every employee.</em></h1>
        <p>Give every employee a private travel assistant that plans, books, changes and expenses each business trip inside your policy, in one conversation. Built on real supply, with a real person in the same thread whenever you want one.</p>
        <div className="v12-hero__actions">
          <Link className="v12-btn v12-btn--primary" to="/book-a-demo">Book a demo <span aria-hidden="true">→</span></Link>
          <a className="v12-btn v12-btn--ghost" href="#how-it-works">Explore the platform ↓</a>
        </div>
        <div className="v12-hero__proof">
          <span>One thread</span><i/><span>Live inventory</span><i/><span>Policy built in</span><i/><span>Human support 24/7</span>
        </div>
        <div className="v12-hero__chips">
          <span>SOC 2</span><span>GDPR</span><span>SSO/SCIM</span><span>Audit logs</span>
        </div>
      </div>
      <div className="v12-hero__media">
        <img src={homeHeroImg} alt="Business traveler arriving at a bright international airport" width="1536" height="1024" fetchPriority="high" decoding="async" />
      </div>
    </div>
    <div className="v12-preview">
      <img className="v12-preview__main" src={dashboardImg} alt="Miraee admin dashboard showing trips and spend overview" width="1917" height="1077" fetchPriority="high" decoding="async" />
      <img className="v12-preview__floating" src={mobilePhoneImg} alt="Miraee mobile app showing an active trip" loading="lazy" decoding="async" />
    </div>
  </section>
}


function Friction(){
  const fragments=[
    ["Traveler","Search & book","12 options"],
    ["Manager","Policy approval","Waiting"],
    ["Finance","Payment","Pending"],
    ["Travel desk","Trip changes","Ticket opened"],
    ["Accounting","Expense","Receipt missing"]
  ]
  return <section className="el-friction el-handoff el-handoff--revamp">
    <Reveal className="el-handoff__head"><span className="el-label">The problem</span><h2>Every handoff<br/><em>disrupts the journey.</em></h2><p>Each tool in corporate travel solved one stage and handed the traveler to the next. Every handoff loses context and adds another system for the traveler to manage.</p></Reveal>
    <Reveal className="el-handoff-ledger" delay={.08}>
      <header><div><span>Live journey</span><strong>SFO <i/> SIN</strong></div><small>Five systems · one traveler</small></header>
      <div className="el-handoff-ledger__rows">{fragments.map(([owner,title,state],i)=><article key={title}>
        <span>{String(i+1).padStart(2,"0")}</span><div><small>{owner}</small><h3>{title}</h3></div><em>{state}</em>
      </article>)}</div>
      <footer><span>What gets lost</span><strong>Context, time, and accountability</strong></footer>
    </Reveal>
    <p className="el-handoff__caption">Five owners. Four handoffs. Nobody holding the whole trip.</p>
  </section>
}

const supplyPoints=[["500+ airlines and 2M+ hotels.","Direct supply through Mondee, not a reseller feed.","500+ / 2M+"],["Six specialised agents.","Booking, policy, negotiation, rebooking, expense and support, each with one job and a written limit on what it may do alone.","6 agents"],["Backed by 200+ Tabhi bots.","The six agents run on Tabhi's automation fabric — 200+ specialised bots connecting supply, policy, payment and expense into one framework, so a trip never leaves the platform.","200+ bots"],["A person when it matters.","24/7 human support in the same thread, with the full trip attached.","24/7"]]
function PlatformDifference(){return <section className="el-differentiators"><Reveal className="el-section-head"><span>Built on real supply</span><h2>Global reach.<br/><em>Personal execution.</em></h2></Reveal><div>{supplyPoints.map((d,i)=><Reveal key={d[0]} delay={i*.1}><span>0{i+1}</span><h3>{d[0]}</h3><p>{d[1]}</p><b>{d[2]}</b></Reveal>)}</div><Reveal delay={.3}><Link className="el-text-link" to="/v1.1/about">Miraee is built by Tabhi, the group behind Mondee and Abhee <span aria-hidden="true">→</span></Link></Reveal></section>}

const experiences=["Festivals and culture","Once-in-a-trip moments","Local performances","Markets and makers","The bleisure weekend","Food and discovery"]
function Experiences(){return <section className="el-experiences"><Reveal className="v11-experiences-copy"><span className="el-label">Personal travel, on the same agent</span><h2>Not bookable<br/>anywhere else.</h2><p>Through Abhee, Miraee carries hyperlocal experiences that no other corporate platform has digitised. Add them to a work trip or book them on your own card, in the same conversation.</p><div className="v11-experiences-index">{experiences.map((x,i)=><span key={x}><small>{String(i+1).padStart(2,"0")}</small><b>{x}</b></span>)}</div></Reveal><Reveal className="v11-experiences-media"><img src={experiencesImg} alt="Business traveler discovering a lively local cultural festival" width="1024" height="1536" loading="lazy" decoding="async"/><div className="v11-experiences-caption"><span>After the workday</span><b>Local discovery, one tap away</b></div></Reveal></section>}

function HowItWorks(){
  const actions=[
    ["01","Plan","Miraee reads the request, checks the calendar, searches live inventory and applies policy before showing options. One recommended itinerary and alternates, in under a minute.","Under a minute"],
    ["02","Book","One approval, or none if the trip is inside your limits. Flight, hotel, rail and car booked together, paid on a virtual card.","1 approval"],
    ["03","Protect","Every segment is watched. When a flight moves, the agent prices alternatives and either rebooks within your limits or brings the traveler one clear decision.","24 / 7"],
    ["04","Expense","Receipts are captured, coded and matched to the booking at the transaction. There is no report to file.","0 forms"]
  ]
  return <section id="how-it-works" className="el-workflow el-journey-flow el-journey-flow--revamp">
    <Reveal className="el-journey-flow__head"><span className="el-label">One continuous system</span><h2>From &quot;I need to go&quot;<br/>to <em>everything handled.</em></h2><p>A personal travel agent for every employee. A real-time operating layer for finance and travel teams. The same agent, the same context, start to finish.</p></Reveal>
    <Reveal className="el-journey-board" delay={.08}>
      <div className="el-journey-board__request"><small>Your request</small><blockquote>“Singapore next Tuesday. Window seat. Within policy.”</blockquote><div><span>Window seat</span><span>Company policy</span><span>SFO home airport</span></div></div>
      <div className="el-journey-board__steps">{actions.map(([n,title,desc,metric])=><article key={title}><span>{n}</span><small>{title}</small><p>{desc}</p><b>{metric}</b></article>)}</div>
      <figure><img src={flightCardImg} alt="Miraee best-value flight selection card" width="1635" height="716" loading="lazy" decoding="async"/></figure>
    </Reveal>
    <Reveal className="el-journey-flow__link" delay={.12}><Link to="/v1.1/product">See all six capabilities <span aria-hidden="true">→</span></Link></Reveal>
  </section>
}

const differenceSummary=[["Agents that complete the work.","Legacy tools return options and wait. Miraee books, rebooks and reconciles inside written limits."],["Policy before booking, not after.","Compliance is applied at search, so violations are not something approval has to catch."],["Business and personal travel in one thread.","Same agent, same preferences, separate ledgers. Personal spend never touches company money."]]
function Comparison(){return <section className="el-comparison"><SectionSignal/><Reveal className="el-section-head"><span>The difference</span><h2>Not another booking tool.<br/><em>A different operating model.</em></h2></Reveal><div className="el-difference-list">{differenceSummary.map((d,i)=><Reveal key={d[0]} delay={i*.08}><h3>{d[0]}</h3><p>{d[1]}</p></Reveal>)}</div><Reveal delay={.24}><Link className="el-text-link" to="/v1.1/why-miraee">Compare side by side <span aria-hidden="true">→</span></Link></Reveal></section>}

function Outcomes() {
  return <section id="outcomes" className="el-outcomes v11-outcomes">
    <Reveal className="el-section-head el-section-head--light"><h2>Built for everyone<br/><em>behind the journey.</em></h2></Reveal>
    <PersonaShowcase />
    <p className="el-audience-cards__note">* On comparable itineraries. Results vary by program, route mix and adoption.</p>
  </section>
}

function CTA() { return <section className="el-cta"><img className="v11-cta-photo" src={closingCtaImg} alt="Business travelers celebrating a smooth journey at the airport" width="1536" height="1024" loading="lazy" decoding="async"/><SectionSignal light/><motion.div className="el-cta__halo" animate={{scale:[1,1.15,1],opacity:[.5,.8,.5]}} transition={{duration:7,repeat:Infinity}}/><Reveal><h2>Bring<br/>a real trip.</h2><p>Twenty minutes. Your route, your policy, your edge cases. We run it live.</p><MotionLink whileHover={{y:-4,scale:1.02}} whileTap={{scale:.97}} className="el-button el-button--light" to="/book-a-demo">Book your demo <span aria-hidden="true">↗</span></MotionLink><small className="el-cta__reassurance">No long contracts. No heavy IT lift. Live in as little as 90 days.</small></Reveal></section> }

export default function HomeV11(){
  useEffect(() => {
    // Title tag + meta description per the doc's Home SEO brief.
    document.title = "Miraee | AI Corporate Travel Platform for Mid-Market Teams"
    const description = "A private travel assistant for every employee: it plans, books, changes and expenses each business trip inside company policy. Built on real supply. See a real trip in 20 minutes."
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta) }
    meta.content = description
  }, [])
  return <><a className="el-skip-link" href="#main-content">Skip to main content</a><SiteNav/><main id="main-content" className="el-site v11-site"><ScrollProgress/><GrainOverlay/><Hero/><Friction/><HowItWorks/><Outcomes/><Comparison/><Experiences/><PlatformDifference/><CTA/></main><V1Footer/></> }
