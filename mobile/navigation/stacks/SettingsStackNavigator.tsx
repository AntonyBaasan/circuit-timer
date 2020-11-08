import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { ScreenNames } from '../../constants/Screen';
import { TabSettingsParamList } from '../../types';
import { SettingsScreen } from '../../screens';

const TabSettingsStack = createStackNavigator<TabSettingsParamList>();

export function TabSettingsNavigator() {
  return (
    <TabSettingsStack.Navigator>
      <TabSettingsStack.Screen
        name={ScreenNames.SettingsScreen}
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </TabSettingsStack.Navigator>
  );
}
