import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as InitDB from '../../helpers/db/initialize';
import * as DebugDB from '../../helpers/db/debug';
import { ThemeProvider, Button, Text } from 'react-native-elements';
import { DevVersion } from '../../constants/Version';

import { mainTheme } from '../../constants/theme/Main';

type Props = { navigation: any };

function DebugScreen2(props: Props) {
  

  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <Text>Debug Screen 2</Text>
      </View>
    </ThemeProvider>
  );
}

export default DebugScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginBottom: 5,
  },
});
