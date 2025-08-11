import { View, Pressable, Linking } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function BookmarkCard({
  props,
}: {
  props: {
    bookmark_id: number;
    document_id: number;
    document_url: string;
    document_creator_username: string;
    document_creator_name: string;
    thumbnail_url: string;
    title: string;
    caption: string;
    doctype_id: number;
  };
}) {
  return (
    <Pressable
      style={{
        padding: 4,
        backgroundColor: "transparent",
        flexDirection: "column",
        gap: 4,
        flex: 1,
      }}
      onPress={() => Linking.openURL(props.document_url)}
    >
      <View
        style={{
          aspectRatio: 0.75,
          width: "100%",
          backgroundColor: "#D9D9D9",
          borderRadius: 10,
        }}
      />
      <View
        style={{
          flexDirection: "column",
          gap: 8,
        }}
      >
        <ThemedText style={{}} type="bookmarkCardTop">
          {props.document_creator_username}
        </ThemedText>
        <ThemedText
          style={{
            flexShrink: 1,
            maxWidth: "100%",
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
          type="bookmarkCardBottom"
        >
          {props.caption}
        </ThemedText>
      </View>
    </Pressable>
  );
}
