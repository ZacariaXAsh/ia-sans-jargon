export const designFoundation = {
  maxWidth: '1120px',
  fonts: {
    body: '"Inter", system-ui, sans-serif',
    heading: '"Manrope", "Inter", system-ui, sans-serif',
  },
  colors: {
    background: '#fff9ef',
    backgroundSoft: '#fff3d8',
    surface: '#fffdf7',
    surfaceStrong: '#fff8ea',
    surfaceTint: '#ffefbc',
    border: 'rgba(94, 76, 34, 0.14)',
    borderStrong: 'rgba(94, 76, 34, 0.24)',
    text: '#2f2413',
    textMuted: '#6a5b3f',
    brand: '#f2cc4d',
    brandHover: '#e5bc31',
    brandSoft: 'rgba(242, 204, 77, 0.22)',
    highlight: '#c56a34',
    highlightSoft: 'rgba(197, 106, 52, 0.12)',
    success: '#456239',
    warning: '#976515',
    warningSoft: 'rgba(242, 204, 77, 0.2)',
    safeSoft: 'rgba(69, 98, 57, 0.12)',
  },
  shadows: {
    soft: '0 12px 32px rgba(74, 56, 18, 0.08)',
    glow: '0 12px 30px rgba(216, 171, 27, 0.18)',
  },
  radii: {
    sm: '14px',
    md: '20px',
    lg: '28px',
    pill: '999px',
  },
  space: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '2rem',
    8: '3rem',
    9: '4rem',
  },
  size: {
    1: '0.75rem',
    2: '0.875rem',
    3: '1rem',
    4: '1.125rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '2rem',
    8: '2.75rem',
    9: '3.5rem',
  },
} as const;

export function getDesignSystemCss() {
  const { colors, shadows, radii, space, maxWidth, fonts } = designFoundation;

  return `
    :root {
      color-scheme: light;
      --color-background: ${colors.background};
      --color-background-soft: ${colors.backgroundSoft};
      --color-surface: ${colors.surface};
      --color-surface-strong: ${colors.surfaceStrong};
      --color-surface-tint: ${colors.surfaceTint};
      --color-border: ${colors.border};
      --color-border-strong: ${colors.borderStrong};
      --color-text: ${colors.text};
      --color-text-muted: ${colors.textMuted};
      --color-brand: ${colors.brand};
      --color-brand-hover: ${colors.brandHover};
      --color-brand-soft: ${colors.brandSoft};
      --color-highlight: ${colors.highlight};
      --color-highlight-soft: ${colors.highlightSoft};
      --color-success: ${colors.success};
      --color-warning: ${colors.warning};
      --color-warning-soft: ${colors.warningSoft};
      --color-safe-soft: ${colors.safeSoft};
      --shadow-soft: ${shadows.soft};
      --shadow-glow: ${shadows.glow};
      --radius-sm: ${radii.sm};
      --radius-md: ${radii.md};
      --radius-lg: ${radii.lg};
      --radius-pill: ${radii.pill};
      --space-1: ${space[1]};
      --space-2: ${space[2]};
      --space-3: ${space[3]};
      --space-4: ${space[4]};
      --space-5: ${space[5]};
      --space-6: ${space[6]};
      --space-7: ${space[7]};
      --space-8: ${space[8]};
      --space-9: ${space[9]};
      --max-width: ${maxWidth};
      --font-body: ${fonts.body};
      --font-heading: ${fonts.heading};
    }
  `;
}
