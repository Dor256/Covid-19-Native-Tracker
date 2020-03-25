import { WORLD_POP } from '../consts';

export type CountryInfo = {
  iso2: string,
  iso3: string,
  _id: number,
  lat: number,
  long: number,
  flag: string
};

type ByCountryResponse = {
  type: 'country',
  active: number,
  cases: number,
  casesPerOneMillion: number,
  deathsPerOneMillion: number,
  country: string,
  population: number,
  countryInfo: CountryInfo,
  critical: number,
  deaths: number,
  recovered: number,
  todayCases: number,
  todayDeaths: number
};

type GlobalResponse = {
  type: 'global',
  cases: number,
  deaths: number,
  recovered: number,
  population: number,
  updated: number
};

type NotFound = {
  type: 'error'
};

export type CovidResponse = GlobalResponse | ByCountryResponse | NotFound;

export type PopulationResponse = [
  {
    population: number
  }
];

export interface CoronaApi {
  getAllCases(): Promise<GlobalResponse>,
  getCasesByCountry(country: string): Promise<ByCountryResponse>
}

export interface PopulationApi {
  getPopulationByCountry(country: string): Promise<number>
}

const COVID_URL = 'https://corona.lmao.ninja';
const POPULATION_URL = 'https://restcountries.eu/rest/v2';

export const coronaApi: CoronaApi = {
  getAllCases() {
    return fetch(`${COVID_URL}/all`)
      .then((response) => response.json()
        .then((data) => { return { ...data, type: 'global', population: WORLD_POP }; }));
  },
  getCasesByCountry(country: string) {
    return populationApi.getPopulationByCountry(country).then((population) => {
      return fetch(`${COVID_URL}/countries/${country.toLowerCase().trim()}?strict=true`)
      .then((response) => response.json()
        .then((data) => { return { ...data, type: 'country', population }; }))
        .catch(() => { return { type: 'error' }; });
    });
  }
};

const populationApi: PopulationApi = {
  getPopulationByCountry(country: string) {
    return fetch(`${POPULATION_URL}/name/${country}?fullText=true&fields=population`)
      .then((response) => response.json()
        .then((data) => data[0].population));
  }
};