export type ByCountryResponse = {
  type: 'country',
  active: number,
  cases: number,
  casesPerOneMillion: number,
  country: string,
  critical: number,
  deaths: number,
  recovered: number,
  todayCases: number,
  todayDeaths: number
};

export type TotalResponse = {
  type: 'total',
  cases: number,
  deaths: number,
  recovered: number,
  updated: number
};

const BASE_URL = 'https://corona.lmao.ninja';

export interface CoronaApi {
  getAllCases(): Promise<TotalResponse>,
  getCasesByCountry(country: string): Promise<ByCountryResponse>
}

export const coronaApi: CoronaApi = {
  getAllCases() {
    return fetch(`${BASE_URL}/all`)
      .then((response) => response.json()
        .then((data) => { return { ...data, type: 'total' }; }));
  },
  getCasesByCountry(country: string) {
    return fetch(`${BASE_URL}/countries/${country.toLowerCase()}`)
      .then((response) => response.json()
        .then((data) => { return { ...data, type: 'country' }; }));
  }
};