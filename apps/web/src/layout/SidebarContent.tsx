import { Box, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { T } from '../theme/tokens'
import { I } from '../icons'
import { Logo, NavItem, SearchField, UserAvatar } from '../components'
import { currentUser, navCounts, sidebarProjects } from '../data/mock'

type NavEntry = {
  to: string
  label: string
  icon: React.ReactNode
  badge?: string | number
}

const NAV: NavEntry[] = [
  { to: '/panel', label: 'Panel', icon: <I.Home size={16} /> },
  { to: '/projects', label: 'Proyectos', icon: <I.Folder size={16} />, badge: navCounts.projects },
  { to: '/tareas', label: 'Mis tareas', icon: <I.Inbox size={16} />, badge: navCounts.tasks },
  { to: '/actividad', label: 'Actividad', icon: <I.Clock size={16} /> },
]

// Contenido del sidebar (logo, búsqueda, navegación, proyectos y usuario).
// Reutilizado por el Drawer permanente (desktop) y el temporal (mobile).
export function SidebarContent ({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const go = (to: string) => {
    navigate(to)
    onNavigate?.()
  }

  return (
    <Box
      sx={{
        width: 240,
        height: '100%',
        boxSizing: 'border-box',
        borderRight: `1px solid ${T.n200}`,
        background: T.n50,
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.75,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 0.5, py: 0.25 }}>
        <Logo size={22} />
        <Typography sx={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em' }}>
          TaskForge
        </Typography>
      </Box>

      <SearchField />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        {NAV.map((item) => (
          <NavItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            active={pathname === item.to}
            onClick={() => go(item.to)}
          />
        ))}
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.04em',
            color: T.n500,
            textTransform: 'uppercase',
            px: 1.25,
            pb: 0.75,
          }}
        >
          Proyectos
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {sidebarProjects.map((p) => (
            <Box
              key={p.id}
              onClick={() => go('/projects')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                px: 1.25,
                py: 0.75,
                borderRadius: '6px',
                color: T.n600,
                fontSize: 13,
                cursor: 'pointer',
                '&:hover': { background: T.n100 },
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: '3px', background: p.color, flexShrink: 0 }} />
              <Box
                component='span'
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {p.name}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          px: 0.75,
          py: 1,
          borderTop: `1px solid ${T.n200}`,
        }}
      >
        <UserAvatar name={currentUser.name} size={28} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {currentUser.name}
          </Typography>
          <Typography sx={{ fontSize: 11, color: T.n500 }}>{currentUser.role}</Typography>
        </Box>
        <Box component='span' sx={{ color: T.n400, display: 'inline-flex' }}>
          <I.Settings size={16} />
        </Box>
      </Box>
    </Box>
  )
}
