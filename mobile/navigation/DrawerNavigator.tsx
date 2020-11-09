import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import i18n from 'i18n-js';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList } from '../types';
import { FindExerciseNavigator } from './stacks/FindExerciseStackNavigator';
import { SettingsNavigator } from './stacks/SettingsStackNavigator';
import { DebugNavigator } from './stacks/DebugStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={i18n.t('tab.exercises')} component={BottomTabNavigator} />
      <Drawer.Screen name={i18n.t('tab.settings')} component={SettingsNavigator} />
      <Drawer.Screen name="Debug" component={DebugNavigator} />
    </Drawer.Navigator>
  );
}

  