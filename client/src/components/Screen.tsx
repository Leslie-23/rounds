import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme/tokens';

type Props = PropsWithChildren<{
  scroll?: boolean;
}>;

export function Screen({ children, scroll = false }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.inner}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  inner: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  scrollInner: { paddingBottom: spacing.xxl, paddingHorizontal: spacing.lg, paddingTop: spacing.lg }
});
