import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView, View, FlatList } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useLocalSearchParams, Stack } from "expo-router";

import CollectionHeader from "@/components/collections/CollectionHeader";

import BookmarkCard from "@/components/bookmarks/BookmarkCard";
import SearchBar from "@/components/SearchBar";

import collectionsService from "@/services/collectionsService";

function ListHeaderComponent({
    searchBarInput, 
    handleSearchBarInputChange, 
    } : {
        searchBarInput : string,
        handleSearchBarInputChange : (text: string) => void, 
    }) {
    return (
        <View style={{
            width: "100%", 
            flexDirection: 'row', 
            padding: 4
        }}>
            <SearchBar searchBarInput={searchBarInput} handleSearchBarInputChange={handleSearchBarInputChange}/>
        </View>
    )
}

export default function Collection() {
    const { id } = useLocalSearchParams();
    const [searchBarInput, setSearchBarInput] = useState<string>(""); 
    // const [bookmarksData, setBookmarksData] = useState<any[]>([]);
    // const [bookmarksDataCursor, setBookmarksDataCursor] = useState<string | null>(null);

    const handleSearchBarInputChange = (text: string) => {
        setSearchBarInput(text);
    }

    const flatListRef = useRef<FlatList<any>>(null);

    // useEffect(() => {
    //     console.log("fetching collection data for id: ", id);

    //     collectionsService.getBookmarksOfCollection(1, null, Number(id)).then((response : any) => {
    //         console.log("fetching collection data for id: ", id);
    //         setBookmarksData(response.bookmarks);
    //         setBookmarksDataCursor(response.next_cursor);
    //     })
    // }, [])

    return (
        <SafeAreaView style={{
              flexDirection: 'column',
              width: "100%",
              flex: 1,
              alignItems: "center",
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
                flexDirection: "column",
                flex: 1,
                width: "100%",
            }}>
                <View style={{width: "100%", flex: 1}}>
                    <FlatList
                        ref={flatListRef}  
                        data={bookmarksData}
                        renderItem={({item}) => <BookmarkCard props={item} />}
                        numColumns={2}
                        keyExtractor={item => item.bookmark_id.toString()}
                        style={{ flex: 1 }} 
                        contentContainerStyle={{ padding: 4 }}
                        scrollEnabled={true}
                        ListHeaderComponent={<ListHeaderComponent searchBarInput={searchBarInput} handleSearchBarInputChange={handleSearchBarInputChange}/>}
                        maintainVisibleContentPosition={{
                            minIndexForVisible: 0,
                        }}
                        onLayout={() => {
                            if (flatListRef.current) {
                              flatListRef.current.scrollToOffset({ offset: 50, animated: false });
                            }
                        }}
                        onRefresh={() => {
                            // TODO: add in re fetch logic
                            console.log("Refreshing data");
                        }}
                        refreshing={false}
                        />
                </View>
            </View> 
        </SafeAreaView>
    )
}

const bookmarksData = [
    {
        bookmark_id: 1,
        document_id: 1,
        document_url: 'https://www.instagram.com/p/DGLKbrUz3XQ/',
        document_creator_username: '@nusproductclub',
        document_creator_name: 'NUS Product Club',
        thumbnail_url: '',
        title: '',
        caption: "Test Caption ABCabc hello world good morning today is going to",
        doctype_id: 2
    },
    {
        bookmark_id: 2,
        document_id: 2,
        document_url: 'https://www.instagram.com/p/DGNEQ2Mz2gV/',
        document_creator_username: '@test1234',
        document_creator_name: 'Test 1234',
        thumbnail_url: '',
        title: '',
        caption: "Test Caption ABCabc \n hello world good morning today is going to",
        doctype_id: 2
    },
    // repeated data from here
    {
        bookmark_id: 3,
        document_id: 1,
        document_url: 'https://www.instagram.com/p/DGLKbrUz3XQ/',
        document_creator_username: '@nusproductclub',
        document_creator_name: 'NUS Product Club',
        thumbnail_url: '',
        title: '',
        caption: "Test Caption ABCabc hello world good morning today is going to",
        doctype_id: 2
    },
    {
        bookmark_id: 4,
        document_id: 1,
        document_url: 'https://www.instagram.com/p/DGLKbrUz3XQ/',
        document_creator_username: '@nusproductclub',
        document_creator_name: 'NUS Product Club',
        thumbnail_url: '',
        title: '',
        caption: "Test Caption ABCabc hello world good morning today is going to",
        doctype_id: 2
    },
    {
        bookmark_id: 5,
        document_id: 1,
        document_url: 'https://www.instagram.com/p/DGLKbrUz3XQ/',
        document_creator_username: '@nusproductclub',
        document_creator_name: 'NUS Product Club',
        thumbnail_url: '',
        title: '',
        caption: "Test Caption ABCabc hello world good morning today is going to",
        doctype_id: 2
    },
    {
        bookmark_id: 6,
        document_id: 1,
        document_url: 'https://www.instagram.com/p/DGLKbrUz3XQ/',
        document_creator_username: '@nusproductclub',
        document_creator_name: 'NUS Product Club',
        thumbnail_url: '',
        title: '',
        caption: "Test Caption ABCabc hello world good morning today is going to",
        doctype_id: 2
    },
]

