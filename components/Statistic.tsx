import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatNumberWithCommas, calculatePercent } from '../utils';
import { ThemeColors } from './Themes';

export type StatisticType = 'cases' | 'recovered' | 'deaths';

export type StatisticProps = {
  type: StatisticType,
  pop: number,
  cases: number,
  recovered: number,
  deaths: number
}

const ThemeType: Record<StatisticType, ThemeColors> = {
  'cases': ThemeColors.CASES,
  'recovered': ThemeColors.RECOVERY,
  'deaths': ThemeColors.DEATHS
};

function renderStatistics(props: StatisticProps) {
  switch (props.type) {
    case 'cases':
      return `${calculatePercent(props.pop, props.cases)}% of Population`;
    case 'recovered':
      return `${calculatePercent(props.cases, props.recovered)}% Recovery Rate`;
    case 'deaths':
      return `${calculatePercent(props.cases, props.deaths)}% Fatality Rate`;
  }
}

export const Statistic = (props: StatisticProps) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{props.type}</Text>
      <Text style={[styles.info, { color: props.type === 'cases' ? 'black' : ThemeType[props.type] }]}>
        {formatNumberWithCommas(props[props.type])}
      </Text>
      <View style={[styles.statisticsContainer, { backgroundColor: ThemeType[props.type] }]}>
        <Text style={styles.caseStatistics}>{renderStatistics(props)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginBottom: 50
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    textTransform: 'uppercase'
  },
  info: {
    fontSize: 46,
    fontWeight: '700',
    marginBottom: 5,
    alignSelf: 'center'
  },
  statisticsContainer: {
    padding: 3,
    borderRadius: 15,
    alignItems: 'center'
  },
  caseStatistics: {
    color: 'white',
    fontWeight: '700',
    textTransform: 'uppercase'
  }
});