import { SafeAreaView, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";

import { useSession } from '@/state/contexts/AuthContext';

export default function Settings() {
    const { signOut } = useSession();

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <ThemedText>App Settings Page</ThemedText>
            <ThemedText>Edit app/settings.tsx to edit this screen.</ThemedText>
            <Button title="Sign Out" onPress={signOut} />
        </SafeAreaView>
    );
}