import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import avatarImg from "../../assets/Avatar.png"

// The right side of the homepage hero — a live-feeling voice/chat card.
// Everything is genuinely interactive — typing, the quick-action chips and
// the mic button all drive real state and produce a real (scripted, not
// model-generated) response, same honesty convention as PersonaExperience's
// "Scripted preview" tag elsewhere on the site.
//
// Submitting anything expands the card into a full-width takeover (parent
// hides the hero's copy column while this is true) — the close button hands
// control back to the parent AND resets this component's own conversation
// state, so reopening always starts clean.

// A rotating fact instead of a fixed "Good morning" greeting — general,
// widely-known travel trivia, not a claim about Miraee's own product, so
// nothing here needs the "illustrative data" labelling the site uses
// elsewhere for numbers that ARE about Miraee.
const TRAVEL_FACTS = [
    "Singapore's Changi Airport has its own rooftop swimming pool and a butterfly garden.",
    "The world's shortest scheduled flight, in Scotland, can take under two minutes in the air.",
    "Tuesday afternoons are often quoted as the cheapest time to book a flight.",
    "More business trips now end with a personal day or two tacked on than a separate holiday.",
    "Japan's bullet trains are famous for averaging only seconds of delay a year.",
    "A window seat has no more legroom than an aisle seat, most travelers pick it for the view alone.",
]
function randomFact() {
    return TRAVEL_FACTS[Math.floor(Math.random() * TRAVEL_FACTS.length)]
}

// Rotating placeholder examples for the collapsed input — covers the main
// prompt shapes the assistant actually handles: planning, changes, expense
// submission, preferences/personalization, and a bleisure (business +
// leisure) request.
const PLACEHOLDER_PROMPTS = [
    "Tell Miraee about your trip",
    "Plan a trip to Singapore next week, within policy",
    "Submit yesterday's taxi receipt for reimbursement",
    "Remember I prefer window seats and quiet hotel rooms",
    "Add two personal days after my Berlin trip",
    "Find a policy-friendly hotel near tomorrow's meeting",
]

const MIC_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 19v3" /></svg>
const SEND_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-8-8 18-2-8-8-2Z" /></svg>
const PLANE_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.4.7c-.2.4-.1.9.3 1.2L8.7 12l-2 3H4l-1 1 3 2 2 3 1-1v-2.7l3-2 3.3 5.2c.3.4.8.6 1.3.4l.7-.3c.4-.2.6-.6.5-1.1z" /></svg>
const CHANGE_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="m9 15 2 2 4-4" /></svg>
const RECEIPT_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z" /><path d="M9 8h6M9 12h6" /></svg>
const BRIEFCASE_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></svg>
const BUILDING_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h6" /></svg>
const REFRESH_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 3v6h-6" /></svg>
const CALENDAR_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M8 15h.01M12 15h.01M16 15h.01" /></svg>
const CLOSE_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
const MAP_PIN_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-7.58 7-13A7 7 0 0 0 5 9c0 5.42 7 13 7 13Z" /><circle cx="12" cy="9" r="2.5" /></svg>
const USERS_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6" /><circle cx="17" cy="8" r="2.5" /><path d="M23 20c0-2.6-2-4.8-4.5-5.6" /></svg>
const CHECK_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></svg>

const QUICK_PROMPTS: { label: string; prompt: string; icon: ReactNode }[] = [
    { label: "Plan a trip", prompt: "Plan a trip to Singapore next week, within policy.", icon: PLANE_ICON },
    { label: "Change a booking", prompt: "I need to change my flight to a day earlier.", icon: CHANGE_ICON },
    { label: "Upload a receipt", prompt: "I have a taxi receipt to expense from today.", icon: RECEIPT_ICON },
]

const EXPANDED_LEFT: { label: string; prompt: string; icon: ReactNode }[] = [
    { label: "Book a business trip", prompt: "Book a business trip to Singapore next week, within policy.", icon: BRIEFCASE_ICON },
    { label: "Find a policy-friendly flight", prompt: "Find a policy-friendly flight for tomorrow morning.", icon: PLANE_ICON },
    { label: "Add a hotel near my meeting", prompt: "Add a hotel near my meeting downtown.", icon: BUILDING_ICON },
]
const EXPANDED_RIGHT: { label: string; prompt: string; icon: ReactNode }[] = [
    { label: "Change my upcoming flight", prompt: "I need to change my upcoming flight to a day earlier.", icon: REFRESH_ICON },
    { label: "Extend my trip", prompt: "Extend my current trip by two days.", icon: CALENDAR_ICON },
    { label: "Upload an expense receipt", prompt: "I have an expense receipt to upload from today.", icon: RECEIPT_ICON },
]

// The avatar spotlight's guided flow — the Traveller/Employee demo script
// (Miraee_Interactive_Demo_Script.xlsx, "Traveller" sheet, nodes T0–T10 +
// ALT1). A small state machine, not a generic keyword matcher: each step
// has fixed script copy and a fixed set of quick-reply chips straight from
// the sheet, and choosing one advances to the next node exactly like the
// script's "Goes to next" column. Free text is only meaningful at the
// first step (the trip itself); typed at any later step it hits the
// sheet's own catch-all line for "detail led questions" (ALT1 / the row
// below every sheet's table) instead of trying to interpret it.
type TravellerStepId = "start" | "purpose" | "travellers" | "duration" | "options" | "upsell" | "done"
type Chip = { label: string; icon: ReactNode }

const TRAVELLER_STEPS: Record<TravellerStepId, { caption: string; chips: Chip[] }> = {
    start: {
        caption: "Hi, I'm Miraee. Where do you need to be?",
        chips: [
            { label: "San Francisco", icon: MAP_PIN_ICON },
            { label: "New York", icon: MAP_PIN_ICON },
            { label: "Chicago", icon: MAP_PIN_ICON },
        ],
    },
    purpose: {
        caption: "What's the purpose of this trip?",
        chips: [
            { label: "Client meeting", icon: BRIEFCASE_ICON },
            { label: "Internal", icon: BUILDING_ICON },
            { label: "Conference", icon: USERS_ICON },
            { label: "Site visit", icon: MAP_PIN_ICON },
            { label: "Personal Travel", icon: PLANE_ICON },
        ],
    },
    travellers: {
        caption: "How many of you are travelling?",
        chips: [
            { label: "Just me", icon: USERS_ICON },
            { label: "2", icon: USERS_ICON },
            { label: "3+", icon: USERS_ICON },
            { label: "A group", icon: USERS_ICON },
        ],
    },
    duration: {
        caption: "Same-day, or staying over?",
        chips: [
            { label: "Same day", icon: CALENDAR_ICON },
            { label: "1 night", icon: CALENDAR_ICON },
            { label: "2–3 nights", icon: CALENDAR_ICON },
            { label: "Flexible", icon: CALENDAR_ICON },
        ],
    },
    options: {
        caption: "Option A — Fastest. Option B — Best value (in policy). Option C — Preferred airline. Which works?",
        chips: [
            { label: "Option A", icon: CHECK_ICON },
            { label: "Option B", icon: CHECK_ICON },
            { label: "Option C", icon: CHECK_ICON },
            { label: "Show more", icon: REFRESH_ICON },
        ],
    },
    upsell: {
        caption: "Nice choice. Want me to add a hotel near your meeting and airport transfers?",
        chips: [
            { label: "Add hotel", icon: BUILDING_ICON },
            { label: "Add transfers", icon: PLANE_ICON },
            { label: "Just the flight", icon: PLANE_ICON },
        ],
    },
    done: {
        caption: "That's your trip, planned in one thread.",
        chips: [
            { label: "Try another demo", icon: REFRESH_ICON },
            { label: "Explore how it works", icon: CHECK_ICON },
        ],
    },
}

// Node order: T0→T2(ack)→T3, T4, T5, T6(ack)→T7, T9, T10.
const TRAVELLER_NEXT: Record<TravellerStepId, TravellerStepId | null> = {
    start: "purpose",
    purpose: "travellers",
    travellers: "duration",
    duration: "options",
    options: "upsell",
    upsell: "done",
    done: null,
}

// T2 and T6 are Miraee acknowledgement lines that play between one node's
// answer and the next node's question — shown as the "thinking" filler
// rather than as their own step, so the rhythm matches every other
// question/answer beat instead of needing an extra empty click.
function travellerFiller(step: TravellerStepId, destination: string): string {
    if (step === "start") return `Got it — ${destination}. A couple of quick things and I'll pull options.`
    if (step === "duration") return "Perfect. Here's what I found, already checked against your travel policy."
    return "Thinking…"
}

// The sheet's line for any out-of-scope or detail-led question, repeated
// under every persona tab ("End each detail led question with this
// response") — used here for free text typed at any step past the first.
const TRAVELLER_FALLBACK = "Unable to process this request at this stage. Request your organisation for onboarding Miraee today to experience these sections."

function respondTo(text: string): string {
    const t = text.toLowerCase()
    if (/change|resched|move|earlier|later|cancel|extend/.test(t)) return "Checking fare rules for a change. I'll hold the best option and confirm before anything is booked."
    if (/receipt|expense|reimburse/.test(t)) return "Got it. I'll code this to the right category and post it automatically, no report to file."
    if (/trip|flight|book|fly|hotel|travel|singapore|meeting/.test(t)) return "On it. Building an in-policy itinerary now, I'll have the best option in a moment."
    return "Tell me the trip, the dates, or what needs to change, and I'll take it from there."
}

// Shown while "thinking" — a filler that matches what respondTo() is about to
// say, so the wait reads as purposeful rather than a bare, contentless "…".
function fillerFor(text: string): string {
    const t = text.toLowerCase()
    if (/change|resched|move|earlier|later|cancel|extend/.test(t)) return "Checking fare rules…"
    if (/receipt|expense|reimburse/.test(t)) return "Coding the expense…"
    if (/trip|flight|book|fly|hotel|travel|singapore|meeting/.test(t)) return "Building the itinerary…"
    return "Thinking…"
}

// Types each phrase out character by character, holds, deletes it back out,
// then moves to the next — a real typewriter loop, not a cross-fade between
// full phrases. A plain recursive setTimeout (not setInterval) so each step's
// delay can differ (typing vs. deleting vs. the hold) without drift.
function useTypewriter(phrases: string[], reduce: boolean): string {
    const [typed, setTyped] = useState(() => (reduce ? phrases[0] : ""))
    useEffect(() => {
        if (reduce) {
            // Not the initial render (the lazy useState initializer already
            // covers that) — only reachable if the OS preference flips while
            // mounted. Deferred so the state update isn't synchronous inside
            // the effect body itself.
            const id = window.setTimeout(() => setTyped(phrases[0]), 0)
            return () => window.clearTimeout(id)
        }
        let phraseIndex = 0
        let charIndex = 0
        let deleting = false
        let cancelled = false
        let t = 0
        const TYPE_MS = 38, DELETE_MS = 22, HOLD_MS = 1500, GAP_MS = 400

        const tick = () => {
            if (cancelled) return
            const phrase = phrases[phraseIndex]
            if (!deleting) {
                charIndex++
                setTyped(phrase.slice(0, charIndex))
                if (charIndex >= phrase.length) {
                    t = window.setTimeout(() => { deleting = true; tick() }, HOLD_MS)
                    return
                }
                t = window.setTimeout(tick, TYPE_MS)
            } else {
                charIndex--
                setTyped(phrase.slice(0, charIndex))
                if (charIndex <= 0) {
                    deleting = false
                    phraseIndex = (phraseIndex + 1) % phrases.length
                    t = window.setTimeout(tick, GAP_MS)
                    return
                }
                t = window.setTimeout(tick, DELETE_MS)
            }
        }
        t = window.setTimeout(tick, TYPE_MS)
        return () => { cancelled = true; window.clearTimeout(t) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduce])
    return typed
}

// Real placeholder text stays empty (nothing to announce twice — aria-label
// already names the field) and this decorative, `aria-hidden` layer sits on
// top of it instead, with a blinking caret at the end of whatever's typed
// so far.
function AnimatedPlaceholder({ text, show }: { text: string; show: boolean }) {
    if (!show) return null
    return (
        <span className="v4-assistant__placeholder-fx" aria-hidden="true">
            {text}<span className="v4-assistant__caret" />
        </span>
    )
}

type Props = {
    /** Parent-controlled: true once a prompt has been submitted. */
    expanded?: boolean
    /** Fired the moment a prompt is submitted, so the parent can hide the
     *  hero's copy column and give this component the full row. */
    onExpand?: () => void
    /** Fired when the close button is pressed. This component resets its own
     *  conversation state first, then the parent flips `expanded` back off. */
    onClose?: () => void
}

export function HeroAssistant({ expanded = false, onExpand, onClose }: Props) {
    const reduce = useReducedMotion()
    const [caption, setCaption] = useState(randomFact)
    const [value, setValue] = useState("")
    const [status, setStatus] = useState<"idle" | "thinking">("idle")
    const [pending, setPending] = useState("")
    const [listening, setListening] = useState(false)
    const typedPlaceholder = useTypewriter(PLACEHOLDER_PROMPTS, !!reduce)
    const timer = useRef<number>(0)

    const submit = (text: string) => {
        const trimmed = text.trim()
        if (!trimmed || status === "thinking") return
        onExpand?.()
        setValue("")
        if (reduce) {
            setCaption(respondTo(trimmed))
            return
        }
        setPending(trimmed)
        setStatus("thinking")
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => {
            setCaption(respondTo(trimmed))
            setStatus("idle")
        }, 650)
    }

    const close = () => {
        window.clearTimeout(timer.current)
        setCaption(randomFact())
        setValue("")
        setStatus("idle")
        setPending("")
        setListening(false)
        onClose?.()
    }

    const avatar = (
        <motion.img className={expanded ? "v4-assistant__photo v4-assistant__photo--lg" : "v4-assistant__photo"} src={avatarImg} alt=""
            animate={reduce ? undefined : { scale: status === "thinking" ? [1, 1.015, 1] : [1, 1.008, 1] }}
            transition={{ duration: status === "thinking" ? 1.4 : 4, repeat: Infinity, ease: "easeInOut" }} />
    )

    const captionEl = (
        <motion.span key={status === "thinking" ? "thinking" : caption}
            initial={reduce ? undefined : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}>
            {status === "thinking" ? fillerFor(pending) : caption}
        </motion.span>
    )

    const waveEl = status === "thinking" && (
        <div className="v4-assistant__wave" aria-hidden="true">
            {Array.from({ length: 22 }).map((_, i) => (
                <motion.span key={i}
                    initial={reduce ? undefined : { scaleY: 0.3 }}
                    animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.045 }} />
            ))}
        </div>
    )

    // Both branches share one duration/easing with the hero row's own CSS
    // transitions (grid-template-columns and the copy column's fade, in
    // V4.css) so the grid reflow, the copy fading out and this card fading
    // in all move in the same rhythm instead of at three different speeds.
    // A scale+fade ("grow into place") reads as a takeover expanding, not a
    // generic slide-up -- and using it on BOTH branches means closing back
    // down looks and feels like the same motion in reverse, not a silent pop.
    const swapTransition = { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }

    if (expanded) {
        return (
            <motion.div className="v4-assistant v4-assistant--expanded"
                initial={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={swapTransition}>
                <button type="button" className="v4-assistant__close" aria-label="Close assistant" onClick={close}>
                    {CLOSE_ICON}
                </button>

                <div className="v4-assistant__chips v4-assistant__chips--left">
                    {EXPANDED_LEFT.map(q => (
                        <button type="button" key={q.label} onClick={() => submit(q.prompt)}>
                            {q.icon}<span>{q.label}</span>
                            <i aria-hidden="true">→</i>
                        </button>
                    ))}
                </div>

                <div className="v4-assistant__stage">
                    <div className="v4-assistant__frame v4-assistant__frame--lg" aria-hidden="true">{avatar}</div>
                    <p className="v4-assistant__caption v4-assistant__caption--lg" aria-live="polite">{captionEl}</p>
                    {waveEl}
                    <button type="button" className="v4-assistant__listen" onClick={() => setListening(l => !l)}>
                        <span>Listening is {listening ? "on" : "off"}</span>
                        <span className="v4-assistant__mic-circle" aria-hidden="true">{MIC_ICON}</span>
                    </button>
                </div>

                <div className="v4-assistant__chips v4-assistant__chips--right">
                    {EXPANDED_RIGHT.map(q => (
                        <button type="button" key={q.label} onClick={() => submit(q.prompt)}>
                            {q.icon}<span>{q.label}</span>
                        </button>
                    ))}
                </div>

                <form className="v4-assistant__bar" onSubmit={e => { e.preventDefault(); submit(value) }}>
                    <span className="v4-assistant__bar-keyboard" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" /></svg>
                    </span>
                    <div className="v4-assistant__input-wrap">
                        <input
                            type="text"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder=""
                            aria-label="Ask Miraee anything"
                        />
                        <AnimatedPlaceholder text={typedPlaceholder} show={!value} />
                    </div>
                    <button type="button" className="v4-assistant__mic" aria-label="Try a sample voice prompt"
                        onClick={() => submit(QUICK_PROMPTS[0].prompt)}>{MIC_ICON}</button>
                    <button type="submit" className="v4-assistant__send" aria-label="Send" disabled={!value.trim() || status === "thinking"}>{SEND_ICON}</button>
                </form>
            </motion.div>
        )
    }

    return (
        <motion.div className="v4-assistant"
            initial={reduce ? undefined : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={swapTransition}>
            <span className="v4-assistant__live"><i aria-hidden="true" /> Live</span>

            {/* No AnimatePresence/exit here on purpose — a changed `key` makes
                React swap the DOM node synchronously, so the new text is
                never gated behind an exit animation completing. Only the
                entrance fades in; nothing lingers if it doesn't. */}
            <p className="v4-assistant__caption" aria-live="polite">{captionEl}</p>

            {waveEl}

            <form className="v4-assistant__form" onSubmit={e => { e.preventDefault(); submit(value) }}>
                <div className="v4-assistant__input-wrap">
                    <input
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder=""
                        aria-label="Tell Miraee about your trip"
                    />
                    <AnimatedPlaceholder text={typedPlaceholder} show={!value} />
                </div>
                <button type="button" className="v4-assistant__mic" aria-label="Try a sample voice prompt"
                    onClick={() => submit(QUICK_PROMPTS[0].prompt)}>{MIC_ICON}</button>
                <button type="submit" className="v4-assistant__send" aria-label="Send" disabled={!value.trim() || status === "thinking"}>{SEND_ICON}</button>
            </form>

            <div className="v4-assistant__prompts">
                {QUICK_PROMPTS.map(q => (
                    <button type="button" key={q.label} onClick={() => submit(q.prompt)}>
                        {q.icon}{q.label}
                    </button>
                ))}
            </div>
        </motion.div>
    )
}

// Splits a step's chip list across the left/right columns by alternating
// index (0,2,4… left · 1,3,5… right) rather than a straight half/half cut,
// so a 3-option step (2 left / 1 right) or a 5-option one (3 left / 2
// right) still reads as roughly balanced instead of lopsided.
function splitChips(chips: Chip[]): [Chip[], Chip[]] {
    return [chips.filter((_, i) => i % 2 === 0), chips.filter((_, i) => i % 2 === 1)]
}

// The face that used to live inside the collapsed hero card, now given its
// own place inside the hero once the visitor scrolls (see HeroVideo.tsx) —
// a proper introduction to the assistant instead of a small thumbnail
// competing with the hero photo for attention. Same avatar image and idle
// breathing motion as the card's expanded view, just presented at
// spotlight size.
//
// Runs the Traveller/Employee demo script (TRAVELLER_STEPS above) as a real
// guided flow rather than free-form chat: each quick-reply chip advances to
// the next scripted node, exactly like the source spreadsheet's node graph.
export function AvatarSpotlight() {
    const reduce = useReducedMotion()
    const [step, setStep] = useState<TravellerStepId>("start")
    const [destination, setDestination] = useState("")
    const [caption, setCaption] = useState(TRAVELLER_STEPS.start.caption)
    const [value, setValue] = useState("")
    const [status, setStatus] = useState<"idle" | "thinking">("idle")
    const [filler, setFiller] = useState("")
    const typedPlaceholder = useTypewriter(PLACEHOLDER_PROMPTS, !!reduce)
    const timer = useRef<number>(0)

    useEffect(() => () => window.clearTimeout(timer.current), [])

    const reset = () => {
        window.clearTimeout(timer.current)
        setStep("start")
        setDestination("")
        setCaption(TRAVELLER_STEPS.start.caption)
        setStatus("idle")
        setFiller("")
        setValue("")
    }

    // Advances from the current step to whatever TRAVELLER_NEXT says follows
    // it — the "answer a question, get the next question" beat that drives
    // the whole flow. `label` is only used to capture the destination on
    // the very first step (T0 → T1's free-form trip).
    const advance = (label: string) => {
        if (status === "thinking") return
        if (step === "start") setDestination(label)

        const next = TRAVELLER_NEXT[step]
        if (!next) return

        if (reduce) {
            setStep(next)
            setCaption(TRAVELLER_STEPS[next].caption)
            return
        }
        setStatus("thinking")
        setFiller(travellerFiller(step, step === "start" ? label : destination))
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => {
            setStep(next)
            setCaption(TRAVELLER_STEPS[next].caption)
            setStatus("idle")
        }, 650)
    }

    // A quick-reply chip was clicked. "options" and "done" have chips that
    // don't simply advance to the next node (Show more re-states the same
    // options; the two "done" chips reset the demo or leave the widget), so
    // those are handled here before falling through to the generic advance.
    const choose = (label: string) => {
        if (status === "thinking") return
        if (step === "options" && label === "Show more") {
            setCaption(TRAVELLER_STEPS.options.caption)
            return
        }
        if (step === "done") {
            if (label === "Try another demo") { reset(); return }
            if (label === "Explore how it works") {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
            }
            return
        }
        advance(label)
    }

    // Free text is only meaningful at the first step (the trip itself) —
    // typed anywhere later it's a "detail led question" the sheet says to
    // answer with the same fallback line every persona tab uses.
    const submitText = (text: string) => {
        const trimmed = text.trim()
        if (!trimmed || status === "thinking") return
        setValue("")
        if (step === "start") { advance(trimmed); return }
        if (reduce) { setCaption(TRAVELLER_FALLBACK); return }
        setStatus("thinking")
        setFiller("Thinking…")
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => {
            setCaption(TRAVELLER_FALLBACK)
            setStatus("idle")
        }, 500)
    }

    const captionEl = (
        <motion.span key={status === "thinking" ? "thinking" : caption}
            initial={reduce ? undefined : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}>
            {status === "thinking" ? filler : caption}
        </motion.span>
    )

    const chips = TRAVELLER_STEPS[step].chips
    const [leftChips, rightChips] = splitChips(chips)

    return (
        <section className="v4-avatar-spotlight">
            {/* Chips are the current script node's quick-reply options
                (TRAVELLER_STEPS[step].chips), split across the two fixed
                columns flanking the portrait — see splitChips() above. The
                row is capped to a max-width and the side columns are
                fixed-width flex children (not `1fr` grid tracks), so it
                stays anchored close to the portrait instead of stretching
                the chips out to the viewport edges on wide screens. */}
            <div className="v4-shell v4-avatar-spotlight__row">
                <div className="v4-assistant__chips v4-avatar-spotlight__chips">
                    {leftChips.map(q => (
                        <button type="button" key={q.label} onClick={() => choose(q.label)}>
                            {q.icon}<span>{q.label}</span>
                        </button>
                    ))}
                </div>

                <div className="v4-avatar-spotlight__stage">
                    <div className="v4-assistant__frame v4-assistant__frame--lg" aria-hidden="true">
                        <motion.img className="v4-assistant__photo--lg" src={avatarImg} alt=""
                            animate={reduce ? undefined : { scale: [1, 1.012, 1] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
                        <span className="v4-assistant__frame-glow" aria-hidden="true" />
                    </div>

                    <p className="v4-avatar-spotlight__caption" aria-live="polite">{captionEl}</p>

                    <form className="v4-assistant__form v4-avatar-spotlight__form" onSubmit={e => { e.preventDefault(); submitText(value) }}>
                    <div className="v4-assistant__input-wrap">
                        <input
                            type="text"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder=""
                            aria-label="Tell Miraee about your trip"
                        />
                        <AnimatedPlaceholder text={typedPlaceholder} show={!value} />
                    </div>
                    <button type="button" className="v4-assistant__mic" aria-label="Try a sample voice prompt"
                        onClick={() => chips[0] && choose(chips[0].label)}>{MIC_ICON}</button>
                    <button type="submit" className="v4-assistant__send" aria-label="Send" disabled={!value.trim() || status === "thinking"}>{SEND_ICON}</button>
                    </form>
                </div>

                <div className="v4-assistant__chips v4-assistant__chips--right v4-avatar-spotlight__chips">
                    {rightChips.map(q => (
                        <button type="button" key={q.label} onClick={() => choose(q.label)}>
                            {q.icon}<span>{q.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
