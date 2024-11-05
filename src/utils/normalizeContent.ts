export function normalizeContent(content: string): string {  
  return content
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9ã ]/g, '');
}