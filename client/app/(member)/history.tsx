import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { visitHistory } from '@/data/mock';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function History() {
  return (
    <Screen scroll>
      <Text style={styles.title}>Rounds</Text>
      <Text style={styles.subtitle}>Your recent check-ins and confirmed perks.</Text>
      <View style={styles.list}>
        {visitHistory.map((visit) => (
          <View key={visit.id} style={styles.row}>
            <View>
              <Text style={styles.venue}>{visit.venue}</Text>
              <Text style={styles.detail}>{visit.detail}</Text>
            </View>
            <View style={styles.meta}>
              <Text style={styles.date}>{visit.date}</Text>
              <Text style={styles.signal}>{visit.signal}</Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    padding: spacing.md
  },
  venue: { color: colors.textPrimary, fontSize: 16, fontWeight: '800' },
  detail: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  meta: { alignItems: 'flex-end' },
  date: { color: colors.accentPrimary, fontSize: 13, fontWeight: '800' },
  signal: { color: colors.textFaint, fontSize: 11, marginTop: 4 }
});
