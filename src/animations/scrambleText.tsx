import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

// Characters decode into place, terminal-style, once scrolled into view.
export function ScrambleText({ text }: { text: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: "-5% 0px" })
    const [out, setOut] = useState(text)
    useEffect(() => {
        if (!inView) return
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&"
        let frame = 0
        const total = 22
        const id = window.setInterval(() => {
            frame++
            const reveal = Math.floor((frame / total) * text.length)
            let s = ""
            for (let i = 0; i < text.length; i++) {
                if (i < reveal || text[i] === " ") s += text[i]
                else s += chars[Math.floor(Math.random() * chars.length)]
            }
            setOut(s)
            if (frame >= total) { setOut(text); window.clearInterval(id) }
        }, 28)
        return () => window.clearInterval(id)
    }, [inView, text])
    return <span ref={ref}>{out}</span>
}
