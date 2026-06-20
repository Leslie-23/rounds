import { ScanLine } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function Scanner() {
  return (
    <Screen>
      <Text style={styles.title}>Scan a round</Text>
      <View style={styles.scanner}>
        <ScanLine size={56} color={colors.accentPrimary} />
      </View>
      <Text style={styles.copy}>Point the camera at a member QR or use manual PIN entry.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.display, fontSize: 36, marginTop: spacing.md },
  scanner: {
    alignItems: 'center',
    aspectRatio: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: spacing.xxl
  },
  copy: { ...typography.bodyMuted, marginTop: spacing.lg, textAlign: 'center' }
});
