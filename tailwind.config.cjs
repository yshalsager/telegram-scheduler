// const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Noto Sans Arabic"', ...require('tailwindcss/defaultTheme.js').fontFamily.sans],
				serif: ['Inter', ...require('tailwindcss/defaultTheme.js').fontFamily.serif]
			}
		}
	},
};
