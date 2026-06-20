import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MetricPill } from '@/components/MetricPill';
import { Screen } from '@/components/Screen';
import { mockVenues } from '@/data/mock';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function VenueDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const venue = mockVenues.find((item) => item.id === id) ?? mockVenues[0];

  return (
    <Screen scroll>
      <Pressable style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
      </Pressable>
      <View style={styles.hero}>
        <Text style={styles.category}>{venue.category}</Text>
        <Text style={styles.title}>{venue.name}</Text>
        <Text style={styles.vibe}>{venue.vibe}</Text>
      </View>
      <View style={styles.metrics}>
        <MetricPill label="rating" value={venue.rating} />
        <MetricPill label="distance" value={venue.distance} tone="blue" />
        <MetricPill label="saved" value={venue.saves} tone="green" />
      </View>
      <View style={styles.offerCard}>
        <Text style={styles.offerLabel}>This round</Text>
        <Text style={styles.offer}>{venue.offer}</Text>
        <Text style={styles.rule}>{venue.status}. One round here this week.</Text>
      </View>
      <Pressable style={styles.cta} onPress={() => router.push('/(member)/redeem/demo-redemption')}>
        <Text style={styles.ctaText}>Start this round</Text>
        <Ionicons name="arrow-forward" size={18} color={colors.bgBase} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    width: 42
  },
  hero: {
    backgroundColor: colors.bgRaised,
    borderColor: colors.borderStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: spacing.lg,
    padding: spacing.xl
  },
  category: { ...typography.data, color: colors.accentPrimary },
  title: { ...typography.display, fontSize: 42, lineHeight: 45, marginTop: spacing.sm },
  vibe: { ...typography.bodyMuted, marginTop: spacing.md },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  offerCard: {
    backgroundColor: colors.bgInset,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: spacing.lg,
    padding: spacing.lg
  },
  offerLabel: { ...typography.data, color: colors.textFaint },
  offer: { color: colors.textPrimary, fontSize: 20, fontWeight: '800', lineHeight: 27, marginTop: spacing.sm },
  rule: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: spacing.md },
  cta: {
    alignItems: 'center',
    backgroundColor: colors.accentPrimary,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    marginTop: spacing.xl,
    minHeight: 54
  },
  ctaText: { color: colors.bgBase, fontSize: 16, fontWeight: '900' }
});
