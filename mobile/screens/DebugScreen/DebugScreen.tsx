import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as DebugDB from '../../helpers/db/debug';
import { ThemeProvider, Button, Text } from 'react-native-elements';
import { DevVersion } from '../../constants/Version';

import { mainTheme } from '../../constants/theme/Main';

type Props = { navigation: any };

function DebugScreen(props: Props) {
  function showProps() {
    console.log(props);
  }

  function removeAllTables() {
    DebugDB.dropAllTable();
  }

  function insertTestWorkouts() {
    DebugDB.insertTestWorkouts();
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <Text>Basic</Text>
        <Button
          containerStyle={styles.button}
          title="Console Props"
          onPress={showProps}
        />

        <Text>Database:</Text>
        <Button
          containerStyle={styles.button}
          title="Remove All Tables"
          onPress={removeAllTables}
        />
        <Button
          containerStyle={styles.button}
          title="Insert Test Workouts"
          onPress={insertTestWorkouts}
        />
        <Text>DevVersion: {DevVersion}</Text>
      </View>
    </ThemeProvider>
  );
}

export default DebugScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginBottom: 5,
  },
});
