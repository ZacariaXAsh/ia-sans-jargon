import { styled } from '@tamagui/core';

export const Shell = styled.div({
  width: 'min(var(--max-width), calc(100vw - 1.5rem))',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const Surface = styled.div({
  backgroundColor: '$surface',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$5',
  boxShadow: 'var(--shadow-soft)',
});

export const WarmSurface = styled(Surface, {
  backgroundColor: '$surfaceStrong',
});

export const Eyebrow = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  width: 'fit-content',
  px: '$3',
  py: '$2',
  borderRadius: '$6',
  backgroundColor: '$primarySoft',
  color: '$color',
  fontSize: '0.74rem',
  fontWeight: '800',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});

export const Kicker = styled.p({
  margin: 0,
  color: '$accent',
  fontSize: '0.88rem',
  fontWeight: '800',
});

export const DisplayTitle = styled.h1({
  margin: 0,
  color: '$color',
  fontFamily: 'var(--font-heading)',
  fontSize: 'clamp(2.8rem, 7vw, 4.8rem)',
  lineHeight: 0.96,
  letterSpacing: '-0.055em',
  maxWidth: '12ch',
});

export const SectionTitle = styled.h2({
  margin: 0,
  color: '$color',
  fontFamily: 'var(--font-heading)',
  fontSize: 'clamp(1.8rem, 3.8vw, 3rem)',
  lineHeight: 1,
  letterSpacing: '-0.05em',
});

export const CardTitle = styled.h3({
  margin: 0,
  color: '$color',
  fontFamily: 'var(--font-heading)',
  fontSize: '1.55rem',
  lineHeight: 1.05,
  letterSpacing: '-0.04em',
});

export const Lead = styled.p({
  margin: 0,
  color: '$colorMuted',
  fontSize: '1.06rem',
  lineHeight: 1.7,
});

export const StrongText = styled.p({
  margin: 0,
  color: '$color',
  fontSize: '1rem',
  lineHeight: 1.6,
  fontWeight: '700',
});

export const Body = styled.p({
  margin: 0,
  color: '$colorMuted',
  lineHeight: 1.65,
});

export const Stack = styled.div({
  display: 'grid',
  gap: '$4',
});

export const ButtonRow = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$3',
});

export const PrimaryLink = styled.a({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  textDecorationLine: 'none',
  px: '$5',
  py: '$4',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$primaryHover',
  backgroundColor: '$primary',
  color: '$primaryForeground',
  fontWeight: '800',
  boxShadow: 'var(--shadow-glow)',
  transition: 'transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease',
  hoverStyle: {
    transform: 'translateY(-1px)',
    backgroundColor: '$primaryHover',
  },
});

export const SecondaryLink = styled.a({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  textDecorationLine: 'none',
  px: '$5',
  py: '$4',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$borderStrong',
  backgroundColor: '$surface',
  color: '$color',
  fontWeight: '700',
  transition: 'transform 0.18s ease, background 0.18s ease, border-color 0.18s ease',
  hoverStyle: {
    transform: 'translateY(-1px)',
    backgroundColor: '$surfaceStrong',
    borderColor: '$accent',
  },
});

export const PillRow = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$3',
});

export const Pill = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  width: 'fit-content',
  px: '$4',
  py: '$2',
  borderRadius: '$6',
  borderWidth: 1,
  borderColor: '$border',
  backgroundColor: '$surfaceStrong',
  color: '$color',
  fontWeight: '700',
});

export const Note = styled.div({
  display: 'grid',
  gap: '$2',
  px: '$4',
  py: '$4',
  borderRadius: '$4',
  backgroundColor: '$surfaceTint',
  borderWidth: 1,
  borderColor: '$border',
});

export const IconBadge = styled.span({
  display: 'grid',
  placeItems: 'center',
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '16px',
  backgroundColor: '$primarySoft',
  color: '$color',
  fontWeight: '800',
  fontSize: '0.82rem',
  flexShrink: 0,
});
