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
            },
            animation: {
                bounceNew: 'bounceNew 1s infinite',
            },
            keyframes: {
                bounceNew: {
                    '0%, 100%': {
                        transform: 'none',
                        animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
                    },
                    '50%': {
                        transform: 'translateY(-25%)',
                        animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
                    },
                },
            }
        },
        screens: {
            'xs': '560px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
    },
    plugins: [
        require("@tailwindcss/forms")
    ],
};
