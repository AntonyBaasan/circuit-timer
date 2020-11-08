import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import en from './constants/langulages/en';
import ru from './constants/langulages/ru';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { enableScreens } from 'react-native-screens';

i18n.translations = { en, ru };
i18n.locale = Localization.locale;
i18n.fallbacks = true; // fallbacks to eng language

// enables package: https://github.com/software-mansion/react-native-screens
enableScreens();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
}
