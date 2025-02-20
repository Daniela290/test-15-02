export interface ConfigI {
    "type"?: "error" | "success" | "text",
    "content"?: string,
    "duration"?: number,
    "icon"?: string,
    "close"?: boolean
}