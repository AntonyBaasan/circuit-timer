import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { mainTheme } from '../../constants/theme/Main';
import { RootState } from '../../store/models';

type StatsScreenProps = { navigation: any };

function StatsScreen(props: StatsScreenProps) {
  const dailyStat = useSelector((state: RootState) => state.stat.daily);

  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <Text>{JSON.stringify(dailyStat, null, 2)}</Text>
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
