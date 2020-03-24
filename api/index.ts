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
  updated: number
};

type NotFound = {
  type: 'error'
};

export type CovidResponse = GlobalResponse | ByCountryResponse | NotFound;

const BASE_URL = 'https://corona.lmao.ninja';

export interface CoronaApi {
  getAllCases(): Promise<GlobalResponse>,
  getCasesByCountry(country: string): Promise<ByCountryResponse>
}

export const coronaApi: CoronaApi = {
  getAllCases() {
    return fetch(`${BASE_URL}/all`)
      .then((response) => response.json()
        .then((data) => { return { ...data, type: 'global' }; }));
  },
  getCasesByCountry(country: string) {
    return fetch(`${BASE_URL}/countries/${country.toLowerCase().trim()}`)
      .then((response) => response.json()
        .then((data) => { return { ...data, type: 'country' }; }))
        .catch(() => { return { type: 'error' }; });
  }
};