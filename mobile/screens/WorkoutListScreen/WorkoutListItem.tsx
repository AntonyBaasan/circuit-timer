import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import { Button, Card, Icon, Text } from 'react-native-elements';
import i18n from 'i18n-js';
import { View } from '../../components/Themed';
import usePlatformInfo from '../../hooks/usePlatformInfo';
import { Workout } from '../../models/Workout';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

type WorkoutListItemProps = {
  item: Workout;
  start: () => void;
  details: () => void;
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
    <TouchableCmp accessibilityLabel="workout item" onPress={props.details}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title} numberOfLines={1}>
          {props.item.title}
        </Card.Title>
        <Card.Divider />
        <Text style={styles.description}>{props.item.description}</Text>
        <Card.Divider />
        <View style={styles.buttonRow}>
          <Button
            accessibilityLabel="play button"
            icon={
              <Icon
                name="play-circle-outline"
                color="#ffffff"
                type="evilicons"
              />
            }
            containerStyle={styles.buttonStyle}
            title={i18n.t('start')}
            onPress={props.start}
          />
          <Button
            accessibilityLabel="delete button"
            icon={
              <Icon
                name="play-circle-outline"
                color="#ffffff"
                type="evilicons"
              />
            }
            containerStyle={styles.buttonStyle}
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
  card: {
    width: width-20,
    borderRadius: 15,
    margin: 10,
  },
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
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 0,
    marginBottom: 0,
  },
});
