import { Headers } from "node-fetch"

/**
 * @param headers
 * @param rawPath
 * @param rawQueryString
 * @returns
 */
export function createURL(
  headers: Headers,
  rawPath: string,
  rawQueryString?: string,
) {
  const scheme = headers.get("x-forwarded-protocol") ?? "https"
  const host = headers.get("x-forwarded-host") ?? headers.get("host") ?? ""
  return new URL(
    rawQueryString?.length ? `${rawPath}?${rawQueryString}` : rawPath,
    `${scheme}://${host}`,
  )
}

/**
 * @param method
 * @param isBase64Encoded
 * @param requestBody
 * @returns
 */
export function createBody(
  method: string,
  isBase64Encoded: boolean,
  requestBody: string | undefined,
) {
  if (method !== "GET" && method != "HEAD") {
    const encoding = isBase64Encoded ? "base64" : "utf-8"
    return typeof requestBody === "string"
      ? Buffer.from(requestBody, encoding)
      : requestBody
  }
  return undefined
}
