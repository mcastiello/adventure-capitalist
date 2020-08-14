export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const formatCurrency = (value: number) =>
  Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'GBP' }).format(value);
