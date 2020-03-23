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
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputChangeEventData, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Header } from './Header';
import { ColoredStatusBar } from './ColoredStatusBar';
import { ThemeColors } from './Themes';
import { coronaApi, ByCountryResponse, TotalResponse } from '../api';
import { CovidContent } from './CovidContent';

declare var global: { HermesInternal: null | {} };

export type AppState = {
  covidData?: ByCountryResponse | TotalResponse,
  search: string
}

export class App extends React.Component<{}, AppState> {
  state: AppState = { search: '' };

  componentDidMount() {
    coronaApi.getAllCases().then((covidData) => this.setState({ covidData }));
  }

  handleChange = async (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const { covidData } = this.state;
    const search = event.nativeEvent.text;
    if (covidData && search === '') {
      const allCases = await coronaApi.getAllCases();
      this.setState({ covidData: allCases });
    }
    this.setState({ search });
  }

  handleSearch = async () => {
    const { search } = this.state;
    this.setState({ covidData: undefined });
    const covidData = search === '' ? await coronaApi.getAllCases() : await coronaApi.getCasesByCountry(search);
    this.setState({ covidData });
    Keyboard.dismiss();
  }

  render() {
    const { covidData } = this.state;
    return (
      <>
      	<ColoredStatusBar backgroundColor={ThemeColors.COVID} />
        <SafeAreaView >
          <KeyboardAvoidingView behavior="position">
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
            >
              <View style={styles.body}>
                <Header />
                <View style={styles.container}>
                  <CovidContent covidData={covidData} />
                  <TextInput placeholder="Search country..." style={styles.search} onChange={this.handleChange} />
                  <TouchableOpacity style={styles.button} onPress={this.handleSearch}>
                    <Text style={styles.buttonText}>Search</Text>
                  </TouchableOpacity>
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
    backgroundColor: Colors.lighter
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  },
  button: {
    borderRadius: 50,
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.COVID
  },
  buttonText: {
    color: 'white',
    fontWeight: '700'
  },
  container: {
    margin: 50
  },
  search: {
    borderWidth: 1,
    borderColor: ThemeColors.COVID,
    padding: 10,
    borderRadius: 50,
    marginTop: 30
  }
});
