// const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', '"PingFang SC"', '"Microsoft YaHei"', '"Noto Sans SC"', ...require('tailwindcss/defaultTheme.js').fontFamily.sans],
				serif: ['"Noto Serif SC"', '"Songti SC"', ...require('tailwindcss/defaultTheme.js').fontFamily.serif]
			}
		}
	},
};
