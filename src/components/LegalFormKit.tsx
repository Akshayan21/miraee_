import { useState, useRef, isValidElement, cloneElement, useId } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { EO } from "../animations/easings"
import ThemeToggle from "./ThemeToggle"
import { useWindowWidth } from "../hooks/useWindowSize"
import { SITE_VERSIONS, resolveSiteVersion } from "../lib/siteVersions"

export const useVW = useWindowWidth

// Single source of truth for site chrome (nav, footer, logo, color/font tokens)
// and the legal-form primitives shared by every routed page: home, support,
// terms, privacy, arbitration opt-out, dispute notice, and book-a-demo.
export const T = {
    bg: "var(--page-bg)", ink: "var(--text)", maroon: "#450E14", orange: "#E55602",
    accent: "var(--accent-strong)",
    muted: "rgba(var(--text-rgb),0.42)", border: "rgba(var(--text-rgb),0.10)", card: "var(--surface)", cream: "#FBF6F2",
}
export const F = "var(--font-sans)"
export const FH = "var(--font-heading)"

export function MiraeeLogo({ fill = T.orange, height = 26 }: { fill?: string; height?: number }) {
    const w = height * (338 / 84)
    return (
        <svg width={w} height={height} viewBox="0 0 338 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: "100%", height: "auto", display: "block" }}>
            <path d="M113.255 83.0098C112.156 83.0098 111.078 82.8081 110.021 82.4154C102.147 79.4749 101.207 66.7045 102.95 55.7387C103.807 50.3886 105.846 37.5439 105.413 31.7797C104.25 32.82 102.496 34.6352 100.033 37.788C93.6499 45.9513 86.2095 53.8917 79.3504 50.8344C74.0977 48.4884 72.5229 40.9514 74.679 28.4464L74.7001 28.3084C76.9407 15.2833 76.3805 11.0159 75.683 9.63587C74.2456 9.9331 68.1792 12.3216 52.4106 31.1746C50.6033 33.3402 48.9651 35.4102 47.4749 37.374C52.1041 40.8134 53.2244 47.1933 50.8147 56.3332C47.3481 69.4751 40.8272 78.1692 33.8095 79.0078C30.1844 79.443 26.9398 77.7127 25.1537 74.3795C22.4375 69.3265 22.9765 59.9955 30.0259 46.8005C23.0188 49.4862 13.9825 54.295 5.36894 60.2185L0 52.3312C6.29899 48.0001 24.1391 36.4823 37.2761 35.2085C39.5589 31.9814 42.1694 28.5951 45.1498 25.0389C62.3769 4.40245 72.4172 -2.60374 79.7837 0.835664C88.3972 4.85892 85.6916 20.5485 84.0746 29.922L84.0535 30.06C83.0811 35.7074 83.1763 39.444 83.5039 41.323C84.9518 40.3676 87.7948 37.9579 92.5402 31.8858C97.962 24.954 103.785 18.8819 109.704 21.4827C116.965 24.6673 115.548 37.1193 112.336 57.2461C110.962 65.8871 112.166 72.0016 113.318 73.371C114.291 73.1056 118.878 71.0674 128.231 55.8661L135.872 43.4567L143.968 48.4778L136.327 60.8872C127.047 75.9718 119.765 83.0098 113.255 83.0098ZM42.0003 45.2188C38.2061 51.1741 36.0712 55.8343 34.8875 59.1675C32.89 64.7619 33.0169 67.9571 33.3233 69.2522C35.1306 68.2119 38.9988 63.8702 41.6304 53.8704C43.0466 48.5096 42.6027 46.015 42.0003 45.2188Z" fill={fill}/>
            <path d="M134.191 18.6482C134.191 15.1132 136.855 12.5337 140.659 12.5337C144.464 12.5337 147.128 15.1132 147.128 18.6482C147.128 22.1831 144.559 24.7627 140.659 24.7627C136.76 24.7627 134.191 22.1831 134.191 18.6482ZM135.713 30.9727H145.511V82.5638H135.713V30.9727Z" fill={fill}/>
            <path d="M152.75 30.9725H162.547C162.547 34.3164 162.547 36.3227 162.452 39.571H162.547C165.496 33.8387 170.537 30.877 176.625 30.877C177.481 30.877 178.432 30.877 179.383 30.9725V39.9532H175.864C167.113 39.9532 162.547 46.6409 162.547 54.7617V82.5635H152.75V30.9725Z" fill={fill}/>
            <path d="M179.31 56.9592C179.31 41.4819 189.392 29.8262 202.899 29.8262C210.794 29.8262 216.882 33.0745 220.306 39.3801H220.496C220.401 36.4184 220.401 34.5076 220.401 30.9726H230.198V82.5637H220.401C220.401 79.0288 220.401 77.6912 220.496 74.3473H220.306C216.691 80.2708 210.128 83.9012 202.899 83.9012C189.107 83.9012 179.31 72.5321 179.31 56.9592ZM220.781 56.8637C220.781 46.2589 214.408 38.8068 204.801 38.8068C195.194 38.8068 189.107 46.7366 189.107 56.9592C189.107 67.1819 195.385 74.9206 204.801 74.9206C214.218 74.9206 220.781 67.6596 220.781 56.8637Z" fill={fill}/>
            <path d="M235.388 56.864C235.388 41.1001 245.756 29.4443 261.07 29.4443C276.384 29.4443 285.23 39.667 285.23 55.3354C285.23 56.7685 285.135 58.0105 284.945 59.4436H244.9C245.946 68.6153 252.129 75.2075 261.355 75.2075C267.823 75.2075 272.865 72.0547 275.813 66.1313L283.993 70.2395C279.428 79.5068 271.152 83.9971 260.975 83.9971C245.661 83.9971 235.388 72.5324 235.388 56.864ZM276.099 51.6094C274.957 43.4886 269.821 38.2339 261.07 38.2339C252.794 38.2339 247.087 43.7752 245.28 51.6094H276.099Z" fill={fill}/>
            <path d="M288.157 56.864C288.157 41.1001 298.525 29.4443 313.839 29.4443C329.153 29.4443 338 39.667 338 55.3354C338 56.7685 337.904 58.0105 337.714 59.4436H297.669C298.715 68.6153 304.898 75.2075 314.125 75.2075C320.593 75.2075 325.634 72.0547 328.583 66.1313L336.763 70.2395C332.197 79.5068 323.922 83.9971 313.744 83.9971C298.43 83.9971 288.157 72.5324 288.157 56.864ZM328.858 51.6094C327.716 43.4886 322.58 38.2339 313.829 38.2339C305.553 38.2339 299.846 43.7752 298.039 51.6094H328.858Z" fill={fill}/>
        </svg>
    )
}

// ─── Site nav (used by every routed page) ────────────────────────────────────
// V1.1 follows the content doc's navigation bar exactly (Part 2.2):
// Platform · For Teams · Why Miraee · AI & Technology · Resources · [Book a demo].
// Home is reached through the logo, and Trust & Security plus About live in the
// footer. V1 keeps its original links, since For Teams and Why Miraee only
// exist under the /v1.1 prefix.
const v1NavLinks = (prefix: "" | "/v1.1"): [string, string][] => prefix === "/v1.1"
    ? [
        ["Platform", `${prefix}/product`],
        ["For Teams", `${prefix}/for-teams`],
        ["Why Miraee", `${prefix}/why-miraee`],
        ["AI & Technology", `${prefix}/technology`],
        ["Resources", `${prefix}/resources`],
    ]
    : [
        ["Home", "/"],
        ["Platform", "/v1/product"],
        ["Solutions", "/v1/solutions"],
        ["AI & Technology", "/v1/technology"],
        ["About", "/v1/about"],
    ]

export function SiteNav() {
    const vw = useWindowWidth()
    const pathname = useLocation().pathname
    const isV11 = pathname === "/v1.1" || pathname.startsWith("/v1.1/")
    const activeVersion = resolveSiteVersion(pathname)
    const isMobile = vw < 640
    const isCompact = vw < 1180
    const [open, setOpen] = useState(false)
    const siteNavLinks = v1NavLinks(isV11 ? "/v1.1" : "")
    const mobileLinks = siteNavLinks
    return (
        <>
            <motion.nav
                className="site-nav"
                initial={{ y: -28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: EO }}
                aria-label="Primary"
                style={{ position: "fixed", top: 14, left: "50%", x: "-50%", zIndex: 200, width: isCompact ? "min(1080px, calc(100vw - 24px))" : "min(1280px, calc(100vw - 24px))", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "0 6px 0 12px" : "0 10px 0 26px", borderRadius: 100, background: "var(--glass-bg)", backdropFilter: "blur(18px)", border: "1px solid rgba(var(--text-rgb),0.08)", boxShadow: "0 10px 34px rgba(var(--text-rgb),0.08)" }}>
                <Link to={isV11 ? "/v1.1" : "/"} aria-label="Miraee home" style={{ textDecoration: "none", display: "inline-flex", flexShrink: 0 }}><MiraeeLogo fill={T.orange} height={isMobile ? 19 : 24} /></Link>
                {!isCompact && (
                    <div aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {siteNavLinks.map(([label, href]) => (
                            <Link key={href} to={href} aria-current={pathname === href ? "page" : undefined}
                                style={{ padding: "8px 13px", borderRadius: 100, fontSize: 13, fontFamily: F, fontWeight: 600, whiteSpace: "nowrap", textDecoration: "none", color: pathname === href ? T.ink : T.muted, background: pathname === href ? "rgba(var(--text-rgb),0.06)" : "transparent", transition: "color .2s ease,background .2s ease" }}>
                                {label}
                            </Link>
                        ))}
                    </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 4 : 16 }}>
                    <div className="site-version-switch" aria-label="Choose site version" style={{ display: "flex", alignItems: "center", padding: 3, border: "1px solid rgba(var(--text-rgb),0.10)", borderRadius: 100, background: "rgba(var(--text-rgb),0.035)" }}>
                        {SITE_VERSIONS.map(([version, href]) => <Link key={version} to={href} aria-current={activeVersion === version ? "page" : undefined}
                            style={{ display: "grid", placeItems: "center", minWidth: isMobile ? 26 : 38, height: isMobile ? 26 : 30, padding: isMobile ? "0 4px" : "0 8px", borderRadius: 100, background: activeVersion === version ? T.ink : "transparent", color: activeVersion === version ? T.cream : T.muted, fontSize: isMobile ? 9 : 10, fontFamily: F, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", textDecoration: "none", transition: "background .2s ease,color .2s ease" }}>{version}</Link>)}
                    </div>
                    {!isMobile && <ThemeToggle size={34} />}
                    {!isMobile && !isCompact && <a href="https://app.miraee.ai"
                        onMouseEnter={e => (e.currentTarget.style.color = T.ink)}
                        onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
                        onFocus={e => (e.currentTarget.style.color = T.ink)}
                        onBlur={e => (e.currentTarget.style.color = T.muted)}
                        style={{ fontSize: 13.5, fontFamily: F, fontWeight: 600, color: T.muted, textDecoration: "none", transition: "color 0.25s ease" }}>Sign in</a>}
                    <motion.a className="site-nav__demo" href="/book-a-demo" whileHover={{ scale: 1.04, boxShadow: "0 10px 28px rgba(229,86,2,0.28)" }} whileTap={{ scale: 0.96 }}
                        style={{ display: "inline-flex", alignItems: "center", background: T.accent, color: T.cream, borderRadius: 100, padding: isMobile ? "10px 16px" : "11px 22px", fontSize: 13, fontFamily: F, fontWeight: 700, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap" }}>
                        Book a demo
                    </motion.a>
                    {isCompact && (
                        <button type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="site-nav-mobile-menu" onClick={() => setOpen(v => !v)}
                            style={{ position: "relative", width: isMobile ? 30 : 34, height: isMobile ? 30 : 34, flexShrink: 0, border: "1px solid rgba(var(--text-rgb),0.14)", borderRadius: "50%", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span aria-hidden="true" style={{ position: "absolute", width: 14, height: 1.5, background: T.ink, borderRadius: 2, transform: open ? "rotate(45deg)" : "translateY(-3px)", transition: "transform 0.25s ease" }} />
                            <span aria-hidden="true" style={{ position: "absolute", width: 14, height: 1.5, background: T.ink, borderRadius: 2, transform: open ? "rotate(-45deg)" : "translateY(3px)", transition: "transform 0.25s ease" }} />
                        </button>
                    )}
                </div>
            </motion.nav>
            <AnimatePresence>
                {isCompact && open && (
                    <motion.div id="site-nav-mobile-menu" key="mobile-nav-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25, ease: EO }}
                        style={{ position: "fixed", top: 80, left: "50%", x: "-50%", zIndex: 199, width: "min(340px, calc(100vw - 24px))", background: "var(--glass-bg)", backdropFilter: "blur(20px)", border: "1px solid rgba(var(--text-rgb),0.08)", borderRadius: 20, boxShadow: "0 20px 50px rgba(var(--text-rgb),0.14)", padding: 10, display: "flex", flexDirection: "column", gap: 2 }}>
                        {mobileLinks.map(([label, href]) => <Link key={label} to={href} onClick={() => setOpen(false)}
                            style={{ padding: "12px 14px", borderRadius: 12, fontSize: 14, fontFamily: F, fontWeight: 600, color: T.ink, textDecoration: "none" }}>
                            {label}
                        </Link>)}
                        <a href="https://app.miraee.ai" onClick={() => setOpen(false)}
                            style={{ padding: "12px 14px", borderRadius: 12, fontSize: 14, fontFamily: F, fontWeight: 600, color: T.ink, textDecoration: "none" }}>
                            Sign in
                        </a>
                        <a className="site-nav__menu-demo" href="/book-a-demo" onClick={() => setOpen(false)}
                            style={{ padding: "12px 14px", borderRadius: 12, fontSize: 14, fontFamily: F, fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                            Book a demo
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

// ─── Site footer (used by every routed page) ─────────────────────────────────
type FooterLink = { label: string; href?: string; external?: boolean; disabled?: boolean }
type SiteVersion = "v1" | "v1.1" | "v2"

export function SiteFooter({ version }: { version?: SiteVersion } = {}) {
    const vw = useWindowWidth()
    const isMobile = vw < 640
    const pathname = useLocation().pathname
    const isV11 = pathname === "/v1.1" || pathname.startsWith("/v1.1/")
    const isV1 = isV11 || (version ? version === "v1" || version === "v1.1" : pathname === "/" || pathname.startsWith("/v1/"))
    const resolvedVersion: SiteVersion = isV11 ? "v1.1" : isV1 ? "v1" : "v2"
    const versionHref = (v1: string, v2: string) => {
        if (!isV1) return v2
        return isV11 ? v1.replace(/^\/v1(?=\/|$)/, "/v1.1") : v1
    }
    const footRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: footRef, offset: ["start end", "end end"] })
    const wmY = useTransform(scrollYProgress, [0, 1], [160, 0])
    const wmOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 0.06])

    const linkStyle: React.CSSProperties = { display: "block", fontSize: 14, fontFamily: F, fontWeight: 500, color: "rgba(251,246,242,0.55)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }
    const disabledStyle: React.CSSProperties = { display: "block", fontSize: 14, fontFamily: F, fontWeight: 500, color: "rgba(251,246,242,0.28)", marginBottom: 10 }
    const hoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = T.cream)
    const hoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "rgba(251,246,242,0.55)")

    // V1.1 uses the content doc's footer (Part 2.2): Product / Company /
    // Resources. Pricing and Newsroom are omitted until they exist, as the doc
    // marks them "when available" / "add when content exists". Other versions
    // keep the original footer below.
    const V11_COLS: { title: string; links: FooterLink[] }[] = [
        {
            title: "Product", links: [
                { label: "Platform", href: "/v1.1/product" },
                { label: "For Teams", href: "/v1.1/for-teams" },
                { label: "Why Miraee", href: "/v1.1/why-miraee" },
                { label: "AI & Technology", href: "/v1.1/technology" },
                { label: "Pricing", disabled: true },
            ],
        },
        {
            title: "Company", links: [
                { label: "About", href: "/v1.1/about" },
                { label: "Trust & Security", href: "/v1.1/security" },
                { label: "Careers", disabled: true },
                { label: "Contact", href: "mailto:hello@miraee.ai" },
            ],
        },
        {
            title: "Resources", links: [
                { label: "Guides", href: "/v1.1/resources#guides" },
                { label: "Calculators", href: "/v1.1/resources#calculators" },
                { label: "Webinars", href: "/v1.1/resources#webinars" },
                { label: "Help Center", href: "/support" },
                { label: "Status", href: "https://status.miraee.ai", external: true },
            ],
        },
    ]

    const LEGACY_COLS: { title: string; links: FooterLink[] }[] = [
        {
            title: "Explore", links: [
                { label: "Platform", href: versionHref("/v1/product", "/product") },
                { label: "Solutions", href: versionHref("/v1/solutions", "/for-teams") },
                { label: "Resources", href: versionHref("/v1/resources", "/resources") },
                { label: "AI & Technology", href: versionHref("/v1/technology", "/technology") },
                { label: "Why Miraee", href: versionHref("/v1/why-miraee", "/why-miraee") },
                { label: "Support", href: "/support" },
                { label: "Careers", disabled: true },
                { label: "Newsroom", href: versionHref("/v1/about#newsroom", "/about#newsroom") },
            ],
        },
        {
            title: "Partners & legal", links: [
                { label: "Partner with us", href: "mailto:partners@miraee.ai" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy", href: "/privacy" },
                { label: "Trust & Security", href: versionHref("/v1/security", "/security") },
                { label: "Arbitration opt-out", href: "/arbitration-opt-out" },
                { label: "Dispute notice", href: "/dispute-notice" },
            ],
        },
        {
            title: "Talk to us", links: [
                { label: "About Miraee", href: versionHref("/v1/about", "/about") },
                { label: "hello@miraee.ai", href: "mailto:hello@miraee.ai" },
            ],
        },
    ]

    const COLS = isV11 ? V11_COLS : LEGACY_COLS

    return (
        <footer ref={footRef} data-site-version={resolvedVersion} style={{ background: "#0F0407", padding: isMobile ? "60px 20px 40px" : "80px 64px 48px", position: "relative", overflow: "hidden" }}>
            <motion.div aria-hidden="true" style={{ y: wmY, opacity: wmOpacity, position: "absolute", bottom: isMobile ? -20 : -50, left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
                <MiraeeLogo fill={T.cream} height={isMobile ? 120 : 260} />
            </motion.div>
            <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 48 : 64, marginBottom: 64, flexWrap: "wrap" as const }}>
                    <div style={{ flex: "0 0 auto", maxWidth: 280 }}>
                        <MiraeeLogo fill={T.orange} height={28} />
                        <p style={{ fontSize: 14, fontFamily: F, lineHeight: 1.65, color: "rgba(251,246,242,0.45)", marginTop: 20, marginBottom: 0 }}>The AI-native corporate travel platform. A Tabhi company.</p>
                        <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
                            <motion.a href="/book-a-demo" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} style={{ display: "inline-flex", background: T.orange, color: "#FFFFFF", border: "none", borderRadius: 10, padding: "11px 22px", fontSize: 13, fontFamily: F, fontWeight: 700, cursor: "pointer", textDecoration: "none" }}>Book a demo</motion.a>
                            <motion.a href="/support" whileHover={{ scale: 1.03, borderColor: "rgba(251,246,242,0.5)" }} whileTap={{ scale: 0.96 }}
                                style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "transparent", color: T.cream, border: "1.5px solid rgba(251,246,242,0.25)", borderRadius: 10, padding: "11px 20px", fontSize: 13, fontFamily: F, fontWeight: 700, cursor: "pointer", textDecoration: "none" }}>
                                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                                Support
                            </motion.a>
                        </div>
                    </div>
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr", gap: 32, minWidth: isMobile ? undefined : 320 }}>
                        {COLS.map(col => (
                            <div key={col.title}>
                                <p style={{ fontSize: 11, fontFamily: F, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(251,246,242,0.35)", margin: "0 0 16px" }}>{col.title}</p>
                                {col.links.map(link => link.disabled ? (
                                    <span key={link.label} style={disabledStyle}>{link.label} <em style={{ fontStyle: "normal", fontSize: 11 }}>· coming soon</em></span>
                                ) : (
                                    <a key={link.label} href={link.href}
                                        target={link.external ? "_blank" : undefined}
                                        rel={link.external ? "noopener noreferrer" : undefined}
                                        style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{link.label}</a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Doc Part 2.2: trust chips in the footer. */}
                {isV11 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                        {["SOC 2", "GDPR", "SSO/SCIM", "Audit logs"].map(chip => (
                            <span key={chip} style={{ padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(251,246,242,0.16)", fontSize: 11, fontFamily: F, fontWeight: 600, color: "rgba(251,246,242,0.55)" }}>{chip}</span>
                        ))}
                    </div>
                )}
                <div style={{ borderTop: "1px solid rgba(251,246,242,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <p style={{ fontSize: 13, fontFamily: F, color: "rgba(251,246,242,0.28)", margin: 0 }}>
                        {/* Doc Part 2.2 group line. */}
                        {isV11 ? "Miraee is part of Tabhi, alongside Mondee and Abhee. " : "© 2026 Miraee, a Tabhi company. "}
                        <a href="/privacy" style={{ color: "rgba(251,246,242,0.5)", textDecoration: "none", fontWeight: 600 }}>Privacy</a> · <a href="/terms" style={{ color: "rgba(251,246,242,0.5)", textDecoration: "none", fontWeight: 600 }}>Terms</a> · <a href={versionHref("/v1/security", "/security")} style={{ color: "rgba(251,246,242,0.5)", textDecoration: "none", fontWeight: 600 }}>Security</a>
                    </p>
                    <p style={{ fontSize: 13, fontFamily: F, color: "rgba(251,246,242,0.28)", margin: 0 }}>{isV11 ? "© 2026 Miraee" : "Built by Tabhi AI"}</p>
                </div>
            </div>
        </footer>
    )
}

export function V1Footer() {
    return <SiteFooter version="v1" />
}

export function V2Footer() {
    return <SiteFooter version="v2" />
}

// ─── Form primitives (shared by Support, Arbitration Opt-Out, Dispute Notice, Book a Demo) ──
export const inputBase: React.CSSProperties = {
    width: "100%", boxSizing: "border-box", background: T.card, border: "1.5px solid " + T.border,
    borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: F, color: T.ink, outline: "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
}
export const labelStyle: React.CSSProperties = { fontSize: 13, fontFamily: F, fontWeight: 600, color: T.ink, marginBottom: 7, display: "block" }

export function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
    // Derive a stable id from the wrapped input's own id/name (falling back to a
    // generated one) and wire it to this label's htmlFor so screen readers
    // announce the field label — the input itself never has to know its id
    // ahead of time.
    const generatedId = useId()
    const child = isValidElement<{ id?: string; name?: string }>(children) ? children : null
    const fieldId: string = (child?.props?.id) || (child?.props?.name) || generatedId
    const content = child ? cloneElement(child, { id: fieldId }) : children
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <label htmlFor={fieldId} style={labelStyle}>{label}{required ? <span style={{ color: T.orange }}> *</span> : null}</label>
            <div style={{ marginTop: "auto" }}>
                {content}
                {hint ? <p style={{ fontSize: 12, fontFamily: F, color: T.muted, margin: "7px 0 0", lineHeight: 1.5 }}>{hint}</p> : null}
            </div>
        </div>
    )
}

export function TextInput({ placeholder, type = "text", required, name, defaultValue, readOnly, id }: { placeholder?: string; type?: string; required?: boolean; name?: string; defaultValue?: string; readOnly?: boolean; id?: string }) {
    const [focus, setFocus] = useState(false)
    return (
        <input id={id ?? name} type={type} name={name} placeholder={placeholder} required={required} defaultValue={defaultValue} readOnly={readOnly}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            style={{ ...inputBase, borderColor: focus ? T.orange : T.border, boxShadow: focus ? "0 0 0 3px rgba(229,86,2,0.12)" : "none", opacity: readOnly ? 0.75 : 1 }} />
    )
}

export function TextArea({ placeholder, required, rows = 4, name, id }: { placeholder?: string; required?: boolean; rows?: number; name?: string; id?: string }) {
    const [focus, setFocus] = useState(false)
    return (
        <textarea id={id ?? name} placeholder={placeholder} name={name} required={required} rows={rows} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            style={{ ...inputBase, resize: "vertical", minHeight: 96, borderColor: focus ? T.orange : T.border, boxShadow: focus ? "0 0 0 3px rgba(229,86,2,0.12)" : "none" }} />
    )
}

export function Select({ options, value, onChange, required, name, id, placeholder }: { options: string[]; value: string; onChange: (v: string) => void; required?: boolean; name?: string; id?: string; placeholder?: string }) {
    const [focus, setFocus] = useState(false)
    return (
        <select id={id ?? name} value={value} name={name} required={required} onChange={e => onChange(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            style={{ ...inputBase, appearance: "auto" as const, cursor: "pointer", borderColor: focus ? T.orange : T.border, boxShadow: focus ? "0 0 0 3px rgba(229,86,2,0.12)" : "none" }}>
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
    )
}

export function RadioGroup({ name, options, value, onChange }: { name: string; options: string[]; value: string; onChange: (v: string) => void }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {options.map(o => (
                <label key={o} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", border: "1.5px solid " + (value === o ? T.orange : T.border), borderRadius: 12, padding: "12px 14px", background: value === o ? "rgba(229,86,2,0.06)" : T.card, transition: "border-color 0.2s ease, background 0.2s ease" }}>
                    <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} required
                        style={{ marginTop: 2.5, accentColor: T.orange, width: 15, height: 15, flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, fontFamily: F, lineHeight: 1.5, color: T.ink }}>{o}</span>
                </label>
            ))}
        </div>
    )
}

export function SectionHead({ title }: { title: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "14px 0 2px" }}>
            <h2 style={{ fontSize: 11, fontFamily: F, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" as const, color: T.orange, whiteSpace: "nowrap", margin: 0 }}>{title}</h2>
            <div style={{ flex: 1, height: 1, background: T.border }} />
        </div>
    )
}

export function BulletList({ items }: { items: string[] }) {
    return (
        <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
            {items.map((it, i) => <li key={i} style={{ fontSize: 13.5, fontFamily: F, lineHeight: 1.55, color: T.muted }}>{it}</li>)}
        </ul>
    )
}

export function SuccessScreen({ title, body, onReset, resetLabel }: { title: string; body: string; onReset: () => void; resetLabel: string }) {
    return (
        <motion.div key="done" initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: EO }}
            style={{ textAlign: "center", padding: "80px 24px" }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                style={{ width: 64, height: 64, borderRadius: "50%", background: "#3BA55D", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </motion.div>
            <h2 style={{ fontFamily: FH, fontSize: 26, fontWeight: 800, color: T.ink, margin: "0 0 10px" }}>{title}</h2>
            <p style={{ fontSize: 15, fontFamily: F, lineHeight: 1.65, color: T.muted, margin: "0 0 28px" }}>{body}</p>
            <button onClick={onReset} style={{ background: "transparent", border: "1.5px solid " + T.border, borderRadius: 12, padding: "12px 24px", fontSize: 14, fontFamily: F, fontWeight: 600, color: T.ink, cursor: "pointer" }}>{resetLabel}</button>
        </motion.div>
    )
}

export function MediaColumn({ isNarrow, imageSrc, imageAlt, quote, chips, badgeLabel, badgeSub }: {
    isNarrow: boolean; imageSrc: string; imageAlt: string; quote: React.ReactNode;
    chips: string[]; badgeLabel?: string; badgeSub?: string
}) {
    const mediaRef = useRef<HTMLDivElement>(null)
    const mediaInView = useInView(mediaRef, { once: true, margin: "-8% 0px" })
    const [imgHov, setImgHov] = useState(false)
    return (
        <div style={{ flex: 1, minWidth: 0, position: isNarrow ? "relative" : "sticky", top: isNarrow ? undefined : 92, alignSelf: "flex-start" }}>
            <div ref={mediaRef} style={{ position: "relative", height: isNarrow ? 420 : "calc(100dvh - 124px)", minHeight: 420 }}>
                <motion.div initial={{ clipPath: "inset(0% 0% 100% 0%)" }} animate={mediaInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}} transition={{ duration: 1.1, ease: EO }}
                    onMouseEnter={() => setImgHov(true)} onMouseLeave={() => setImgHov(false)}
                    style={{ position: "absolute", inset: 0, borderRadius: isNarrow ? "22px 22px 22px 48px" : "40px 40px 40px 120px", overflow: "hidden", willChange: "clip-path" }}>
                    <motion.img src={imageSrc} alt={imageAlt}
                        initial={{ scale: 1.18 }} animate={mediaInView ? { scale: imgHov ? 1.05 : 1 } : {}} transition={{ duration: 1.1, ease: EO }}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.22) 45%, transparent 65%)" }} />
                    {badgeLabel && (
                        <motion.div initial={{ opacity: 0, y: 14 }} animate={mediaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7, ease: EO }}
                            style={{ position: "absolute", top: 28, left: 28, display: "flex", alignItems: "center", gap: 9, background: "rgba(0,0,0,0.52)", backdropFilter: "blur(10px)", borderRadius: 100, padding: "9px 16px" }}>
                            <motion.span animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: "50%", background: "#3BA55D" }} />
                            <span style={{ fontSize: 12.5, fontFamily: F, fontWeight: 700, color: "#fff" }}>{badgeLabel}</span>
                            {badgeSub && <span style={{ fontSize: 12.5, fontFamily: F, color: "rgba(255,255,255,0.65)" }}>{badgeSub}</span>}
                        </motion.div>
                    )}
                    <div style={{ position: "absolute", left: isNarrow ? 24 : 40, right: isNarrow ? 24 : 40, bottom: isNarrow ? 24 : 36 }}>
                        <motion.p initial={{ opacity: 0, y: 22 }} animate={mediaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: EO }}
                            style={{ fontFamily: F, fontStyle: "italic", fontWeight: 500, fontSize: isNarrow ? 22 : "clamp(1.6rem,2.4vw,2.3rem)", lineHeight: 1.3, color: "#fff", margin: "0 0 22px", letterSpacing: "-0.01em" }}>
                            {quote}
                        </motion.p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                            {chips.map((chip, i) => (
                                <motion.div key={chip} initial={{ opacity: 0, y: 14 }} animate={mediaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.75 + i * 0.12, ease: EO }}
                                    style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(10px)", borderRadius: 12, padding: "10px 16px", fontSize: 12.5, fontFamily: F, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                                    {chip}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export const TICKET_ENDPOINT = import.meta.env.VITE_TICKET_ENDPOINT as string
