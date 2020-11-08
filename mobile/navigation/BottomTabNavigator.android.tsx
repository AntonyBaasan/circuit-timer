import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import i18n from 'i18n-js';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList } from '../types';
import { TabFindExerciseNavigator } from './stacks/FindExerciseStackNavigator';
import { TabExerciseNavigator } from './stacks/ExerciseStackNavigator';
import { TabSettingsNavigator } from './stacks/SettingsStackNavigator';
import { DebugNavigator } from './stacks/DebugStackNavigator';

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Exercises"
    >
      <BottomTab.Screen
        name="Exercises"
        component={TabExerciseNavigator}
        options={{
          tabBarColor: 'green',
          tabBarLabel: i18n.t('tab.exercises'),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-list" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Find"
        component={TabFindExerciseNavigator}
        options={{
          tabBarColor: 'red',
          tabBarLabel: i18n.t('tab.find'),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-cloudy" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabSettingsNavigator}
        options={{
          tabBarColor: 'blue',
          tabBarLabel: i18n.t('tab.settings'),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-settings" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Debug"
        component={DebugNavigator}
        options={{
          tabBarColor: 'gray',
          tabBarLabel: 'Debug',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-gear" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}
