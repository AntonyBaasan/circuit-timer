import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { View } from '../../components/Themed';

type ControlButtonProps = {
  iconName: string;
  size: number;
  onPress: () => void;
};

function ControlButton(props: ControlButtonProps) {
  const { iconName, size } = props;

  return (
    <View style={styles.container}>
      <Ionicons
        name={iconName} 
        style={styles.icon}
        size={size}
        onPress={props.onPress}
      />
    </View>
  );
}

export default ControlButton;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: 'black',
    margin: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
  },
});
