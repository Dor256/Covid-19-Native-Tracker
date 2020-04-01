import React from 'react';
import { Text, ActivityIndicator, StyleSheet, Image, View } from 'react-native';
import { ThemeColors } from './Themes';
import { Statistic } from './Statistic';
import { CovidResponse } from '../api';

export type ContentProps = {
  covidData?: CovidResponse;
}

function renderCovidData(covidData: CovidResponse) {
  switch (covidData.type) {
    case 'country':
      return (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{covidData.country}</Text>
            <Image style={styles.flag} source={{ uri: covidData.countryInfo.flag }} />
          </View>
          <Statistic type="cases" cases={covidData.cases} recovered={covidData.recovered} deaths={covidData.deaths} pop={covidData.population} />
          <Statistic type="recovered" cases={covidData.cases} recovered={covidData.recovered} deaths={covidData.deaths} pop={covidData.population} />
          <Statistic type="deaths" cases={covidData.cases} recovered={covidData.recovered} deaths={covidData.deaths} pop={covidData.population} />
          <Text style={styles.titleContainer}>
            <Text style={styles.bold}>Last Updated: </Text>
            {new Date(covidData.updated).toLocaleString()}
          </Text>
        </>
      );
    case 'global':
      return (
        <>
          <Text style={styles.titleContainer}>
            <Text style={styles.title}>Global</Text>
          </Text>
          <Statistic type="cases" cases={covidData.cases} recovered={covidData.recovered} deaths={covidData.deaths} pop={covidData.population} />
          <Statistic type="recovered" cases={covidData.cases} recovered={covidData.recovered} deaths={covidData.deaths} pop={covidData.population} />
          <Statistic type="deaths" cases={covidData.cases} recovered={covidData.recovered} deaths={covidData.deaths} pop={covidData.population} />
          <Text style={styles.titleContainer}>
            <Text style={styles.bold}>Last Updated: </Text>
            {new Date(covidData.updated).toLocaleString()}
          </Text>
        </>
      );
    case 'state':
      return (
        <>
          <Text style={styles.titleContainer}>
          <Text style={styles.title}>{covidData.state}</Text>
          </Text>
          <Statistic usa type="cases" cases={covidData.cases} recovered={0} deaths={covidData.deaths} pop={covidData.population} />
          <Statistic usa type="deaths" cases={covidData.cases} recovered={0} deaths={covidData.deaths} pop={covidData.population} />
        </>
      );
    case 'error':
      return <Text style={styles.error}>Country Not Found</Text>;
    default:
      return null;
  }
}

export const CovidContent = (props: ContentProps) => {
  const { covidData } = props;

  if (covidData) {
    return renderCovidData(covidData);
  }
  return <ActivityIndicator style={styles.loader} size="large" color={ThemeColors.COVID} />;
};

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 30,
    flexDirection: 'row'
  },
  bold: {
    fontWeight: '700'
  },
  title: {
    fontSize: 30,
    fontWeight: '700'
  },
  flag: {
    width: 30,
    height: 20,
    marginLeft: 15,
    marginTop: 10
  },
  loader: {
    marginBottom: 50
  },
  error: {
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 50
  }
});