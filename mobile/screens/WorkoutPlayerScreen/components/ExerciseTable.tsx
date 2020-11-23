import React, {useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';

import { mainTheme } from '../../../constants/theme/Main';

type ExerciseTableProps = { navigation: any };

function ExerciseTable(props: ExerciseTableProps) {

  useEffect(()=>{

  });

  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <Text>ExerciseTable screen</Text>
      </View>
    </ThemeProvider>
  );
}

export default ExerciseTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});