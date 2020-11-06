import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';

import { View } from '../../components/Themed';
import { mainTheme } from '../../constants/theme/Main';

type Props = { navigation: any };

function DebugScreen(props: Props) {

  function showProps(){
    console.log(props);
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <Text>Debug screen</Text>
        <Button title="Console Props" onPress={showProps}/>
      </View>
    </ThemeProvider>
  );
}

export default DebugScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
