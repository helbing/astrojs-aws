/**
 * Parse and get content-type value
 * e.g. text/html => text/html
 * e.g. text/html; charset=utf-8 => text/html
 *
 * @param header
 * @returns
 */
export const parseContentType = (header?: string | null) =>
  header?.split(";")[0] ?? ""
