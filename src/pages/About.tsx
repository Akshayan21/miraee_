import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import V11Hero from "../components/V11Hero"
import "./HomeV12.css"
import V11PageImage from "../components/V11PageImage"
import aboutPageImg from "../../images/weavy/v1/v1-experiences-culture.webp"
import miraeeLogo from "../assets/Miraee_Logo.png"
import mondeeLogo from "../assets/mondee_logo.png"
import abheeLogo from "../assets/abhee-logo-dark.png"
gsap.registerPlugin(ScrollTrigger)

const groupLogos: Record<string, string> = { Mondee: mondeeLogo, Miraee: miraeeLogo, Abhee: abheeLogo }

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

function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none" }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.2 })
    const initMap: Record<string, any> = { up: { y: 48, opacity: 0 }, left: { x: -48, opacity: 0 }, right: { x: 48, opacity: 0 }, none: { opacity: 0 } }
    const init = initMap[direction]
    return (
        <motion.div ref={ref} initial={init} animate={inView ? { x: 0, y: 0, opacity: 1 } : init} transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>
            {children}
        </motion.div>
    )
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

// --- CONTENT DATA (verbatim from AboutV2.tsx) --------------------------------
// Copy below is taken verbatim from the website content document (Page 8).
// This page is the single home for group structure, the supply advantage and
// supplier partnerships. Placeholder sections (Leadership, Global Presence,
// Newsroom) are removed per the doc until real content exists.

// Doc section 3 — The group.
const groupPlatforms = [
    ["Mondee", "The travel marketplace and supply layer", "The travel marketplace and supply layer Miraee books against: 500+ airlines, 2M+ hotels, 125M+ travelers reached."],
    ["Miraee", "The employee travel platform", "The employee travel platform. Plans, books, changes and expenses every trip end to end."],
    ["Abhee", "The hyperlocal experiential marketplace", "The hyperlocal experiential marketplace behind personal travel and experiences."],
]

// Doc section 4 — The advantage (six tiles).
const advantage = [
    ["Direct supply", "Direct supply, 500+ airlines.", "500+ airlines"],
    ["Global content", "Global content, 2M+ hotels.", "2M+ hotels"],
    ["Volume", "Volume, 125M+ travelers reached.", "125M+ reached"],
    ["Experience content", "Experience content, the Abhee network.", "Abhee network"],
    ["Financial stability", "Financial stability, institutional backing.", "Institutional backing"],
    ["Shared AI infrastructure", "Shared AI infrastructure, one engineering group.", "One engineering group"],
]

// Doc section 5 — How we build (four principles).
const principles = [
    ["01", "Complete the work", "An agent that returns options has not finished."],
    ["02", "Autonomy inside limits", "Every action has a written boundary and a log."],
    ["03", "A person when it matters", "Humans are for judgment, not for typing."],
    ["04", "The traveler is the test", "If the trip was not easier for the person taking it, nothing else counts."],
]

// Doc section 1 — Trust strip. 125M+ is always attributed to Mondee per the
// stat table.
const trustStrip = ["23 companies", "3 platforms", "500+ airlines", "2M+ hotels", "125M+ travelers reached through Mondee"]


function StoryPanel({ eyebrow, heading, paragraphs, closing, markLines, reverse }: {
    eyebrow: string; heading: React.ReactNode; paragraphs: string[]; closing?: string; markLines: string[]; reverse?: boolean
}) {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <Reveal>
            <div style={{
                display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr", gap: isMobile ? 32 : 56,
                alignItems: "center", padding: isMobile ? "56px 24px" : "80px 80px",
                maxWidth: 1200, margin: "0 auto",
                direction: reverse && !isMobile ? "rtl" as const : "ltr" as const,
            }}>
                <div style={{ direction: "ltr" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 16 }}>{eyebrow}</span>
                    <h2 style={{ fontSize: isMobile ? 30 : 46, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 22px" }}>{heading}</h2>
                    {paragraphs.map((p, i) => (
                        <p key={i} style={{ fontSize: 15, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.85, margin: "0 0 16px", maxWidth: 520 }}>{p}</p>
                    ))}
                    {closing && (
                        <p style={{ fontSize: 16, color: T.ink, fontFamily: "Cardo,serif", fontStyle: "italic", lineHeight: 1.6, margin: "20px 0 0", maxWidth: 520, borderLeft: `2px solid ${T.orange}`, paddingLeft: 16 }}>{closing}</p>
                    )}
                </div>
                <div style={{ direction: "ltr", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{
                        width: "100%", aspectRatio: isMobile ? "auto" : "1/0.85", minHeight: isMobile ? 160 : 240,
                        borderRadius: 24, background: "rgba(229,86,2,0.06)", border: "1px solid rgba(229,86,2,0.16)",
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24,
                    }}>
                        {markLines.map((line, i) => (
                            <span key={i} style={{ display: "block", fontSize: isMobile ? 26 : 34, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.orange, lineHeight: 1.25, whiteSpace: "nowrap" }}>{line}</span>
                        ))}
                    </div>
                </div>
            </div>
        </Reveal>
    )
}

function OriginStory() {
    return (
        <section style={{ padding: "40px 0", background: "var(--page-bg)" }}>
            <StoryPanel
                eyebrow="The Origin Story"
                heading={<>We ran the trips.<br/>We saw the handoffs.</>}
                paragraphs={[
                    "For years Tabhi moved travelers through a marketplace, travel experts and direct airline and hotel contracts. Corporate travel was the one journey that never got simpler. Every tool solved one stage and handed the traveler to the next.",
                ]}
                markLines={["5 owners.", "4 handoffs."]}
            />
            <StoryPanel
                eyebrow="The Answer"
                heading={<>One agent.<br/>One thread.</>}
                paragraphs={[
                    "So we built one agent that carries the whole trip, on one continuous travel and expense context, running on supply we already own. Most travel software is built on someone else's inventory. Ours isn't.",
                ]}
                closing="Most travel software is built on someone else's inventory. Ours isn't."
                markLines={["1 thread.", "0 handoffs."]}
                reverse
            />
        </section>
    )
}

// --- TABHI GROUP -------------------------------------------------------------
function TabhiGroup() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".tabhi-card")
        gsap.fromTo(cards, { y: 60, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.72, stagger: 0.12, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true } })
    }, [])

    return (
        <section id="tabhi" ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: isMobile ? 56 : 80 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 16 }}>Backed by Tabhi</span>
                        <h2 style={{ fontSize: isMobile ? 32 : 54, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 auto 20px", maxWidth: 640 }}>
                            23 companies. Three platforms. One vision.
                        </h2>
                        <p style={{ fontSize: 15, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
                            Tabhi brought together more than twenty travel businesses into a single AI-first group. Miraee is the corporate platform. Two others sit alongside it.
                        </p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
                    {groupPlatforms.map(([name, what, does]) => (
                        <motion.div key={name} className="tabhi-card"
                            whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(var(--text-rgb),0.1)" }}
                            style={{ background: "var(--surface)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(var(--text-rgb),0.06)" }}>
                            <div style={{ height: 4, background: T.orange }}/>
                            <div style={{ padding: isMobile ? "28px 24px" : "36px 32px" }}>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", marginBottom: 14 }}>{what}</div>
                                {groupLogos[name]
                                    ? <img src={groupLogos[name]} alt={name} style={{ height: isMobile ? 26 : 30, width: "auto", display: "block", marginBottom: 16, objectFit: "contain" }} />
                                    : <h3 style={{ fontSize: isMobile ? 24 : 28, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.2, letterSpacing: "-0.015em", margin: "0 0 14px" }}>{name}</h3>}
                                <p style={{ fontSize: 14, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.75, margin: 0 }}>{does}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <Reveal delay={0.08}>
                    <p style={{ textAlign: "center", fontSize: 13, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.7, maxWidth: 640, margin: "40px auto 0" }}>
                        Tabhi is institutionally backed; ownership includes affiliates of TCW Asset Management and Morgan Stanley Investment Management.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// --- THE ADVANTAGE -------------------------------------------------------------
function TheAdvantage() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const hd = sectionRef.current.querySelector(".adv-heading")
        if (hd) {
            const wds = hd.querySelectorAll(".adv-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.045, ease: "power4.out",
                  scrollTrigger: { trigger: hd, start: "top 70%", once: true } })
        }
        if (gridRef.current) {
            const rows = gridRef.current.querySelectorAll(".adv-row")
            gsap.fromTo(rows, { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out",
                  scrollTrigger: { trigger: gridRef.current, start: "top 72%", once: true } })
        }
    }, [])

    const headingWords = ["Most", "platforms", "compete", "on", "software.", "We", "compete", "on", "software", "and", "supply."]

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.038) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
                <div style={{ marginBottom: isMobile ? 56 : 80 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 20 }}>
                        The Advantage
                    </motion.span>
                    <h2 className="adv-heading" style={{ fontSize: isMobile ? 28 : isTablet ? 44 : 56, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 20px", maxWidth: 780 }}>
                        {headingWords.map((word, i) => (
                            <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                                <span className="adv-w" style={{ display: "inline-block" }}>{word}</span>
                            </span>
                        ))}
                    </h2>

                </div>
                <div ref={gridRef} style={{ display: "flex", flexDirection: "column", gap: 1, borderTop: "1px solid rgba(var(--text-rgb),0.08)" }}>
                    {advantage.map(([what, means, proof]) => (
                        <div key={what} className="adv-row" style={{
                            display: "grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr 200px", gap: isMobile ? 8 : 32,
                            padding: isMobile ? "22px 4px" : "28px 8px", borderBottom: "1px solid rgba(var(--text-rgb),0.08)", alignItems: isMobile ? "flex-start" : "center",
                        }}>
                            <h3 style={{ fontSize: isMobile ? 17 : 18, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.01em" }}>{what}</h3>
                            <p style={{ fontSize: 14, color: "rgba(var(--text-rgb),0.5)", fontFamily: "var(--font-sans)", lineHeight: 1.7, margin: 0 }}>{means}</p>
                            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: T.orange, fontFamily: "var(--font-sans)", textTransform: "uppercase", justifySelf: isMobile ? "flex-start" : "flex-end", textAlign: isMobile ? "left" : "right" }}>{proof}</span>
                        </div>
                    ))}
                </div>
                <Reveal delay={0.1}>
                    <p style={{ fontSize: 14, color: "rgba(var(--text-rgb),0.4)", fontFamily: "var(--font-sans)", fontStyle: "italic", margin: "32px 0 0" }}>
                        Most platforms compete on software. We compete on software and supply.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// --- HOW WE BUILD -------------------------------------------------------------
function HowWeBuild() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".principle-card")
        gsap.fromTo(cards, { y: 60, opacity: 0, clipPath: "inset(0 0 30% 0)" },
            { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.75, stagger: 0.1, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 56 : 80, textAlign: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 16 }}>How We Build</span>
                        <h2 style={{ fontSize: isMobile ? 32 : 52, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 18px", maxWidth: 660 }}>
                            How we build.
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 20 }}>
                    {principles.map(([num, title, body]) => (
                        <motion.div key={title} className="principle-card"
                            whileHover={{ borderColor: "rgba(229,86,2,0.35)", y: -4 }}
                            style={{ padding: isMobile ? "28px 24px" : "40px 40px", borderRadius: 20, background: "rgba(var(--text-rgb),0.03)", border: "1px solid rgba(var(--text-rgb),0.08)", position: "relative", overflow: "hidden" }}>
                            <span style={{ fontSize: 13, fontFamily: "monospace", color: T.orange, fontWeight: 700, letterSpacing: "0.05em" }}>{num}</span>
                            <h3 style={{ fontSize: isMobile ? 20 : 24, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.25, letterSpacing: "-0.015em", margin: "14px 0 12px" }}>{title}</h3>
                            <p style={{ fontSize: 14, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.75, margin: 0 }}>{body}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- PLACEHOLDER SECTIONS (Leadership / Global / Newsroom) --------------------
// --- 6 FOR AIRLINES AND SUPPLIERS (moved here from Home per the doc) --------
function PartnerWithMiraee() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section id="partners" style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
                <Reveal>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 16 }}>
                        For airlines and suppliers
                    </span>
                    <h2 style={{ fontSize: isMobile ? 30 : 50, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 22px" }}>
                        Partner with <span style={{ color: T.accent, fontStyle: "italic" }}>Miraee.</span>
                    </h2>
                    <p style={{ fontSize: isMobile ? 16 : 18, color: T.muted, fontFamily: "var(--font-sans)", lineHeight: 1.75, margin: "0 0 36px" }}>
                        Reach premium corporate travelers through brand-forward NDC content, with the whole traveler in view: business trips, personal trips and experiences on one platform.
                    </p>
                    <a href="/book-a-demo" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.orange, color: T.white, fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, padding: "17px 42px", borderRadius: 12, textDecoration: "none" }}>
                        Partner with Miraee ↗
                    </a>
                </Reveal>
            </div>
        </section>
    )
}

function AboutCTA() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section style={{ padding: isMobile ? "80px 24px" : "150px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(229,86,2,0.1), transparent 70%)`, pointerEvents: "none" }}/>
            <Reveal>
                <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "var(--font-sans)", display: "inline-block", marginBottom: 20 }}>See The Agent In Action</span>
                    <h2 style={{ fontSize: isMobile ? 34 : 56, fontFamily: "var(--font-heading)", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
                        Bring a real trip.
                    </h2>
                    <p style={{ fontSize: 16, color: "rgba(var(--text-rgb),0.5)", fontFamily: "var(--font-sans)", lineHeight: 1.8, margin: "0 0 40px" }}>
                        Twenty minutes. Your route, your policy, your edge cases. We'll run it live.
                    </p>
                    <motion.div whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(229,86,2,0.55)" }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block" }}>
                        <Link to="/book-a-demo" style={{ padding: isMobile ? "14px 30px" : "17px 44px", background: T.orange, color: T.white, borderRadius: 12, fontSize: 15, fontFamily: "var(--font-sans)", fontWeight: 700, textDecoration: "none", display: "inline-block", letterSpacing: "0.01em" }}>
                            Book your demo
                        </Link>
                    </motion.div>
                </div>
            </Reveal>
        </section>
    )
}

// --- PAGE ----------------------------------------------------------------
export default function MiraeeAboutPage() {
    useEffect(() => {
        document.title = "About Miraee | Built by Tabhi, on Mondee Supply"
        const description = "Miraee is the employee travel platform from Tabhi, the group behind Mondee's marketplace and Abhee's experiences: 23 companies, direct supply, institutional backing."
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta) }
        meta.content = description
    }, [])

    return (
        <div className="v1-type-page" style={{ background: "var(--page-bg)", minHeight: "100vh" }}>
            <SmoothScrollStyle />
            <ScrollBar />
            <SiteNav />
            <V11Hero
                kicker="About Miraee"
                title="Built on supply."
                accent="Run by agents."
                sub="Miraee is built by Tabhi, a travel group with direct supplier contracts, institutional backing and a marketplace already moving travelers at global scale."
                primaryCta={{ label: "See Miraee live", href: "/book-a-demo" }}
                secondaryCta={{ label: "Meet the group ↓", href: "#tabhi" }}
                image={{ src: aboutPageImg, alt: "Business traveler discovering a local cultural experience" }}
                proof={["23 companies", "3 platforms", "500+ airlines", "2M+ hotels", "125M+ travelers reached through Mondee"]} />
            <V11PageImage src={aboutPageImg} alt="Business traveler discovering a local cultural experience" label="Travel beyond the itinerary" caption="Miraee is built around the full experience of travel, including the moments people remember after the workday ends." position="center top" mobilePosition="center 18%" />
            <OriginStory />
            <TabhiGroup />
            <TheAdvantage />
            <HowWeBuild />
            <PartnerWithMiraee />
            <AboutCTA />
            <V1Footer />
        </div>
    )
}
