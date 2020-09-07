import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemeProvider, Button, Icon, Text } from "react-native-elements";

import { View } from "../../components/Themed";
import { mainTheme } from "../../constants/theme/Main";

type ActionEditorScreenProps = { navigation: any };

function ActionEditorScreen(props: ActionEditorScreenProps) {
  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
          <Text>Action editor</Text>
      </View>
    </ThemeProvider>
  );
}

export default ActionEditorScreen;

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
