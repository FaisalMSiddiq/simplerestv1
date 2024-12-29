import { IANAZone } from 'luxon';

/**
 * Validates if the provided timezone is a valid IANA timezone identifier
 * @param {string} timezone - The timezone to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateTimezone(timezone) {
  if (typeof timezone !== 'string') return false;
  return IANAZone.isValidZone(timezone);
}