import RoleShowcasePage from "./RoleShowcasePage"

// Solutions: CHROs Page
// Content strictly from Miraee Website Content - V4 & User Instructions

export default function V4SolutionChros() {
    return (
        <RoleShowcasePage
            roleSlug="chros"
            roleTitle="CHROs"
            shift="You used to enforce policy. Now you support people."
            before="Enforcing policy top-down, reacting late when a traveler hit trouble, and stitching together who was travel-ready or where people were from scattered updates and separate systems."
            afterHeading="Now you support people."
            body="Your view leads with people: Total People, Travel Ready, Currently Traveling and Compliance. Duty of Care shows every active traveler with a live location, plus on-trip tracking, a travelers-by-day calendar and compliance by team pulled from HRIS. Same policy for everyone, a consumer-grade experience."
            controls={["Duty of Care", "Readiness", "Compliance by Team"]}
            detailsHeading="Built around people, not policy."
            details={[
                {
                    title: "People, not policy, up front.",
                    body: "The Overview reads as Travel Ready, Currently Traveling and Compliance, with a readiness checklist per employee, you see who's set and who needs a nudge.",
                },
                {
                    title: "Care that's always on.",
                    body: "Duty of Care tracks every active traveler live, so support reaches people before they have to ask.",
                },
                {
                    title: "Fairness by design.",
                    body: "Compliance-by-team from HRIS and one policy for everyone means the same standard applies to all, no exceptions to manage.",
                },
            ]}
        />
    )
}
