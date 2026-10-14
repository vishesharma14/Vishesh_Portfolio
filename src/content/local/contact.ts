import type { Contact } from '../types.ts'

// Verified: the public contact email (2026-10-13) and the email subject (2026-10-14), provided by
// the owner. Add `phone` only if it should be shown on the site; leaving it unset keeps it hidden
// (the default).
export const contact: Contact = {
  email: 'vishesharma276@gmail.com',
  emailSubject: 'Hello from your portfolio',
}
