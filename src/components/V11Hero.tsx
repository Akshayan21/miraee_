import { motion } from "framer-motion"
import { Link } from "react-router-dom"

// ─── Shared V1.1 page hero ────────────────────────────────────────────────────
// One hero for every V1.1 page, matching the Home hero: kicker, two-line
// headline with a serif-italic accent, sub, a primary and a secondary CTA, and
// a supporting image on the right. Styling lives in HomeV12.css (.v12-hero*)
// so Home and the subpages can never drift apart.

const ease = [0.16, 1, 0.3, 1] as const

export type V11HeroProps = {
    /** Small uppercase line above the headline. */
    kicker: string
    /** Headline text before the accent. Rendered on its own line. */
    title: string
    /** Accent half of the headline — serif italic, brand orange. */
    accent: string
    /** Supporting paragraph. */
    sub: string
    primaryCta: { label: string; href: string }
    secondaryCta?: { label: string; href: string }
    image: { src: string; alt: string }
    /** Optional proof strip rendered under the CTAs (e.g. the Platform trust bar). */
    proof?: string[]
    /** Optional pill row rendered under the proof strip (e.g. trust chips, capability chips). */
    chips?: string[]
}

function Cta({ label, href }: { label: string; href: string }) {
    const internal = href.startsWith("/") && !href.startsWith("//")
    return internal
        ? <Link className="v12-btn v12-btn--primary" to={href}>{label}</Link>
        : <a className="v12-btn v12-btn--primary" href={href}>{label}</a>
}

export default function V11Hero({ kicker, title, accent, sub, primaryCta, secondaryCta, image, proof, chips }: V11HeroProps) {
    return (
        <section className="v12-hero">
            <div className="v12-hero__row">
                <motion.div className="v12-hero__copy"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease }}>
                    <span className="v12-hero__kicker">{kicker}</span>
                    <h1>{title}<br />{accent ? <em>{accent}</em> : null}</h1>
                    <p>{sub}</p>
                    <div className="v12-hero__actions">
                        <Cta {...primaryCta} />
                        {secondaryCta && (
                            secondaryCta.href.startsWith("#")
                                ? <a className="v12-btn v12-btn--ghost" href={secondaryCta.href}>{secondaryCta.label}</a>
                                : <Link className="v12-btn v12-btn--ghost" to={secondaryCta.href}>{secondaryCta.label}</Link>
                        )}
                    </div>
                    {proof && proof.length > 0 && (
                        <div className="v12-hero__proof">
                            {proof.map((p, i) => (
                                <span key={p} style={{ display: "contents" }}>
                                    {i > 0 && <i />}
                                    <span>{p}</span>
                                </span>
                            ))}
                        </div>
                    )}
                    {chips && chips.length > 0 && (
                        <div className="v12-hero__chips">
                            {chips.map(c => <span key={c}>{c}</span>)}
                        </div>
                    )}
                </motion.div>
                <motion.div className="v12-hero__media"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.12, ease }}>
                    <img src={image.src} alt={image.alt} fetchPriority="high" decoding="async" />
                </motion.div>
            </div>
        </section>
    )
}
