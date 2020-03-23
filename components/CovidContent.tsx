import React from 'react';
import { ByCountryResponse, TotalResponse } from 'api';
import { Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemeColors } from './Themes';

export type ContentProps = {
  covidData?: ByCountryResponse | TotalResponse;
}

function renderCovidData(covidData: ByCountryResponse | TotalResponse) {
  switch (covidData.type) {
    case 'country':
      return (
        <>
          <Text style={styles.textContainer}>
            <Text style={styles.bold}>Country: </Text>
            {covidData.country}
          </Text>
          <Text style={styles.textContainer}>
            <Text style={styles.bold}>All Cases: </Text>
            {covidData.cases}
          </Text>
          <Text style={styles.textContainer}>
            <Text style={styles.bold}>New Cases: </Text>
            {covidData.todayCases}
          </Text>
          <Text style={styles.textContainer}>
            <Text style={styles.bold}>Active Cases: </Text>
            {covidData.active}
          </Text>
          <Text style={styles.textContainer}>
            <Text style={styles.bold}>Recoveries: </Text>
            {covidData.recovered}
          </Text>
          <Text style={styles.textContainer}>
            <Text style={styles.bold}>All Deaths: </Text>
            {covidData.deaths}
          </Text>
          <Text style={styles.textContainer}>
            <Text style={styles.bold}>New Deaths: </Text>
            {covidData.todayDeaths}
          </Text>
          <Text style={styles.textContainer}>
            <Text style={styles.bold}>Critical Cases: </Text>
            {covidData.critical}
          </Text>
        </>
      );
    case 'total':
      return (
        <>
          <Text style={styles.textContainer}>
            <Text style={styles.bold}>Total Cases: </Text>
            {covidData.cases}
          </Text>
          <Text style={styles.textContainer}>
            <Text style={styles.bold}>Total Deaths: </Text>
            {covidData.deaths}
          </Text>
          <Text style={styles.textContainer}>
            <Text style={styles.bold}>Total Recoveries: </Text>
            {covidData.recovered}
          </Text>
          <Text style={styles.textContainer}>
            <Text style={styles.bold}>Last Updated: </Text>
            {new Date(covidData.updated).toLocaleDateString()}
          </Text>
        </>
      );
  }
}

export const CovidContent = (props: ContentProps) => {
  const { covidData } = props;

  if (covidData) {
    return renderCovidData(covidData);
  }
  return <ActivityIndicator size="large" color={ThemeColors.COVID} />;
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 10
  },
  bold: {
    fontWeight: '700'
  }
});