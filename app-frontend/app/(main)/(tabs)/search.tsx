import { View, SafeAreaView, ScrollView, Keyboard } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

function SearchTabContent({searchBarInput} : {searchBarInput: string}) {
    return (
      <View style={{ 
        justifyContent: "flex-start", 
        alignItems: "center",
        flex: 1,
        }}>
        <ThemedText>SEARCH</ThemedText>
        <ThemedText>Edit app/search.tsx to edit this screen.</ThemedText>
        <ThemedText>Search Bar Input: {searchBarInput}</ThemedText>
      </View>
    )
  }

export default function Search() {

    const [searchBarInput, setSearchBarInput] = useState('');

    const handleSearchBarInputChange = (text: string) => {
        setSearchBarInput(text);
    }

    return (
        <SafeAreaView style={{
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
          }}>
            <View style={{flexDirection: 'row', width: "100%", alignContent: 'center', padding: 8}}>
                <SearchBar searchBarInput={searchBarInput} handleSearchBarInputChange={handleSearchBarInputChange}/>
            </View>
            <ScrollView
                keyboardShouldPersistTaps="never"
                onScrollBeginDrag={() => Keyboard.dismiss()}
                contentContainerStyle={{
                    flex: 1,
                }}
                >
                <SearchTabContent searchBarInput={searchBarInput}/>
            </ScrollView>
        </SafeAreaView>
    );
}