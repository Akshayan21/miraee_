import { useMemo, useState } from "react"
import { V4Page, V4Hero, V4Cta, Reveal, MiniTable, Faq } from "../../components/V4Kit"
import type { CSSProperties, ReactNode } from "react"
import {
    DEFAULT_ASSUMPTIONS, DEFAULT_INPUTS, INPUT_LABELS, LOCALE, RANGES,
    SAVINGS_FOOTNOTE, ASSUMPTION_NOTES, clampToRange, computeRoi, roundToSigFigs,
} from "../../lib/roi"
import type { Currency, NumericInputKey, RoiAssumptions, RoiInputs } from "../../lib/roi"
import "../SubpagesV2.css"
import "./V4.css"

const CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "INR", "SGD"]
const NUMERIC_KEYS = Object.keys(RANGES) as NumericInputKey[]

// A coupled slider + number box. The number box is `type="text"` with a numeric
// inputMode rather than `type="number"`: the latter mutates on scroll-wheel and
// cannot render thousands separators.
//
// Clamping happens on BLUR, not on change. Clamping every keystroke against a
// 50,000 minimum makes it impossible to type "5000000" — you get stuck on the
// first digit.
function NumberField({ id, value, range, label, hint, format, onChange }: {
    id: string
    value: number
    range: typeof RANGES[NumericInputKey]
    label: string
    hint: string
    format: (value: number) => string
    onChange: (value: number) => void
}) {
    const [raw, setRaw] = useState<string | null>(null)
    const pct = ((clampToRange(value, range) - range.min) / (range.max - range.min)) * 100

    return (
        <div className="v4-field">
            <label className="v4-field__label" htmlFor={id} id={`${id}-label`}>{label}</label>
            <div className="v4-field__row">
                <input
                    id={id}
                    className="v4-field__input"
                    type="text"
                    inputMode="decimal"
                    value={raw ?? format(value)}
                    onFocus={() => setRaw(String(value))}
                    onChange={event => {
                        const next = event.target.value
                        setRaw(next)
                        const parsed = Number(next.replace(/[^0-9.]/g, ""))
                        if (next !== "" && Number.isFinite(parsed)) onChange(parsed)
                    }}
                    onBlur={() => { setRaw(null); onChange(clampToRange(value, range)) }} />
                <input
                    className="v4-field__slider"
                    type="range"
                    min={range.min}
                    max={range.max}
                    step={range.step}
                    value={clampToRange(value, range)}
                    style={{ "--v4-range-pct": `${pct}%` } as CSSProperties}
                    aria-labelledby={`${id}-label`}
                    aria-valuetext={format(value)}
                    onChange={event => onChange(Number(event.target.value))} />
            </div>
            <p className="v4-field__hint">{hint}</p>
        </div>
    )
}

const FAQS: [string, ReactNode][] = [
    ["Where does 20 to 30% come from?", `It is Miraee's published savings band against comparable published fares, achieved through wholesale rates and direct supplier connections. ${SAVINGS_FOOTNOTE}`],
    ["Why does the band only apply to 75% of spend?", "The band prices fares: air, hotel, rail and car. Ground transport, meals and incidentals sit in the same T&E line but are not priced against published fares, so applying the band to all of your spend would overstate the result."],
    ["Why 70% admin time removed, and not the 97% you publish elsewhere?", "They measure different things. 97% describes how much of the journey the agent manages; this figure describes human admin hours removed from your team. Borrowing the higher number would be a category error, so the model uses the more conservative one."],
    ["Why isn't spend brought under management added to the total?", "Because it is already counted. Off-program spend pays published fare, so it earns the full 20 to 30% inside the fare-savings figure. Adding it a second time as its own line would inflate the headline by roughly 4 to 5% of your annual spend."],
    ["Does this include Miraee's subscription cost?", "No. Pricing is agreed per program, so the total is a gross figure before any Miraee cost. We would rather show you a number you can check than guess at one and call it net."],
]

export default function V4Calculator() {
    const [inputs, setInputs] = useState<RoiInputs>(DEFAULT_INPUTS)
    const [assumptions, setAssumptions] = useState<RoiAssumptions>(DEFAULT_ASSUMPTIONS)
    const [showAssumptions, setShowAssumptions] = useState(false)

    const result = useMemo(() => computeRoi(inputs, assumptions), [inputs, assumptions])
    const isCustom = useMemo(
        () => (Object.keys(DEFAULT_ASSUMPTIONS) as (keyof RoiAssumptions)[]).some(key => assumptions[key] !== DEFAULT_ASSUMPTIONS[key]),
        [assumptions],
    )

    // Rebuilt only when the currency changes — constructing Intl formatters on
    // every keystroke is measurable on low-end hardware.
    const fmt = useMemo(() => {
        const locale = LOCALE[inputs.currency]
        const money = new Intl.NumberFormat(locale, { style: "currency", currency: inputs.currency, maximumFractionDigits: 0 })
        const plain = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 })
        return {
            money: (value: number) => money.format(roundToSigFigs(value)),
            moneyExact: (value: number) => money.format(Math.round(value)),
            number: (value: number) => plain.format(value),
        }
    }, [inputs.currency])

    const fieldFormat = (key: NumericInputKey) => (value: number) =>
        key === "annualTravelSpend" || key === "loadedHourlyCost" ? fmt.moneyExact(value) : fmt.number(value)

    // Composition of the headline total, at the midpoint of the fare-savings
    // range -- the three numbers sum exactly to totalLow/totalHigh (see
    // computeRoi in roi.ts), so this bar is a literal picture of the total,
    // not an illustrative one.
    const fareMid = (result.fareSavingsLow + result.fareSavingsHigh) / 2
    const totalMid = fareMid + result.adminCostReclaimed + result.toolConsolidationSaving
    const composition = totalMid > 0 ? [
        { key: "fare", label: "Fare savings", value: fareMid, share: fareMid / totalMid },
        { key: "admin", label: "Admin time reclaimed", value: result.adminCostReclaimed, share: result.adminCostReclaimed / totalMid },
        { key: "tools", label: "Tool consolidation", value: result.toolConsolidationSaving, share: result.toolConsolidationSaving / totalMid },
    ] : []

    const assumptionRows = (Object.keys(ASSUMPTION_NOTES) as (keyof RoiAssumptions)[]).map(key => {
        const note = ASSUMPTION_NOTES[key]
        const value = assumptions[key]
        const display = note.format === "pct" ? `${Math.round(value * 100)}%`
            : note.format === "money" ? fmt.moneyExact(value)
                : note.format === "hours" ? `${fmt.number(value)} h`
                    : fmt.number(value)
        return [note.label, display, note.why]
    })

    return (
        <V4Page
            title="Travel ROI & Savings Calculator | Miraee"
            description="Model projected fare savings, admin hours reclaimed, off-program spend and tool consolidation against your own travel numbers. Every assumption is shown and editable.">

            <V4Hero
                eyebrow="Calculator"
                title={<>Put numbers to <em>the opportunity.</em></>}
                lede="Your spend, your travelers, your current stack. Every assumption behind the result is shown on this page and can be changed." />

            <section className="v4-section" id="calculator" aria-labelledby="calc-title">
                <div className="v4-shell">
                    <h2 className="v4-h2" id="calc-title">Your numbers.</h2>

                    <div className="v4-calc">
                        <div className="v4-calc__inputs">
                            <div className="v4-field">
                                <label className="v4-field__label" htmlFor="currency">Currency</label>
                                <select id="currency" className="v4-field__input" value={inputs.currency}
                                    onChange={event => setInputs(prev => ({ ...prev, currency: event.target.value as Currency }))}>
                                    {CURRENCIES.map(code => <option key={code} value={code}>{code}</option>)}
                                </select>
                                <p className="v4-field__hint">Changes the symbol and number format only. No conversion is applied.</p>
                            </div>

                            {NUMERIC_KEYS.map(key => (
                                <NumberField
                                    key={key}
                                    id={key}
                                    value={inputs[key]}
                                    range={RANGES[key]}
                                    label={INPUT_LABELS[key].label}
                                    hint={INPUT_LABELS[key].hint}
                                    format={fieldFormat(key)}
                                    onChange={value => setInputs(prev => ({ ...prev, [key]: value }))} />
                            ))}

                            <button type="button" className="v4-btn v4-btn--ghost" onClick={() => { setInputs(DEFAULT_INPUTS); setAssumptions(DEFAULT_ASSUMPTIONS) }}>
                                Reset to defaults
                            </button>
                        </div>

                        <div className="v4-calc__results">
                            <div className="v4-calc__headline">
                                {isCustom && <span className="v4-calc__badge">Custom assumptions</span>}
                                <span className="v4-eyebrow">Projected annual return</span>
                                <strong>{fmt.money(result.totalLow)} to {fmt.money(result.totalHigh)}</strong>
                                <p className="v4-calc__qualifier">Gross, before any Miraee subscription cost.</p>

                                {composition.length > 0 && (
                                    <div className="v4-calc__chart" role="img"
                                        aria-label={`Return composition: ${composition.map(c => `${c.label} ${Math.round(c.share * 100)}%`).join(", ")}`}>
                                        <div className="v4-calc__chart-bar">
                                            {composition.map(c => (
                                                <span key={c.key} className={`v4-calc__chart-seg v4-calc__chart-seg--${c.key}`}
                                                    style={{ width: `${c.share * 100}%` }} />
                                            ))}
                                        </div>
                                        <ul className="v4-calc__chart-legend">
                                            {composition.map(c => (
                                                <li key={c.key}>
                                                    <i className={`v4-calc__chart-dot v4-calc__chart-seg--${c.key}`} aria-hidden="true" />
                                                    {c.label} <b>{fmt.money(c.value)}</b> · {Math.round(c.share * 100)}%
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <p className="v4-calc__disclaimer">
                                Illustrative model, not a quote, offer, or guarantee of savings. These figures are projections generated from the inputs and assumptions on this page, not from your travel data. Actual results vary by route mix, lead time, policy, supplier agreements and adoption. Not financial, tax or accounting advice.
                            </p>

                            <div className="v4-calc__grid">
                                <div className="v4-calc__tile">
                                    <span className="v4-eyebrow">Fare savings</span>
                                    <strong>{fmt.money(result.fareSavingsLow)} to {fmt.money(result.fareSavingsHigh)}</strong>
                                    {result.fareSavingsHigh > 0 && (
                                        <div className="v4-calc__range" aria-hidden="true">
                                            <span className="v4-calc__range-band" style={{
                                                left: `${(result.fareSavingsLow / result.fareSavingsHigh) * 100}%`,
                                                right: 0,
                                            }} />
                                        </div>
                                    )}
                                    <small>Assumes {Math.round(assumptions.adoptionRate * 100)}% adoption of the {Math.round(assumptions.addressableSpendShare * 100)}% of spend priced against published fares.</small>
                                </div>
                                <div className="v4-calc__tile">
                                    <span className="v4-eyebrow">Admin time reclaimed</span>
                                    <strong>{fmt.money(result.adminCostReclaimed)}</strong>
                                    <small>{fmt.number(Math.round(result.adminHoursReclaimed))} hours across {fmt.number(result.trips)} trips, about {result.fteEquivalent.toFixed(1)} FTE.</small>
                                </div>
                                <div className="v4-calc__tile">
                                    <span className="v4-eyebrow">Tool consolidation</span>
                                    <strong>{fmt.money(result.toolConsolidationSaving)}</strong>
                                    <small>{result.toolsReplaced} {result.toolsReplaced === 1 ? "tool" : "tools"} replaced by one platform.</small>
                                </div>
                                <div className="v4-calc__tile v4-calc__tile--muted">
                                    <span className="v4-eyebrow">Spend brought under management</span>
                                    <strong>{fmt.money(result.spendBroughtUnderManagement)}</strong>
                                    <small><b>Visibility, not an additional saving.</b> These dollars are already counted in the fare-savings figure above, so they are deliberately excluded from the total.</small>
                                </div>
                            </div>

                            <p className="v4-foot-note">*{SAVINGS_FOOTNOTE}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="v4-section v4-section--tint" id="methodology" aria-labelledby="method-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Methodology</span>
                        <h2 className="v4-h2" id="method-title">Every assumption, in the open.</h2>
                        <p className="v4-lede">Change any of these and the result changes with it. Deviate from the defaults and the result is badged so a screenshot can never be mistaken for a Miraee figure.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 28 }}>
                            <MiniTable headers={["Assumption", "Value", "Why this number"]} rows={assumptionRows} caption="Model assumptions" />
                        </div>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div style={{ marginTop: 24 }}>
                            <button type="button" className="v4-btn v4-btn--ghost" aria-expanded={showAssumptions} onClick={() => setShowAssumptions(open => !open)}>
                                {showAssumptions ? "Hide" : "Adjust"} assumptions
                            </button>
                            {showAssumptions && (
                                <div className="v4-calc__adjust">
                                    {(["savingsRateLow", "savingsRateHigh", "addressableSpendShare", "existingDiscountOnManaged", "adoptionRate", "adminTimeEliminated", "visibilityCapture"] as const).map(key => (
                                        <div className="v4-field" key={key}>
                                            <label className="v4-field__label" htmlFor={`a-${key}`} id={`a-${key}-label`}>
                                                {ASSUMPTION_NOTES[key].label}: {Math.round(assumptions[key] * 100)}%
                                            </label>
                                            <input
                                                id={`a-${key}`}
                                                className="v4-field__slider"
                                                type="range" min={0} max={100} step={1}
                                                value={Math.round(assumptions[key] * 100)}
                                                style={{ "--v4-range-pct": `${Math.round(assumptions[key] * 100)}%` } as CSSProperties}
                                                aria-valuetext={`${Math.round(assumptions[key] * 100)} percent`}
                                                onChange={event => setAssumptions(prev => ({ ...prev, [key]: Number(event.target.value) / 100 }))} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="v4-section" id="how-we-built-this" aria-labelledby="built-title">
                <div className="v4-shell">
                    <Reveal><h2 className="v4-h2" id="built-title">How we built this.</h2></Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 28 }}><Faq items={FAQS} /></div>
                    </Reveal>
                </div>
            </section>

            <V4Cta title="Run it on your real numbers." body="Bring your policy, your routes and last year's spend. Twenty minutes." />
        </V4Page>
    )
}
