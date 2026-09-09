export const FILE_MAX_BYTES = 5 * 1024 * 1024
export const FILE_MAX_COUNT = 5
export const FILE_MAX_TOTAL_BYTES = 10 * 1024 * 1024

type SubmissionResult = {
    ok?: boolean
    ticketId?: string
    error?: string
}

export function validateAttachments(files: File[]): string | null {
    if (files.length > FILE_MAX_COUNT) return `You can upload up to ${FILE_MAX_COUNT} files.`
    const oversized = files.filter(file => file.size > FILE_MAX_BYTES)
    if (oversized.length > 0) return `Too large (max 5 MB): ${oversized.map(file => file.name).join(", ")}`
    const totalBytes = files.reduce((total, file) => total + file.size, 0)
    if (totalBytes > FILE_MAX_TOTAL_BYTES) return "Combined file size must be 10 MB or less."
    return null
}

export async function filesToAttachments(files: File[]) {
    const data = await Promise.all(files.map(file => new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            const result = typeof reader.result === "string" ? reader.result.split(",")[1] : undefined
            if (result) resolve(result)
            else reject(new Error(`Could not read ${file.name}.`))
        }
        reader.onerror = () => reject(reader.error ?? new Error(`Could not read ${file.name}.`))
        reader.readAsDataURL(file)
    })))

    return files.map((file, index) => ({
        name: file.name,
        type: file.type || "application/octet-stream",
        data: data[index],
    }))
}

export async function submitForm(endpoint: string, payload: Record<string, string>): Promise<SubmissionResult> {
    if (!endpoint) throw new Error("The form submission endpoint is not configured.")

    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
    })

    if (!response.ok) throw new Error(`Submission failed with status ${response.status}.`)

    const result = await response.json() as SubmissionResult
    if (result.ok === false || result.error) throw new Error(result.error || "The submission was rejected.")
    return result
}
