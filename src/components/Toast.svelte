<script>
import Info from 'phosphor-svelte/lib/Info'
import {onMount} from 'svelte'
/**
 * @typedef {Object} Props
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let {children} = $props()

let toast
onMount(async () => {
    toast = document.getElementById('toastNotification')
    setTimeout(() => {
        toast.classList.add('invisible')
    }, 2000)
})
</script>

<div id="toastNotification" class="toast toast-start top-20">
    <div class="alert alert-info">
        <div>
            <Info size={24} weight="bold" color="currentColor" />
            <span class="text-base-100">{@render children?.()}</span>
        </div>
    </div>
</div>
