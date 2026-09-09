import { motion, AnimatePresence, useInView } from "framer-motion"
import travelerImg from "../assets/miraee-traveler-hero.webp"
import { useRef, useState } from "react"
import { EO } from "../animations/easings"
import { submitForm } from "../lib/formSubmission"
import { T, F, FH, SiteNav, SiteFooter, SectionHead, TICKET_ENDPOINT, useVW } from "../components/LegalFormKit"
import { usePageMeta } from "../hooks/usePageMeta"

const inputBase: React.CSSProperties = {
    width: "100%", boxSizing: "border-box", background: T.card, border: "1.5px solid " + T.border,
    borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: F, color: T.ink, outline: "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
}
const labelStyle: React.CSSProperties = { fontSize: 13, fontFamily: F, fontWeight: 600, color: T.ink, marginBottom: 7, display: "block" }

function Field({ label, required, children, htmlFor, group = false }: { label: string; required?: boolean; children: React.ReactNode; htmlFor?: string; group?: boolean }) {
    if (group) return <fieldset style={{ border: 0, padding: 0, margin: 0 }}><legend style={labelStyle}>{label}{required ? <span style={{ color: T.orange }}> *</span> : null}</legend>{children}</fieldset>
    return (
        <div>
            <label htmlFor={htmlFor} style={labelStyle}>{label}{required ? <span style={{ color: T.orange }}> *</span> : null}</label>
            {children}
        </div>
    )
}

function FieldError({ message }: { message: string }) {
    return <span style={{ display: "block", fontSize: 12, fontFamily: F, color: "#C0392B", marginTop: 6 }}>{message}</span>
}

function TextInput({ placeholder, type = "text", required, name }: { placeholder: string; type?: string; required?: boolean; name?: string }) {
    const [focus, setFocus] = useState(false)
    const [invalid, setInvalid] = useState("")
    return (
        <div>
            <input id={name} type={type} name={name} placeholder={placeholder} required={required} autoComplete={name === "fullName" ? "name" : name === "email" ? "email" : name === "phone" ? "tel" : name === "company" ? "organization" : undefined}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onInvalid={e => { e.preventDefault(); setInvalid(e.currentTarget.validationMessage) }}
                onChange={e => invalid && setInvalid(e.currentTarget.checkValidity() ? "" : invalid)}
                aria-invalid={invalid ? true : undefined}
                style={{ ...inputBase, borderColor: invalid ? "#C0392B" : focus ? T.orange : T.border, boxShadow: focus ? "0 0 0 3px rgba(229,86,2,0.12)" : "none" }} />
            {invalid && <FieldError message={invalid} />}
        </div>
    )
}

function TextArea({ placeholder, required, rows = 4, name }: { placeholder: string; required?: boolean; rows?: number; name?: string }) {
    const [focus, setFocus] = useState(false)
    const [invalid, setInvalid] = useState("")
    return (
        <div>
            <textarea id={name} placeholder={placeholder} name={name} required={required} rows={rows}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onInvalid={e => { e.preventDefault(); setInvalid(e.currentTarget.validationMessage) }}
                onChange={e => invalid && setInvalid(e.currentTarget.checkValidity() ? "" : invalid)}
                aria-invalid={invalid ? true : undefined}
                style={{ ...inputBase, resize: "vertical", minHeight: 96, borderColor: invalid ? "#C0392B" : focus ? T.orange : T.border, boxShadow: focus ? "0 0 0 3px rgba(229,86,2,0.12)" : "none" }} />
            {invalid && <FieldError message={invalid} />}
        </div>
    )
}

function Select({ options, value, onChange, required, name, placeholder }: { options: string[]; value: string; onChange: (v: string) => void; required?: boolean; name?: string; placeholder?: string }) {
    const [focus, setFocus] = useState(false)
    const [invalid, setInvalid] = useState("")
    return (
        <div>
            <select id={name} value={value} name={name} required={required}
                onChange={e => { onChange(e.target.value); if (invalid) setInvalid("") }}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onInvalid={e => { e.preventDefault(); setInvalid(e.currentTarget.validationMessage) }}
                aria-invalid={invalid ? true : undefined}
                style={{ ...inputBase, appearance: "auto" as const, cursor: "pointer", borderColor: invalid ? "#C0392B" : focus ? T.orange : T.border, boxShadow: focus ? "0 0 0 3px rgba(229,86,2,0.12)" : "none" }}>
                {placeholder && <option value="" disabled>{placeholder}</option>}
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            {invalid && <FieldError message={invalid} />}
        </div>
    )
}

const SIZES =["1-50", "51-200", "201-1,000", "1,001-5,000", "5,000+"]
const ROLES_LIST = ["Finance / CFO office", "HR / People", "Travel manager", "Procurement", "IT / Security", "Founder / Executive", "Other"]
const SPENDS = ["Under $100K", "$100K - $500K", "$500K - $2M", "$2M - $10M", "$10M+", "Not sure yet"]
const INTERESTS = ["Business travel", "Expenses", "Experiences", "Airline partnership", "The whole platform"]

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function MiraeeDemoPage(props: { style?: React.CSSProperties }) {
    usePageMeta("Book a Miraee Demo - Bring a Real Trip", "See Miraee handle a real company trip, policy and edge cases in a focused 20-minute walkthrough.")
    const vw = useVW()
    const isNarrow = vw < 1200
    const [companySize, setCompanySize] = useState(SIZES[1])
    const [role, setRole] = useState("")
    const [spend, setSpend] = useState(SPENDS[5])
    const [interest, setInterest] = useState(INTERESTS[4])
    const [sent, setSent] = useState(false)
    const [sending, setSending] = useState(false)
    const [sendError, setSendError] = useState(false)
    const [imgHov, setImgHov] = useState(false)
    const mediaRef = useRef<HTMLDivElement>(null)
    const mediaInView = useInView(mediaRef, { once: true, margin: "-8% 0px" })
    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (sending) return
        setSending(true)
        setSendError(false)
        const fd = new FormData(e.currentTarget as HTMLFormElement)
        const payload: Record<string, string> = { formType: "Book a Demo" }
        fd.forEach((v, k) => { if (typeof v === "string") payload[k] = v })
        payload.companySize = companySize
        payload.role = role
        payload.spend = spend
        payload.interest = interest
        try {
            await submitForm(TICKET_ENDPOINT, payload)
            setSent(true)
        } catch {
            setSendError(true)
        } finally {
            setSending(false)
        }
    }
    return (
        <div className="form-page form-page--demo" style={{ position: "relative", width: "100%", minHeight: "100dvh", background: T.bg, fontFamily: F, ...props.style }}>
            <a className="legacy-skip" href="#main">Skip to content</a>
            <SiteNav />
            <main id="main">
            <div style={{ maxWidth: 1440, margin: "0 auto", padding: isNarrow ? "100px 20px 64px" : "116px 48px 72px" }}>
                <div style={{ display: "flex", flexDirection: isNarrow ? "column" : "row", gap: isNarrow ? 48 : 72, alignItems: "flex-start" }}>
                    {/* Form column */}
                    <div style={{ flex: "0 0 auto", width: isNarrow ? "100%" : 500, maxWidth: "100%" }}>
                        <AnimatePresence mode="wait">
                        {sent ? (
                            <motion.div key="done" role="status" initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: EO }}
                                style={{ textAlign: "center", padding: "80px 24px" }}>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                                    style={{ width: 64, height: 64, borderRadius: "50%", background: "#3BA55D", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                </motion.div>
                                <h2 style={{ fontFamily: FH, fontSize: 26, fontWeight: 800, color: T.ink, margin: "0 0 10px" }}>Request received.</h2>
                                <p style={{ fontSize: 15, fontFamily: F, lineHeight: 1.65, color: T.muted, margin: "0 0 28px" }}>Our team will reach out within one business day to schedule your 20-minute walkthrough.</p>
                                <motion.button onClick={() => setSent(false)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} style={{ background: "transparent", border: "1.5px solid " + T.border, borderRadius: 12, padding: "12px 24px", fontSize: 14, fontFamily: F, fontWeight: 600, color: T.ink, cursor: "pointer" }}>Back to the form</motion.button>
                            </motion.div>
                        ) : (
                            <motion.form key="form" onSubmit={submit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: EO }}
                                style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                <h1 style={{ fontFamily: FH, fontSize: isNarrow ? 26 : 30, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", color: T.ink, margin: "0 0 4px" }}>
                                    Experience Miraee<br />across your travel program.
                                </h1>
                                <p style={{ fontSize: 15, fontFamily: F, lineHeight: 1.65, color: T.muted, margin: "0 0 8px" }}>20 minutes, your real trip. No slides. No generic walkthroughs.</p>
                                <SectionHead title="About you" />
                                <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 14 }}>
                                    <Field label="Full name" htmlFor="fullName" required><TextInput name="fullName" placeholder="Your full name" required /></Field>
                                    <Field label="Work email" htmlFor="email" required><TextInput name="email" type="email" placeholder="you@company.com" required /></Field>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 14 }}>
                                    <Field label="Phone number" htmlFor="phone"><TextInput name="phone" type="tel" placeholder="+1 (555) 000-0000" /></Field>
                                    <Field label="Your role" htmlFor="role" required><Select name="role" options={ROLES_LIST} value={role} onChange={setRole} required placeholder="Select your role" /></Field>
                                </div>
                                <SectionHead title="About your company" />
                                <Field label="Company name" htmlFor="company" required><TextInput name="company" placeholder="Your company" required /></Field>
                                <details style={{ borderTop: "1px solid " + T.border, paddingTop: 14 }}>
                                <summary style={{ cursor: "pointer", fontSize: 13, fontFamily: F, fontWeight: 700, color: T.ink, padding: "6px 0 14px" }}>Add company and meeting context <span style={{ color: T.muted, fontWeight: 500 }}>(optional)</span></summary>
                                <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingTop: 4 }}>
                                <Field label="Company size" group>
                                    <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: 8 }}>
                                        {SIZES.map(s => (
                                            <motion.button key={s} type="button" aria-pressed={companySize === s} onClick={() => setCompanySize(s)} whileTap={{ scale: 0.95 }} whileFocus={{ boxShadow: "0 0 0 3px rgba(229,86,2,0.25)" }}
                                                animate={{ background: companySize === s ? T.accent : T.card, color: companySize === s ? T.cream : T.ink, borderColor: companySize === s ? "transparent" : "rgba(var(--text-rgb),0.10)" }}
                                                transition={{ duration: 0.25 }}
                                                style={{ border: "1.5px solid", borderRadius: 12, padding: "10px 0", fontSize: 12.5, fontFamily: F, fontWeight: 700, cursor: "pointer", textAlign: "center" as const, outline: "none" }}>
                                                {s}
                                            </motion.button>
                                        ))}
                                    </div>
                                </Field>
                                <Field label="Annual travel spend" htmlFor="spend"><Select name="spend" options={SPENDS} value={spend} onChange={setSpend} /></Field>
                                <SectionHead title="What should we focus on?" />
                                <Field label="Main interest" group>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                        {INTERESTS.map(it => (
                                            <motion.button key={it} type="button" aria-pressed={interest === it} onClick={() => setInterest(it)} whileTap={{ scale: 0.95 }} whileFocus={{ boxShadow: "0 0 0 3px rgba(229,86,2,0.25)" }}
                                                animate={{ background: interest === it ? T.accent : T.card, color: interest === it ? T.cream : T.ink, borderColor: interest === it ? T.accent : "rgba(var(--text-rgb),0.10)" }}
                                                transition={{ duration: 0.25 }}
                                                style={{ border: "1.5px solid", borderRadius: 100, padding: "8px 16px", fontSize: 13, fontFamily: F, fontWeight: 600, cursor: "pointer", outline: "none" }}>
                                                {it}
                                            </motion.button>
                                        ))}
                                    </div>
                                </Field>
                                <Field label="Anything else we should know?" htmlFor="notes"><TextArea name="notes" placeholder="Current tools, pain points, timelines, or specific questions." rows={3} /></Field>
                                </div></details>
                                <p style={{ fontSize: 12.5, fontFamily: F, color: T.muted, textAlign: "center" as const, margin: "8px 0 0", lineHeight: 1.6 }}>
                                    By clicking "Book my demo" you agree to our{" "}
                                    <a href="/privacy" style={{ color: T.ink, fontWeight: 600, textDecoration: "underline" }}>Privacy Policy</a>
                                    {" "}and{" "}
                                    <a href="/terms" style={{ color: T.ink, fontWeight: 600, textDecoration: "underline" }}>Terms & Conditions</a>.
                                </p>
                                <motion.button type="submit" disabled={sending} whileHover={{ scale: sending ? 1 : 1.02, boxShadow: sending ? "none" : "0 12px 32px rgba(229,86,2,0.28)" }} whileTap={{ scale: 0.97 }}
                                    style={{ width: "100%", background: sending ? "rgba(var(--text-rgb),0.12)" : T.accent, color: sending ? T.muted : T.cream, border: "none", borderRadius: 12, padding: "15px 0", fontSize: 15, fontFamily: F, fontWeight: 700, cursor: sending ? "not-allowed" : "pointer", marginTop: 8, transition: "background 0.2s" }}>
                                    {sending ? "Sending…" : "Book my demo"}
                                </motion.button>
                                {sendError && (
                                    <p role="alert" style={{ fontSize: 13, fontFamily: F, color: "#C0392B", textAlign: "center" as const, margin: "4px 0 0", fontWeight: 600 }}>
                                        Could not submit right now. Try again, or email <a href="mailto:hello@miraee.ai" style={{ color: "#C0392B" }}>hello@miraee.ai</a> directly.
                                    </p>
                                )}
                                <p style={{ fontSize: 13, fontFamily: F, color: T.muted, textAlign: "center" as const, margin: 0 }}>
                                    Prefer email? <a href="mailto:hello@miraee.ai" style={{ color: T.ink, fontWeight: 600 }}>hello@miraee.ai</a>
                                </p>
                            </motion.form>
                        )}
                        </AnimatePresence>
                    </div>
                    {/* Media column (sticky on desktop) */}
                    <div style={{ flex: 1, minWidth: 0, position: isNarrow ? "relative" : "sticky", top: isNarrow ? undefined : 92, alignSelf: "flex-start" }}>
                        <div ref={mediaRef} style={{ position: "relative", height: isNarrow ? 420 : "calc(100dvh - 124px)", minHeight: 420 }}>
                            <motion.div initial={{ clipPath: "inset(0% 0% 100% 0%)" }} animate={mediaInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}} transition={{ duration: 1.1, ease: EO }}
                                onMouseEnter={() => setImgHov(true)} onMouseLeave={() => setImgHov(false)}
                                style={{ position: "absolute", inset: 0, borderRadius: isNarrow ? "22px 22px 48px 22px" : "40px 40px 120px 40px", overflow: "hidden", willChange: "clip-path" }}>
                                <motion.img src={travelerImg} alt="Business traveler moving through an airport lounge"
                                    initial={{ scale: 1.18 }} animate={mediaInView ? { scale: imgHov ? 1.05 : 1 } : {}} transition={{ duration: 1.1, ease: EO }}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.22) 45%, transparent 65%)" }} />
                                <motion.div initial={{ opacity: 0, y: 14 }} animate={mediaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7, ease: EO }}
                                    style={{ position: "absolute", top: 28, left: 28, display: "flex", alignItems: "center", gap: 9, background: "rgba(0,0,0,0.52)", backdropFilter: "blur(10px)", borderRadius: 100, padding: "9px 16px" }}>
                                    <motion.span animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: "50%", background: "#3BA55D" }} />
                                    <span style={{ fontSize: 12.5, fontFamily: F, fontWeight: 700, color: "#fff" }}>Live demo</span>
                                    <span style={{ fontSize: 12.5, fontFamily: F, color: "rgba(255,255,255,0.65)" }}>20 minutes</span>
                                </motion.div>
                                <div style={{ position: "absolute", left: isNarrow ? 24 : 40, right: isNarrow ? 24 : 40, bottom: isNarrow ? 24 : 36 }}>
                                    <motion.p initial={{ opacity: 0, y: 22 }} animate={mediaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: EO }}
                                        style={{ fontFamily: F, fontStyle: "italic", fontWeight: 500, fontSize: isNarrow ? 22 : "clamp(1.6rem,2.4vw,2.3rem)", lineHeight: 1.3, color: "#fff", margin: "0 0 22px", letterSpacing: "-0.01em" }}>
                                        Your travel program,<br />run by an agent.
                                    </motion.p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                        {["Your trip, your use cases", "Pilot live in 90 days"].map((chip, i) => (
                                            <motion.div key={chip} initial={{ opacity: 0, y: 14 }} animate={mediaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.75 + i * 0.12, ease: EO }}
                                                style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(10px)", borderRadius: 12, padding: "10px 16px", fontSize: 12.5, fontFamily: F, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                                                {chip}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            </main>
            <SiteFooter />
        </div>
    )
}
