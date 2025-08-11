import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";

import MenuIcon from '@/assets/icons/menu.svg';

import { useThemeColor } from '@/hooks/useThemeColor';

import SearchBar from "@/components/SearchBar";

export default function HomeTopNavBar({
    activeTab, 
    handleTabChange, 
    searchBarInput, 
    handleSearchBarInputChange, 
    tabEnums} : 
    {
        activeTab : number, 
        handleTabChange : (tab: number) => void, 
        searchBarInput : string,
        handleSearchBarInputChange : (text: string) => void, 
        tabEnums: any
    }) {

    return (
        <View style={{
            flex: 0
        }}>
            <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 24,
            marginBottom: 8
            }}>
                <Pressable onPress={() => handleTabChange(tabEnums.UNSORTED)}>
                    <Text style={activeTab == tabEnums.UNSORTED ? 
                        {...styles.navText, color: useThemeColor({}, 'iconActiveTintColor'), borderBottomColor: useThemeColor({}, 'iconActiveTintColor')} : 
                        {...styles.navText, color: useThemeColor({}, 'iconInactiveTintColor'), borderBottomColor: 'transparent'}}>
                            Unsorted</Text>
                </Pressable>
                <Pressable onPress={() => handleTabChange(tabEnums.COLLECTIONS)}>
                    <Text style={activeTab == tabEnums.COLLECTIONS ? 
                        {...styles.navText, color: useThemeColor({}, 'iconActiveTintColor'), borderBottomColor: useThemeColor({}, 'iconActiveTintColor')} : 
                        {...styles.navText, color: useThemeColor({}, 'iconInactiveTintColor'), borderBottomColor: 'transparent'}}>
                            Collections</Text>
                </Pressable>
                <Pressable onPress={() => handleTabChange(tabEnums.TAGS)}>
                    <Text style={activeTab == tabEnums.TAGS ? 
                        {...styles.navText, color: useThemeColor({}, 'iconActiveTintColor'), borderBottomColor: useThemeColor({}, 'iconActiveTintColor')} : 
                        {...styles.navText, color: useThemeColor({}, 'iconInactiveTintColor'), borderBottomColor: 'transparent'}}>
                            Tags</Text>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', width: "100%", alignContent: 'center', padding: 8}}>
                <View style={{flexDirection: 'row', flex: 1, alignContent: 'center', padding: 4}}>
                    <SearchBar searchBarInput={searchBarInput} handleSearchBarInputChange={handleSearchBarInputChange}/>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, marginLeft: 4}}>
                    <MenuIcon color={useThemeColor({}, 'iconInactiveTintColor')}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navText: {
        paddingVertical: 4,
        fontWeight: 'bold', 
        fontSize: 16, 
        borderBottomWidth: 3,
    },
})