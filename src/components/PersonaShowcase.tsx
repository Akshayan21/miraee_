import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Link } from "react-router-dom"
import PersonaExperience, { PERSONA_SCRIPTS } from "./PersonaExperience"
import "./PersonaShowcase.css"

// ─── Home section 4 — "Built for everyone behind the journey" ─────────────────
// Three parallel cards, each carrying its own scripted preview, left every
// preview too small to read and the tallest card mostly empty. One stage with a
// role switcher shows the same three personas at a size where the experience
// actually reads, which is the point of it (doc Part 1.4: "showing, not
// telling"). It also mirrors the six-role tabs on For Teams, so the two pages
// behave the same way.

type Persona = {
    slug: string
    label: string
    headline: string
    body: string
    href: string
}

// Copy verbatim from the content doc, Home section 4.
const PERSONAS: Persona[] = [
    {
        slug: "employees",
        label: "For employees",
        headline: "Ask once. Get a complete, policy-safe trip.",
        body: "Describe the trip in a sentence, get the itinerary, never file an expense report.",
        href: "/v1.1/for-teams#employees",
    },
    {
        slug: "finance",
        label: "For finance",
        headline: "See committed spend before it becomes an expense.",
        body: "Every booking hits the ledger coded and reconciled, at wholesale rates 20 to 30% below published fares.*",
        href: "/v1.1/for-teams#finance",
    },
    {
        slug: "travel-leads",
        label: "For travel teams",
        headline: "Set the rules once. Run the program by exception.",
        body: "Policy lives in the agent. Only real exceptions reach a person.",
        href: "/v1.1/for-teams#travel-leads",
    },
]

const ROTATE_MS = 7200

export default function PersonaShowcase() {
    const [active, setActive] = useState(0)
    const [userPicked, setUserPicked] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { amount: 0.35 })
    const reduce = useReducedMotion()
    const persona = PERSONAS[active]

    // Cycle roles while the section is on screen so the stage is never idle.
    // Stops for good once someone picks a role themselves, and never runs at
    // all under reduced motion.
    useEffect(() => {
        if (reduce || userPicked || !inView) return
        const id = window.setInterval(() => {
            setActive(i => (i + 1) % PERSONAS.length)
        }, ROTATE_MS)
        return () => clearInterval(id)
    }, [reduce, userPicked, inView])

    const pick = (i: number) => { setUserPicked(true); setActive(i) }

    return (
        <div className="persona-showcase" ref={ref}>
            {/* Role switcher */}
            <div className="persona-showcase__roles" role="tablist" aria-label="Choose a role">
                {PERSONAS.map((p, i) => {
                    const on = i === active
                    return (
                        <button
                            key={p.slug}
                            role="tab"
                            aria-selected={on}
                            aria-controls="persona-stage"
                            className={`persona-showcase__role${on ? " is-active" : ""}`}
                            onClick={() => pick(i)}
                            onMouseEnter={() => pick(i)}>
                            {on && (
                                <motion.span
                                    className="persona-showcase__marker"
                                    layoutId="persona-marker"
                                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                                    aria-hidden="true" />
                            )}
                            <span className="persona-showcase__role-label">{p.label}</span>
                            <span className="persona-showcase__role-headline">{p.headline}</span>
                        </button>
                    )
                })}
            </div>

            {/* Stage */}
            <div className="persona-showcase__stage" id="persona-stage" role="tabpanel" aria-live="polite">
                <motion.div
                    key={persona.slug}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0.2 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="persona-showcase__panel">
                    <p className="persona-showcase__body">{persona.body}</p>
                    <PersonaExperience script={PERSONA_SCRIPTS[persona.slug]} autoPlay tone="dark" />
                    <Link className="persona-showcase__link" to={persona.href}>
                        See how it works for {persona.label.replace("For ", "")} <span aria-hidden="true">→</span>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
