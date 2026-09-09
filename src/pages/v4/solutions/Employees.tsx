import RoleShowcasePage from "./RoleShowcasePage"

// Solutions: Employees Page
// Content strictly from Miraee Website Content - V4 & User Instructions

export default function V4SolutionEmployees() {
    return (
        <RoleShowcasePage
            roleSlug="employees"
            roleTitle="Employees"
            shift="Used to assemble a trip. Now they describe one."
            before="Assembling a trip across tabs, then saving receipts and filing an expense report after getting home."
            afterHeading="Now they describe one."
            body="Book from a sentence, checked against policy as you go. The Receipt Scanner matches receipts to trips automatically, so there's no report to file. Your briefing carries currency, safety, visa and emergency numbers; Rewards tracks points to your next milestone."
            controls={["My Trips", "Receipt Scanner", "Rewards"]}
            detailsHeading="Navigate the whole trip in one platform:"
            details={[
                {
                    title: "A trip from a sentence.",
                    body: "Describe it and it's booked in policy, the statistics strip keeps total trips, savings rate and duration in view.",
                },
                {
                    title: "No report to file.",
                    body: "The Receipt scanner matches receipts to trips with AI confidence and in-policy scoring, so expenses close themselves.",
                },
                {
                    title: "Everything for the road, in hand.",
                    body: "Trip Briefing carries currency, safety, visa and emergency numbers, while Rewards tracks points to your next milestone.",
                },
            ]}
        />
    )
}
