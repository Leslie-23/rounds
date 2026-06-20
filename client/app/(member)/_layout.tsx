import { Redirect, Stack } from 'expo-router';
import { useSessionStore } from '@/stores/session';

export default function MemberLayout() {
  const role = useSessionStore((state) => state.user?.role);
  if (!role) return <Redirect href="/" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
