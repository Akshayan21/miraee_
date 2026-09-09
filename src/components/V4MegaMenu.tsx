import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { MiraeeLogo } from "./LegalFormKit"
import { ease } from "./V2Kit"
import { useWindowWidth } from "../hooks/useWindowSize"
import { V4_NAV, V4_NAV_ITEMS, isSectionActive } from "./V4NavData"
import type { NavItem, NavKey, NavLeaf } from "./V4NavData"

// V4's primary nav: a Navan-style mega menu built as a *disclosure* widget, not
// an ARIA menubar. These are links to pages, so role="menu"/"menuitem" would
// cost more than it gives — it collapses every link to a single tab stop,
// stops screen readers announcing "link", and flips them out of browse mode
// inside a panel whose whole point is readable descriptor text. `aria-expanded`
// + `aria-controls` on a <button> is the correct and complete contract.
//
// Deliberately no `aria-haspopup`: its permitted values are menu/listbox/tree/
// grid/dialog, and the panel is none of those.
//
// All chrome is `.v4-nav*` and styled in V4.css. V4 does not import
// HomeV2Light.css (that would drag in V2's hero art direction and let
// V2AlternatingSections.css repaint V4 sections), so it cannot borrow `.m-nav`.

const HOVER_OPEN_MS = 100
const HOVER_CLOSE_MS = 220
const COMPACT_BREAKPOINT = 1240

function groupId(key: string, heading: string) {
    return `v4-nav-${key}-${heading.toLowerCase().replace(/[^a-z]+/g, "-")}`
}

function PanelLeaf({ leaf, feature = false }: { leaf: NavLeaf; feature?: boolean }) {
    return (
        <Link className={feature ? "v4-nav__feature" : "v4-nav__leaf"} to={leaf.to}>
            <span className="v4-nav__leaf-label">{leaf.label}</span>
            {leaf.desc && <small className="v4-nav__leaf-desc">{leaf.desc}</small>}
        </Link>
    )
}

export function V4Nav({ transparent = false }: { transparent?: boolean } = {}) {
    const { pathname, key: locationKey } = useLocation()
    const isCompact = useWindowWidth() < COMPACT_BREAKPOINT
    const reduced = useReducedMotion()

    const [openKey, setOpenKey] = useState<NavKey | null>(null)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileGroup, setMobileGroup] = useState<NavKey | null>(null)
    // Set by ArrowDown on a trigger; consumed once that panel has mounted.
    const focusFirstOnOpen = useRef(false)
    const [scrolled, setScrolled] = useState(false)

    const navRef = useRef<HTMLElement>(null)
    const sheetRef = useRef<HTMLDivElement>(null)
    const burgerRef = useRef<HTMLButtonElement>(null)
    const triggerRefs = useRef(new Map<NavKey, HTMLButtonElement>())
    const hoverTimer = useRef(0)
    // Read once in an effect rather than during render so hydration stays
    // deterministic. Hybrid touch laptops otherwise strand a panel open.
    const canHover = useRef(false)

    useEffect(() => {
        canHover.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    }, [])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    // Close on navigation, and when crossing the compact breakpoint. Both are
    // "adjust state when an input changes" rather than side effects, so they run
    // during render instead of in an effect — React re-renders immediately
    // without painting the stale open menu.
    //
    // Navigation is keyed on location.key, not pathname: the mega menu is full
    // of same-page hash links, which push a new entry with the same path.
    const [lastLocationKey, setLastLocationKey] = useState(locationKey)
    if (lastLocationKey !== locationKey) {
        setLastLocationKey(locationKey)
        setOpenKey(null)
        setMobileOpen(false)
    }

    const [lastCompact, setLastCompact] = useState(isCompact)
    if (lastCompact !== isCompact) {
        setLastCompact(isCompact)
        setOpenKey(null)
        setMobileOpen(false)
    }

    // Escape closes whichever surface is open, and returns focus to what opened it.
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return
            if (mobileOpen) {
                setMobileOpen(false)
                burgerRef.current?.focus()
            } else if (openKey) {
                triggerRefs.current.get(openKey)?.focus()
                setOpenKey(null)
            }
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [openKey, mobileOpen])

    // pointerdown, not click: the panel unmounts before a click event lands.
    useEffect(() => {
        if (!openKey) return
        const onDown = (event: PointerEvent) => {
            if (!navRef.current?.contains(event.target as Node)) setOpenKey(null)
        }
        document.addEventListener("pointerdown", onDown)
        return () => document.removeEventListener("pointerdown", onDown)
    }, [openKey])

    // The mobile sheet has a backdrop and a scroll lock, so it *is* modal and
    // gets a focus trap. The desktop panel is not modal and deliberately does
    // not — trapping there would strand keyboard users behind a transparent popup.
    useEffect(() => {
        if (!mobileOpen) return
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        sheetRef.current?.focus()
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Tab" || !sheetRef.current) return
            const focusable = sheetRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
            if (!focusable.length) return
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
            }
        }
        window.addEventListener("keydown", onKeyDown)
        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [mobileOpen])

    useEffect(() => () => window.clearTimeout(hoverTimer.current), [])

    // Runs after the panel for `openKey` is in the DOM.
    useEffect(() => {
        if (!openKey || !focusFirstOnOpen.current) return
        focusFirstOnOpen.current = false
        document.getElementById(`v4-panel-${openKey}`)?.querySelector<HTMLElement>("a")?.focus()
    }, [openKey])

    const schedule = useCallback((fn: () => void, ms: number) => {
        window.clearTimeout(hoverTimer.current)
        hoverTimer.current = window.setTimeout(fn, ms)
    }, [])

    // Open on a short dwell so sweeping across the bar doesn't fire panels, but
    // switch instantly once one is already open — a stagger there reads as lag.
    const hoverOpen = (key: NavKey) => () => {
        if (!canHover.current || isCompact) return
        schedule(() => setOpenKey(key), openKey ? 0 : HOVER_OPEN_MS)
    }
    const hoverClose = () => {
        if (!canHover.current || isCompact) return
        schedule(() => setOpenKey(null), HOVER_CLOSE_MS)
    }

    const panelKeys = V4_NAV.filter(item => item.kind === "panel").map(item => item.key as NavKey)

    const onTriggerKeyDown = (key: NavKey) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault()
            focusFirstOnOpen.current = true
            setOpenKey(key)
        } else if (event.key === "ArrowUp") {
            event.preventDefault()
            setOpenKey(null)
        } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault()
            const index = panelKeys.indexOf(key)
            const step = event.key === "ArrowRight" ? 1 : -1
            const next = panelKeys[(index + step + panelKeys.length) % panelKeys.length]
            triggerRefs.current.get(next)?.focus()
        }
    }

    // Focus leaving the <li> entirely (trigger + panel) closes it, so tabbing
    // from the last panel link onto the next trigger behaves correctly.
    const closeOnFocusOut = (event: React.FocusEvent<HTMLLIElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenKey(null)
    }

    const renderPanelItem = (item: Extract<NavItem, { kind: "panel" }>) => (
        <li key={item.key} className="v4-nav__item" onPointerEnter={hoverOpen(item.key as NavKey)} onPointerLeave={hoverClose} onBlur={closeOnFocusOut}>
            <button
                type="button"
                className="v4-nav__trigger"
                ref={node => { if (node) triggerRefs.current.set(item.key as NavKey, node); else triggerRefs.current.delete(item.key as NavKey) }}
                aria-expanded={openKey === item.key}
                aria-controls={`v4-panel-${item.key}`}
                data-current={isSectionActive(item, pathname) || undefined}
                onClick={() => setOpenKey(current => (current === item.key ? null : (item.key as NavKey)))}
                onKeyDown={onTriggerKeyDown(item.key as NavKey)}>
                {item.label}
                <svg className="v4-nav__caret" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <AnimatePresence>
                {openKey === item.key && (
                    <motion.div
                        id={`v4-panel-${item.key}`}
                        className={"v4-nav__panel v4-nav__panel--" + item.layout}
                        initial={{ opacity: 0, y: reduced ? 0 : -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduced ? 0 : -4 }}
                        transition={{ duration: reduced ? 0 : 0.18, ease }}>
                        <div className="v4-nav__panel-inner">
                            {item.groups.map(group => (
                                <section className="v4-nav__group" key={group.heading}>
                                    <h3 className="v4-nav__group-head" id={groupId(item.key, group.heading)}>{group.heading}</h3>
                                    {group.feature && <PanelLeaf leaf={group.feature} feature />}
                                    <ul className="v4-nav__list" aria-labelledby={groupId(item.key, group.heading)}>
                                        {group.items.map(leaf => <li key={leaf.to}><PanelLeaf leaf={leaf} /></li>)}
                                    </ul>
                                </section>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    )

    return (
        <>
            <header className={"v4-nav" + (transparent && !scrolled ? " v4-nav--transparent" : "") + (scrolled ? " is-scrolled" : "")} ref={navRef}>
                <Link to="/v4" aria-label="Miraee home" className="v4-nav__logo" onClick={() => setMobileOpen(false)}>
                    <MiraeeLogo fill="#E55602" height={20} />
                </Link>
                {!isCompact && (
                    <nav aria-label="Primary navigation">
                        <ul className="v4-nav__bar">
                            {V4_NAV_ITEMS.map(item => item.kind === "link"
                                ? (
                                    <li key={item.key} className="v4-nav__item">
                                        <Link className="v4-nav__trigger" to={item.to} data-current={pathname === item.to || undefined}>{item.label}</Link>
                                    </li>
                                )
                                : renderPanelItem(item))}
                        </ul>
                    </nav>
                )}
                <div className="v4-nav__actions">
                    {!isCompact && <a href="https://app.miraee.ai">Sign in</a>}
                    <Link to="/book-a-demo" className="v4-nav__cta">Book a demo</Link>
                    {isCompact && (
                        <button type="button" ref={burgerRef} className="v4-nav__burger" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="v4-nav-mobile" onClick={() => setMobileOpen(open => !open)}>
                            <span /><span />
                        </button>
                    )}
                </div>
            </header>

            <AnimatePresence>
                {isCompact && mobileOpen && (
                    <>
                        <motion.button type="button" className="v4-nav__backdrop" aria-label="Close menu" onClick={() => setMobileOpen(false)}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
                        <motion.div
                            id="v4-nav-mobile"
                            ref={sheetRef}
                            tabIndex={-1}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Site menu"
                            className="v4-nav__sheet"
                            key="v4-nav-mobile"
                            initial={{ opacity: 0, y: -12, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.99 }}
                            transition={{ duration: reduced ? 0 : 0.24, ease }}>
                            <div className="v4-nav__sheet-head"><span>Navigate</span></div>
                            <nav className="v4-nav__acc" aria-label="Primary navigation">
                                {V4_NAV_ITEMS.map(item => item.kind === "link"
                                    ? (
                                        <Link key={item.key} className="v4-nav__acc-link" to={item.to} onClick={() => setMobileOpen(false)}>{item.label}</Link>
                                    )
                                    : (
                                        <div className="v4-nav__acc-item" key={item.key}>
                                            <button type="button" className="v4-nav__acc-trigger"
                                                aria-expanded={mobileGroup === item.key}
                                                aria-controls={`v4-acc-${item.key}`}
                                                onClick={() => setMobileGroup(current => (current === item.key ? null : (item.key as NavKey)))}>
                                                {item.label}
                                                <svg className="v4-nav__caret" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {mobileGroup === item.key && (
                                                    <motion.div id={`v4-acc-${item.key}`} className="v4-nav__acc-panel" style={{ overflow: "hidden" }}
                                                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: reduced ? 0 : 0.22, ease }}>
                                                        {item.groups.map(group => (
                                                            <div className="v4-nav__acc-group" key={group.heading}>
                                                                <h3 id={groupId(item.key, group.heading)}>{group.heading}</h3>
                                                                <ul aria-labelledby={groupId(item.key, group.heading)}>
                                                                    {group.feature && <li><Link to={group.feature.to} onClick={() => setMobileOpen(false)}>{group.feature.label}</Link></li>}
                                                                    {group.items.map(leaf => <li key={leaf.to}><Link to={leaf.to} onClick={() => setMobileOpen(false)}>{leaf.label}</Link></li>)}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                            </nav>
                            <div className="v4-nav__sheet-foot">
                                <a href="https://app.miraee.ai" onClick={() => setMobileOpen(false)}>Sign in <span aria-hidden="true">↗</span></a>
                                <Link to="/book-a-demo" onClick={() => setMobileOpen(false)}>Book a demo</Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
