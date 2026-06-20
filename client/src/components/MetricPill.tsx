import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme/tokens';

type Props = {
  label: string;
  value: string;
  tone?: 'amber' | 'green' | 'blue' | 'red';
};

const toneColor = {
  amber: colors.accentPrimary,
  green: colors.accentSecondary,
  blue: colors.accentBlue,
  red: colors.accentAlert
};

export function MetricPill({ label, value, tone = 'amber' }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={[styles.value, { color: toneColor[tone] }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.bgSurface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    minWidth: 96,
    padding: spacing.md
  },
  value: { ...typography.display, fontSize: 22, lineHeight: 25 },
  label: { color: colors.textMuted, fontSize: 12, marginTop: spacing.xs }
});
