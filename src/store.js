import {writable, derived} from 'svelte/store'
import {browser} from '$app/environment'
import {isEmpty} from './lib/utils.js'

// Toast
export const toastMessage = writable('')

// Theme
export const theme = writable(
    (browser && localStorage.getItem('theme')) ??
        ((browser && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'telegramDark'
            : 'telegram') ||
            'telegram'),
)
browser && theme.subscribe(value => localStorage.setItem('theme', value))

// Telegram String Session
export const telegramStringSession = writable((browser && localStorage.getItem('tss')) || '')
browser && telegramStringSession.subscribe(value => localStorage.setItem('tss', value))

// Telegram API ID
export const telegramApiID = writable((browser && localStorage.getItem('tai')) || '')
browser && telegramApiID.subscribe(value => localStorage.setItem('tai', value))

// Telegram API Hash
export const telegramApiHash = writable((browser && localStorage.getItem('tah')) || '')
browser && telegramApiHash.subscribe(value => localStorage.setItem('tah', value))

// Login state
export const isAuthenticated = writable(
    (browser && sessionStorage.getItem('tia') === 'true') || false,
)
browser && isAuthenticated.subscribe(value => sessionStorage.setItem('tia', value))

// LoggedIn User
export const telegramUser = writable((browser && JSON.parse(localStorage.getItem('tlu'))) || {})
browser && telegramUser.subscribe(value => localStorage.setItem('tlu', JSON.stringify(value)))

// derived values
export const isLoggedIn = derived(
    [isAuthenticated, telegramStringSession, telegramApiID, telegramApiHash, telegramUser],
    ([$isAuthenticated, $telegramStringSession, $telegramApiID, $telegramApiHash, $telegramUser]) =>
        $isAuthenticated &&
        !isEmpty($telegramStringSession) &&
        !isEmpty($telegramApiID) &&
        !isEmpty($telegramApiHash) &&
        !isEmpty($telegramUser),
)

export const isLoggedOut = derived(
    [isAuthenticated, telegramStringSession, telegramApiID, telegramApiHash],
    ([$isAuthenticated, $telegramStringSession, $telegramApiID, $telegramApiHash]) =>
        !$isAuthenticated &&
        !isEmpty($telegramApiID) &&
        !isEmpty($telegramApiHash) &&
        !isEmpty($telegramStringSession),
)

export const isLoggedOutCompletely = derived(
    [isAuthenticated, telegramStringSession, telegramApiID, telegramApiHash],
    ([$isAuthenticated, $telegramStringSession, $telegramApiID, $telegramApiHash]) =>
        !$isAuthenticated &&
        isEmpty($telegramStringSession) &&
        isEmpty($telegramApiID) &&
        isEmpty($telegramApiHash),
)
