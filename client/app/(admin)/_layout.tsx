import { Redirect, Stack } from 'expo-router';
import { useSessionStore } from '@/stores/session';

export default function AdminLayout() {
  const role = useSessionStore((state) => state.user?.role);
  if (role !== 'admin') return <Redirect href="/" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
