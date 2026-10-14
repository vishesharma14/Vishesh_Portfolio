import type { Contact, SocialLink } from '../../content/index.ts'

/**
 * Whether the Contact section has a way to reach the owner: an email, a phone number or a
 * profile link. Without one it renders nothing, and the navigation leaves it out.
 */
export function hasContactActions(contact: Contact, socialLinks: SocialLink[]): boolean {
  return contact.email !== undefined || contact.phone !== undefined || socialLinks.length > 0
}
