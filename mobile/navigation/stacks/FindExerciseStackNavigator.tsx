import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { ScreenNames } from '../../constants/Screen';
import useColorScheme from '../../hooks/useColorScheme';
import { MarketplaceScreen } from '../../screens';
import { TabFindParamList } from '../../types';

const TabFindStack = createStackNavigator<TabFindParamList>();

export function TabFindExerciseNavigator() {
  const colorScheme = useColorScheme();

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

