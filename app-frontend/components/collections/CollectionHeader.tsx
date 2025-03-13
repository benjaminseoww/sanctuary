import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

import BackIcon from '@/assets/icons/menu_back.svg';
import ShareIcon from '@/assets/icons/share.svg';
import MenuIcon from '@/assets/icons/menu.svg';

export default function CollectionHeader() {
    const handleGoBack = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <View style={{justifyContent: 'flex-start'}}>
                <TouchableOpacity>
                    <BackIcon onPress={handleGoBack} height='24' color={useThemeColor({}, 'iconInactiveTintColor')}/>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', gap: 16, justifyContent: 'flex-end'}}>
                <TouchableOpacity>
                    <ShareIcon height='24' color={useThemeColor({}, 'iconInactiveTintColor')}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MenuIcon height='24' color={useThemeColor({}, 'iconInactiveTintColor')}/>
                </TouchableOpacity>
            </View>
        </View>
    )
        
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 16,
        gap: 8,
        width: "100%",
    }
})