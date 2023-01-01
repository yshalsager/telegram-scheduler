<script>
	import { navigateAndReplaceState } from '../lib/navigation.js';
	import { page } from '$app/stores';

	export let url;
	export let condition;
	export let timeout = 0;
	// $: console.log($condition);
	$: $condition &&
		$page.url.pathname !== url &&
		setTimeout(() => {
			navigateAndReplaceState(url);
		}, timeout);
</script>
