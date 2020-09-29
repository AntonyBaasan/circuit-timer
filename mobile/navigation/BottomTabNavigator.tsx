import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import i18n from 'i18n-js';

import Colors from '../constants/Colors';
import { ScreenNames } from '../constants/Screen';
import useColorScheme from '../hooks/useColorScheme';
import {
  BottomTabParamList,
  TabExcerciseParamList,
  TabFindParamList,
  TabSettingsParamList,
} from '../types';
import {
  ExerciseListScreen,
  ExercisePlayerScreen,
  ExerciseEditorScreen,
  ActionEditorScreen,
  ChooseCreateScreen,
  MarketplaceScreen,
  SettingsScreen,
  ExerciseDetailScreen,
} from '../screens';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Exercises"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
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
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabFindStack = createStackNavigator<TabFindParamList>();

function TabFindExerciseNavigator() {
  return (
    <TabFindStack.Navigator>
      <TabFindStack.Screen
        name={ScreenNames.MarketplaceScreen}
        component={MarketplaceScreen}
        options={{ headerTitle: 'Find' }}
      />
    </TabFindStack.Navigator>
  );
}

const TabExerciseStack = createStackNavigator<TabExcerciseParamList>();

function TabExerciseNavigator() {
  return (
    <TabExerciseStack.Navigator>
      <TabExerciseStack.Screen
        name={ScreenNames.ExerciseListScreen}
        component={ExerciseListScreen}
        options={{ headerTitle: 'Exercise List' }}
      />
      <TabExerciseStack.Screen
        name={ScreenNames.ChooseCreateScreen}
        component={ChooseCreateScreen}
        options={{ headerTitle: 'Create' }}
      />
      <TabExerciseStack.Screen
        name={ScreenNames.ExercisePlayerScreen}
        component={ExercisePlayerScreen}
        options={{ headerTitle: 'Exercise' }}
      />
      <TabExerciseStack.Screen
        name={ScreenNames.ExerciseEditorScreen}
        component={ExerciseEditorScreen}
        options={{ headerTitle: 'Exercise Editor' }}
      />
      <TabExerciseStack.Screen
        name={ScreenNames.ActionEditorScreen}
        component={ActionEditorScreen}
        options={{ headerTitle: 'Action Editor' }}
      />
      <TabExerciseStack.Screen
        name={ScreenNames.MarketplaceScreen}
        component={MarketplaceScreen}
        options={{ headerTitle: 'Find exercise' }}
      />
      <TabExerciseStack.Screen
        name={ScreenNames.ExerciseDetailScreen}
        component={ExerciseDetailScreen}
        options={{ headerTitle: 'Exercise' }}
      />
    </TabExerciseStack.Navigator>
  );
}

const TabSettingsStack = createStackNavigator<TabSettingsParamList>();

function TabSettingsNavigator() {
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
