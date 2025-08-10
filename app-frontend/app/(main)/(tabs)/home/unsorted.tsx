import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

import { useHomeContext } from "@/hooks/useHomeContext";

export default function UnsortedHomePage() {
    const { searchBarInput } = useHomeContext();

    return (
        <View style={{ 
              justifyContent: "flex-start", 
              alignItems: "center",
              flex: 1,
              }}>
          <ThemedText>Edit app/home.tsx to edit this screen.</ThemedText>
          <ThemedText>Unsorted</ThemedText>
          <ThemedText>Search Bar Input: {searchBarInput}</ThemedText>
        </View>
    );
}