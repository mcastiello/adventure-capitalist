export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const formatCurrency = (value: number) =>
  Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'GBP' }).format(value);

export const formatTime = (value: number, useMilliseconds = false) => {
  if (useMilliseconds) {
    value = Math.round(value / 1000);
  }

  const seconds = value % 60;
  const minutes = Math.floor(value / 60) % 60;
  const hours = Math.floor(value / 3600);

  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
