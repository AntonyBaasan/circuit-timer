import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { Button, Card, Icon, Text } from 'react-native-elements';
import i18n from 'i18n-js';

import { View } from '../../components/Themed';
import usePlatformInfo from '../../hooks/usePlatformInfo';
import { Workout } from '../../models/Workout';

type WorkoutListItemProps = {
  item: Workout;
  clickStart: () => void;
  clickDetails: () => void;
  delete: () => void;
};

function WorkoutListItem(props: WorkoutListItemProps) {
  const { isAndroid21 } = usePlatformInfo();
  React.useState();

  let TouchableCmp: any = TouchableOpacity;
  if (isAndroid21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp onPress={props.clickDetails}>
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
            onPress={props.clickStart}
          />
          <Button
            icon={
              <Icon
                name="play-circle-outline"
                color="#ffffff"
                type="evilicons"
              />
            }
            buttonStyle={styles.buttonStyle}
            title={i18n.t('delete')}
            onPress={props.delete}
          />
        </View>
      </Card>
    </TouchableCmp>
  );
}

export default WorkoutListItem;

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
    backgroundColor: 'white',
  },
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 5,
    marginRight: 0,
    marginBottom: 0,
  },
});
