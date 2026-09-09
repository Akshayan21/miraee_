import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EO } from "../animations/easings"
import {
    T, F, FH, SiteNav, SiteFooter, Field, TextInput, TextArea, RadioGroup, SectionHead,
    BulletList, SuccessScreen, TICKET_ENDPOINT, useVW, MediaColumn,
} from "../components/LegalFormKit"
import disputeResolutionImg from "../assets/dispute_resolution.webp"
import { filesToAttachments, submitForm, validateAttachments } from "../lib/formSubmission"
import { usePageMeta } from "../hooks/usePageMeta"

const CONFERENCE_OPTIONS = [
    "I request an individual settlement conference.",
    "I do not currently request an individual settlement conference.",
    "I am willing to participate if Miraee requests one.",
]

const REPRESENTATION_OPTIONS = [
    "I am submitting this notice on my own behalf.",
    "I am represented by an attorney or other authorized representative.",
]

const ACK_ITEMS = [
    "the information provided is accurate to the best of my knowledge;",
    "I am submitting this notice in good faith to begin the informal dispute resolution process;",
    "I understand that the 60-day informal resolution period begins when Miraee receives a substantially complete notice containing sufficient information to identify and evaluate the dispute;",
    "I agree to participate reasonably and in good faith in the informal resolution process and, if requested by either party, an individual settlement conference;",
    "I understand that submission of this notice does not commence arbitration or litigation; and",
    "Miraee may contact me or my authorized representative using the contact information provided above regarding this dispute.",
]

export default function DisputeNoticePage(props: { style?: React.CSSProperties }) {
    usePageMeta("Miraee Informal Dispute Resolution Notice", "Submit an informal dispute resolution notice to Miraee before arbitration or other formal proceedings.")
    const vw = useVW()
    const isNarrow = vw < 1200
    const [formKey, setFormKey] = useState(0)
    const [conference, setConference] = useState("")
    const [representation, setRepresentation] = useState("")
    const [files, setFiles] = useState<File[]>([])
    const [fileError, setFileError] = useState<string | null>(null)
    const [sent, setSent] = useState(false)
    const [sending, setSending] = useState(false)
    const [sendError, setSendError] = useState(false)
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    const represented = representation === REPRESENTATION_OPTIONS[1]
    const reset = () => { setConference(""); setRepresentation(""); setFiles([]); setFileError(null); setFormKey(k => k + 1) }
    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (sending) return
        if (files.length === 0) {
            setFileError("At least one supporting document is required.")
            return
        }
        setSending(true)
        setSendError(false)
        const fd = new FormData(e.currentTarget as HTMLFormElement)
        const payload: Record<string, string> = { formType: "Informal Dispute Resolution Notice" }
        fd.forEach((v, k) => { if (typeof v === "string") payload[k] = v })
        payload.settlementConference = conference
        payload.representation = representation
        payload.date = today
        try {
            payload.attachments = JSON.stringify(await filesToAttachments(files))
            payload.attachedFiles = files.map(file => file.name).join(", ")
            await submitForm(TICKET_ENDPOINT, payload)
            setSent(true)
        } catch {
            setSendError(true)
        } finally {
            setSending(false)
        }
    }
    return (
        <div className="form-page form-page--legal-form" style={{ position: "relative", width: "100%", minHeight: "100vh", background: T.bg, fontFamily: F, ...props.style }}>
            <a className="legacy-skip" href="#main">Skip to content</a>
            <SiteNav />
            <main id="main">
            <div style={{ maxWidth: 1440, margin: "0 auto", padding: isNarrow ? "100px 20px 64px" : "116px 48px 72px" }}>
                <div style={{ display: "flex", flexDirection: isNarrow ? "column" : "row", gap: isNarrow ? 48 : 72, alignItems: "flex-start" }}>
                    {/* Form column */}
                    <div style={{ flex: "0 0 auto", width: isNarrow ? "100%" : 500, maxWidth: "100%" }}>
                        <AnimatePresence mode="wait">
                            {sent ? (
                                <SuccessScreen key="done" title="Dispute notice received."
                                    body="Miraee will send a confirmation to the email address provided above. Please retain that confirmation and any assigned reference number for your records."
                                    onReset={() => { setSent(false); reset() }} resetLabel="Submit another notice" />
                            ) : (
                                <motion.form key={"form-" + formKey} onSubmit={submit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: EO }}
                                    style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                    <h1 style={{ fontFamily: FH, fontSize: isNarrow ? 26 : 30, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", color: T.ink, margin: "0 0 4px" }}>
                                        Informal Dispute Resolution Notice
                                    </h1>
                                    <p style={{ fontSize: 14.5, fontFamily: F, lineHeight: 1.7, color: T.muted, margin: 0 }}>
                                        Before initiating arbitration or other formal proceedings, Section 20 of the <a href="/terms" style={{ color: T.orange, fontWeight: 600 }}>Miraee Terms of Use</a> requires you and Miraee to attempt to resolve disputes informally within sixty (60) days.
                                    </p>
                                    <p style={{ fontSize: 13.5, fontFamily: F, lineHeight: 1.65, color: T.muted, margin: 0 }}>
                                        Please provide enough information for Miraee to understand, investigate, and respond to your concern. Submission of this form does not guarantee any particular outcome or resolution.
                                    </p>

                                    <SectionHead title="Your information" />
                                    <Field label="Full legal name" required><TextInput name="fullLegalName" placeholder="Your full legal name" required /></Field>
                                    <Field label="Email address associated with your Miraee account" required><TextInput name="email" type="email" placeholder="you@company.com" required /></Field>
                                    <Field label="Mailing address" required><TextInput name="mailingAddress" placeholder="Street, city, state / province, postal code, country" required /></Field>
                                    <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 14 }}>
                                        <Field label="Company or organization name, if applicable"><TextInput name="company" placeholder="Optional" /></Field>
                                        <Field label="Miraee account or user ID, if available"><TextInput name="accountId" placeholder="Optional" /></Field>
                                    </div>

                                    <SectionHead title="Dispute information" />
                                    <Field label="Description of the dispute" required
                                        hint="Please describe what happened, including the relevant dates, transactions, communications, features, or Services involved.">
                                        <TextArea name="disputeDescription" required rows={5} />
                                    </Field>
                                    <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 14 }}>
                                        <Field label="Date the dispute arose or was first discovered" required><TextInput name="disputeDate" type="date" required /></Field>
                                        <Field label="Relevant transaction, booking, confirmation, invoice, or reference numbers"><TextInput name="referenceNumbers" placeholder="Optional" /></Field>
                                    </div>
                                    <Field label="Individuals or entities involved" required><TextInput name="partiesInvolved" placeholder="Who was involved" required /></Field>
                                    <Field label="Steps you have already taken to resolve the dispute" required><TextArea name="stepsTaken" required rows={4} /></Field>
                                    <Field label="Requested resolution" required
                                        hint="Please describe the specific relief or outcome you are requesting, including any amount of money claimed and how that amount was calculated.">
                                        <TextArea name="requestedResolution" required rows={4} />
                                    </Field>
                                    <Field label="Amount claimed, if applicable"><TextInput name="amountClaimed" placeholder="e.g. $500" /></Field>

                                    <SectionHead title="Supporting documents" />
                                    <p style={{ fontSize: 13.5, fontFamily: F, lineHeight: 1.65, color: T.muted, margin: 0 }}>
                                        You must upload documents that support your dispute, such as receipts, invoices, screenshots, correspondence, booking records, or account statements.
                                    </p>
                                    <div>
                                        <label htmlFor="dispute-files" style={{ display: "block", border: "1.5px dashed rgba(var(--text-rgb),0.2)", borderRadius: 14, padding: "22px 16px", textAlign: "center" as const, cursor: "pointer", background: T.card }}>
                                            <span style={{ fontSize: 14, fontFamily: F, fontWeight: 600, color: T.ink }}>Upload supporting documents</span>
                                            <span style={{ display: "block", fontSize: 12, fontFamily: F, color: T.muted, marginTop: 6 }}>Receipts, invoices, screenshots, correspondence, booking records · PDF, PNG, JPG</span>
                                        </label>
                                        <input id="dispute-files" type="file" multiple accept=".pdf,.png,.jpg,.jpeg"
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
                                            style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
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
                                    <p style={{ fontSize: 12.5, fontFamily: F, lineHeight: 1.6, color: T.muted, margin: 0 }}>
                                        Please do not submit passwords, complete payment-card numbers, security codes, government identification numbers, medical information, or other sensitive information that is not necessary to evaluate the dispute.
                                    </p>

                                    <SectionHead title="Settlement conference" />
                                    <p style={{ fontSize: 13.5, fontFamily: F, lineHeight: 1.65, color: T.muted, margin: 0 }}>
                                        Section 20 permits either party to request an individual settlement conference during the informal dispute resolution period.
                                    </p>
                                    <Field label="Please select one" required>
                                        <RadioGroup name="settlementConference" options={CONFERENCE_OPTIONS} value={conference} onChange={setConference} />
                                    </Field>
                                    <Field label="Please provide your general availability for a settlement conference"><TextInput name="availability" placeholder="e.g. Weekdays, 2 to 5 PM CT" /></Field>

                                    <SectionHead title="Representation" />
                                    <Field label="Please select one" required>
                                        <RadioGroup name="representation" options={REPRESENTATION_OPTIONS} value={representation} onChange={setRepresentation} />
                                    </Field>
                                    <AnimatePresence initial={false}>
                                        {represented && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                transition={{ height: { duration: 0.45, ease: EO }, opacity: { duration: 0.3 } }} style={{ overflow: "hidden" }}>
                                                <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingTop: 4 }}>
                                                    <Field label="Representative's name" required={represented}><TextInput name="repName" placeholder="Representative's full name" required={represented} /></Field>
                                                    <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 14 }}>
                                                        <Field label="Firm or organization"><TextInput name="repFirm" placeholder="Optional" /></Field>
                                                        <Field label="Representative's email address" required={represented}><TextInput name="repEmail" type="email" placeholder="rep@firm.com" required={represented} /></Field>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <SectionHead title="Acknowledgement" />
                                    <p style={{ fontSize: 13.5, fontFamily: F, fontWeight: 600, color: T.ink, margin: 0 }}>By submitting this form, I confirm that:</p>
                                    <BulletList items={ACK_ITEMS} />
                                    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                                        <input type="checkbox" required style={{ marginTop: 2.5, accentColor: T.orange, width: 16, height: 16 }} />
                                        <span style={{ fontSize: 13.5, fontFamily: F, lineHeight: 1.55, color: T.ink }}>I confirm all of the statements above. <span style={{ color: T.orange }}>*</span></span>
                                    </label>

                                    <SectionHead title="Electronic signature" />
                                    <Field label="Electronic signature" required><TextInput name="signature" placeholder="Type your full legal name as your signature" required /></Field>
                                    <Field label="Date"><TextInput name="dateDisplay" defaultValue={today} readOnly /></Field>

                                    {sendError && (
                                        <p style={{ fontSize: 13.5, fontFamily: F, fontWeight: 600, color: "#C0392B", background: "rgba(192,57,43,0.08)", borderRadius: 10, padding: "10px 14px", margin: 0 }}>
                                            Could not submit right now. Try again, or email legal@miraee.ai directly.
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
                                            {sending ? "Submitting..." : "Submit"}
                                        </motion.button>
                                    </div>
                                    <p style={{ fontSize: 13, fontFamily: F, color: T.muted, textAlign: "center" as const, margin: 0, lineHeight: 1.6 }}>
                                        After submission, Miraee will send a confirmation to the email address provided above. Please retain that confirmation and any assigned reference number for your records.
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* Media column (sticky on desktop) */}
                    <MediaColumn
                        isNarrow={isNarrow}
                        imageSrc={disputeResolutionImg}
                        imageAlt="Person at desk reviewing dispute documents"
                        quote={<>Transparent process,<br />fair resolution.</>}
                        chips={["60-day informal resolution period", "Settlement conference available"]}
                        badgeLabel="Miraee Legal"
                        badgeSub="dispute resolution"
                    />
                </div>
            </div>
            </main>
            <SiteFooter />
        </div>
    )
}
