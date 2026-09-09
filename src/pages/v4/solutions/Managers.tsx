import RoleShowcasePage from "./RoleShowcasePage"

// Solutions: Managers Page
// Content strictly from Miraee Website Content - V4 & User Instructions

export default function V4SolutionManagers() {
    return (
        <RoleShowcasePage
            roleSlug="managers"
            roleTitle="Managers"
            shift="You used to chase approvals. Now only exceptions reach you."
            before="Chasing sign-offs across chat and email, approving trips with no real context, and piecing together the team's progress and spends from scattered updates."
            afterHeading="Now only exceptions reach you."
            body="Routine trips inside policy self-book. What reaches you arrives with estimated cost, exact policy overage and an AI confidence score, so you can decide in one glance. Team Analytics gives you spend vs budget, compliance and travel outcomes in one view, and you can allocate rewards per employee across the team, all without pulling a month's report."
            controls={["Approvals", "Team Analytics", "Team Trips", "Points Pool"]}
            detailsHeading="Run the team, not the paperwork:"
            details={[
                {
                    title: "The whole team in one view.",
                    body: "Team Analytics shows spend vs budget, KPIs met, travel outcomes and spend insights together, so you see how the team is tracking without asking anyone.",
                },
                {
                    title: "Approvals that takes a click.",
                    body: "Routine trips self-book inside policy; only real exceptions reach you, each with cost, overage and confidence attached.",
                },
                {
                    title: "Rewards you control per person.",
                    body: "Allocate the team's points pool by employee, recognising the people booking smart and on-policy.",
                },
            ]}
        />
    )
}
