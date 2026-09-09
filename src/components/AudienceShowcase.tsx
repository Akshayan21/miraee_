import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion"
import { useRef, useState } from "react"
import employeesImg from "../../images/weavy/v1/solutions/v1-solutions-employees.webp"
import managersImg from "../assets/Manager Image.jpg"
import financeImg from "../assets/Finance .jpg"
import adminsImg from "../assets/Admin.jpg"
import chrosImg from "../assets/HR.jpg"
import travelLeadsImg from "../assets/Travel Lead.jpg"
import "./AudienceShowcase.css"

const audiences = [
    { label: "Employees", image: employeesImg, focalPoint: "center 38%", mobileFocalPoint: "56% center", title: "A journey that feels personal", copy: "Ask once, book in policy, and keep moving without becoming the trip coordinator." },
    { label: "Managers", image: managersImg, focalPoint: "center 42%", mobileFocalPoint: "50% center", title: "Approve with context, not paperwork", copy: "See the decision, policy, and cost in one place before the trip moves forward." },
    { label: "Finance", image: financeImg, focalPoint: "center 40%", mobileFocalPoint: "57% center", title: "Know the spend before it lands", copy: "Bookings, payments, receipts, and reconciliation stay connected from the start." },
    { label: "Administrators", image: adminsImg, focalPoint: "center 6%", mobileFocalPoint: "center top", title: "Run the program by exception", copy: "Set guardrails once and focus only on the moments that genuinely need attention." },
    { label: "CHROs", image: chrosImg, focalPoint: "42% center", mobileFocalPoint: "38% center", title: "Turn travel into an employee benefit", copy: "Give people a better work-trip experience while preserving control and duty of care." },
    { label: "Travel leads", image: travelLeadsImg, focalPoint: "center 42%", mobileFocalPoint: "42% center", title: "One view across every journey", copy: "Keep travelers moving with live context, proactive changes, and human support when needed." },
] as const

export default function AudienceShowcase({ embedded = false }: { embedded?: boolean }) {
    const [active, setActive] = useState(0)
    const reduceMotion = useReducedMotion()
    const scrollRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start 70%", "end 35%"] })
    useMotionValueEvent(scrollYProgress, "change", progress => {
        if (typeof window !== "undefined" && window.matchMedia("(max-width: 820px)").matches) return
        const next = Math.min(audiences.length - 1, Math.floor(progress * audiences.length))
        setActive(current => current === next ? current : next)
    })
    const item = audiences[active]
    const content = <div className="audience-showcase__layout">
        <div className="audience-showcase__tabs" role="tablist" aria-label="Explore Miraee by role">
            {audiences.map((audience, index) => <button key={audience.label} type="button" role="tab" aria-selected={active === index} aria-controls="audience-panel" onClick={() => setActive(index)}>
                {active === index && <motion.i className="audience-showcase__active" layoutId="audience-active" transition={{ type: "spring", stiffness: 180, damping: 24 }} aria-hidden="true" />}
                <span>{String(index + 1).padStart(2, "0")}</span><b>{audience.label}</b><em aria-hidden="true">↗</em>
            </button>)}
        </div>
        <div id="audience-panel" className="audience-showcase__panel" role="tabpanel" tabIndex={0}>
            <AnimatePresence mode="wait">
                <motion.img key={item.image} src={item.image} alt={`${item.label} using Miraee employee travel`} style={{ "--audience-position": item.focalPoint, "--audience-position-mobile": item.mobileFocalPoint } as React.CSSProperties} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: .99 }} transition={{ duration: reduceMotion ? .16 : .38, ease: [0.16, 1, 0.3, 1] }} />
            </AnimatePresence>
            <div className="audience-showcase__story"><span>{item.label}</span><h3>{item.title}</h3><p>{item.copy}</p></div>
            <div className="audience-showcase__count"><b>{String(active + 1).padStart(2, "0")}</b><span>/ {String(audiences.length).padStart(2, "0")}</span></div>
        </div>
    </div>

    const scroller = <div ref={scrollRef} className="audience-showcase__scroll"><div className="audience-showcase__sticky">{content}</div></div>
    if (embedded) return <div className="audience-showcase audience-showcase--embedded">{scroller}</div>
    return <section className="audience-showcase audience-showcase--section"><header><span>Built around your people</span><h2>One platform.<br />A better day for every role.</h2><p>Choose a role to see how Miraee changes the work behind every journey.</p></header>{scroller}</section>
}
