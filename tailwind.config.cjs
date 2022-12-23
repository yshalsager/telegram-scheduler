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
					secondary: '#d1d5db',
					accent: '#0d9488',
					neutral: '#181A2A',
					'base-100': '#ffffff',
					info: '#179cde',
					success: '#5eead4',
					warning: '#fef08a',
					error: '#fda4af'
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
