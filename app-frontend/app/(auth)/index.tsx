import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '@/state/contexts/AuthContext';
import { ThemedText } from '@/components/ThemedText';

export default function AuthLoadingScreen() {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        // User is logged in, redirect to home/collections
        router.replace('/(main)/(tabs)/home/collections');
      } else {
        // User is not logged in, redirect to sign-in
        router.replace('/(auth)/login');
      }
    }
  }, [session, isLoading, router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <ThemedText style={{ marginTop: 20 }}>Loading...</ThemedText>
    </View>
  );
}