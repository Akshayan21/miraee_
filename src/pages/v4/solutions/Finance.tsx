import RoleShowcasePage from "./RoleShowcasePage"
import financeVideo from "../../../assets/Video/Finance.mp4"

// Solutions: Finance Page
// Content strictly from Miraee Website Content - V4 & User Instructions
// Video: Finance.mp4 (muted, loop, background, no buttons/emojis)

export default function V4SolutionFinance() {
    return (
        <RoleShowcasePage
            roleSlug="finance"
            roleTitle="Finance"
            shift="You used to reconcile the past. Now you watch the present."
            before="Rechecking each department's spend separately, untangling one misfiled entry or a missing one that keeps the books from matching, and delays in reporting all round."
            afterHeading="Full control on spends, all in one place."
            body="Committed spend shows at booking, not month-end. Track by department, category and top spenders, and move reimbursements from pending to paid in one table. The CFO Dashboard rolls up spend vs budget, savings and cycle time, all exportable."
            controls={["Accounts", "Approval chains", "Ceilings", "Suppliers", "Sign-off", "Audit log"]}
            videoSrc={financeVideo}
            detailsHeading="Close the books without chasing them:"
            details={[
                {
                    title: "Reports that arrive ready.",
                    body: "Custom reporting shaped to each reader and exported in a click, no rebuilding the same spreadsheet every close.",
                },
                {
                    title: "Every spend already accounted for.",
                    body: "Each expense is registered as it happens, with live spend tracking by department and category, so nothing surfaces late.",
                },
                {
                    title: "Reimbursements that move themselves.",
                    body: "Expenses connected directly to My Trips so categorisation is easy or travelers can file expenses via receipts uploads or bank statements that would directly extract the specifc trip expenses divided into business and personal expenses which are connected directly to the ERP systems, without the manual chase.",
                },
            ]}
        />
    )
}
