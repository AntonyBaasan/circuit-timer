import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeProvider, Text, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { defaultStatView } from '../../constants/DefaultValues';
import { mainTheme } from '../../constants/theme/Main';
import { calculateStatView } from '../../helpers/StatUtility';
import { StatView } from '../../models/Stat';
import { RootState } from '../../store/models';
import { loadStatBetween } from '../../store/stat/actions';

type StatsScreenProps = { navigation: any };

function StatsScreen(props: StatsScreenProps) {
  const [showDebug, setShowDebug] = React.useState<boolean>(false);
  const [statView, setStatView] = React.useState<StatView>(defaultStatView);
  const dispatch = useDispatch();
  const currentStat = useSelector((state: RootState) => state.stat.daily);
  useEffect(() => {
    // const today = getFormattedDate(new Date());
    // dispatch(loadStatBetween(today, today));
    dispatch(loadStatBetween());
  }, []);
  useEffect(() => {
    const stat = calculateStatView(currentStat);
    setStatView(stat);
  }, [currentStat]);

  const getFormattedDate = (date: Date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.row, styles.xp]}>XP: {statView.xp}</Text>
          <Text style={[styles.row, styles.workout]}>
            Workouts: {statView.workout}
          </Text>
          <Text style={[styles.row, styles.exercise]}>
            Exercises: {statView.exercise}
          </Text>
        </View>
        <Button title="show debug" onPress={() => setShowDebug(!showDebug)} />
        {showDebug && <Text>{JSON.stringify(currentStat, null, 2)}</Text>}
      </View>
    </ThemeProvider>
  );
}

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    margin: 10,
    // justifyContent: 'center',
    textAlign: 'center',
  },
  xp: {
    fontSize: 45,
  },
  workout: {
    fontSize: 35,
  },
  exercise: {
    fontSize: 25,
  },
});
