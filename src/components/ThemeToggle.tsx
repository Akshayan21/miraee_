import { useEffect, useState } from "react"

type Mode = "light" | "dark"

// Read whatever the no-flash script already resolved onto <html>, else fall back to OS.
function getInitial(): Mode {
    if (typeof document !== "undefined") {
        const set = document.documentElement.dataset.theme
        if (set === "dark" || set === "light") return set
    }
    return "light"
}

export default function ThemeToggle({ size = 34 }: { size?: number }) {
    const [mode, setMode] = useState<Mode>(getInitial)

    useEffect(() => {
        document.documentElement.dataset.theme = mode
    }, [mode])

    const toggle = () =>
        setMode(prev => {
            const next: Mode = prev === "dark" ? "light" : "dark"
            try { localStorage.setItem("miraee-theme", next) } catch { /* private mode */ }
            return next
        })

    const dark = mode === "dark"
    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={dark}
            title={dark ? "Light mode" : "Dark mode"}
            style={{
                width: size, height: size, flexShrink: 0,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                borderRadius: "50%", border: "1px solid var(--glass-border)",
                background: "transparent", color: "var(--text)", cursor: "pointer",
                padding: 0, transition: "border-color 0.25s ease, color 0.25s ease",
            }}
        >
            {dark ? (
                // moon
                <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            ) : (
                // sun
                <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
            )}
        </button>
    )
}
