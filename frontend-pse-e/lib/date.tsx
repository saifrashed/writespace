/**
 * Formats a date string into a localized date and time format.
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric' as const, // Specify the type explicitly
        hour: 'numeric',
        minute: 'numeric',
    };

    return date.toLocaleString('nl-NL', options);
};