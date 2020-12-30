import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, CheckBox } from 'react-native-elements';

import { Exercise } from '../../models/Exercise';

type ExerciseEditorScreenProps = {
  navigation: any;
  route: { params: { exercise?: Exercise } };
};

function ExerciseEditorScreen(props: ExerciseEditorScreenProps) {
  console.log(props.route);
  const { exercise } = props.route.params;

  const [isNew, setIsNew] = useState(exercise == null);

  useEffect(() => {
    setIsNew(exercise == null);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Action editor</Text>
      <Text>IsNew: {isNew ? 'true' : 'false'}</Text>
      <CheckBox title="Cardio" checked={true} />
      <CheckBox title="Repetition" checked={false} />
    </View>
  );
}

export default ExerciseEditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
});
