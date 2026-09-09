import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import V11Hero from "../components/V11Hero"
import "./HomeV12.css"
import { usePageMeta } from "../hooks/usePageMeta"
import V11PageImage from "../components/V11PageImage"
import resourcesPageImg from "../../images/weavy/v1/solutions/v1-solutions-travelleads.webp"
gsap.registerPlugin(ScrollTrigger)

const T = {
    ink: "var(--text)", maroon: "#450E14", orange: "#E55602",
    cream: "#FBF6F2", white: "#FFFFFF",
    muted: "rgba(var(--text-rgb),0.45)", mutedLight: "rgba(var(--text-rgb),0.12)",
    accent: "var(--accent-strong)",
}

function useGSAP(cb: (gsap: any, ST: any) => void | (() => void), deps: any[] = []) {
    useEffect(() => {
        const cleanup = cb(gsap, ScrollTrigger)
        return () => { if (typeof cleanup === "function") cleanup() }
    }, deps)
}

function useWindowWidth() {
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1440)
    useEffect(() => {
        const fn = () => setW(window.innerWidth)
        window.addEventListener("resize", fn)
        return () => window.removeEventListener("resize", fn)
    }, [])
    return w
}

function SmoothScrollStyle() {
    useEffect(() => {
        if (typeof document === "undefined") return
        const existing = document.getElementById("tech-scroll-style")
        if (existing) return
        const s = document.createElement("style")
        s.id = "tech-scroll-style"
        s.textContent = `html{scroll-behavior:smooth;} *{-webkit-font-smoothing:antialiased;}`
        document.head.appendChild(s)
    }, [])
    return null
}

function ScrollBar() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        if (typeof window === "undefined") return
        const h = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            setProgress(max > 0 ? window.scrollY / max : 0)
        }
        window.addEventListener("scroll", h)
        return () => window.removeEventListener("scroll", h)
    }, [])
    return <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: T.orange, transformOrigin: "left", scaleX: progress, zIndex: 200 }} />
}

// --- GUIDES & REPORTS ------------------------------------------------------
const GUIDES: [string, string][] = [
    ["The $255B Opportunity in Unmanaged Travel", "why the mid-market is the next battleground."],
    ["From Cost Center to ROI Engine", "a finance leader's guide to measurable travel."],
    ["The Agentic Era of Corporate Travel", "what changes when AI agents run the trip."],
    ["Six Systems, One Trip", "the hidden cost of a disconnected travel stack."],
]

function Guides() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap) => {
        if (!sectionRef.current) return
        const hd = sectionRef.current.querySelector(".gd-heading")
        if (hd) {
            const wds = hd.querySelectorAll(".gd-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.045, ease: "power4.out",
                  scrollTrigger: { trigger: hd, start: "top 76%", once: true } })
        }
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll(".gd-card")
            gsap.fromTo(cards, { y: 60, opacity: 0, clipPath: "inset(0 0 30% 0)" },
                { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.75, stagger: 0.1, ease: "power3.out",
                  scrollTrigger: { trigger: gridRef.current, start: "top 70%", once: true } })
        }
    }, [])

    return (
        <section ref={sectionRef} id="guides" style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ marginBottom: isMobile ? 48 : 64 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 16 }}>
                        01 / Guides &amp; reports
                    </motion.span>
                    <h2 className="gd-heading" style={{ fontSize: isMobile ? 30 : isTablet ? 44 : 54, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: 0, maxWidth: 720 }}>
                        {["Go", "deep", "on", "the", "shift", "to", "agentic", "travel."].map((word, i) => (
                            <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                                <span className="gd-w" style={{ display: "inline-block" }}>{word}</span>
                            </span>
                        ))}
                    </h2>
                </div>

                <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 14 }}>
                    {GUIDES.map(([title, description], index) => (
                        <motion.div key={title} className="gd-card"
                            whileHover={{ borderColor: "rgba(229,86,2,0.4)", y: -4 }}
                            style={{ padding: isMobile ? "26px 22px" : "36px 32px", borderRadius: 20, background: "rgba(var(--text-rgb),0.03)", border: "1px solid rgba(var(--text-rgb),0.08)", position: "relative", overflow: "hidden" }}>
                            <span style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, letterSpacing: "0.04em" }}>0{index + 1}</span>
                            <h3 style={{ fontSize: isMobile ? 19 : 22, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.28, letterSpacing: "-0.015em", margin: "14px 0 10px" }}>{title}</h3>
                            <p style={{ fontSize: 14, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.7, margin: 0 }}>
                                <span aria-hidden="true">- </span>{description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- CALCULATORS -----------------------------------------------------------
const CALCULATORS: [string, string][] = [
    ["ROI and savings calculator", "hours reclaimed, spend brought under management, projected return."],
    ["Unmanaged spend estimator", "how much of your travel budget is invisible today."],
    ["Tool consolidation calculator", "the cost of your current 6+ tool stack vs. one platform."],
]

function Calculators() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap) => {
        if (!sectionRef.current) return
        const hd = sectionRef.current.querySelector(".cc-heading")
        if (hd) {
            const wds = hd.querySelectorAll(".cc-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.05, ease: "power4.out",
                  scrollTrigger: { trigger: hd, start: "top 76%", once: true } })
        }
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll(".cc-card")
            gsap.fromTo(cards, { y: 55, opacity: 0, scale: 0.96 },
                { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
                  scrollTrigger: { trigger: gridRef.current, start: "top 70%", once: true } })
        }
    }, [])

    return (
        <section ref={sectionRef} id="calculators" style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.038) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                <div style={{ marginBottom: isMobile ? 48 : 64 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 16 }}>
                        02 / Calculators
                    </motion.span>
                    <h2 className="cc-heading" style={{ fontSize: isMobile ? 30 : isTablet ? 44 : 54, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: 0, maxWidth: 640 }}>
                        {["Put", "numbers", "to", "the", "opportunity."].map((word, i) => (
                            <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                                <span className="cc-w" style={{ display: "inline-block" }}>{word}</span>
                            </span>
                        ))}
                    </h2>
                </div>

                <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 14, marginBottom: isMobile ? 36 : 48 }}>
                    {CALCULATORS.map(([title, description], index) => (
                        <motion.div key={title} className="cc-card"
                            whileHover={{ borderColor: "rgba(229,86,2,0.5)", y: -4 }}
                            style={{ padding: isMobile ? "26px 22px" : "32px 28px", borderRadius: 20, background: "rgba(var(--text-rgb),0.04)", border: "1px solid rgba(var(--text-rgb),0.08)" }}>
                            <span style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, letterSpacing: "0.04em" }}>0{index + 1}</span>
                            <h3 style={{ fontSize: isMobile ? 18 : 20, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.25, letterSpacing: "-0.01em", margin: "14px 0 10px" }}>{title}</h3>
                            <p style={{ fontSize: 13.5, color: "rgba(var(--text-rgb),0.48)", fontFamily: "var(--font-sans)", lineHeight: 1.7, margin: 0 }}>
                                <span aria-hidden="true">- </span>{description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <motion.a href="mailto:hello@miraee.ai?subject=Miraee%20calculator%20access"
                        whileHover={{ x: 4 }}
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontFamily: "var(--font-sans)", fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                        Try the calculators <span aria-hidden="true">↗</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}

// --- WEBINARS + HELP CENTER -------------------------------------------------
function WebinarsAndHelp() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap) => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".wh-card")
        gsap.fromTo(cards, { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, stagger: 0.14, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "0 24px 80px" : "0 80px 130px", background: "var(--page-bg)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
                <div id="webinars" className="wh-card" style={{ padding: isMobile ? "34px 26px" : "48px 44px", borderRadius: 24, background: T.maroon, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 340, height: 340, background: "radial-gradient(circle, rgba(229,86,2,0.14) 0%, transparent 65%)", pointerEvents: "none" }}/>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 20 }}>03 / Webinars</span>
                    <h2 style={{ fontSize: isMobile ? 26 : 32, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.cream, lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 16px", maxWidth: 380 }}>Learn from the teams building the agentic era.</h2>
                    <p style={{ fontSize: 14.5, color: "rgba(251,246,242,0.55)", fontFamily: "var(--font-sans)", lineHeight: 1.75, margin: "0 0 28px", maxWidth: 400 }}>
                        Live and on-demand sessions on AI in travel, <strong style={{ color: T.cream, fontWeight: 700 }}>expense automation</strong>, MICE, and building a measurable travel program.
                    </p>
                    <motion.a href="mailto:hello@miraee.ai?subject=Miraee%20webinars" whileHover={{ x: 4 }}
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14.5, fontFamily: "var(--font-sans)", fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                        Browse webinars <span aria-hidden="true">↗</span>
                    </motion.a>
                </div>

                <div id="help-center" className="wh-card" style={{ padding: isMobile ? "34px 26px" : "48px 44px", borderRadius: 24, background: "rgba(var(--text-rgb),0.03)", border: "1px solid rgba(var(--text-rgb),0.08)" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 20 }}>04 / Help center</span>
                    <h2 style={{ fontSize: isMobile ? 26 : 32, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 16px", maxWidth: 380 }}>Answers, fast.</h2>
                    <p style={{ fontSize: 14.5, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.75, margin: "0 0 28px", maxWidth: 400 }}>
                        Setup guides, admin documentation, traveler how-tos, and integration walkthroughs - searchable and always current.
                    </p>
                    <motion.div whileHover={{ x: 4 }} style={{ display: "inline-block" }}>
                        <Link to="/support" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14.5, fontFamily: "var(--font-sans)", fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                            Visit the Help Center <span aria-hidden="true">↗</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

// --- FAQ ---------------------------------------------------------------------
function ClosingCTA() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap) => {
        if (!sectionRef.current) return
        const hd = sectionRef.current.querySelector(".rcta-heading")
        if (hd) {
            const wds = hd.querySelectorAll(".rcta-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.06, ease: "power4.out",
                  scrollTrigger: { trigger: hd, start: "top 78%", once: true } })
        }
    }, [])

    return (
        <section ref={sectionRef} id="demo" style={{ padding: isMobile ? "90px 24px" : "150px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(229,86,2,0.08) 0%, transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
                <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                    style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 20 }}>
                    See the agent in action
                </motion.span>
                <h2 className="rcta-heading" style={{ fontSize: isMobile ? 34 : 56, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 22px" }}>
                    {["Bring", "a", "real", "trip."].map((word, i) => (
                        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                            <span className="rcta-w" style={{ display: "inline-block" }}>{word}</span>
                        </span>
                    ))}
                </h2>
                <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ fontSize: isMobile ? 15 : 17, color: "rgba(var(--text-rgb),0.5)", fontFamily: "var(--font-sans)", lineHeight: 1.75, margin: "0 auto 40px", maxWidth: 460 }}>
                    Twenty minutes. Your route, your policy, your edge cases. We'll run it live.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.32 }}>
                    <motion.div whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(229,86,2,0.55)" }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block" }}>
                        <Link to="/book-a-demo" style={{ padding: isMobile ? "14px 30px" : "17px 44px", background: T.orange, color: T.white, borderRadius: 12, fontSize: 15, fontFamily: "var(--font-sans)", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, letterSpacing: "0.01em" }}>
                            Book your demo <span aria-hidden="true">↗</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function MiraeeResourcesPage(_props: any) {
    usePageMeta(
        "Resources for Agentic Corporate Travel | Miraee",
        "Research, tools, and guidance for finance, travel, and people leaders building the future of agentic corporate travel.",
    )

    useEffect(() => {
        let meta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null
        if (!meta) {
            meta = document.createElement('meta') as HTMLMetaElement
            meta.name = 'viewport'
            document.head.appendChild(meta)
        }
        meta.content = 'width=device-width, initial-scale=1, maximum-scale=5'
    }, [])

        useEffect(() => {
        // Title tag + meta description per the doc's Resources SEO brief.
        document.title = "Resources | Guides, Calculators and Webinars | Miraee"
        const description = "Research, calculators and guidance for finance, travel and people leaders building an agentic travel program. Start with the ROI calculator."
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta) }
        meta.content = description
    }, [])

return (
        <div className="v1-type-page" style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "clip", background: "var(--page-bg)", fontFamily: "var(--font-sans)" }}>
            <SmoothScrollStyle/>
            <ScrollBar/>
            <SiteNav />
            <V11Hero
                kicker="Resources"
                title="Everything you need to shape"
                accent="the future of corporate travel."
                sub="Research, tools and guidance for finance, travel and people leaders building the agentic travel program."
                primaryCta={{ label: "Try the calculators", href: "#calculators" }}
                secondaryCta={{ label: "Browse guides ↓", href: "#guides" }}
                image={{ src: resourcesPageImg, alt: "Travel lead reviewing a corporate travel program" }} />
            <V11PageImage src={resourcesPageImg} alt="Travel leader moving through an airport with live journey context" label="Guidance for modern travel teams" caption="Practical thinking for teams building a more connected, responsive, and human travel program." position="center 42%" mobilePosition="42% center" />
            <Guides/>
            <Calculators/>
            <WebinarsAndHelp/>
            <ClosingCTA/>
            <V1Footer />
        </div>
    )
}
