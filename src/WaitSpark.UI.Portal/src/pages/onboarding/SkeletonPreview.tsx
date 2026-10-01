import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import liveStatus from '@/assets/onboarding/live-status.svg'

// Placeholder colors of the empty display mockup; intentionally independent of the app theme.
const SLIDESHOW = { bg: '#e2e8f0', bone: '#cbd5e1', image: '#d5dde7', imageBone: '#b8c4d3' } as const
const TRIVIA = { bg: '#f1f5f9', bone: '#dde3ea', card: '#e7ecf1' } as const

interface BoneProps {
  w?: number | string
  h: number
  r: number
  color: string
  sx?: object
}

function Bone({ w, h, r, color, sx }: BoneProps) {
  return <Box sx={{ width: w, height: h, borderRadius: `${r}px`, bgcolor: color, flexShrink: 0, ...sx }} />
}

function Slideshow() {
  const { bg, bone, image, imageBone } = SLIDESHOW
  return (
    <Box sx={{ width: 350, height: 315, bgcolor: bg, p: '21px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6.5px' }}>
          <Bone w={19.25} h={19.25} r={12} color={bone} />
          <Bone w={78.75} h={7.875} r={9} color={bone} />
        </Box>
        <Bone w={65.6} h={12.25} r={14} color={bone} />
      </Box>
      <Box sx={{ mt: '16px', height: 131.25, borderRadius: '20px', bgcolor: image, display: 'grid', placeItems: 'center' }}>
        <Bone w={28} h={21} r={8} color={imageBone} />
      </Box>
      <Bone w={48} h={5.25} r={6} color={bone} sx={{ mt: '22px' }} />
      <Bone w={245} h={14.9} r={17} color={bone} sx={{ mt: '7px' }} />
      <Bone w={183.75} h={14.9} r={17} color={bone} sx={{ mt: '5px' }} />
      <Bone w={201} h={7} r={8} color={bone} sx={{ mt: '10px' }} />
      <Box sx={{ mt: 'auto', display: 'flex', gap: '3.5px' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Bone key={i} w={17.5} h={1.75} r={2} color={bone} />
        ))}
      </Box>
    </Box>
  )
}

function Trivia() {
  const { bg, bone, card } = TRIVIA
  return (
    <Box sx={{ width: 210, height: 315, bgcolor: bg, p: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexShrink: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3.5px' }}>
          <Bone w={65.6} h={6.1} r={7} color={bone} />
          <Bone w={39.4} h={5.25} r={6} color={bone} />
        </Box>
        <Bone w={31.5} h={15.75} r={18} color={bone} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '7.9px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4.4px' }}>
          <Bone w={175} h={10.5} r={12} color={bone} />
          <Bone w={113.75} h={10.5} r={12} color={bone} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4.4px' }}>
          {[52.5, 60.4, 68.25, 76.1].map((w) => (
            <Box key={w} sx={{ display: 'flex', alignItems: 'center', gap: '6.1px', px: '6.1px', py: '5.25px', borderRadius: '12px', bgcolor: card }}>
              <Bone w={12.25} h={12.25} r={999} color={bone} />
              <Bone w={w} h={6.1} r={7} color={bone} />
            </Box>
          ))}
        </Box>
        <Box component="img" src={liveStatus} alt="" sx={{ width: 68.25, height: 4.375 }} />
      </Box>
      <Box sx={{ display: 'flex', gap: '7px' }}>
        <Box sx={{ flex: 1, p: '7px', borderRadius: '16px', bgcolor: card, display: 'flex', flexDirection: 'column', gap: '5.25px' }}>
          <Bone w={39.4} h={5.25} r={6} color={bone} />
          {[0, 1, 2].map((i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4.4px' }}>
                <Bone w={12.25} h={12.25} r={999} color={bone} />
                <Bone w={35} h={5.25} r={6} color={bone} />
              </Box>
              <Bone w={17.5} h={5.25} r={6} color={bone} />
            </Box>
          ))}
        </Box>
        <Box sx={{ p: '5.25px', borderRadius: '16px', bgcolor: card, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.6px' }}>
          <Bone w={48.1} h={48.1} r={8} color={bone} />
          <Bone w={35} h={5.25} r={6} color={bone} />
        </Box>
      </Box>
    </Box>
  )
}

/** Right-hand panel of the website step: an empty display mockup until there is something to preview. */
export function SkeletonPreview() {
  return (
    <Box
      aria-hidden
      sx={{
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        p: 6,
        overflow: 'hidden',
        color: '#fff',
        backgroundColor: 'rgb(11, 53, 101)',
        backgroundImage: 'radial-gradient(ellipse 344px 512px at 50% 50%, rgba(30,91,168,0.7), rgba(11,53,101,0))',
      }}
    >
      <Box
        sx={{
          p: 1,
          bgcolor: '#0a0a0a',
          border: '1px solid #3a3f4a',
          borderRadius: '12px',
          boxShadow: '0 22px 45px rgba(0,0,0,0.45)',
          // The mockup has fixed pixel geometry; shrink it on narrower screens.
          zoom: { lg: 0.8, xl: 1 },
        }}
      >
        <Box sx={{ display: 'flex', width: 560, height: 315, bgcolor: '#000', overflow: 'hidden' }}>
          <Slideshow />
          <Trivia />
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Typography variant="h4" component="p" sx={{ fontWeight: 300, fontSize: 30, lineHeight: 'normal' }}>
          Your screen preview will appear here
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Enter your website and watch your screen come to life.
        </Typography>
      </Box>
    </Box>
  )
}
