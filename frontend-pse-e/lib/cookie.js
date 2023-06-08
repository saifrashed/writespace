export const setCookie = (key, value) => {
    if (process.browser) {
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        document.cookie = `${key}=${value}; expires=${expires.toUTCString()}; path=/`;
    }
};
export const removeCookie = (key) => {
    if (process.browser) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
};

export const getCookie = (key) => {
    if (process.browser) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${key}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }
};

