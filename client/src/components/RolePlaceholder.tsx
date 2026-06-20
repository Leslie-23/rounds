import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { colors, radius, spacing, typography } from '@/theme/tokens';

type Props = {
  title: string;
  body: string;
};

export function RolePlaceholder({ title, body }: Props) {
  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgSurface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: spacing.xxl,
    padding: spacing.xl
  },
  title: { ...typography.display, fontSize: 30 },
  body: { ...typography.bodyMuted, marginTop: spacing.md }
});
