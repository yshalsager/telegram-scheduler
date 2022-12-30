import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Toast
export const toastMessage = writable('');

// Theme
const storedTheme = browser && localStorage.getItem('theme');
export const theme = writable(
	storedTheme ??
		((browser && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'telegramDark'
			: 'telegram') ||
			'telegram')
);
browser && theme.subscribe((value) => localStorage.setItem('theme', value));

// Telegram String Session
const storedTelegramStringSession = (browser && localStorage.getItem('tss')) || '';
export const telegramStringSession = writable(storedTelegramStringSession);
browser && telegramStringSession.subscribe((value) => localStorage.setItem('tss', value));

// Telegram API ID
const storedTelegramApiID = (browser && localStorage.getItem('tai')) || '';
export const telegramApiID = writable(storedTelegramApiID);
browser && telegramApiID.subscribe((value) => localStorage.setItem('tai', value));

// Telegram API Hash
const storedTelegramApiHash = (browser && localStorage.getItem('tah')) || '';
export const telegramApiHash = writable(storedTelegramApiHash);
browser && telegramApiHash.subscribe((value) => localStorage.setItem('tah', value));

// Login state
export const isAuthenticated = writable(
	(browser && localStorage.getItem('tia') === 'true') || false
);
browser && isAuthenticated.subscribe((value) => localStorage.setItem('tia', value));

// LoggedIn User
export const telegramUser = writable((browser && JSON.parse(localStorage.getItem('tlu'))) || {});
browser && telegramUser.subscribe((value) => localStorage.setItem('tlu', JSON.stringify(value)));

// derived values
export const isLoggedIn = derived(
	[isAuthenticated, telegramStringSession, telegramApiID, telegramApiHash, telegramUser],
	([$isAuthenticated, $telegramStringSession, $telegramApiID, $telegramApiHash, $telegramUser]) =>
		$isAuthenticated &&
		$telegramStringSession &&
		$telegramApiID &&
		$telegramApiHash &&
		$telegramUser
);

export const isLoggedOut = derived(
	[isAuthenticated, telegramStringSession, telegramApiID, telegramApiHash, telegramUser],
	([$isAuthenticated, $telegramStringSession, $telegramApiID, $telegramApiHash, $telegramUser]) =>
		(!$isAuthenticated || !$telegramUser) &&
		$telegramApiID &&
		$telegramApiHash &&
		$telegramStringSession
);

export const isLoggedOutCompletely = derived(
	[isAuthenticated, telegramStringSession, telegramApiID, telegramApiHash],
	([$isAuthenticated, $telegramStringSession, $telegramApiID, $telegramApiHash]) =>
		!$isAuthenticated && !$telegramStringSession && !$telegramApiID && !$telegramApiHash
);
