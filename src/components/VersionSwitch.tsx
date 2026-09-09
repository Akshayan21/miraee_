import { Link, useLocation } from "react-router-dom"
import { SITE_VERSIONS, resolveSiteVersion } from "../lib/siteVersions"

// The version pill row shared by V2Kit and V3Kit. Callers pass the full class
// string (base + any modifier) because the base class belongs to the consuming
// design system's namespace, not to this file. LegalFormKit's SiteNav renders
// its own inline-styled row but reads from the same lib/siteVersions source.

export function VersionSwitch({ className = "" }: { className?: string }) {
    const active = resolveSiteVersion(useLocation().pathname)
    return (
        <div className={className.trim()} aria-label="Choose site version">
            {SITE_VERSIONS.map(([version, href]) => (
                <Link key={version} to={href} aria-current={active === version ? "page" : undefined}>{version}</Link>
            ))}
        </div>
    )
}
