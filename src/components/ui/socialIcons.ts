import type { SocialPlatform } from '../../content/index.ts'
import { GitHubIcon, LinkedInIcon, LinkIcon } from './icons.tsx'

/** The icon shown next to a social link's label, by platform. */
export const socialIcons: Record<SocialPlatform, typeof LinkIcon> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  other: LinkIcon,
}
