import { SessionProvider } from "@/state/contexts/AuthContext";
import { Stack } from "expo-router";

import { ThemeProvider } from '@react-navigation/native';
import { DefaultThemeColors, DarkThemeColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SessionProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkThemeColors : DefaultThemeColors}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SessionProvider>
  );
}