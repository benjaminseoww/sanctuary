import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

type ThemedTextProps = TextProps & {
  type?: 'default' | 'heading' | 'subheading' | 'collectionInfo' | 'button' | 'bookmarkCardTop' | 'bookmarkCardBottom';
  color?: string; // Optional override color
};

/**
 * ThemedText component that automatically uses the text color from the current theme
 * 
 * @example
 * // Basic usage
 * <ThemedText>This text will use theme color</ThemedText>
 * 
 * @example
 * // With text type
 * <ThemedText type="heading">Heading Text</ThemedText>
 * 
 * @example
 * // With color override
 * <ThemedText color="#FF0000">Red Text</ThemedText>
 */
export function ThemedText(props: ThemedTextProps) {
  const { style, type = 'default', color, ...otherProps } = props;
  
  // Get the current theme from React Navigation
  const { colors } = useTheme();
  
  // Use the provided color or fall back to the theme's text color
  const textColor = color || colors.text;
  
  return (
    <Text 
      style={[
        styles.default,
        type !== 'default' && styles[type],
        { color: textColor },
        style
      ]} 
      {...otherProps} 
    />
  );
}

// Predefined text styles
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 8,
  },
  collectionInfo: {
    fontSize: 14,
    opacity: 0.7,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
  },
  bookmarkCardTop: {
    fontSize: 12, 
  },
  bookmarkCardBottom: {
    fontSize: 10, 
    opacity: 0.7
  }
});
