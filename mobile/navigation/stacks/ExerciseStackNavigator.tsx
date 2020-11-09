import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import i18n from 'i18n-js';

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
import createDefaultScreenOptions from './ScreenOptions';

const ExerciseStack = createStackNavigator<TabExcerciseParamList>();

export function ExerciseNavigator({ navigation }) {
  const colorScheme = useColorScheme();
  const toggleDrawer = () => navigation.toggleDrawer();
  const screenOptions = createDefaultScreenOptions(
    '',
    colorScheme,
    toggleDrawer
  );

  return (
    <ExerciseStack.Navigator screenOptions={screenOptions}>
      <ExerciseStack.Screen
        name={ScreenNames.ExerciseListScreen}
        component={ExerciseListScreen}
        options={{
          headerTitle: 'Exercise List',
        }}
      />
      <ExerciseStack.Screen
        name={ScreenNames.ChooseCreateScreen}
        component={ChooseCreateScreen}
        options={{ headerTitle: 'Create' }}
      />
      <ExerciseStack.Screen
        name={ScreenNames.ExercisePlayerScreen}
        component={ExercisePlayerScreen}
        options={{ headerTitle: 'Exercise' }}
      />
      <ExerciseStack.Screen
        name={ScreenNames.ExerciseEditorScreen}
        component={ExerciseEditorScreen}
        options={{ headerTitle: 'Exercise Editor' }}
      />
      <ExerciseStack.Screen
        name={ScreenNames.ActionEditorScreen}
        component={ActionEditorScreen}
        options={{ headerTitle: 'Action Editor' }}
      />
      <ExerciseStack.Screen
        name={ScreenNames.MarketplaceScreen}
        component={MarketplaceScreen}
        options={{ headerTitle: 'Find exercise' }}
      />
      <ExerciseStack.Screen
        name={ScreenNames.ExerciseDetailScreen}
        component={ExerciseDetailScreen}
        options={{ headerTitle: 'Exercise' }}
      />
    </ExerciseStack.Navigator>
  );
}
