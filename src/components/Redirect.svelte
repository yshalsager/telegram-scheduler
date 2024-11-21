<script>
import {navigateAndReplaceState} from '../lib/navigation.js'
import {page} from '$app/stores'

/**
 * @typedef {Object} Props
 * @property {any} url
 * @property {any} condition
 * @property {number} [timeout]
 */

/** @type {Props} */
let {url, condition, timeout = 0} = $props()
$effect(() => {
    $condition &&
        $page.url.pathname !== url &&
        setTimeout(() => {
            try {
                navigateAndReplaceState(url)
            } catch (err) {
                console.error(err)
            }
        }, timeout)
})
</script>
