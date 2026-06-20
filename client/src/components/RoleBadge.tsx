import { StyleSheet, Text, View } from 'react-native';
import { Role } from '@/stores/session';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const labels: Record<Role, string> = {
  member: 'Member',
  restaurant_staff: 'Staff access',
  restaurant_owner: 'Owner access',
  admin: 'Admin access'
};

const accents: Record<Role, string> = {
  member: colors.accentPrimary,
  restaurant_staff: colors.accentSecondary,
  restaurant_owner: colors.accentBlue,
  admin: colors.accentAlert
};

type Props = {
  role: Role;
};

export function RoleBadge({ role }: Props) {
  return (
    <View style={styles.badge}>
      <View style={[styles.dot, { backgroundColor: accents[role] }]} />
      <Text style={styles.text}>{labels[role]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.bgSurface,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6
  },
  dot: { borderRadius: 4, height: 8, width: 8 },
  text: { ...typography.data, color: colors.textMuted, fontSize: 11 }
});
