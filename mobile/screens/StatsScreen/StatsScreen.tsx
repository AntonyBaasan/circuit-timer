import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';
import { mainTheme } from '../../constants/theme/Main';

type StatsScreenProps = { navigation: any };

function StatsScreen(props: StatsScreenProps) {
  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <Text>Stats</Text>
      </View>
    </ThemeProvider>
  );
}

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
});
