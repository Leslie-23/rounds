import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function Redeem() {
  return (
    <Screen>
      <Text style={styles.title}>This round is live</Text>
      <Text style={styles.subtitle}>Show this to staff. The code refreshes after 90 seconds.</Text>
      <View style={styles.qr}>
        <View style={styles.qrInner}>
          <Text style={styles.qrText}>ROUND</Text>
        </View>
      </View>
      <View style={styles.pinCard}>
        <Text style={styles.pinLabel}>PIN fallback</Text>
        <Text style={styles.pin}>4829</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.display, fontSize: 38, marginTop: spacing.md },
  subtitle: { ...typography.bodyMuted, marginTop: spacing.sm },
  qr: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: colors.textPrimary,
    borderRadius: radius.lg,
    justifyContent: 'center',
    marginTop: spacing.xxl,
    padding: spacing.xl
  },
  qrInner: {
    alignItems: 'center',
    borderColor: colors.bgBase,
    borderRadius: radius.lg,
    borderWidth: 10,
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  qrText: { color: colors.bgBase, fontSize: 34, fontWeight: '900' },
  pinCard: {
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: spacing.lg,
    padding: spacing.lg
  },
  pinLabel: { ...typography.data, color: colors.textFaint },
  pin: { color: colors.accentPrimary, fontSize: 42, fontWeight: '900', marginTop: spacing.xs }
});
