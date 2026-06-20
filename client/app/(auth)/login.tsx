import { router } from 'expo-router';
import { Eye } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { useSessionStore } from '@/stores/session';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function Login() {
  const setSession = useSessionStore((state) => state.setSession);

  function enterDemo(role: 'member' | 'restaurant_staff' | 'restaurant_owner' | 'admin') {
    setSession({ accessToken: 'demo', user: { sub: 'demo-user', role, venueIds: [] } });
    router.replace('/');
  }

  return (
    <Screen>
      <View style={styles.brandRow}>
        <View style={styles.ring} />
        <Text style={styles.wordmark}>round</Text>
      </View>
      <Text style={styles.title}>Find the room before you order the night.</Text>
      <Text style={styles.copy}>Sign in to start, scan, manage, or approve rounds.</Text>
      <View style={styles.form}>
        <TextInput placeholder="Email" placeholderTextColor={colors.textMuted} style={styles.input} />
        <TextInput placeholder="Password" placeholderTextColor={colors.textMuted} secureTextEntry style={styles.input} />
        <Pressable style={styles.primaryButton} onPress={() => enterDemo('member')}>
          <Eye size={18} color={colors.bgBase} />
          <Text style={styles.primaryText}>Enter as member</Text>
        </Pressable>
      </View>
      <View style={styles.demoGrid}>
        <Pressable style={styles.demoButton} onPress={() => enterDemo('restaurant_staff')}>
          <Text style={styles.demoText}>Staff</Text>
        </Pressable>
        <Pressable style={styles.demoButton} onPress={() => enterDemo('restaurant_owner')}>
          <Text style={styles.demoText}>Owner</Text>
        </Pressable>
        <Pressable style={styles.demoButton} onPress={() => enterDemo('admin')}>
          <Text style={styles.demoText}>Admin</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl },
  ring: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 5,
    borderColor: colors.accentPrimary,
    borderLeftColor: 'transparent'
  },
  wordmark: { color: colors.textPrimary, fontSize: 30, fontWeight: '700', letterSpacing: 0 },
  title: { ...typography.display, marginTop: spacing.xxl, fontSize: 42, lineHeight: 46 },
  copy: { ...typography.bodyMuted, marginTop: spacing.md, fontSize: 16, lineHeight: 23 },
  form: { gap: spacing.md, marginTop: spacing.xxl },
  input: {
    backgroundColor: colors.bgSurface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    color: colors.textPrimary,
    padding: spacing.md,
    fontSize: 16
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.accentPrimary,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    minHeight: 54
  },
  primaryText: { color: colors.bgBase, fontSize: 16, fontWeight: '700' },
  demoGrid: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  demoButton: {
    flex: 1,
    alignItems: 'center',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingVertical: spacing.md
  },
  demoText: { color: colors.textPrimary, fontWeight: '700' }
});
