/**
 * Create a promise that is automatically resolved after the requested amount of time.
 * Useful to delay the execution of a saga loop.
 * @param {number} time
 * @returns {Promise}
 */
export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

/**
 * Format the provided value as British Pounds.
 * @param {number} value
 * @returns {string}
 */
export const formatCurrency = (value: number) =>
  Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'GBP' }).format(value);

/**
 * Format the provided time value in hours, minute and seconds.
 * If the provided value include milliseconds, they will get removed.
 * @param {number} value
 * @param {boolean} useMilliseconds
 * @returns {string}
 */
export const formatTime = (value: number, useMilliseconds = false) => {
  if (useMilliseconds) {
    value = Math.round(value / 1000);
  }

  const seconds = value % 60;
  const minutes = Math.floor(value / 60) % 60;
  const hours = Math.floor(value / 3600);

  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Calculate how many seconds have passed since the last collection.
 * @param {number} lastCollection
 * @returns {number}
 */
export const getDelayValue = (lastCollection: number) => Math.round((lastCollection - Date.now()) / 1000);
