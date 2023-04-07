export const parseContentType = (header?: string | null) =>
  header?.split(";")[0] ?? ""
