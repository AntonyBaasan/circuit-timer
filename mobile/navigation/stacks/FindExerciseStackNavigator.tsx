import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import i18n from 'i18n-js';

import { ScreenNames } from '../../constants/Screen';
import useColorScheme from '../../hooks/useColorScheme';
import { MarketplaceScreen } from '../../screens';
import { TabFindParamList } from '../../types';
import createDefaultScreenOptions from './ScreenOptions';

const FindStack = createStackNavigator<TabFindParamList>();

export function FindExerciseNavigator({ navigation }) {
  const colorScheme = useColorScheme();
  const toggleDrawer = () => navigation.toggleDrawer();
  const screenOptions = createDefaultScreenOptions(
    i18n.t('tab.find'),
    colorScheme,
    toggleDrawer
  );
  
  return (
    <FindStack.Navigator>
      <FindStack.Screen
        name={ScreenNames.MarketplaceScreen}
        component={MarketplaceScreen}
        options={screenOptions}
      />
    </FindStack.Navigator>
  );
}
