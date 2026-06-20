import { Redirect } from 'expo-router';
import { useSessionStore } from '@/stores/session';

export default function Index() {
  const role = useSessionStore((state) => state.user?.role);

  if (!role) return <Redirect href="/(auth)/login" />;
  return <Redirect href="/(member)" />;
}
