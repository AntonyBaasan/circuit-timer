import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';
import { mainTheme } from '../../constants/theme/Main';

type MarketplaceScreenProps = { navigation: any };

function MarketplaceScreen(props: MarketplaceScreenProps) {
  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <Text>Marketplace</Text>
      </View>
    </ThemeProvider>
  );
}

export default MarketplaceScreen;

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
