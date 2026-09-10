import { useEffect, useRef, useState } from "react"
import type { ReactNode, RefObject } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useLocation } from "react-router-dom"
import { isV2Path } from "../../lib/v2"
import avatarImg from "../../assets/Avatar.png"
import financeDashboardImg from "../../assets/Finanec dashboard.png"
import adminDashboardImg from "../../assets/admin_dashboard.png"

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
const BACK_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
const MAP_PIN_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-7.58 7-13A7 7 0 0 0 5 9c0 5.42 7 13 7 13Z" /><circle cx="12" cy="9" r="2.5" /></svg>
const USERS_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6" /><circle cx="17" cy="8" r="2.5" /><path d="M23 20c0-2.6-2-4.8-4.5-5.6" /></svg>
const CHEVRON_DOWN_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
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

// ─── V2 hero demo ───────────────────────────────────────────────────────────
// V2's avatar hero runs the "Interactive Script and Configuration" doc's
// tree, starting with the Traveler Journey (the "Travel Booking" branch —
// see TJStepId below). Travel Management / Expense Management / Administrator
// View are the doc's other three top-level branches; until those are built
// out the same way, their chips just show a short one-line reply. Kept fully
// separate from TRAVELLER_STEPS/TRAVELLER_NEXT so V1's script can never be
// affected by changes made here.
type TJStepId = "tj-role" | "tj-destination" | "tj-destination-continent" | "tj-destination-country" | "tj-purpose" | "tj-travelers" | "tj-action" | "tj-hotel" | "tj-seat" | "tj-next"
type TMStepId =
    | "tm-role"
    | "tm-coord-q1" | "tm-coord-q2" | "tm-coord-q3" | "tm-coord-wrap"
    | "tm-mgr-q1" | "tm-mgr-q2-approval" | "tm-mgr-q2-budget" | "tm-mgr-wrap"
    | "tm-people-q1" | "tm-people-q2" | "tm-people-wrap"
type EMStepId =
    | "em-start"
    | "em-spend-q1" | "em-spend-category" | "em-spend-wrap"
    | "em-reimb-q1" | "em-reimb-wrap"
    | "em-alerts-q1" | "em-alerts-wrap"
    | "em-overview-wrap"
type AVStepId =
    | "av-start"
    | "av-budget-q2" | "av-budget-wrap"
    | "av-policy-q2" | "av-policy-wrap"
    | "av-savings-q2" | "av-savings-wrap"
    | "av-sustain-q1" | "av-sustain-wrap"
    | "av-safety-q2" | "av-safety-wrap"
type V2StepId = "start" | TJStepId | TMStepId | EMStepId | AVStepId | "demo-name" | "demo-email" | "demo-size" | "demo-mobile" | "demo-message" | "demo-datetime" | "demo-done"

const V2_START_CAPTION = "Hi, I'm Miraee 👋 Hope you're doing well!\nI help make business travel simple for travelers, travel managers, and expense managers. How would you like to experience Miraee today?"

const V2_TOP_CHIPS: Chip[] = [
    { label: "Travel Booking", icon: PLANE_ICON },
    { label: "Travel Management", icon: CALENDAR_ICON },
    { label: "Expense Management", icon: RECEIPT_ICON },
    { label: "Administrator View", icon: USERS_ICON },
]

// A reply can carry one or more result cards (flight/hotel/restaurant) —
// the same shape a real booking response would return — instead of, or
// alongside, its line of caption text.
type V2Card =
    | { kind: "flight"; airline: string; route: string; time: string; price: string }
    | { kind: "hotel"; name: string; meta: string; price: string }
    | { kind: "restaurant"; name: string; meta: string; rating: string }
    | { kind: "stat"; label: string; value: string }
    | { kind: "image"; src: string; alt: string }

type V2Reply = { text: string; cards?: V2Card[] }

// One-line replies for top-level branches not yet built out step by step.
// All four are now, so this is currently empty — kept as the extension
// point for any future top-level chip that doesn't warrant a full tree.
const V2_REPLIES: Record<string, V2Reply> = {}

// ─── Traveler Journey (Travel Booking) ──────────────────────────────────────
// Doc: role → destination → purpose → traveler count → "what do you want me
// to do" → hotel prefs → seat prefs → confirmation + sample booking → next
// action. Two answers (role, destination) get echoed back in later copy, so
// they're the only ones worth keeping in state — the rest only ever drive
// which chips/caption comes next.
const TJ_ROLE_CHIPS: Chip[] = [
    { label: "Associate/Executive", icon: USERS_ICON },
    { label: "Manager", icon: USERS_ICON },
    { label: "Senior Manager", icon: USERS_ICON },
    { label: "Team Lead", icon: USERS_ICON },
    { label: "Chief Officer", icon: USERS_ICON },
]
const TJ_DESTINATION_CHIPS: Chip[] = [
    { label: "New York", icon: MAP_PIN_ICON },
    { label: "Dubai", icon: MAP_PIN_ICON },
    { label: "Singapore", icon: MAP_PIN_ICON },
    { label: "Other destinations", icon: MAP_PIN_ICON },
]
// "Other destinations" — picking a continent narrows things down before
// asking for the actual city, rather than dropping straight into a blank
// "where to?" with no structure.
const CONTINENT_CHIPS: Chip[] = [
    { label: "Africa", icon: MAP_PIN_ICON },
    { label: "Antarctica", icon: MAP_PIN_ICON },
    { label: "Asia", icon: MAP_PIN_ICON },
    { label: "Europe", icon: MAP_PIN_ICON },
    { label: "North America", icon: MAP_PIN_ICON },
    { label: "Oceania", icon: MAP_PIN_ICON },
    { label: "South America", icon: MAP_PIN_ICON },
]
const TJ_PURPOSE_CHIPS: Chip[] = [
    { label: "Client meeting", icon: BRIEFCASE_ICON },
    { label: "Business trip", icon: PLANE_ICON },
    { label: "Offsite", icon: USERS_ICON },
    { label: "Personal Travel", icon: MAP_PIN_ICON },
]
const TJ_TRAVELERS_CHIPS: Chip[] = [
    { label: "Just you", icon: USERS_ICON },
    { label: "2-3", icon: USERS_ICON },
    { label: "4-5", icon: USERS_ICON },
    { label: "100+ people", icon: USERS_ICON },
]
const TJ_ACTION_CHIPS: Chip[] = [
    { label: "Plan a trip", icon: PLANE_ICON },
    { label: "Book a flight", icon: PLANE_ICON },
    { label: "Find a hotel near my meeting", icon: BUILDING_ICON },
    { label: "Book a demo", icon: CALENDAR_ICON },
]
const TJ_HOTEL_CHIPS: Chip[] = [
    { label: "3 star hotels", icon: BUILDING_ICON },
    { label: "4 star hotels", icon: BUILDING_ICON },
    { label: "5 star hotels", icon: BUILDING_ICON },
    { label: "Budget hotels", icon: BUILDING_ICON },
]
const TJ_SEAT_CHIPS: Chip[] = [
    { label: "Aisle Seat - direct flights", icon: PLANE_ICON },
    { label: "Window Seat - direct flights", icon: PLANE_ICON },
    { label: "Aisle Seat - halt flights", icon: PLANE_ICON },
    { label: "Window Seat - halt flights", icon: PLANE_ICON },
]
const TJ_NEXT_CHIPS: Chip[] = [
    { label: "Book another trip", icon: REFRESH_ICON },
    { label: "Show me a sample booking", icon: CHECK_ICON },
    { label: "Access my trips", icon: BRIEFCASE_ICON },
    { label: "Back to the Main Menu", icon: CLOSE_ICON },
]

const TJ_PROMPTS: Record<TJStepId, string> = {
    "tj-role": "Role in the organisation:",
    "tj-destination": "Please select your destination so I can find the accurate options for you:",
    // Both overwritten with a specific line as soon as their step is
    // reached (continent name / "which continent" wording) — these are
    // just the Record's required fallback, never actually shown.
    "tj-destination-continent": "Sure — which continent?",
    "tj-destination-country": "Where would you like to go?",
    "tj-purpose": "What is the purpose of your trip?",
    "tj-travelers": "How many of you are traveling?",
    "tj-action": "Understood. What would you want me to do for you today?",
    "tj-hotel": "Hotel preferences:",
    "tj-seat": "Seat preference & route style:",
    "tj-next": "What would you like to do next?",
}

// Which step follows which, for the steps that don't need a chip-specific
// branch (see tjChoose for the ones that do: role, destination, action).
const TJ_NEXT_STEP: Partial<Record<TJStepId, TJStepId>> = {
    "tj-purpose": "tj-travelers",
    "tj-travelers": "tj-action",
    "tj-hotel": "tj-seat",
}

// ─── Travel Management ───────────────────────────────────────────────────
// Doc: pick which of three roles you are, then a role-specific tree —
// Travel Coordinator (live-ops style: a dashboard snapshot, then a scripted
// flight-delay scenario), Manager (approvals/budget menu, one follow-up
// question that depends on which category was picked), People Officer
// (compliance/safety menu with a scripted risk-alert scenario). Each ends
// on the same "check another category or head back" wrap-up, which loops
// back to that role's own Q1 rather than to the role picker.
const TM_ROLE_CHIPS: Chip[] = [
    { label: "Travel Coordinator", icon: USERS_ICON },
    { label: "People Officer", icon: USERS_ICON },
    { label: "Manager", icon: USERS_ICON },
]
const TM_COORD_Q1_CHIPS: Chip[] = [
    { label: "Active Trips", icon: PLANE_ICON },
    { label: "Upcoming Trips", icon: CALENDAR_ICON },
    { label: "Travelers Abroad", icon: MAP_PIN_ICON },
    { label: "Open Bookings", icon: BRIEFCASE_ICON },
]
const TM_COORD_Q2_CHIPS: Chip[] = [
    { label: "Alert Mr. Dev so he can reschedule his meeting", icon: USERS_ICON },
    { label: "Keep looking for options and then inform him once found", icon: REFRESH_ICON },
    { label: "All of the above", icon: CHECK_ICON },
]
const YES_NO_CHIPS: Chip[] = [
    { label: "Yes", icon: CHECK_ICON },
    { label: "No", icon: CLOSE_ICON },
]
const TM_MGR_Q1_CHIPS: Chip[] = [
    { label: "Pending Approvals", icon: CHECK_ICON },
    { label: "Trip Requests", icon: PLANE_ICON },
    { label: "Budget & Spend", icon: RECEIPT_ICON },
    { label: "Policy & Savings", icon: BRIEFCASE_ICON },
]
const TM_MGR_APPROVAL_CHIPS: Chip[] = [
    { label: "Yes, auto-approve low risk", icon: CHECK_ICON },
    { label: "No, I'll review everything", icon: CLOSE_ICON },
]
const TM_MGR_BUDGET_CHIPS: Chip[] = [
    { label: "Yes, email me weekly", icon: CHECK_ICON },
    { label: "No, I'll check manually", icon: CLOSE_ICON },
]
const TM_PEOPLE_Q1_CHIPS: Chip[] = [
    { label: "Compliance checklist", icon: CHECK_ICON },
    { label: "Live traveler locations", icon: MAP_PIN_ICON },
    { label: "Traveller Calendars", icon: CALENDAR_ICON },
]
const TM_PEOPLE_Q2_CHIPS: Chip[] = [
    { label: "Yes, alert me", icon: CHECK_ICON },
    { label: "No, just show data", icon: CLOSE_ICON },
]
const TM_WRAP_CHIPS: Chip[] = [
    { label: "Check another category", icon: REFRESH_ICON },
    { label: "Back to Main Menu", icon: CLOSE_ICON },
]

const TM_COORD_DASHBOARD: V2Card[] = [
    { kind: "stat", label: "Active Trips", value: "12" },
    { kind: "stat", label: "Upcoming Trips", value: "8" },
    { kind: "stat", label: "Travelers Abroad", value: "5" },
    { kind: "stat", label: "Open Bookings", value: "3" },
]

const TM_PROMPTS: Record<TMStepId, string> = {
    "tm-role": "As a Travel Manager, I tailor what I show you based on what you actually handle day-to-day. How would you define your role?",
    "tm-coord-q1": "What would you like to check right now?",
    "tm-coord-q2": "The flight booking for Mr. Dev for Delhi to Singapore is delayed by 3 hours due to technical issues. I'm looking for alternatives for him, until then, what would you want me to do?",
    "tm-coord-q3": "I've found an alternative and shared it with him for final approval before we book. I'll process the refund for the previous booking as well. Would you want me to go ahead?",
    "tm-coord-wrap": "Want to check another category, or head back?",
    "tm-mgr-q1": "What do you want to look at first?",
    "tm-mgr-q2-approval": "Would you like low-risk trips to auto-approve so they don't pile up here?",
    "tm-mgr-q2-budget": "Want a weekly summary of this sent to you automatically?",
    "tm-mgr-wrap": "Want to look at another area, or head back?",
    "tm-people-q1": "What do you want to access today?",
    "tm-people-q2": "Alert shared has been averted. Jenny in Marketing was flagged to not go ahead with the booking. Want me to share such high-risk zones and other compliance related status issues?",
    "tm-people-wrap": "Want to check something else, or head back?",
}

// ─── Expense Management ─────────────────────────────────────────────────
// Doc: pick a category (spend analytics / reimbursements / alerts / an
// overview dashboard), each a flat menu-and-response tree with its own
// wrap-up wording, looping back to that category's own first question
// rather than the top-level menu.
const EM_START_CHIPS: Chip[] = [
    { label: "Spend Analytics", icon: RECEIPT_ICON },
    { label: "Reimbursements", icon: CHECK_ICON },
    { label: "Alerts & Settings", icon: BRIEFCASE_ICON },
    { label: "Overview - Dashboard", icon: CALENDAR_ICON },
]
const EM_SPEND_Q1_CHIPS: Chip[] = [
    { label: "6-month spend trend", icon: CALENDAR_ICON },
    { label: "Category breakdown", icon: RECEIPT_ICON },
    { label: "Savings recommendations", icon: CHECK_ICON },
]
const EM_SPEND_CATEGORY_CHIPS: Chip[] = [
    { label: "Flights", icon: PLANE_ICON },
    { label: "Hotels", icon: BUILDING_ICON },
    { label: "Rentals", icon: BRIEFCASE_ICON },
    { label: "Food", icon: RECEIPT_ICON },
    { label: "Miscellaneous", icon: CHECK_ICON },
]
const EM_SPEND_WRAP_CHIPS: Chip[] = [
    { label: "Yes, another view", icon: REFRESH_ICON },
    { label: "Back to Main Menu", icon: CLOSE_ICON },
]
const EM_REIMB_Q1_CHIPS: Chip[] = [
    { label: "Pending", icon: REFRESH_ICON },
    { label: "Approved", icon: CHECK_ICON },
    { label: "Paid", icon: CHECK_ICON },
    { label: "Full pipeline", icon: MAP_PIN_ICON },
]
const EM_REIMB_WRAP_CHIPS: Chip[] = [
    { label: "Check another stage", icon: REFRESH_ICON },
    { label: "Back to Main Menu", icon: CLOSE_ICON },
]
const EM_ALERTS_Q1_CHIPS: Chip[] = [
    { label: "Reimbursement alerts", icon: CHECK_ICON },
    { label: "Budget alerts", icon: RECEIPT_ICON },
    { label: "Card alerts", icon: BRIEFCASE_ICON },
    { label: "All of the above", icon: CHECK_ICON },
]
const EM_ALERTS_WRAP_CHIPS: Chip[] = [
    { label: "Yes, another alert", icon: REFRESH_ICON },
    { label: "Back to Main Menu", icon: CLOSE_ICON },
]
const EM_OVERVIEW_WRAP_CHIPS: Chip[] = [
    { label: "Check another view", icon: REFRESH_ICON },
    { label: "Back to Main Menu", icon: CLOSE_ICON },
]

const EM_TREND_CARDS: V2Card[] = [
    { kind: "stat", label: "6-Month Spend", value: "$412K" },
    { kind: "stat", label: "MoM Change", value: "+8%" },
    { kind: "stat", label: "Top Category", value: "Flights" },
]
const EM_CATEGORY_VALUES: Record<string, string> = {
    "Flights": "$68K",
    "Hotels": "$41K",
    "Rentals": "$12K",
    "Food": "$9K",
    "Miscellaneous": "$5K",
}
const EM_REIMB_TEXT: Record<string, string> = {
    "Pending": "Here's what's waiting on review.",
    "Approved": "Reimbursements that were approved, cleared and queued for payout.",
    "Paid": "Bills that are already settled.",
    "Full pipeline": "Here's the whole pipeline, end to end.",
}
const EM_ALERTS_TEXT: Record<string, string> = {
    "Reimbursement alerts": "Done. I'll notify you when a claim is submitted or needs your action.",
    "Budget alerts": "Done. I'll flag you the moment a department nears or exceeds budget.",
    "Card alerts": "Done. I'll alert you on unusual or flagged card activity.",
    "All of the above": "Done, you're covered across reimbursements, budget, and card activity.",
}

const EM_PROMPTS: Record<EMStepId, string> = {
    "em-start": "I can show you spend, reimbursements, or company-wide analytics. What do you want to access today?",
    "em-spend-q1": "What would you like to dig into?",
    "em-spend-category": "Which category do you want to break down?",
    "em-spend-wrap": "Check something else here?",
    "em-reimb-q1": "Which stage do you want to check?",
    "em-reimb-wrap": "Check another stage, or head back?",
    "em-alerts-q1": "Which alerts would you like to turn on?",
    "em-alerts-wrap": "Set up another alert, or head back?",
    "em-overview-wrap": "Check something else, or head back?",
}

// ─── Administrator View ─────────────────────────────────────────────────
// Doc: pick a section, each opening on a snapshot dashboard plus one
// follow-up question that drills into it. Every path's follow-up choices —
// including "No, that's enough" — just produce a line of copy and loop
// back to that section's own dashboard question, with an added escape
// hatch back to the main menu (the doc's own "Loops back" wording doesn't
// specify one, but every other branch in this demo offers it).
const AV_START_CHIPS: Chip[] = [
    { label: "Budget & Spend", icon: RECEIPT_ICON },
    { label: "Policy & Compliance", icon: CHECK_ICON },
    { label: "Savings & Opportunities", icon: REFRESH_ICON },
    { label: "Sustainability", icon: MAP_PIN_ICON },
    { label: "Traveler Safety & Activity", icon: USERS_ICON },
]
const AV_BUDGET_Q2_CHIPS: Chip[] = [
    { label: "By department", icon: USERS_ICON },
    { label: "By category (Flights/Hotels/Ground)", icon: RECEIPT_ICON },
    { label: "No, that's enough", icon: CHECK_ICON },
]
const AV_BUDGET_WRAP_CHIPS: Chip[] = [
    { label: "Check another breakdown", icon: REFRESH_ICON },
    { label: "Back to Main Menu", icon: CLOSE_ICON },
]
const AV_POLICY_Q2_CHIPS: Chip[] = [
    { label: "Break down by department", icon: USERS_ICON },
    { label: "Show top exceptions", icon: CHECK_ICON },
    { label: "No, that's enough", icon: CLOSE_ICON },
]
const AV_POLICY_WRAP_CHIPS: Chip[] = [
    { label: "Check another section", icon: REFRESH_ICON },
    { label: "Back to Main Menu", icon: CLOSE_ICON },
]
const AV_SAVINGS_Q2_CHIPS: Chip[] = [
    { label: "Top savers by department", icon: USERS_ICON },
    { label: "Top savers by individual", icon: USERS_ICON },
    { label: "No, that's enough", icon: CLOSE_ICON },
]
const AV_SAVINGS_WRAP_CHIPS: Chip[] = [
    { label: "Check another view", icon: REFRESH_ICON },
    { label: "Back to Main Menu", icon: CLOSE_ICON },
]
const AV_SUSTAIN_Q1_CHIPS: Chip[] = [
    { label: "Total Emissions", icon: MAP_PIN_ICON },
    { label: "YoY change", icon: REFRESH_ICON },
    { label: "Progress vs Annual Target", icon: CHECK_ICON },
]
const AV_SUSTAIN_WRAP_CHIPS: Chip[] = [
    { label: "Check another metric", icon: REFRESH_ICON },
    { label: "Back to Main Menu", icon: CLOSE_ICON },
]
const AV_SAFETY_Q2_CHIPS: Chip[] = [
    { label: "View live traveler map", icon: MAP_PIN_ICON },
    { label: "View active alerts", icon: CHECK_ICON },
    { label: "No, that's enough", icon: CLOSE_ICON },
]
const AV_SAFETY_WRAP_CHIPS: Chip[] = [
    { label: "Check another view", icon: REFRESH_ICON },
    { label: "Back to Main Menu", icon: CLOSE_ICON },
]

const AV_BUDGET_DASHBOARD: V2Card[] = [
    { kind: "stat", label: "Budget Utilization", value: "78%" },
    { kind: "stat", label: "vs Last Month", value: "+4%" },
    { kind: "stat", label: "vs Quarter", value: "-2%" },
    { kind: "stat", label: "Forecast vs Actual", value: "On track" },
]
const AV_POLICY_DASHBOARD: V2Card[] = [
    { kind: "stat", label: "Overall Compliance Score", value: "91%" },
    { kind: "stat", label: "Policy Exceptions", value: "14" },
    { kind: "stat", label: "Violations This Month", value: "3" },
]
const AV_SAVINGS_DASHBOARD: V2Card[] = [
    { kind: "stat", label: "Savings Identified", value: "$96K" },
    { kind: "stat", label: "Savings Captured", value: "$61K" },
    { kind: "stat", label: "Top Opportunity", value: "Consolidate hotel vendors · $8K/mo" },
]
const AV_SAFETY_DASHBOARD: V2Card[] = [
    { kind: "stat", label: "Active Trips", value: "34" },
    { kind: "stat", label: "Active Cities", value: "12" },
    { kind: "stat", label: "Active Alerts", value: "2" },
]
const AV_SUSTAIN_VALUES: Record<string, string> = {
    "Total Emissions": "1,240 tCO2e",
    "YoY change": "-6%",
    "Progress vs Annual Target": "72% complete",
}

const AV_BUDGET_TEXT: Record<string, string> = {
    "By department": "Here's spend across your top departments, bar by bar.",
    "By category (Flights/Hotels/Ground)": "Here's the split across Flights, Hotels, and Ground, a stacked view.",
    "No, that's enough": "Got it. Anything else you'd like a snapshot of?",
}
const AV_POLICY_TEXT: Record<string, string> = {
    "Break down by department": "Here's compliance % across each department, you'll spot who needs attention.",
    "Show top exceptions": "Here are the most frequent policy exceptions this month.",
    "No, that's enough": "Got it — loop back anytime.",
}
const AV_SAVINGS_TEXT: Record<string, string> = {
    "Top savers by department": "Here are your top 4 departments by savings generated.",
    "Top savers by individual": "Here are your top 4 individual contributors to savings.",
    "No, that's enough": "Got it — loop back anytime.",
}
const AV_SAFETY_TEXT: Record<string, string> = {
    "View live traveler map": "Here's a live map to see who's active, in transit, checked in, or at meetings right now.",
    "View active alerts": "Here's what's flagged: traveler, type of issue, destination, and status.",
    "No, that's enough": "Got it — loop back anytime.",
}

const AV_PROMPTS: Record<AVStepId, string> = {
    "av-start": "What section do you want to access today?",
    "av-budget-q2": "Here's where things stand. Want to break this down further?",
    "av-budget-wrap": "Anything else you'd like a snapshot of?",
    "av-policy-q2": "Here's the picture. Want more detail?",
    "av-policy-wrap": "Want to check something else, or head back?",
    "av-savings-q2": "Here's your efficiency story. Want to see who's driving the savings?",
    "av-savings-wrap": "Want to check something else, or head back?",
    "av-sustain-q1": "I can show you the breakdown:",
    "av-sustain-wrap": "Want to check something else, or head back?",
    "av-safety-q2": "Here's what's live right now. Want to see more?",
    "av-safety-wrap": "Want to check something else, or head back?",
}

// The doc's month → season line ("it's currently [season]") — computed from
// the visitor's actual clock instead of hardcoded, so it stays right no
// matter when the demo is run. Northern-hemisphere seasons, matching the
// rest of the site's dates (e.g. the Forbes Singapore example elsewhere).
function seasonNow(): string {
    const m = new Date().getMonth()
    if (m === 11 || m <= 1) return "winter"
    if (m <= 4) return "spring"
    if (m <= 7) return "summer"
    return "autumn"
}

function v2ChipsFor(step: V2StepId): Chip[] {
    if (step === "start") return V2_TOP_CHIPS
    if (step === "tj-role") return TJ_ROLE_CHIPS
    if (step === "tj-destination") return TJ_DESTINATION_CHIPS
    // tj-destination-continent has no chips — it's rendered as a <select>
    // dropdown instead (see chatContent), and tj-destination-country is
    // free-text only.
    if (step === "tj-destination-continent") return []
    if (step === "tj-destination-country") return []
    if (step === "tj-purpose") return TJ_PURPOSE_CHIPS
    if (step === "tj-travelers") return TJ_TRAVELERS_CHIPS
    if (step === "tj-action") return TJ_ACTION_CHIPS
    if (step === "tj-hotel") return TJ_HOTEL_CHIPS
    if (step === "tj-seat") return TJ_SEAT_CHIPS
    if (step === "tj-next") return TJ_NEXT_CHIPS
    if (step === "tm-role") return TM_ROLE_CHIPS
    if (step === "tm-coord-q1") return TM_COORD_Q1_CHIPS
    if (step === "tm-coord-q2") return TM_COORD_Q2_CHIPS
    if (step === "tm-coord-q3") return YES_NO_CHIPS
    if (step === "tm-coord-wrap") return TM_WRAP_CHIPS
    if (step === "tm-mgr-q1") return TM_MGR_Q1_CHIPS
    if (step === "tm-mgr-q2-approval") return TM_MGR_APPROVAL_CHIPS
    if (step === "tm-mgr-q2-budget") return TM_MGR_BUDGET_CHIPS
    if (step === "tm-mgr-wrap") return TM_WRAP_CHIPS
    if (step === "tm-people-q1") return TM_PEOPLE_Q1_CHIPS
    if (step === "tm-people-q2") return TM_PEOPLE_Q2_CHIPS
    if (step === "tm-people-wrap") return TM_WRAP_CHIPS
    if (step === "em-start") return EM_START_CHIPS
    if (step === "em-spend-q1") return EM_SPEND_Q1_CHIPS
    if (step === "em-spend-category") return EM_SPEND_CATEGORY_CHIPS
    if (step === "em-spend-wrap") return EM_SPEND_WRAP_CHIPS
    if (step === "em-reimb-q1") return EM_REIMB_Q1_CHIPS
    if (step === "em-reimb-wrap") return EM_REIMB_WRAP_CHIPS
    if (step === "em-alerts-q1") return EM_ALERTS_Q1_CHIPS
    if (step === "em-alerts-wrap") return EM_ALERTS_WRAP_CHIPS
    if (step === "em-overview-wrap") return EM_OVERVIEW_WRAP_CHIPS
    if (step === "av-start") return AV_START_CHIPS
    if (step === "av-budget-q2") return AV_BUDGET_Q2_CHIPS
    if (step === "av-budget-wrap") return AV_BUDGET_WRAP_CHIPS
    if (step === "av-policy-q2") return AV_POLICY_Q2_CHIPS
    if (step === "av-policy-wrap") return AV_POLICY_WRAP_CHIPS
    if (step === "av-savings-q2") return AV_SAVINGS_Q2_CHIPS
    if (step === "av-savings-wrap") return AV_SAVINGS_WRAP_CHIPS
    if (step === "av-sustain-q1") return AV_SUSTAIN_Q1_CHIPS
    if (step === "av-sustain-wrap") return AV_SUSTAIN_WRAP_CHIPS
    if (step === "av-safety-q2") return AV_SAFETY_Q2_CHIPS
    if (step === "av-safety-wrap") return AV_SAFETY_WRAP_CHIPS
    if (step === "demo-done") return [{ label: "Start over", icon: REFRESH_ICON }]
    return []
}

// The Traveler Journey's confirmation card and the "Show me a sample
// booking" chip both need a flight+hotel pair — one function, keyed off
// whichever destination the visitor picked (or a generic pair if they chose
// "Other destinations" or haven't answered yet).
const TJ_DESTINATION_SAMPLES: Record<string, { route: string; hotel: string }> = {
    "New York": { route: "→ JFK", hotel: "The Midtown Suites" },
    "Dubai": { route: "→ DXB", hotel: "Jumeirah Beach Residence" },
    "Singapore": { route: "→ SIN", hotel: "Marina Bay Sands" },
}
function sampleBookingCards(destination?: string): V2Card[] {
    const sample = destination ? TJ_DESTINATION_SAMPLES[destination] : undefined
    const place = destination && destination !== "Other destinations" ? destination : "your destination"
    return [
        { kind: "flight", airline: "Emirates · EK 202", route: sample?.route ?? `→ ${place}`, time: "Tue, 8:10 AM – 4:35 PM · Nonstop", price: "$620" },
        { kind: "hotel", name: sample?.hotel ?? `${place} City Hotel`, meta: "0.3 mi from downtown · 4.6★ · in policy", price: "$219/night" },
    ]
}

type DemoField = "name" | "email" | "size" | "mobile" | "message" | "datetime"
const DEMO_FIELDS: DemoField[] = ["name", "email", "size", "mobile", "message", "datetime"]
const DEMO_PROMPTS: Record<DemoField, string> = {
    name: "Sure — let's get your demo booked. What's your name?",
    email: "Thanks. What's your company email?",
    size: "Great. What's your company size?",
    mobile: "And a mobile number we can reach you on?",
    message: "Anything you'd like our team to know before the call?",
    datetime: "Last thing — what date and time works best for the demo call?",
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

// The "Other destinations" chip IS the continent picker — opening it drops
// a small menu right there in the chip column, rather than swapping the
// whole hero over to a separate "which continent?" screen for what's a
// single extra choice. Custom listbox, not a native <select>: the native
// popup renders as the browser's own unstyled menu (system font, square
// corners, platform blue highlight) with no way to skin it to match chips.
function DestinationChip({ q, open, setOpen, menuRef, onPick }: {
    q: Chip
    open: boolean
    setOpen: (v: boolean | ((o: boolean) => boolean)) => void
    menuRef: RefObject<HTMLDivElement | null>
    onPick: (continent: string) => void
}) {
    return (
        <div className="v4-destination-chip" ref={menuRef}>
            <button type="button" className="v4-destination-chip__trigger"
                aria-haspopup="listbox" aria-expanded={open}
                onClick={() => setOpen(o => !o)}>
                {q.icon}<span>{q.label}</span>
                <span className={"v4-destination-chip__chevron" + (open ? " is-open" : "")} aria-hidden="true">{CHEVRON_DOWN_ICON}</span>
            </button>
            {open && (
                <ul className="v4-destination-chip__menu" role="listbox" aria-label="Which continent?">
                    {CONTINENT_CHIPS.map(c => (
                        <li key={c.label} role="option" aria-selected={false}>
                            <button type="button" onClick={() => { setOpen(false); onPick(c.label) }}>
                                {c.icon}<span>{c.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
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

// A single flight/hotel/restaurant result — same illustrative-sample-data
// convention as the rest of the demo script, rendered under V2's reply
// bubble for the chips whose reply is a real booking result rather than
// just a line of copy (see V2_REPLIES above).
function V2ResultCard({ card, index, onImageClick }: { card: V2Card; index: number; onImageClick?: () => void }) {
    const reduce = useReducedMotion()
    const motionProps = reduce ? {} : {
        initial: { opacity: 0, y: 12, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.35, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] as const },
        whileHover: { y: -3, boxShadow: "0 14px 30px rgba(69, 14, 20, .1)" },
    }
    if (card.kind === "flight") {
        return (
            <motion.div className="v4-result-card v4-result-card--flight" {...motionProps}>
                <div className="v4-result-card__icon">{PLANE_ICON}</div>
                <div className="v4-result-card__body">
                    <strong>{card.airline}</strong>
                    <span>{card.route}</span>
                    <span>{card.time}</span>
                </div>
                <div className="v4-result-card__price">{card.price}</div>
            </motion.div>
        )
    }
    if (card.kind === "hotel") {
        return (
            <motion.div className="v4-result-card v4-result-card--hotel" {...motionProps}>
                <div className="v4-result-card__icon">{BUILDING_ICON}</div>
                <div className="v4-result-card__body">
                    <strong>{card.name}</strong>
                    <span>{card.meta}</span>
                </div>
                <div className="v4-result-card__price">{card.price}</div>
            </motion.div>
        )
    }
    if (card.kind === "restaurant") {
        return (
            <motion.div className="v4-result-card v4-result-card--restaurant" {...motionProps}>
                <div className="v4-result-card__icon">{MAP_PIN_ICON}</div>
                <div className="v4-result-card__body">
                    <strong>{card.name}</strong>
                    <span>{card.meta}</span>
                </div>
                <div className="v4-result-card__price">{card.rating}</div>
            </motion.div>
        )
    }
    if (card.kind === "image") {
        return (
            <motion.button type="button" className="v4-result-card v4-result-card--image" {...motionProps}
                onClick={onImageClick} aria-haspopup="dialog">
                <img src={card.src} alt={card.alt} />
                <span className="v4-result-card__image-hint">Tap to view</span>
            </motion.button>
        )
    }
    // "stat" — a dashboard-style number (active trips, savings, compliance
    // score, ...) for the Travel Management / Admin View branches, where the
    // doc's replies are metrics rather than a bookable result.
    return (
        <motion.div className="v4-result-card v4-result-card--stat" {...motionProps}>
            <div className="v4-result-card__body">
                <span>{card.label}</span>
                <strong className="v4-result-card__stat-value">{card.value}</strong>
            </div>
        </motion.div>
    )
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
    const isV2 = isV2Path(useLocation().pathname)
    const [step, setStep] = useState<TravellerStepId>("start")
    const [destination, setDestination] = useState("")
    const [v2Step, setV2Step] = useState<V2StepId>("start")
    const [journey, setJourney] = useState<{ role?: string; destination?: string; continent?: string }>({})
    const [continentOpen, setContinentOpen] = useState(false)
    // Which sample-dashboard image (if any) the "tap to view" modal is
    // showing — null when closed. Holds the image itself, not just an
    // open/closed flag, so the modal always shows whichever screenshot the
    // visitor actually tapped (finance overview vs. admin overview).
    const [dashboardModalImage, setDashboardModalImage] = useState<{ src: string; alt: string } | null>(null)
    const continentRef = useRef<HTMLDivElement>(null)
    const [demoAnswers, setDemoAnswers] = useState<Partial<Record<DemoField, string>>>({})
    const [caption, setCaption] = useState(isV2 ? V2_START_CAPTION : TRAVELLER_STEPS.start.caption)
    const [value, setValue] = useState("")
    const [status, setStatus] = useState<"idle" | "thinking">("idle")
    const [filler, setFiller] = useState("")
    const [cards, setCards] = useState<V2Card[]>([])
    // V2 only: the reference "Where do you need to be?" landing is what
    // shows before the visitor has done anything. The instant they pick a
    // chip or submit text, this flips and the existing chat UI below (same
    // caption/chips/cards, unchanged) takes over — no new interaction logic,
    // just a different first screen.
    const [started, setStarted] = useState(false)
    const typedPlaceholder = useTypewriter(PLACEHOLDER_PROMPTS, !!reduce)
    const timer = useRef<number>(0)

    useEffect(() => () => window.clearTimeout(timer.current), [])

    // Continent dropdown — closes on an outside click or Escape, same as
    // any native <select> would, since it's now a custom listbox instead
    // of one.
    useEffect(() => {
        if (!continentOpen) return
        const onPointerDown = (e: PointerEvent) => {
            if (continentRef.current && !continentRef.current.contains(e.target as Node)) setContinentOpen(false)
        }
        const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setContinentOpen(false) }
        document.addEventListener("pointerdown", onPointerDown)
        document.addEventListener("keydown", onKeyDown)
        return () => {
            document.removeEventListener("pointerdown", onPointerDown)
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [continentOpen])

    // Dashboard sample-image modal — Escape closes it, same as the click-
    // outside-the-panel handler already wired on the backdrop.
    useEffect(() => {
        if (!dashboardModalImage) return
        const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setDashboardModalImage(null) }
        document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [dashboardModalImage])

    const reset = () => {
        window.clearTimeout(timer.current)
        setStatus("idle")
        setFiller("")
        setValue("")
        setCards([])
        setContinentOpen(false)
        setDashboardModalImage(null)
        if (isV2) {
            setV2Step("start")
            setJourney({})
            setDemoAnswers({})
            setCaption(V2_START_CAPTION)
            setStarted(false)
            return
        }
        setStep("start")
        setDestination("")
        setCaption(TRAVELLER_STEPS.start.caption)
    }

    // V2's chip choice — separate script from V1's Traveller demo above (see
    // the "V2 hero demo" block near the top of this file).
    const v2Choose = (label: string) => {
        if (status === "thinking") return
        setStarted(true)
        if (v2Step === "start") {
            if (label === "Travel Booking") {
                setV2Step("tj-role")
                setCaption(TJ_PROMPTS["tj-role"])
                setCards([])
                return
            }
            if (label === "Travel Management") {
                setV2Step("tm-role")
                setCaption(TM_PROMPTS["tm-role"])
                setCards([])
                return
            }
            if (label === "Expense Management") {
                setV2Step("em-start")
                setCaption(EM_PROMPTS["em-start"])
                setCards([])
                return
            }
            if (label === "Administrator View") {
                setV2Step("av-start")
                setCaption(AV_PROMPTS["av-start"])
                setCards([{ kind: "image", src: adminDashboardImg, alt: "Miraee admin dashboard overview" }])
                return
            }
            const reply = V2_REPLIES[label]
            if (!reply) return
            setStatus("thinking")
            setFiller("Thinking…")
            window.clearTimeout(timer.current)
            timer.current = window.setTimeout(() => {
                setCaption(reply.text)
                setCards(reply.cards ?? [])
                setStatus("idle")
                setV2Step("start")
            }, 550)
            return
        }
        if (v2Step.startsWith("tj-")) { tjChoose(v2Step as TJStepId, label); return }
        if (v2Step.startsWith("tm-")) { tmChoose(v2Step as TMStepId, label); return }
        if (v2Step.startsWith("em-")) { emChoose(v2Step as EMStepId, label); return }
        if (v2Step.startsWith("av-")) { avChoose(v2Step as AVStepId, label); return }
        if (v2Step === "demo-done" && label === "Start over") { reset(); return }
    }

    // Traveler Journey — the "Travel Booking" branch of the doc. Role and
    // destination advance with an acknowledgement line (shown via the same
    // "thinking" filler beat as the rest of the demo); purpose/traveler
    // count/hotel just advance straight to the next question, since the doc
    // doesn't give Miraee a line for those. `tj-action` and `tj-next` each
    // have chip-specific behaviour (diverting to the demo flow, restarting
    // the journey, etc.) so they're handled explicitly rather than falling
    // through to TJ_NEXT_STEP.
    // Shared by picking one of the four destination chips AND by typing a
    // city once "Other destinations" → a continent → free text has narrowed
    // it down — same acknowledgement, same advance to tj-purpose, so a
    // typed destination isn't a second-class path through the journey.
    const confirmDestination = (destination: string) => {
        setJourney(j => ({ ...j, destination }))
        setStatus("thinking")
        setFiller(`Good choice. Quick note — I can show you local pricing alongside your home currency so there's no confusion, check if you need a visa, and it's currently ${seasonNow()} so I'd suggest you pack accordingly.`)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => {
            setV2Step("tj-purpose")
            setCaption(TJ_PROMPTS["tj-purpose"])
            setStatus("idle")
        }, 750)
    }

    const tjChoose = (step: TJStepId, label: string) => {
        if (step === "tj-role") {
            setJourney(j => ({ ...j, role: label }))
            setStatus("thinking")
            setFiller(`Got it. I'll only show you flights and hotels your company allows at ${label} level, so you never accidentally book something out of policy.`)
            window.clearTimeout(timer.current)
            timer.current = window.setTimeout(() => {
                setV2Step("tj-destination")
                setCaption(TJ_PROMPTS["tj-destination"])
                setStatus("idle")
            }, 750)
            return
        }
        if (step === "tj-destination") {
            // "Other destinations" isn't dispatched here — that chip is a
            // DestinationChip (see below) that opens its own continent
            // menu in place and calls tjChoose("tj-destination-continent",
            // …) directly on pick, without ever routing through this step.
            confirmDestination(label)
            return
        }
        if (step === "tj-destination-continent") {
            setJourney(j => ({ ...j, continent: label }))
            setV2Step("tj-destination-country")
            setCaption(`Where in ${label} would you like to go?`)
            setCards([])
            return
        }
        if (step === "tj-action") {
            if (label === "Book a demo") {
                setV2Step("demo-name")
                setCaption(DEMO_PROMPTS.name)
                setCards([])
                return
            }
            // "Plan a trip"/"Book a flight"/"Find a hotel near my meeting"
            // all continue straight into hotel prefs per the doc — "Book a
            // demo" is the only chip here that branches away from the
            // journey.
            setV2Step("tj-hotel")
            setCaption(TJ_PROMPTS["tj-hotel"])
            return
        }
        if (step === "tj-seat") {
            setStatus("thinking")
            setFiller("Perfect. I'll prioritize itineraries that match this and remember that for your future trips.")
            window.clearTimeout(timer.current)
            timer.current = window.setTimeout(() => {
                setV2Step("tj-next")
                setCaption("Your booking has been made. Please let me know if you'd like me to book car rentals for your trip? You can access your trip itinerary in the \"My Trips\" section.")
                setCards(sampleBookingCards(journey.destination))
                setStatus("idle")
            }, 750)
            return
        }
        if (step === "tj-next") {
            if (label === "Book another trip") {
                setJourney({})
                setV2Step("tj-role")
                setCaption(TJ_PROMPTS["tj-role"])
                setCards([])
                return
            }
            if (label === "Show me a sample booking") {
                setCaption("Here's a sample booking:")
                setCards(sampleBookingCards(journey.destination))
                return
            }
            if (label === "Access my trips") {
                setCaption("This is a demo, so there's nothing to open yet — in the real product this opens My Trips with every upcoming and past booking.")
                setCards([])
                return
            }
            if (label === "Back to the Main Menu") {
                setV2Step("start")
                setCaption(V2_START_CAPTION)
                setCards([])
                return
            }
            return
        }
        // tj-purpose, tj-travelers, tj-hotel: no doc-specified acknowledgement,
        // so just advance straight to the next question.
        const next = TJ_NEXT_STEP[step]
        if (!next) return
        setV2Step(next)
        setCaption(TJ_PROMPTS[next])
    }

    // Travel Management — three role-specific trees (see the "Travel
    // Management" config above) that all end on the same "check another
    // category or head back" wrap-up. That wrap-up loops back to the
    // current role's own Q1, not to the role picker — a manager checking
    // "another category" stays a manager.
    const tmChoose = (step: TMStepId, label: string) => {
        if (step === "tm-role") {
            if (label === "Travel Coordinator") {
                setV2Step("tm-coord-q1")
                setCaption(TM_PROMPTS["tm-coord-q1"])
                setCards(TM_COORD_DASHBOARD)
                return
            }
            if (label === "People Officer") {
                setV2Step("tm-people-q1")
                setCaption(TM_PROMPTS["tm-people-q1"])
                setCards([])
                return
            }
            // Manager
            setV2Step("tm-mgr-q1")
            setCaption(TM_PROMPTS["tm-mgr-q1"])
            setCards([])
            return
        }

        // ── Travel Coordinator ──
        if (step === "tm-coord-q1") {
            setV2Step("tm-coord-q2")
            setCaption(TM_PROMPTS["tm-coord-q2"])
            setCards([])
            return
        }
        if (step === "tm-coord-q2") {
            setV2Step("tm-coord-q3")
            setCaption(TM_PROMPTS["tm-coord-q3"])
            return
        }
        if (step === "tm-coord-q3") {
            setStatus("thinking")
            setFiller(label === "Yes"
                ? "Done — alternative booked, and the refund for the original ticket is processed."
                : "Understood — I'll hold off for now. Let me know when you're ready to go ahead.")
            window.clearTimeout(timer.current)
            timer.current = window.setTimeout(() => {
                setV2Step("tm-coord-wrap")
                setCaption(TM_PROMPTS["tm-coord-wrap"])
                setStatus("idle")
            }, 700)
            return
        }
        if (step === "tm-coord-wrap") {
            if (label === "Check another category") {
                setV2Step("tm-coord-q1")
                setCaption(TM_PROMPTS["tm-coord-q1"])
                setCards(TM_COORD_DASHBOARD)
                return
            }
            setV2Step("start")
            setCaption(V2_START_CAPTION)
            setCards([])
            return
        }

        // ── Manager ──
        if (step === "tm-mgr-q1") {
            const isApprovalTrack = label === "Pending Approvals" || label === "Trip Requests"
            const next: TMStepId = isApprovalTrack ? "tm-mgr-q2-approval" : "tm-mgr-q2-budget"
            setV2Step(next)
            setCaption(TM_PROMPTS[next])
            return
        }
        if (step === "tm-mgr-q2-approval" || step === "tm-mgr-q2-budget") {
            setStatus("thinking")
            setFiller(label.startsWith("Yes") ? "Done — set up." : "Got it — you're in control of that.")
            window.clearTimeout(timer.current)
            timer.current = window.setTimeout(() => {
                setV2Step("tm-mgr-wrap")
                setCaption(TM_PROMPTS["tm-mgr-wrap"])
                setStatus("idle")
            }, 600)
            return
        }
        if (step === "tm-mgr-wrap") {
            if (label === "Check another category") {
                setV2Step("tm-mgr-q1")
                setCaption(TM_PROMPTS["tm-mgr-q1"])
                return
            }
            setV2Step("start")
            setCaption(V2_START_CAPTION)
            setCards([])
            return
        }

        // ── People Officer ──
        if (step === "tm-people-q1") {
            setV2Step("tm-people-q2")
            setCaption(TM_PROMPTS["tm-people-q2"])
            return
        }
        if (step === "tm-people-q2") {
            setStatus("thinking")
            setFiller(label === "Yes, alert me"
                ? "Done — I'll flag high-risk zones and compliance issues the moment they come up."
                : "Understood — I'll keep the data visible without pushing alerts.")
            window.clearTimeout(timer.current)
            timer.current = window.setTimeout(() => {
                setV2Step("tm-people-wrap")
                setCaption(TM_PROMPTS["tm-people-wrap"])
                setStatus("idle")
            }, 600)
            return
        }
        if (step === "tm-people-wrap") {
            if (label === "Check another category") {
                setV2Step("tm-people-q1")
                setCaption(TM_PROMPTS["tm-people-q1"])
                return
            }
            setV2Step("start")
            setCaption(V2_START_CAPTION)
            setCards([])
            return
        }
    }

    // Expense Management — four flat menus (spend / reimbursements / alerts
    // / overview), each wrapping back to its own first question rather than
    // the category picker.
    const emChoose = (step: EMStepId, label: string) => {
        if (step === "em-start") {
            if (label === "Spend Analytics") {
                setV2Step("em-spend-q1")
                setCaption(EM_PROMPTS["em-spend-q1"])
                setCards([])
                return
            }
            if (label === "Reimbursements") {
                setV2Step("em-reimb-q1")
                setCaption(EM_PROMPTS["em-reimb-q1"])
                setCards([])
                return
            }
            if (label === "Alerts & Settings") {
                setV2Step("em-alerts-q1")
                setCaption(EM_PROMPTS["em-alerts-q1"])
                setCards([])
                return
            }
            // Overview - Dashboard: doc has no further question, just the
            // snapshot and a wrap-up. A real screenshot of the dashboard
            // instead of stat cards — tapping it opens the "this is a
            // sample" disclosure (see dashboardModalImage).
            setV2Step("em-overview-wrap")
            setCaption(EM_PROMPTS["em-overview-wrap"])
            setCards([{ kind: "image", src: financeDashboardImg, alt: "Miraee finance dashboard overview" }])
            return
        }

        // ── Spend Analytics ──
        if (step === "em-spend-q1") {
            if (label === "Category breakdown") {
                setV2Step("em-spend-category")
                setCaption(EM_PROMPTS["em-spend-category"])
                setCards([])
                return
            }
            const isTrend = label === "6-month spend trend"
            setStatus("thinking")
            setFiller(isTrend ? "Pulling up your 6-month spend trend…" : "One moment…")
            window.clearTimeout(timer.current)
            timer.current = window.setTimeout(() => {
                if (isTrend) {
                    setCaption("Here's your 6-month spend trend.")
                    setCards(EM_TREND_CARDS)
                } else {
                    setCaption("I learnt that we could save more by keeping a tab on the number of trips per user per client, which will help us save more from unnecessary trips per month.")
                    setCards([])
                }
                setV2Step("em-spend-wrap")
                setStatus("idle")
            }, 700)
            return
        }
        if (step === "em-spend-category") {
            const value = EM_CATEGORY_VALUES[label] ?? "—"
            setCaption(`${label} spend this month: ${value}.`)
            setCards([{ kind: "stat", label: `${label} Spend`, value }])
            setV2Step("em-spend-wrap")
            return
        }
        if (step === "em-spend-wrap") {
            if (label === "Yes, another view") {
                setV2Step("em-spend-q1")
                setCaption(EM_PROMPTS["em-spend-q1"])
                setCards([])
                return
            }
            setV2Step("start")
            setCaption(V2_START_CAPTION)
            setCards([])
            return
        }

        // ── Reimbursements ──
        if (step === "em-reimb-q1") {
            setCaption(EM_REIMB_TEXT[label] ?? "")
            setCards([])
            setV2Step("em-reimb-wrap")
            return
        }
        if (step === "em-reimb-wrap") {
            if (label === "Check another stage") {
                setV2Step("em-reimb-q1")
                setCaption(EM_PROMPTS["em-reimb-q1"])
                return
            }
            setV2Step("start")
            setCaption(V2_START_CAPTION)
            setCards([])
            return
        }

        // ── Alerts & Settings ──
        if (step === "em-alerts-q1") {
            setStatus("thinking")
            setFiller("Setting that up…")
            window.clearTimeout(timer.current)
            timer.current = window.setTimeout(() => {
                setCaption(EM_ALERTS_TEXT[label] ?? "Done.")
                setV2Step("em-alerts-wrap")
                setStatus("idle")
            }, 600)
            return
        }
        if (step === "em-alerts-wrap") {
            if (label === "Yes, another alert") {
                setV2Step("em-alerts-q1")
                setCaption(EM_PROMPTS["em-alerts-q1"])
                return
            }
            setV2Step("start")
            setCaption(V2_START_CAPTION)
            setCards([])
            return
        }

        // ── Overview - Dashboard ──
        if (step === "em-overview-wrap") {
            if (label === "Check another view") {
                setV2Step("em-start")
                setCaption(EM_PROMPTS["em-start"])
                setCards([])
                return
            }
            setV2Step("start")
            setCaption(V2_START_CAPTION)
            setCards([])
            return
        }
    }

    // Administrator View — five dashboard sections, each with one follow-up
    // question that drills into it and loops back to that same dashboard.
    const avChoose = (step: AVStepId, label: string) => {
        if (step === "av-start") {
            if (label === "Budget & Spend") {
                setV2Step("av-budget-q2")
                setCaption(AV_PROMPTS["av-budget-q2"])
                setCards(AV_BUDGET_DASHBOARD)
                return
            }
            if (label === "Policy & Compliance") {
                setV2Step("av-policy-q2")
                setCaption(AV_PROMPTS["av-policy-q2"])
                setCards(AV_POLICY_DASHBOARD)
                return
            }
            if (label === "Savings & Opportunities") {
                setV2Step("av-savings-q2")
                setCaption(AV_PROMPTS["av-savings-q2"])
                setCards(AV_SAVINGS_DASHBOARD)
                return
            }
            if (label === "Sustainability") {
                setV2Step("av-sustain-q1")
                setCaption(AV_PROMPTS["av-sustain-q1"])
                setCards([])
                return
            }
            // Traveler Safety & Activity
            setV2Step("av-safety-q2")
            setCaption(AV_PROMPTS["av-safety-q2"])
            setCards(AV_SAFETY_DASHBOARD)
            return
        }

        // ── Budget & Spend ──
        if (step === "av-budget-q2") {
            setCaption(AV_BUDGET_TEXT[label] ?? "")
            setCards([])
            setV2Step("av-budget-wrap")
            return
        }
        if (step === "av-budget-wrap") {
            if (label === "Check another breakdown") {
                setV2Step("av-budget-q2")
                setCaption(AV_PROMPTS["av-budget-q2"])
                setCards(AV_BUDGET_DASHBOARD)
                return
            }
            setV2Step("start")
            setCaption(V2_START_CAPTION)
            setCards([])
            return
        }

        // ── Policy & Compliance ──
        if (step === "av-policy-q2") {
            setCaption(AV_POLICY_TEXT[label] ?? "")
            setCards([])
            setV2Step("av-policy-wrap")
            return
        }
        if (step === "av-policy-wrap") {
            if (label === "Check another section") {
                setV2Step("av-policy-q2")
                setCaption(AV_PROMPTS["av-policy-q2"])
                setCards(AV_POLICY_DASHBOARD)
                return
            }
            setV2Step("start")
            setCaption(V2_START_CAPTION)
            setCards([])
            return
        }

        // ── Savings & Opportunities ──
        if (step === "av-savings-q2") {
            setCaption(AV_SAVINGS_TEXT[label] ?? "")
            setCards([])
            setV2Step("av-savings-wrap")
            return
        }
        if (step === "av-savings-wrap") {
            if (label === "Check another view") {
                setV2Step("av-savings-q2")
                setCaption(AV_PROMPTS["av-savings-q2"])
                setCards(AV_SAVINGS_DASHBOARD)
                return
            }
            setV2Step("start")
            setCaption(V2_START_CAPTION)
            setCards([])
            return
        }

        // ── Sustainability ──
        if (step === "av-sustain-q1") {
            const value = AV_SUSTAIN_VALUES[label] ?? "—"
            setCaption(`${label}: ${value}`)
            setCards([{ kind: "stat", label, value }])
            setV2Step("av-sustain-wrap")
            return
        }
        if (step === "av-sustain-wrap") {
            if (label === "Check another metric") {
                setV2Step("av-sustain-q1")
                setCaption(AV_PROMPTS["av-sustain-q1"])
                setCards([])
                return
            }
            setV2Step("start")
            setCaption(V2_START_CAPTION)
            setCards([])
            return
        }

        // ── Traveler Safety & Activity ──
        if (step === "av-safety-q2") {
            setCaption(AV_SAFETY_TEXT[label] ?? "")
            setCards([])
            setV2Step("av-safety-wrap")
            return
        }
        if (step === "av-safety-wrap") {
            if (label === "Check another view") {
                setV2Step("av-safety-q2")
                setCaption(AV_PROMPTS["av-safety-q2"])
                setCards(AV_SAFETY_DASHBOARD)
                return
            }
            setV2Step("start")
            setCaption(V2_START_CAPTION)
            setCards([])
            return
        }
    }

    // V2's "Book a demo" lead capture — one field per turn (see DEMO_FIELDS),
    // then a confirmation naming the date/time the person just typed. Free
    // text outside that flow gets the same generic respondTo() reply V1's
    // typed input falls back to past its first step.
    const v2Submit = (text: string) => {
        const trimmed = text.trim()
        if (!trimmed || status === "thinking") return
        setValue("")
        setStarted(true)

        // "Other destinations" → continent → typed city: the one place in
        // the Traveler Journey where free text (not a chip) IS the expected
        // answer, so it feeds the same confirmDestination() ack + advance
        // that clicking New York/Dubai/Singapore uses.
        if (v2Step === "tj-destination-country") {
            confirmDestination(trimmed)
            return
        }

        if (v2Step.startsWith("demo-") && v2Step !== "demo-done") {
            const field = v2Step.slice(5) as DemoField
            const answers = { ...demoAnswers, [field]: trimmed }
            setDemoAnswers(answers)
            const nextField = DEMO_FIELDS[DEMO_FIELDS.indexOf(field) + 1]
            setStatus("thinking")
            window.clearTimeout(timer.current)
            if (nextField) {
                setFiller("One moment…")
                timer.current = window.setTimeout(() => {
                    setV2Step(`demo-${nextField}` as V2StepId)
                    setCaption(DEMO_PROMPTS[nextField])
                    setStatus("idle")
                }, 450)
            } else {
                setFiller("Booking your demo…")
                timer.current = window.setTimeout(() => {
                    setV2Step("demo-done")
                    setCaption(`Thanks${answers.name ? ", " + answers.name : ""} — our team will get back to you at ${trimmed}, the time you've chosen.`)
                    setStatus("idle")
                }, 600)
            }
            return
        }

        setStatus("thinking")
        setFiller(fillerFor(trimmed))
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => {
            setCaption(respondTo(trimmed))
            setCards([])
            setStatus("idle")
        }, 550)
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
        if (isV2) { v2Choose(label); return }
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
        if (isV2) { v2Submit(text); return }
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
            {status === "thinking" ? (
                isV2 ? (
                    <span className="v4-thinking">
                        {filler}
                        <span className="v4-thinking__dots" aria-hidden="true"><i /><i /><i /></span>
                    </span>
                ) : filler
            ) : caption}
        </motion.span>
    )

    const chips = isV2 ? v2ChipsFor(v2Step) : TRAVELLER_STEPS[step].chips
    const [leftChips, rightChips] = splitChips(chips)

    // Shared by V1 (always shown) and V2's post-interaction state — kept as
    // one piece of markup so the two can never drift apart, rather than
    // duplicating it into both branches below.
    const chatContent = (
        <div className="v4-shell v4-avatar-spotlight__row">
            {/* Back to the landing screen — only meaningful for V2, which is
                the only version with a distinct "before you've done anything"
                screen to go back to. Resets the whole demo, not just the
                current step, so it always lands on a clean start. */}
            {isV2 && (
                <button type="button" className="v4-chat-back" onClick={reset}>
                    {BACK_ICON}<span>Start over</span>
                </button>
            )}

            {/* Chips are the current script node's quick-reply options
                (TRAVELLER_STEPS[step].chips), split across the two fixed
                columns flanking the portrait — see splitChips() above. The
                row is capped to a max-width and the side columns are
                fixed-width flex children (not `1fr` grid tracks), so it
                stays anchored close to the portrait instead of stretching
                the chips out to the viewport edges on wide screens. */}
            <div className="v4-assistant__chips v4-avatar-spotlight__chips">
                {leftChips.map(q => q.label === "Other destinations" && v2Step === "tj-destination" ? (
                    <DestinationChip key={q.label} q={q} open={continentOpen} setOpen={setContinentOpen}
                        menuRef={continentRef} onPick={c => tjChoose("tj-destination-continent", c)} />
                ) : (
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

                {isV2 && cards.length > 0 && (
                    <div className="v4-result-cards">
                        {cards.map((c, i) => (
                            <V2ResultCard key={i} card={c} index={i}
                                onImageClick={c.kind === "image" ? () => setDashboardModalImage({ src: c.src, alt: c.alt }) : undefined} />
                        ))}
                    </div>
                )}

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
                {rightChips.map(q => q.label === "Other destinations" && v2Step === "tj-destination" ? (
                    <DestinationChip key={q.label} q={q} open={continentOpen} setOpen={setContinentOpen}
                        menuRef={continentRef} onPick={c => tjChoose("tj-destination-continent", c)} />
                ) : (
                    <button type="button" key={q.label} onClick={() => choose(q.label)}>
                        {q.icon}<span>{q.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )

    if (!isV2) {
        return <section className="v4-avatar-spotlight">{chatContent}</section>
    }

    // V2: landing and chat swap with a pure-CSS enter animation (see
    // .v4-hero-fade-in in V4.css) — a plain conditional render, not
    // AnimatePresence. Nothing here waits on a JS animation lifecycle to
    // "complete" before mounting the next state, so there's no way for the
    // swap to get stuck the way an exit-animation-gated unmount can.
    if (!started) {
        return (
            <section className="v4-hero-landing v4-hero-fade-in">
                <div className="v4-hero-landing__avatar-wrap">
                    <img className="v4-hero-landing__avatar" src={avatarImg} alt="" />
                    <span className="v4-hero-landing__status" aria-hidden="true" />
                </div>
                <h1 className="v4-hero-landing__title">Hi, I'm Miraee 👋 Hope you're doing well!</h1>
                <p className="v4-hero-landing__subtitle">I help make business travel simple for travelers, travel managers, and expense managers. How would you like to experience Miraee today?</p>

                <form className="v4-hero-landing__search" onSubmit={e => { e.preventDefault(); submitText(value) }}>
                    <div className="v4-assistant__input-wrap">
                        <input
                            type="text"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder="Describe your trip, route, dates, or hotel needs…"
                            aria-label="Describe your trip, route, dates, or hotel needs"
                        />
                    </div>
                    <button type="button" className="v4-hero-landing__mic" aria-label="Try a sample voice prompt"
                        onClick={() => chips[0] && choose(chips[0].label)}>{MIC_ICON}</button>
                    <button type="submit" className="v4-hero-landing__send" aria-label="Send" disabled={!value.trim()}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                    </button>
                </form>

                <div className="v4-hero-landing__chips">
                    {chips.map(c => (
                        <button type="button" key={c.label}
                            className={"v4-hero-landing__chip" + (c.label === "Book a demo" ? " v4-hero-landing__chip--dark" : "")}
                            onClick={() => choose(c.label)}>
                            {c.icon}<span>{c.label}</span>
                        </button>
                    ))}
                </div>
            </section>
        )
    }

    return (
        <>
            <section className="v4-avatar-spotlight v4-hero-fade-in">{chatContent}</section>
            {dashboardModalImage && (
                <div className="v4-dashboard-modal" role="presentation" onClick={() => setDashboardModalImage(null)}>
                    <div className="v4-dashboard-modal__panel" role="dialog" aria-modal="true"
                        aria-label="Sample dashboard notice" onClick={e => e.stopPropagation()}>
                        <button type="button" className="v4-dashboard-modal__close" aria-label="Close"
                            onClick={() => setDashboardModalImage(null)}>{CLOSE_ICON}</button>
                        <img className="v4-dashboard-modal__img" src={dashboardModalImage.src} alt={dashboardModalImage.alt} />
                        <p className="v4-dashboard-modal__text">
                            This is a sample view of the dashboard. If you'd like to experience the Miraee App, contact our sales team.
                        </p>
                        <a className="v4-dashboard-modal__cta" href="/book-a-demo">Contact sales</a>
                    </div>
                </div>
            )}
        </>
    )
}
