import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import i18n from 'i18n-js';

import { ScreenNames } from '../../constants/Screen';
import { DebugParamList } from '../../types';
import DebugScreen from '../../screens/DebugScreen/DebugScreen';

const DebugStack = createStackNavigator<DebugParamList>();

export function DebugNavigator() {
  return (
    <DebugStack.Navigator>
      <DebugStack.Screen
        name={ScreenNames.DebugScreen}
        component={DebugScreen}
        options={{ headerTitle: 'Debug' }}
      />
    </DebugStack.Navigator>
  );
}
