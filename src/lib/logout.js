import {
    isAuthenticated,
    telegramApiID,
    telegramApiHash,
    telegramStringSession,
    telegramUser,
} from '../store.js'

export const logOut = () => {
    telegramUser.set({})
    isAuthenticated.set(false)
}

export const logOutCompletely = () => {
    telegramApiID.set('')
    telegramApiHash.set('')
    telegramStringSession.set('')
    telegramUser.set({})
    isAuthenticated.set(false)
}
