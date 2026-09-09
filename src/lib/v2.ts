// Single source of truth for the "/v2" duplicate of the V4 site (see
// App.tsx — every V4 route is registered a second time under /v2, pointing
// at the same components). Anything that needs to render differently
// between the current version and V2 reads this instead of re-deriving its
// own path check.

export function isV2Path(pathname: string): boolean {
    return pathname === "/v2" || pathname.startsWith("/v2/")
}

export function toggleVersionPath(pathname: string): string {
    if (isV2Path(pathname)) {
        const rest = pathname.slice(3)
        return rest === "" ? "/" : rest
    }
    const rest = pathname === "/v4" ? "/" : pathname.startsWith("/v4/") ? pathname.slice(3) : pathname
    return rest === "/" ? "/v2" : "/v2" + rest
}
