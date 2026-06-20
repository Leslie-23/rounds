export const colors = {
  bgBase: '#16151A',
  bgSurface: '#221F24',
  accentPrimary: '#D98B4A',
  accentAlert: '#7A2E3A',
  textPrimary: '#F2EDE6',
  textMuted: '#9C948C',
  border: 'rgba(242, 237, 230, 0.12)'
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
  sm: 12,
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
