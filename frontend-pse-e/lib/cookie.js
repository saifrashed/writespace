/**
 * Sets a cookie with the specified key and value.
 * @param {string} key - The key of the cookie.
 * @param {string} value - The value of the cookie.
 */
export const setCookie = (key, value) => {
    if (process.browser) {
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        document.cookie = `${key}=${value}; expires=${expires.toUTCString()}; path=/`;
    }
};


/**
 * Removes a cookie with the specified key.
 * @param {string} key - The key of the cookie to be removed.
 */
export const removeCookie = (key) => {
    if (process.browser) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
};


/**
 * Retrieves the value of a cookie with the specified key.
 * @param {string} key - The key of the cookie to retrieve the value from.
 * @returns {string|undefined} - The value of the cookie if found, otherwise undefined.
 */
export const getCookie = (key) => {
    if (process.browser) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${key}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }
};

