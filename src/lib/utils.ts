/**
 * Reusable utility functions for data formatting.
 * Implemented as pure functions per functional programming principles.
 */

/**
 * Formats a given number into Indian Rupee (INR) currency format.
 * @param value The numerical value to format.
 * @returns The formatted currency string without decimal places.
 */
export const formatINR = (value: number): string => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
};

/**
 * Formats a large number into INR Crores.
 * @param value Actual numerical value.
 * @returns Formatted string in Crores.
 */
export const formatINRInCr = (value: number): string => {
  const cr = value / 10000000;
  return `₹${cr.toFixed(2)} Cr`;
};

/**
 * Formats a generic percentage value.
 * @param value The numerical value to format.
 * @returns Built percentage string with a plus sign if positive.
 */
export const formatPercent = (value: number): string => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};
