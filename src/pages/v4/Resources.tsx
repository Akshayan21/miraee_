import { Link } from "react-router-dom"
import { V4Page, V4Hero, V4Cta, Reveal } from "../../components/V4Kit"
import lifeAtMiraeePhoto from "../../assets/miraee-team.png"
import "../SubpagesV2.css"
import "./V4.css"

// Resources hub. Per the structure doc these are separate pages rather than
// anchored sections, so this page is a directory: each card links to its own
// route. Only the calculator is built out — the rest are shells until there is
// real content, and their cards say so rather than implying otherwise.

const RESOURCES: { to: string; label: string; copy: string; ready: boolean; photo?: string }[] = [
    { to: "/v4/resources/calculator", label: "Calculator", copy: "Model the savings, the admin hours reclaimed and the cost of your current tool stack against your own numbers.", ready: true },
    { to: "/v4/resources/guides", label: "Guides & Reports", copy: "Research for finance, travel and people leaders building an agentic travel program.", ready: false },
    { to: "/v4/resources/blog", label: "Blogs", copy: "Notes from the team on agentic travel, policy design and travel spend.", ready: false },
    { to: "/v4/resources/news", label: "News & Updates", copy: "Product releases, partnerships and company announcements.", ready: false },
    { to: "/v4/resources/life-at-miraee", label: "Life at Miraee", copy: "How the team works, where we are, and the roles we are hiring for.", ready: false, photo: lifeAtMiraeePhoto },
    { to: "/v4/resources/help-center", label: "Help Center", copy: "Answers to common questions, and a direct line to a human.", ready: true },
]

export default function V4Resources() {
    return (
        <V4Page
            title="Resources | Guides, Calculator and Help | Miraee"
            description="Research, tools and guidance for finance, travel and people leaders building an agentic travel program.">

            <V4Hero
                eyebrow="Resources"
                title={<>Everything you need to shape<br /><em>the future of corporate travel.</em></>}
                lede="Research, tools, and guidance for the teams building an agentic travel program." />

            <section className="v4-section" id="index" aria-labelledby="index-title">
                <div className="v4-shell">
                    <Reveal><h2 className="v4-h2" id="index-title">Start here.</h2></Reveal>
                    <Reveal delay={0.1}>
                        <div className="v4-steps" style={{ marginTop: 36 }}>
                            {RESOURCES.map((item, index) => (
                                <Link className="v4-step v4-step--link" to={item.to} key={item.to}>
                                    {item.photo ? (
                                        <img className="v4-step__photo" src={item.photo} alt="" aria-hidden="true" />
                                    ) : (
                                        <b className="v4-step__num">0{index + 1}</b>
                                    )}
                                    <h3>{item.label}</h3>
                                    <p>{item.copy}</p>
                                    <span className="v4-step__tag">{item.ready ? "Open →" : "Coming soon"}</span>
                                </Link>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            <V4Cta title="Bring a real trip." body="Twenty minutes with your policy and your routes. We'll show you the numbers on your own program." />
        </V4Page>
    )
}
