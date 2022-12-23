import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedTheme = (browser && localStorage.getItem('theme')) || 'telegram';
export const theme = writable(storedTheme);
browser &&
	theme.subscribe((value) => {
		localStorage.setItem('theme', value === 'telegram' ? 'telegram' : 'telegramDark');
	});
