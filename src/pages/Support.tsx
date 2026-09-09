import { motion, AnimatePresence, useInView } from "framer-motion"
import teamImg from "../assets/miraee-team.webp"
import { useRef, useState } from "react"
import { EO } from "../animations/easings"
import { filesToAttachments, submitForm, validateAttachments } from "../lib/formSubmission"
import { usePageMeta } from "../hooks/usePageMeta"
import {
    T, F, FH, SiteNav, SiteFooter, Field, TextInput, TextArea, Select, SectionHead,
    TICKET_ENDPOINT, useVW,
} from "../components/LegalFormKit"

function Seg({ options, value, onChange, hot }: { options: string[]; value: string; onChange: (v: string) => void; hot?: string }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${options.length}, 1fr)`, gap: 8 }}>
            {options.map(o => (
                <motion.button key={o} type="button" onClick={() => onChange(o)} whileTap={{ scale: 0.95 }} whileFocus={{ boxShadow: "0 0 0 3px rgba(229,86,2,0.25)" }}
                    animate={{ background: value === o ? (o === hot ? T.orange : T.accent) : T.card, color: value === o ? T.cream : T.ink, borderColor: value === o ? "transparent" : "rgba(var(--text-rgb),0.10)" }}
                    transition={{ duration: 0.25 }}
                    style={{ border: "1.5px solid", borderRadius: 12, padding: "10px 0", fontSize: 13, fontFamily: F, fontWeight: 700, cursor: "pointer", textAlign: "center" as const, outline: "none" }}>
                    {o}
                </motion.button>
            ))}
        </div>
    )
}

function Collapse({ show, children }: { show: boolean; children: React.ReactNode }) {
    return (
        <AnimatePresence initial={false}>
            {show && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ height: { duration: 0.45, ease: EO }, opacity: { duration: 0.3 } }} style={{ overflow: "hidden" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingTop: 4 }}>{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const CATEGORIES = ["Booking Issues", "Flight Changes & Cancellations", "Hotel Issues", "Transportation Issues", "Expense Management", "Payment & Billing", "Invoice & Receipts", "Approval Workflow", "Travel Policy", "Loyalty & Rewards", "AI Assistant", "Account Access", "Profile & Settings", "Integrations", "Technical Issue", "Feature Request", "General Inquiry", "Opt out of arbitration", "Resolve a Dispute informally", "Other"]
const TRAVEL_CATS = ["Booking Issues", "Flight Changes & Cancellations", "Hotel Issues", "Transportation Issues", "Loyalty & Rewards"]
const EXPENSE_CATS = ["Expense Management", "Payment & Billing", "Invoice & Receipts"]
const TECH_CATS = ["Technical Issue", "AI Assistant", "Account Access", "Integrations", "Profile & Settings"]
const CURRENCIES = ["USD", "EUR", "GBP", "INR", "AED", "SGD", "AUD", "JPY", "Other"]
/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function MiraeeSupportPage(props: { style?: React.CSSProperties }) {
    usePageMeta("Miraee Support - Raise a Travel or Expense Request", "Contact Miraee support for booking, disruption, payment, expense, account and technical help.")
    const vw = useVW()
    const isNarrow = vw < 1200
    const [formKey, setFormKey] = useState(0)
    const [category, setCategory] = useState(CATEGORIES[0])
    const [platform, setPlatform] = useState("Web")
    const [contactVia, setContactVia] = useState("Email")
    const [currency, setCurrency] = useState("USD")
    const [files, setFiles] = useState<File[]>([])
    const [fileError, setFileError] = useState<string | null>(null)
    const [sent, setSent] = useState<string | null>(null)
    const [sending, setSending] = useState(false)
    const [sendError, setSendError] = useState(false)
    const [imgHov, setImgHov] = useState(false)
    const mediaRef = useRef<HTMLDivElement>(null)
    const mediaInView = useInView(mediaRef, { once: true, margin: "-8% 0px" })
    const isTravel = TRAVEL_CATS.indexOf(category) !== -1
    const isExpense = EXPENSE_CATS.indexOf(category) !== -1
    const isTech = TECH_CATS.indexOf(category) !== -1
    const reset = () => {
        setCategory(CATEGORIES[0]); setPlatform("Web"); setContactVia("Email"); setCurrency("USD"); setFiles([]); setFileError(null); setFormKey(k => k + 1)
    }
    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (sending) return
        setSending(true)
        setSendError(false)
        const fd = new FormData(e.currentTarget as HTMLFormElement)
        const payload: Record<string, string> = {}
        fd.forEach((v, k) => { if (typeof v === "string") payload[k] = v })
        payload.category = category
        payload.platform = platform
        payload.contactVia = contactVia
        payload.currency = currency
        try {
            if (files.length > 0) {
                payload.attachments = JSON.stringify(await filesToAttachments(files))
                payload.attachedFiles = files.map(file => file.name).join(", ")
            }
            const data = await submitForm(TICKET_ENDPOINT, payload)
            if (!data.ticketId) throw new Error("The server did not return a ticket ID.")
            setSent(data.ticketId)
        } catch {
            setSendError(true)
        } finally {
            setSending(false)
        }
    }
    return (
        <div className="form-page form-page--support" style={{ position: "relative", width: "100%", minHeight: "100vh", background: T.bg, fontFamily: F, ...props.style }}>
            <a className="legacy-skip" href="#main">Skip to content</a>
            <SiteNav />
            <main id="main">
            <div style={{ maxWidth: 1440, margin: "0 auto", padding: isNarrow ? "100px 20px 64px" : "116px 48px 72px" }}>
                <div style={{ display: "flex", flexDirection: isNarrow ? "column" : "row", gap: isNarrow ? 48 : 72, alignItems: "flex-start" }}>
                    {/* Form column */}
                    <div style={{ flex: "0 0 auto", width: isNarrow ? "100%" : 500, maxWidth: "100%" }}>
                        <AnimatePresence mode="wait">
                        {sent ? (
                            <motion.div key="done" initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: EO }}
                                style={{ textAlign: "center", padding: "80px 24px" }}>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                                    style={{ width: 64, height: 64, borderRadius: "50%", background: "#3BA55D", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                </motion.div>
                                <h2 style={{ fontFamily: FH, fontSize: 26, fontWeight: 800, color: T.ink, margin: "0 0 10px" }}>Ticket {sent} received.</h2>
                                <p style={{ fontSize: 15, fontFamily: F, lineHeight: 1.65, color: T.muted, margin: "0 0 28px" }}>Our team is on it. You will hear from a real human, usually within 2 hours.</p>
                                <button onClick={() => { setSent(null); reset() }} style={{ background: "transparent", border: "1.5px solid " + T.border, borderRadius: 12, padding: "12px 24px", fontSize: 14, fontFamily: F, fontWeight: 600, color: T.ink, cursor: "pointer" }}>Raise another ticket</button>
                            </motion.div>
                        ) : (
                            <motion.form key={"form-" + formKey} onSubmit={submit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: EO }}
                                style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                <h1 style={{ fontFamily: FH, fontSize: isNarrow ? 26 : 30, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", color: T.ink, margin: "0 0 4px" }}>
                                    Something not working?<br />Raise a support request.
                                </h1>
                                {/* Contact information */}
                                <SectionHead title="Contact information" />
                                <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 14 }}>
                                    <Field label="Full name" required><TextInput name="fullName" placeholder="Your full name" required /></Field>
                                    <Field label="Work email" required><TextInput name="email" type="email" placeholder="you@company.com" required /></Field>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 14 }}>
                                    <Field label="Phone number"><TextInput name="phone" type="tel" placeholder="+1 (555) 000-0000" /></Field>
                                    <Field label="Company name" required><TextInput name="company" placeholder="Your company" required /></Field>
                                </div>
                                <Field label="Employee ID"><TextInput name="employeeId" placeholder="If applicable" /></Field>
                                {/* Support request */}
                                <SectionHead title="Support request" />
                                <Field label="Issue category" required><Select options={CATEGORIES} value={category} onChange={setCategory} required /></Field>
                                <Field label="Subject" required><TextInput name="subject" placeholder="Short summary of the issue" required /></Field>
                                <Field label="Description" required><TextArea name="description" placeholder="Describe the issue in detail, including what happened, what you expected, and any additional context." required rows={4} /></Field>
                                {/* Travel details */}
                                <Collapse show={isTravel}>
                                    <SectionHead title="Travel details" />
                                    <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 14 }}>
                                        <Field label="Booking ID"><TextInput name="bookingId" placeholder="e.g. BK-48213" /></Field>
                                        <Field label="Trip name"><TextInput name="tripName" placeholder="e.g. Austin client visit" /></Field>
                                        <Field label="Traveler name"><TextInput name="travelerName" placeholder="Who is traveling" /></Field>
                                        <Field label="Travel date"><TextInput name="travelDate" type="date" placeholder="" /></Field>
                                        <Field label="Departure city"><TextInput name="departureCity" placeholder="From" /></Field>
                                        <Field label="Destination"><TextInput name="destination" placeholder="To" /></Field>
                                        <Field label="Airline / hotel / vendor"><TextInput name="vendorName" placeholder="Vendor name" /></Field>
                                        <Field label="Reservation number"><TextInput name="reservationNumber" placeholder="PNR / confirmation number" /></Field>
                                    </div>
                                </Collapse>
                                {/* Expense details */}
                                <Collapse show={isExpense}>
                                    <SectionHead title="Expense details" />
                                    <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 14 }}>
                                        <Field label="Expense report ID"><TextInput name="expenseReportId" placeholder="e.g. EXP-1042" /></Field>
                                        <Field label="Expense date"><TextInput name="expenseDate" type="date" placeholder="" /></Field>
                                        <Field label="Expense category"><TextInput name="expenseCategory" placeholder="e.g. Meals, Transport" /></Field>
                                        <Field label="Merchant / vendor"><TextInput name="merchant" placeholder="Merchant name" /></Field>
                                        <Field label="Amount"><TextInput name="amount" type="number" placeholder="0.00" /></Field>
                                        <Field label="Currency"><Select options={CURRENCIES} value={currency} onChange={setCurrency} /></Field>
                                    </div>
                                    <Field label="Invoice / receipt number"><TextInput name="invoiceNumber" placeholder="If available" /></Field>
                                </Collapse>
                                {/* Technical information */}
                                <Collapse show={isTech}>
                                    <SectionHead title="Technical information" />
                                    <Field label="Platform"><Seg options={["Web", "iOS", "Android"]} value={platform} onChange={setPlatform} /></Field>
                                    <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 14 }}>
                                        <Field label="Browser"><TextInput name="browser" placeholder="e.g. Chrome 126" /></Field>
                                        <Field label="Device"><TextInput name="device" placeholder="e.g. MacBook Pro, Pixel 9" /></Field>
                                        <Field label="Operating system"><TextInput name="os" placeholder="e.g. Windows 11, iOS 19" /></Field>
                                        <Field label="App version"><TextInput name="appVersion" placeholder="Settings > About" /></Field>
                                    </div>
                                    <Field label="Error code (if available)"><TextInput name="errorCode" placeholder="e.g. ERR-4092" /></Field>
                                    <Field label="Steps to reproduce"><TextArea name="steps" placeholder="1. Go to... 2. Tap... 3. See error" rows={3} /></Field>
                                </Collapse>
                                {/* Attachments */}
                                <SectionHead title="Attachments" />
                                <div>
                                    <label htmlFor="miraee-files" style={{ display: "block", border: "1.5px dashed rgba(var(--text-rgb),0.2)", borderRadius: 14, padding: "22px 16px", textAlign: "center" as const, cursor: "pointer", background: T.card }}>
                                        <span style={{ fontSize: 14, fontFamily: F, fontWeight: 600, color: T.ink }}>Upload files</span>
                                        <span style={{ display: "block", fontSize: 12, fontFamily: F, color: T.muted, marginTop: 6 }}>Screenshots, receipts, invoices, supporting documents · PDF, PNG, JPG</span>
                                    </label>
                                    <input id="miraee-files" type="file" multiple accept=".pdf,.png,.jpg,.jpeg"
                                        onChange={e => {
                                            const selected = Array.from(e.target.files || [])
                                            const validationError = validateAttachments(selected)
                                            if (validationError) {
                                                setFileError(validationError)
                                                e.target.value = ""
                                                setFiles([])
                                                return
                                            }
                                            setFileError(null)
                                            setFiles(selected)
                                        }}
                                        style={{ display: "none" }} />
                                    {fileError && (
                                        <p style={{ fontSize: 12.5, fontFamily: F, fontWeight: 600, color: "#C0392B", margin: "8px 0 0" }}>{fileError}</p>
                                    )}
                                    {files.length > 0 && (
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                                            {files.map(f => (
                                                <span key={f.name} style={{ fontSize: 12, fontFamily: F, fontWeight: 600, color: "var(--accent-strong)", background: "rgba(229,86,2,0.08)", borderRadius: 100, padding: "6px 12px" }}>{f.name}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Additional information */}
                                <SectionHead title="Additional information" />
                                <Field label="Preferred contact method"><Seg options={["Email", "Phone"]} value={contactVia} onChange={setContactVia} /></Field>
                                <Field label="Best time to contact"><TextInput name="bestTime" placeholder="e.g. Weekdays, 2 to 5 PM IST" /></Field>
                                <Field label="Additional comments"><TextArea name="comments" placeholder="Anything else we should know." rows={3} /></Field>
                                {/* Consent */}
                                <SectionHead title="Consent" />
                                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                                    <input type="checkbox" required style={{ marginTop: 2.5, accentColor: T.orange, width: 16, height: 16 }} />
                                    <span style={{ fontSize: 13.5, fontFamily: F, lineHeight: 1.55, color: T.ink }}>I confirm that the information provided is accurate. <span style={{ color: T.orange }}>*</span></span>
                                </label>
                                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                                    <input type="checkbox" required style={{ marginTop: 2.5, accentColor: T.orange, width: 16, height: 16 }} />
                                    <span style={{ fontSize: 13.5, fontFamily: F, lineHeight: 1.55, color: T.ink }}>I agree to Miraee using the submitted information to investigate and resolve my support request. <span style={{ color: T.orange }}>*</span></span>
                                </label>
                                {/* Actions */}
                                {sendError && (
                                    <p style={{ fontSize: 13.5, fontFamily: F, fontWeight: 600, color: "#C0392B", background: "rgba(192,57,43,0.08)", borderRadius: 10, padding: "10px 14px", margin: 0 }}>
                                        Could not submit right now. Try again, or email support@miraee.ai directly.
                                    </p>
                                )}
                                <p style={{ fontSize: 12.5, fontFamily: F, color: T.muted, textAlign: "center" as const, margin: "8px 0 0", lineHeight: 1.6 }}>
                                    By submitting you agree to our{" "}
                                    <a href="/privacy" style={{ color: T.ink, fontWeight: 600, textDecoration: "underline" }}>Privacy Policy</a>
                                    {" "}and{" "}
                                    <a href="/terms" style={{ color: T.ink, fontWeight: 600, textDecoration: "underline" }}>Terms & Conditions</a>.
                                </p>
                                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                                    <motion.button type="submit" disabled={sending} whileHover={sending ? undefined : { scale: 1.02, boxShadow: "0 12px 32px rgba(229,86,2,0.28)" }} whileTap={sending ? undefined : { scale: 0.97 }}
                                        style={{ flex: 1, background: T.accent, color: T.cream, border: "none", borderRadius: 12, padding: "15px 0", fontSize: 15, fontFamily: F, fontWeight: 700, cursor: sending ? "wait" : "pointer", opacity: sending ? 0.7 : 1 }}>
                                        {sending ? "Submitting..." : "Submit support request"}
                                    </motion.button>
                                    <motion.button type="button" onClick={reset} whileTap={{ scale: 0.97 }}
                                        style={{ background: "transparent", color: T.ink, border: "1.5px solid " + T.border, borderRadius: 12, padding: "15px 28px", fontSize: 15, fontFamily: F, fontWeight: 600, cursor: "pointer" }}>
                                        Cancel
                                    </motion.button>
                                </div>
                                <p style={{ fontSize: 13, fontFamily: F, color: T.muted, textAlign: "center" as const, margin: 0 }}>
                                    Prefer email? <a href="mailto:support@miraee.ai" style={{ color: T.ink, fontWeight: 600 }}>support@miraee.ai</a>
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
                                style={{ position: "absolute", inset: 0, borderRadius: isNarrow ? "22px 22px 22px 48px" : "40px 40px 40px 120px", overflow: "hidden", willChange: "clip-path" }}>
                                <motion.img src={teamImg} alt="Travel support team collaborating on a customer request"
                                    initial={{ scale: 1.18 }} animate={mediaInView ? { scale: imgHov ? 1.05 : 1 } : {}} transition={{ duration: 1.1, ease: EO }}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.22) 45%, transparent 65%)" }} />
                                <motion.div initial={{ opacity: 0, y: 14 }} animate={mediaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7, ease: EO }}
                                    style={{ position: "absolute", top: 28, left: 28, display: "flex", alignItems: "center", gap: 9, background: "rgba(0,0,0,0.52)", backdropFilter: "blur(10px)", borderRadius: 100, padding: "9px 16px" }}>
                                    <motion.span animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: "50%", background: "#3BA55D" }} />
                                    <span style={{ fontSize: 12.5, fontFamily: F, fontWeight: 700, color: "#fff" }}>Miraee Support</span>
                                    <span style={{ fontSize: 12.5, fontFamily: F, color: "rgba(255,255,255,0.65)" }}>always online</span>
                                </motion.div>
                                <div style={{ position: "absolute", left: isNarrow ? 24 : 40, right: isNarrow ? 24 : 40, bottom: isNarrow ? 24 : 36 }}>
                                    <motion.p initial={{ opacity: 0, y: 22 }} animate={mediaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: EO }}
                                        style={{ fontFamily: F, fontStyle: "italic", fontWeight: 500, fontSize: isNarrow ? 22 : "clamp(1.6rem,2.4vw,2.3rem)", lineHeight: 1.3, color: "#fff", margin: "0 0 22px", letterSpacing: "-0.01em" }}>
                                        Real humans, around the clock,<br />behind every agent.
                                    </motion.p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                        {["24/7 human-in-the-loop support", "Under 2h median first response"].map((chip, i) => (
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
