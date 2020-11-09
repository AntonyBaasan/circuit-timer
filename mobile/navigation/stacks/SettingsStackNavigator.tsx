import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import i18n from 'i18n-js';

import { ScreenNames } from '../../constants/Screen';
import { TabSettingsParamList } from '../../types';
import { SettingsScreen } from '../../screens';
import useColorScheme from '../../hooks/useColorScheme';
import createDefaultScreenOptions from './ScreenOptions';

const SettingsStack = createStackNavigator<TabSettingsParamList>();

export function SettingsNavigator({ navigation }) {
  const colorScheme = useColorScheme();
  const screenOptions = createDefaultScreenOptions(
    i18n.t('tab.settings'),
    colorScheme,
    navigation
  );
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name={ScreenNames.SettingsScreen}
        component={SettingsScreen}
        options={screenOptions}
      />
    </SettingsStack.Navigator>
  );
}
