import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { colors, radius, spacing, typography } from '@/theme/tokens';

type Props = {
  title: string;
  body: string;
};

export function RolePlaceholder({ title, body }: Props) {
  return (
    <Screen scroll>
      <View style={styles.hero}>
        <View style={styles.icon}>
          <Ionicons name="sparkles-outline" size={22} color={colors.accentPrimary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.metric}>Live data ready</Text>
        <Text style={styles.detail}>This surface is connected to the same role model and can be wired to the API as the next build step.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.bgRaised,
    borderColor: colors.borderStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xl
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.bgInset,
    borderRadius: radius.md,
    height: 44,
    justifyContent: 'center',
    marginBottom: spacing.lg,
    width: 44
  },
  title: { ...typography.display, fontSize: 34, lineHeight: 38 },
  body: { ...typography.bodyMuted, marginTop: spacing.md },
  card: {
    backgroundColor: colors.bgSurface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: spacing.lg,
    padding: spacing.lg
  },
  metric: { color: colors.textPrimary, fontSize: 18, fontWeight: '900' },
  detail: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: spacing.sm }
});
