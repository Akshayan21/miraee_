import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import "./PersonaExperience.css"
import employeeAvatar from "../assets/miraee-role-employee.png"
import financeAvatar from "../assets/Finance .jpg"
import travelLeadAvatar from "../assets/Travel Lead.jpg"
import adminAvatar from "../assets/Admin.jpg"
import hrAvatar from "../assets/HR.jpg"
import managerAvatar from "../assets/Manager Image.jpg"

// ─── Persona placeholder experience ───────────────────────────────────────────
// The content doc (Part 1.4) calls these "the single most important build on
// the site": each persona surface plays a scripted experience showing that role
// using Miraee, so no tab is ever empty before the real videos ship.
//
// This is the scripted-placeholder stage: a typed conversation driven from the
// demo and training scripts. When real footage lands, pass a `video` source and
// the same component plays that instead — no page changes needed.
//
// Accessibility: the animated thread is aria-hidden and a complete transcript is
// exposed to screen readers, so nothing depends on the animation running. With
// prefers-reduced-motion the whole script renders at once, no typing.

export type PersonaLine = { from: "traveler" | "agent"; text: string }

export type PersonaScript = {
    /** Role slug, e.g. "finance". */
    slug: string
    /** Role label shown on the thread header. */
    label: string
    /** One-line description of what this experience shows. */
    summary: string
    /** Photo of a real person in this role, shown in the thread header — the
     *  single biggest lever for making a scripted-preview card read as a
     *  person rather than a UI mockup. */
    avatar?: string
    lines: PersonaLine[]
}

type Props = {
    script: PersonaScript
    /** Auto-play once scrolled into view (For Teams tabs). */
    autoPlay?: boolean
    /** Play on hover / tap instead of on view (Home cards). */
    playOnInteract?: boolean
    /** Compact variant for the Home cards. */
    compact?: boolean
    /**
     * Surface the component is sitting on. Declared explicitly rather than
     * inferred from an ancestor page class — the previous version keyed its dark
     * palette off `.v11-site`, so the same component rendered near-black text on
     * the maroon For Teams panel (1.23:1) because that page is `.v1-type-page`.
     */
    tone?: "light" | "dark"
    /** Drops the component's own surface and header bar so it can sit flush
     *  inside a host card, instead of reading as a card within a card. */
    flush?: boolean
}

const TYPE_MS = 260   // per line — inside the 150-300ms micro-interaction band
const HOLD_MS = 620   // pause between lines so the thread reads naturally

export default function PersonaExperience({ script, autoPlay = false, playOnInteract = false, compact = false, tone = "light", flush = false }: Props) {
    const reduce = useReducedMotion()
    const ref = useRef<HTMLDivElement>(null)
    const timers = useRef<number[]>([])
    // Fail open: the full script is on screen unless an animation is actively
    // running. A trigger that never fires leaves content readable, not blank.
    const [shown, setShown] = useState(script.lines.length)
    const [playing, setPlaying] = useState(false)

    const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = [] }

    const play = () => {
        if (reduce || playing) return
        clearTimers()
        setPlaying(true)
        setShown(0)
        script.lines.forEach((_, i) => {
            const id = window.setTimeout(() => {
                setShown(i + 1)
                if (i === script.lines.length - 1) setPlaying(false)
            }, i * (TYPE_MS + HOLD_MS) + 240)
            timers.current.push(id)
        })
    }

    // Reset when the role changes (For Teams tab switch).
    useEffect(() => {
        clearTimers()
        setPlaying(false)
        setShown(script.lines.length)
        if (!reduce && autoPlay) play()
        return clearTimers
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [script.slug, reduce])

    // Auto-play once visible. Touch devices have no hover, so the interact
    // variant falls back to the same behaviour rather than never playing.
    useEffect(() => {
        if (reduce || !ref.current) return
        const el = ref.current
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { play(); io.disconnect() } })
        }, { threshold: 0.4 })
        io.observe(el)
        return () => io.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [script.slug, reduce])

    const interact = playOnInteract
        ? { onMouseEnter: play, onFocus: play, onClick: play }
        : {}

    return (
        <div
            ref={ref}
            className={`persona-exp persona-exp--${tone}${compact ? " persona-exp--compact" : ""}${flush ? " persona-exp--flush" : ""}`}
            {...interact}>
            {!flush && (
                <div className="persona-exp__bar">
                    {script.avatar ? (
                        <img className="persona-exp__avatar" src={script.avatar} alt="" aria-hidden="true" />
                    ) : (
                        <span className="persona-exp__dot" aria-hidden="true" />
                    )}
                    <span className="persona-exp__role">{script.label}</span>
                    <span className="persona-exp__tag">Scripted preview</span>
                </div>
            )}

            {/* Animated thread — decorative; the transcript below is the real content. */}
            <div className="persona-exp__thread" aria-hidden="true">
                {script.lines.map((line, i) => (
                    <div
                        key={line.text}
                        className={`persona-exp__line persona-exp__line--${line.from}${i < shown ? " is-in" : ""}`}>
                        <span>{line.text}</span>
                    </div>
                ))}
                {playing && shown < script.lines.length && (
                    <div className="persona-exp__typing"><i /><i /><i /></div>
                )}
            </div>

            {/* Full transcript for assistive tech and for anyone with motion off. */}
            <div className="persona-exp__sr">
                <p>{script.label}: scripted preview. {script.summary}</p>
                <ol>
                    {script.lines.map(l => (
                        <li key={l.text}>{l.from === "traveler" ? "Traveler" : "Miraee"}: {l.text}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

// ─── Scripts, drawn from the demo and training scripts the doc references ─────
// Doc, For Teams section 3: "Employees: a trip planned from a sentence, in
// policy, receipts captured. Finance: committed spend at booking,
// reconciliation, ERP sync. Travel leads: program analytics and an exception
// cleared with context. Admins: a policy rule set once. CHROs: the traveler
// experience and duty of care in action. Managers: one exception approved in
// seconds." Figures here are illustrative sample data, labelled as such.

export const PERSONA_SCRIPTS: Record<string, PersonaScript> = {
    employees: {
        slug: "employees",
        label: "Employees",
        avatar: employeeAvatar,
        summary: "A trip planned from a sentence, in policy, with receipts captured.",
        lines: [
            { from: "traveler", text: "Singapore next Tuesday. Window seat. Within policy." },
            { from: "agent", text: "Three in-policy options. Recommended: 08:30 departure, window seat held." },
            { from: "agent", text: "Booked with the hotel. Receipts will be captured for you, no report to file." },
        ],
    },
    finance: {
        slug: "finance",
        label: "Finance",
        avatar: financeAvatar,
        summary: "Committed spend visible at booking, reconciled and synced to the ERP.",
        lines: [
            { from: "agent", text: "Committed spend updated at booking, before the invoice arrives." },
            { from: "agent", text: "Coded to the right entity and cost centre, matched to the booking." },
            { from: "agent", text: "Posted to your ERP. Exportable audit trail attached." },
        ],
    },
    "travel-leads": {
        slug: "travel-leads",
        label: "Travel leads",
        avatar: travelLeadAvatar,
        summary: "Program analytics, and an exception cleared with full context.",
        lines: [
            { from: "agent", text: "One exception on this route: fare above the agreed band." },
            { from: "agent", text: "Context attached: traveler, rule applied, alternatives and cost delta." },
            { from: "agent", text: "Cleared. The rest of the program ran without reaching you." },
        ],
    },
    admins: {
        slug: "admins",
        label: "Admins",
        avatar: adminAvatar,
        summary: "A policy rule set once, then applied at search on every trip.",
        lines: [
            { from: "traveler", text: "Set the per diem for tier-two cities." },
            { from: "agent", text: "Rule saved. Applied at search, so only compliant options appear." },
            { from: "agent", text: "Approval routing updated by role and threshold." },
        ],
    },
    chros: {
        slug: "chros",
        label: "CHROs",
        avatar: hrAvatar,
        summary: "The traveler experience and duty of care, in action.",
        lines: [
            { from: "agent", text: "Delay detected on tonight's flight, before the airline notified." },
            { from: "agent", text: "Traveler informed with one clear alternative, inside policy." },
            { from: "agent", text: "Location known, support one message away in the same thread." },
        ],
    },
    managers: {
        slug: "managers",
        label: "Managers",
        avatar: managerAvatar,
        summary: "One exception approved in seconds; routine trips never reach you.",
        lines: [
            { from: "agent", text: "One approval waiting, above band, with the reason attached." },
            { from: "traveler", text: "Approved." },
            { from: "agent", text: "Traveler notified. The trip continues in the same thread." },
        ],
    },
}
