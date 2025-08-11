import { Slot, router } from "expo-router";
import { useState } from "react";

import { View, SafeAreaView, Keyboard } from "react-native";
import { HomeContext } from "@/hooks/useHomeContext";

import HomeTopNavBar from "@/components/HomeTopNavBar";

enum TabOptions {
  UNSORTED = 1,
  COLLECTIONS = 2,
  TAGS = 3,
}

export default function HomeLayout() {
  const [activeTab, setActiveTab] = useState<TabOptions>(
    TabOptions.COLLECTIONS
  );
  const [searchBarInput, setSearchBarInput] = useState<string>("");

  const handleTabChange = (tab: number) => {
    Keyboard.dismiss();

    setActiveTab(tab);
    switch (tab) {
      case TabOptions.UNSORTED:
        router.push("/(main)/(tabs)/home/unsorted");
        break;
      case TabOptions.COLLECTIONS:
        router.push("/(main)/(tabs)/home/collections");
        break;
      case TabOptions.TAGS:
        router.push("/(main)/(tabs)/home/tags");
        break;
    }
  };

  const handleSearchBarInputChange = (text: string) => {
    setSearchBarInput(text);
  };

  return (
    <HomeContext.Provider value={{ searchBarInput, setSearchBarInput }}>
      <SafeAreaView
        style={{
          flexDirection: "column",
          width: "100%",
          flex: 1,
        }}
      >
        <HomeTopNavBar
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          searchBarInput={searchBarInput}
          handleSearchBarInputChange={handleSearchBarInputChange}
          tabEnums={TabOptions}
        />

        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <Slot />
        </View>
      </SafeAreaView>
    </HomeContext.Provider>
  );
}
