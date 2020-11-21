import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';

import { ScreenNames } from '../../constants/Screen';
import { View } from '../../components/Themed';
import { mainTheme } from '../../constants/theme/Main';

type WorkoutEditorScreenProps = { navigation: any };

function WorkoutDetailScreen(props: WorkoutEditorScreenProps) {
  function clickActionScreen() {
    props.navigation.navigate(ScreenNames.ActionEditorScreen);
  }
  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <TouchableOpacity onPress={clickActionScreen}>
          <Icon size={45} name="create" type="evilicons" />
          <Text style={styles.text}>Go to Action Editor</Text>
        </TouchableOpacity>
      </View>
    </ThemeProvider>
  );
}

export default WorkoutDetailScreen;

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
