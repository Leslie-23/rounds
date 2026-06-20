import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme/tokens';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  detail: string;
  href?: string;
};

export function ActionRow({ icon, title, detail, href }: Props) {
  return (
    <Pressable style={styles.row} onPress={() => href && router.push(href as never)}>
      <View style={styles.icon}>
        <Ionicons name={icon} size={18} color={colors.accentPrimary} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
      {href ? <Ionicons name="chevron-forward" size={18} color={colors.textMuted} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.bgInset,
    borderRadius: radius.sm,
    height: 38,
    justifyContent: 'center',
    width: 38
  },
  copy: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  detail: { color: colors.textMuted, fontSize: 12, marginTop: 3 }
});
