import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Validates a phone number internationally
 * Returns true if valid, false otherwise
 */
export const isValidPhoneNumber = (phone: string, defaultCountry = 'ID'): boolean => {
    if (!phone) return false;

    // Try with leading +
    const phoneNumber = parsePhoneNumberFromString(phone.startsWith('+') ? phone : `+${phone}`);
    if (phoneNumber?.isValid()) return true;

    // Try with default country
    const phoneNumberFallback = parsePhoneNumberFromString(phone, defaultCountry as any);
    return !!phoneNumberFallback?.isValid();
};

/**
 * Formats a phone number to E.164 (e.g. 628123456789)
 */
export const formatPhoneE164 = (phone: string, defaultCountry = 'ID'): string => {
    const phoneNumber = parsePhoneNumberFromString(phone.startsWith('+') ? phone : `+${phone}`);
    if (phoneNumber?.isValid()) {
        return phoneNumber.format('E.164').replace('+', '');
    }

    const phoneNumberFallback = parsePhoneNumberFromString(phone, defaultCountry as any);
    if (phoneNumberFallback?.isValid()) {
        return phoneNumberFallback.format('E.164').replace('+', '');
    }

    return phone.replace(/\D/g, '');
};
