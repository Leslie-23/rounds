import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MetricPill } from '@/components/MetricPill';
import { RoleBadge } from '@/components/RoleBadge';
import { RoundProgress } from '@/components/RoundProgress';
import { Screen } from '@/components/Screen';
import { memberStats, mockVenues } from '@/data/mock';
import { useSessionStore } from '@/stores/session';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const accentMap = {
  amber: colors.accentPrimary,
  green: colors.accentSecondary,
  blue: colors.accentBlue,
  red: colors.accentAlert
};

export default function Discover() {
  const role = useSessionStore((state) => state.user?.role ?? 'member');

  return (
    <Screen>
      <View style={styles.topBar}>
        <View style={styles.brandLockup}>
          <View style={styles.mark} />
          <Text style={styles.brand}>round</Text>
        </View>
        <Pressable style={styles.profileButton} onPress={() => router.push('/(member)/profile')}>
          <Ionicons name="person-outline" size={18} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <RoleBadge role={role} />
          <Text style={styles.title}>Good rooms near {memberStats.neighborhood}</Text>
          <Text style={styles.subtitle}>Start with ambiance. Stay if the night earns it.</Text>
        </View>
        <RoundProgress used={memberStats.roundsUsed} total={memberStats.roundsTotal} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.metrics}>
        <MetricPill label="left this week" value={`${memberStats.roundsTotal - memberStats.roundsUsed}`} />
        <MetricPill label="reset" value={memberStats.resetLabel} tone="blue" />
        <MetricPill label="saved nearby" value="18" tone="green" />
      </ScrollView>

      <Pressable style={styles.search}>
        <Ionicons name="search-outline" size={18} color={colors.textMuted} />
        <Text style={styles.searchText}>Search mood, neighborhood, or offer</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {mockVenues.map((item) => (
          <Pressable key={item.id} style={styles.card} onPress={() => router.push(`/(member)/venue/${item.id}`)}>
            <View style={styles.cardHeader}>
              <View style={[styles.accentRail, { backgroundColor: accentMap[item.accent as keyof typeof accentMap] }]} />
              <View style={styles.cardTitleWrap}>
                <Text style={styles.venue}>{item.name}</Text>
                <Text style={styles.vibe}>{item.vibe}</Text>
              </View>
              <View style={styles.rating}>
                <Ionicons name="star" size={12} color={colors.accentPrimary} />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>
            <Text style={styles.offer}>{item.offer}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.meta}>{item.distance}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.meta}>{item.category}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.meta}>{item.crowd}</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.status}>{item.status}</Text>
              <Text style={styles.saves}>{item.saves} saves</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  brandLockup: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  mark: {
    borderColor: colors.accentPrimary,
    borderLeftColor: 'transparent',
    borderRadius: 15,
    borderWidth: 4,
    height: 30,
    width: 30
  },
  brand: { color: colors.textPrimary, fontSize: 24, fontWeight: '800' },
  profileButton: {
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40
  },
  hero: { alignItems: 'center', flexDirection: 'row', gap: spacing.lg, marginTop: spacing.xl },
  heroCopy: { flex: 1 },
  title: { ...typography.display, fontSize: 38, lineHeight: 40, marginTop: spacing.md },
  subtitle: { ...typography.bodyMuted, marginTop: spacing.sm },
  metrics: { gap: spacing.sm, paddingTop: spacing.xl },
  search: {
    alignItems: 'center',
    backgroundColor: colors.bgInset,
    borderColor: colors.borderStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xl,
    padding: spacing.md
  },
  searchText: { color: colors.textMuted, fontSize: 15 },
  list: { gap: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.bgRaised,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg
  },
  cardHeader: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.md },
  accentRail: { borderRadius: 3, height: 54, width: 5 },
  cardTitleWrap: { flex: 1 },
  venue: { ...typography.display, fontSize: 24, lineHeight: 28 },
  vibe: { color: colors.textMuted, fontSize: 13, lineHeight: 18, marginTop: spacing.xs },
  rating: {
    alignItems: 'center',
    backgroundColor: colors.bgInset,
    borderRadius: radius.xs,
    flexDirection: 'row',
    gap: 3,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6
  },
  ratingText: { color: colors.textPrimary, fontSize: 12, fontWeight: '800' },
  offer: { color: colors.textPrimary, fontSize: 15, lineHeight: 21, marginTop: spacing.lg },
  metaRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.xs, marginTop: spacing.md },
  dot: { color: colors.textFaint, fontSize: 13 },
  meta: { color: colors.textMuted, fontSize: 13 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md },
  status: { color: colors.accentPrimary, fontSize: 12, fontWeight: '800' },
  saves: { color: colors.textFaint, fontSize: 12 }
});
