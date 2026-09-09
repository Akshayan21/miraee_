import RoleShowcasePage from "./RoleShowcasePage"

// Solutions: Travel Leads Page
// Content strictly from Miraee Website Content - V4 & User Instructions

export default function V4SolutionTravelLeads() {
    return (
        <RoleShowcasePage
            roleSlug="travel-leads"
            roleTitle="Travel Leads"
            shift="You used to process bookings. Now you run a program."
            before="Processing bookings one by one, chasing travelers for status, and running MICE and group trips through separate tools and spreadsheets."
            afterHeading="Now you run a program."
            body="A Live Tracker shows route, status and ETA for every traveler in motion. The Booking Queue holds every open request in one place, with analytics by team, entity and route. MICE and group booking built in, direct supply through Mondee."
            controls={["Live Tracker", "Booking Queue", "Program analytics"]}
            detailsHeading="An assistant that handles all your work, digitally:"
            details={[
                {
                    title: "Everyone in motion, on one screen.",
                    body: "The Live Tracker shows route, status, flight and ETA, alongside Active Trips, Upcoming and Travelers Abroad at a glance.",
                },
                {
                    title: "Every request in one queue.",
                    body: "The Booking Queue holds every open booking, traveler, dates, items, status, so nothing slips.",
                },
                {
                    title: "A program, not just bookings.",
                    body: "Analytics by team, entity and route, with MICE and group booking built in and direct supply through Mondee.",
                },
            ]}
        />
    )
}
