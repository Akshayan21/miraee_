import { useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, useInView, useReducedMotion } from "framer-motion"
import type { ReactNode, CSSProperties } from "react"
import { MiraeeLogo } from "./LegalFormKit"
import { VersionSwitch } from "./VersionSwitch"
import miraeeFavicon from "../assets/favicon-180.png"
import userAvatar from "../assets/role-traveller.jpg"

// Shared chrome for the v3 marketing site  -  an editorial "dossier" system
// (serif display type, monospace numbering, numbered hairline rows) styled
// in ../pages/V3.css. Import "../pages/V3.css" once per page and wrap page
// content in a <div className="v3-page"> so these scoped styles apply.

const ease = [0.16, 1, 0.3, 1] as const

type RevealProps = { children: ReactNode; className?: string; delay?: number; style?: CSSProperties; "aria-label"?: string }

export function Reveal({ children, className = "", delay = 0, style, ...rest }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const visible = useInView(ref, { once: true, margin: "-8% 0px" })
    const reduced = useReducedMotion()
    return (
        <motion.div ref={ref} className={className} style={style} {...rest} initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: reduced ? 0 : 0.6, delay, ease }}>
            {children}
        </motion.div>
    )
}

const NAV_LINKS: [string, string][] = [
    ["Home", "/v3"],
    ["Product", "/v3/product"],
    ["Savings & Rewards", "/v3/savings"],
    ["For HR", "/v3/hr"],
    ["Enterprise", "/v3/enterprise"],
]

export function V3Nav() {
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false)
    return (
        <nav className="v3-nav" aria-label="Main">
            <div className="v3-nav-inner">
                <Link to="/v3" className="v3-nav-logo" aria-label="Miraee home" onClick={() => setOpen(false)}>
                    <MiraeeLogo fill="#171009" height={22} />
                </Link>
                <button type="button" className="v3-menu-btn" aria-expanded={open} aria-controls="v3NavLinks" onClick={() => setOpen(o => !o)}>Menu</button>
                <div className={"v3-nav-links" + (open ? " open" : "")} id="v3NavLinks">
                    <VersionSwitch className="v3-version-switch v3-version-switch--mobile" />
                    {NAV_LINKS.map(([label, href]) => (
                        <Link key={href} className={"pl" + (pathname === href ? " active" : "")} to={href} onClick={() => setOpen(false)}>{label}</Link>
                    ))}
                    <VersionSwitch className="v3-version-switch v3-version-switch--desktop" />
                    <Link className="btn btn-solid v3-nav-cta" to="/v3/demo" onClick={() => setOpen(false)}>Book a demo</Link>
                </div>
            </div>
        </nav>
    )
}

export function V3Footer() {
    return (
        <footer className="v3-footer">
            <div className="wrap">
                <div className="cols">
                    <div>
                        <div style={{ marginBottom: 18 }}><MiraeeLogo fill="#fff" height={22} /></div>
                        <p style={{ maxWidth: "34ch", fontSize: 14.5 }}>Travel limitless with Miraee. Corporate travel reimagined around the traveler — powered by AI, backed by humans.</p>
                    </div>
                    <div>
                        <h4>Product</h4>
                        <Link to="/v3/product">The Miraee experience</Link>
                        <Link to="/v3/savings">Savings &amp; rewards</Link>
                        <Link to="/v3/hr">For HR &amp; employees</Link>
                        <Link to="/v3/enterprise">For the enterprise</Link>
                    </div>
                    <div>
                        <h4>Company</h4>
                        <Link to="/v3/demo">Book a demo</Link>
                        <Link to="/v3/demo">Contact sales</Link>
                        <Link to="/privacy">Privacy policy</Link>
                    </div>
                </div>
                <div className="base">
                    <span>© {new Date().getFullYear()} Miraee. All rights reserved.</span>
                    <span>Save more · Travel better · Get help instantly · Reward your people · Stay in control</span>
                </div>
            </div>
        </footer>
    )
}

// A single conversation card with avatar'd, alternating ask/reply rows  - 
// replaces stacking each message as its own identical card.
export function Transcript({ lines, className = "" }: { lines: { from: "ask" | "reply"; label?: string; text: ReactNode }[]; className?: string }) {
    return (
        <Reveal className={"transcript" + (className ? " " + className : "")}>
            {lines.map((line, i) => (
                <div className={"t-line " + line.from} key={i}>
                    <span className={"t-avatar t-avatar--photo"} aria-hidden="true">
                        {line.from === "ask"
                            ? <img src={userAvatar} alt="" style={{ objectPosition: "50% 15%", transform: "scale(1.8)" }} />
                            : <img src={miraeeFavicon} alt="" />}
                    </span>
                    <div className="t-body">
                        <span className="who">{line.label ?? (line.from === "ask" ? "The ask" : "Miraee replies")}</span>
                        <p className={line.from}>{line.text}</p>
                    </div>
                </div>
            ))}
        </Reveal>
    )
}

// Numbered hairline-divided row list  -  the core reusable content pattern
// for this design system (replaces cards-in-a-grid and mockup slots).
export function Rows({ items, split = false, className = "" }: { items: { title: string; body: string; tag?: string }[]; split?: boolean; className?: string }) {
    return (
        <div className={"rows" + (split ? " split" : "") + (className ? " " + className : "")}>
            {items.map((item, i) => (
                <Reveal className={"row-item" + (item.tag ? " with-tag" : "")} key={item.title} delay={Math.min(i, 6) * 0.03}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <div><h3>{item.title}</h3><p>{item.body}</p></div>
                    {item.tag && <span className="tag">{item.tag}</span>}
                </Reveal>
            ))}
        </div>
    )
}
