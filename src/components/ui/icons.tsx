import type { SVGProps } from 'react'
import { cn } from '../../lib/cn.ts'

// Small inline icons. All are decorative (aria-hidden): the text next to them carries the meaning.

type IconProps = SVGProps<SVGSVGElement>

function Icon({ className, children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className={cn('size-5 shrink-0', className)}
      {...props}
    >
      {children}
    </svg>
  )
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path {...stroke} d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  )
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path {...stroke} d="M12 5v14M6 13l6 6 6-6" />
    </Icon>
  )
}

export function DownloadIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path {...stroke} d="M12 4v11M7 10l5 5 5-5M5 19.5h14" />
    </Icon>
  )
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path {...stroke} d="M19 12H5M11 6l-6 6 6 6" />
    </Icon>
  )
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path {...stroke} d="M7 17L17 7M8 7h9v9" />
    </Icon>
  )
}

export function GraduationCapIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path {...stroke} d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" />
      <path {...stroke} d="M6.5 11.2v4.3c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-4.3M21.5 9v5" />
    </Icon>
  )
}

export function SparkleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        {...stroke}
        d="M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2-5.2-1.8 5.2-1.8L12 3.5zM18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z"
      />
    </Icon>
  )
}

export function LinkIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path {...stroke} d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path {...stroke} d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </Icon>
  )
}

/** GitHub mark (Octicons, MIT). */
export function GitHubIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
      />
    </Icon>
  )
}

/** LinkedIn mark (Simple Icons, CC0). */
export function LinkedInIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
      />
    </Icon>
  )
}
