import { theme } from '../store.js';

export const switchTheme = (newTheme) => {
	theme.set(newTheme);
	document.documentElement.dataset.theme = newTheme;
	// console.log(`Theme changed to ${newTheme}`);
};

export const toggleTheme = () => {
	const currentTheme = document.documentElement.dataset.theme;
	const newTheme = currentTheme === 'telegram' ? 'telegramDark' : 'telegram';
	switchTheme(newTheme);
};
