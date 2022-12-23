// const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				noto: ['Noto Sans Arabic', 'serif']
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				telegram: {
					primary: '#0088CC',
					secondary: '#CFD8DC',
					accent: '#26A69A',
					neutral: '#181A2A',
					'base-100': '#ffffff',
					info: '#179cde',
					success: '#5eead4',
					warning: '#FFE57F',
					error: '#FF5252'
				},
				telegramDark: {
					primary: '#23B6FF',
					secondary: '#CFD8DC',
					accent: '#31D9C8',
					neutral: '#F5F5F5',
					'base-100': '#212121',
					info: '#77D0FC',
					success: '#5eead4',
					warning: '#FFE57F',
					error: '#FFA8A8'
				}
			}
			// 'light',
			// 'dark',
			// 'cupcake',
			// 'bumblebee',
			// 'emerald',
			// 'corporate'
			// 'synthwave',
			// 'retro',
			// 'cyberpunk',
			// 'valentine',
			// 'halloween',
			// 'garden',
			// 'forest',
			// 'aqua',
			// 'lofi',
			// 'pastel',
			// 'fantasy',
			// 'wireframe',
			// 'black',
			// 'luxury',
			// 'dracula',
			// 'cmyk'
			// 'autumn',
			// 'business',
			// 'acid',
			// 'lemonade',
			// 'night',
			// 'coffee',
			// 'winter'
		],
		rtl: true
	}
};
