/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, TextInput, KeyboardAvoidingView, RefreshControl } from 'react-native';
import { Header } from './Header';
import { ColoredStatusBar } from './ColoredStatusBar';
import { ThemeColors } from './Themes';
import { coronaApi, CovidResponse } from '../api';
import { CovidContent } from './CovidContent';
import { States } from '../us-states';

export type AppState = {
  covidData?: CovidResponse,
  search: string,
  refreshing: boolean
}

export class App extends React.Component<{}, AppState> {
  state: AppState = { search: '', refreshing: false };

  componentDidMount() {
    coronaApi.getAllCases().then((covidData) => this.setState({ covidData }));
  }


  onChange = async (search: string) => {
    if (search === '') {
      this.setState({ covidData: undefined });
      const covidData = await coronaApi.getAllCases();
      this.setState({ covidData });
    }
    this.setState({ search });
  }

  onSearch = async () => {
    const search = this.state.search.toLowerCase().trim();
    let covidData: CovidResponse;
    if (States[search]) {
      covidData = await coronaApi.getCasesByState(search);
    } else if (search === '') {
      covidData = await coronaApi.getAllCases();
    } else {
      covidData = await coronaApi.getCasesByCountry(search);
    }
    this.setState({ covidData });
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.onSearch();
    this.setState({ refreshing: false });
  }

  render() {
    const { covidData } = this.state;
    return (
      <>
      	<ColoredStatusBar backgroundColor={ThemeColors.COVID} />
        <SafeAreaView >
          <KeyboardAvoidingView behavior="padding">
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
              refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} tintColor={ThemeColors.LIGHT} />}
            >
              <View style={styles.body}>
                <Header />
                <View style={styles.searchContainer}>
                  <TextInput
                    placeholderTextColor={ThemeColors.PLACEHOLDER_TEXT}
                    placeholder="Search country..."
                    style={styles.search}
                    onChangeText={this.onChange}
                    onSubmitEditing={this.onSearch}
                    returnKeyType="search"
                  />
                </View>
                <View style={styles.container}>
                  <CovidContent covidData={covidData} />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: ThemeColors.COVID
  },
  body: {
    backgroundColor: ThemeColors.LIGHTER
  },
  container: {
    margin: 50,
    marginTop: 30
  },
  searchContainer: {
    margin: 50,
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  search: {
    borderWidth: 1,
    borderColor: ThemeColors.COVID,
    padding: 10,
    borderRadius: 50,
    color: 'black',
    width: '100%'
  }
});
