import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, CheckBox } from 'react-native-elements';

import { View } from '../../components/Themed';
import { Exercise } from '../../models/Exercise';

type ActionEditorScreenProps = {
  navigation: any;
  route: { params: { exercise?: Exercise } };
};

function ActionEditorScreen(props: ActionEditorScreenProps) {
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

export default ActionEditorScreen;

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
