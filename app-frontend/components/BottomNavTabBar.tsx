import { View, StyleSheet } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useThemeColor } from '@/hooks/useThemeColor';

import HomeIcon from '@/assets/icons/nav-home.svg'
import SearchIcon from '@/assets/icons/nav-search.svg'
import AllBookmarksIcon from '@/assets/icons/nav-all-items.svg'
import SettingsIcon from '@/assets/icons/nav-settings.svg'

export default function BottomNavTabBar({ state, descriptors, navigation } : BottomTabBarProps) {
    const { buildHref } = useLinkBuilder();
    const activeColor = useThemeColor({}, "iconActiveTintColor");
    const inactiveColor = useThemeColor({}, "iconInactiveTintColor");

    const icon = {
      home: (props: any) => <HomeIcon height='24' {...props}/>,
      search: (props: any) => <SearchIcon height='24' {...props}/>,
      allBookmarks: (props: any) => <AllBookmarksIcon height='24' {...props}/>,
      settings: (props: any) => <SettingsIcon height='24' {...props}/>,
    } as any;
  
    return (
      <View style={styles.tabBar}>
        {state.routes.map((route : any, index : any) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <PlatformPressable
              key={route.name}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabBarItem}
            >
              {
                icon[route.name]({color: isFocused ? activeColor : inactiveColor})
              }
            </PlatformPressable>
          );
        })}
      </View>
    );
}

const styles = StyleSheet.create({
    tabBar: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        paddingBottom: 32,
        paddingTop: 16,
        gap: 8,
    },
    tabBarItem: { 
        flex: 0, 
        padding: 8,
    }
})