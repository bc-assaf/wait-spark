import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { PublicLayout } from '@/layouts/PublicLayout'
import type { LegalDocument } from './content/types'

const CONTACT = 'Email legal@boldercode.com and we’ll get back to you within 5 business days. Bolder Code · boldercode.com'

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '0px 0px -70% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

/** Shared layout for the Terms of Service and Privacy Policy pages. */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  const active = useActiveSection(doc.sections.map((s) => s.id))

  return (
    <PublicLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, pt: 7, pb: 4, px: 2, textAlign: 'center' }}>
        <Typography variant="overline" color="primary">
          Legal
        </Typography>
        <Typography variant="h4" component="h1">
          {doc.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
          {doc.updated}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 7, px: 2, pb: 10 }}>
        <Box
          component="nav"
          aria-label="On this page"
          sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', width: 240, flexShrink: 0, position: 'sticky', top: 24 }}
        >
          <Typography variant="overline" color="text.secondary">
            On this page
          </Typography>
          {doc.sections.map((s, i) => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              underline="none"
              variant="body2"
              color={active === s.id ? 'primary' : 'text.secondary'}
              sx={{
                pl: 1.5,
                pr: 1,
                py: 0.75,
                borderLeft: active === s.id ? 2 : 1,
                borderColor: active === s.id ? 'primary.main' : 'divider',
              }}
            >
              {i + 1}. {s.title}
            </Link>
          ))}
          <Box sx={{ pt: 2.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            <Typography variant="caption" color="text.secondary">
              Also see
            </Typography>
            <Link component={RouterLink} to={doc.alsoSee.to} underline="none" variant="body2">
              {doc.alsoSee.label}
            </Link>
          </Box>
        </Box>

        <Box sx={{ width: '100%', maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Paper variant="outlined" sx={{ px: 3, py: 2.5, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Typography variant="subtitle2">The short version</Typography>
            {doc.summary.map((line) => (
              <Typography key={line} variant="body2" sx={{ display: 'flex', gap: 1 }}>
                <span aria-hidden>•</span>
                <span>{line}</span>
              </Typography>
            ))}
          </Paper>

          {doc.sections.map((s, i) => (
            <Box key={s.id} component="section" id={s.id} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, scrollMarginTop: 24 }}>
              <Typography variant="h6" component="h2">
                {i + 1}. {s.title}
              </Typography>
              {s.paragraphs.map((p) => (
                <Typography key={p} variant="body1">
                  {p}
                </Typography>
              ))}
            </Box>
          ))}

          <Paper variant="outlined" sx={{ px: 3, py: 2.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            <Typography variant="subtitle2">Questions?</Typography>
            <Typography variant="body2" color="text.secondary">
              {CONTACT}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </PublicLayout>
  )
}
