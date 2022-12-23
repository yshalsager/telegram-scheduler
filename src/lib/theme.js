import { theme } from '../store.js';
export const toggleTheme = () => {
	const currentTheme = document.documentElement.dataset.theme;
	const newTheme = currentTheme === 'telegram' ? 'telegramDark' : 'telegram';
	theme.set(newTheme);
	document.documentElement.dataset.theme = newTheme;
	console.log(`Theme changed to ${newTheme}`);
};
