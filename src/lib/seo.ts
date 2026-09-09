// Single source of truth for the canonical origin. Every absolute URL the app
// emits (canonical tags today, og:url and JSON-LD later) resolves through here,
// so moving domains — or moving /v4/* to unprefixed paths — is one edit.
export const SITE_ORIGIN = "https://miraee.ai"

// Canonical paths are compared as exact strings by search engines, so the same
// page reached two ways has to normalise to one form. This strips the query and
// hash (a canonical must not carry ?perf= or #plan), guarantees a leading
// slash, and drops the trailing slash on everything except the root.
export function normalizePath(pathname: string): string {
    const path = pathname.split("?")[0].split("#")[0]
    const withLeadingSlash = path.startsWith("/") ? path : `/${path}`
    if (withLeadingSlash === "/") return "/"
    return withLeadingSlash.replace(/\/+$/, "") || "/"
}

// The absolute canonical URL for a path.
export function canonicalUrl(pathname: string): string {
    return SITE_ORIGIN + normalizePath(pathname)
}
