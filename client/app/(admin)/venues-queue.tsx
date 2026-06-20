import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { adminQueue } from '@/data/mock';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function VenuesQueue() {
  return (
    <Screen scroll>
      <Text style={styles.title}>Venue queue</Text>
      <Text style={styles.subtitle}>Approve only rooms with a clear offer and real ambiance signal.</Text>
      <View style={styles.list}>
        {adminQueue.map((item) => (
          <View key={item.id} style={styles.row}>
            <View>
              <Text style={styles.venue}>{item.venue}</Text>
              <Text style={styles.detail}>{item.area} · {item.offer}</Text>
            </View>
            <Text style={styles.risk}>{item.risk}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.display, fontSize: 38 },
  subtitle: { ...typography.bodyMuted, marginTop: spacing.sm },
  list: { gap: spacing.sm, marginTop: spacing.xl },
  row: {
    backgroundColor: colors.bgSurface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.md
  },
  venue: { color: colors.textPrimary, fontSize: 17, fontWeight: '900' },
  detail: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: spacing.xs },
  risk: { color: colors.accentPrimary, fontSize: 12, fontWeight: '900', marginTop: spacing.xs }
});
