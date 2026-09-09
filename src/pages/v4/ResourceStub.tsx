import { Link } from "react-router-dom"
import { V4Page, V4Hero, Reveal } from "../../components/V4Kit"
import "../SubpagesV2.css"
import "./V4.css"

// One shell for every Resources child that has no content yet. These routes
// exist because the mega menu links to them and a 404 from your own nav is
// worse than an honest empty state — but nothing here invents guides, posts or
// announcements that don't exist.
//
// Because there is nothing to rank, every route rendered through this shell is
// `noindex, follow`: the nav keeps working and the outbound links still pass
// discovery, but four near-identical "nothing published yet" pages stay out of
// the index instead of reading as thin content under the Resources hub. These
// URLs are excluded from public/sitemap.xml for the same reason — a noindex
// page in a sitemap is a contradiction crawlers report as an error.
//
// Drop the `noindex` here the day this shell stops being used, or lift it per
// page by giving that page its own component with real content.

export function ResourceStub({ title, metaTitle, description, eyebrow, lede }: {
    title: string
    metaTitle: string
    description: string
    eyebrow: string
    lede: string
}) {
    return (
        <V4Page title={metaTitle} description={description} noindex>
            <V4Hero eyebrow={eyebrow} title={title} lede={lede} />
            <section className="v4-section" aria-labelledby="soon-title">
                <div className="v4-shell">
                    <Reveal>
                        <div className="v4-note">
                            <b>Soon</b>
                            <div>
                                <h2 id="soon-title">Nothing published here yet.</h2>
                                <p>This page is live so the navigation works end to end, but there is no content to show you yet. Rather than fill it with placeholder material, we've left it honest.</p>
                                <p style={{ marginTop: 16 }}>
                                    <Link className="v4-btn v4-btn--ghost" to="/v4/resources">Back to resources</Link>
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </V4Page>
    )
}

export function V4ResourcesGuides() {
    return <ResourceStub
        eyebrow="Guides & reports"
        title="Go deep on the shift to agentic travel."
        metaTitle="Guides & Reports | Miraee"
        description="Research for finance, travel and people leaders building an agentic travel program."
        lede="Long-form research for the teams rebuilding how their company travels." />
}

export function V4ResourcesBlog() {
    return <ResourceStub
        eyebrow="Blog"
        title="Notes from the team."
        metaTitle="Blog | Miraee"
        description="Notes from the Miraee team on agentic travel, policy design and travel spend."
        lede="Working notes on agentic travel, policy design and where travel spend actually goes." />
}

export function V4ResourcesNews() {
    return <ResourceStub
        eyebrow="News & updates"
        title="Announcements and press."
        metaTitle="News & Updates | Miraee"
        description="Product releases, partnerships and company announcements from Miraee."
        lede="Product releases, partnerships and company announcements." />
}

export function V4ResourcesLife() {
    return <ResourceStub
        eyebrow="Life at Miraee"
        title="How we work, and who we're looking for."
        metaTitle="Life at Miraee | Careers"
        description="How the Miraee team works, where we are, and the roles we are hiring for."
        lede="The team, the offices, and the roles we're hiring for." />
}
