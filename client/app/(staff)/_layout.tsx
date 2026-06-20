import { Redirect, Stack } from 'expo-router';
import { useSessionStore } from '@/stores/session';

export default function StaffLayout() {
  const role = useSessionStore((state) => state.user?.role);
  if (role !== 'restaurant_staff' && role !== 'restaurant_owner') return <Redirect href="/" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
