import { Redirect } from 'expo-router';
import { useSessionStore } from '@/stores/session';

export default function Index() {
  const role = useSessionStore((state) => state.user?.role);

  if (!role) return <Redirect href="/(auth)/login" />;
  if (role === 'member') return <Redirect href="/(member)" />;
  if (role === 'restaurant_staff') return <Redirect href="/(staff)/scanner" />;
  if (role === 'restaurant_owner') return <Redirect href="/(owner)/analytics" />;
  return <Redirect href="/(admin)/venues-queue" />;
}
