import { Tabs } from 'expo-router';

import BottomNavTabBar from '@/components/BottomNavTabBar';

import HomeIcon from '@/assets/icons/nav-home.svg'
import SearchIcon from '@/assets/icons/nav-search.svg'
import AllBookmarksIcon from '@/assets/icons/nav-all-items.svg'
import SettingsIcon from '@/assets/icons/nav-settings.svg'

export default function TabLayout() {

  return (
    <Tabs
      tabBar={props => <BottomNavTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: (props: any) => <HomeIcon height='24' {...props}/>
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: (props: any) => <SearchIcon height='24' {...props}/>
        }}
      />
      <Tabs.Screen
        name="allBookmarks"
        options={{
          title: 'All Bookmarks',
          tabBarIcon: (props: any) => <AllBookmarksIcon height='24' {...props}/>
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: (props: any) => <SettingsIcon height='24' {...props}/>
        }}
      />
    </Tabs>
  );
}
