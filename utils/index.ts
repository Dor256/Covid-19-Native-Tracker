const commaDelimiterRegexp = /\B(?=(\d{3})+(?!\d))/g;

export const formatNumberWithCommas = (number: number): string => {
  return number.toString().replace(commaDelimiterRegexp, ",");
}