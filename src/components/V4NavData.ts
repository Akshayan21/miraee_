// The V4 navigation model. Kept as data rather than JSX so the mega menu, the
// mobile accordion and the footer all render from one source, and so adding a
// link never means touching component code.
//
// Structure follows the agreed nav: Product | Solutions | Why Miraee |
// Resources | Company, with Product as a two-column mega panel.

export type NavLeaf = {
    label: string
    to: string          // router path, may carry a #hash
    desc?: string       // one-line descriptor — mega columns only
}

type NavGroup = {
    heading: string
    feature?: NavLeaf   // lead item, rendered larger above the list
    items: NavLeaf[]
}

export type NavItem =
    | { key: string; label: string; kind: "link"; to: string }
    // `owns` lists the page paths this menu is responsible for, used to mark the
    // trigger current. It is explicit rather than derived from the links because
    // several menus link across to each other's pages — Product points at
    // /v4/technology and /v4/why-miraee, which belong to the Why Miraee menu —
    // and deriving it would light up two triggers at once.
    | { key: string; label: string; kind: "panel"; layout: "mega" | "list"; owns: readonly string[]; groups: NavGroup[] }

export const V4_NAV = [
    {
        key: "product",
        label: "Product",
        kind: "panel",
        layout: "mega",
        owns: ["/v4/platform", "/v4/implementation", "/v4/integrations", "/v4/ai-assistant"],
        groups: [
            {
                heading: "Platform",
                feature: { label: "Platform Overview", to: "/v4/platform", desc: "One AI-native platform for employee travel" },
                items: [
                    { label: "Plan", to: "/v4/platform#plan", desc: "Describe the trip. Get an in-policy itinerary." },
                    { label: "Book", to: "/v4/platform#book", desc: "Flight, hotel, rail and car booked as one trip." },
                    { label: "Expense", to: "/v4/platform#expense", desc: "Receipts captured and coded. No forms to file." },
                    { label: "Change", to: "/v4/platform#change", desc: "Disruption handled inside the limits you set." },
                    { label: "Continuous support", to: "/v4/platform#support", desc: "A real person, in the same thread, 24/7." },
                    { label: "Personal travel", to: "/v4/platform#personal", desc: "The same agent. Separate spend." },
                ],
            },
            {
                heading: "How it works",
                items: [
                    { label: "AI Assistant for Every Employee", to: "/v4/ai-assistant" },
                    { label: "Integrations", to: "/v4/integrations" },
                    { label: "Security & Trust", to: "/v4/technology#governance" },
                    { label: "Implementation / Onboarding", to: "/v4/implementation" },
                ],
            },
        ],
    },
    {
        key: "solutions",
        label: "Solutions",
        kind: "panel",
        layout: "list",
        owns: [
            "/v4/solutions",
            "/v4/solutions/employees",
            "/v4/solutions/finance",
            "/v4/solutions/travel-leads",
            "/v4/solutions/admins",
            "/v4/solutions/chros",
            "/v4/solutions/managers",
            "/v4/solutions/business-travel",
            "/v4/solutions/meetings-events",
            "/v4/solutions/executive-travel",
            "/v4/solutions/global-mobility",
            "/v4/solutions/emergency-disruption",
        ],
        groups: [
            {
                heading: "By role",
                items: [
                    { label: "Employees", to: "/v4/solutions/employees" },
                    { label: "Finance", to: "/v4/solutions/finance" },
                    { label: "Travel leads", to: "/v4/solutions/travel-leads" },
                    { label: "Admins", to: "/v4/solutions/admins" },
                    { label: "CHROs", to: "/v4/solutions/chros" },
                    { label: "Managers", to: "/v4/solutions/managers" },
                ],
            },
            {
                heading: "By use case",
                items: [
                    { label: "Business travel", to: "/v4/solutions/business-travel" },
                    { label: "Meetings & events", to: "/v4/solutions/meetings-events" },
                    { label: "Executive travel", to: "/v4/solutions/executive-travel" },
                    { label: "Global mobility", to: "/v4/solutions/global-mobility" },
                    { label: "Emergency & disruption", to: "/v4/solutions/emergency-disruption" },
                ],
            },
        ],
    },
    {
        key: "why",
        label: "Why Miraee",
        kind: "panel",
        layout: "list",
        owns: ["/v4/why-miraee", "/v4/technology"],
        groups: [
            {
                heading: "Why Miraee",
                items: [
                    { label: "Why Miraee", to: "/v4/why-miraee" },
                    { label: "AI & Technology", to: "/v4/technology" },
                ],
            },
        ],
    },
    {
        key: "resources",
        label: "Resources",
        kind: "panel",
        layout: "list",
        owns: ["/v4/resources"],
        groups: [
            {
                heading: "Resources",
                items: [
                    { label: "Guides & Reports", to: "/v4/resources/guides" },
                    { label: "Life at Miraee", to: "/v4/resources/life-at-miraee" },
                    { label: "Blogs", to: "/v4/resources/blog" },
                    { label: "News & Updates", to: "/v4/resources/news" },
                    { label: "Calculator", to: "/v4/resources/calculator" },
                    { label: "Help Center", to: "/v4/resources/help-center" },
                ],
            },
        ],
    },
    { key: "company", label: "Company", kind: "link", to: "/v4/company" },
] as const satisfies readonly NavItem[]

export type NavKey = (typeof V4_NAV)[number]["key"]

// `V4_NAV` is `as const satisfies` so NavKey stays a narrow union of the five
// keys. That same narrowing makes each group a distinct literal type, and the
// ones without a `feature` lose the property entirely — so components iterate
// this widened view instead, where `feature` is the declared optional.
export const V4_NAV_ITEMS: readonly NavItem[] = V4_NAV

// A top-level item is "current" when the visitor is anywhere inside it, so the
// trigger can carry an active state without the panel being open.
export function isSectionActive(item: NavItem, pathname: string): boolean {
    if (item.kind === "link") return pathname === item.to
    // Prefix match so the Resources children (/v4/resources/blog, ...) keep the
    // Resources trigger marked current.
    return item.owns.some(base => pathname === base || pathname.startsWith(base + "/"))
}
