import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { MotionConfig } from "framer-motion"
import type { ReactNode } from "react"
import { MiraeeLogo } from "./LegalFormKit"
import { V4_NAV_ITEMS } from "./V4NavData"
import { V4Nav } from "./V4MegaMenu"
import { usePageMeta } from "../hooks/usePageMeta"

// V4's shared chrome. Content primitives are re-exported from V2Kit rather than
// re-implemented — V4 extends V2's design system, so Reveal/Faq/EditorialRows/
// MiniTable must stay single-sourced. (V3Kit re-implemented Reveal with a
// different rise value; that drift is the thing this avoids.)
import { Reveal } from "./V2Kit"
export { Reveal, Faq, EditorialRows, MiniTable } from "./V2Kit"
export { V4Nav } from "./V4MegaMenu"

// Every V4 page is skip-link + nav + main + footer with the same page meta
// wiring, so the shell owns it and pages supply only their sections.
// Temporary perf isolation switch. Append ?perf=<name> to any V4 URL to disable
// one expensive effect at a time and find what actually costs frames:
//   ?perf=noatmos   the blurred orbs + pointer-tracked blend-mode glow
//   ?perf=noblur    the nav's backdrop-filter
//   ?perf=nosticky  the pinned full-viewport step panels
//   ?perf=notilt    the 3D tilt on the experience cards
//   ?perf=none      all of the above at once
// Remove this once the culprit is known.
function usePerfFlag() {
    const { search } = useLocation()
    useEffect(() => {
        const flag = new URLSearchParams(search).get("perf")
        const root = document.documentElement
        if (flag) root.dataset.perf = flag
        else delete root.dataset.perf
        return () => { delete root.dataset.perf }
    }, [search])
}

// `noindex` is optional and defaults to false, so the 20-odd existing call
// sites are unaffected. It sits alongside title/description deliberately: the
// reason V4 has meta on every route is that this shell demands it as a prop,
// and indexability is the same kind of decision.
export function V4Page({ title, description, noindex, children }: { title: string; description: string; noindex?: boolean; children: ReactNode }) {
    usePageMeta(title, description, { noindex })
    usePerfFlag()
    return (
        // reducedMotion="user" makes every framer-motion animation beneath this
        // honour prefers-reduced-motion. The CSS-level override in index.css
        // cannot reach JS-driven motion values, so this is the only switch that
        // covers the V0 ports (marquee, kinetic band, pinned panels, tilt cards).
        <MotionConfig reducedMotion="user">
            <div className="v4-site">
                <a className="v4-skip" href="#main">Skip to content</a>
                <V4Nav />
                <main id="main">{children}</main>
                <V4Footer />
            </div>
        </MotionConfig>
    )
}

// A page hero. `lede` is the one-line promise under the headline. `image`
// is optional — when passed, the hero splits into the same Navan-style
// layout as the homepage: copy on the left, a real photo framed with depth
// on the right, instead of a single centred column.
export function V4Hero({ eyebrow, title, lede, actions, image, card }: { eyebrow?: string; title: ReactNode; lede?: string; actions?: ReactNode; image?: { src: string; alt: string; position?: string }; card?: { src: string; alt: string; crop?: number; width?: string; anchor?: "middle" | "bottom"; left?: string; bottom?: string } }) {
    const copy = (
        <Reveal>
            {eyebrow && <span className="v4-hero__eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            {lede && <p className="v4-hero__lede">{lede}</p>}
            {actions && <div className="v4-hero__actions">{actions}</div>}
        </Reveal>
    )
    if (!image) {
        return (
            <section className="v4-hero">
                <div className="v4-shell">{copy}</div>
            </section>
        )
    }
    return (
        <section className="v4-hero">
            <div className="v4-shell v4-hero__split">
                {copy}
                <Reveal delay={0.12}>
                    {/* .v4-hero__media matches the homepage hero's structure —
                        overflow visible so an optional UI-card image (same
                        Navan pattern: real photo + a floating real product
                        card) can hang past the photo's own rounded edge. */}
                    <div className="v4-hero__media">
                        <div className="v4-hero__photo-frame v4-hero__photo-frame--static">
                            <img src={image.src} alt={image.alt} style={image.position ? { objectPosition: image.position } : undefined} />
                        </div>
                        {/* `crop` (0-1) trims a flat-colour margin baked into a
                            source image/gif by clipping that fraction off each
                            edge, then scaling back up so the remaining content
                            fills the frame — used when an asset can't be
                            re-exported with its own background stripped.
                            `anchor: "bottom"` repoints the card from the base
                            class's vertical-middle position to the frame's
                            bottom edge; `width` shrinks it from the base 58%. */}
                        {card && <img className="v4-flight-card-img" src={card.src} alt={card.alt}
                            style={{
                                ...(card.crop ? { clipPath: `inset(${card.crop * 100}% round 16px)` } : {}),
                                ...(card.width ? { width: card.width } : {}),
                                ...(card.anchor === "bottom"
                                    ? { top: "auto", bottom: card.bottom ?? "-20px", transform: card.crop ? `scale(${1 / (1 - card.crop * 2)})` : undefined }
                                    : card.crop ? { transform: `translateY(-50%) scale(${1 / (1 - card.crop * 2)})` } : {}),
                                ...(card.left ? { left: card.left } : {}),
                            }} />}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

export function V4Cta({ title, body }: { title: string; body: string }) {
    return (
        <section className="v4-cta">
            <div className="v4-shell">
                <h2>{title}</h2>
                <p>{body}</p>
                <div className="v4-cta__actions">
                    <Link className="v4-btn v4-btn--solid" to="/book-a-demo">Book a demo</Link>
                    <Link className="v4-btn v4-btn--ghost" to="/v4/platform">Explore the platform</Link>
                </div>
            </div>
        </section>
    )
}

// The footer renders from the same nav model as the menu, so a link added to
// V4NavData appears in both places.
export function V4Footer() {
    return (
        <footer className="v4-foot">
            <div className="v4-foot__inner">
                <div className="v4-foot__brand">
                    <Link to="/v4" aria-label="Miraee home"><MiraeeLogo fill="#E55602" height={22} /></Link>
                    <p>One AI-native platform for employee travel. A Tabhi company.</p>
                    <Link to="/book-a-demo" className="v4-foot__cta">Book a demo</Link>
                </div>
                <div className="v4-foot__cols">
                    {V4_NAV_ITEMS.map(item => item.kind === "link" ? null : (
                        <div className="v4-foot__col" key={item.key}>
                            <h2>{item.label}</h2>
                            <ul>
                                {item.groups.flatMap(group => [
                                    ...(group.feature ? [group.feature] : []),
                                    ...group.items,
                                ]).map(leaf => (
                                    <li key={leaf.to}><Link to={leaf.to}>{leaf.label}</Link></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="v4-foot__col">
                        <h2>Company</h2>
                        <ul>
                            <li><Link to="/v4/company">About Miraee</Link></li>
                            <li><a href="https://www.tabhi.com/" target="_blank" rel="noopener noreferrer">Tabhi group ↗</a></li>
                            <li><Link to="/support">Support</Link></li>
                            <li><Link to="/terms">Terms</Link></li>
                            <li><Link to="/privacy">Privacy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="v4-foot__base">
                <p>© {new Date().getFullYear()} Miraee, a Tabhi company.</p>
                <p>Built by Tabhi AI</p>
            </div>
        </footer>
    )
}
