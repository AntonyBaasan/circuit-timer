import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import {
  ExcerciseTaskStatus,
  ExerciseTask,
} from '../../../models/ExerciseTask';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

type TableRowProps = {
  task: ExerciseTask;
  rowIndex: number;
};

function TableRow({ task, rowIndex }: TableRowProps) {
  const renderRowStatus = () => {
    if (task.status === ExcerciseTaskStatus.Skipped) {
      return <Text>(skipped)</Text>;
    }
    if (task.status === ExcerciseTaskStatus.Done) {
      return <Text>(done)</Text>;
    }
    if (task.status === ExcerciseTaskStatus.InProgress) {
      return <Text>(*)</Text>;
    }
  };
  return (
    <View style={styles.row}>
      {renderRowStatus()}
      <Text style={styles.rowText}>{task.title}</Text>
    </View>
  );
}

type ExerciseTableProps = {
  tasks: ExerciseTask[];
  currentTaskIndex: number;
  close: () => void;
};

function ExerciseTaskTable(props: ExerciseTableProps) {
  const { tasks, close, currentTaskIndex } = props;
  const [visibleTasks, setVisibleTasks] = useState<ExerciseTask[]>([]);

  useEffect(() => {
    setVisibleTasks(tasks.filter((t) => !t.isRest));
  }, [tasks]);

  const itemRender = ({
    item,
    index,
  }: {
    item: ExerciseTask;
    index: number;
  }) => {
    return <TableRow task={item} rowIndex={index} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Tasks</Text>
      </View>
      <FlatList
        data={visibleTasks}
        renderItem={itemRender}
        keyExtractor={(item) => item.id}
      />
      <Button onPress={close} title="Close" />
    </View>
  );
}

export default ExerciseTaskTable;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: screenWidth - 50,
    height: screenHeight - 150,
  },
  title: {
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  titleText: {
    fontSize: 44,
  },
  row: {
    // flexGrow: 1,
    marginTop: 10,
    flexDirection: 'row',
  },
  rowText: {
    fontSize: 22,
  },
});
