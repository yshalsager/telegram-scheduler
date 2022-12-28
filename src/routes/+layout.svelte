<script>
	import '../styles/app.postcss';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	import Toast from '../components/Toast.svelte';
	import { toastMessage } from '../store.js';

	// Set theme on page load, based on
	// https://github.com/CaptainCodeman/svelte-theme-select/blob/948df6a0020eb452ea04f5df2dac6fe991534dae/src/lib/Theme.svelte
	const setTheme = () =>
		(document.documentElement.dataset.theme = localStorage.theme ?? 'telegram');
	// .substring(6) to remove '() => ' part
	const setThemeScript = `<script>${setTheme.toString().substring(6)}</scrip` + 't>';
</script>

<!-- this sets theme class based on localstorage settings (in head to avoid FOUC) -->
<svelte:head>{@html setThemeScript}</svelte:head>

<Navbar />
<main class="container mx-auto min-h-screen">
	<slot />
</main>
<Footer />

{#if $toastMessage}
	<svelte:component this={Toast}>{$toastMessage}</svelte:component>
{/if}
