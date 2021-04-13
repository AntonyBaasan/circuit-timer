import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import { Button, Card, Text, Tooltip } from 'react-native-elements';
import i18n, { l } from 'i18n-js';
import { Ionicons } from '@expo/vector-icons';
import { View } from '../../components/Themed';
import usePlatformInfo from '../../hooks/usePlatformInfo';
import { Workout } from '../../models/Workout';
import { sharedStyles } from '../../constants/sharedStyles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const tooltipWidth = 200;
const tooltipHeight = 170;

type WorkoutListItemProps = {
  item: Workout;
  start: () => void;
  details: () => void;
  delete: () => void;
};

function WorkoutListItem(props: WorkoutListItemProps) {
  const { isAndroid21 } = usePlatformInfo();
  const refTooltip = useRef<Tooltip>(null);
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    return () => {};
  });

  let TouchableCmp: any = TouchableOpacity;
  if (isAndroid21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const closeTooltip = () => {
    if (refTooltip.current && isTooltipOpen) {
      refTooltip.current.toggleTooltip();
    }
  };
  const clickStart = () => {
    closeTooltip();
    props.start();
  };
  const clickDelete = () => {
    closeTooltip();
    props.start();
  };
  const clickDetail = () => {
    closeTooltip();
    props.details();
  };

  const renderMenu = () => {
    return (
      <View style={styles.tooltipContent}>
        <Button
          type="clear"
          accessibilityLabel="more button"
          // icon={
          //   <Ionicons name="ellipsis-vertical-circle" size={24} color="black" />
          // }
          containerStyle={styles.buttonStyle}
          title={i18n.t('more')}
          onPress={clickDetail}
        />
        <Button
          type="clear"
          accessibilityLabel="play button"
          // icon={
          //   <Icon name="play-circle-outline" color="#ffffff" type="evilicons" />
          // }
          containerStyle={styles.buttonStyle}
          title={i18n.t('start')}
          onPress={clickStart}
        />
        <Button
          type="clear"
          accessibilityLabel="delete button"
          // icon={
          //   <Icon
          //     name="remove-circle-outline"
          //     color="#ffffff"
          //     type="evilicons"
          //   />
          // }
          containerStyle={styles.buttonStyle}
          title={i18n.t('delete')}
          onPress={clickDelete}
        />
      </View>
    );
  };
  const renderTooltip = () => {
    return (
      <Tooltip
        ref={refTooltip}
        height={tooltipHeight}
        width={tooltipWidth}
        popover={renderMenu()}
        containerStyle={styles.tooltipContainer}
        onOpen={() => {
          setTooltipOpen(true);
        }}
        onClose={() => {
          setTooltipOpen(false);
        }}
      >
        <Ionicons
          style={styles.tooltipButton}
          name="ios-settings"
          size={32}
          color="black"
        />
      </Tooltip>
    );
  };

  return (
    <TouchableCmp accessibilityLabel="workout item" onPress={clickStart}>
      <Card containerStyle={[styles.card, sharedStyles.basicShadow]}>
        <Card.Title style={styles.title} numberOfLines={0}>
          {props.item.title}
        </Card.Title>
        <Card.Divider />
        <Text style={styles.description}>{props.item.description}</Text>
        <Card.Divider />
        <View style={styles.buttonRow}>{renderTooltip()}</View>
      </Card>
    </TouchableCmp>
  );
}

export default WorkoutListItem;

const styles = StyleSheet.create({
  card: {
    width: width - 20,
    borderRadius: 15,
    margin: 10,
  },
  cardTitle: {
    backgroundColor: 'green',
    alignItems: 'stretch',
  },
  title: {
    display: 'flex',
    fontSize: 22,
    fontFamily: 'roboto-mono-bold',
    flexDirection: 'row',
    justifyContent: 'center',
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
    marginRight: 0,
    marginBottom: 0,
  },
  tooltipContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#617080',
  },
  tooltipContent: {
    flex: 1,
    width: tooltipWidth - 10,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  tooltipButton: {
    // backgroundColor: 'green',
    // height: 25,
    width: 40,
    paddingLeft: 8,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
