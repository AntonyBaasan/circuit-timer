import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemeProvider, Button, Icon, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { mainTheme } from '../../constants/theme/Main';
import { RootState } from '../../store/models';
import { loadStatBetween } from '../../store/stat/actions';

type StatsScreenProps = { navigation: any };

function StatsScreen(props: StatsScreenProps) {
  const dispatch = useDispatch();
  const dailyStat = useSelector((state: RootState) => state.stat.daily);
  useEffect(() => {
    // const today = getFormattedDate(new Date());
    // dispatch(loadStatBetween(today, today));
    dispatch(loadStatBetween());
  }, []);

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
        <Text>{JSON.stringify(dailyStat, null, 2)}</Text>
      </View>
    </ThemeProvider>
  );
}

export default StatsScreen;

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
