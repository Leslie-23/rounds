import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '@/theme/tokens';

type Props = {
  used: number;
  total: number;
};

export function RoundProgress({ used, total }: Props) {
  const remaining = total - used;

  return (
    <View style={styles.ring}>
      <Text style={styles.value}>{remaining}</Text>
      <Text style={styles.label}>left</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    borderColor: colors.accentPrimary,
    borderLeftColor: colors.border,
    borderRadius: 38,
    borderWidth: 7,
    height: 76,
    justifyContent: 'center',
    width: 76
  },
  value: { ...typography.display, fontSize: 24, lineHeight: 26 },
  label: { color: colors.textMuted, fontSize: 11, fontWeight: '700' }
});
