const commaDelimiterRegexp = /\B(?=(\d{3})+(?!\d))/g;

export const formatNumberWithCommas = (number: number): string => {
  return number.toString().replace(commaDelimiterRegexp, ",");
};

export const calculatePercent = (denominator: number, numerator: number) => {
  return Math.round((numerator / denominator) * 100);
};