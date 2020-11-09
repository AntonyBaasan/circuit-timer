import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { ScreenNames } from '../../constants/Screen';
import { DebugParamList } from '../../types';
import DebugScreen from '../../screens/DebugScreen/DebugScreen';
import createDefaultScreenOptions from './ScreenOptions';
import useColorScheme from '../../hooks/useColorScheme';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/navigation/HeaderButtons';

const DebugStack = createStackNavigator<DebugParamList>();

export function DebugNavigator({ navigation }: any) {
  const colorScheme = useColorScheme();
  const toggleDrawer = () => navigation.toggleDrawer();
  const defaultScreenOptions = createDefaultScreenOptions('Debug', colorScheme);
  const screenOptions = {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={toggleDrawer} />
      </HeaderButtons>
    ),
  };
  return (
    <DebugStack.Navigator screenOptions={defaultScreenOptions}>
      <DebugStack.Screen
        name={ScreenNames.DebugScreen}
        component={DebugScreen}
        options={screenOptions}
      />
    </DebugStack.Navigator>
  );
}
