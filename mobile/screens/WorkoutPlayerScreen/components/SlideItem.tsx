import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';
import { Exercise } from '../../../models/Exercise';

type SlideItemProps = { exercise: Exercise };

function SlideItem(props: SlideItemProps) {
  const { exercise } = props;
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Text>{exercise.title}</Text>
      </View>
      <View style={styles.metadata}>
        <Text>{exercise.title}</Text>
      </View>
    </View>
  );
}

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 350,
    width: 250,
    backgroundColor: 'grey',
    marginLeft: 5,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  image: {
    backgroundColor: 'red',
  },
  metadata: {
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});
