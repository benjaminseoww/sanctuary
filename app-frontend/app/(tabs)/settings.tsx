import { SafeAreaView } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function Settings() {
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <ThemedText>App Settings Page</ThemedText>
            <ThemedText>Edit app/settings.tsx to edit this screen.</ThemedText>
        </SafeAreaView>
    );
}