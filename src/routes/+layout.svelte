<script>
import '../styles/app.postcss'
import Footer from '../components/Footer.svelte'
import Navbar from '../components/Navbar.svelte'
import Toast from '../components/Toast.svelte'
import {toastMessage} from '../store.js'
import {logOut} from '../lib/logout'
/**
 * @typedef {Object} Props
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let {children} = $props()

// Set theme on page load, based on
// https://github.com/CaptainCodeman/svelte-theme-select/blob/948df6a0020eb452ea04f5df2dac6fe991534dae/src/lib/Theme.svelte
const setTheme = () => (document.documentElement.dataset.theme = localStorage.theme ?? 'telegram')
// .substring(6) to remove '() => ' part
const setThemeScript = `<script>${setTheme.toString().substring(6)}</scrip` + 't>'

function beforeUnload(event) {
    event.preventDefault()
    // Logout if browser window is closed or refreshed
    logOut()
    // Chrome requires returnValue to be set.
    return (event.returnValue = '')
}
</script>

<!-- this sets theme class based on localstorage settings (in head to avoid FOUC) -->
<svelte:head>{@html setThemeScript}</svelte:head>

<!-- sets custom window close event handler -->
<svelte:window onbeforeunload={beforeUnload} />

<Navbar />
<main class="container mx-auto min-h-[75vh] min-w-full px-2">
    {@render children?.()}
</main>
<Footer />

{#if $toastMessage}
    <Toast>{$toastMessage}</Toast>
{/if}
