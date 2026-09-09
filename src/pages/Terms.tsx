import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { EO } from "../animations/easings"
import { T, F, FH, SiteNav, SiteFooter, useVW } from "../components/LegalFormKit"
import { usePageMeta } from "../hooks/usePageMeta"


const pStyle: React.CSSProperties = { fontSize: 15, fontFamily: F, lineHeight: 1.75, color: T.muted, margin: "0 0 16px" }
function LegalCaps({ children }: { children: React.ReactNode }) {
    return <p style={{ ...pStyle, fontSize: 14.5 }}>{children}</p>
}

const SECTIONS: { id: string; num: string; title: string; body: React.ReactNode }[] = [
    {
        id: "sec-1", num: "1", title: "The Platform",
        body: (
            <>
                <p style={pStyle}>Miraee provides software and related services to support travel search, trip planning, itinerary management, traveler profiles, approvals, communications, booking workflows, payments-related workflows, support workflows, and related travel operations. The Platform may also include AI-powered or automated features.</p>
                <p style={pStyle}>The Platform may facilitate access to flights, hotels, rail, car rental, tours, ground transportation, vacation rentals, and other travel-related services offered by third-party providers (“Travel Providers”). Unless expressly stated otherwise, Miraee is a technology and workflow provider and is not the provider of the underlying travel inventory or Travel Services. Travel Providers are solely responsible for the Travel Services they provide.</p>
            </>
        ),
    },
    {
        id: "sec-2", num: "2", title: "Eligibility and Accounts",
        body: (
            <>
                <p style={pStyle}>You may use the Platform only if you are legally able to enter into these Terms, are at least 18 years old, and are authorized to use the Platform. You must provide accurate, complete, and current information and keep your credentials secure.</p>
                <p style={pStyle}>Customers are responsible for managing authorized users, administrator permissions, policy settings, approval workflows, and access controls. Miraee may require identity verification, additional authentication, or other security measures before permitting access to certain features or transactions.</p>
            </>
        ),
    },
    {
        id: "sec-3", num: "3", title: "Traveler Information",
        body: (
            <>
                <p style={pStyle}>You are responsible for ensuring that all information submitted through the Platform is accurate, complete, current, and properly formatted, including traveler names, dates of birth, passport and visa information, loyalty details, payment information, contact information, emergency contacts, accessibility requests, trip classifications, and other information required for booking or compliance.</p>
                <p style={pStyle}>Miraee is not responsible for losses, delays, denied boarding, denied entry, failed or duplicate bookings, pricing discrepancies, missed travel, ticketing issues, change fees, cancellation charges, or similar consequences resulting from inaccurate, incomplete, stale, conflicting, or improperly entered information provided by you, a Customer, or a third party acting on your behalf.</p>
            </>
        ),
    },
    {
        id: "sec-4", num: "4", title: "Bookings and Travel Providers",
        body: (
            <>
                <p style={pStyle}>Travel inventory, prices, availability, fare rules, cancellation terms, and other travel content may change at any time without notice. Search results, quotes, itinerary drafts, recommendations, AI-generated content, policy indicators, and checkout screens are informational only and do not constitute a confirmed booking.</p>
                <p style={pStyle}>A booking is not confirmed unless and until the applicable Travel Provider, Miraee, or Miraee’s authorized fulfillment partner issues a confirmation number, reservation number, ticket number, or similar recognized confirmation.</p>
                <p style={pStyle}>All Travel Services are subject to the applicable terms and conditions of the relevant Travel Provider. By booking, requesting, managing, or using Travel Services, you agree to the applicable Travel Provider terms.</p>
            </>
        ),
    },
    {
        id: "sec-5", num: "5", title: "AI Features",
        body: (
            <>
                <p style={pStyle}>The Platform may include AI-enabled or automated features that generate recommendations, summaries, itinerary drafts, policy guidance, booking suggestions, rebooking proposals, communications, or other outputs (“AI Output”).</p>
                <p style={pStyle}>AI Output is provided for informational and operational assistance only. It may be incomplete, inaccurate, outdated, unavailable, inconsistent, or inappropriate for a particular situation, and may not reflect real-time inventory, pricing, supplier restrictions, legal requirements, travel disruptions, or Customer policy settings. You are responsible for reviewing all material details before relying on or acting on any AI Output.</p>
                <p style={pStyle}>Unless Miraee expressly agrees otherwise in writing, the Platform and its AI features do not provide legal, immigration, tax, accounting, insurance, medical, safety, security, employment, or regulatory advice. Miraee may update, replace, tune, or otherwise modify the AI models, prompts, ranking logic, automation logic, or other infrastructure used to provide AI features or Automated Actions at any time. Miraee will use reasonable efforts to maintain materially consistent core functionality, but does not warrant that AI Output, recommendations, or Automated Actions will be identical across model versions, updates, or releases.</p>
            </>
        ),
    },
    {
        id: "sec-6", num: "6", title: "Automated Actions",
        body: (
            <>
                <p style={pStyle}>If Miraee offers automated workflows, auto-booking, auto-cancellation, automatic rebooking, suggested approvals, chat-triggered workflows, or other autonomous or semi-autonomous functionality (“Automated Actions”), those Automated Actions may operate based on Customer configuration, delegated permissions, user instructions, system rules, thresholds, data inputs, and available third-party content.</p>
                <p style={pStyle}>Customers and users are responsible for: (i) configuring permissions, budgets, thresholds, approval workflows, connected-system permissions, and policy settings; (ii) maintaining accurate traveler profiles and payment methods; (iii) clearly defining the scope and boundaries for any authority delegated to Automated Actions; and (iv) reviewing confirmations and booking outcomes. Customers also are responsible for ensuring that authorized users provide complete, accurate, and non-conflicting instructions.</p>
                <p style={pStyle}>Miraee is not responsible for losses caused by Customer or user configurations, delegated permissions, policy settings, approval logic, data inputs, or ambiguous, contradictory or conflicting instructions, except to the extent caused by Miraee’s failure to execute configured workflows. Miraee may request clarification, confirmation, or additional information before executing an instruction that is ambiguous, incomplete, contradictory, or reasonably likely to result in incorrect, unauthorized, or non-compliant action. If a user or Customer elects to proceed without resolving the ambiguity flagged by the Platform, or confirms an interpretation presented by the Platform, the user and Customer shall be responsible for the resulting outcome to the extent it was caused by that ambiguity or confirmation. The Platform may use multiple internal automated processes, models, or agents in sequence or combination to generate outputs or perform Automated Actions. Any intermediate processing steps, routing decisions, recommendations, draft outputs, or internal agent-to-agent communications are part of an integrated system workflow and do not constitute independent representations, commitments, approvals, or final outputs to the Customer or user. Miraee’s liability will be based solely on the final output or Automated Action executed through the Platform. Customers shall be responsible for configuring appropriate human review and approval controls for high-consequence actions, including but not limited to international bookings, non-refundable or restricted transactions, approvals above Customer-defined thresholds, and any other categories designated by the Customer or reasonably identified in Miraee’s documentation or implementation guidance. If a Customer disables, relaxes, or bypasses available human review, approval, or escalation controls for such actions, Miraee will have no liability for resulting outcomes to the extent those controls would reasonably have prevented or mitigated the issue.</p>
            </>
        ),
    },
    {
        id: "sec-7", num: "7", title: "Review Obligations",
        body: (
            <>
                <p style={pStyle}>Before finalizing a booking, instruction, or transaction, and before relying on any AI Output or Automated Action, you are responsible for reviewing all material details, including traveler identity, dates, destinations, routing, supplier and fare selection, cancellation and refund rules, baggage and ancillary fees, payment details, passport and visa requirements, health and entry requirements, policy compliance, and checkout and confirmation details. The foregoing review obligations supplement, and do not limit, any Customer obligation to configure human review or approval controls under Section 6 for designated high-consequence actions.</p>
                <p style={pStyle}>If the Platform presents warnings, prompts, confirmations, or review notices, you must review and complete them carefully and truthfully.</p>
            </>
        ),
    },
    {
        id: "sec-8", num: "8", title: "Business Travel and Personal Travel",
        body: (
            <>
                <p style={pStyle}>The Platform may support both business travel and personal travel. Availability of personal travel features, rewards, billing options, support levels, approvals, expense treatment, and policy enforcement may depend on Customer settings, product plans, Travel Provider terms, and any applicable Enterprise Agreement.</p>
                <p style={pStyle}>Miraee is not responsible for disputes between a user and a Customer relating to reimbursement, compensation, payroll treatment, tax treatment, rewards eligibility, internal approvals, benefit treatment, policy compliance, or employment matters.</p>
            </>
        ),
    },
    {
        id: "sec-9", num: "9", title: "Payments, Changes, and Refunds",
        body: (
            <>
                <p style={pStyle}>Charges may apply at booking, ticketing, issuance, check-in, check-out, pickup, completion of service, or another time determined by the Travel Provider, payment flow, or Customer arrangement. Taxes, exchange rates, fees, surcharges, and ancillary charges may change. Some bookings may be non-refundable or subject to cancellation, reissue, exchange, no-show, or other fees.</p>
                <p style={pStyle}>Travel Providers, banks, card issuers, and payment processors may impose additional charges, including deposits, holds, verification charges, foreign transaction fees, cross-border fees, or currency conversion fees. Miraee may charge service fees, support fees, change fees, trip fees, subscription fees, or other fees where disclosed, contractually authorized, or presented through the Platform.</p>
                <p style={pStyle}>Cancellations, changes, exchanges, refunds, waivers, credits, and re-bookings are subject to Travel Provider terms, availability, booking status, applicable law, and any applicable Customer arrangement with Miraee. Miraee does not guarantee that any booking can be changed, canceled, refunded, credited, or rebooked. Customers and users must notify Miraee promptly after becoming aware of any suspected erroneous Automated Action and take reasonable steps to mitigate further harm.  If Miraee has been timely notified of an erroneous Automated Action, Miraee may use reasonable efforts to assist with cancellation, correction, reversal, rebooking, or other remediation so long as such action is technically and operationally feasible. However, Miraee does not guarantee that any such remediation will be available or successful and Miraee is not responsible for losses resulting from Travel Provider transactions, card charges, approvals, submissions, or other actions of third-party systems that are irreversible in nature and completed before a Customer has notified Miraee of the issue.</p>
            </>
        ),
    },
    {
        id: "sec-10", num: "10", title: "Payment Card Transaction Monitoring",
        body: (
            <>
                <p style={pStyle}>If Miraee makes payment-card transaction monitoring, spend management, expense management, card-linked services, or related workflows available through the Platform, the following additional terms apply to any payment card enrolled, registered, or otherwise connected to the Platform (each, a "Payment Card"). For purposes of this Section 10, "Payment Networks" means Visa, Mastercard, American Express, and any other card network supported by Miraee or its service providers for the applicable feature.</p>
                <p style={pStyle}>By enrolling, registering, or submitting a Payment Card, you authorize the applicable Payment Network to access, monitor, and share eligible transaction data for that Payment Card with Miraee, Astrada Technologies Limited (“Astrada”), and the applicable Customer for purposes of identifying relevant transactions, facilitating business spend management, expense management, travel management, reconciliation, reporting, support, compliance, and related Platform services. “Transaction Data” includes, without limitation, card number or tokenized card credentials, expiration date, transaction amount, transaction date and time, merchant name, merchant location, merchant category, authorization and clearing information, and other transaction details made available by the applicable Payment Network. You also represent and warrant that each Payment Card you enroll is used primarily for business purposes.</p>
                <p style={pStyle}>By enrolling, registering, or submitting a Payment Card, you consent to Astrada processing Payment Card and Transaction Data and acknowledge that Miraee will process Transaction Data received from the Payment Networks through Astrada in accordance with these Terms and Miraee's Privacy Policy.</p>
                <p style={pStyle}>You acknowledge that Miraee, the Payment Networks, and Astrada may be unable to monitor every transaction made with an enrolled Payment Card. Examples of transactions that may not be monitored include balance transfers, payments of existing balances, transactions not processed or submitted through Visa, Mastercard, American Express, or another supported Payment Network, and other transactions outside Astrada’s or Miraee's product coverage. Not all cards are eligible for enrollment. Ineligible cards may include government-administered prepaid cards, EBT cards, healthcare cards (including HSA or FSA cards), insurance prepaid cards, consumer debit cards, consumer prepaid cards, cards not used primarily for business purposes, and any other card type that Miraee, Astrada, or the applicable Payment Network does not support.</p>
                <p style={pStyle}>You may opt out of Payment Card transaction monitoring at any time by accessing your Miraee account settings and deleting the registered Payment Card, using any card-removal workflow made available in the Platform, or contacting Miraee or the applicable Customer administrator for assistance where self-service deletion is not available. Upon deletion of a registered Payment Card, transaction monitoring for future transactions on that Payment Card will cease immediately for the applicable Miraee program. Deletion of a Payment Card does not require Miraee, Astrada, the applicable Customer, or the Payment Networks to delete or stop processing Transaction Data collected before deletion, which may be retained and processed in accordance with applicable law, these Terms, Miraee’s Privacy Policy, Astrada’s Privacy Policy, applicable Customer instructions, and legal, compliance, fraud-prevention, security, audit, and recordkeeping obligations.</p>
                <p style={pStyle}>For Payment Cards enrolled through corporate-led or bulk enrollment, the Customer and any administrator submitting Payment Card information represent, warrant, and certify that they have provided all legally required notices and obtained prior written consent, as recognized under applicable law, from each employee, cardholder, or other authorized user whose Payment Card is enrolled. Miraee may request proof of such consent. Employees, cardholders, and authorized users acknowledge that their employer or Customer has obtained the required consent authorizing Payment Networks to access and share Transaction Data with Astrada, Miraee, and the applicable Customer to facilitate participation in the Platform and related spend management services. Any such consent remains subject to the opt-out and card deletion rights described above.</p>
            </>
        ),
    },
    {
        id: "sec-11", num: "11", title: "International Travel and Compliance",
        body: (
            <>
                <p style={pStyle}>You are solely responsible for satisfying all passport, visa, entry, exit, transit, customs, immigration, health, vaccination, and other requirements applicable to your itinerary. Miraee is not liable for denied boarding, denied entry, delays, fines, penalties, quarantine, missed travel, deportation, or other consequences arising from your failure to satisfy applicable requirements or from reliance on incomplete or inaccurate third-party information.</p>
                <p style={pStyle}>You may not use the Platform or Travel Services in violation of applicable law, including laws relating to sanctions, export controls, anti-bribery, anti-corruption, anti-money laundering, privacy, consumer protection, transportation security, or fraud. Miraee may investigate suspicious activity and suspend or cancel accounts, access, bookings, or transactions where reasonably necessary to comply with law, protect any person, prevent fraud, or mitigate security or operational risk.</p>
            </>
        ),
    },
    {
        id: "sec-12", num: "12", title: "Acceptable Use",
        body: (
            <p style={pStyle}>You may not make speculative, false, abusive, or fraudulent bookings; scrape, crawl, mirror, frame, deep-link, harvest, or extract Platform content or data without authorization; use the Platform or its outputs to train or improve competing products or unauthorized AI systems; reverse engineer the Platform except as prohibited by law; interfere with Platform integrity, availability, or security; upload malicious code; attempt unauthorized access to Platform or user data; use prompt injection or adversarial extraction techniques to bypass safeguards; or impersonate another person or misrepresent identity, affiliation, authority, or travel purpose.</p>
        ),
    },
    {
        id: "sec-13", num: "13", title: "User Content and Data",
        body: (
            <>
                <p style={pStyle}>You retain your rights in content you submit through the Platform, subject to the rights of any applicable Customer, employer, Travel Provider, or other third party. You grant Miraee and its service providers a non-exclusive, worldwide, royalty-free license to use that content as necessary to operate, maintain, support, improve, secure, and provide the Platform; process bookings and support requests; investigate fraud and abuse; comply with law; and generate de-identified, aggregated, and irreversibly anonymized analytics and operational data.</p>
                <p style={pStyle}>Your use of the Platform is also subject to Miraee’s Privacy Policy and any applicable privacy-related agreements. Miraee may process personal data to provide the Platform, fulfill transactions, support users and Customers, secure the Platform, detect fraud, improve operations, and comply with law. Miraee will not use Customer confidential information or personal data for cross-customer general model training except as expressly disclosed in an applicable agreement, privacy notice, or other documentation, or as otherwise authorized by the relevant Customer or permitted by law.</p>
            </>
        ),
    },
    {
        id: "sec-14", num: "14", title: "Third-Party Services",
        body: (
            <p style={pStyle}>The Platform may include, interoperate with, or depend on third-party services, websites, APIs, software, payment tools, identity providers, model providers, content providers, advisory feeds, maps, messaging tools, or integrations. Those third-party services may be governed by separate terms and privacy notices. Miraee does not control and is not responsible for third-party services, content, or systems, except to the extent expressly stated in an applicable Enterprise Agreement or required by law. Where Automated Actions rely on data retrieved from Travel Providers or other third-party systems, including reservation systems, payment systems, approval tools, HR systems, identity systems, card platforms, or expense systems (“Third-Party Data/Systems”), Miraee may rely on Third-Party Data/Systems at the time of execution. Miraee is not responsible for inaccuracies, delays, stale data, partial data, or unavailability of Third-Party Data/Systems, provided that it executed the applicable instructions materially in accordance with Third-Party Data/Systems and permissions then made available to the Platform.</p>
        ),
    },
    {
        id: "sec-15", num: "15", title: "Intellectual Property and Feedback",
        body: (
            <>
                <p style={pStyle}>As between you and Miraee, Miraee and its licensors own all rights, title, and interest in and to the Platform, including its software, interfaces, workflows, AI features, content, designs, trademarks, logos, and related intellectual property, excluding your User Content.</p>
                <p style={pStyle}>If you provide Miraee with ideas, suggestions, enhancement requests, or other feedback, you grant Miraee a perpetual, irrevocable, worldwide, transferable, sublicensable, royalty-free, fully paid-up right to use and exploit that feedback for any purpose, without compensation, provided it does not include confidential information disclosed in breach of applicable obligations.</p>
            </>
        ),
    },
    {
        id: "sec-16", num: "16", title: "Disclaimers",
        body: (
            <LegalCaps>TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE PLATFORM, AI FEATURES, AI OUTPUT, TRAVEL AND THIRD-PARTY CONTENT, TRANSACTION MONITORING SERVICES, AND ALL RELATED SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT ANY WARRANTIES (EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE), AND MIRAEE DISCLAIMS ALL IMPLIED WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, QUIET ENJOYMENT, AND SYSTEM INTEGRATION. WITH RESPECT TO TRANSACTION MONITORING SERVICES, PAYMENT CARD TRANSACTION DATA, THE ASTRADA SERVICE, AND PAYMENT NETWORK SERVICES ONLY, ASTRADA AND THE PAYMENT NETWORKS, INCLUDING VISA, MASTERCARD, AND AMERICAN EXPRESS, DISCLAIM ALL WARRANTIES TO THE MAXIMUM EXTENT PERMITTED BY LAW. MIRAEE DOES NOT WARRANT THAT THE PLATFORM, ANY CUSTOMER PROGRAM, ANY AI FEATURE, OR ANY RESULT OBTAINED FROM THE FOREGOING WILL BE UNINTERRUPTED, TIMELY, ACCURATE, COMPLETE, SUITABLE, ERROR-FREE, OR SECURE, MEET YOUR REQUIREMENTS, OR THAT ANY BOOKING REQUEST WILL BE FULFILLED, THAT ANY PRICE, INVENTORY, POLICY RESULT, PAYMENT CARD TRANSACTION DATA, OR THIRD-PARTY CONTENT WILL BE ACCURATE OR AVAILABLE, THAT ANY AI OUTPUT WILL BE CORRECT, COMPLETE, RELIABLE, OR SUITABLE, OR THAT ANY TRAVEL PROVIDER, PAYMENT NETWORK, OR THIRD-PARTY SERVICE WILL PERFORM WITHOUT ERROR OR INTERRUPTION.  WITHOUT LIMITING THE FOREGOING, MIRAEE DOES NOT WARRANT THAT AUTOMATED ACTIONS WILL ALWAYS DETECT AMBIGUITY, REQUEST CLARIFICATION IN EVERY INSTANCE, OR PREVENT ALL UNAUTHORIZED, IRREVERSIBLE, OR THIRD-PARTY DEPENDENT OUTCOMES.</LegalCaps>
        ),
    },
    {
        id: "sec-17", num: "17", title: "Limitation of Liability",
        body: (
            <>
                <LegalCaps>TO THE MAXIMUM EXTENT PERMITTED BY LAW, MIRAEE AND ITS AFFILIATES, LICENSORS, SERVICE PROVIDERS, AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, BUSINESS OPPORTUNITY, GOODWILL, OR DATA, ARISING OUT OF OR RELATING TO THESE TERMS, THE PLATFORM, ANY AI FEATURE, ANY AI OUTPUT, OR ANY TRAVEL SERVICE.</LegalCaps>
                <LegalCaps>WITH RESPECT TO ANY TRANSACTION MONITORING SERVICES, PAYMENT CARD TRANSACTION DATA, ASTRADA’S SERVICES, AND PAYMENT NETWORK SERVICES ONLY, ASTRADA, THE PAYMENT NETWORKS, INCLUDING VISA, MASTERCARD, AND AMERICAN EXPRESS, AND EACH OF THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, BUSINESS OPPORTUNITY, GOODWILL, OR DATA, EXCEPT TO THE EXTENT SUCH LIMITATION IS PROHIBITED BY APPLICABLE LAW.</LegalCaps>
                <LegalCaps>WITHOUT LIMITING THE FOREGOING, MIRAEE WILL NOT BE LIABLE FOR LOSSES ARISING FROM AMBIGUOUS, INCOMPLETE, CONTRADICTORY, OR OVERLY BROAD INSTRUCTIONS, CUSTOMER CONFIGURATION DECISIONS, DISABLED OR BYPASSED HUMAN REVIEW CONTROLS, OR INACCURACIES, DELAYS, STALE DATA, OR UNAVAILABILITY OF THIRD-PARTY DATA/SYSTEMS, EXCEPT TO THE EXTENT CAUSED BY MIRAEE’S FAILURE TO EXECUTE CONFIGURED WORKFLOWS. IF YOU ARE A CUSTOMER OR ENTERPRISE USER SUBJECT TO AN ENTERPRISE AGREEMENT, THE LIABILITY LIMITATIONS IN THAT ENTERPRISE AGREEMENT WILL CONTROL. OTHERWISE, MIRAEE’S TOTAL AGGREGATE LIABILITY UNDER THESE TERMS WILL NOT EXCEED THE AMOUNT PAID TO MIRAEE FOR THE SERVICE THAT GAVE RISE TO THE CLAIM DURING THE TWELVE (12) MONTHS BEFORE THE FIRST INCIDENT OUT OF WHICH THE LIABILITY AROSE.</LegalCaps>
                <LegalCaps>MIRAEE’S AFFILIATES, SUPPLIERS, LICENSORS,  DISTRIBUTORS, AND SERVICE PROVIDERS ARE INTENDED TO BE THIRD-PARTY BENEFICIARIES OF THIS SECTION. ASTRADA AND THE PAYMENT NETWORKS, INCLUDING VISA, MASTERCARD, AND AMERICAN EXPRESS, ARE INTENDED THIRD-PARTY BENEFICIARIES OF THIS SECTION ONLY WITH RESPECT TO CLAIMS ARISING OUT OF OR RELATING TO TRANSACTION MONITORING SERVICES, PAYMENT CARD TRANSACTION DATA, THE ASTRADA SERVICE, OR PAYMENT NETWORK SERVICES.</LegalCaps>
            </>
        ),
    },
    {
        id: "sec-18", num: "18", title: "Indemnification",
        body: (
            <p style={pStyle}>To the maximum extent permitted by law, you will defend, indemnify and hold harmless Miraee and its affiliates, licensors, service providers, officers, directors, shareholders, employees, contractors, and agents from and against third-party claims, damages, judgments, settlements, penalties, losses, costs, and expenses, including reasonable attorneys’ fees, whether in tort, contract, or otherwise, arising out of or relating to: (i) your violation or breach of these Terms; (ii) your misuse of the Platform; (iii) fraud, unlawful conduct, willful misconduct, or violation of applicable law, Travel Provider terms, Payment Network rules, or third-party rights, including intellectual property, privacy, or data protection rights, or (iv) content, data, Payment Card information, transaction monitoring instructions, consents, certifications, or other instructions supplied by you that infringe third-party rights, cause unauthorized transactions, or result in unauthorized or unlawful monitoring or processing. With respect to claims arising out of or relating to transaction monitoring services, Payment Card Transaction Data, the Astrada service, or Payment Network services only, the foregoing indemnity also extends to Astrada and the Payment Networks, including Visa, Mastercard, and American Express, and each of their respective officers, directors, employees, contractors, agents, suppliers, licensors, and distributors. No indemnified party is entitled to indemnification under this Section to the extent a claim is caused by that indemnified party's breach of these Terms, negligence, gross negligence, willful misconduct, violation of applicable law, data-security failure, privacy failure, or unauthorized processing activity.</p>
        ),
    },
    {
        id: "sec-19", num: "19", title: "Suspension and Termination",
        body: (
            <>
                <p style={pStyle}>Miraee may suspend, restrict, or terminate access to the Platform immediately, with or without notice, if required by law, if an Enterprise Agreement expires or terminates, if a Customer relationship ends, if a Customer requests it, or if Miraee reasonably suspects fraud, abuse, sanctions exposure, security threats, unlawful conduct, or material nonpayment.</p>
                <p style={pStyle}>You may stop using the Platform at any time. Termination or suspension will not affect completed bookings, accrued payment obligations, or provisions that by their nature should survive, including intellectual property, data handling, disclaimers, liability limitations, indemnification, and dispute provisions.</p>
            </>
        ),
    },
    {
        id: "sec-20", num: "20", title: "Dispute Resolution",
        body: (
            <>
                <LegalCaps>YOU AND MIRAEE AGREE TO THE FOLLOWING MANDATORY ARBITRATION AND CLASS ACTION WAIVER PROVISIONS:</LegalCaps>
                <p style={pStyle}>MANDATORY ARBITRATION. You and Miraee agree to resolve any claims arising out of or relating to these Terms or our Services, regardless of when the claim arose, even if it was before these Terms existed (a “Dispute”), through final and binding arbitration. You may opt out of arbitration within 30 days of account creation or of any updates to these arbitration terms within 30 days after the update has taken effect by filling out <a href="/arbitration-opt-out" style={{ color: T.orange, fontWeight: 600 }}>this form</a>. If you opt out of an update, the last set of agreed upon arbitration terms will apply.</p>
                <p style={pStyle}>Informal dispute resolution. We would like to understand and try to address your concerns prior to formal legal action. Before either of us files a claim against the other, we both agree to try to resolve the Dispute informally. You agree to do so by sending us notice through <a href="/dispute-notice" style={{ color: T.orange, fontWeight: 600 }}>this form</a>. We will do so by sending you notice to the email address associated with your account. If we are unable to resolve a Dispute within 60 days, either of us has the right to initiate arbitration. We also both agree to attend an individual settlement conference if either party requests one during this time. Any statute of limitations will be tolled during this informal resolution process.</p>
                <p style={pStyle}>Arbitration forum. If we are unable to resolve the Dispute, either of us may commence arbitration with National Arbitration and Mediation (“NAM”) under its Comprehensive Dispute Resolution Rules and Procedures and/or Supplemental Rules for Mass Arbitration Filings, as applicable.  The activities described in these Terms involve interstate commerce and the Federal Arbitration Act will govern the interpretation and enforcement of these arbitration terms and any arbitration.</p>
                <p style={pStyle}>Arbitration procedures. The location of the arbitration hearing will be in Austin, Texas unless the batch arbitration process applies. The arbitration will be conducted by a sole arbitrator. The arbitrator will be either a retired judge or an attorney licensed to practice law in the state of Texas. The arbitrator will have exclusive authority to resolve any Dispute, except the state or federal courts of Austin, Texas have the authority to determine any Dispute about enforceability, validity of the class action waiver, or requests for public injunctive relief, as set out below. Any settlement offer amounts will not be disclosed to the arbitrator by either party until after the arbitrator determines the final award, if any. The arbitrator has the authority to grant motions dispositive of all or part of any Dispute.</p>
                <p style={pStyle}>Exceptions. This section does not require informal dispute resolution or arbitration of the following claims: (i) individual claims brought in small claims court; and (ii) injunctive or other equitable relief to stop unauthorized use or abuse of the Services or intellectual property infringement or misappropriation.</p>
                <p style={pStyle}>CLASS AND JURY TRIAL WAIVERS. You and Miraee agree that Disputes must be brought on an individual basis only, and may not be brought as a plaintiff or class member in any purported class, consolidated, or representative proceeding. Class arbitrations, class actions, and representative actions are prohibited. Only individual relief is available. The parties agree to sever and litigate in court any request for public injunctive relief after completing arbitration for the underlying claim and all other claims. This does not prevent either party from participating in a class-wide settlement. You and Miraee knowingly and irrevocably waive any right to trial by jury in any action, proceeding, or counterclaim.</p>
                <p style={pStyle}>Batch arbitration. If 25 or more claimants represented by the same or similar counsel file arbitration demands against Miraee within 90 days of each other and the claims raise substantially similar issues, you and Miraee agree that NAM will administer those arbitrations in batches of up to 50 claimants per batch.</p>
                <p style={pStyle}>Each batch will be treated as one consolidated arbitration. That means each batch will have one arbitrator, one set of arbitration fees, and one hearing. The hearing will be held by videoconference unless the arbitrator decides that another location is appropriate. If there are fewer than 50 claimants in total, all claims will be administered as one batch. If more than 50 claimants are involved, NAM will create additional batches of up to 50 claimants each until all claims are assigned to a batch. If any part of this batching process is found to be invalid or unenforceable for a particular claimant or batch, that part will be severed, and the affected claim or claims will proceed in individual arbitration.</p>
                <p style={pStyle}>Severability. If any part of these arbitration terms is found to be illegal or unenforceable, the remainder will remain in effect, except that if a finding of partial illegality or unenforceability would allow class arbitration, class action, or representative action, this entire dispute resolution section will be unenforceable in its entirety.</p>
            </>
        ),
    },
    {
        id: "sec-21", num: "21", title: "Changes to These Terms",
        body: (
            <p style={pStyle}>Miraee may update these Terms from time to time. If Miraee makes a material change, Miraee will provide reasonable notice by posting the revised Terms through the Platform, by email, through the applicable Customer, or by other reasonable means. The revised Terms become effective on the date stated in the updated Terms. Continued use after that date constitutes acceptance to the extent permitted by law. No amendment to these Terms modifies an Enterprise Agreement unless expressly agreed in writing by Miraee and the applicable Customer.</p>
        ),
    },
    {
        id: "sec-22", num: "22", title: "Miscellaneous",
        body: (
            <>
                <p style={pStyle}>These Terms, together with Miraee’s Privacy Policy, any incorporated policies or notices, and any applicable supplemental terms, constitute the entire agreement between you and Miraee regarding your use of the Platform, except that any applicable Enterprise Agreement and related negotiated documents control where applicable.</p>
                <p style={pStyle}>If any provision is held invalid, illegal, or unenforceable, the remaining provisions remain in full force and effect. You may not assign these Terms without Miraee’s prior written consent. Miraee may assign these Terms without restriction in connection with a merger, acquisition, reorganization, sale of assets, financing transaction, or by operation of law. Section headings are for convenience only and do not affect interpretation.</p>
            </>
        ),
    },
    {
        id: "sec-23", num: "23", title: "Contact",
        body: (
            <>
                <p style={pStyle}>Questions regarding these Terms should be directed to:</p>
                <p style={pStyle}>Miraee, Inc.</p>
                <p style={pStyle}>Srini Mothey</p>
                <p style={pStyle}>Chief Business Officer</p>
                <p style={pStyle}>10800 Pecan Park Blvd., Suite 400</p>
                <p style={pStyle}>Austin, Texas 78750</p>
                <p style={pStyle}><a href="mailto:srini@tabhi.com" style={{ color: T.orange, fontWeight: 600 }}>srini@tabhi.com</a></p>
                <p style={pStyle}>with a copy to:</p>
                <p style={pStyle}>Chief Legal Officer</p>
                <p style={pStyle}>10800 Pecan Park Blvd., Suite 400</p>
                <p style={pStyle}>Austin, Texas 78750</p>
                <p style={pStyle}><a href="mailto:legal@miraee.ai" style={{ color: T.orange, fontWeight: 600 }}>legal@miraee.ai</a></p>
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
export default function MiraeeTermsPage(props: { style?: React.CSSProperties }) {
    usePageMeta("Miraee Terms of Use", "Terms governing access to and use of the Miraee platform, services and related travel workflows.")
    const isNarrow = useVW() < 1024
    return (
        <div className="legal-page" style={{ position: "relative", width: "100%", minHeight: "100vh", background: T.bg, fontFamily: F, ...props.style }}>
            <a className="legacy-skip" href="#main">Skip to content</a>
            <SiteNav />
            <main id="main">
            {/* Document: single readable column, Navan-style */}
            <div style={{ maxWidth: 880, margin: "0 auto", padding: isNarrow ? "110px 20px 72px" : "140px 24px 96px" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EO }} style={{ marginBottom: 40 }}>
                    <h1 style={{ fontSize: isNarrow ? "1.9rem" : "2.4rem", fontFamily: FH, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", color: T.ink, margin: "0 0 10px" }}>
                        Miraee Terms of Use
                    </h1>
                    <p style={{ fontSize: 14, fontFamily: F, fontWeight: 600, color: T.muted, margin: 0 }}>Last Updated: 07/07/2026</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EO }} style={{ marginBottom: 44 }}>
                    <p style={pStyle}>These Terms of Use (these “Terms”) govern access to and use of the Miraee Platform (“Platform”) by: (a) individual users accessing the Platform on their own behalf; (b) individual users authorized by a company, organization, or other entity, whether or not that entity has entered into an Enterprise Agreement with Miraee; and (c) companies, organizations, and other entities accessing or using the Platform directly (each, a “Customer”).</p>
                    <p style={{ ...pStyle, margin: 0 }}>If you are using the Platform on behalf of a Customer or other entity, you represent that you are authorized to bind that entity where applicable. By accessing or using the Platform, you agree to these Terms. If you do not agree, do not use the Platform. If you are a Customer or authorized user subject to an Enterprise Agreement, that Enterprise Agreement controls to the extent it conflicts with these Terms.</p>
                </motion.div>
                <details className="legal-toc">
                    <summary>On this page</summary>
                    <nav aria-label="Terms sections">{SECTIONS.map(s => <a key={s.id} href={`#${s.id}`}>{s.num}. {s.title}</a>)}</nav>
                </details>
                {SECTIONS.map(s => <Section key={s.id} s={s} />)}
            </div>
            {/* CTA band, Navan-style close */}
            <div style={{ background: T.maroon, padding: isNarrow ? "56px 20px" : "72px 48px" }}>
                <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" as const }}>
                    <h2 style={{ fontSize: isNarrow ? "1.7rem" : "2.2rem", fontFamily: FH, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", color: T.cream, margin: "0 0 24px" }}>
                        See where Miraee will take your company.
                    </h2>
                    <motion.a href="/book-a-demo" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        style={{ display: "inline-block", background: T.orange, color: "#fff", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontFamily: F, fontWeight: 700, textDecoration: "none" }}>
                        Book a demo
                    </motion.a>
                    <p style={{ fontSize: 12.5, fontFamily: F, color: "rgba(251,246,242,0.45)", margin: "28px 0 0" }}>© 2026 Miraee, a Tabhi company · <a href="mailto:legal@miraee.ai" style={{ color: "rgba(251,246,242,0.7)", textDecoration: "none" }}>legal@miraee.ai</a></p>
                </div>
            </div>
            </main>
            <SiteFooter />
        </div>
    )
}
