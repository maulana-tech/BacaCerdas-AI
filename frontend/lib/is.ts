export function isEmptyHtml(html: string): boolean {
    // Remove whitespace, <br>, and empty tags
    const cleaned = html
        .replace(/<br\s*\/?>/gi, "")
        .replace(/<[^/>][^>]*><\/[^>]+>/g, "")
        .replace(/&nbsp;/gi, "")
        .trim();
    // Remove all HTML tags and check if anything remains
    return cleaned.replace(/<[^>]*>/g, "").trim().length === 0;
}