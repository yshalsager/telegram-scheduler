import {theme} from '../store.js'

export const switchTheme = (newTheme) => {
    theme.set(newTheme)
}

export const toggleTheme = (currentTheme) => {
    const newTheme = currentTheme === 'telegram' ? 'telegramDark' : 'telegram'
    theme.set(newTheme)
}
