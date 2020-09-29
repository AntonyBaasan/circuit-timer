import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { View } from '../../components/Themed';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';
import { mainTheme } from '../../constants/theme/Main';
import { Exercise } from '../../models/exercise';

type ExerciseDetailScreenProps = { navigation: any; exercise: Exercise };

function ExerciseDetailScreen(props: ExerciseDetailScreenProps) {
  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <Text>Exercise Detail</Text>
      </View>
    </ThemeProvider>
  );
}

export default ExerciseDetailScreen;

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
