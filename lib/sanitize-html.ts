// This works on both server and client without heavy dependencies
// Since content is admin-controlled, XSS risk is minimal

const ALLOWED_TAGS = ["p", "br", "strong", "em", "u", "ul", "ol", "li", "a"]
const ALLOWED_ATTRS: Record<string, string[]> = {
  a: ["href", "target", "rel"],
}

export function sanitizeHtml(html: string): string {
  // Remove script tags and event handlers
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/on\w+\s*=\s*[^\s>]*/gi, "")

  // Remove style tags
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")

  // Remove disallowed tags (keep only allowed ones)
  const tagPattern = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
  sanitized = sanitized.replace(tagPattern, (match, tagName) => {
    if (!ALLOWED_TAGS.includes(tagName.toLowerCase())) {
      return ""
    }

    // For allowed tags, filter attributes
    if (tagName.toLowerCase() === "a") {
      // Keep only href, target, rel for links
      const hrefMatch = match.match(/href\s*=\s*["']([^"']*)["']/i)
      const href = hrefMatch ? hrefMatch[1] : ""

      // Prevent javascript: URLs
      if (href.toLowerCase().startsWith("javascript:")) {
        return ""
      }

      return `<${tagName} href="${href}" target="_blank" rel="noopener noreferrer">`
    }

    // For other tags, remove all attributes
    return match
      .replace(/\s+[a-z][a-z0-9-]*\s*=\s*["'][^"']*["']/gi, "")
      .replace(/\s+[a-z][a-z0-9-]*\s*=\s*[^\s>]*/gi, "")
  })

  return sanitized
}
