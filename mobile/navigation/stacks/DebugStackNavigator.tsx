import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { ScreenNames } from '../../constants/Screen';
import { DebugParamList } from '../../types';
import DebugScreen from '../../screens/DebugScreen/DebugScreen';
import createDefaultScreenOptions from './ScreenOptions';
import useColorScheme from '../../hooks/useColorScheme';

const DebugStack = createStackNavigator<DebugParamList>();

export function DebugNavigator({ navigation }) {
  const colorScheme = useColorScheme();
  
  const screenOptions = createDefaultScreenOptions(
    'Debug',
    colorScheme,
    navigation
  );
  return (
    <DebugStack.Navigator>
      <DebugStack.Screen
        name={ScreenNames.DebugScreen}
        component={DebugScreen}
        options={screenOptions}
      />
    </DebugStack.Navigator>
  );
}
