import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { MiraeeLogo } from "./LegalFormKit"
import { useWindowWidth } from "../hooks/useWindowSize"
import { VersionSwitch } from "./VersionSwitch"

// Shared chrome and content primitives for the v2 marketing site (home +
// product / for-teams / security / about / why-miraee) so every page renders
// off the same design system defined in HomeV2Light.css.

export const ease = [0.16, 1, 0.3, 1] as const

export function Reveal({ children, className = "", delay = 0, id }: { children: ReactNode; className?: string; delay?: number; id?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const visible = useInView(ref, { once: true, margin: "-8% 0px" })
    const reduced = useReducedMotion()
    return (
        <motion.div ref={ref} id={id} className={className} initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: reduced ? 0 : 0.6, delay, ease }}>
            {children}
        </motion.div>
    )
}

const NAV_LINKS: [string, string][] = [
    ["Home", "/v2"],
    ["Platform", "/product"],
    ["Solutions", "/for-teams"],
    ["AI & Technology", "/technology"],
    ["About", "/about"],
]

export function V2Nav({ active }: { active?: string }) {
    const vw = useWindowWidth()
    const isCompact = vw < 1240
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 1240) setOpen(false) }
        window.addEventListener("resize", onResize, { passive: true })
        return () => window.removeEventListener("resize", onResize)
    }, [])

    useEffect(() => {
        if (!open) return
        const previousOverflow = document.body.style.overflow
        const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false) }
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", onKeyDown)
        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [open])

    return (
        <>
            <header className={"m-nav" + (scrolled ? " is-scrolled" : "")}>
                <Link to="/v2" aria-label="Miraee home" className="m-nav__logo" onClick={() => setOpen(false)}><MiraeeLogo fill="#E55602" height={20} /></Link>
                {!isCompact && (
                    <nav aria-label="Primary navigation">
                        {NAV_LINKS.map(([label, href]) => (
                            <Link key={href} to={href} aria-current={active === href ? "page" : undefined}>{label}</Link>
                        ))}
                    </nav>
                )}
                <div className="m-nav__actions">
                    {!isCompact && <VersionSwitch className="m-nav__version" />}
                    {!isCompact && <a href="https://app.miraee.ai">Sign in</a>}
                    <Link to="/book-a-demo" className="m-nav__cta">Book a demo</Link>
                    {isCompact && (
                        <button type="button" className="m-nav__burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="m-nav-mobile" onClick={() => setOpen(v => !v)}>
                            <span /><span />
                        </button>
                    )}
                </div>
            </header>
            <AnimatePresence>
                {isCompact && open && (
                    <>
                        <motion.button type="button" className="m-nav__backdrop" aria-label="Close menu" onClick={() => setOpen(false)}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }} />
                        <motion.nav id="m-nav-mobile" className="m-nav__mobile" key="m-nav-mobile" aria-label="Mobile navigation"
                            initial={{ opacity: 0, y: -12, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .99 }} transition={{ duration: .24, ease }}>
                            <div className="m-nav__mobile-head"><span>Navigate</span><VersionSwitch className="m-nav__version m-nav__version--mobile" /></div>
                            <div className="m-nav__mobile-links">
                                {NAV_LINKS.map(([label, href], index) => (
                                    <Link key={href} to={href} aria-current={active === href ? "page" : undefined} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}<b aria-hidden="true">↗</b></Link>
                                ))}
                            </div>
                            <div className="m-nav__mobile-foot">
                                <a href="https://app.miraee.ai" onClick={() => setOpen(false)}>Sign in <span aria-hidden="true">↗</span></a>
                                <Link to="/book-a-demo" onClick={() => setOpen(false)}>Book a demo</Link>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export function Faq({ items }: { items: [string, ReactNode][] }) {
    const [open, setOpen] = useState(0)
    return (
        <div className="m-faq">
            {items.map(([q, a], i) => (
                <div className={"m-faq__item" + (open === i ? " is-open" : "")} key={q}>
                    <button type="button" className="m-faq__q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                        <span>{q}</span>
                        <span className="m-faq__icon" aria-hidden="true">{open === i ? "−" : "+"}</span>
                    </button>
                    <div className="m-faq__panel">
                        <p>{a}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

// Borderless, editorial replacement for a bordered data table: a bold title,
// then either a plain description (2-column data) or a line of small
// label/value pairs (3+ columns) — divided by hairlines, no boxes or cells.
export function EditorialRows({ headers, rows, caption, highlightLast = false, checkmark = false, numbered = true, columns = 1 }: { headers: string[]; rows: string[][]; caption: string; highlightLast?: boolean; checkmark?: boolean; numbered?: boolean; columns?: 1 | 2 | 3 }) {
    const simple = headers.length === 2
    const metaCols = `repeat(${Math.max(headers.length - 1, 1)}, minmax(120px, 1fr))`
    return (
        <div className={"m-edrows" + (numbered ? "" : " m-edrows--plain") + (columns > 1 ? " m-edrows--grid" : "")}
            style={columns > 1 ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}
            role="table" aria-label={caption}>
            {rows.map((r, i) => {
                const meta = r.slice(1)
                return (
                    <div className="m-edrow" role="row" key={i}>
                        <strong>{r[0]}</strong>
                        {simple ? (
                            meta[0] && <p className="m-edrow__desc">{meta[0]}</p>
                        ) : meta.length > 0 && (
                            <div className="m-edrow__meta" style={{ gridTemplateColumns: metaCols }}>
                                {meta.map((cell, j) => {
                                    const isWin = highlightLast && j === meta.length - 1
                                    return (
                                        <div className="m-edrow__cell" key={j}>
                                            <span className="m-edrow__label">{headers[j + 1]}</span>
                                            <span className={"m-edrow__value" + (isWin ? " m-edrow__win" : "")}>{isWin && checkmark ? "✓ " : ""}{cell}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

// Compact, real multi-column comparison table — used only where content is
// genuinely tabular (the same few columns repeated across many rows, like a
// competitor comparison). A proper table here is far shorter than the same
// data stacked as editorial rows; no borders/backgrounds, hairlines only.
export function MiniTable({ headers, rows, caption, highlightLast = false, checkmark = false }: { headers: string[]; rows: string[][]; caption: string; highlightLast?: boolean; checkmark?: boolean }) {
    const cols = `minmax(180px, 1.4fr) repeat(${headers.length - 1}, minmax(90px, 1fr))`
    return (
        <div className="m-mini" role="table" aria-label={caption}>
            <div className="m-mini__row m-mini__head" role="row" style={{ gridTemplateColumns: cols }}>
                {headers.map(h => <span role="columnheader" key={h}>{h}</span>)}
            </div>
            {rows.map((r, i) => (
                <div className="m-mini__row" role="row" key={i} style={{ gridTemplateColumns: cols }}>
                    {r.map((c, j) => {
                        const isWin = highlightLast && j === r.length - 1
                        return <span key={j} data-label={headers[j]} className={j === 0 ? "m-mini__label" : isWin ? "m-mini__win" : undefined}>{isWin && checkmark ? "✓ " : ""}{c}</span>
                    })}
                </div>
            ))}
        </div>
    )
}
