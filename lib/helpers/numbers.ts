export const formatNaira = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    style: "currency",
  }).format(price);
};

export const formatDollar = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(price);
};

export const formatDefault = (num: number) => {
  return new Intl.NumberFormat(undefined, {}).format(num);
};

export const convertDollarToNaira = (amount: number, rate: number) => amount * rate;

export const convertNairaToDollar = (amount: number, rate: number) => amount / rate;

export function formatSmallNumber(num: number, decimalPlaces: number) {
  let numStr = num.toExponential(decimalPlaces);
  let parts = numStr.split("e");
  let coefficient = parseFloat(parts[0]);
  let exponent = parseInt(parts[1], 10);
  let result = (coefficient * Math.pow(10, exponent)).toFixed(decimalPlaces);
  return result;
}
