// const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'noto-inter': ['"Noto Sans Arabic"', 'Inter']
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				telegram: {
					primary: '#2481cc',
					secondary: '#7d7f81',
					accent: '#4ca3e2',
					neutral: '#181A2A',
					'base-100': '#ffffff',
					info: '#2392e7',
					success: '#7bc862',
					warning: '#ffcd6a',
					error: '#e17076'
				},
				telegramDark: {
					primary: '#1c93e3',
					secondary: '#7d7f81',
					accent: '#64b5ef',
					neutral: '#1e1e1e',
					'base-100': '#111111',
					info: '#64b5ef',
					success: '#7cc766',
					warning: '#e9b653',
					error: '#e0645e'
				}
			}
		],
		rtl: true
	}
};
