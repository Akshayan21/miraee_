import { motion, useReducedMotion } from "framer-motion"
import { useLocation } from "react-router-dom"
import "./V11PageImage.css"

type V11PageImageProps = {
    src: string
    alt: string
    label: string
    caption: string
    position?: string
    mobilePosition?: string
}

export default function V11PageImage({ src, alt, label, caption, position = "center", mobilePosition }: V11PageImageProps) {
    const pathname = useLocation().pathname
    const reduceMotion = useReducedMotion()

    if (!(pathname === "/v1.1" || pathname.startsWith("/v1.1/"))) return null

    return (
        <section className="v11-page-image" aria-label={`${label} visual`}>
            <motion.figure
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="v11-page-image__frame" style={{ "--v11-image-position": position, "--v11-image-position-mobile": mobilePosition || position } as React.CSSProperties}>
                    <img src={src} alt={alt} loading="lazy" decoding="async" />
                </div>
                <figcaption>
                    <span>{label}</span>
                    <p>{caption}</p>
                </figcaption>
            </motion.figure>
        </section>
    )
}
