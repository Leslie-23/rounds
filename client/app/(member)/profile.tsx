import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActionRow } from '@/components/ActionRow';
import { MetricPill } from '@/components/MetricPill';
import { RoleBadge } from '@/components/RoleBadge';
import { Screen } from '@/components/Screen';
import { useSessionStore } from '@/stores/session';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function Profile() {
  const role = useSessionStore((state) => state.user?.role ?? 'member');
  const clearSession = useSessionStore((state) => state.clearSession);
  const canScan = role === 'restaurant_staff' || role === 'restaurant_owner' || role === 'admin';
  const canManage = role === 'restaurant_owner' || role === 'admin';
  const canAdmin = role === 'admin';

  function signOut() {
    clearSession();
    router.replace('/');
  }

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Your membership</Text>
        <RoleBadge role={role} />
      </View>

      <View style={styles.card}>
        <Text style={styles.memberName}>Maya Cole</Text>
        <Text style={styles.memberId}>ROUND-2847-19</Text>
        <View style={styles.metrics}>
          <MetricPill label="weekly rounds" value="5" />
          <MetricPill label="used" value="2" tone="blue" />
          <MetricPill label="streak" value="6 wk" tone="green" />
        </View>
      </View>

      <Text style={styles.section}>Member</Text>
      <View style={styles.stack}>
        <ActionRow icon="receipt-outline" title="Visit history" detail="Confirmed rounds and receipts" href="/(member)/history" />
        <ActionRow icon="card-outline" title="Plan and billing" detail="Standard plan, renews Monday" />
        <ActionRow icon="heart-outline" title="Saved rooms" detail="18 places on your shortlist" />
      </View>

      {canScan ? (
        <>
          <Text style={styles.section}>Access</Text>
          <View style={styles.stack}>
            <ActionRow icon="scan-outline" title="Scan a round" detail="Confirm QR or PIN at assigned venues" href="/(staff)/scanner" />
            <ActionRow icon="list-outline" title="Today's log" detail="Recent venue confirmations" href="/(staff)/log" />
            {canManage ? (
              <ActionRow icon="analytics-outline" title="Venue pulse" detail="Traffic, attach rate, and repeat guests" href="/(owner)/analytics" />
            ) : null}
            {canAdmin ? (
              <ActionRow icon="shield-checkmark-outline" title="Approval queue" detail="Review venues waiting to go live" href="/(admin)/venues-queue" />
            ) : null}
          </View>
        </>
      ) : null}

      <Pressable style={styles.signOut} onPress={signOut}>
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  title: { ...typography.display, flex: 1, fontSize: 34, lineHeight: 38 },
  card: {
    backgroundColor: colors.bgRaised,
    borderColor: colors.borderStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: spacing.xl,
    padding: spacing.lg
  },
  memberName: { ...typography.display, fontSize: 28 },
  memberId: { ...typography.data, color: colors.textFaint, marginTop: spacing.xs },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  section: { ...typography.data, color: colors.textFaint, marginTop: spacing.xl, marginBottom: spacing.sm },
  stack: { gap: spacing.sm },
  signOut: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    marginTop: spacing.xl,
    padding: spacing.md
  },
  signOutText: { color: colors.textMuted, fontWeight: '800' }
});
