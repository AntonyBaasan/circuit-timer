import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import i18n from 'i18n-js';

import Colors from '../../constants/Colors';
import { ScreenNames } from '../../constants/Screen';
import useColorScheme from '../../hooks/useColorScheme';
import { TabExcerciseParamList } from '../../types';
import {
  ExerciseListScreen,
  ExercisePlayerScreen,
  ExerciseEditorScreen,
  ActionEditorScreen,
  ChooseCreateScreen,
  MarketplaceScreen,
  ExerciseDetailScreen,
} from '../../screens';

const TabExerciseStack = createStackNavigator<TabExcerciseParamList>();

export function TabExerciseNavigator() {
  const colorScheme = useColorScheme();
  return (
    <TabExerciseStack.Navigator
      screenOptions={{
        headerTintColor: Colors[colorScheme].tint, // color of the text (title) in the header
        headerStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
        headerTitleAlign: 'center',
      }}
    >
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
