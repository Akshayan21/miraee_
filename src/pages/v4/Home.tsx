import { Link } from "react-router-dom"
import { MotionConfig } from "framer-motion"
import { V4Nav, V4Footer, Reveal } from "../../components/V4Kit"
import { usePageMeta } from "../../hooks/usePageMeta"
import { StatStrip, HowItWorks, KineticBand, BusinessCase, Experiences, CtaRoutes, PlatformSolution } from "./V0Sections"
import { HeroVideo } from "./HeroVideo"
import { ScrollProgress, GrainOverlay, CustomCursor } from "../../animations"
import { IntroCover } from "./V0Intro"
import { useIntroActive } from "./useIntroActive"
import "../SubpagesV2.css"
import "./V4.css"

// V4 homepage. Section order follows the Part 1 structure doc: hero, platform
// stats, how it works, the finance/employee proof band, experiences.
//
// Every section the doc marks "V0" is a verbatim port of V0's layout AND its
// animation — the marquee stat strip, the sticky full-viewport step panels, the
// kinetic type band and the scroll-linked experience pan all live in
// ./V0Sections.tsx. See docs/v0-home-reference.md for the source catalogue.

export default function V4Home() {
    usePageMeta(
        "A Private Travel Assistant for Every Employee | Miraee",
        "Travel Limitless. Business travel, personalized: one platform for booking, travel management and expenses, plus the personal trips people love.",
    )

    // The intro's state lives here, not inside <IntroCover>, so the real page
    // below can be made `inert` while the cover is up. V0 doesn't do this: its
    // cover is fully opaque to a mouse user, but nothing stops a keyboard user
    // from Tabbing straight past it into hero content they can't see. `inert`
    // (a real boolean prop as of React 19) removes that content from both the
    // tab order and the accessibility tree for exactly as long as the cover is
    // active, then hands it back — no extra library, no manual tabindex bookkeeping.
    const intro = useIntroActive()

    return (
        <MotionConfig reducedMotion="user">
        {/* V0's ambient stack, minus SmoothScroll. SmoothScroll hijacks every
            wheel event with preventDefault + a manual window.scrollTo() lerp,
            non-passive, every ~16ms for the duration of any scroll gesture —
            stacking on top of the marquee's velocity tracker, the kinetic band,
            the Experiences pan and the scroll progress bar, all of which also
            react to scroll. That is a bigger and more direct cause of felt lag
            than anything else ported this session, so it stays unmounted here
            by default. The component itself is untouched at
            ../../animations/smoothScroll.tsx — re-add <SmoothScroll /> if native
            scroll ever needs to be replaced with eased scroll again.
            CustomCursor is desktop-only by its own width check; both this and
            GrainOverlay bail under prefers-reduced-motion. */}
        <CustomCursor />
        <GrainOverlay />
        <IntroCover active={intro.active} phase={intro.phase} />
        <div className="v4-site" inert={intro.active || undefined}>
            <ScrollProgress />
            <a className="v4-skip" href="#main">Skip to content</a>
            <V4Nav transparent />

            <main id="main">
                <HeroVideo />

                {/* V0's "200+ deep agents, working as one" split-screen panel. */}
                <PlatformSolution />

                {/* Platform section — all V0 data points, V0's velocity-skewed marquee. */}
                <StatStrip />

                {/* How it works — V0's sticky full-viewport Plan/Book/Expense/Change panels. */}
                <HowItWorks />

                <KineticBand line1="LOVED BY EMPLOYEES" line2="TRUSTED BY FINANCE" bg="var(--m-soft)" ink="var(--m-maroon)" />

                <BusinessCase>
                    <Reveal>
                        <p style={{ marginTop: 40 }}>
                            <Link className="v4-btn v4-btn--ghost" to="/v4/platform">See the full platform</Link>
                        </p>
                    </Reveal>
                </BusinessCase>

                {/* Experiences — V0's scroll-linked horizontal pan with tilt cards. */}
                <Experiences />

                <section className="v4-cta" style={{ position: "relative", overflow: "hidden" }}>
                    <CtaRoutes />
                    <div className="v4-shell" style={{ position: "relative", zIndex: 1 }}>
                        <h2>Give every employee an AI travel agent.</h2>
                        <p>Effortless for travelers. Controlled for finance. Rewarding for everyone.</p>
                        <div className="v4-cta__actions">
                            <Link className="v4-btn v4-btn--solid" to="/book-a-demo">Book a demo</Link>
                            <Link className="v4-btn v4-btn--ghost" to="/v4/platform">Explore the platform</Link>
                        </div>
                    </div>
                </section>
            </main>

            <V4Footer />
        </div>
        </MotionConfig>
    )
}
