import { useRef, useEffect } from "react"

interface RoleVideoShowcaseProps {
    videoSrc: string
    title: string
}

export default function RoleVideoShowcase({
    videoSrc,
    title,
}: RoleVideoShowcaseProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const vid = videoRef.current
        if (vid) {
            vid.muted = true
            vid.defaultMuted = true
            const playPromise = vid.play()
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Autoplay fallback
                })
            }
        }
    }, [videoSrc])

    return (
        <div className="v4-apple-video-frame" aria-label={`${title} product preview`}>
            <div className="v4-apple-video-glow" aria-hidden="true" />
            <div className="v4-apple-video-canvas">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="v4-apple-video-element"
                />
            </div>
        </div>
    )
}
