import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ScreenNames } from "../../constants/Screen";
import { View } from "../../components/Themed";
import { ThemeProvider, Button, Icon, Text } from "react-native-elements";
import { mainTheme } from "../../constants/theme/Main";

type ExerciseEditorScreenProps = { navigation: any };

function ExerciseEditorScreen(props: ExerciseEditorScreenProps) {
  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate(ScreenNames.ActionEditorScreen);
          }}
        >
          <Icon size={45} name="create" type="evilicons" />
          <Text style={styles.text}>Go to Action Editor</Text>
        </TouchableOpacity>
      </View>
    </ThemeProvider>
  );
}

export default ExerciseEditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    textAlign: "center",
    fontSize: 25,
  },
});
