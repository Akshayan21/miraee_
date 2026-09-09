import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EO } from "../animations/easings"
import {
    T, F, FH, SiteNav, SiteFooter, Field, TextInput, RadioGroup, SectionHead,
    BulletList, SuccessScreen, TICKET_ENDPOINT, useVW, MediaColumn,
} from "../components/LegalFormKit"
import optOutImage from "../assets/atribution-opt_out.webp"
import { submitForm } from "../lib/formSubmission"
import { usePageMeta } from "../hooks/usePageMeta"

const ELECTION_OPTIONS = [
    "I am opting out of the arbitration provisions applicable when I created my Miraee account.",
    "I am opting out of the most recent update to the arbitration provisions.",
]

const ACK_ITEMS = [
    "I am the individual identified above or am authorized to submit this request on that individual's behalf;",
    "the information provided in this form is accurate;",
    "I understand that this request applies only to the arbitration provisions identified above;",
    "opting out of an update does not affect arbitration provisions that I previously accepted and did not timely opt out of; and",
    "submitting this form does not terminate my Miraee account or otherwise modify the Terms of Use.",
]

export default function ArbitrationOptOutPage(props: { style?: React.CSSProperties }) {
    usePageMeta("Miraee Arbitration Opt Out Form", "Submit a timely request to opt out of applicable arbitration provisions in the Miraee Terms of Use.")
    const vw = useVW()
    const isNarrow = vw < 1200
    const [formKey, setFormKey] = useState(0)
    const [election, setElection] = useState("")
    const [sent, setSent] = useState(false)
    const [sending, setSending] = useState(false)
    const [sendError, setSendError] = useState(false)
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    const reset = () => { setElection(""); setElectionError(false); setFormKey(k => k + 1) }
    const [electionError, setElectionError] = useState(false)
    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (sending) return
        if (!election) {
            setElectionError(true)
            return
        }
        setElectionError(false)
        setSending(true)
        setSendError(false)
        const fd = new FormData(e.currentTarget as HTMLFormElement)
        const payload: Record<string, string> = { formType: "Arbitration Opt Out" }
        fd.forEach((v, k) => { if (typeof v === "string") payload[k] = v })
        payload.optOutElection = election
        payload.date = today
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
                                <SuccessScreen key="done" title="Opt-out request received."
                                    body="Miraee will send a confirmation to the email address associated with your account. Please retain that confirmation for your records."
                                    onReset={() => { setSent(false); reset() }} resetLabel="Submit another request" />
                            ) : (
                                <motion.form key={"form-" + formKey} onSubmit={submit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: EO }}
                                    style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                    <h1 style={{ fontFamily: FH, fontSize: isNarrow ? 26 : 30, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", color: T.ink, margin: "0 0 4px" }}>
                                        Arbitration Opt Out Form
                                    </h1>
                                    <p style={{ fontSize: 14.5, fontFamily: F, lineHeight: 1.7, color: T.muted, margin: 0 }}>
                                        You may use this form to opt out of mandatory arbitration provisions in Section 20 of the <a href="/terms" style={{ color: T.orange, fontWeight: 600 }}>Miraee Terms of Use</a>.
                                    </p>
                                    <div style={{ background: "rgba(229,86,2,0.10)", border: "1px solid rgba(229,86,2,0.35)", borderRadius: 14, padding: "16px 18px" }}>
                                        <p style={{ fontSize: 13.5, fontFamily: F, fontWeight: 700, color: T.ink, margin: "0 0 10px" }}>To be effective, your opt-out request must be submitted:</p>
                                        <BulletList items={[
                                            "Within thirty (30) days after you create your Miraee account; or",
                                            "If you are opting out of an update to the arbitration provisions, within thirty (30) days after the updated arbitration provisions take effect.",
                                        ]} />
                                    </div>
                                    <p style={{ fontSize: 13.5, fontFamily: F, lineHeight: 1.65, color: T.muted, margin: 0 }}>
                                        Opting out of an update will not cancel the arbitration terms that you previously accepted. The most recent arbitration terms that you accepted and did not timely opt out of will continue to apply.
                                    </p>

                                    <SectionHead title="Account information" />
                                    <Field label="Full legal name" required><TextInput name="fullLegalName" placeholder="Your full legal name" required /></Field>
                                    <Field label="Email address associated with your Miraee account" required><TextInput name="email" type="email" placeholder="you@company.com" required /></Field>
                                    <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 14 }}>
                                        <Field label="Company or organization name, if applicable"><TextInput name="company" placeholder="Optional" /></Field>
                                        <Field label="Miraee account or user ID, if available"><TextInput name="accountId" placeholder="Optional" /></Field>
                                    </div>

                                    <SectionHead title="Opt-out election" />
                                    <Field label="Please select one" required>
                                        <RadioGroup name="optOutElection" options={ELECTION_OPTIONS} value={election} onChange={v => { setElection(v); setElectionError(false) }} />
                                    </Field>
                                    {electionError && (
                                        <p style={{ fontSize: 12.5, fontFamily: F, fontWeight: 600, color: "#C0392B", margin: "-8px 0 0" }}>Please select an opt-out election before submitting.</p>
                                    )}

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
                                        After submission, Miraee will send a confirmation to the email address associated with your account. Please retain that confirmation for your records.
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* Media column (sticky on desktop) */}
                    <MediaColumn
                        isNarrow={isNarrow}
                        imageSrc={optOutImage}
                        imageAlt="Professional reviewing legal documents"
                        quote={<>Your rights matter.<br />We make it simple.</>}
                        chips={["30-day opt-out window", "Processed within 5 business days"]}
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
