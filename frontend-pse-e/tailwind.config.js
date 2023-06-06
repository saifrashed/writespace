const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./lib/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            ...colors,
        },
        fontFamily: {
            // regular: [''],
            // semibold: [''],
            // black: [''],
            // bold: [''],
        },
        extend: {
            container: { // Container width
                center: true,
                padding: '1rem',
                screens: {
                    sm: '100%',
                    md: '100%',
                    lg: '100%',
                    xl: '1000px' // Set the desired width here
                }
            }
        }
    },
    plugins: [
        require("@tailwindcss/forms")
    ],
};
