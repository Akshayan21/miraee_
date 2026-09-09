import { V4Page, V4Hero, Reveal } from "../../components/V4Kit"
import "../SubpagesV2.css"
import "./V4.css"

// Dedicated Implementation & Onboarding Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: GETTING STARTED
// Heading: Live in an afternoon, not a quarter.
// Subhead: A guided setup takes you from a fresh domain to a working travel programme. No implementation team, no waiting.

interface SetupItem {
    name: string
    desc: string
}

interface SetupStage {
    num: string
    title: string
    items: SetupItem[]
}

const STAGES: SetupStage[] = [
    {
        num: "01",
        title: "Set up",
        items: [
            {
                name: "Guided setup wizard",
                desc: "Five steps, in order. Each one tells you what it needs and marks itself done, so you always know how far along you are and what's left.",
            },
            {
                name: "Setup progress",
                desc: "A running completion percentage across the wizard. Configuration is never a guess, you can see exactly what's finished and what still needs attention.",
            },
            {
                name: "Web console",
                desc: "Your administrative home. Everything you configure during setup lives here, and everything you change later starts here too.",
            },
        ],
    },
    {
        num: "02",
        title: "Bring in your company",
        items: [
            {
                name: "Domain setup & account creation",
                desc: "Enter your domain and Miraee fills in what it can, so account creation is a confirmation rather than a form.",
            },
            {
                name: "Multi-domain mapping",
                desc: "Map every domain your company uses. Anyone who signs up after you is routed to the right place automatically, and more domains can be added anytime under settings.",
            },
            {
                name: "Company headcount",
                desc: "Set your employee range once. It shapes the defaults Miraee suggests as you build out the rest of your programme.",
            },
        ],
    },
    {
        num: "03",
        title: "Set your rules",
        items: [
            {
                name: "Default configurations & travel policies",
                desc: "Start from a company policy you write yourself, or let AI-guided setup draft one for you to adjust. Either way you're editing, not starting from a blank page.",
            },
            {
                name: "Policy mapping",
                desc: "A single panel to review and edit every rule before it goes live. Nothing published until you say so.",
            },
            {
                name: "Grade-based inheritance",
                desc: "Assign policy by seniority or grade, and travelers inherit the right rules the moment they're added. No per-person setup.",
            },
            {
                name: "Traveler profile vs. account login",
                desc: "Two separate things, kept separate: the login and admin data that runs the account, and the personal travel identity: documents, preferences, loyalty, that belongs to each traveler.",
            },
        ],
    },
]

export default function V4Implementation() {
    return (
        <V4Page
            title="Implementation & Onboarding | Live in an afternoon, not a quarter | Miraee"
            description="A guided setup takes you from a fresh domain to a working travel programme. No implementation team, no waiting.">

            <V4Hero
                eyebrow="GETTING STARTED"
                title={<>Live in an afternoon,<br /><em>not a quarter.</em></>}
                lede="A guided setup takes you from a fresh domain to a working travel programme. No implementation team, no waiting." />

            <section className="v4-section" style={{ paddingTop: 0, paddingBottom: "clamp(64px, 8vw, 110px)" }}>
                <div className="v4-shell">
                    <div className="v4-imp-light-wrap">
                        {STAGES.map((stage, idx) => (
                            <Reveal key={stage.title} delay={idx * 0.08}>
                                <article className="v4-imp-stage-card-light">
                                    <div className="v4-imp-stage-head-light">
                                        <span className="v4-imp-stage-num-light">{stage.num}</span>
                                        <h2 className="v4-imp-stage-title-light">{stage.title}</h2>
                                    </div>

                                    <div className="v4-imp-items-grid">
                                        {stage.items.map((item) => (
                                            <div key={item.name} className="v4-imp-item-card-light">
                                                <strong>{item.name}</strong>
                                                <p>{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </V4Page>
    )
}
