import { Stack } from "expo-router";
import { ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DefaultThemeColors, DarkThemeColors } from '@/constants/Colors';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkThemeColors : DefaultThemeColors}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="collections/[id]" options={{ 
            headerShown: false,
            }} />
        </Stack>
    </ThemeProvider>
  );
}
