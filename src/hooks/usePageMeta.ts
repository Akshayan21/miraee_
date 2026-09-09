import { useEffect } from "react"
import { canonicalUrl } from "../lib/seo"

export type PageMetaOptions = {
    // Emit `noindex, follow` instead of `index, follow`. `follow` is kept in
    // both cases so links out of an excluded page still pass discovery on.
    noindex?: boolean
    // Override the canonical path. Defaults to the URL actually being viewed,
    // which is what a self-referencing canonical should be — pass this only
    // when a page needs to point at a different URL (e.g. a duplicate that
    // should consolidate into its parent).
    canonicalPath?: string
}

export function usePageMeta(title: string, description: string, options: PageMetaOptions = {}) {
    const { noindex = false, canonicalPath } = options

    // Resolved during render rather than inside the effect so it can go in the
    // dependency array. Read from the effect it would be invisible to React,
    // and two routes that happened to share a title and description would keep
    // whichever canonical rendered first.
    const path = canonicalPath ?? (typeof window === "undefined" ? "/" : window.location.pathname)
    const canonical = canonicalUrl(path)

    useEffect(() => {
        document.title = title

        const setMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
            let element = document.head.querySelector<HTMLMetaElement>(selector)
            if (!element) {
                element = document.createElement("meta")
                element.setAttribute(attribute, key)
                document.head.appendChild(element)
            }
            element.content = content
        }

        const setLink = (rel: string, href: string) => {
            let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
            if (!element) {
                element = document.createElement("link")
                element.rel = rel
                document.head.appendChild(element)
            }
            element.href = href
        }

        setMeta('meta[name="description"]', "name", "description", description)
        setMeta('meta[property="og:title"]', "property", "og:title", title)
        setMeta('meta[property="og:description"]', "property", "og:description", description)
        setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image")
        setMeta('meta[name="twitter:title"]', "name", "twitter:title", title)
        setMeta('meta[name="twitter:description"]', "name", "twitter:description", description)

        // Both of these are written on EVERY page, never conditionally. This is
        // a single-page app with one long-lived <head>: a tag left behind by the
        // previous route is a tag that lies about the current one. Skipping the
        // write when `noindex` is false would leave the last excluded page's
        // `noindex` attached to every page visited after it.
        setMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex, follow" : "index, follow")
        setLink("canonical", canonical)
    }, [title, description, canonical, noindex])
}
