// Single source of truth for which site versions exist and which one a given
// pathname belongs to. Three navs render the version pill switch with three
// different visual treatments (V2Kit's .m-nav__version, V3Kit's
// .v3-version-switch, LegalFormKit's inline-styled row), so the data and the
// resolver live here while each nav keeps its own markup and classes. Adding a
// version means editing this file and nothing else.

export type SiteVersion = "v1" | "v1.1" | "v2" | "v3" | "v4"

export const SITE_VERSIONS: readonly (readonly [SiteVersion, string])[] = [
    ["v4", "/v4"],
] as const

// Most specific first: /v1.1 has to win over /v1, and the prefixed versions
// have to be matched before the "everything else is v2" fallback that covers
// the unprefixed marketing routes (/product, /for-teams, ...) and the shared
// legal/form pages.
export function resolveSiteVersion(pathname: string): SiteVersion {
    if (pathname === "/v1.1" || pathname.startsWith("/v1.1/")) return "v1.1"
    if (pathname === "/v4" || pathname.startsWith("/v4/")) return "v4"
    if (pathname === "/v3" || pathname.startsWith("/v3/")) return "v3"
    if (pathname === "/" || pathname.startsWith("/v1/")) return "v1"
    return "v2"
}
