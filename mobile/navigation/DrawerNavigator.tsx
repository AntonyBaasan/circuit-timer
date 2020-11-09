import * as React from 'react';
import i18n from 'i18n-js';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SettingsNavigator } from './stacks/SettingsStackNavigator';
import { DebugNavigator } from './stacks/DebugStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Exercises"
        component={BottomTabNavigator}
        options={{ drawerLabel: i18n.t('tab.exercises') }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{ drawerLabel: i18n.t('tab.settings') }}
      />
      <Drawer.Screen name="Debug" component={DebugNavigator} />
    </Drawer.Navigator>
  );
}
