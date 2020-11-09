import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/navigation/HeaderButtons';
import Colors from '../../constants/Colors';

export default function createDefaultScreenOptions(
  title: string,
  colorScheme: 'light' | 'dark',
  navigation: any
): StackNavigationOptions {
  const toggleDrawer = () => navigation.toggleDrawer();
  return {
    headerTintColor: Colors[colorScheme].tint, // color of the text (title) in the header
    headerStyle: {
      backgroundColor: Colors[colorScheme].background,
    },
    headerTitleAlign: 'center',
    headerTitle: title,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={toggleDrawer} />
      </HeaderButtons>
    ),
  };
}
