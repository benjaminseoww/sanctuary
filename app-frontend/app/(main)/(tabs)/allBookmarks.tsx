import { SafeAreaView } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function AllBookmarks() {
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <ThemedText>All Your Bookmarks</ThemedText>
            <ThemedText>Edit app/all_bookmarks.tsx to edit this screen.</ThemedText>
        </SafeAreaView>
    );
}