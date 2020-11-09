import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import i18n from 'i18n-js';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList } from '../types';
import { FindExerciseNavigator } from './stacks/FindExerciseStackNavigator';
import { ExerciseNavigator } from './stacks/ExerciseStackNavigator';

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Exercises"
      shifting={true}
    >
      <BottomTab.Screen
        name="Exercises"
        component={ExerciseNavigator}
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
        component={FindExerciseNavigator}
        options={{
          tabBarColor: 'gray',
          tabBarLabel: i18n.t('tab.find'),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-cloudy" color={color} />
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
