import { WORLD_POP, SOUTH_KOREA, SOUTH_KOREA_POP_SEARCH } from '../consts';
import { States } from '../us-states';

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

type ByStateResponse = {
  type: 'state',
  state: string,
  cases: number,
  todayCases: number,
  deaths: number,
  todayDeaths: number,
  active: number,
  population: number
}

type NotFound = {
  type: 'error'
};

export type CovidResponse = GlobalResponse | ByCountryResponse | ByStateResponse | NotFound;

export type PopulationResponse = [
  {
    population: number
  }
];

export interface CoronaApi {
  getAllCases(): Promise<GlobalResponse>,
  getCasesByCountry(country: string): Promise<ByCountryResponse>,
  getCasesByState(state: string): Promise<any>
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
        .then((data) => { return { ...data, type: 'global', population: WORLD_POP }; })).catch(() => { return { type: 'error' }; });
  },
  getCasesByCountry(country: string) {
    return populationApi.getPopulationByCountry(country)
      .then((population) => {
        return fetch(`${COVID_URL}/countries/${country}?strict=true`)
        .then((response) => response.json()
          .then((data) => { return { ...data, type: 'country', population }; }));
      })
      .catch(() => { return { type: 'error' }; });
  },
  getCasesByState(state: string) {
    return populationApi.getPopulationByCountry('usa')
      .then((population) => {
        return fetch(`${COVID_URL}/states`)
          .then((response) => response.json()
            .then((data) => {
              const stateData = data.find((element: any) => element.state === States[state]);
              return { ...stateData, type: 'state', population };
            }));
      })
      .catch(() => { return { type: 'error' }; });
  }
};

const populationApi: PopulationApi = {
  getPopulationByCountry(country: string) {
    const countryToSearch = country === SOUTH_KOREA ? SOUTH_KOREA_POP_SEARCH : country;
    return fetch(`${POPULATION_URL}/name/${countryToSearch}?fullText=true&fields=population`)
      .then((response) => response.json()
        .then((data) => data[0].population));
  }
};