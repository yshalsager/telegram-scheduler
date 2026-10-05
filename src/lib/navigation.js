import {browser} from '$app/env'
import {goto} from '$app/navigation'
export const navigateAndReplaceState = page => {
    console.log(`Navigating to ${page}`)
    return browser && goto(page, {replace: true})
}
