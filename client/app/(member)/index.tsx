import { MapPin, Search } from 'lucide-react-native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { RoundProgress } from '@/components/RoundProgress';
import { mockVenues } from '@/data/mock';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function Discover() {
  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>5 rounds this week</Text>
          <Text style={styles.title}>Good rooms nearby</Text>
        </View>
        <RoundProgress used={2} total={5} />
      </View>
      <Pressable style={styles.search}>
        <Search size={18} color={colors.textMuted} />
        <Text style={styles.searchText}>Search bars, sushi, lounges</Text>
      </Pressable>
      <FlatList
        data={mockVenues}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.venue}>{item.name}</Text>
            <Text style={styles.offer}>{item.offer}</Text>
            <View style={styles.metaRow}>
              <MapPin size={15} color={colors.textMuted} />
              <Text style={styles.meta}>{item.distance} · {item.category}</Text>
            </View>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  kicker: { ...typography.data, color: colors.accentPrimary },
  title: { ...typography.display, fontSize: 34, lineHeight: 38, marginTop: spacing.xs },
  search: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xl,
    padding: spacing.md
  },
  searchText: { color: colors.textMuted, fontSize: 15 },
  list: { gap: spacing.md, paddingTop: spacing.xl, paddingBottom: spacing.xxl },
  card: {
    backgroundColor: colors.bgSurface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg
  },
  venue: { ...typography.display, fontSize: 24 },
  offer: { color: colors.textPrimary, fontSize: 15, marginTop: spacing.sm },
  metaRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.xs, marginTop: spacing.md },
  meta: { color: colors.textMuted, fontSize: 13 }
});
