import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Tooltip } from 'react-native-elements';
import { ExerciseTask } from '../../models/ExerciseTask';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const tooltipWidth = 200;
const tooltipHeight = 170;

type TooltipMenuProps = {
  items: any[];
  onOpen: () => void;
  onClose: () => void;
  children: any;
};

function TooltipMenu(props: TooltipMenuProps) {
  const { items, onOpen, onClose } = props;
  const [visibleTasks, setVisibleTasks] = useState<ExerciseTask[]>([]);

  useEffect(() => {}, [items]);

  const renderMenu = () => {
    return (
      <View style={styles.tooltipContent}>
        <TouchableOpacity
          style={styles.buttonContainerStyle}
          onPress={clickDetail}
        >
          {/* <Ionicons
            style={styles.buttonIcon}
            name="ellipsis-vertical-circle"
            size={26}
            color="black"
          /> */}
          <Text style={styles.buttonTitle}>{i18n.t('more')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainerStyle}
          onPress={clickStart}
        >
          {/* <Ionicons
            style={styles.buttonIcon}
            name="ellipsis-vertical-circle"
            size={26}
            color="black"
          /> */}
          <Text style={styles.buttonTitle}>{i18n.t('start')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainerStyle}
          onPress={clickDelete}
        >
          {/* <Ionicons
            style={styles.buttonIcon}
            name="ellipsis-vertical-circle"
            size={26}
            color="black"
          /> */}
          <Text style={styles.buttonTitle}>{i18n.t('delete')}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Tooltip
      ref={refTooltip}
      height={tooltipHeight}
      width={tooltipWidth}
      popover={renderMenu()}
      containerStyle={styles.tooltipContainer}
      onOpen={onOpen}
      onClose={onClose}
    >
      {props.children}
    </Tooltip>
  );
}

export default TooltipMenu;

const styles = StyleSheet.create({
  card: {
    width: screenWidth - 20,
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
  buttonContainerStyle: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingLeft: 10,
  },
  buttonIcon: {
    paddingHorizontal: 20,
  },
  buttonTitle: {
    fontSize: 20,
  },
  buttonStyle: {
    backgroundColor: 'grey',
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
