import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                lightBlue: '#CBE5F1',
                lightRed: '#F39C9C',
                blue: "#6495EC"
            },
            keyframes: {
                borderFadeIn: {
                    '0%': { borderColor: 'transparent', borderWidth: '1px' },
                    '100%': { borderColor: '#F39C9C', borderWidth: '2px' },
                },
                fadeIn: {
                    '0%': { opacity: 0, transform: 'scale(1)' },
                    '100%': { opacity: 1, transform: 'scale(1)' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.7s ease-out forwards',
                borderFadeIn: 'borderFadeIn 0.5s ease-out forwards',
            },
        },
    },

    plugins: [forms],
};
