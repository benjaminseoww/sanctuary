import { View, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";

import CollectionCard from "@/components/collections/CollectionCard";
import { useHomeContext } from "@/hooks/useHomeContext";

export default function CollectionsHomePage() {
    const { searchBarInput } = useHomeContext();

    return (
        <View style={{ 
          flexDirection: "column",
          flex: 1,
          width: "100%"
          // alignItems: "center",
          }}>
          {/* <ThemedText>Search Bar Input: {searchBarInput}</ThemedText> */}
          <View style={{width: "100%", flex: 1}}>
            <FlatList
              data={collectionsData}
              renderItem={({item}) => <CollectionCard props={item} />}
              numColumns={2}
              keyExtractor={item => item.collection_id}
              style={{ flex: 1 }} 
              contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 4 }}
              scrollEnabled={true}
              onRefresh={() => {
                // TODO: add in re fetch logic
                console.log("Refreshing data");
              }}
              refreshing={false}
              />
          </View>
          
        </View>
    );
}

const collectionsData = [
    {collection_id: "1", name: "Collection 1", bookmark_count: 0},
    {collection_id: "2", name: "Collection 2", bookmark_count: 10},
    {collection_id: "3", name: "Collection 3", bookmark_count: 4},
    {collection_id: "4", name: "Collection 4", bookmark_count: 16},
    {collection_id: "5", name: "Collection 5", bookmark_count: 100},
    {collection_id: "6", name: "Collection 6", bookmark_count: 2},
]