import RoleShowcasePage from "./RoleShowcasePage"
import adminVideo from "../../../assets/Video/Admin.mp4"

// Solutions: Admins Page
// Content strictly from Miraee Website Content - V4 & User Instructions
// Video: Admin.mp4 (muted, loop, background, no buttons/emojis)

export default function V4SolutionAdmins() {
    return (
        <RoleShowcasePage
            roleSlug="admins"
            roleTitle="Admins"
            shift="You used to police every trip. Now you set the rule once."
            before="Checking each trip against policy by hand, fielding one-off booking requests, hunting down onboarding gaps and exceptions, and reconciling spend across tools that never quite agree."
            afterHeading="Now you set the rule once."
            body="Policy applies at search, so out-of-policy trips rarely get built. The Overview shows the whole program in one place — onboarding gaps, exceptions, budget, adoption, compliance and AI-surfaced savings. Manage travelers and rules, run duty of care from the Live Map, and reconcile without switching screens. The Agentic ROI Dashboard shows exactly what the agent saved in hours and dollars."
            controls={["Overview", "Policies", "Live Map", "Agentic ROI"]}
            videoSrc={adminVideo}
            detailsHeading="Govern the program, not each trip."
            details={[
                {
                    title: "Policy that enforces itself.",
                    body: "Rules apply at search and inherit by grade, so trips arrive in policy instead of being fixed after the fact.",
                },
                {
                    title: "The whole program at a glance.",
                    body: "Onboarding gaps, budget, adoption, compliance and exceptions sit on one Overview, with duty of care on the Live Map,  no report-gathering.",
                },
                {
                    title: "Proof it's working.",
                    body: "The Agentic ROI Dashboard shows hours and dollars saved and the auto-approval rate, so the program's value is never a guess.",
                },
            ]}
        />
    )
}
