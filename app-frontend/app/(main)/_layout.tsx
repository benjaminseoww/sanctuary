import { Stack, Redirect} from "expo-router";

import { useSession } from '@/state/contexts/AuthContext';

export default function MainLayout() {
  const { session } = useSession();

  if (session == null) {
    return <Redirect href="/(auth)/login" />
  }

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="collections/[id]" options={{ 
          headerShown: false,
          }} />
      </Stack>
  );
}
