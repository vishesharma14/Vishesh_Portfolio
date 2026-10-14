/** The address for a URL: percent-encoded (so a "+" survives), with the "@" kept readable. */
function encodeAddress(email: string): string {
  return encodeURIComponent(email).replace('%40', '@')
}

/** A mailto: link that opens the visitor's own mail app, with the subject filled in. */
export function mailtoHref(email: string, subject?: string): string {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : ''
  return `mailto:${encodeAddress(email)}${query}`
}

/** Gmail's compose window (full page), with the address and subject filled in. */
export function gmailComposeHref(email: string, subject?: string): string {
  const query = subject ? `&su=${encodeURIComponent(subject)}` : ''
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeAddress(email)}${query}`
}
