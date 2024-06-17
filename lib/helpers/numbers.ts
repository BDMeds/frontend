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

export function abbreviateBigNumbers(value: number) {
  if (value >= 1.0e9) {
    // Billions
    return (value / 1.0e9).toFixed(1) + "B";
  } else if (value >= 1.0e6) {
    // Millions
    return (value / 1.0e6).toFixed(1) + "M";
  } else if (value >= 1.0e3) {
    // Thousands
    return (value / 1.0e3).toFixed(1) + "k";
  } else {
    // Less than a thousand
    return value.toString();
  }
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min: number, max: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}
