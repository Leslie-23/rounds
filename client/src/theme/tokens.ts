export const colors = {
  bgBase: '#111014',
  bgRaised: '#19171D',
  bgSurface: '#232026',
  bgInset: '#0B0B0E',
  accentPrimary: '#F59A45',
  accentSecondary: '#4CC9B0',
  accentBlue: '#7EA7FF',
  accentAlert: '#B8455A',
  textPrimary: '#FFF7ED',
  textMuted: '#A79D93',
  textFaint: '#716A64',
  border: 'rgba(255, 247, 237, 0.12)',
  borderStrong: 'rgba(255, 247, 237, 0.22)'
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 18,
  xl: 26,
  xxl: 36
};

export const radius = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 16
};

export const typography = {
  display: {
    color: colors.textPrimary,
    fontWeight: '700' as const,
    letterSpacing: 0
  },
  bodyMuted: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22
  },
  data: {
    fontSize: 12,
    fontWeight: '700' as const,
    letterSpacing: 0,
    textTransform: 'uppercase' as const
  }
};
