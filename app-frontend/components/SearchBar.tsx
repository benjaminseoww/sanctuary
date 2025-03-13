import { View, TextInput, Pressable } from "react-native";
import SearchBarIcon from '@/assets/icons/search-bar-icon.svg';
import SearchBarCancelIcon from '@/assets/icons/search-bar-cancel.svg';

import { useThemeColor } from '@/hooks/useThemeColor';

export default function SearchBar({searchBarInput, handleSearchBarInputChange} : 
    {
        searchBarInput: string,
        handleSearchBarInputChange: (text: string) => void
    }) {

    const searchBarBackground = useThemeColor({}, 'searchBarBackground');
    const searchBarPlaceholder = useThemeColor({}, 'searchBarPlaceholder');
    const searchBarText = useThemeColor({}, 'searchBarText');
    const iconInactiveTintColor = useThemeColor({}, 'iconInactiveTintColor');

    return (
        <View style={{flex: 1}}>
            <View style={{
            flexDirection: 'row',
            borderRadius: 8,
            padding: 10,
            marginLeft: 4,
            backgroundColor: searchBarBackground,
            }}>
                <View style={{paddingRight: 8, flex: 0}}> 
                    <SearchBarIcon color={searchBarPlaceholder}/>
                </View>
                <TextInput 
                placeholder="Search" 
                placeholderTextColor={useThemeColor({}, 'searchBarPlaceholder')} 
                style={{flex: 1, 
                    color: searchBarText,
                    fontSize: 16,
                }} 
                value={searchBarInput}
                onChangeText={handleSearchBarInputChange}/>
                {searchBarInput.length > 0 && (
                    <Pressable onPress={() => handleSearchBarInputChange('')} style={{paddingLeft: 8, flex: 0}}> 
                        <SearchBarCancelIcon color={iconInactiveTintColor}/>
                    </Pressable>
                )}
            </View>
        </View>
    )
}