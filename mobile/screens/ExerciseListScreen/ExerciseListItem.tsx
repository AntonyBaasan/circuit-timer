import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, Icon, Text } from 'react-native-elements';
import i18n from 'i18n-js';

import { ScreenNames } from '../../constants/Screen';
import { View } from '../../components/Themed';
import { Exercise } from '../../models/exercise';

type ExerciseListItemProps = {
  navigation: any;
  item: Exercise;
};

function ExerciseListItem(props: ExerciseListItemProps) {
  function onExerciseDetailScreen() {
    props.navigation.navigate(ScreenNames.ExerciseDetailScreen, {
      exerciseId: props.item.id,
    });
  }

  function onExercisePlayerScreen() {
    props.navigation.navigate(ScreenNames.ExercisePlayerScreen, {
      exerciseId: props.item.id,
    });
  }

  return (
    <TouchableOpacity onPress={onExerciseDetailScreen}>
      <Card>
        <Card.Title style={styles.title} numberOfLines={1}>
          {props.item.title}
        </Card.Title>
        <Card.Divider />
        <Text style={styles.description}>{props.item.description}</Text>
        <Card.Divider />
        <View style={styles.buttonRow}>
          <Button
            icon={
              <Icon
                name="play-circle-outline"
                color="#ffffff"
                type="evilicons"
              />
            }
            buttonStyle={styles.buttonStyle}
            title={i18n.t('start')}
            onPress={onExercisePlayerScreen}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default ExerciseListItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: 'roboto-mono-bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'roboto-mono',
  },
  buttonRow: {
    flexDirection: 'row-reverse',
  },
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 5,
    marginRight: 0,
    marginBottom: 0,
  },
});
