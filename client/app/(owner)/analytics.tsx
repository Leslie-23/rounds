import { StyleSheet, Text, View } from 'react-native';
import { MetricPill } from '@/components/MetricPill';
import { Screen } from '@/components/Screen';
import { ownerMetrics } from '@/data/mock';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function Analytics() {
  return (
    <Screen scroll>
      <Text style={styles.title}>Venue pulse</Text>
      <Text style={styles.subtitle}>Lowlight Bar is converting Round traffic into paid second orders.</Text>
      <View style={styles.metrics}>
        {ownerMetrics.map((metric) => (
          <MetricPill key={metric.label} label={metric.label} value={metric.value} tone={metric.tone} />
        ))}
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Tonight</Text>
        <Text style={styles.panelValue}>26 expected check-ins</Text>
        <Text style={styles.panelDetail}>Peak window: 7:30-9:15pm. Staff coverage looks good.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.display, fontSize: 38 },
  subtitle: { ...typography.bodyMuted, marginTop: spacing.sm },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xl },
  panel: {
    backgroundColor: colors.bgRaised,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: spacing.xl,
    padding: spacing.lg
  },
  panelTitle: { ...typography.data, color: colors.textFaint },
  panelValue: { color: colors.textPrimary, fontSize: 24, fontWeight: '900', marginTop: spacing.sm },
  panelDetail: { ...typography.bodyMuted, marginTop: spacing.sm }
});
