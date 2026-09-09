// ROI / savings model for the Resources calculator. Pure functions and named
// constants, no React — so every number is auditable in one place and can be
// changed without touching the page.
//
// This is a marketing model aimed at finance buyers, so it is deliberately
// conservative in three ways that most such calculators are not:
//
//   1. The 20–30% band applies to FARES only (~75% of T&E), not to all spend.
//   2. Spend already inside a program earns only the incremental delta over an
//      existing negotiated discount, never the full band.
//   3. Spend brought under management is REPORTED BUT NOT ADDED to the total —
//      those dollars are already counted inside the fare-savings term, and
//      adding them again would inflate the headline by roughly 4–5% of annual
//      spend. See computeRoi().
//
// No subscription cost is netted out, because Miraee pricing is not public.
// The headline is therefore a gross figure and must be labelled as one.

export type Currency = "USD" | "EUR" | "GBP" | "INR" | "SGD"

export const LOCALE: Record<Currency, string> = {
    USD: "en-US", EUR: "de-DE", GBP: "en-GB", INR: "en-IN", SGD: "en-SG",
}

export type RoiInputs = {
    currency: Currency
    annualTravelSpend: number   // all travel: air, hotel, rail, car, ground
    travelers: number           // employees taking at least one business trip a year
    tripsPerTraveler: number    // trips per traveling employee per year
    adminHoursPerTrip: number   // hours spent booking, approving, filing, reconciling
    loadedHourlyCost: number    // fully loaded cost of one hour of that time
    toolCount: number           // distinct tools in the current travel + expense stack
    unmanagedSharePct: number   // 0–100, share of spend booked outside the program
}

export type NumericRange = { min: number; max: number; step: number; default: number }
export type NumericInputKey = Exclude<keyof RoiInputs, "currency">

export const RANGES = {
    annualTravelSpend: { min: 50_000, max: 250_000_000, step: 50_000, default: 5_000_000 },
    travelers: { min: 5, max: 50_000, step: 5, default: 250 },
    tripsPerTraveler: { min: 1, max: 60, step: 1, default: 6 },
    adminHoursPerTrip: { min: 0.25, max: 20, step: 0.25, default: 3.5 },
    loadedHourlyCost: { min: 10, max: 500, step: 5, default: 65 },
    toolCount: { min: 1, max: 15, step: 1, default: 6 },
    unmanagedSharePct: { min: 0, max: 100, step: 1, default: 35 },
} as const satisfies Record<NumericInputKey, NumericRange>

export const INPUT_LABELS: Record<NumericInputKey, { label: string; hint: string }> = {
    annualTravelSpend: { label: "Annual travel spend", hint: "Air, hotel, rail, car and ground, across the whole company." },
    travelers: { label: "Traveling employees", hint: "People who take at least one business trip a year." },
    tripsPerTraveler: { label: "Trips per traveler per year", hint: "Average across those employees." },
    adminHoursPerTrip: { label: "Admin hours per trip", hint: "Booking, approvals, receipts, reports and reconciliation combined." },
    loadedHourlyCost: { label: "Loaded hourly cost", hint: "Salary plus overhead for an hour of that admin time." },
    toolCount: { label: "Tools in your stack today", hint: "Booking, expense, card, approval, reporting and duty-of-care systems." },
    unmanagedSharePct: { label: "Spend booked outside the program (%)", hint: "Employees booking direct, on their own card, or off-platform." },
}

export const DEFAULT_INPUTS: RoiInputs = {
    currency: "USD",
    annualTravelSpend: RANGES.annualTravelSpend.default,
    travelers: RANGES.travelers.default,
    tripsPerTraveler: RANGES.tripsPerTraveler.default,
    adminHoursPerTrip: RANGES.adminHoursPerTrip.default,
    loadedHourlyCost: RANGES.loadedHourlyCost.default,
    toolCount: RANGES.toolCount.default,
    unmanagedSharePct: RANGES.unmanagedSharePct.default,
}

export type RoiAssumptions = {
    savingsRateLow: number
    savingsRateHigh: number
    addressableSpendShare: number
    existingDiscountOnManaged: number
    adoptionRate: number
    adminTimeEliminated: number
    visibilityCapture: number
    toolSeatCostPerYear: number
    toolAdminHoursPerToolPerYear: number
    hoursPerFteYear: number
}

export const DEFAULT_ASSUMPTIONS: RoiAssumptions = {
    savingsRateLow: 0.20,
    savingsRateHigh: 0.30,
    addressableSpendShare: 0.75,
    existingDiscountOnManaged: 0.10,
    adoptionRate: 0.80,
    adminTimeEliminated: 0.70,
    visibilityCapture: 0.85,
    toolSeatCostPerYear: 36,
    toolAdminHoursPerToolPerYear: 60,
    hoursPerFteYear: 1_800,
}

// Rendered into a visible table on the page, so the model can never disagree
// with what it tells the reader it assumes.
export const ASSUMPTION_NOTES: Record<keyof RoiAssumptions, { label: string; format: "pct" | "money" | "hours" | "number"; why: string }> = {
    savingsRateLow: { label: "Fare saving, low", format: "pct", why: "Miraee's published band against comparable published fares." },
    savingsRateHigh: { label: "Fare saving, high", format: "pct", why: "The upper end of the same published band." },
    addressableSpendShare: { label: "Spend the band applies to", format: "pct", why: "The band prices fares. Ground transport, meals and incidentals sit in the same T&E line but are not priced against published fares." },
    existingDiscountOnManaged: { label: "Discount already on managed spend", format: "pct", why: "Spend inside a program already carries a negotiated discount, so only the incremental delta is new saving." },
    adoptionRate: { label: "Trips routed through Miraee", format: "pct", why: "Not every trip moves onto the platform in a first steady-state year." },
    adminTimeEliminated: { label: "Admin time removed", format: "pct", why: "Deliberately below the published 97% agent-managed figure: journey automation and human admin hours are different measures." },
    visibilityCapture: { label: "Off-program spend recovered", format: "pct", why: "Some employee-booked spend stays outside any system." },
    toolSeatCostPerYear: { label: "Seat cost per replaced tool", format: "money", why: "Per traveler, per year, for each tool the platform replaces." },
    toolAdminHoursPerToolPerYear: { label: "Admin hours per replaced tool", format: "hours", why: "Vendor management, SSO upkeep and cross-system reconciliation." },
    hoursPerFteYear: { label: "Hours in one FTE year", format: "number", why: "Used only to restate reclaimed hours as headcount." },
}

// The canonical savings footnote. Exported so the calculator and the Platform
// page can never drift apart. Matches ProductV2.tsx's definition verbatim.
export const SAVINGS_FOOTNOTE = "Based on itineraries booked, compared with publicly available fares for the same route, travel date, cabin, and booking window. Individual results may vary by route, lead time, and travel mix."

export type RoiResult = {
    trips: number
    fareSavingsLow: number
    fareSavingsHigh: number
    adminHoursReclaimed: number
    adminCostReclaimed: number
    fteEquivalent: number
    spendBroughtUnderManagement: number
    toolsReplaced: number
    toolConsolidationSaving: number
    totalLow: number
    totalHigh: number
}

export function computeRoi(inputs: RoiInputs, a: RoiAssumptions = DEFAULT_ASSUMPTIONS): RoiResult {
    const trips = inputs.travelers * inputs.tripsPerTraveler

    const addressableSpend = inputs.annualTravelSpend * a.addressableSpendShare * a.adoptionRate
    const addressableUnmanaged = addressableSpend * (inputs.unmanagedSharePct / 100)
    const addressableManaged = addressableSpend - addressableUnmanaged

    // Unmanaged spend pays published fare, so it earns the full band. Managed
    // spend already carries a discount, so it earns only what is left above it.
    const fareSavingsLow =
        addressableUnmanaged * a.savingsRateLow +
        addressableManaged * Math.max(0, a.savingsRateLow - a.existingDiscountOnManaged)
    const fareSavingsHigh =
        addressableUnmanaged * a.savingsRateHigh +
        addressableManaged * Math.max(0, a.savingsRateHigh - a.existingDiscountOnManaged)

    const adminHoursReclaimed = trips * inputs.adminHoursPerTrip * a.adminTimeEliminated * a.adoptionRate
    const adminCostReclaimed = adminHoursReclaimed * inputs.loadedHourlyCost
    const fteEquivalent = adminHoursReclaimed / a.hoursPerFteYear

    // Reported for visibility only. NOT added to the total: these dollars are
    // already inside addressableUnmanaged above, where they earn the full band.
    const spendBroughtUnderManagement = inputs.annualTravelSpend * (inputs.unmanagedSharePct / 100) * a.visibilityCapture

    const toolsReplaced = Math.max(0, inputs.toolCount - 1)
    const toolConsolidationSaving =
        toolsReplaced * inputs.travelers * a.toolSeatCostPerYear +
        toolsReplaced * a.toolAdminHoursPerToolPerYear * inputs.loadedHourlyCost

    return {
        trips,
        fareSavingsLow, fareSavingsHigh,
        adminHoursReclaimed, adminCostReclaimed, fteEquivalent,
        spendBroughtUnderManagement,
        toolsReplaced, toolConsolidationSaving,
        totalLow: fareSavingsLow + adminCostReclaimed + toolConsolidationSaving,
        totalHigh: fareSavingsHigh + adminCostReclaimed + toolConsolidationSaving,
    }
}

export function clampToRange(value: number, range: NumericRange): number {
    if (!Number.isFinite(value)) return range.default
    return Math.min(range.max, Math.max(range.min, value))
}

// Three significant figures. The inputs are sliders, so rendering $1,247,318
// would be false precision; $1,250,000 is honest about what the model knows.
export function roundToSigFigs(value: number, figures = 3): number {
    if (!Number.isFinite(value) || value === 0) return 0
    const magnitude = Math.ceil(Math.log10(Math.abs(value)))
    const factor = Math.pow(10, figures - magnitude)
    return Math.round(value * factor) / factor
}
