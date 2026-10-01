import '@fontsource/poppins/600.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import clinicPhoto from '@/assets/auth/clinic-photo.svg'
import liveDot from '@/assets/auth/live-dot.svg'
import logoMarkSmall from '@/assets/auth/logo-mark-small.svg'
import photoLight1 from '@/assets/auth/photo-light-1.svg'
import photoLight2 from '@/assets/auth/photo-light-2.svg'
import photoLight3 from '@/assets/auth/photo-light-3.svg'
import qrCode from '@/assets/auth/qr-code.svg'

// Illustrative colors of the sample waiting-room display; intentionally independent of the app theme.
const SAMPLE = {
  accent: '#f97360',
  deep: '#042f2e',
  poppins: '"Poppins", sans-serif',
  dmSans: '"DM Sans", sans-serif',
} as const

const ANSWERS = ['30 seconds', '1 minute', '2 minutes', '5 minutes']
const PLAYERS = [
  { initials: 'MK', name: 'Maya K.', score: '2,450', color: '#fdba74' },
  { initials: 'DR', name: 'Dan R.', score: '2,100', color: '#5eead4' },
  { initials: 'NS', name: 'Noa S.', score: '1,870', color: '#c4b5fd' },
]

/** A soft light blob: the image bleeds past its box by `bleed` percent on every side. */
function Photo({ src, bleed, sx }: { src: string; bleed: number; sx: object }) {
  return (
    <Box sx={{ position: 'absolute', ...sx }}>
      <Box component="img" src={src} alt="" sx={{ position: 'absolute', inset: `-${bleed}%`, width: `${100 + bleed * 2}%`, height: `${100 + bleed * 2}%`, maxWidth: 'none' }} />
    </Box>
  )
}

function Slideshow() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: '0 auto 0 0',
        width: 350,
        overflow: 'hidden',
        background: 'linear-gradient(138deg, rgb(15, 118, 110) 0%, rgb(4, 47, 46) 71.4%)',
      }}
    >
      <Photo src={photoLight1} bleed={21.15} sx={{ left: 166.25, top: -52.5, width: 227.5, height: 227.5 }} />
      <Photo src={photoLight2} bleed={23.68} sx={{ left: -52.5, top: 131.25, width: 166.25, height: 166.25 }} />
      <Photo src={photoLight3} bleed={26.67} sx={{ left: 96.25, top: 35, width: 131.25, height: 131.25 }} />
      <Box
        component="img"
        src={clinicPhoto}
        alt=""
        sx={{ position: 'absolute', left: 152.7, top: 44.75, width: 192.5, height: 166.25, maxWidth: 'none', transform: 'rotate(4deg)', transformOrigin: '96.25px 74.4px' }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 122.5,
          width: 350,
          height: 192.5,
          background: 'linear-gradient(to bottom, rgba(4,47,46,0), rgba(4,47,46,0.9))',
        }}
      />
      <Box sx={{ position: 'absolute', left: 21, top: 19.25, display: 'flex', alignItems: 'center', gap: '5.25px' }}>
        <Box component="img" src={logoMarkSmall} alt="" sx={{ width: 19.25, height: 19.25 }} />
        <Box sx={{ font: `600 9.63px ${SAMPLE.poppins}`, color: '#fff' }}>Brightside Dental</Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: 244.56,
          top: 22.75,
          px: '6.125px',
          py: '3.5px',
          borderRadius: '999px',
          bgcolor: 'rgba(255,255,255,0.16)',
          font: `500 6.13px ${SAMPLE.dmSans}`,
          color: '#fff',
          whiteSpace: 'nowrap',
        }}
      >
        Open today · 8:00–19:00
      </Box>
      <Box sx={{ position: 'absolute', left: 21, top: 196.88, display: 'flex', flexDirection: 'column', gap: '5.25px' }}>
        <Box sx={{ font: `700 6.13px ${SAMPLE.dmSans}`, letterSpacing: '2.5px', color: SAMPLE.accent }}>WELCOME</Box>
        <Box sx={{ font: `600 19.25px/22.75px ${SAMPLE.poppins}`, color: '#fff', width: 262.5 }}>
          Gentle care for your whole family.
        </Box>
        <Box sx={{ font: `400 7.88px ${SAMPLE.dmSans}`, color: 'rgba(255,255,255,0.8)', whiteSpace: 'pre' }}>
          {'Same-day emergency visits  ·  Invisalign®  ·  Kids’ dentistry'}
        </Box>
      </Box>
      {[0, 1, 2, 3, 4].map((i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            left: 21 + i * 21,
            top: 295.75,
            width: 17.5,
            height: 1.75,
            borderRadius: '2px',
            bgcolor: i === 0 ? '#fff' : 'rgba(255,255,255,0.3)',
          }}
        />
      ))}
    </Box>
  )
}

function Trivia() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: '0 0 0 350px',
        p: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #0b4f4a, #042f2e)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Box sx={{ font: `700 5.69px ${SAMPLE.dmSans}`, letterSpacing: '1.8px', color: SAMPLE.accent }}>
            BRIGHTSIDE TRIVIA
          </Box>
          <Box sx={{ font: `400 6.13px ${SAMPLE.dmSans}`, color: 'rgba(255,255,255,0.7)', mt: '1.75px' }}>
            Round 3 of 5
          </Box>
        </Box>
        <Box sx={{ px: '7px', py: '3.5px', borderRadius: '999px', bgcolor: SAMPLE.accent, font: `600 7px ${SAMPLE.poppins}`, color: SAMPLE.deep }}>
          0:18
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '7.875px' }}>
        <Box sx={{ font: `600 11.38px/14.875px ${SAMPLE.poppins}`, color: '#fff', width: 182 }}>
          How long should you brush your teeth each time?
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4.375px' }}>
          {ANSWERS.map((answer, i) => (
            <Box
              key={answer}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '6.125px',
                px: '6.125px',
                py: '5.25px',
                borderRadius: '12px',
                bgcolor: 'rgba(255,255,255,0.08)',
                border: '0.438px solid rgba(255,255,255,0.12)',
              }}
            >
              <Box
                sx={{
                  width: 12.25,
                  height: 12.25,
                  borderRadius: '999px',
                  bgcolor: SAMPLE.accent,
                  display: 'grid',
                  placeItems: 'center',
                  font: `600 6.13px ${SAMPLE.poppins}`,
                  color: SAMPLE.deep,
                }}
              >
                {String.fromCharCode(65 + i)}
              </Box>
              <Box sx={{ font: `500 7.44px ${SAMPLE.dmSans}`, color: '#fff' }}>{answer}</Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '3.5px' }}>
          <Box component="img" src={liveDot} alt="" sx={{ width: 3.5, height: 3.5 }} />
          <Box sx={{ font: `500 5.69px ${SAMPLE.dmSans}`, color: 'rgba(255,255,255,0.75)' }}>
            14 players answering now
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '7px', alignItems: 'stretch' }}>
        <Box sx={{ flex: 1, minWidth: 0, p: '7px', borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '5.25px' }}>
          <Box sx={{ font: `700 5.25px ${SAMPLE.dmSans}`, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.6)' }}>
            LEADERBOARD
          </Box>
          {PLAYERS.map((player) => (
            <Box key={player.initials} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4.375px' }}>
                <Box
                  sx={{
                    width: 12.25,
                    height: 12.25,
                    borderRadius: '999px',
                    bgcolor: player.color,
                    display: 'grid',
                    placeItems: 'center',
                    font: `700 4.81px ${SAMPLE.dmSans}`,
                    color: SAMPLE.deep,
                  }}
                >
                  {player.initials}
                </Box>
                <Box sx={{ font: `500 6.56px ${SAMPLE.dmSans}`, color: '#fff' }}>{player.name}</Box>
              </Box>
              <Box sx={{ font: `600 6.56px ${SAMPLE.poppins}`, color: SAMPLE.accent }}>{player.score}</Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ p: '5.25px', borderRadius: '16px', bgcolor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.625px' }}>
          <Box component="img" src={qrCode} alt="" sx={{ width: 48.125, height: 48.125 }} />
          <Box sx={{ font: `600 6.13px ${SAMPLE.poppins}`, color: '#0f766e', whiteSpace: 'nowrap' }}>Scan to play</Box>
          <Box sx={{ font: `400 4.81px ${SAMPLE.dmSans}`, color: '#475569', whiteSpace: 'nowrap' }}>Win a whitening kit</Box>
        </Box>
      </Box>
    </Box>
  )
}

/** Decorative right-hand panel: a TV showing a sample waiting-room display, plus the product pitch. */
export function DisplayPreview() {
  return (
    <Box
      aria-hidden
      sx={{
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '36px',
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
        <Box sx={{ position: 'relative', width: 560, height: 315, bgcolor: '#000', overflow: 'hidden' }}>
          <Slideshow />
          <Trivia />
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: 500 }}>
        <Typography variant="h4" component="p" sx={{ fontWeight: 300, fontSize: 36, lineHeight: 'normal' }}>
          Turn waiting time into play time
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: '24px' }}>
          A branded playlist and a live trivia game your customers join from their phones — built from your
          website in about a minute.
        </Typography>
      </Box>
    </Box>
  )
}
