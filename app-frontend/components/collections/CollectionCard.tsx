import { View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";

export default function CollectionCard({props} : {
        props: {
            collection_id: string,
            name: string,
            bookmark_count: number
        }
    }
) {

    return (
        <Pressable style={{
            padding: 8,
            backgroundColor: "transparent",
            flexDirection: "column",
            gap: 4,
            flex: 1
        }}
        onPress={() => router.push(`/collections/${props.collection_id}`)}>
            <View style={{
            aspectRatio: 1,
            width: "100%",
            backgroundColor: "#D9D9D9",
            borderRadius: 10,
            }}/>
            <ThemedText>{props.name}</ThemedText>
        </Pressable>
    )
}