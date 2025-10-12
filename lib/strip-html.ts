// Utility to strip HTML tags and return plain text
export function stripHtml(html: string): string {
  // Remove all HTML tags
  let text = html.replace(/<[^>]*>/g, "")

  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

  // Remove extra whitespace
  text = text.replace(/\s+/g, " ").trim()

  return text
}
