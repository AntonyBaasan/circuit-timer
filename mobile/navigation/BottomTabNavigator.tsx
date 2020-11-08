import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from 'i18n-js';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList } from '../types';
import { TabFindExerciseNavigator } from './stacks/FindExerciseStackNavigator';
import { TabExerciseNavigator } from './stacks/ExerciseStackNavigator';
import { TabSettingsNavigator } from './stacks/settingsStackNavigator';
import { DebugNavigator } from './stacks/DebugStackNavigator';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Exercises"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tabTint,
      }}
    >
      <BottomTab.Screen
        name="Exercises"
        component={TabExerciseNavigator}
        options={{
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
          tabBarLabel: 'Debug',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-settings" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
