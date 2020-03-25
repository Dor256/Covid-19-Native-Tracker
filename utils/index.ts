import { WHOLE } from '../consts';

const commaDelimiterRegexp = /\B(?=(\d{3})+(?!\d))/g;

export const formatNumberWithCommas = (number: number): string => {
  return number.toString().replace(commaDelimiterRegexp, ',');
};

export const calculatePercent = (denominator: number, numerator: number) => {
  const percent = (numerator / denominator) * WHOLE;
  const roundedPercent = Math.round(percent);
  return roundedPercent === 0 ? percent.toFixed(2) : roundedPercent;
};