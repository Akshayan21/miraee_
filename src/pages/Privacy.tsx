import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { EO } from "../animations/easings"
import { T, F, FH, SiteNav, SiteFooter, useVW } from "../components/LegalFormKit"
import { usePageMeta } from "../hooks/usePageMeta"


const pStyle: React.CSSProperties = { fontSize: 15, fontFamily: F, lineHeight: 1.75, color: T.muted, margin: "0 0 16px" }
const liStyle: React.CSSProperties = { fontSize: 15, fontFamily: F, lineHeight: 1.7, color: T.muted, marginBottom: 10 }
const bStyle: React.CSSProperties = { color: T.ink, fontWeight: 700 }

function Bullets({ items }: { items: React.ReactNode[] }) {
    return (
        <ul style={{ margin: "0 0 16px", paddingLeft: 22 }}>
            {items.map((it, i) => <li key={i} style={liStyle}>{it}</li>)}
        </ul>
    )
}

const SECTIONS: { id: string; num: string; title: string; body: React.ReactNode }[] = [
    {
        id: "p-1", num: "1", title: "Definitions",
        body: (
            <>
                <p style={pStyle}>For purposes of this Privacy Policy:</p>
                <p style={pStyle}>“Authorized User” means any individual whom a Customer or other organization authorizes to access or use the Services. Authorized Users may include the Customer’s employees, contractors, guests, travel arrangers, approvers, administrators, finance personnel, travel managers, sponsored travelers, candidates, and interviewees, in each case to the extent the Services are used to arrange, manage, approve, support, or otherwise facilitate their travel or related workflows.</p>
                <p style={pStyle}>“Customer” means a company, organization, or other entity that accesses or uses the Services directly or makes the Services available to others.</p>
                <p style={pStyle}>“Individual User” means an individual who accesses or uses the Services on their own behalf, including an independent business traveler supported by the Services.</p>
                <p style={pStyle}>“Payment Card Network” or “Card Network” means a payment card network, payment organization, or similar card transaction network, such as Visa, Mastercard, American Express, or any other supported network made available in connection with the Services.</p>
                <p style={pStyle}>“Platform” means the Miraee platform, including the software, applications, AI agents, workflows, APIs, integrations, and related functionality made available by Miraee.</p>
                <p style={pStyle}>“Personal Information” means information that identifies, relates to, describes, can reasonably be associated with, or could reasonably be linked to an identified or identifiable person and includes “personal data” as defined by the General Data Protection Regulation (“GDPR”) and similar data privacy laws.</p>
                <p style={pStyle}>“Registered Payment Card” means a payment card that an Individual User, a Customer, or an Authorized User enrolls in the Services for transaction monitoring, spend management, reconciliation, or related functionality.</p>
                <p style={pStyle}>“Transaction Data” means transaction information collected by or made available from a Payment Card Network through a service provider in connection with an eligible Registered Payment Card or eligible transaction. Transaction Data may include, for example, merchant name, merchant category or other merchant details, transaction amount, currency, transaction date and time, authorization or settlement status, card or account identifier, transaction identifier, location or channel information, and related transaction metadata.</p>
                <p style={pStyle}>“User” means, collectively, Authorized User, Customer, and Individual User.</p>
            </>
        ),
    },
    {
        id: "p-2", num: "2", title: "How to Read This Policy",
        body: (
            <>
                <p style={pStyle}>This Privacy Policy applies to Personal Information we collect from or about people who interact with Miraee. Depending on your relationship with us, you may use or interact with the Services as a website visitor, prospective customer representative, event participant, survey respondent, marketing contact, Customer, Authorized User, or Individual User. The Terms of Use, applicable Customer agreements, product-specific notices, or other contractual terms govern access to and use of the Platform. This Privacy Policy also covers Personal Information collected through websites, marketing, events, support, and other interactions that may occur before or outside Platform use.</p>
                <p style={pStyle}>If you use the Services through your employer or another organization, that organization may control your use of the Services and may receive information about your account, travel activity, bookings, policy compliance, approvals, expenses, support interactions, AI-agent instructions, recommendations, action logs, and itinerary-derived location. Your organization’s privacy notices, employment policies, travel policies, and internal procedures may also apply.</p>
            </>
        ),
    },
    {
        id: "p-3", num: "3", title: "Our Role in Processing Personal Information",
        body: (
            <>
                <p style={pStyle}>Miraee’s role depends on the context in which Personal Information is processed. In accordance with GDPR and similar data privacy/cybersecurity laws, the table below explains our role in processing your Personal Information. Where Miraee acts as a processor, service provider, or contractor, our processing is governed by the applicable customer agreement, data processing addendum, and documented Customer instructions. Where required, Miraee uses sub-processors only in accordance with the applicable data processing addendum and maintains a current list of sub-processors or other vendor disclosures through the mechanism made available to Customers.</p>
                <div style={{ overflowX: "auto", margin: "0 0 16px" }}><table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5, fontFamily: F, color: T.muted, lineHeight: 1.55 }}><thead><tr><th style={{ textAlign: "left", padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", background: "rgba(var(--text-rgb),0.06)", color: T.ink, fontWeight: 700 }}>Context</th><th style={{ textAlign: "left", padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", background: "rgba(var(--text-rgb),0.06)", color: T.ink, fontWeight: 700 }}>Miraee role</th><th style={{ textAlign: "left", padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", background: "rgba(var(--text-rgb),0.06)", color: T.ink, fontWeight: 700 }}>Who controls decisions</th><th style={{ textAlign: "left", padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", background: "rgba(var(--text-rgb),0.06)", color: T.ink, fontWeight: 700 }}>Where to exercise rights</th></tr></thead><tbody><tr><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Website/marketing</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Controller/business</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Miraee</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Miraee</td></tr><tr><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Enterprise platform use</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Processor/service provider, except listed controller purposes</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Customer</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Customer or Miraee (as instructed)</td></tr><tr><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Individual-user travel services</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Controller/business</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Miraee</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Miraee</td></tr><tr><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Travel providers</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Independent controllers</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Provider</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Provider</td></tr><tr><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>AI model/vendor processing</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Processor/sub-processor/service provider</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Miraee or Customer (depending on context)</td><td style={{ padding: "8px 10px", border: "1px solid rgba(var(--text-rgb),0.12)", verticalAlign: "top" }}>Miraee/Customer</td></tr></tbody></table></div>
            </>
        ),
    },
    {
        id: "p-4", num: "4", title: "How Miraee Uses Agentic AI",
        body: (
            <>
                <p style={pStyle}>Miraee is more than just a search, booking, or chatbot interface. Certain Services use AI agents that may perform tasks on behalf of Customers, Authorized Users, or Individual Users. Depending on the Customer’s or the Individual User’s selected configuration, the permissions granted by a user, and the applicable product features, these agents may interpret natural-language instructions, compare travel options against applicable policies and budgets, recommend itineraries, initiate approval workflows, interact with travel providers and enterprise systems, and take permitted actions within defined parameters.</p>
                <p style={pStyle}>Miraee distinguishes between the following types of AI-enabled activity.</p>
                <Bullets items={[<span>User-directed actions. These are actions taken in response to instructions from a Customer, Authorized User, or Individual User, such as “book me the lowest policy-compliant flight to New York tomorrow morning,” “move my hotel closer to the office,” or “cancel this trip.”</span>, <span>System-initiated recommendations or alerts. These are suggestions, warnings, or proposed actions generated by Miraee based on context, such as a lower-cost itinerary, a likely disruption, a policy exception, a duplicate booking, an approval issue, or an anomaly in travel spend.</span>, <span>Automated or semi-automated actions. In some configurations, Miraee may take an action without additional human confirmation where the action falls within preconfigured permissions, approval thresholds, Customer policies, and user instructions. In other configurations, Miraee will require confirmation, approval, or human review before taking specified actions.</span>]} />
                <p style={pStyle}>Miraee does not intend for AI agents to make solely automated decisions that legally bind individuals unless such processing is enabled by the applicable Customer or user configuration, permitted by applicable law, and accompanied by required safeguards. Depending on the configuration, AI-enabled actions may affect travel approvals, booking eligibility, expense submission, fraud review, payment workflows, policy exceptions, or information surfaced to Customer administrators. Where required by law, Miraee or the applicable Customer will provide a way to request human review, express a point of view, contest the decision, or exercise applicable opt-out rights.</p>
                <p style={pStyle}>Miraee’s AI agents are designed to operate within defined guardrails. These may include Customer-configured policies, role-based permissions, approval thresholds, transaction limits, vendor restrictions, geographic restrictions, non-refundable booking controls, exception workflows, audit logs, and escalation rules. The specific guardrails available or applied may vary by product feature, Customer configuration, integration, jurisdiction, and contractual arrangement. Miraee does not guarantee that every safeguard listed above applies to every AI interaction or action. Customers are responsible for configuring available controls that reflect their policies, risk tolerance, and legal obligations.</p>
                <p style={pStyle}>Miraee agents may request clarification before acting on instructions that are ambiguous, incomplete, conflicting, or appear inconsistent with Customer policies, user preferences, or applicable configurations. Where a user or Customer proceeds without resolving a flagged ambiguity, the resulting action or recommendation may depend on the information provided, the interpretation confirmed or accepted by the user or Customer, and the applicable Customer configuration.</p>
            </>
        ),
    },
    {
        id: "p-5", num: "5", title: "Personal Information We Collect",
        body: (
            <>
                <p style={pStyle}>Some Personal Information is required to provide the Services, complete travel bookings, comply with legal obligations, verify identity, process payments, secure accounts, or fulfill Customer instructions. Other Personal Information, such as certain preferences, loyalty numbers, accessibility requests, meal preferences, or connected-account permissions, may be optional. If required information is not provided, Miraee or the applicable travel provider may be unable to create an account, complete a booking, provide support, process a payment or reimbursement, apply Customer policies, or provide certain AI-enabled features.</p>
                <p style={pStyle}>The Personal Information we collect depends on how you interact with Miraee and which Services are made available to you. We may collect information directly from you, from Customers and other users, from travel providers and third-party systems, from integrations you or a Customer enable, and automatically through your use of the Services.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Account, identity, and profile information</p>
                <p style={pStyle}>We may collect information needed to create, administer, secure, and personalize accounts and traveler profiles. This may include name, work email address, personal email address where permitted or provided, phone number, job title, department, office location, manager, cost center, employee ID, username, account credentials, single sign-on identifiers, authentication metadata, access permissions, profile photo, communication preferences, and language preferences.</p>
                <p style={pStyle}>For travel-related functionality, we may also collect traveler profile information such as date of birth, gender, nationality, passport, visa, or other travel document details, known traveler number, redress number, loyalty program numbers, seating preferences, meal preferences, accessibility requests, emergency contact details, and other information needed to support travel.</p>
                <p style={pStyle}>Some traveler profile information may be sensitive or may reveal sensitive information, such as health, disability, religion, nationality, or dietary restrictions. We collect and use that information only where provided by you, your Customer or organization, or another authorized person, and where needed to provide the Services or as otherwise permitted by law. Where GDPR or similar data privacy laws apply, Miraee processes special categories of personal data only where an applicable legal basis and special-category condition applies, such as explicit consent, processing necessary for reasons of substantial public interest where recognized by law, processing necessary to protect vital interests, processing necessary for legal claims, or processing necessary to provide travel-related services requested by or on behalf of the traveler where permitted by law. Optional sensitive profile fields may be removed or modified where supported by the Services and subject to Customer instructions, legal obligations, travel-provider requirements, and retention rules.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Travel, Booking, and Itinerary Information</p>
                <p style={pStyle}>When users search for, plan, book, modify, cancel, or receive support for travel, Miraee may collect travel-related information needed to present options, complete reservations, manage itineraries, provide traveler support, apply Customer policies, and maintain accurate records of travel activity. This information may come from users, Customers, travel arrangers, travel providers, reservation systems, or other connected services. We may collect travel searches, proposed itineraries, selected itineraries, bookings, cancellations, modifications, ticketing details, reservation numbers, fare classes, hotel and room details, rail and ground transportation details, car rental details, airport and location information, travel dates, travel companions, meeting locations, travel purpose, trip classifications, travel notes, travel supplier information, disruption records, rebooking information, refund or credit information, waiver information, support interactions, special service requests, travel policy exceptions, approval status, and current or planned location inferred from itinerary information.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Payment, Expense, and Financial Information</p>
                <p style={pStyle}>Where the Services include payment, billing, reimbursement, expense, card, or reconciliation functionality, Miraee may collect information needed to process transactions, support bookings, manage expenses, administer invoices, prevent fraud, and help Customers reconcile travel-related spend. The specific information collected depends on the payment flow, Customer configuration, Travel Provider requirements, and any integrated finance or expense systems.</p>
                <p style={pStyle}>If applicable to the Services, we may collect corporate card information, virtual card information, billing information, payment-token information, transaction information, reimbursement information, invoice information, receipt information, expense information, merchant details, amounts, currency, tax, categories, transaction metadata, expense report status, approval history, audit flags, and reconciliation data. Where required for reimbursement or account linking, we may collect bank account or payment account information. Depending on the payment flow, full payment card or bank account details may be collected and processed directly by payment processors, card issuers, banking partners, travel providers, or expense-system providers. Miraee may receive payment tokens, masked card details, authorization status, transaction metadata, reconciliation data, or other limited payment information needed to provide the Services. Miraee will not collect or store full payment card numbers unless disclosed in the applicable product flow, customer agreement, or supplemental notice and supported by appropriate security controls.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Card enrollment and transaction data</p>
                <p style={pStyle}>If a User enrolls a payment card in the Services, Miraee may collect or receive card enrollment information, which may include card number, expiration date, masked card details, card token, cardholder information, and related enrollment metadata, and may share that information with our service providers, and applicable Payment Card Networks to enable transaction monitoring for business spend management and related Services.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Transaction data and origin flow</p>
                <p style={pStyle}>Card Networks collect Transaction Data for eligible Registered Payment Cards and eligible transactions. Card Networks may provide Transaction Data to Miraee through its service provider, and the service provider may process and transmit that Transaction Data to Miraee for the purposes described in this Privacy Policy, the applicable Customer agreement, and the applicable enrollment flow. Only eligible cards and eligible transactions can be monitored, and not all cards, merchants, transaction types, geographies, or networks may be supported.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Enrollment consent</p>
                <p style={pStyle}>When a User submits card information or otherwise enrolls a Registered Payment Card, the User authorizes the applicable Card Network to access, monitor, and share Transaction Data, including amount, time, date, and merchant name, with the service provider and Miraee for the purpose of identifying relevant transactions and carrying out related business travel, expense management, reconciliation, and spend management services. Each User affirms that the card being monitored is used primarily for business purposes, and acknowledges that the service provider will process the data in accordance with such service provider’s privacy policy and that Miraee will process data received from the Card Networks through the service provider in accordance with Miraee’s Terms of Use, applicable Customer terms, and this Privacy Policy.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Customer and enterprise context</p>
                <p style={pStyle}>To operate the Services in an enterprise environment, Miraee may process information provided by or configured for a Customer. This may include travel policies, budgets, spend limits, approval chains, workflows, preferred vendors, negotiated rates, office locations, project codes, cost centers, departments, reporting structures, duty-of-care rules, risk-management settings, geographic restrictions, travel advisories, employee eligibility rules, role-based permissions, Customer-specific instructions, playbooks, escalation rules, and agent guardrails.</p>
                <p style={pStyle}>This information helps determine what Miraee may recommend, what actions its agents may take, when clarification is needed, and when a matter should be routed for approval or human review.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>AI interaction, prompt, output, and agent activity data</p>
                <p style={pStyle}>Because Miraee uses agentic AI systems, we may collect and process information about interactions with those systems. AI interaction records may include user-visible prompts, inputs, uploaded content, outputs, confirmations, recommendations, action logs, tool-use events, and related metadata. They generally do not include internal model reasoning, hidden chain-of-thought, proprietary system prompts, internal safety rules, security classifiers, or debugging traces, which may not be retained, may not be attributable to a specific individual, or may be withheld where permitted by law to protect security, confidentiality, trade secrets, or the rights of others.</p>
                <p style={pStyle}>We may also process agent activity data, such as workflow steps, tool calls, system events, approval requests, booking attempts, cancellations, modifications, exceptions, escalations, error messages, confidence signals, ambiguity flags, clarification requests, user confirmations, and feedback about AI recommendations or actions. This information helps us operate the Services, support users, maintain auditability, improve reliability, and investigate issues.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Behavioral, preference, and inferred information</p>
                <p style={pStyle}>We may collect or infer information about preferences and patterns based on your use of the Services. This may include preferred airports, routes, airlines, hotels, seating, timing, loyalty programs, sustainability preferences, accommodation preferences, budget sensitivity, booking windows, change behavior, approval paths, likely travel needs, predicted destinations, policy-compliance signals, fraud or anomaly signals, expense categorization signals, product usage patterns, feature engagement, and support patterns.</p>
                <p style={pStyle}>We use these inferences to operate, personalize, secure, and improve the Services, subject to applicable law and Customer configurations. Where inferences are used for profiling, fraud detection, policy enforcement, travel approval, expense review, anomaly detection, or other decisions that may materially affect a user, Miraee or the applicable Customer will provide notices, controls, review rights, opt-out rights, or other safeguards where required by law. Inferences may be inaccurate or incomplete, and users may have rights to correct underlying profile information or contest certain decisions where applicable.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Communications and support information</p>
                <p style={pStyle}>When you contact us, we may collect information such as support messages, emails, calls, chat transcripts, issue descriptions, screenshots, attachments, troubleshooting information, survey responses, feedback, product suggestions, and event registration information. Where legally permitted and disclosed, we may record or transcribe support calls or other communications for quality, training, compliance, security, or operational purposes.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Information from third parties and integrations</p>
                <p style={pStyle}>To help us maintain accurate traveler profiles, complete bookings, operate approvals and workflows, reconcile payments or expenses, support integrations, prevent fraud, and coordinate travel activity across systems, we may receive information from Customers, Authorized Users, travel arrangers, assistants, approvers, managers, companions, travel providers, travel agencies, global distribution systems, travel aggregators, payment processors, corporate card providers, expense systems, banks, reimbursement providers, identity providers, HR systems, calendar systems, email systems, messaging systems, collaboration tools, enterprise software integrations, fraud prevention providers, identity verification providers, security providers, sanctions screening providers, compliance providers, public sources, business partners, event organizers, and marketing providers.</p>
                <p style={pStyle}>If you provide Personal Information about another person, you must have authority to do so and to permit Miraee to process that information for the relevant purpose.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Connected email, calendar, and collaboration accounts</p>
                <p style={pStyle}>If you choose, or a Customer enables you, to connect to an email, calendar, messaging, collaboration, or similar account, Miraee may process information from that account to identify travel-related content, calendar constraints, meeting locations, itinerary changes, approval needs, receipts, or expense information. Miraee will process connected-account information only within the permissions granted, Customer configuration, applicable agreements, and applicable law. Depending on the integration, Miraee may access message metadata, calendar metadata, attachments, receipt content, itinerary content, meeting locations, sender/recipient information, timestamps, or other content necessary to provide the enabled feature. Miraee does not intend to use connected-account content unrelated to the Services, and where feasible, Miraee uses filtering, minimization, or configuration controls designed to limit processing to travel, expense, approval, support, or workflow-related purposes. Users or Customers may be able to disconnect integrations or modify permissions, but information already used to create bookings, records, audit logs, expense workflows, or legal records may be retained as described in this Privacy Policy.</p>
            </>
        ),
    },
    {
        id: "p-6", num: "6", title: "How We Use Personal Information",
        body: (
            <>
                <p style={pStyle}>We use Personal Information to provide, operate, secure, improve, and support the Services; to communicate with Customers, Authorized Users, Individual Users, and other individuals; to comply with legal obligations; and to carry out the purposes described in this Privacy Policy.</p>
                <p style={pStyle}>Where we process Personal Information on behalf of a Customer, we use that information in accordance with the Customer’s instructions, applicable agreements, and applicable law. Where we process Personal Information for our own purposes, we do so as described below.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Services provided to Customers and Authorized Users</p>
                <p style={pStyle}>When Miraee provides the Services to a Customer, we use Personal Information to enable the Customer and its Authorized Users to search, plan, book, modify, support, manage, optimize, approve, and reconcile business travel and related workflows. This includes administering accounts, maintaining traveler profiles, supporting travel reservations, processing payment and expense workflows where applicable, providing support, applying Customer policies, routing approvals, generating reports, supporting duty-of-care features, preventing fraud, providing AI-assisted recommendations, and enabling agentic task execution.</p>
                <p style={pStyle}>We also use Personal Information to authenticate users, enforce permissions, send confirmations and travel updates, provide disruption notices, issue reminders, support administrative controls, and help Customers understand travel activity, spend, compliance, and operational risk.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Services provided to Individual Users</p>
                <p style={pStyle}>Where Miraee provides Services directly to Individual Users, we use Personal Information to create and maintain accounts, provide travel search and booking functionality, process payments where applicable, deliver support, personalize the Services, communicate about travel and service updates, secure the Services, detect fraud or misuse, and comply with legal obligations.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Limited use of Transaction Data</p>
                <p style={pStyle}>Notwithstanding anything to the contrary in this Privacy Policy, Miraee’s Terms of Use, or other general privacy terms, Miraee and its service providers will use Transaction Data solely for the applicable Card Network-approved permitted use case and related purposes, including to identify relevant business transactions, create and maintain records of Transaction Data, operate the Platform, provide business travel, expense management, reconciliation, card monitoring, reporting, audit, compliance, and spend management services, prevent fraud or misuse, maintain security, and comply with applicable law and lawful requests.</p>
                <p style={pStyle}>Miraee and its service providers may also use Transaction Data to provide information in order to respond to a request from a governmental authority, regulator, law enforcement agency, court, payment organization, Card Network, issuer, acquirer, processor, merchant, or other payment organization involved in a transaction with you or a merchant. Users authorize the sharing, exchange, and use of Transaction Data as described in this Privacy Policy among Miraee, its service providers, applicable Users, and applicable Card Networks for these purposes.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Agentic AI task execution</p>
                <p style={pStyle}>We use Personal Information and Customer contextual data to enable Miraee’s AI agents to perform autonomous and semi-autonomous tasks in connection with the Services. This may include interpreting instructions from users and Customers, evaluating whether requested travel is consistent with applicable policies and budgets, identifying available options and relevant tradeoffs, and recommending or selecting travel options within configured parameters.</p>
                <p style={pStyle}>Miraee’s AI agents may also initiate approval workflows, execute bookings, changes, cancellations, support requests, expense submissions, or other permitted actions, and escalate matters that are ambiguous, high-risk, out-of-policy, high-cost, or otherwise restricted. We may also use Personal Information and Customer contextual data to generate explanations, summaries, alerts, confirmations, and audit records related to these activities.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Personalization and optimization</p>
                <p style={pStyle}>We use Personal Information to personalize and optimize the Services, including by tailoring travel search results, recommendations, workflows, support interactions, and alerts to the relevant user, Customer configuration, and travel context. For example, Miraee may use Personal Information to rank travel options, remember travel preferences, suggest lower-cost or more convenient alternatives, reduce repetitive user input, identify likely travel needs, and tailor support responses or travel alerts.</p>
                <p style={pStyle}>Where applicable, Miraee may also use Personal Information to optimize travel recommendations and workflows based on Customer-configured priorities, such as policy compliance, budget, timing, loyalty program preferences, disruption avoidance, sustainability preferences, approval requirements, or other travel-management criteria. These personalization and optimization activities are designed to support more relevant, efficient, and policy-aware travel experiences, subject to applicable law, Customer instructions, and available user or administrator controls.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Fraud, security, abuse, and anomaly detection</p>
                <p style={pStyle}>We use Personal Information, including through AI and automated tools, to help protect the security, integrity, and proper operation of the Services. This may include detecting, preventing, and investigating fraud, account takeover, unauthorized access, suspicious transactions, duplicate or unusual bookings, policy abuse, payment anomalies, security threats, and other potentially unlawful or unauthorized activity.</p>
                <p style={pStyle}>We may also use Personal Information to detect and prevent misuse of Miraee’s AI agents and automated workflows, including attempts to manipulate agent behavior, bypass Customer policies or Platform safeguards, use unauthorized tools or integrations, or cause agents to take actions outside their permitted scope. These activities may involve monitoring system activity, reviewing relevant prompts, outputs, workflow events, access logs, transaction data, and other security or operational signals.</p>
                <p style={pStyle}>We use this information to investigate incidents, enforce our agreements, policies, and acceptable use rules, maintain audit logs, preserve system integrity, and support the safety and reliability of the Services.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Product development, analytics, and service improvement</p>
                <p style={pStyle}>We may use Personal Information to operate, maintain, evaluate, and improve the Services. This may include using information to debug and test functionality, assess product performance, measure feature adoption, evaluate support quality, monitor system reliability, and identify opportunities to improve the user and Customer experience.</p>
                <p style={pStyle}>We may also use Personal Information to improve the performance, safety, and reliability of Miraee’s AI agents and automated workflows, including by evaluating agent accuracy, routing, guardrails, escalation behavior, and the quality of recommendations, outputs, and actions. Where appropriate, we may use this information to develop new features, models, workflows, integrations, and service capabilities. Miraee does not use Customer-controlled content, prompts, travel records, payment information, passport information, connected-account content, or support content to train general-purpose AI models unless the applicable Customer or user expressly authorizes that use.</p>
                <p style={pStyle}>We may also use Personal Information to generate aggregated, de-identified, or anonymized analytics, insights, and benchmarks. When we do so, we take steps designed to prevent the resulting information from identifying a specific individual, subject to applicable law and our contractual commitments.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>AI model improvement, training, and fine-tuning</p>
                <p style={pStyle}>Miraee may use Personal Information of Customers and Authorized Users to improve or fine-tune customer-specific models or agent behavior only as instructed by the Customer or as permitted in the applicable agreement. Miraee does not permit third-party model providers to train their general-purpose models on Personal Information of Customers or Authorized Users unless expressly authorized by the Customer or user.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Legal, compliance, and business purposes</p>
                <p style={pStyle}>We may use Personal Information as necessary to comply with applicable laws, regulations, legal processes, and regulatory obligations, including obligations relating to sanctions, tax, accounting, anti-fraud, travel, immigration, payments, financial compliance, and recordkeeping. We may also use Personal Information to respond to lawful requests from regulators, courts, law enforcement agencies, public authorities, or other governmental bodies.</p>
                <p style={pStyle}>In addition, we may use Personal Information to enforce our contracts, terms, policies, and other legal rights, including to collect amounts owed, resolve disputes, conduct audits, perform risk assessments, carry out compliance reviews, and support internal investigations. We may also use Personal Information where we believe it is necessary or appropriate to protect the rights, safety, privacy, property, or security of Miraee, our Customers, users, service providers, business partners, or others.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Marketing and events</p>
                <p style={pStyle}>Where permitted by law, we may use business contact information, website usage data, event information, and marketing preferences to send product updates, event invitations, newsletters, surveys, and other communications. You may opt out of marketing communications at any time. We may still send transactional, security, administrative, travel, legal, or service-related communications.</p>
            </>
        ),
    },
    {
        id: "p-7", num: "7", title: "Legal Bases for Processing",
        body: (
            <>
                <p style={pStyle}>Where GDPR or similar data protection legislation applies, our legal bases may include performance of a contract, compliance with legal obligations, consent, legitimate interests, protection of vital interests, or processing conducted on behalf of a Customer according to that Customer’s instructions.</p>
                <p style={pStyle}>For example, we may process Personal Information to perform a contract when we provide requested travel services, account functionality, support, or booking workflows. We may rely on legitimate interests to secure, operate, improve, and support the Services; prevent fraud; generate business analytics; and communicate with Customers and users, provided those interests are not overridden by your rights and interests. We rely on consent where required, such as for certain cookies, marketing communications, optional sensitive profile fields, or certain connected-account permissions. We may process information to comply with legal obligations, such as tax, accounting, sanctions, payment, recordkeeping, travel, or regulatory requirements. We may also process information to protect vital interests, such as in urgent duty-of-care situations involving traveler safety.</p>
                <p style={pStyle}>Where we process sensitive or special category data, we rely on an applicable legal basis and condition, such as explicit consent, substantial public interest where applicable, legal claims, vital interests, or processing necessary to provide travel services requested by the user, depending on the circumstances.</p>
            </>
        ),
    },
    {
        id: "p-8", num: "8", title: "Automated Decisions, Human Review, and Meaningful Effects",
        body: (
            <>
                <p style={pStyle}>Miraee’s Services may use automated processing, including AI, to generate recommendations, prioritize travel options, flag anomalies, route approvals, or execute actions within configured parameters. In many cases, these activities support ordinary travel operations and do not produce legal or similarly significant effects.</p>
                <p style={pStyle}>Some automated or semi-automated processing may have a more meaningful impact. For example, automated systems may deny or block a travel request under Customer policy, route a matter to enhanced review, flag suspected fraud or misuse, prevent a payment or expense submission, or surface information to a Customer administrator. Where required by law, Miraee or the applicable Customer will provide appropriate notices, safeguards, and rights. These may include the ability to request human review, express a point of view, contest a decision, or opt out of certain automated decision-making uses.</p>
                <p style={pStyle}>Where a Customer configures policies, budgets, approvals, permissible actions, or consequences, the Customer is generally responsible for determining whether a decision has a meaningful effect and whether human review is required. Miraee provides tools that can support configuration, review, auditability, and escalation.</p>
                <p style={pStyle}>Miraee may provide controls that allow Customers to require human review for specified actions, including international bookings, non-refundable or non-changeable travel, bookings above configured price thresholds, out-of-policy travel, travel to higher-risk destinations, approval exceptions, payment or reimbursement actions above configured limits, and actions involving conflicting instructions or low-confidence agent determinations.</p>
                <p style={pStyle}>Miraee designs its AI agents to operate with safeguards, but AI systems can produce inaccurate, incomplete, unexpected, outdated, or contextually inappropriate outputs. Miraee does not represent that AI recommendations, outputs, or actions will be error-free, uninterrupted, or identical across model versions. Users and Customers remain responsible for providing accurate information, reviewing important outputs where appropriate, and configuring available guardrails for high-consequence actions.</p>
            </>
        ),
    },
    {
        id: "p-9", num: "9", title: "How We Disclose Personal Information",
        body: (
            <>
                <p style={pStyle}>We disclose Personal Information as necessary to provide the Services, operate our business, comply with applicable laws and regulations, and fulfill the purposes described in this Privacy Policy.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Customers and their Authorized Representatives</p>
                <p style={pStyle}>If you use Miraee as an Authorized User, we may disclose Personal Information to the Customer or organization that authorized your access, and to its authorized representatives. These may include administrators, approvers, travel managers, finance personnel, security personnel, HR personnel, procurement personnel, duty-of-care teams, or other personnel designated by the Customer.</p>
                <p style={pStyle}>The information disclosed may include business travel bookings and itinerary details, travel status and location inferred from itinerary, business travel preferences, policy compliance information, approval and exception history, expense, payment, reimbursement and billing information, agent instructions, recommendations, action logs, confirmations, audit trails, support interactions related to Customer travel, security or fraud signals, and information needed to administer accounts, permissions, policies, and workflows.</p>
                <p style={pStyle}>A Customer’s use of Personal Information is governed by that Customer’s own privacy notices, employment policies, travel policies, internal procedures, and applicable agreements.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Travel providers and travel infrastructure</p>
                <p style={pStyle}>We disclose Personal Information to travel providers and intermediaries as needed to search, book, manage, support, modify, or cancel travel. These recipients may include airlines, hotels, rail providers, car rental companies, ground transportation providers, travel agencies, tour operators, travel aggregators, global distribution systems, reservation platforms, ticketing providers, fulfillment providers, refund providers, disruption management providers, traveler support providers, visa providers, immigration support providers, travel-document providers, and travel-risk providers.</p>
                <p style={pStyle}>These third parties may act as independent controllers or businesses for their own processing. Their privacy practices may apply to information they receive.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>AI model, infrastructure, and technology providers</p>
                <p style={pStyle}>We may disclose Personal Information to service providers, sub-processors, and technology vendors that help operate Miraee’s AI workflows. These may include AI model providers, model orchestration providers, evaluation and safety providers, observability providers, cloud infrastructure providers, hosting providers, vector database providers, search providers, logging providers, analytics providers, data-processing providers, speech-to-text providers, text-to-speech providers, translation providers, document-parsing providers, summarization providers, security providers, abuse-detection providers, and monitoring providers.</p>
                <p style={pStyle}>We use contractual, technical, and organizational safeguards designed to restrict these providers from using Personal Information except as authorized by Miraee and applicable Customer agreements. Where appropriate, we require sub-processors to apply confidentiality, security, retention, access-control, and transfer safeguards.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Enterprise integrations and downstream systems</p>
                <p style={pStyle}>At the direction of Authorized Users or Customers, we may disclose information to, or receive information from, integrated systems. These may include HR information systems, identity providers, single sign-on tools, calendar tools, email tools, messaging tools, expense management systems, corporate card systems, payment systems, procurement systems, finance systems, ERP systems, accounting systems, risk systems, safety systems, duty-of-care systems, approval workflow systems, and ticketing systems.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Card networks and service providers</p>
                <p style={pStyle}>Where card monitoring or spend management functionality is enabled, Miraee may disclose card enrollment information, card identifiers, card tokens, and related account or enrollment metadata to its service providers and applicable Card Networks, so they know that a card has been enrolled in, and participates in, the Miraee travel and spend management program. Miraee may receive Transaction Data from Card Networks through its service providers and may disclose Transaction Data among Miraee, the applicable Customer, the service providers, and Card Networks, as necessary for the limited purposes described in this Privacy Policy.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Transaction monitoring authorization</p>
                <p style={pStyle}>By registering or enrolling a payment card, Users authorize Miraee to share payment card information with Miraee’s service providers and the applicable Card Networks. Users also authorize the applicable Card Networks to access, monitor, and share transactions on a Registered Payment Card with Miraee and its service providers to enable participation in the Services.</p>
                <p style={pStyle}>Miraee’s service providers and the Card Networks may monitor transactions made with a Registered Payment Card for business spend management, expense management, reconciliation, and related services. Transaction information received through this process may be used by Miraee, including through AI-enabled features, to provide and to support the Services.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Service providers and professional advisers</p>
                <p style={pStyle}>We may disclose Personal Information to vendors and advisers that provide services such as hosting, customer support, payment processing, billing, analytics, security, fraud detection, identity verification, email delivery, marketing operations, auditing, legal, accounting, and consulting services.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Legal, safety, and compliance disclosures</p>
                <p style={pStyle}>We may disclose Personal Information where we believe it is necessary or appropriate to comply with law, legal process, or government requests; enforce agreements and policies; protect rights, safety, privacy, property, or security; detect, prevent, or investigate fraud, abuse, cyberattacks, or unauthorized activity; respond to emergencies or traveler safety issues; or comply with travel, payment, sanctions, tax, accounting, or regulatory obligations.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Corporate Transactions</p>
                <p style={pStyle}>We may disclose or transfer Personal Information in connection with a merger, acquisition, financing, reorganization, bankruptcy, sale of assets, or similar corporate transaction.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Aggregated or de-identified information</p>
                <p style={pStyle}>We may use and disclose aggregated, de-identified, or anonymized information where it no longer identifies and cannot reasonably be used to identify an individual, subject to applicable law and contractual commitments. We maintain and use de-identified information in de-identified form and do not attempt to re-identify it except as permitted by law.</p>
            </>
        ),
    },
    {
        id: "p-10", num: "10", title: "AI-Specific Safeguards, Reliability, and Risk Management",
        body: (
            <>
                <p style={pStyle}>Miraee uses technical and organizational safeguards designed to reduce AI-related risks. These safeguards may include role-based permissions, Customer-configured policy controls, spending limits, approval workflows, human-review triggers, audit logs, agent-action monitoring, system-event monitoring, testing, evaluation, quality assurance, tool-access restrictions, safeguards against prompt injection and data exfiltration, clarification prompts, escalation pathways, security reviews, sub-processor reviews, and incident response processes.</p>
                <p style={pStyle}>These safeguards are designed to reduce the risk of unauthorized actions, model misuse, hallucinated outputs, unsafe tool use, policy circumvention, and unintended behavior. They do not eliminate all risk. AI outputs may be inaccurate, incomplete, delayed, inconsistent, or inappropriate for a particular context. Miraee’s AI agents may rely on information retrieved from third-party systems, Card Networks, travel providers, payment providers, Customer systems, and other integrations. The accuracy, timeliness, availability, and completeness of that information may affect recommendations, outputs, actions, and outcomes.</p>
                <p style={pStyle}>Travel provider inventory, prices, rules, cancellation terms, refundability, and availability may change quickly. Actions such as bookings, cancellations, card charges, ticket issuance, or expense submissions may be difficult or impossible to reverse once completed through third-party systems.</p>
                <p style={pStyle}>Miraee will use reasonable efforts to support correction, cancellation, refund, or remediation where technically and operationally feasible. Outcomes may depend on travel providers, payment providers, Customer systems, and applicable fare, supplier, or contract rules.</p>
            </>
        ),
    },
    {
        id: "p-11", num: "11", title: "Data Retention",
        body: (
            <>
                <p style={pStyle}>We retain Personal Information for as long as necessary to provide the Services, comply with legal obligations, resolve disputes, enforce agreements, maintain security, support audits, and fulfill the purposes described in this Privacy Policy.</p>
                <p style={pStyle}>Retention periods vary depending on the type of information, whether the information is Customer-controlled data, Customer-configured retention settings, legal and regulatory requirements, tax and accounting obligations, travel and payment recordkeeping needs, audit requirements, security and fraud-prevention needs, and the need to maintain booking, expense, approval, and agent-action records.</p>
                <p style={pStyle}>We may retain prompts, outputs, recommendations, agent action logs, tool-use logs, clarification requests, approvals, escalations, and related metadata to provide user and Customer support, maintain auditability, investigate errors or disputes, improve safety and reliability, debug the Services, conduct quality assurance, and comply with legal, contractual, and security obligations.</p>
                <p style={pStyle}>Where data is used for AI improvement, training, evaluation, or fine-tuning, retention will depend on the applicable Customer agreement, user choices, product configuration, and legal requirements. Miraee may use de-identified, aggregated, or synthetic data to improve the Services, where permitted.</p>
                <p style={pStyle}>When Personal Information is deleted, it may persist for a limited period in backups, logs, security archives, or legally required records before being deleted or overwritten according to our retention practices.</p>
            </>
        ),
    },
    {
        id: "p-12", num: "12", title: "Your Rights and Choices",
        body: (
            <>
                <p style={pStyle}>Depending on your location, relationship with Miraee, and applicable law, you may have rights to access Personal Information, receive a copy of Personal Information, correct inaccurate information, delete information, restrict or object to processing, withdraw consent, opt out of certain marketing communications, opt out of certain cookies or targeted advertising, request portability, appeal a denied privacy request, opt out of certain automated decision-making or profiling where required by law, or request information about certain automated decisions or request human review where required by law.</p>
                <p style={pStyle}>Users may exercise privacy rights by contacting us at privacy@miraee.ai or through available account settings. We may need to verify your identity before processing a request. Users also may opt out of card transaction monitoring at any time by accessing Miraee account settings and deleting the Registered Payment Card. If a card was enrolled through a Customer-administered configuration and it cannot be deleted directly, contact the Customer administrator or Miraee support through the available account or support channels to request deletion. Monitoring of that Registered Payment Card will stop immediately upon deletion, although Miraee may retain and use Transaction Data received before deletion as described in this Privacy Policy, the applicable Customer agreement, and applicable law.</p>
                <p style={pStyle}>If you use the Services as an Authorized User, the Customer that authorized your access may be responsible for responding to certain privacy requests, particularly where Miraee processes your Personal Information on the Customer’s behalf. In those cases, we may refer your request to the Customer or process it according to the Customer’s instructions and applicable law.</p>
                <p style={pStyle}>Where available and applicable, Customers, Authorized Users, or Individual Users may be able to review and edit traveler profile information used by AI agents, correct preferences or inferred information, delete certain prompts or saved preferences, limit personalization, require confirmation before specified agent actions, opt out of certain AI-driven recommendations or training uses where feasible and legally required, configure human-review thresholds, restrict connected-account access, and review agent activity logs or approvals.</p>
                <p style={pStyle}>Some controls may be available only to Customers or Customer administrators. Some AI functionality may be necessary to provide the Services, comply with Customer instructions, maintain audit logs, prevent fraud, or satisfy legal obligations. Opting out of certain AI features may limit functionality, automation, personalization, or support quality.</p>
                <p style={pStyle}>You may unsubscribe from marketing emails by using the unsubscribe link in those emails or by contacting us. You may still receive service, security, travel, legal, or administrative communications. You can manage cookies through our Cookie Notice, browser settings, and platform controls, though some cookies are necessary for the Services to operate.</p>
            </>
        ),
    },
    {
        id: "p-13", num: "13", title: "U.S. State Privacy Disclosures",
        body: (
            <>
                <p style={pStyle}>Certain U.S. state privacy laws may provide additional rights. Depending on your state and our role, these rights may include access, deletion, correction, portability, opt-out of sale or sharing, opt-out of targeted advertising, opt-out of certain profiling or automated decision-making, limitation of sensitive information use, and appeal.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Categories of Personal Information collected</p>
                <p style={pStyle}>In the preceding twelve (12) months, we may have collected the following categories of Personal Information: identifiers, such as name, email, phone number, account ID, employee ID, IP address, and device identifiers; customer records information, such as billing, payment, travel document, and account information; protected classification information where required for travel or voluntarily provided, such as gender marker or accessibility-related information; commercial information, such as bookings, transactions, expenses, and travel preferences; internet or electronic network activity, such as log data, usage data, and interaction data; geolocation information, such as approximate location or itinerary-based location; audio, electronic, visual, or similar information, such as support recordings, uploaded images, or chat content; professional or employment-related information, such as employer, department, job title, manager, cost center, or approval role; inferences, such as travel preferences, predicted needs, policy-compliance signals, and risk or anomaly indicators; and sensitive Personal Information, such as passport information, government identification information, account credentials, precise geolocation if enabled, health or accessibility requests, dietary preferences, or other travel-related sensitive information.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Sale, sharing, and targeted advertising</p>
                <p style={pStyle}>Miraee does not sell Personal Information for money. Data processed in the Services is not sold or shared for cross-context behavioral advertising.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Sensitive Personal Information</p>
                <p style={pStyle}>We use sensitive Personal Information only as reasonably necessary to provide the Services, comply with law, ensure security, support travel arrangements, or as otherwise permitted by law, unless we provide additional notice and obtain consent where required.</p>
                <p style={{ ...pStyle, ...bStyle, margin: "20px 0 8px" }}>Authorized agents</p>
                <p style={pStyle}>Where permitted by law, you may designate an authorized agent to submit a privacy request on your behalf. We may require proof of authorization and identity verification.</p>
            </>
        ),
    },
    {
        id: "p-14", num: "14", title: "International Data Transfers",
        body: (
            <>
                <p style={pStyle}>Miraee operates globally and may process Personal Information in countries other than where you live or work, including the United States and other jurisdictions where Miraee, its affiliates, service providers, AI model providers, cloud providers, travel providers, or sub-processors operate.</p>
                <p style={pStyle}>Where required, we use appropriate safeguards for cross-border transfers, such as adequacy decisions, Standard Contractual Clauses, the UK International Data Transfer Addendum, data processing agreements, contractual commitments, supplementary measures, or other lawful transfer mechanisms.</p>
                <p style={pStyle}>These safeguards apply to AI sub-processors and model-hosting environments where they process Personal Information.</p>
            </>
        ),
    },
    {
        id: "p-15", num: "15", title: "Security",
        body: (
            <>
                <p style={pStyle}>Miraee maintains technical, organizational, and administrative safeguards designed to protect Personal Information. These may include encryption, access controls, authentication, monitoring, logging, vulnerability management, incident response, vendor reviews, and employee training. Because Miraee’s Services involve agentic AI workflows, we also apply safeguards designed to reduce risks of unauthorized actions, model misuse, prompt injection, hallucinated outputs, unsafe tool use, and policy circumvention. These safeguards may include tool-access restrictions, approval workflows, anomaly detection, audit logging, model and workflow evaluation, human-escalation pathways, and monitoring of agent behavior.</p>
                <p style={pStyle}>Importantly, no security measure, data transmission, storage system, AI system, or third-party integration can be guaranteed to be completely secure or error-free.</p>
            </>
        ),
    },
    {
        id: "p-16", num: "16", title: "Third-Party Websites, Services, and Integrations",
        body: (
            <>
                <p style={pStyle}>The Services may link to or integrate with third-party websites, applications, providers, systems, APIs, and services. This Privacy Policy does not apply to the privacy practices of third parties that act independently from Miraee.</p>
                <p style={pStyle}>Travel providers, global distribution systems, payment providers, Customer software providers, AI model providers, cloud providers, and other third parties may process Personal Information under their own privacy policies and legal obligations. We encourage you to review their privacy notices.</p>
            </>
        ),
    },
    {
        id: "p-17", num: "17", title: "Sensitive Information",
        body: (
            <>
                <p style={pStyle}>Unless we request it or it is necessary for the Services, we ask that you not send us or disclose sensitive Personal Information through the Services or website.</p>
                <p style={pStyle}>To provide certain travel-related features, we may process information that is considered sensitive or special category data under applicable law. For example, meal preferences may reveal religious beliefs or health information, accessibility requests may reveal disability or medical information, passport or visa information may reveal nationality, and itinerary information may reveal precise travel patterns. Where required, we collect or process this information with consent or another legally permitted basis.</p>
                <p style={pStyle}>You may be able to remove certain optional sensitive information from your profile or request that it be corrected or deleted, subject to Customer instructions, legal obligations, travel provider requirements, and retention rules.</p>
            </>
        ),
    },
    {
        id: "p-18", num: "18", title: "Children and Eligibility",
        body: (
            <>
                <p style={pStyle}>The Services are intended for business use and are not directed to children. You may use the Platform only if you are at least 18 years old, legally able to enter into the applicable Terms of Use, and authorized to use the Platform.</p>
                <p style={pStyle}>Miraee does not knowingly collect Personal Information from children under 13 without verifiable parental consent or other legally sufficient authorization. If we learn that we have collected Personal Information from a child under 13 without the required authorization, we will take steps to delete the information as required by applicable law.</p>
                <p style={pStyle}>If we learn that a user under 18 has accessed or used the Services without authorization, we may disable the account, limit access, and delete or retain Personal Information as appropriate under applicable law, Customer instructions, legal obligations, and our retention practices.</p>
            </>
        ),
    },
    {
        id: "p-19", num: "19", title: "Changes to This Privacy Policy",
        body: (
            <>
                <p style={pStyle}>We may update this Privacy Policy from time to time to reflect changes in our Services, AI functionality, data practices, legal requirements, or business operations. The “Last Updated” date indicates when this Privacy Policy was last revised. Where required by law, we will provide notice of material changes.</p>
            </>
        ),
    },
    {
        id: "p-20", num: "20", title: "Contact Us",
        body: (
            <>
                <p style={pStyle}>If you have questions about this Privacy Policy or our privacy practices, contact us at:</p>
                <p style={pStyle}>Miraee, Inc.</p>
                <p style={pStyle}>10800 Pecan Park Blvd., Suite 400</p>
                <p style={pStyle}>Austin, Texas 78750</p>
                <p style={pStyle}>Email: <a href="mailto:privacy@miraee.ai" style={{ color: T.orange, fontWeight: 600 }}>privacy@miraee.ai</a></p>
                <p style={pStyle}>Please do not include payment card numbers, passport scans, government identification documents, or other sensitive information in email unless we specifically request it through a secure channel.</p>
            </>
        ),
    },
]

function Section({ s }: { s: typeof SECTIONS[0] }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-4% 0px" })
    return (
        <motion.div ref={ref} id={s.id} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: EO }}
            style={{ marginBottom: 36, scrollMarginTop: 100 }}>
            <h2 style={{ fontSize: 18, fontFamily: FH, fontWeight: 800, letterSpacing: "-0.005em", color: T.ink, margin: "0 0 12px", lineHeight: 1.35 }}>{s.num}. {s.title}</h2>
            {s.body}
        </motion.div>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function MiraeePrivacyPage(props: { style?: React.CSSProperties }) {
    usePageMeta("Miraee Privacy Policy", "How Miraee collects, uses, shares, retains and protects personal information across its travel platform and services.")
    const isNarrow = useVW() < 1024
    return (
        <div className="legal-page" style={{ position: "relative", width: "100%", minHeight: "100vh", background: T.bg, fontFamily: F, ...props.style }}>
            <a className="legacy-skip" href="#main">Skip to content</a>
            <SiteNav />
            <main id="main">
            {/* Document */}
            <div style={{ maxWidth: 880, margin: "0 auto", padding: isNarrow ? "110px 20px 72px" : "140px 24px 96px" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EO }} style={{ marginBottom: 40 }}>
                    <h1 style={{ fontSize: isNarrow ? "1.9rem" : "2.4rem", fontFamily: FH, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", color: T.ink, margin: "0 0 10px" }}>
                        Miraee Privacy Policy
                    </h1>
                    <p style={{ fontSize: 14, fontFamily: F, fontWeight: 600, color: T.muted, margin: 0 }}>Last Updated: 07/07/2026</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EO }} style={{ marginBottom: 44 }}>
                    <p style={pStyle}>Miraee, Inc. and its affiliates, subsidiaries, and related entities, collectively “Miraee,” “we,” “us,” or “our,” respect your privacy. This Privacy Policy explains how we collect, use, disclose, retain, and protect Personal Information in connection with our websites, platform, applications, AI agents, travel-management services, enterprise administration tools, support channels, APIs, integrations, communications, events, marketing activities, and related online and offline services, collectively, “Services.”</p>
                    <p style={pStyle}>Miraee provides an AI-native travel platform that helps companies, organizations, and individual users plan, search, book, modify, support, manage, optimize, approve, and reconcile travel and related workflows. The Services may include agentic artificial intelligence systems that can interpret instructions, retrieve information, make recommendations, coordinate workflows, interact with third-party systems, and take real-world actions within defined parameters. For example, Miraee’s AI agents may help book travel, modify itineraries, initiate approvals, surface policy exceptions, assist with support requests, process expense-related workflows, or escalate matters for human review.</p>
                    <p style={{ ...pStyle, margin: 0 }}>This Privacy Policy is intended to be read together with our Terms of Use, customer agreements, data processing addendum, product documentation, acceptable use terms, and any additional notices presented in the Services. For enterprise Customers, certain processing may be controlled by the Customer, such as an employer, sponsor, company, or other organization that makes the Services available to its users.</p>
                </motion.div>
                <details className="legal-toc">
                    <summary>On this page</summary>
                    <nav aria-label="Privacy sections">{SECTIONS.map(s => <a key={s.id} href={`#${s.id}`}>{s.num}. {s.title}</a>)}</nav>
                </details>
                {SECTIONS.map(s => <Section key={s.id} s={s} />)}
            </div>
            {/* CTA band */}
            <div style={{ background: T.maroon, padding: isNarrow ? "56px 20px" : "72px 48px" }}>
                <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" as const }}>
                    <h2 style={{ fontSize: isNarrow ? "1.7rem" : "2.2rem", fontFamily: FH, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", color: T.cream, margin: "0 0 24px" }}>
                        See where Miraee will take your company.
                    </h2>
                    <motion.a href="/book-a-demo" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        style={{ display: "inline-block", background: T.orange, color: "#fff", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontFamily: F, fontWeight: 700, textDecoration: "none" }}>
                        Book a demo
                    </motion.a>
                    <p style={{ fontSize: 12.5, fontFamily: F, color: "rgba(251,246,242,0.45)", margin: "28px 0 0" }}>© 2026 Miraee, a Tabhi company · <a href="mailto:privacy@miraee.ai" style={{ color: "rgba(251,246,242,0.7)", textDecoration: "none" }}>privacy@miraee.ai</a></p>
                </div>
            </div>
            </main>
            <SiteFooter />
        </div>
    )
}
