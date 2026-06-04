import type { CSSProperties, ReactNode } from 'react'

// Set de iconos SVG portado de taskForge-ui (estilo Lucide, sin dependencias).

export type IconProps = {
  size?: number
  stroke?: number
  fill?: string
  color?: string
  style?: CSSProperties
  /** Reenviado al <svg>; lo usa, p. ej., MUI Select para posicionar el icono. */
  className?: string
}

type InternalProps = IconProps & { d?: string, children?: ReactNode }

const Ico = ({ d, size = 16, stroke = 1.5, fill = 'none', color, style, className, children }: InternalProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={fill}
    stroke={color || 'currentColor'}
    strokeWidth={stroke}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
    style={{ display: 'inline-block', verticalAlign: '-0.15em', flexShrink: 0, ...style }}
  >
    {children || (d ? <path d={d} /> : null)}
  </svg>
)

export const IconSearch = (p: IconProps) => (
  <Ico {...p}><circle cx='11' cy='11' r='7' /><path d='m20 20-3.5-3.5' /></Ico>
)
export const IconPlus = (p: IconProps) => <Ico {...p}><path d='M12 5v14M5 12h14' /></Ico>
export const IconCheck = (p: IconProps) => <Ico {...p}><path d='M20 6 9 17l-5-5' /></Ico>
export const IconX = (p: IconProps) => <Ico {...p}><path d='M18 6 6 18M6 6l12 12' /></Ico>
export const IconChevDown = (p: IconProps) => <Ico {...p}><path d='m6 9 6 6 6-6' /></Ico>
export const IconChevRight = (p: IconProps) => <Ico {...p}><path d='m9 6 6 6-6 6' /></Ico>
export const IconMenu = (p: IconProps) => <Ico {...p}><path d='M3 6h18M3 12h18M3 18h18' /></Ico>
export const IconFilter = (p: IconProps) => <Ico {...p}><path d='M3 6h18M6 12h12M10 18h4' /></Ico>
export const IconCalendar = (p: IconProps) => (
  <Ico {...p}><rect x='3' y='4' width='18' height='18' rx='2' /><path d='M16 2v4M8 2v4M3 10h18' /></Ico>
)
export const IconUser = (p: IconProps) => (
  <Ico {...p}><circle cx='12' cy='8' r='4' /><path d='M4 21a8 8 0 0 1 16 0' /></Ico>
)
export const IconUsers = (p: IconProps) => (
  <Ico {...p}>
    <circle cx='9' cy='8' r='4' />
    <path d='M2 21a7 7 0 0 1 14 0' />
    <path d='M16 4a4 4 0 0 1 0 8' />
    <path d='M22 21a7 7 0 0 0-6-7' />
  </Ico>
)
export const IconLock = (p: IconProps) => (
  <Ico {...p}><rect x='4' y='11' width='16' height='10' rx='2' /><path d='M8 11V7a4 4 0 0 1 8 0v4' /></Ico>
)
export const IconKanban = (p: IconProps) => (
  <Ico {...p}>
    <rect x='3' y='4' width='5' height='16' rx='1' />
    <rect x='10' y='4' width='5' height='10' rx='1' />
    <rect x='17' y='4' width='5' height='13' rx='1' />
  </Ico>
)
export const IconHome = (p: IconProps) => (
  <Ico {...p}><path d='m3 10 9-7 9 7v10a2 2 0 0 1-2 2h-4v-6H10v6H6a2 2 0 0 1-2-2Z' /></Ico>
)
export const IconFolder = (p: IconProps) => (
  <Ico {...p}><path d='M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z' /></Ico>
)
export const IconInbox = (p: IconProps) => (
  <Ico {...p}>
    <path d='M22 12h-6l-2 3h-4l-2-3H2' />
    <path d='M5 4h14l3 8v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6Z' />
  </Ico>
)
export const IconSettings = (p: IconProps) => (
  <Ico {...p}>
    <circle cx='12' cy='12' r='3' />
    <path d='M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z' />
  </Ico>
)
export const IconSparkles = (p: IconProps) => (
  <Ico {...p}>
    <path d='M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4Z' />
    <path d='M19 14l.9 2.3L22 17l-2.1.7L19 20l-.9-2.3L16 17l2.1-.7Z' />
    <path d='M5 3l.7 1.8L7 5l-1.3.5L5 7l-.7-1.5L3 5l1.3-.2Z' />
  </Ico>
)
export const IconList = (p: IconProps) => (
  <Ico {...p}>
    <path d='M8 6h13M8 12h13M8 18h13' />
    <circle cx='4' cy='6' r='.8' fill='currentColor' />
    <circle cx='4' cy='12' r='.8' fill='currentColor' />
    <circle cx='4' cy='18' r='.8' fill='currentColor' />
  </Ico>
)
export const IconGrid = (p: IconProps) => (
  <Ico {...p}>
    <rect x='3' y='3' width='7' height='7' rx='1' />
    <rect x='14' y='3' width='7' height='7' rx='1' />
    <rect x='3' y='14' width='7' height='7' rx='1' />
    <rect x='14' y='14' width='7' height='7' rx='1' />
  </Ico>
)
export const IconDots = (p: IconProps) => (
  <Ico {...p}><circle cx='12' cy='5' r='1' /><circle cx='12' cy='12' r='1' /><circle cx='12' cy='19' r='1' /></Ico>
)
export const IconClock = (p: IconProps) => (
  <Ico {...p}><circle cx='12' cy='12' r='9' /><path d='M12 7v5l3 2' /></Ico>
)

// Mapa de alias, espejo del objeto del prototipo.
export const I = {
  Search: IconSearch,
  Plus: IconPlus,
  Check: IconCheck,
  X: IconX,
  ChevDown: IconChevDown,
  ChevRight: IconChevRight,
  Menu: IconMenu,
  Filter: IconFilter,
  Calendar: IconCalendar,
  User: IconUser,
  Users: IconUsers,
  Lock: IconLock,
  Kanban: IconKanban,
  Home: IconHome,
  Folder: IconFolder,
  Inbox: IconInbox,
  Settings: IconSettings,
  Sparkles: IconSparkles,
  List: IconList,
  Grid: IconGrid,
  Dots: IconDots,
  Clock: IconClock,
}
