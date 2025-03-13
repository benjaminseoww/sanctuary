import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView, View } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";

import CollectionHeader from "@/components/collections/CollectionHeader";

export default function Collection() {
    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView style={{
              flexDirection: 'column',
              width: "100%",
              flex: 1,
              alignItems: "center"
        }}> 
            <CollectionHeader/>
            <View style={{
                justifyContent: "flex-start",
                width: "100%",
                paddingHorizontal: 16,
                paddingVertical: 8,
                flexDirection: "column",
                }}>
                <ThemedText type="heading">Collection {id}</ThemedText>
                <ThemedText type="collectionInfo">100 bookmarks</ThemedText>
            </View>
            <View style = {{
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
            }}>
                <ThemedText>Rest of Content</ThemedText>
                <ThemedText>Edit app/collections/[id].tsx to edit this screen.</ThemedText>
            </View>
        </SafeAreaView>
    )
}