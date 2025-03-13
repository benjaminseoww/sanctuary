/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const Colors = {
  light: {
    iconActiveTintColor: '#0F609B',
    iconInactiveTintColor: '#00000080',
    searchBarBackground: '#7878801F',
    searchBarText: '#3C3C4399',
    searchBarPlaceholder: '#3C3C4399',
  },
  dark: {
    iconActiveTintColor: '#0F609B',
    iconInactiveTintColor: '#ffffff80',
    searchBarBackground: '#1D1E1F',
    searchBarText: '#777879',
    searchBarPlaceholder: '#777879',
  },
};

export const DefaultThemeColors = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0F609B',
    background: '#ffffff',
    text: '#000000',
  }
}

export const DarkThemeColors = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#0F609B',
    background: '#000000',
    text: '#ffffff',
  }
}