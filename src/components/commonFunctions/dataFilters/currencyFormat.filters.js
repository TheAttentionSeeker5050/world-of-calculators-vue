// import { isObject } from "chart.js/dist/helpers/helpers.core";

export default function currencyFormat(value) {

  if (value === null) {
    return "$0.00";
  }

  if (value === undefined) {
    return NaN;
  }

  if (typeof value == 'object') {
    return NaN;
  }

  try {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return formatter.format(value);
  } catch (error) {
    // console.log(error);
    return NaN;
  }
}